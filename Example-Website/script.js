// Demo News Site - Ad Integration Script
// This script fetches real campaigns from the Meridian platform and displays them as ads

class AdManager {
    constructor() {
        this.apiUrl = 'http://localhost:3001'; // Change to your API URL
        this.adContainers = [];
        this.campaigns = [];
        this.loadedAds = new Set();
        
        this.init();
    }

    init() {
        // Initialize ad containers
        this.adContainers = [
            { id: 'top-banner-ad', type: 'banner', width: 728, height: 250 },
            { id: 'mid-article-ad', type: 'banner', width: 728, height: 250 },
            { id: 'bottom-article-ad', type: 'banner', width: 728, height: 250 },
            { id: 'sidebar-top-ad', type: 'sidebar', width: 300, height: 300 },
            { id: 'sidebar-middle-ad', type: 'sidebar', width: 300, height: 300 },
            { id: 'sidebar-bottom-ad', type: 'sidebar', width: 300, height: 300 }
        ];

        // Load campaigns and display ads
        this.loadCampaigns()
            .then(() => this.displayAds())
            .catch(error => {
                console.error('Failed to load campaigns:', error);
                this.showErrorState();
            });
    }

    async loadCampaigns() {
        try {
            console.log('Loading campaigns from API...');
            
            // Show loading state
            this.showLoadingState();
            
            const response = await fetch(`${this.apiUrl}/campaigns/active`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.campaigns = data.campaigns || [];
            
            console.log(`Loaded ${this.campaigns.length} campaigns:`, this.campaigns);
            
            // If no real campaigns, use mock data for demo
            if (this.campaigns.length === 0) {
                console.log('No real campaigns found, using mock data for demo');
                this.campaigns = this.getMockCampaigns();
            }
            
        } catch (error) {
            console.error('Error loading campaigns:', error);
            // Use mock data as fallback
            console.log('Using mock campaigns as fallback');
            this.campaigns = this.getMockCampaigns();
        }
    }

    getMockCampaigns() {
        return [
            {
                id: 1,
                title: "Revolutionary DeFi Platform - Earn 15% APY",
                description: "Join the future of decentralized finance with our innovative yield farming platform. Secure, transparent, and profitable.",
                targetUrl: "https://example-defi-platform.com",
                campaignImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                costPerClick: 2.50,
                budgetXlm: 1000,
                tags: "DeFi, Blockchain, Investment",
                sponsor: "DeFi Innovations Inc."
            },
            {
                id: 2,
                title: "Secure Crypto Wallet - Protected by Quantum Encryption",
                description: "Keep your digital assets safe with military-grade security and user-friendly interface. Supports 500+ cryptocurrencies.",
                targetUrl: "https://example-wallet.com",
                campaignImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                costPerClick: 1.75,
                budgetXlm: 750,
                tags: "Security, Wallet, Crypto",
                sponsor: "SecureVault Technologies"
            },
            {
                id: 3,
                title: "NFT Marketplace - Buy, Sell & Create Digital Art",
                description: "The premier destination for NFT trading. Low fees, high liquidity, and exclusive collections from top artists worldwide.",
                targetUrl: "https://example-nft-marketplace.com",
                campaignImage: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                costPerClick: 3.00,
                budgetXlm: 1500,
                tags: "NFT, Art, Marketplace",
                sponsor: "ArtChain Markets"
            },
            {
                id: 4,
                title: "Blockchain Development Course - 50% Off Limited Time",
                description: "Master blockchain development with hands-on projects. From smart contracts to dApps. Industry experts as instructors.",
                targetUrl: "https://example-blockchain-course.com",
                campaignImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                costPerClick: 1.25,
                budgetXlm: 500,
                tags: "Education, Blockchain, Development",
                sponsor: "BlockchainEDU Academy"
            },
            {
                id: 5,
                title: "Cryptocurrency Exchange - Zero Trading Fees This Month",
                description: "Trade Bitcoin, Ethereum, and 200+ altcoins with zero fees. Advanced trading tools and 24/7 customer support.",
                targetUrl: "https://example-crypto-exchange.com",
                campaignImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                costPerClick: 2.25,
                budgetXlm: 2000,
                tags: "Trading, Exchange, Cryptocurrency",
                sponsor: "CryptoTrade Pro"
            },
            {
                id: 6,
                title: "Smart Contract Auditing Service - Secure Your dApp",
                description: "Professional security audits for smart contracts. Detect vulnerabilities before deployment. Trusted by 500+ projects.",
                targetUrl: "https://example-audit-service.com",
                campaignImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                costPerClick: 4.00,
                budgetXlm: 800,
                tags: "Security, Audit, Smart Contracts",
                sponsor: "SecureCode Auditors"
            }
        ];
    }

    showLoadingState() {
        this.adContainers.forEach(container => {
            const element = document.getElementById(container.id);
            if (element) {
                element.classList.add('ad-loading');
                element.innerHTML = '<div class="ad-placeholder">Loading Advertisement...</div>';
            }
        });
    }

    showErrorState() {
        this.adContainers.forEach(container => {
            const element = document.getElementById(container.id);
            if (element) {
                element.classList.remove('ad-loading');
                element.classList.add('ad-error');
                element.innerHTML = '<div class="ad-placeholder">Failed to load advertisement</div>';
            }
        });
    }

    displayAds() {
        if (this.campaigns.length === 0) {
            console.log('No campaigns available to display');
            return;
        }

        // Shuffle campaigns for variety
        const shuffledCampaigns = [...this.campaigns].sort(() => Math.random() - 0.5);
        
        this.adContainers.forEach((container, index) => {
            const campaign = shuffledCampaigns[index % shuffledCampaigns.length];
            this.renderAd(container.id, campaign, container.type);
        });
    }

    renderAd(containerId, campaign, type) {
        const container = document.getElementById(containerId);
        if (!container || !campaign) return;

        // Remove loading and error states
        container.classList.remove('ad-loading', 'ad-error');
        container.classList.add('loaded');

        // Create ad content
        const adContent = document.createElement('div');
        adContent.className = 'ad-content';
        
        // Create ad HTML
        adContent.innerHTML = `
            <img src="${campaign.campaignImage}" alt="${campaign.title}" class="ad-image" loading="lazy">
            <div class="ad-info">
                <div class="ad-title">${this.truncateText(campaign.title, 50)}</div>
                <div class="ad-description">${this.truncateText(campaign.description, 80)}</div>
                <div class="ad-sponsor">Sponsored by ${campaign.sponsor}</div>
            </div>
        `;

        // Add click tracking
        adContent.addEventListener('click', () => {
            this.trackAdClick(campaign);
        });

        // Clear container and add new content
        container.innerHTML = '';
        container.appendChild(adContent);

        console.log(`Rendered ad for campaign "${campaign.title}" in container "${containerId}"`);
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    async trackAdClick(campaign) {
        try {
            console.log(`Ad clicked: ${campaign.title}`);
            
            // Track the click with the API
            const response = await fetch(`${this.apiUrl}/campaigns/${campaign.id}/click`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    referrer: document.referrer,
                    url: window.location.href
                })
            });

            if (response.ok) {
                console.log('Click tracked successfully');
            } else {
                console.warn('Failed to track click:', response.status);
            }

        } catch (error) {
            console.error('Error tracking click:', error);
        }

