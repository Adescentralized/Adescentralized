// API service for backend integration
import devMockService from './devMock';

const API_BASE_URL = 'http://localhost:3001'; // Backend principal (usuários, campanhas, sites)
const ADS_API_BASE_URL = 'http://localhost:3000'; // Novo backend de anúncios

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    publicKey: string;
  };
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

interface RegisterResponse {
  message: string;
  publicKey: string;
}

interface Site {
  id: string;
  name: string;
  domain: string;
  status: string;
  revenue_share: number;
  total_revenue?: number;
  total_impressions?: number;
  total_clicks?: number;
  created_at: string;
}

interface CreateSiteRequest {
  userId: string;
  name: string;
  domain: string;
  revenueShare: number;
}

interface UpdateSiteRequest {
  name?: string;
  domain?: string;
  revenueShare?: number;
  status?: string;
}

interface APIError {
  error: string;
}

class ApiService {
  private getAuthHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/wallet/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error((data as APIError).error || 'Login failed');
    }

    // Se o backend não retornar dados do usuário, buscar via wallet endpoint
    if (!data.user && data.token) {
      try {
        const walletData = await this.getWallet(credentials.email, data.token);
        const user = {
          id: walletData.user?.id || '1',
          email: credentials.email,
          name: data.user?.name || credentials.email.split('@')[0],
          publicKey: walletData.publicKey
        };
        return {
          ...data,
          user
        } as LoginResponse;
      } catch (error) {
        // Se falhar, criar um usuário básico
        const user = {
          id: '1',
          email: credentials.email,
          name: credentials.email.split('@')[0],
          publicKey: 'TEMP_PUBLIC_KEY'
        };
        return {
          ...data,
          user
        } as LoginResponse;
      }
    }

    return data as LoginResponse;
  }

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const response = await fetch(`${API_BASE_URL}/wallet/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error((data as APIError).error || 'Registration failed');
    }

    return data as RegisterResponse;
  }

  async getWallet(email: string, token: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/wallet/${email}`, {
        method: 'GET',
        headers: this.getAuthHeaders(token),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error((data as APIError).error || 'Failed to fetch wallet');
      }

      return data;
    } catch (error) {
      // Use mock data in development when backend is not available
      if (devMockService.shouldUseMock(error)) {
        console.warn('Backend not available, using mock wallet data');
        return devMockService.getMockWallet();
      }
      throw error;
    }
  }

  async getDashboard(userId: string, token: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/${userId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(token),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error((data as APIError).error || 'Failed to fetch dashboard data');
      }

      return data;
    } catch (error) {
      // Use mock data in development when backend is not available
      if (devMockService.shouldUseMock(error)) {
        console.warn('Backend not available, using mock data for dashboard');
        return devMockService.getMockDashboard();
      }
      throw error;
    }
  }

  async getCampaigns(userId: string, token: string) {
    const response = await fetch(`${API_BASE_URL}/advertisements/${userId}`, {
      method: 'GET',
      headers: this.getAuthHeaders(token),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error((data as APIError).error || 'Failed to fetch campaigns');
    }

    return data;
  }

  async createCampaign(formData: FormData, token: string) {
    const response = await fetch(`${API_BASE_URL}/advertisements`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error((data as APIError).error || 'Failed to create campaign');
    }

    return data;
  }

  async transfer(transferData: { fromEmail: string; toPublicKey: string; amount: number }, token: string) {
    const response = await fetch(`${API_BASE_URL}/transfer`, {
      method: 'POST',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(transferData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error((data as APIError).error || 'Transfer failed');
    }

    return data;
  }

  async getUserProfile(userId: string, token: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/${userId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(token),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error((data as APIError).error || 'Failed to fetch user profile');
      }

      return data;
    } catch (error) {
      // Use mock data in development when backend is not available
      if (devMockService.shouldUseMock(error)) {
        console.warn('Backend not available, using mock profile data');
        return devMockService.getMockProfile();
      }
      throw error;
    }
  }

  async getProfile(token: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        headers: this.getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Use mock data in development when backend is not available
      if (devMockService.shouldUseMock(error)) {
        console.warn('Backend not available, using mock profile data');
        return devMockService.getMockProfile();
      }
      throw error;
    }
  }

  // Sites management
  async getSites(userId: string, token: string): Promise<{sites: Site[]}> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sites`, {
        headers: this.getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch sites');
      }

      return await response.json();
    } catch (error) {
      console.warn('Backend not available, using mock sites data');
      // Return mock data for development
      return [
        {
          id: "site_1",
          name: "TechBlog Pro",
          domain: "techblog.com",
          status: "active",
          revenue_share: 0.7,
          total_revenue: 125.50,
          total_impressions: 15420,
          total_clicks: 892,
          created_at: new Date().toISOString()
        },
        {
          id: "site_2", 
          name: "News Portal",
          domain: "newsportal.com",
          status: "active",
          revenue_share: 0.8,
          total_revenue: 89.30,
          total_impressions: 8750,
          total_clicks: 445,
          created_at: new Date().toISOString()
        }
      ];
    }
  }

  async createSite(
    siteData: { name: string; domain: string; revenueShare: number; stellarPublicKey: string },
    token: string
  ): Promise<Site> {
    try {
      const response = await fetch(`${ADS_API_BASE_URL}/api/sites`, {
        method: 'POST',
        headers: this.getAuthHeaders(token),
        body: JSON.stringify(siteData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create site');
      }

      // O backend retorna { success, site, message }
      return {
        id: data.site.id,
        name: data.site.name,
        domain: data.site.domain,
        status: "pending",
        revenue_share: data.site.revenueShare,
        created_at: new Date().toISOString(),
      };
    } catch (error) {
      console.warn('Backend not available, creating mock site');
      return {
        id: `site_${Date.now()}`,
        name: siteData.name,
        domain: siteData.domain,
        status: "pending",
        revenue_share: siteData.revenueShare ?? 0.7,
        total_revenue: 0,
        total_impressions: 0,
        total_clicks: 0,
        created_at: new Date().toISOString()
      };
    }
  }

  async updateSite(siteId: string, updates: UpdateSiteRequest, token: string): Promise<Site> {
    try {
      const response = await fetch(`${API_BASE_URL}/sites/${siteId}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(token),
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error((errorData as APIError).error || 'Failed to update site');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async deleteSite(siteId: string, token: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/sites/${siteId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(token),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error((errorData as APIError).error || 'Failed to delete site');
      }
    } catch (error) {
      throw error;
    }
  }

  async getSDKCode(siteId: string, token: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/sites/${siteId}/sdk-code`, {
        headers: this.getAuthHeaders(token),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error((errorData as APIError).error || 'Failed to get SDK code');
      }

      const data = await response.json();
      return data.sdkCode;
    } catch (error) {
      throw error;
    }
  }

  async getDashboardStats(userId: string, token: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/${userId}`, {
        headers: this.getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }

      return await response.json();
    } catch (error) {
      console.warn('Backend not available, using mock dashboard data');
      // Return mock data for development
      return {
        totalSites: 2,
        totalRevenue: 214.80,
        totalImpressions: 24170,
        totalClicks: 1337,
        averageCtr: 5.53,
        sites: [
          {
            id: "site_1",
            name: "TechBlog Pro",
            domain: "techblog.com",
            revenue: 125.50,
            impressions: 15420,
            clicks: 892
          },
          {
            id: "site_2", 
            name: "News Portal",
            domain: "newsportal.com",
            revenue: 89.30,
            impressions: 8750,
            clicks: 445
          }
        ]
      };
    }
  }

  // Ads API Integration - Nova API na porta 3000
  async getAdForSite(siteId: string, tags?: string[]): Promise<any> {
    try {
      let apiUrl = `${ADS_API_BASE_URL}/api/ad?siteId=${encodeURIComponent(siteId)}`;
      
      if (tags && tags.length > 0) {
        const tagsParam = tags.map(tag => encodeURIComponent(tag.trim())).join(',');
        apiUrl += `&tags=${tagsParam}`;
      }

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar anúncio:', error);
      throw error;
    }
  }

  async recordAdImpression(campaignId: string, siteId: string, userPublicKey?: string): Promise<any> {
    try {
      const response = await fetch(`${ADS_API_BASE_URL}/api/impression`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId,
          siteId,
          userPublicKey,
          hasWallet: !!userPublicKey
        }),
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao registrar impressão:', error);
      throw error;
    }
  }

  async getAdStats(timeframe = '24 hours'): Promise<any> {
    try {
      const response = await fetch(`${ADS_API_BASE_URL}/api/stats?timeframe=${encodeURIComponent(timeframe)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar estatísticas de anúncios:', error);
      throw error;
    }
  }

  async validateSiteConfiguration(siteId: string, stellarPublicKey?: string): Promise<any> {
    try {
      const response = await fetch(`${ADS_API_BASE_URL}/api/validate-site`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          siteId,
          stellarPublicKey
        }),
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao validar configuração do site:', error);
      throw error;
    }
  }

  async getActiveCampaigns(): Promise<any> {
    try {
      const response = await fetch(`${ADS_API_BASE_URL}/api/campaigns`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar campanhas ativas:', error);
      throw error;
    }
  }

  async getUserRewards(siteId: string): Promise<any> {
    try {
      const response = await fetch(`${ADS_API_BASE_URL}/api/user-rewards?siteId=${encodeURIComponent(siteId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar recompensas do usuário:', error);
      throw error;
    }
  }

  async registerUserWallet(publicKey: string): Promise<any> {
    try {
      const response = await fetch(`${ADS_API_BASE_URL}/api/user-wallet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicKey
        }),
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao registrar carteira do usuário:', error);
      throw error;
    }
  }

  async getUserBalance(publicKey: string): Promise<any> {
    try {
      const response = await fetch(`${ADS_API_BASE_URL}/api/user-balance?publicKey=${encodeURIComponent(publicKey)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar saldo do usuário:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
export type { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse, 
  Site, 
  CreateSiteRequest, 
  UpdateSiteRequest 
};
