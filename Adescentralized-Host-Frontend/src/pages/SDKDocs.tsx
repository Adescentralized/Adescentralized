import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Code, Copy, ExternalLink, BookOpen, Zap, Shield, Globe, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SDKDocs() {
  const { toast } = useToast();

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copiado!",
      description: "Código copiado para a área de transferência.",
    });
  };

  const basicImplementation = `<!-- 1. Adicione o container -->
<div id="stellar-ad-container" 
     data-site-id="SEU_SITE_ID"
     data-tags="tecnologia,programacao">
</div>

<!-- 2. Carregue o SDK -->
<script src="https://api.stellarads.com/sdk.js"></script>`;

  const advancedConfig = `<!-- Configuração avançada -->
<script>
window.StellarAdsConfig = {
  siteId: 'SEU_SITE_ID',
  tags: ['tecnologia', 'programacao', 'blockchain'],
  size: 'medium',
  debug: true,
  autoRefresh: true,
  refreshInterval: 5 // minutos
};
</script>
<script src="https://api.stellarads.com/sdk.js"></script>`;

  const reactExample = `import { useEffect } from 'react';

const StellarAdsComponent = ({ siteId, tags = [], size = 'medium' }) => {
  useEffect(() => {
    // Configurar SDK
    window.StellarAdsConfig = {
      siteId,
      tags,
      size,
      debug: false
    };

    // Carregar SDK se ainda não estiver carregado
    if (!window.StellarAdsSDK) {
      const script = document.createElement('script');
      script.src = 'https://api.stellarads.com/sdk.js';
      script.async = true;
      document.head.appendChild(script);
    } else {
      // Refresh se SDK já estiver carregado
      window.StellarAdsSDK.refresh();
    }
  }, [siteId, tags, size]);

  return (
    <div 
      data-site-id={siteId}
      data-tags={tags.join(',')}
      data-size={size}
      style={{ minHeight: '200px' }}
    />
  );
};

export default StellarAdsComponent;`;

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Carregamento Assíncrono",
      description: "SDK leve que não bloqueia o carregamento da página"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Seguro e Confiável",
      description: "Verificação de domínio e proteção contra fraudes"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Responsivo",
      description: "Anúncios que se adaptam a qualquer tamanho de tela"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Fácil Integração",
      description: "Implementação em menos de 5 minutos"
    }
  ];

  const sizes = [
    { name: "small", dimensions: "300x250", description: "Ideal para sidebars" },
    { name: "medium", dimensions: "728x90", description: "Banner horizontal padrão" },
    { name: "large", dimensions: "970x250", description: "Leaderboard de alto impacto" },
    { name: "responsive", dimensions: "100%", description: "Se adapta ao container" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Documentação do SDK</h1>
          <p className="text-muted-foreground">
            Guia completo para integrar anúncios Stellar Ads em seu site
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.open('/demo-sdk.html', '_blank')}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Ver Demo
          </Button>
          <Button onClick={() => window.open('https://github.com/stellar-ads/sdk', '_blank')}>
            <Code className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </div>

      {/* Recursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <div className="text-primary mb-2">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Guia de implementação */}
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Implementação Básica</TabsTrigger>
          <TabsTrigger value="advanced">Configuração Avançada</TabsTrigger>
          <TabsTrigger value="react">React/Next.js</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Implementação Básica</CardTitle>
              <CardDescription>
                Adicione anúncios ao seu site em apenas 2 passos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1. Registre seu site</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Primeiro, registre seu site na plataforma para obter um Site ID
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">2. Adicione o código</h4>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{basicImplementation}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyCode(basicImplementation)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Alert>
                  <BookOpen className="h-4 w-4" />
                  <AlertDescription>
                    Substitua <code>SEU_SITE_ID</code> pelo ID do seu site obtido no dashboard.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuração Avançada</CardTitle>
              <CardDescription>
                Personalize o comportamento do SDK com configurações avançadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{advancedConfig}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyCode(advancedConfig)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Parâmetros de Configuração</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <code className="text-sm">siteId</code>
                      <span className="text-sm text-muted-foreground">ID do seu site (obrigatório)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <code className="text-sm">tags</code>
                      <span className="text-sm text-muted-foreground">Array de tags para direcionamento</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <code className="text-sm">size</code>
                      <span className="text-sm text-muted-foreground">Tamanho do anúncio (small, medium, large, responsive)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <code className="text-sm">debug</code>
                      <span className="text-sm text-muted-foreground">Ativar logs de debug</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <code className="text-sm">autoRefresh</code>
                      <span className="text-sm text-muted-foreground">Atualizar anúncios automaticamente</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <code className="text-sm">refreshInterval</code>
                      <span className="text-sm text-muted-foreground">Intervalo de atualização em minutos</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tamanhos disponíveis */}
          <Card>
            <CardHeader>
              <CardTitle>Tamanhos de Anúncios</CardTitle>
              <CardDescription>
                Escolha o tamanho ideal para cada posição em seu site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sizes.map((size) => (
                  <div key={size.name} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="outline">{size.name}</Badge>
                      <code className="text-sm">{size.dimensions}</code>
                    </div>
                    <p className="text-sm text-muted-foreground">{size.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="react" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integração com React/Next.js</CardTitle>
              <CardDescription>
                Componente React para facilitar a integração
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{reactExample}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyCode(reactExample)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Como usar:</h4>
                <pre className="bg-muted p-4 rounded-lg text-sm">
                  <code>{`<StellarAdsComponent 
  siteId="seu-site-id"
  tags={['tecnologia', 'programacao']}
  size="medium"
/>`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>
                Métodos e eventos disponíveis no SDK
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Métodos Globais</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded">
                      <code className="font-mono">StellarAdsSDK.refresh(containerId?)</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Atualiza anúncios. Se containerId for fornecido, atualiza apenas esse container.
                      </p>
                    </div>
                    <div className="p-3 border rounded">
                      <code className="font-mono">StellarAdsSDK.version</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Retorna a versão atual do SDK.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Atributos HTML</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded">
                      <code className="font-mono">data-site-id</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        ID do site (obrigatório)
                      </p>
                    </div>
                    <div className="p-3 border rounded">
                      <code className="font-mono">data-tags</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tags separadas por vírgula para direcionamento
                      </p>
                    </div>
                    <div className="p-3 border rounded">
                      <code className="font-mono">data-size</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tamanho do anúncio (small, medium, large, responsive)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Eventos</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded">
                      <code className="font-mono">stellar-ad-loaded</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Disparado quando um anúncio é carregado com sucesso
                      </p>
                    </div>
                    <div className="p-3 border rounded">
                      <code className="font-mono">stellar-ad-clicked</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Disparado quando um anúncio é clicado
                      </p>
                    </div>
                    <div className="p-3 border rounded">
                      <code className="font-mono">stellar-reward-earned</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Disparado quando o usuário ganha uma recompensa
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Suporte */}
      <Card>
        <CardHeader>
          <CardTitle>Precisa de Ajuda?</CardTitle>
          <CardDescription>
            Recursos de suporte e comunidade
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
              <BookOpen className="h-6 w-6 mb-2" />
              <span className="font-semibold">Documentação</span>
              <span className="text-xs text-muted-foreground">Guias detalhados</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
              <Globe className="h-6 w-6 mb-2" />
              <span className="font-semibold">Comunidade</span>
              <span className="text-xs text-muted-foreground">Discord & Telegram</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
              <Code className="h-6 w-6 mb-2" />
              <span className="font-semibold">GitHub</span>
              <span className="text-xs text-muted-foreground">Issues & PRs</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
