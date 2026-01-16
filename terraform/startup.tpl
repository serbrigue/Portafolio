#!/bin/bash

# 1. Update and Install Docker
apt-get update
apt-get install -y apt-transport-https ca-certificates curl gnupg2 software-properties-common
curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 2. Create Directory
mkdir -p /app
cd /app

# 3. Write docker-compose.yml (injected via Terraform)
cat <<EOF > docker-compose.yml
version: '3.8'

services:
  backend:
    image: serbrigue/portafolio-backend:latest
    restart: always
    environment:
      - FLASK_DEBUG=0
      - SECRET_KEY=${secret_key}
      - CORS_ORIGINS=*
      - PORT=5000

  frontend:
    image: serbrigue/portafolio-frontend:latest
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: always
    environment:
      - VITE_API_URL=

  watchtower:
    image: containrrr/watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command: --interval 300
    restart: always
EOF



# 4. Create Self-Healing Scripts

# --- Healthcheck Script ---
cat <<'SCRIPT' > /app/healthcheck.sh
#!/bin/bash
LOG_FILE="/var/log/portfolio_health.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Check 1: Docker Containers
if ! docker compose ps | grep -q "Up"; then
    echo "[$TIMESTAMP] CRITICAL: Containers are down!" >> $LOG_FILE
    /app/repair.sh "containers_down"
    exit 1
fi

# Check 2: API Response (Internal)
# We accept 200 OK. If not, trigger repair.
if ! curl -s -f -o /dev/null http://localhost/api/v1/profile; then
    echo "[$TIMESTAMP] CRITICAL: API is unresponsive (Status != 200)" >> $LOG_FILE
    /app/repair.sh "api_unresponsive"
    exit 1
fi

echo "[$TIMESTAMP] OK: System Healthy" >> $LOG_FILE
SCRIPT

# --- Repair Script ---
cat <<'SCRIPT' > /app/repair.sh
#!/bin/bash
REASON=$1
LOG_FILE="/var/log/portfolio_repair.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$TIMESTAMP] REPAIR INITIATED: Reason = $REASON" >> $LOG_FILE

# Strategy: Simple Restart
echo "[$TIMESTAMP] Action: Restarting Docker Containers..." >> $LOG_FILE
cd /app
docker compose down
docker compose up -d

echo "[$TIMESTAMP] REPAIR COMPLETED" >> $LOG_FILE
SCRIPT

chmod +x /app/healthcheck.sh
chmod +x /app/repair.sh

# 5. Setup Cron Job (Run healthcheck every 5 minutes)
echo "*/5 * * * * root /app/healthcheck.sh" > /etc/cron.d/portfolio_health
chmod 0644 /etc/cron.d/portfolio_health
crontab /etc/cron.d/portfolio_health

# 6. Start Application
docker compose up -d
