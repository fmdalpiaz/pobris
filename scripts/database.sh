#!/bin/bash

case $1 in
  "up")
    echo "🚀 Iniciando banco de dados..."
    docker-compose up -d postgres
    ;;
  "down")
    echo "🛑 Parando banco de dados..."
    docker-compose down
    ;;
  "logs")
    echo "📋 Mostrando logs do banco..."
    docker-compose logs -f postgres
    ;;
  "reset")
    echo "🔄 Resetando banco de dados..."
    docker-compose down -v
    docker-compose up -d postgres
    ;;
  "pgadmin")
    echo "🌐 Iniciando pgAdmin..."
    docker-compose up -d pgadmin
    echo "Acesse: http://localhost:5050"
    echo "Email: admin@pobris.com"
    echo "Senha: admin123"
    ;;
  *)
    echo "Uso: $0 {up|down|logs|reset|pgadmin}"
    echo "  up     - Inicia o banco"
    echo "  down   - Para o banco"
    echo "  logs   - Mostra logs"
    echo "  reset  - Reseta o banco"
    echo "  pgadmin - Inicia pgAdmin"
    ;;
esac
