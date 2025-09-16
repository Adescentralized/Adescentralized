#!/bin/bash

# Script de Teste de Integração - Stellar Ads SDK
# Este script testa a funcionalidade completa do sistema de hospedantes

echo "🚀 Iniciando Teste de Integração - Stellar Ads SDK"
echo "=================================================="
echo "Versão: 2.0.0"
echo "Data: $(date)"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para logging
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se as portas estão disponíveis
check_port() {
    local port=$1
    local service=$2
    
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        log_success "$service rodando na porta $port"
        return 0
    else
        log_error "$service NÃO está rodando na porta $port"
        return 1
    fi
}

# Testar endpoint HTTP
test_endpoint() {
    local url=$1
    local description=$2
    
    log_info "Testando: $description"
    
    if curl -s -f "$url" > /dev/null; then
        log_success "$description - OK"
        return 0
    else
        log_error "$description - FALHOU"
        return 1
    fi
}

# Testar endpoint com resposta JSON
test_json_endpoint() {
    local url=$1
    local description=$2
    
    log_info "Testando: $description"
    
    response=$(curl -s "$url")
    if [ $? -eq 0 ] && echo "$response" | jq . > /dev/null 2>&1; then
        log_success "$description - OK"
        echo "   Resposta: $(echo "$response" | jq -c .)"
        return 0
    else
        log_error "$description - FALHOU"
        echo "   Resposta: $response"
        return 1
    fi
}

echo "1️⃣  VERIFICANDO SERVIÇOS"
echo "------------------------"

# Verificar se os backends estão rodando
backend_main=false
backend_ads=false

if check_port 3000 "Backend Principal (Frontend)"; then
    backend_main=true
fi

if check_port 3000 "Backend de Anúncios"; then
    backend_ads=true
fi

if check_port 5173 "Frontend (Vite Dev Server)"; then
    log_success "Frontend Vite rodando na porta 5173"
else
    log_warning "Frontend Vite não detectado na porta 5173"
fi

echo ""
echo "2️⃣  TESTANDO ENDPOINTS DA API DE ANÚNCIOS"
echo "----------------------------------------"

if [ "$backend_ads" = true ]; then
    # Testar endpoints críticos
    test_json_endpoint "http://localhost:3000/api/ad?siteId=test-site-001" "Buscar anúncio"
    test_json_endpoint "http://localhost:3000/api/validate-site?siteId=test-site-001" "Validar site"
    test_endpoint "http://localhost:3000/api/sites" "Listar sites"
    
    # Testar endpoint de impressão (POST)
    log_info "Testando: Registrar impressão"
    impression_response=$(curl -s -X POST "http://localhost:3000/api/impression" \
        -H "Content-Type: application/json" \
        -d '{"campaignId":"test-campaign","siteId":"test-site-001"}')
    
    if [ $? -eq 0 ]; then
        log_success "Registrar impressão - OK"
        echo "   Resposta: $(echo "$impression_response" | jq -c .)"
    else
        log_error "Registrar impressão - FALHOU"
    fi
    
    # Testar endpoint de clique (GET)
    test_json_endpoint "http://localhost:3000/api/click?campaignId=test-campaign&siteId=test-site-001" "Registrar clique"
    
else
    log_warning "Backend de anúncios não está rodando - pulando testes de API"
    fi
    
else
    log_error "API de anúncios (porta 3000) não está acessível"
    log_info "Certifique-se de que o backend de anúncios está rodando na porta 3000"
fi

# Verificar frontend (porta 5173)
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    log_success "Frontend (porta 5173) está rodando"
else
    log_warning "Frontend (porta 5173) não está acessível"
fi

# Testar SDK
log_info "Testando SDK..."

# Verificar se o arquivo SDK existe
if [ -f "public/sdk.js" ]; then
    log_success "Arquivo SDK encontrado"
    
    # Verificar se contém as funções principais
    if grep -q "trackImpression" public/sdk.js && grep -q "trackClick" public/sdk.js; then
        log_success "SDK contém funções de tracking"
    else
        log_error "SDK não contém funções de tracking necessárias"
    fi
    
    if grep -q "http://localhost:3000" public/sdk.js; then
        log_success "SDK configurado para porta 3000"
    else
        log_error "SDK não está configurado para a porta correta"
    fi
    
else
    log_error "Arquivo SDK não encontrado"
fi

# Testar página de demonstração
if [ -f "public/demo-sdk-advanced.html" ]; then
    log_success "Página de demonstração avançada criada"
else
    log_warning "Página de demonstração avançada não encontrada"
fi

# Verificar configuração das páginas principais
log_info "Verificando páginas principais..."

pages=("Sites.tsx" "SDKGenerator.tsx" "Dashboard.tsx")
for page in "${pages[@]}"; do
    if [ -f "src/pages/$page" ]; then
        log_success "Página $page encontrada"
    else
        log_error "Página $page não encontrada"
    fi
done

# Verificar serviços
if [ -f "src/services/api.ts" ]; then
    log_success "Serviço de API encontrado"
    
    if grep -q "ADS_API_BASE_URL.*3000" src/services/api.ts; then
        log_success "API service configurado para porta 3000"
    else
        log_error "API service não está configurado corretamente"
    fi
else
    log_error "Serviço de API não encontrado"
fi

echo ""
echo "🏁 Teste completo!"
echo ""
echo "Para testar a integração completa:"
echo "1. Inicie o backend principal na porta 3000"
echo "2. Inicie a API de anúncios na porta 3000"
echo "3. Inicie o frontend: npm run dev"
echo "4. Acesse: http://localhost:5173"
echo "5. Teste a página de demonstração: http://localhost:5173/demo-sdk-advanced.html"
echo ""
echo "Funcionalidades implementadas:"
echo "✅ Gestão de sites para hospedantes"
echo "✅ Gerador de código SDK"
echo "✅ SDK com tracking de impressões e cliques"
echo "✅ Dashboard adaptativo (Anunciante/Hospedante)"
echo "✅ Integração com nova API de anúncios"
echo "✅ Sistema de recompensas Stellar"
echo "✅ Documentação e demonstração"
