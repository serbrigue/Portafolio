param (
    [string]$ProjectID = "affable-alpha-484206-c6",
    [string]$Zone = "us-central1-a",
    [string]$InstanceName = "portfolio-vm"
)

Write-Host "🔍 Iniciando Diagnóstico de VM: $InstanceName" -ForegroundColor Cyan

# 1. Obtener Logs de Arranque (Serial Port)
Write-Host "`n📜 Obteniendo logs del script de inicio (Serial Port)..." -ForegroundColor Yellow
Write-Host "Buscando errores en 'startup-script'..."
try {
    gcloud compute instances get-serial-port-output $InstanceName --zone=$Zone --project=$ProjectID | Select-String "startup-script" -Context 0, 5
} catch {
    Write-Host "❌ Error ejecutando gcloud. Asegúrate de tenerlo instalado y autenticado." -ForegroundColor Red
}

# 2. Check Docker remotely (via SSH check if possible, otherwise manual instructions)
Write-Host "`n🛠️  Instrucciones para Debug Manual:" -ForegroundColor Yellow
Write-Host "1. Conectate por SSH:"
Write-Host "   gcloud compute ssh $InstanceName --zone=$Zone --project=$ProjectID"
Write-Host "2. Una vez dentro, ejecuta:"
Write-Host "   sudo journalctl -u google-startup-scripts.service -f  # Ver logs en vivo"
Write-Host "   docker ps                                             # Ver contenedores"
Write-Host "   cat /var/log/portfolio_health.log                     # Ver logs de salud"
