import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Plus, Settings, Trash2, Eye, Code, DollarSign, TestTube, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { apiService, Site, CreateSiteRequest } from "@/services/api";

export default function Sites() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [testingApi, setTestingApi] = useState<string | null>(null);
  const [apiTestResults, setApiTestResults] = useState<{[key: string]: any}>({});
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    revenueShare: "0.7"
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadSites();
  }, [user]);

  const loadSites = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token') || '';
      const sitesData = await apiService.getSites(user.id, token);
      console.log(sitesData)
      setSites(sitesData.sites);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os sites.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSite = async () => {
    if (!formData.name || !formData.domain || !user) {
      toast({
        title: "Erro",
        description: "Nome e domínio são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    try {
      const token = localStorage.getItem('auth_token') || '';

      const newSite = await apiService.createSite({
        name: formData.name, 
        domain: formData.domain, 
        revenueShare: parseFloat(formData.revenueShare), 
        stellarPublicKey: user.publicKey
      }, token);
      setSites([newSite, ...sites]);
      setCreateDialogOpen(false);
      setFormData({ name: "", domain: "", revenueShare: "0.7" });
      
      toast({
        title: "Sucesso",
        description: "Site criado com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar o site.",
        variant: "destructive"
      });
    }
  };

  const testAdApi = async (siteId: string) => {
    if (!siteId) return;
    
    setTestingApi(siteId);
    
    try {
      // Testar validação do site
      const validation = await apiService.validateSiteConfiguration(siteId);
      
      // Testar busca de anúncio
      const adResult = await apiService.getAdForSite(siteId, ['tecnologia', 'programacao']);
      
      // Testar estatísticas
      const stats = await apiService.getAdStats('24 hours');
      
      const results = {
        validation: validation.success,
        adFetch: adResult.success,
        stats: stats.success,
        details: {
          validation,
          adResult,
          stats
        }
      };
      
      setApiTestResults(prev => ({
        ...prev,
        [siteId]: results
      }));
      
      if (results.validation && results.adFetch) {
        toast({
          title: "Teste bem-sucedido!",
          description: "Site configurado corretamente e API funcionando.",
        });
      } else {
        toast({
          title: "Problemas encontrados",
          description: "Verifique a configuração da API de anúncios.",
          variant: "destructive"
        });
      }
      
    } catch (error) {
      console.error('Erro no teste da API:', error);
      toast({
        title: "Erro no teste",
        description: "Não foi possível conectar com a API de anúncios.",
        variant: "destructive"
      });
      
      setApiTestResults(prev => ({
        ...prev,
        [siteId]: {
          validation: false,
          adFetch: false,
          stats: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        }
      }));
    } finally {
      setTestingApi(null);
    }
  };

  const getTestResultBadge = (siteId: string) => {
    const result = apiTestResults[siteId];
    if (!result) return null;
    
    if (result.error) {
      return <Badge variant="destructive">Erro na API</Badge>;
    }
    
    if (result.validation && result.adFetch && result.stats) {
      return <Badge variant="default" className="bg-green-500">API OK</Badge>;
    }
    
    return <Badge variant="secondary">Problemas na API</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: "Ativo", variant: "default" as const },
      pending: { label: "Pendente", variant: "secondary" as const },
      suspended: { label: "Suspenso", variant: "destructive" as const }
    };

    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Meus Sites</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Meus Sites</h1>
          <p className="text-muted-foreground">
            Gerencie seus sites e configure anúncios para monetizar seu tráfego
          </p>
        </div>
        
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Site
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Site</DialogTitle>
              <DialogDescription>
                Registre um novo site para começar a exibir anúncios e ganhar receita.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Site</Label>
                <Input
                  id="name"
                  placeholder="Ex: Meu Blog de Tecnologia"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="domain">Domínio</Label>
                <Input
                  id="domain"
                  placeholder="Ex: meublog.com.br"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="revenueShare">Participação na Receita (%)</Label>
                <Select value={formData.revenueShare} onValueChange={(value) => setFormData({ ...formData, revenueShare: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.6">60%</SelectItem>
                    <SelectItem value="0.7">70%</SelectItem>
                    <SelectItem value="0.8">80%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateSite}>
                  Criar Site
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {sites.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Globe className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum site cadastrado</h3>
            <p className="text-muted-foreground mb-4">
              Adicione seu primeiro site para começar a monetizar com anúncios
            </p>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Primeiro Site
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <Card key={site.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{site.name}</CardTitle>
                    <CardDescription>{site.domain}</CardDescription>
                  </div>
                  {getStatusBadge(site.status)}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Receita</p>
                    <p className="font-semibold flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {site.total_revenue?.toFixed(2) || "0.00"} XLM
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Impressões</p>
                    <p className="font-semibold flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {site.total_impressions?.toLocaleString() || "0"}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Settings className="h-4 w-4 mr-1" />
                    Configurar
                  </Button>
                  <Link to={`/sdk-generator?siteId=${site.id}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      <Code className="h-4 w-4 mr-1" />
                      Gerar SDK
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => testAdApi(site.id)}>
                    <TestTube className="h-4 w-4 mr-1" />
                    Testar API
                  </Button>
                </div>
                {getTestResultBadge(site.id)}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
