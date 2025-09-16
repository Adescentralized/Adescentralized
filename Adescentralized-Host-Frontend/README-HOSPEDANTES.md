# 🚀 Stellar Ads - Sistema de Anúncios Descentralizados

## 📋 Visão Geral

Sistema completo de anúncios descentralizados para **Hospedantes** integrarem em seus sites e monetizarem através do SDK Stellar Ads. O sistema permite que hospedantes cadastrem sites, gerem código SDK personalizado e acompanhem seus ganhos através de um dashboard intuitivo.

## 🎯 Funcionalidades Implementadas

### Para Hospedantes:
- ✅ **Gerenciamento de Sites** - Cadastro e configuração de sites
- ✅ **Gerador de SDK** - Código personalizado para integração (HTML, JavaScript, React)
- ✅ **Dashboard de Ganhos** - Acompanhamento de receita e estatísticas
- ✅ **Teste de API** - Validação da conectividade com backend de anúncios
- ✅ **Documentação** - Guia completo de implementação

### Para Usuários Finais:
- ✅ **Recompensas** - Ganhos em XLM por visualizar/clicar anúncios
- ✅ **Integração Wallet** - Conectividade com carteiras Stellar
- ✅ **Notificações** - Feedback visual das recompensas recebidas

### Para Anunciantes:
- ✅ **Campanhas** - Sistema para criar e gerenciar campanhas publicitárias
- ✅ **Segmentação** - Targeting por tags e categorias
- ✅ **Analytics** - Estatísticas de impressões e cliques

## 🏗️ Arquitetura do Sistema

```
Frontend (Porta 5173)
├── Dashboard Hospedantes
├── Gerador SDK
├── Gerenciamento Sites
└── Documentação

Backend Principal (Porta 3000)
├── Autenticação Usuários
├── Gerenciamento Sites
└── Dashboard Analytics

Backend Anúncios (Porta 3000)
├── API de Anúncios (/api/ad)
├── Tracking (/api/impression, /api/click)
├── Validação Sites (/api/validate-site)
└── Recompensas Usuários

SDK JavaScript (Público)
├── Integração Automática
├── Tracking Completo
├── Múltiplos Tamanhos
└── Recompensas Stellar
```

## 🚀 Como Executar

### 1. Instalar Dependências
```bash
npm install
# ou
bun install
```

### 2. Executar Frontend
```bash
npm run dev
# ou
bun dev
```

### 3. Executar Backends
**Backend Principal (porta 3000):**
```bash
# Navegar para diretório do backend principal
cd ../backend-principal
npm start
```

**Backend de Anúncios (porta 3000):**
```bash
# Navegar para diretório do backend de anúncios
cd ../backend-ads
npm start
```

### 4. Testar Integração
```bash
# Executar script de teste
./test-integration.sh
```

## 📖 Como Usar (Para Hospedantes)

### 1. Cadastrar Site
1. Acesse `/sites`
2. Clique em "Adicionar Site"
3. Preencha nome, domínio e revenue share
4. Salve o site

### 2. Gerar Código SDK
1. Na página do site, clique "Gerar SDK"
2. Escolha formato (HTML, JavaScript, React)
3. Configure tags para segmentação
4. Selecione tamanho do anúncio
5. Copie o código gerado

### 3. Implementar no Site
**HTML Simples:**
```html
<div data-site-id="SEU_SITE_ID" data-size="medium" data-tags="tecnologia,programacao"></div>
<script src="http://localhost:5173/sdk.js"></script>
```

**JavaScript:**
```javascript
window.StellarAdsConfig = {
  siteId: 'SEU_SITE_ID',
  tags: ['tecnologia', 'programacao'],
  size: 'medium',
  debug: true
};
```

**React:**
```jsx
import { useEffect } from 'react';

function AdContainer() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'http://localhost:5173/sdk.js';
    document.head.appendChild(script);
  }, []);

  return (
    <div 
      data-site-id="SEU_SITE_ID" 
      data-size="medium" 
      data-tags="tecnologia,programacao"
    />
  );
}
```

