param (
    [string]$RegistryUser = "serbrigue",
    [string]$Version = "latest"
)

Write-Host "Iniciando publicacion..."

# Backend
Write-Host "Construyendo Backend..."
docker build -t $RegistryUser/portafolio-backend:$Version ./backend
docker push $RegistryUser/portafolio-backend:$Version

# Frontend
Write-Host "Construyendo Frontend..."
docker build -t $RegistryUser/portafolio-frontend:$Version ./frontend
docker push $RegistryUser/portafolio-frontend:$Version

Write-Host "Publicacion completada."
Write-Host " - $RegistryUser/portafolio-backend:$Version"
Write-Host " - $RegistryUser/portafolio-frontend:$Version"