        // Redirect to campaign URL
        if (campaign.targetUrl) {
            // Open in new tab to keep user on news site
            window.open(campaign.targetUrl, '_blank', 'noopener,noreferrer');
        }
    }

    // Method to refresh ads (can be called periodically)
    async refreshAds() {
        console.log('Refreshing ads...');
        await this.loadCampaigns();
        this.displayAds();
    }
}

// Additional utility functions for the demo site
class NewsPageEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupNewsletterForms();
        this.setupSocialSharing();
        this.setupReadingProgress();
        this.setupSmoothScrolling();
    }

    setupNewsletterForms() {
        const forms = document.querySelectorAll('.newsletter-form, .footer-newsletter');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = form.querySelector('input[type="email"]').value;
                this.handleNewsletterSignup(email);
            });
        });
    }

    handleNewsletterSignup(email) {
        // Simulate newsletter signup
        console.log('Newsletter signup:', email);
        alert('Thank you for subscribing to FinTech Daily!');
    }

    setupSocialSharing() {
        const shareButtons = document.querySelectorAll('.share-btn');
        shareButtons.forEach(button => {
            button.addEventListener('click', () => {
                const text = button.textContent.toLowerCase();
                this.handleSocialShare(text);
            });
        });
    }

    handleSocialShare(platform) {
        const title = document.querySelector('.article-title').textContent;
        const url = window.location.href;
        
        let shareUrl = '';
        
        if (platform.includes('twitter')) {
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        } else if (platform.includes('linkedin')) {
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        } else if (platform.includes('copy')) {
            navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
            return;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }

    setupReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: #2563eb;
            z-index: 1000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const article = document.querySelector('.main-article');
            if (!article) return;

            const articleTop = article.offsetTop;
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;

            const start = articleTop - windowHeight / 2;
            const end = articleTop + articleHeight - windowHeight / 2;
            const progress = Math.max(0, Math.min(1, (scrollTop - start) / (end - start)));

            progressBar.style.width = (progress * 100) + '%';
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Demo News Site...');
    
    // Initialize ad manager
    window.adManager = new AdManager();
    
    // Initialize page enhancements
    window.newsEnhancements = new NewsPageEnhancements();
    
    // Refresh ads every 5 minutes
    setInterval(() => {
        if (window.adManager) {
            window.adManager.refreshAds();
        }
    }, 5 * 60 * 1000);
    
    console.log('Demo News Site initialized successfully!');
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AdManager, NewsPageEnhancements };
}