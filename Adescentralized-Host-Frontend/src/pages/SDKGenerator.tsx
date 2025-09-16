import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Copy, Download, Eye, Globe, Zap, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { apiService, Site } from "@/services/api";

const availableTags = [
  "tecnologia", "programacao", "startups", "business", "marketing", 
  "design", "educacao", "saude", "esportes", "entretenimento",
  "financas", "criptomoedas", "blockchain", "ia", "mobile"
];

const containerSizes = [
  { id: "small", name: "Pequeno", dimensions: "300x250" },
  { id: "medium", name: "Médio", dimensions: "728x90" },
  { id: "large", name: "Grande", dimensions: "970x250" },
  { id: "responsive", name: "Responsivo", dimensions: "100%" }
];

export default function SDKGenerator() {
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [containerSize, setContainerSize] = useState("medium");
  const [containerId, setContainerId] = useState("stellar-ad-container");
  const [generatedCode, setGeneratedCode] = useState("");
  const [previewMode, setPreviewMode] = useState("html");
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadSites();
    
    // Se veio com siteId na URL, selecionar automaticamente
    const siteIdFromUrl = searchParams.get('siteId');
    if (siteIdFromUrl) {
      setSelectedSiteId(siteIdFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedSiteId) {
      generateSDKCode();
    }
  }, [selectedSiteId, selectedTags, containerSize, containerId]);

  const loadSites = async () => {
    if (!user) return;
    
    try {
      const token = localStorage.getItem('auth_token') || '';
      const sitesData = await apiService.getSites(user.id, token);
      // Filtrar apenas sites ativos para o gerador de SDK
      console.log(sitesData)
      const activeSites = sitesData.sites;
      setSites(activeSites);
    } catch (error) {
      console.error('Erro ao carregar sites:', error);
    }
  };

  const generateSDKCode = () => {
    if (!selectedSiteId) return;

    const selectedSite = sites.find(site => site.id === selectedSiteId);
    if (!selectedSite) return;

    const tagsAttribute = selectedTags.length > 0 
      ? ` data-tags="${selectedTags.join(',')}"`
      : '';

    const sizeAttribute = containerSize !== 'responsive' 
      ? ` data-size="${containerSize}"`
      : '';

    const htmlCode = `<!-- Stellar Ads SDK -->
<div id="${containerId}"
     data-site-id="${selectedSiteId}"${tagsAttribute}${sizeAttribute}>
    <!-- Anúncios serão carregados aqui -->
</div>

<script>
window.StellarAdsConfig = {
    siteId: '${selectedSiteId}',
    apiBaseUrl: 'http://localhost:3000', // API de anúncios na porta 3000
    debug: false
};
</script>
<script src="http://localhost:3000/sdk.js"></script>`;

    const jsCode = `// Configuração JavaScript do Stellar Ads SDK
window.StellarAdsConfig = {
    siteId: '${selectedSiteId}',
    tags: [${selectedTags.map(tag => `'${tag}'`).join(', ')}],
    containerId: '${containerId}',
    size: '${containerSize}',
    apiBaseUrl: 'http://localhost:3000', // API de anúncios na porta 3000
    debug: false
};

// Carregar SDK dinamicamente
const script = document.createElement('script');
script.src = 'http://localhost:3000/sdk.js';
script.async = true;
document.head.appendChild(script);`;

    const reactCode = `import { useEffect } from 'react';

const StellarAdsComponent = () => {
  useEffect(() => {
    // Configurar Stellar Ads
    window.StellarAdsConfig = {
      siteId: '${selectedSiteId}',
      tags: [${selectedTags.map(tag => `'${tag}'`).join(', ')}],
      containerId: '${containerId}',
      size: '${containerSize}',
      apiBaseUrl: 'http://localhost:3000', // API de anúncios na porta 3000
      debug: false
    };

    // Carregar SDK
    const script = document.createElement('script');
    script.src = 'https://api.stellarads.com/sdk.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Limpeza se necessário
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div 
      id="${containerId}"
      data-site-id="${selectedSiteId}"${tagsAttribute}${sizeAttribute}
      style={{ minHeight: '250px', background: '#f5f5f5' }}
    >
      {/* Anúncios serão carregados aqui */}
    </div>
  );
};

export default StellarAdsComponent;`;

    setGeneratedCode(previewMode === 'html' ? htmlCode : previewMode === 'javascript' ? jsCode : reactCode);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      toast({
        title: "Copiado!",
        description: "Código SDK copiado para a área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o código.",
        variant: "destructive"
      });
    }
  };

  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `stellar-ads-sdk-${selectedSiteId}.${previewMode === 'html' ? 'html' : 'js'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const selectedSite = sites.find(site => site.id === selectedSiteId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gerador de SDK</h1>
          <p className="text-muted-foreground">
            Configure e gere o código SDK personalizado para seus sites
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuração */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              Configuração do SDK
            </CardTitle>
            <CardDescription>
              Personalize as configurações do SDK para seu site
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Seleção do Site */}
            <div>
              <Label htmlFor="site">Site</Label>
              <Select value={selectedSiteId} onValueChange={setSelectedSiteId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um site" />
                </SelectTrigger>
                <SelectContent>
                  {sites.map((site) => (
                    <SelectItem key={site.id} value={site.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{site.name}</span>
                        <Badge variant={site.status === 'active' ? 'default' : 'secondary'} className="ml-2">
                          Ativo
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedSite && (
                <p className="text-sm text-muted-foreground mt-1">
                  Domínio: {selectedSite.domain}
                </p>
              )}
            </div>

            {/* ID do Container */}
            <div>
              <Label htmlFor="containerId">ID do Container</Label>
              <Input
                id="containerId"
                value={containerId}
                onChange={(e) => setContainerId(e.target.value)}
                placeholder="stellar-ad-container"
              />
            </div>

            {/* Tamanho do Container */}
            <div>
              <Label>Tamanho do Anúncio</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {containerSizes.map((size) => (
                  <div
                    key={size.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      containerSize === size.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setContainerSize(size.id)}
                  >
                    <div className="font-medium">{size.name}</div>
                    <div className="text-sm text-muted-foreground">{size.dimensions}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label>Tags de Conteúdo</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Selecione as tags que melhor descrevem o conteúdo do seu site
              </p>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={tag}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => toggleTag(tag)}
                    />
                    <Label
                      htmlFor={tag}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {selectedTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Preview e Código */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="mr-2 h-5 w-5" />
              Código SDK Gerado
            </CardTitle>
            <CardDescription>
              Copie e cole este código em seu site
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {selectedSiteId ? (
              <Tabs value={previewMode} onValueChange={setPreviewMode}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="react">React</TabsTrigger>
                </TabsList>
                
                <TabsContent value="html" className="space-y-4">
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={copyCode}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar
                    </Button>
                    <Button size="sm" variant="outline" onClick={downloadCode}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <Textarea
                    value={generatedCode}
                    readOnly
                    className="font-mono text-sm min-h-[300px]"
                  />
                </TabsContent>
                
                <TabsContent value="javascript" className="space-y-4">
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={copyCode}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar
                    </Button>
                    <Button size="sm" variant="outline" onClick={downloadCode}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <Textarea
                    value={generatedCode}
                    readOnly
                    className="font-mono text-sm min-h-[300px]"
                  />
                </TabsContent>
                
                <TabsContent value="react" className="space-y-4">
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={copyCode}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar
                    </Button>
                    <Button size="sm" variant="outline" onClick={downloadCode}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <Textarea
                    value={generatedCode}
                    readOnly
                    className="font-mono text-sm min-h-[300px]"
                  />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12">
                <Globe className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Selecione um site</h3>
                <p className="text-muted-foreground">
                  Escolha um site para gerar o código SDK personalizado
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instruções de Implementação */}
      {selectedSiteId && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              Instruções de Implementação
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Copie o código SDK</h4>
                  <p className="text-sm text-muted-foreground">
                    Use o botão "Copiar" para copiar o código gerado acima.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Cole no seu site</h4>
                  <p className="text-sm text-muted-foreground">
                    Adicione o código no local onde deseja exibir os anúncios em seu site.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Teste a implementação</h4>
                  <p className="text-sm text-muted-foreground">
                    Acesse seu site para verificar se os anúncios estão sendo carregados corretamente.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold">Monitore os ganhos</h4>
                  <p className="text-sm text-muted-foreground">
                    Acompanhe suas métricas e receita no dashboard da plataforma.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Dica Importante
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Certifique-se de que o domínio do seu site está registrado corretamente nas configurações. 
                    Anúncios só serão exibidos em domínios autorizados.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