## 🎨 Tamanhos de Anúncios

| Tamanho | Dimensões | Uso Recomendado |
|---------|-----------|-----------------|
| `small` | 300x250 | Sidebar, conteúdo |
| `medium` | 728x90 | Header, banner |
| `large` | 970x250 | Hero, destaque |
| `responsive` | Flexível | Mobile, adaptável |

## 🔧 Configurações Avançadas

### Configuração Global do SDK
```javascript
window.StellarAdsConfig = {
  siteId: 'SEU_SITE_ID',
  tags: ['categoria1', 'categoria2'],
  size: 'medium',
  debug: false,
  autoRefresh: true,
  refreshInterval: 5 // minutos
};
```

### API Pública do SDK
```javascript
// Atualizar anúncios manualmente
window.StellarAdsSDK.refresh();

// Atualizar anúncio específico
window.StellarAdsSDK.refresh('container-id');

// Verificar versão
console.log(window.StellarAdsSDK.version);
```

## 📊 Dashboard e Analytics

O dashboard mostra:
- **Receita Total** em XLM
- **Impressões** acumuladas
- **Taxa de Cliques** (CTR)
- **Recompensas Distribuídas**
- **Sites Ativos**

## 🔒 Integração Wallet Stellar

Para usuários receberem recompensas:
1. Conectar wallet Stellar no site
2. Visualizar/clicar anúncios
3. Recompensas são creditadas automaticamente
4. Notificações mostram valor recebido

## 🧪 Teste e Validação

### Página de Demonstração
Acesse: `http://localhost:5173/demo-integration-test.html`

### Script de Teste Automático
```bash
chmod +x test-integration.sh
./test-integration.sh
```

### Testes Manuais
1. **API Status** - Verificar conectividade
2. **Carregamento Anúncios** - Diferentes tamanhos
3. **Tracking** - Impressões e cliques
4. **Recompensas** - Com carteira conectada
5. **Debug Mode** - Logs detalhados

## 📁 Estrutura de Arquivos

### Frontend
```
src/
├── pages/
│   ├── Sites.tsx          # Gerenciamento de sites
│   ├── SDKGenerator.tsx   # Gerador de código
│   ├── SDKDocs.tsx        # Documentação
│   └── Dashboard.tsx      # Analytics
├── services/
│   └── api.ts             # Integração com APIs
└── components/
    └── AppSidebar.tsx     # Navegação
```

### SDK Público
```
public/
├── sdk.js                 # SDK principal
├── demo-integration-test.html # Teste completo
└── demo-sdk.html          # Demonstração básica
```

## 🐛 Troubleshooting

### Anúncios não carregam
1. Verificar se backend na porta 3000 está rodando
2. Confirmar `data-site-id` está correto
3. Ativar debug mode: `window.StellarAdsConfig.debug = true`
4. Verificar console do navegador

### Recompensas não funcionam
1. Verificar conexão com carteira Stellar
2. Confirmar backend de anúncios está processando recompensas
3. Verificar logs do SDK

### Problemas de CORS
1. Configurar headers CORS no backend
2. Verificar URLs das APIs estão corretas
3. Testar com diferentes navegadores

## 🔄 Próximos Passos

### Melhorias Planejadas
- [ ] **Analytics Avançadas** - Métricas detalhadas por site
- [ ] **A/B Testing** - Otimização de anúncios
- [ ] **Proteção Fraude** - Validação de cliques legítimos
- [ ] **Blockchain Integration** - Transações on-chain
- [ ] **Mobile SDK** - Versão para aplicativos móveis

### Otimizações
- [ ] **Cache** - Reduzir chamadas à API
- [ ] **CDN** - Distribuição global do SDK
- [ ] **Compressão** - Menor tamanho do SDK
- [ ] **Lazy Loading** - Carregamento sob demanda

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

- **Documentação**: `/sdk-docs`
- **Issues**: GitHub Issues
- **Email**: suporte@stellarads.com
- **Discord**: [Servidor da Comunidade]

---

**Stellar Ads SDK v2.0.0** - Sistema de Anúncios Descentralizados
