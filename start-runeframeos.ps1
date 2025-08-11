# RuneFrameOS Local Development Startup Script
# This script starts all RuneFrameOS applications on their respective ports

Write-Host "🚀 Starting RuneFrameOS Ecosystem..." -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Check if Docker Desktop is running
try {
    docker version | Out-Null
    Write-Host "✅ Docker Desktop is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Desktop is not running. Please start Docker Desktop first." -ForegroundColor Red
    Write-Host "   You can also run the apps individually using the commands below." -ForegroundColor Yellow
    Write-Host ""
}

Write-Host ""
Write-Host "🌐 Application Ports:" -ForegroundColor Cyan
Write-Host "   Nexus (Main Hub):     http://localhost:3000" -ForegroundColor White
Write-Host "   Distillara:           http://localhost:3001" -ForegroundColor White
Write-Host "   Core Admin:           http://localhost:3002" -ForegroundColor White
Write-Host "   Feastwell:            http://localhost:3003" -ForegroundColor White
Write-Host "   Hoardwell:            http://localhost:3004" -ForegroundColor White
Write-Host "   BrokeUnicorn Tavern:  http://localhost:3005" -ForegroundColor White
Write-Host "   Auth Service:         http://localhost:4001" -ForegroundColor White
Write-Host "   Core Service:         http://localhost:4002" -ForegroundColor White
Write-Host "   User Service:         http://localhost:4003" -ForegroundColor White

Write-Host ""
Write-Host "🔧 Starting Options:" -ForegroundColor Cyan
Write-Host "   1. Start with Docker Compose (recommended)" -ForegroundColor White
Write-Host "   2. Start apps individually" -ForegroundColor White
Write-Host "   3. Exit" -ForegroundColor White

$choice = Read-Host "`nChoose an option (1-3)"

switch ($choice) {
    "1" {
        Write-Host "🐳 Starting with Docker Compose..." -ForegroundColor Green
        if (Test-Path "docker-compose.yml") {
            docker-compose up -d
            Write-Host "✅ All services started with Docker Compose!" -ForegroundColor Green
            Write-Host "   Check the ports above to access your applications." -ForegroundColor Cyan
        } else {
            Write-Host "❌ docker-compose.yml not found. Please run this script from the root directory." -ForegroundColor Red
        }
    }
    "2" {
        Write-Host "📱 Starting apps individually..." -ForegroundColor Green
        Write-Host "   This will open multiple terminal windows." -ForegroundColor Yellow
        
        # Start Nexus
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'RuneFrameOS-Nexus'; npm run dev"
        Start-Sleep -Seconds 2
        
        # Start Distillara
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'RuneFrameOS-Distillara'; npm run dev"
        Start-Sleep -Seconds 2
        
        # Start Core
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'RuneFrameOS-Core'; npm run dev"
        Start-Sleep -Seconds 2
        
        # Start Feastwell
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'RuneFrameOS-Feastwell'; npm run dev"
        Start-Sleep -Seconds 2
        
        # Start Hoardwell
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'RuneFrameOS-Hoardwell'; npm run dev"
        Start-Sleep -Seconds 2
        
        # Start BrokeUnicornTavern
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'RuneFrameOS-BrokeUnicornTavern'; npm run dev"
        
        Write-Host "✅ All applications started individually!" -ForegroundColor Green
        Write-Host "   Check the ports above to access your applications." -ForegroundColor Cyan
    }
    "3" {
        Write-Host "👋 Exiting..." -ForegroundColor Yellow
        exit
    }
    default {
        Write-Host "❌ Invalid option. Please run the script again." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Open http://localhost:3000 in your browser to access Nexus" -ForegroundColor White
Write-Host "   2. Use the navigation menu to access other applications" -ForegroundColor White
Write-Host "   3. Each app runs independently but can communicate through Nexus" -ForegroundColor White

Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Cyan
Write-Host "   - Keep this terminal open to see Docker logs (if using Docker)" -ForegroundColor White
Write-Host "   - Use Ctrl+C to stop Docker services" -ForegroundColor White
Write-Host "   - Individual terminals can be closed separately" -ForegroundColor White

Read-Host "`nPress Enter to continue..."
