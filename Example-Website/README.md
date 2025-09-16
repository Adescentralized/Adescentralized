# FinTech Daily - Demo News Site

Este é um site de notícias mock criado para demonstrar como os anúncios da plataforma Meridian se integram com sites externos.

## 📁 Estrutura dos Arquivos

```
demo-news-site/
├── index.html          # Página principal com artigo sobre blockchain
├── styles.css          # Estilos responsivos e design moderno
├── script.js           # JavaScript para integração com anúncios
└── README.md           # Este arquivo
```

## 🚀 Como Usar

### 1. Abrir o Site
```bash
# Opção 1: Abrir diretamente no navegador
open index.html

# Opção 2: Usar um servidor local (recomendado)
cd demo-news-site
python -m http.server 8000
# ou
npx serve .
```

### 2. Configuração da API
No arquivo `script.js`, ajuste a URL da API se necessário:
```javascript
this.apiUrl = 'http://localhost:3001'; // Altere para sua URL da API
```

## 🎯 Funcionalidades

### Integração de Anúncios
- **6 espaços publicitários** estrategicamente posicionados
- **Carregamento automático** de campanhas ativas via API
- **Fallback para dados mock** se a API estiver indisponível
- **Tracking de cliques** com relatórios para a plataforma
- **Atualização automática** dos anúncios a cada 5 minutos

### Posições dos Anúncios
1. **Top Banner** - Banner no topo do artigo (728x250px)
2. **Mid-Article** - Banner no meio do conteúdo (728x250px)
3. **Bottom Article** - Banner no final do artigo (728x250px)
4. **Sidebar Top** - Anúncio no topo da barra lateral (300x300px)
5. **Sidebar Middle** - Anúncio no meio da barra lateral (300x300px)
6. **Sidebar Bottom** - Anúncio no final da barra lateral (300x300px)

### Recursos Adicionais
- **Design Responsivo** - Funciona em desktop, tablet e mobile
- **Newsletter Signup** - Formulários de inscrição funcionais
- **Compartilhamento Social** - Botões para Twitter e LinkedIn
- **Barra de Progresso** - Indica progresso de leitura do artigo
- **Animações Suaves** - Transições e hover effects

## 🎨 Design e UX

### Estilo Visual
- **Fonte**: Inter (clean e profissional)
- **Cores**: Azul (#2563eb) como cor principal
- **Layout**: Grid responsivo com sidebar
- **Tipografia**: Hierarquia clara e legibilidade otimizada

### Experiência do Usuário
- **Loading States** - Animações durante carregamento dos anúncios
- **Error Handling** - Estados de erro gracefully handled
- **Performance** - Lazy loading de imagens
- **Acessibilidade** - Estrutura semântica e navegação por teclado

## 📊 Métricas e Analytics

### Tracking de Anúncios
```javascript
// Cada clique em anúncio registra:
{
    timestamp: "2025-09-16T10:30:00Z",
    userAgent: "Mozilla/5.0...",
    referrer: "https://google.com",
    url: "http://localhost:8000"
}
```

### Console Logs
O site registra logs detalhados no console do navegador:
- Carregamento de campanhas
- Renderização de anúncios
- Cliques e tracking
- Erros e fallbacks

## 🔧 Personalização

### Adicionar Novos Espaços Publicitários
```javascript
// Em script.js, adicione ao array adContainers:
{ id: 'novo-ad', type: 'banner', width: 728, height: 90 }
```

### Modificar Dados Mock
```javascript
// Em getMockCampaigns(), adicione novos anúncios:
{
    id: 7,
    title: "Seu Título Aqui",
    description: "Descrição do anúncio",
    targetUrl: "https://seu-site.com",
    campaignImage: "https://sua-imagem.com/banner.jpg",
    costPerClick: 2.00,
    budgetXlm: 1000,
    tags: "Tags, Separadas, Por, Vírgula",
    sponsor: "Nome da Empresa"
}
```

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Dispositivos
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (até 767px)

## 🚀 Deploy em Produção

### Configurações Necessárias
1. **CORS** - Configure o servidor da API para aceitar requests do domínio do site
2. **HTTPS** - Use HTTPS em produção para evitar mixed content
3. **CDN** - Configure CDN para servir imagens e assets estáticos

### Variáveis de Ambiente
```javascript
// Para produção, use variáveis de ambiente:
const API_URL = process.env.MERIDIAN_API_URL || 'https://api.meridian.com';
```

## 📋 Checklist de Teste

- [ ] Anúncios carregam corretamente
- [ ] Cliques são trackados na API
- [ ] Fallback para dados mock funciona
- [ ] Site é responsivo em todos os dispositivos
- [ ] Newsletter signup funciona
- [ ] Compartilhamento social funciona
- [ ] Barra de progresso está funcionando
- [ ] Console não mostra erros críticos

## 🎯 Próximos Passos

1. **Integração Real** - Conectar com a API real da plataforma
2. **A/B Testing** - Implementar testes A/B para posicionamento de anúncios
3. **Analytics** - Adicionar Google Analytics ou similar
4. **SEO** - Otimizar meta tags e structured data
5. **Performance** - Implementar service workers para cache
6. **Monetização** - Integrar com sistemas de pagamento por clique

---

**Nota**: Este é um site de demonstração. Em produção, certifique-se de seguir as melhores práticas de segurança e performance.