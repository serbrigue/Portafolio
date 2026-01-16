# Stage 1: Runtime
FROM python:3.11-alpine

WORKDIR /app

# Install build dependencies (if needed later for extensions)
# RUN apk add --no-cache gcc musl-dev linux-headers

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "run.py"]
