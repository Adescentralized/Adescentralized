import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { DollarSign, Eye, Target, Users, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { apiService } from "@/services/api"
import { useToast } from "@/hooks/use-toast"

interface HostStats {
  totalSites: number;
  totalRevenue: number;
  totalImpressions: number;
  totalClicks: number;
  sites: Array<{
    id: string;
    name: string;
    domain: string;
    revenue: number;
    impressions: number;
    clicks: number;
    revenue_share: number;
    status: string;
  }>;
}

export default function Dashboard() {
  const [hostStats, setHostStats] = useState<HostStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user, token } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchHostData = async () => {
      if (!user?.id || !token) return

      try {
        setIsLoading(true)
        const hostData = await apiService.getDashboardStats(user.id, token)
        setHostStats(hostData)
      } catch (error) {
        console.log('Erro ao carregar dados do hospedante:', error)
        // Se não conseguir carregar, inicializar com dados vazios
        setHostStats({
          totalSites: 0,
          totalRevenue: 0,
          totalImpressions: 0,
          totalClicks: 0,
          sites: []
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchHostData()
  }, [user?.id, token])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  // Gerar estatísticas do hospedante
  const stats = [
    {
      title: "Total Sites",
      value: hostStats?.totalSites?.toString() || "0",
      change: hostStats?.totalSites > 0 ? "sites ativos" : "começe adicionando sites",
      icon: Target,
      color: "text-web3-primary"
    },
    {
      title: "Total Revenue",
      value: `${hostStats?.totalRevenue?.toFixed(2) || "0.00"} XLM`,
      change: "receita total gerada",
      icon: DollarSign,
      color: "text-web3-secondary"
    },
    {
      title: "Total Views",
      value: hostStats?.totalImpressions?.toLocaleString() || "0",
      change: "impressões de anúncios",
      icon: Eye,
      color: "text-web3-accent"
    },
    {
      title: "Total Clicks",
      value: hostStats?.totalClicks?.toString() || "0",
      change: "cliques em anúncios",
      icon: Users,
      color: "text-web3-success"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Host Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor your sites and ad revenue from hosting ads
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/sites">
            <Button className="bg-gradient-primary hover:opacity-90 text-white shadow-glow">
              Add New Site
            </Button>
          </Link>
          <Link to="/sdk-generator">
            <Button variant="outline">
              Get SDK Code
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-card border-border hover:shadow-card transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sites Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">My Sites</h2>
          <Button variant="outline">
            <Link to="/sites">Manage All Sites</Link>
          </Button>
        </div>
        
        {!hostStats?.sites || hostStats.sites.length === 0 ? (
          <Card className="bg-gradient-card border-border">
            <CardContent className="py-12 text-center">
              <div className="max-w-md mx-auto">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Start Hosting Ads</h3>
                <p className="text-muted-foreground mb-6">
                  Add your first site to start earning XLM by hosting decentralized ads
                </p>
                <Link to="/sites">
                  <Button className="bg-gradient-primary hover:opacity-90 text-white shadow-glow">
                    Add Your First Site
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {hostStats.sites.map((site: any) => (
              <Card key={site.id} className="bg-gradient-card border-border hover:shadow-card transition-all cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{site.name}</CardTitle>
                      <CardDescription className="mt-2">
                        {site.domain}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant="default" 
                      className={`${site.status === 'active' ? 'bg-web3-success' : 'bg-gray-500'}`}
                    >
                      {site.status === 'active' ? 'Hosting Ads' : 'Inactive'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Revenue Share Info */}
                  <div className="text-sm text-muted-foreground mb-2">
                    Revenue Share: {((site.revenue_share || 0.7) * 100).toFixed(0)}%
                  </div>
                  
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm font-medium">{(site.revenue || 0).toFixed(2)} XLM</div>
                      <div className="text-xs text-muted-foreground">Earned</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{(site.impressions || 0).toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Views</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{site.clicks || 0}</div>
                      <div className="text-xs text-muted-foreground">Clicks</div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 pt-2">
                    <Link to={`/sdk-generator?siteId=${site.id}`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full">
                        Get SDK
                      </Button>
                    </Link>
                    <Link to="/sites" className="flex-1">
                      <Button size="sm" variant="outline" className="w-full">
                        Settings
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}