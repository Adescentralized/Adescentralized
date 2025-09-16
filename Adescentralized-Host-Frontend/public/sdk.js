/**
 * Stellar Ads SDK
 * SDK JavaScript para integração de anúncios descentralizados
 * 
 * Uso básico:
 * 1. Incluir <div id="stellar-ad-container" data-site-id="SEU_SITE_ID"></div> no HTML
 * 2. Incluir <script src="https://api.stellarads.com/sdk.js"></script>
 * 
 * Configuração avançada:
 * window.StellarAdsConfig = {
 *   siteId: 'SEU_SITE_ID',
 *   tags: ['tecnologia', 'programacao'],
 *   containerId: 'meu-container-personalizado',
 *   size: 'medium',
 *   debug: false
 * };
 */

(function() {
  'use strict';

  // Configuração padrão
  const CONFIG = {
    CONTAINER_ID: 'stellar-ad-container',
    API_BASE_URL: detectApiBaseUrl(),
    TIMEOUT: 8000,
    RETRY_ATTEMPTS: 3,
    DEBUG: false,
    VERSION: '2.0.0'
  };

  // Detecta a URL base da API
  function detectApiBaseUrl() {
    if (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1' ||
        window.location.port === '5500') {
      return 'http://localhost:3000'; // Nova porta para API de anúncios
    }
    return 'https://ads-api.stellarads.com';
  }

  // Namespace global
  window.StellarAdsSDK = window.StellarAdsSDK || {};

  /**
   * Classe principal do SDK
   */
  class StellarAdsSDK {
    constructor() {
      this.config = { ...CONFIG };
      this.containers = new Map();
      this.walletConnected = false;
      this.userPublicKey = null;
      this.debug = this.config.DEBUG;
      
      this.log('SDK inicializado', { version: this.config.VERSION });
    }

    /**
     * Método de logging
     */
    log(message, data = null) {
      if (this.debug) {
        console.log(`[StellarAds SDK] ${message}`, data || '');
      }
    }

    /**
     * Inicializa o SDK
     */
    async init() {
      try {
        this.log('Iniciando SDK...');
        
        // Aplicar configurações personalizadas
        if (window.StellarAdsConfig) {
          this.config = { ...this.config, ...window.StellarAdsConfig };
          this.debug = this.config.debug || this.config.DEBUG;
        }

        // Encontrar e inicializar containers
        await this.findAndInitContainers();
        
        // Verificar conexão com carteira
        await this.checkWalletConnection();
        
        this.log('SDK inicializado com sucesso');
      } catch (error) {
        this.log('Erro ao inicializar SDK:', error);
      }
    }

    /**
     * Encontra containers de anúncios e os inicializa
     */
    async findAndInitContainers() {
      const containers = document.querySelectorAll(`[data-site-id]`);
      
      for (const container of containers) {
        await this.initContainer(container);
      }
    }

    /**
     * Inicializa um container específico
     */
    async initContainer(container) {
      try {
        const siteId = container.getAttribute('data-site-id');
        const tags = container.getAttribute('data-tags');
        const size = container.getAttribute('data-size') || this.config.size || 'medium';
        
        if (!siteId) {
          this.log('Container ignorado: data-site-id não encontrado', container);
          return;
        }

        const containerId = container.id || `stellar-ad-${Date.now()}`;
        container.id = containerId;

        this.log(`Inicializando container ${containerId}`, { siteId, tags, size });

        const containerConfig = {
          id: containerId,
          element: container,
          siteId,
          tags: tags ? tags.split(',').map(t => t.trim()) : [],
          size,
          loaded: false
        };

        this.containers.set(containerId, containerConfig);
        
        // Aplicar estilos do container
        this.applyContainerStyles(container, size);
        
        // Carregar anúncios
        await this.loadAds(containerId);
        
      } catch (error) {
        this.log('Erro ao inicializar container:', error);
      }
    }

    /**
     * Aplica estilos ao container baseado no tamanho
     */
    applyContainerStyles(container, size) {
      const sizeMap = {
        small: { width: '300px', height: '250px' },
        medium: { width: '728px', height: '90px' },
        large: { width: '970px', height: '250px' },
        responsive: { width: '100%', height: 'auto', minHeight: '200px' }
      };

      const dimensions = sizeMap[size] || sizeMap.medium;
      
      Object.assign(container.style, {
        ...dimensions,
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '14px',
        color: '#6c757d',
        position: 'relative',
        overflow: 'hidden'
      });
    }

    /**
     * Carrega anúncios para um container
     */
    async loadAds(containerId) {
      const containerConfig = this.containers.get(containerId);
      if (!containerConfig) return;

      try {
        this.showLoading(containerConfig.element);
        
        const ads = await this.fetchAds(containerConfig);
        
        if (ads && ads.length > 0) {
          this.renderAd(containerConfig, ads[0]);
          containerConfig.loaded = true;
        } else {
          this.showNoAds(containerConfig.element);
        }
        
      } catch (error) {
        this.log('Erro ao carregar anúncios:', error);
        this.showError(containerConfig.element);
      }
    }

    /**
     * Busca anúncios da API
     */
    async fetchAds(containerConfig) {
      const params = new URLSearchParams({
        siteId: containerConfig.siteId
      });

      // Adicionar tags se existirem
      if (containerConfig.tags && containerConfig.tags.length > 0) {
        params.append('tags', containerConfig.tags.join(','));
      }

      const response = await fetch(`${this.config.API_BASE_URL}/api/ad?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: AbortSignal.timeout(this.config.TIMEOUT)
      });

      this.log(`API Response Status: ${response.status}`, response);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Verificar se a resposta tem sucesso e anúncio
      if (data.success && data.ad) {
        return [data.ad]; // Retornar como array
      }
      
      return [];
    }

    /**
     * Renderiza um anúncio no container
     */
    renderAd(containerConfig, ad) {
      const { element } = containerConfig;
      
      element.innerHTML = `
        <div class="stellar-ad" style="width: 100%; height: 100%; display: flex; align-items: center; text-decoration: none; color: inherit;">
          <div class="stellar-ad-content" style="display: flex; align-items: center; width: 100%; padding: 16px;">
            ${ad.imageUrl ? `
              <img src="${ad.imageUrl}" 
                   alt="${ad.title}" 
                   style="width: 60px; height: 60px; border-radius: 8px; margin-right: 16px; object-fit: cover;">
            ` : ''}
            <div style="flex: 1;">
              <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 600; color: #2d3748;">${ad.title}</h3>
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #4a5568; line-height: 1.4;">${ad.description}</p>
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 12px; color: #718096;">Patrocinado</span>
                <button class="stellar-ad-cta" style="
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  border: none;
                  padding: 6px 12px;
                  border-radius: 6px;
                  font-size: 12px;
                  font-weight: 500;
                  cursor: pointer;
                  transition: opacity 0.2s;
                " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                  Saiba mais
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      // Adicionar evento de clique
      const adElement = element.querySelector('.stellar-ad');
      adElement.addEventListener('click', () => this.handleAdClick(ad, containerConfig));
      
      // Registrar impressão
      this.trackImpression(ad, containerConfig);
    }

    /**
     * Manipula clique no anúncio
     */
    async handleAdClick(ad, containerConfig) {
      try {
        // Rastrear clique (já processa recompensas automaticamente)
        const result = await this.trackClick(ad, containerConfig);
        
        // Abrir URL do anúncio
        if (ad.targetUrl) {
          window.open(ad.targetUrl, '_blank');
        }
        
      } catch (error) {
        this.log('Erro ao processar clique:', error);
      }
    }

    /**
     * Rastreia impressão do anúncio
     */
    async trackImpression(ad, containerConfig) {
      try {
        const response = await fetch(`${this.config.API_BASE_URL}/api/impression`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            campaignId: ad.campaignId,
            siteId: containerConfig.siteId,
            userPublicKey: this.userPublicKey,
            hasWallet: !!this.userPublicKey,
            timestamp: Date.now()
          })
        });
        
        if (response.ok) {
          const result = await response.json();
          this.log('Impressão registrada', { campaignId: ad.campaignId, siteId: containerConfig.siteId });
          
          // Verificar se há recompensa para o usuário
          if (result.userReward) {
            this.showRewardNotification(result.userReward, 'impression');
          }
        }
      } catch (error) {
        this.log('Erro ao registrar impressão:', error);
      }
    }

    /**
     * Rastreia clique no anúncio
     */
    async trackClick(ad, containerConfig) {
      try {
        const response = await fetch(`${this.config.API_BASE_URL}/api/click?campaignId=${ad.campaignId}&siteId=${containerConfig.siteId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
          const result = await response.json();
          this.log('Clique registrado', { campaignId: ad.campaignId, siteId: containerConfig.siteId });
          
          // Verificar se há recompensa para o usuário
          if (result.userReward) {
            this.showRewardNotification(result.userReward, 'click');
          }
          
          return result;
        }
      } catch (error) {
        this.log('Erro ao registrar clique:', error);
        return null;
      }
    }

    /**
     * Verifica conexão com carteira Stellar
     */
    async checkWalletConnection() {
      try {
        if (typeof window.stellar !== 'undefined' || window.StellarWallet) {
          const wallet = window.stellar || window.StellarWallet;
          const account = await wallet.getPublicKey();
          
          if (account) {
            this.walletConnected = true;
            this.userPublicKey = account;
            this.log('Carteira conectada:', account);
          }
        }
      } catch (error) {
        this.log('Carteira não conectada ou não disponível');
      }
    }



    /**
     * Mostra notificação de recompensa
     */
    showRewardNotification(reward, actionType = 'view') {
      const actionText = actionType === 'click' ? 'clicou' : 'visualizou';
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
      `;
      
      notification.innerHTML = `
        🎉 Você ganhou ${reward.amount} XLM por ter ${actionText} este anúncio!
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 4000);
    }

    /**
     * Mostra estado de carregamento
     */
    showLoading(element) {
      element.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
          <div style="width: 20px; height: 20px; border: 2px solid #e1e5e9; border-top: 2px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 8px;"></div>
          <span style="color: #6c757d;">Carregando anúncios...</span>
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        </style>
      `;
    }

    /**
     * Mostra mensagem quando não há anúncios
     */
    showNoAds(element) {
      element.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; padding: 20px;">
          <div style="font-size: 24px; margin-bottom: 8px;">📢</div>
          <div style="color: #6c757d; font-size: 14px;">
            Nenhum anúncio disponível no momento
          </div>
        </div>
      `;
    }

    /**
     * Mostra mensagem de erro
     */
    showError(element) {
      element.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; padding: 20px;">
          <div style="font-size: 24px; margin-bottom: 8px;">⚠️</div>
          <div style="color: #e53e3e; font-size: 14px;">
            Erro ao carregar anúncios
          </div>
        </div>
      `;
    }

    /**
     * Atualiza anúncios periodicamente
     */
    startAutoRefresh(intervalMinutes = 5) {
      setInterval(() => {
        this.log('Atualizando anúncios automaticamente...');
        this.containers.forEach((_, containerId) => {
          this.loadAds(containerId);
        });
      }, intervalMinutes * 60 * 1000);
    }
  }

  // Inicializar SDK quando DOM estiver pronto
  function initSDK() {
    const sdk = new StellarAdsSDK();
    window.StellarAdsSDK.instance = sdk;
    
    sdk.init().then(() => {
      // Iniciar atualização automática se configurado
      if (window.StellarAdsConfig?.autoRefresh) {
        sdk.startAutoRefresh(window.StellarAdsConfig.refreshInterval || 5);
      }
    });
  }

  // Aguardar DOM ou inicializar imediatamente se já estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSDK);
  } else {
    initSDK();
  }

  // API pública
  window.StellarAdsSDK.refresh = function(containerId) {
    const instance = window.StellarAdsSDK.instance;
    if (instance) {
      if (containerId) {
        instance.loadAds(containerId);
      } else {
        instance.containers.forEach((_, id) => {
          instance.loadAds(id);
        });
      }
    }
  };

  window.StellarAdsSDK.version = CONFIG.VERSION;

})();
