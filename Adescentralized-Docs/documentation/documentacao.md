# 🌟 Documentação do Projeto Hackathon  
**Nome do Projeto**: [Insira o nome do seu projeto]  
**Construído em**: Stellar Network  
**Nome da Equipe**: [Nome da sua equipe]  
**Hackathon**: [Nome do Hackathon]  
**Data**: [Data de submissão]

---

## 🔗 Índice

1. [Resumo Executivo & Introdução](#1-resumo-executivo--introducao)
2. [Declaração do Problema: Os Pontos de Dor](#2-declaracao-do-problema-os-pontos-de-dor)
3. [Público-Alvo & Personas de Usuário](#3-publico-alvo--personas-de-usuario)
4. [Análise de Mercado](#4-analise-de-mercado)
   - [4.1 Análise TAM, SAM, SOM](#41-analise-tam-sam-som)
5. [Análise SWOT](#5-analise-swot)
6. [Visão Geral da Solução](#6-visao-geral-da-solucao)
    - [6.1 MVP](#71-produto-minimamente-viavel)
    - [6.2 Diferenças e Vantagens](#72-diferencas-e-vantagens)
7. [Como Funciona: Arquitetura Técnica & MVP](#7-como-funciona-arquitetura-tecnica)
8. [Por que Stellar?](#8-por-que-stellar)
9. [Modelo de Negócios & Monetização](#9-modelo-de-negocios--monetizacao)
10. [Roteiro & Visão de Futuro](#10-roteiro--visao-de-futuro)
11. [Equipe & Funções](#11-equipe--funcoes)
12. [Referências](#12-referencias)

---

## 1. Resumo Executivo & Introdução

<i>Somos Adescentralized, uma plataforma de distribuição de publicidade que utiliza blockchain para garantir pagamentos transparentes e justos para todas as partes envolvidas. Nossa missão é conectar empresas a uma audiência genuína, garantindo que cada visualização seja verificada e devidamente recompensada.<i>

Adescentralized é uma plataforma de publicidade descentralizada que revoluciona a forma como anúncios são distribuídos e recompensados. Nosso objetivo é criar um ecossistema publicitário transparente e justo que beneficie todos os envolvidos: empresas, sites parceiros e, principalmente, usuários.

Nossa solução consiste em três componentes interconectados, todos impulsionados pela tecnologia blockchain.

As empresas usam nosso site para gerenciar facilmente suas campanhas publicitárias. Um painel abrangente permite definir orçamentos e monitorar o desempenho em tempo real, com acesso a métricas detalhadas como visualizações, engajamento e geração de leads. Cada visualização de anúncio e interação do usuário é registrada de forma segura na blockchain, com um hash de verificação e um ID de usuário criptografado, garantindo total integridade dos dados.

Para os usuários finais, nossa extensão de navegador serve como porta de entrada. Uma vez ativada, os usuários podem optar por visualizar anúncios e, em troca, são recompensados financeiramente por cada impressão. Utilizamos XLM (Stellar Lumens) da rede Stellar para permitir transações rápidas e seguras com taxas mínimas—cumprindo nossa promessa de recompensas reais e tangíveis pela atenção dos usuários.

Além disso, sites parceiros integram nossa solução para exibir anúncios e recebem automaticamente uma parte do investimento do anunciante via contratos inteligentes. Isso garante um processo de pagamento totalmente automatizado, sem intermediários.

Stellar é a base da nossa plataforma. Sua infraestrutura global de pagamentos—capaz de processar transações em segundos a frações de centavo—é a única rede robusta o suficiente para suportar nosso modelo de recompensa por impressão em larga escala.

Em todas as etapas, atuamos como guardiões da transparência. Gerenciamos o capital investido, validamos visualizações de anúncios via nossa API e garantimos distribuição justa dos fundos entre usuários e sites publicadores.

Adescentralized prova que a publicidade pode ser descentralizada, benéfica e transparente—para todos.


---

## 2. Declaração do Problema: Os Pontos de Dor

### Principais Problemas:

**Pesquisa de Campo: Validação dos Problemas Centrais do Adescentralized**

* a. Publicidade como Método Primário para Geração de Leads em Empresas

A geração de leads é amplamente reconhecida como um dos objetivos mais críticos do marketing, com a publicidade paga desempenhando papel central na aquisição de leads qualificados. Segundo estatísticas do setor, **91% dos profissionais de marketing consideram a geração de leads sua principal prioridade**, destacando sua importância para o crescimento dos negócios[^5]. Isso está alinhado ao fato de que a geração de leads atua como base do funil de vendas, conectando empresas a potenciais clientes e possibilitando crescimento de receita[^4]. A publicidade paga é especialmente eficaz em estratégias outbound, permitindo que empresas alcancem proativamente públicos-alvo[^1]. Além disso, plataformas como redes sociais permitem que empresas usem publicidade segmentada para atingir demografias específicas, resultando em leads de maior qualidade[^3]. Diante desse contexto, sistemas publicitários eficientes e confiáveis são essenciais para o desenvolvimento sustentável dos negócios.

* b. Altos Custos da Publicidade Digital nas Plataformas Atuais

Apesar de sua eficácia, a publicidade digital tornou-se cada vez mais cara, especialmente em plataformas dominantes como Google e Facebook. Por exemplo, o custo médio por clique (CPC) nos anúncios de busca do Google varia de **$2,32 a $2,69**, enquanto os custos na Rede de Display do Google ficam em torno de **$0,63–$0,67**[^11][^13]. Em alguns setores, como jurídico ou imobiliário, os CPCs podem ultrapassar **$4**[^20]. No Facebook, o CPC médio varia entre **$0,58 e $1,35**, dependendo da fonte, com CPM (custo por mil impressões) entre **$8,60 e $14,40**[^11][^17][^19]. Esses altos custos pressionam significativamente os orçamentos de marketing, especialmente para pequenas e médias empresas. À medida que a concorrência se intensifica, os anunciantes enfrentam preços crescentes por visibilidade, tornando mais difícil obter retorno positivo sobre o investimento. O peso financeiro dessas plataformas reforça a necessidade de alternativas mais eficientes em custo.

* c. Falta de Transparência e Fraude na Indústria de Publicidade Digital

Um grande problema sistêmico na publicidade digital é a falta de transparência em relação ao desempenho dos anúncios, verificação de audiência e alocação de orçamento. Pesquisas do setor indicam que a confiança permanece um problema crítico devido a práticas como rebates ocultos e fraude digital[^21]. Só a fraude publicitária é um problema multibilionário, envolvendo práticas enganosas que distorcem métricas como visualizações e cliques, drenando orçamentos sem entregar engajamento real[^24]. No primeiro semestre de 2019, a fraude em instalações de aplicativos custou à indústria **$2,3 bilhões**, ilustrando a escala do problema[^22]. Atividades fraudulentas não apenas aumentam custos, mas também distorcem dados de desempenho, levando a decisões ruins e uso ineficiente de recursos de marketing[^25]. Essa falta de responsabilidade mina a confiança nos modelos atuais e destaca a necessidade de sistemas verificáveis e à prova de adulteração.

* d. Ineficiências Causadas por Intermediários no Ecossistema Ad Tech

A cadeia de suprimentos da publicidade digital envolve inúmeros intermediários—como redes de anúncios, plataformas de demanda e provedores de dados—que absorvem uma parte significativa do orçamento publicitário. Estudos mostram que taxas de intermediários podem variar de **22% a 45%** de cada impressão, com média de **35% sendo absorvida por players de ad-tech** antes de chegar aos publishers[^38]. Essa ineficiência significa que grande parte do gasto do anunciante não vai para entrega de conteúdo ou engajamento de audiência. Apesar de esforços para otimizar a cadeia de suprimentos, estima-se que **$26,8 bilhões ainda sejam perdidos anualmente** devido a ineficiências estruturais na publicidade programática[^34]. A complexidade e opacidade dessas transações dificultam para anunciantes avaliarem o verdadeiro valor recebido, reforçando a necessidade de um sistema descentralizado e automatizado que minimize intermediários e maximize a transparência.

---

Essas constatações confirmam que os problemas que o Adescentralized busca resolver—altos custos, falta de transparência, fraude publicitária e taxas excessivas de intermediários—são bem documentados e profundamente enraizados no cenário atual da publicidade digital. Ao utilizar blockchain, contratos inteligentes e um modelo de recompensa ao usuário, o Adescentralized oferece uma solução validada e oportuna para esses desafios do setor.

---

## 3. Público-Alvo & Personas de Usuário

### Persona 1

Nome: Ricardo (45 anos)  
Cargo: Proprietário de um pequeno e-commerce de produtos artesanais

Ricardo é um empreendedor experiente que construiu sua marca com muito esforço. Ele sabe que a publicidade online é vital para o crescimento, mas sente que os custos estão fora de controle. Gasta a maior parte do orçamento nas principais plataformas de anúncios do mercado, mas os relatórios parecem uma "caixa preta". Ricardo não consegue entender claramente como seu dinheiro é gasto e se as visualizações realmente convertem em clientes. Ele precisa de uma forma mais eficiente e transparente de investir para obter retornos reais.

**Objetivos:**

- Aumentar as vendas de forma sustentável
- Reduzir o custo de aquisição de clientes
- Ter total transparência sobre o desempenho das campanhas e onde cada centavo é gasto

**Frustrações:**

- Custo por impressão cada vez mais alto
- Falta de clareza nos relatórios de desempenho
- Sensação de não ter controle total sobre o investimento

**Por que o Adescentralized é a Solução Ideal?**  
A plataforma de publicidade do Adescentralized com seu painel claro oferece a transparência que Ricardo busca. Ele pode ver exatamente em quais sites seus anúncios aparecem, e o pagamento por visualização via blockchain garante que ele só pague por interações verificadas. O modelo de custos mais justo do Adescentralized permite que Ricardo alcance mais pessoas com o mesmo dinheiro.

### Persona 2

Nome: Mariana (30 anos)  
Ocupação: Criadora de conteúdo e dona de um blog de jardinagem

Mariana dedicou anos para construir uma comunidade engajada em seu blog. Monetiza seu conteúdo por meio de redes tradicionais de anúncios, mas está frustrada com o baixo retorno. Sente-se explorada, pois a maior parte da receita gerada pelo tráfego do site vai para a rede de anúncios, não para ela. Os pagamentos são baixos e inconsistentes. Além disso, ela não tem controle sobre os tipos de anúncios exibidos em sua página, o que às vezes polui a experiência de leitura e faz com que perca credibilidade com a audiência.

**Objetivos:**

- Ganhar dinheiro justo com seu conteúdo de qualidade
- Receber pagamentos rápidos e transparentes
- Manter a confiança da audiência exibindo anúncios relevantes

**Frustrações:**

- Pagamentos baixos e atrasos na liberação da receita
- Falta de controle sobre os anúncios exibidos
- Sensação de que as redes de anúncios "roubam" sua receita

**Por que o Adescentralized é a Solução Ideal?**  
O Adescentralized resolve diretamente a falta de transparência e os baixos pagamentos. O modelo de contrato inteligente garante que Mariana receba sua parte do investimento automaticamente e em tempo real. Ela terá total visibilidade sobre quanto está ganhando, e a transação é verificável na blockchain, construindo uma relação de confiança.

### Persona 3

Nome: João (25 anos)  
Ocupação: Estudante universitário e entusiasta de tecnologia/privacidade

João se preocupa profundamente com sua privacidade digital. Usa bloqueadores de anúncios e limpa regularmente os cookies do navegador porque odeia se sentir rastreado e bombardeado por anúncios invasivos e irrelevantes. Ele sabe que a publicidade sustenta a internet, mas se recusa a ser um "produto". Já ouviu falar de outras soluções de recompensa por visualização, mas a volatilidade das moedas e a necessidade de trocar de navegador o desanimam. Procura uma forma de ter mais controle sobre sua experiência online e ser valorizado por sua atenção.

**Objetivos:**

- Proteger sua privacidade
- Navegar na internet sem interrupções
- Se possível, ser recompensado de forma justa por visualizar anúncios sem precisar mudar totalmente seus hábitos de navegação

**Frustrações:**

- Anúncios invasivos
- Sensação de que seus dados são usados sem consentimento
- Complexidade e ganhos voláteis de outras soluções de recompensa

**Por que o Adescentralized é a Solução Ideal?**  
O Adescentralized se encaixa perfeitamente no estilo de vida de João. A extensão de navegador simples de ativar e os pagamentos via blockchain com baixas taxas e transações rápidas resolvem o problema de volatilidade e complexidade. Ele é recompensado de forma transparente e verificável na blockchain, atendendo às suas preocupações de privacidade e desejo de ser valorizado.

---

## 4. Análise de Mercado

### 4.1 Análise TAM, SAM, SOM

Compreender o Mercado Total Endereçável (TAM), Mercado Disponível Servível (SAM) e Mercado Obtido Servível (SOM) é crucial para avaliar o potencial do Adescentralized—uma plataforma de publicidade descentralizada que utiliza blockchain para garantir transparência, reduzir fraudes e recompensar usuários e publishers de forma justa.

#### Mercado Total Endereçável (TAM)

**TAM**

O TAM representa o mercado global total de publicidade digital. É a receita máxima que sua empresa poderia gerar se não houvesse concorrentes e todos os potenciais clientes do mundo usassem sua solução. Sua proposta, como plataforma abrangente de anúncios para sites, usuários e empresas, está alinhada ao mercado total de publicidade digital e parte do mercado de tecnologia publicitária (AdTech).

Em 2025, o mercado global de publicidade digital deve atingir aproximadamente $678,7 bilhões [^1]. Outras fontes estimam o mercado de AdTech em $843,48 bilhões em 2025 [^2]. A projeção de crescimento para o mercado de publicidade digital é de 9,47% entre 2025 e 2034, demonstrando potencial de expansão sustentada.

**Mercado Disponível Servível (SAM)**

O SAM é a parcela do TAM que sua empresa pode realmente atender com seus produtos e serviços, considerando tecnologia e segmentação de mercado. Sua proposta, Adescentralized, não irá competir diretamente com gigantes do mercado em todos os segmentos. O foco em descentralização e micropagamentos via blockchain para todas as partes direciona seu mercado disponível para o nicho de publicidade transparente e eficiente em custos.

O mercado de publicidade programática—que envolve anúncios comprados e vendidos automaticamente (similar à sua proposta)—é parte crucial do seu SAM, projetado para atingir $953,9 bilhões em 2025 [^3]. Além disso, sua solução é ideal para pequenas e médias empresas (PMEs) que buscam alternativas mais transparentes. O mercado de publicidade digital para PMEs deve gerar até $640 bilhões em 2025 [^4], mostrando uma oportunidade significativa.

**Mercado Obtido Servível (SOM)**

O SOM é a parcela do SAM que sua empresa pode capturar no curto prazo, considerando sua realidade de lançamento e concorrência. Representa seu mercado "obtido". Para o Adescentralized, o SOM seria o volume de negócios que pode capturar no primeiro ano ou nos próximos três anos, dependendo da estratégia de entrada.

Inicialmente, sua empresa pode focar em um nicho como o mercado de marketing de influenciadores, que é um sub-nicho do seu SAM, projetado para atingir aproximadamente $32,55 bilhões em 2025 [^5]. Esse mercado sofre com falta de métricas transparentes, e sua proposta de usar blockchain para garantir visualizações e pagamentos verificados é um diferencial competitivo. Seu SOM inicial pode ser uma pequena porcentagem desse mercado que pode ser capturada com um produto superior e marketing agressivo.
---

## 5. Análise SWOT

### Google Ads

* **Forças**

Os pontos fortes do Google Ads explicam por que a plataforma domina o mercado de publicidade digital.

Alcance e Escala Incomparáveis: O Google Ads é a maior plataforma de publicidade do mundo. O Google detém mais de 90% do mercado global de buscas, garantindo enorme alcance por meio de sua rede de busca e display, incluindo YouTube e Gmail. [^1]

Intenção do Usuário: O principal diferencial é a capacidade de segmentar usuários com base na intenção. Isso permite que uma empresa apareça exatamente quando o usuário está buscando ativamente um produto ou serviço. [^2]

Dados e Automação: A inteligência artificial do Google Ads, especialmente em campanhas como Performance Max, permite otimização automática de lances e segmentação de público usando a vasta quantidade de dados coletados pelo Google. [^3]

* **Fraquezas**

Apesar de ser um gigante, o Google Ads tem fraquezas que criam os pontos de dor que sua solução busca resolver.

Altos Custos: O modelo de leilão competitivo do Google Ads pode levar a custos muito altos por clique (CPC) e por aquisição (CPA) em mercados saturados. Isso torna a plataforma menos acessível para pequenas empresas com orçamentos limitados, que podem gastar muito sem retorno garantido. [^4]

Complexidade da Plataforma: O Google Ads é conhecido por sua complexidade e curva de aprendizado acentuada. A ampla gama de métricas, configurações e ferramentas pode ser esmagadora para iniciantes. [^5]

Falta de Transparência: O aumento da automação transforma a plataforma em uma "caixa preta". Os anunciantes têm menos controle e informações sobre onde seus anúncios são exibidos e quais palavras-chave geram resultados, criando desconfiança sobre a eficiência dos gastos. [^6]

* **Oportunidades**

As oportunidades do Google Ads estão ligadas a novas tecnologias e tendências de mercado que também podem ser aproveitadas pela sua solução.

Avanços em Inteligência Artificial e Machine Learning: O Google pode aprimorar ainda mais seus algoritmos para entender a intenção do usuário de forma mais profunda, oferecendo anúncios ainda mais relevantes e lucrativos. A IA pode prever necessidades futuras dos consumidores, criando novas oportunidades de segmentação. [^7]

Integração com Plataformas de Vídeo (YouTube) e Conteúdo: O Google tem grande oportunidade de integrar sua publicidade de forma mais envolvente com YouTube, Google Discover e outras plataformas, criando novos métodos de monetização e formatos de anúncio.

* **Ameaças**

As ameaças ao Google Ads são os riscos que a plataforma enfrenta e que podem abrir espaço para novos concorrentes como o Adescentralized.

Crescimento de Concorrentes: Plataformas como Meta (Facebook e Instagram), TikTok e Amazon Ads estão crescendo e capturando uma fatia significativa do mercado publicitário, oferecendo alternativas para segmentação social e de e-commerce que competem com o Google. [^8]

Adoção de Ad-Blockers: O aumento das preocupações com privacidade e o volume de anúncios intrusivos levaram milhões de usuários a adotar bloqueadores de anúncios. Isso reduz a receita do Google e é uma das maiores ameaças ao seu modelo de negócios. [^9]

Regulação e Preocupações com Privacidade: Governos ao redor do mundo estão implementando leis de proteção de dados, como o GDPR na Europa, que limitam o rastreamento de usuários. Isso pode forçar o Google a mudar suas práticas de coleta de dados e personalização de anúncios, ameaçando diretamente seu modelo de segmentação. [^10]

### Brave

* **Forças**

Foco em Privacidade e Segurança: O Brave foi construído com privacidade como pilar fundamental, bloqueando anúncios e rastreadores por padrão. Isso atrai usuários preocupados com sua pegada digital.

Velocidade e Performance: Ao bloquear conteúdo desnecessário, o Brave carrega páginas mais rápido, proporcionando uma experiência de navegação mais fluida [^3].

Brave Rewards e BAT: O sistema de recompensas único, que utiliza o Basic Attention Token (BAT), oferece aos usuários a opção de ganhar BAT por visualizar anúncios que preservam a privacidade, criando um modelo alternativo de receita que valoriza o usuário [^3].

Integração Nativa: O Brave possui recursos como IPFS (InterPlanetary File System) e Tor integrados ao navegador, fornecendo ferramentas avançadas de privacidade e descentralização sem necessidade de extensões externas [^3].

* **Fraquezas**

Baixa Participação de Mercado: Apesar do crescimento, a base de usuários do Brave ainda é consideravelmente menor em comparação a gigantes como Chrome e Firefox [^2].

Dependência da Adoção do BAT: O sucesso do sistema Brave Rewards depende da adoção e valorização do token BAT, que pode ser volátil e sujeito às flutuações do mercado de criptomoedas [^1].

Possível Resistência de Anunciantes: O modelo de bloqueio de anúncios do Brave pode enfrentar resistência de anunciantes e publishers que dependem da receita publicitária para sustentar seus negócios.

Curva de Aprendizado: Alguns recursos, como a carteira de criptomoedas e o sistema de recompensas, podem ser complexos para usuários menos familiarizados com tecnologia e o universo das criptos.

* **Oportunidades**

Crescimento da Preocupação com Privacidade Online: O aumento recente de casos de vazamento de dados e discussões globais sobre privacidade pode levar mais usuários a migrar para navegadores como o Brave, que priorizam segurança.

Expansão para Novos Mercados: O Brave pode focar em mercados emergentes onde a conscientização sobre privacidade é alta e a adoção de tecnologias inovadoras é mais rápida.

Parcerias Estratégicas: O Brave pode formar parcerias com empresas e projetos focados em tecnologia e privacidade para expandir seu ecossistema.

Desenvolvimento de Novos Recursos: O Brave pode continuar inovando ao adicionar funcionalidades que o diferenciem ainda mais dos concorrentes, como VPN nativa ou ferramentas avançadas de segurança.

* **Ameaças**

Concorrência dos Gigantes do Mercado: Google Chrome, Mozilla Firefox, Microsoft Edge e outros navegadores com grandes bases de usuários e recursos sólidos permanecem como ameaça competitiva.

Mudanças nas Políticas de Publicidade: Gigantes da tecnologia podem implementar novas políticas de publicidade que restrinjam o modelo de negócios do Brave.

Regulação Governamental: Regulamentações sobre criptomoedas podem impactar a viabilidade e operação do sistema de recompensas do Brave.

Adoção de Tecnologias de Privacidade por Concorrentes: Outros navegadores podem começar a integrar recursos de privacidade e bloqueio de anúncios, diminuindo a vantagem competitiva do Brave.

---

## 6. Visão Geral da Solução

### Canvas da Proposta de Valor:

<div align="center">

*IMAGEM 1 - Canvas da Proposta de Valor*

<img src="../assets_documentation/canvasValueProposition.png" width="100%"><br>

<sup>Fonte: Material elaborado pelos autores, 2025</sup>

 </div>

**Pontos de Dor**
- Altos custos da publicidade digital nas principais plataformas
- Falta de transparência e prevalência de fraude publicitária
- Ineficiências e taxas excessivas de intermediários
- Dificuldade em verificar o engajamento genuíno da audiência

**Tarefas do Cliente**
- Adquirir leads qualificados e impulsionar o crescimento do negócio
- Gerenciar e otimizar campanhas publicitárias
- Garantir que o investimento em anúncios gere engajamento real e ROI
- Recompensar usuários e publishers de forma justa pela participação

**Ganhos**
- Campanhas publicitárias eficientes e transparentes
- Métricas verificáveis e à prova de adulteração
- Pagamentos automatizados e justos para todas as partes
- Maior confiança e satisfação para anunciantes, usuários e publishers

---

### Mapa de Valor

**Produtos & Serviços**
- Plataforma descentralizada de distribuição de anúncios (construída na Stellar)
- Painel web para anunciantes
- Extensão de navegador para usuários
- Integração via API para publishers
- Verificação via blockchain e contratos inteligentes

**Criadores de Ganhos**
- Taxas menores e recompensas diretas pela atenção do usuário
- Análises em tempo real e acompanhamento de desempenho de campanhas
- Liquidações automatizadas—sem intermediários
- Pagamentos rápidos e globais usando a infraestrutura Stellar

**Aliviadores de Dor**
- Métricas transparentes e à prova de fraude
- Pagamentos automatizados e transparentes para usuários e publishers
- Redução de custos operacionais e complexidade
- Engajamento de audiência verificável via blockchain

---

*Este canvas mostra como a solução do Adescentralized aborda diretamente os pontos de dor, tarefas e ganhos dos clientes-alvo, entregando criadores de ganhos e aliviadores de dor claros por meio de seus produtos e serviços.*
---

### 6.1. Produto Minimamente Viável

----- AVISO!!!

### 6.2. Diferenças e Vantagens

1. **Privacidade por Design: Adeus ao Rastreamento de Dados**  
Um dos maiores benefícios do seu aplicativo é eliminar a necessidade de rastrear usuários. Diferente das plataformas tradicionais de publicidade que constroem perfis detalhados de histórico de navegação, interesses pessoais e localização, o Adescentralized foca no contexto.

Isso significa que nenhum dado pessoal é armazenado. Em vez de seguir usuários com anúncios baseados em histórico, sua solução utiliza o tema do site que estão visitando. Cada site tem um "rótulo" (tag) que descreve sua categoria, como "viagem" ou "tecnologia". Os anunciantes, por sua vez, criam anúncios com as mesmas tags. O resultado é um sistema inteligente onde a relevância do anúncio é garantida pelo contexto, sem comprometer a privacidade. Com o Adescentralized, os usuários veem anúncios que fazem sentido com o conteúdo que estão consumindo, sem sacrificar sua privacidade. Para empresas, isso significa que seus anúncios alcançam um público genuinamente interessado no tema, aumentando a eficácia das campanhas.

2. **Simplicidade e Segurança com Blockchain**  
Sua solução oferece uma interface simplificada para empresas, mas por trás da simplicidade está a segurança do blockchain. Ao usar a rede Stellar, o Adescentralized garante que cada transação de pagamento, por menor que seja, seja imutável e verificável. Esse é o segredo da transparência que falta nas plataformas centralizadas.

O uso de contratos inteligentes e do SDK da Stellar automatiza todo o processo de pagamento. Quando uma visualização de anúncio é confirmada, o contrato inteligente é ativado, garantindo que o valor seja distribuído de forma justa e instantânea. Esse processo elimina intermediários opacos e a necessidade de confiar em uma única entidade. O resultado é um sistema seguro, transparente e auditável para qualquer pessoa.

3. **Cashback Real para Todos os Participantes**  
Sua proposta de "cashback" é uma das mais inovadoras do mercado publicitário e se estende a todos os participantes.

Para o Usuário: O usuário é recompensado diretamente por sua atenção. Com a extensão do navegador, ele recebe uma parte do investimento do anunciante em sua carteira digital, transformando visualizações de anúncios em uma fonte real de renda.

Para o Site Hospedeiro: O site que exibe o anúncio não fica à mercê de taxas e pagamentos atrasados das grandes redes. Ele também recebe sua parte do investimento do anunciante de forma direta e automática, criando um novo e mais justo método de monetização para criadores de conteúdo e publishers.

Para o Anunciante: O anunciante também recebe um tipo de "cashback". Em um mercado onde os custos são altos e as visualizações nem sempre são genuínas, sua solução garante que ele só pague por interações autênticas e verificadas. Isso otimiza o orçamento e garante um retorno sobre investimento (ROI) muito mais claro e eficiente.

4. **Benefícios Adicionais: Eficiência, Baixo Custo e Adoção em Massa**  
Além dos principais benefícios, sua solução traz outras vantagens importantes:

Eficiência Financeira: A rede Stellar permite transações em segundos com custos quase zero. Isso torna viável o modelo de micropagamento por visualização, impossível na maioria dos blockchains ou métodos tradicionais de pagamento.

Atração de Novos Anunciantes: Ao oferecer um modelo mais acessível e transparente, o Adescentralized pode atrair pequenas e médias empresas que atualmente não conseguem competir nas grandes plataformas.

Confiança da Audiência: Ao recompensar usuários e priorizar a privacidade, sua solução constrói confiança com o público. Isso pode levar a maior engajamento com os anúncios e uma experiência mais positiva para todos.

---

## 7. Como Funciona: Arquitetura Técnica

Aplicativo do Usuário (Mobile/Web)  
↓  
Carteira Stellar (SDK)  
↓  
Horizon API ←→ Contrato Inteligente Soroban (Rust)  
↓  
Integração Anchor (Fiat In/Out)  
↓  
Camada de Compliance (API KYC, Chainalysis se necessário)

### Componentes:
- **Frontend**: React Native / Flutter
- **Backend**: Node.js + Express (opcional)
- **Blockchain**: Stellar Mainnet/Testnet
- **Contratos Inteligentes**: Soroban (WASM, Rust)
- **Oráculos**: API Coingecko para taxas de câmbio
- **Armazenamento**: IPFS ou Firebase (temporário)

---

## 8. Por que Stellar?

**Velocidade**: ~3-5 segundos para confirmação  
**Custo**: ~$0.00001 por transação  
**Sustentabilidade**: Rede carbono-negativa  
**Soroban**: Contratos inteligentes em Rust com gás previsível  
**Interoperabilidade**: DEX embutido, anchors, pagamentos em caminho  
**Alinhamento de Missão**: Foco em inclusão financeira

Eficiência de Custo Imbatível com Stellar  
Diferente das plataformas tradicionais de publicidade, sobrecarregadas por altas taxas de transação, o Adescentralized utiliza a rede Stellar para entregar economia de custos sem precedentes. Enquanto processadores convencionais cobram 2-3% por transação e intermediários de ad tech absorvem até 35% do investimento publicitário, a Stellar processa transações com taxas tão baixas quanto $0.00001—tornando micropagamentos economicamente viáveis pela primeira vez na história da publicidade digital.

Isso se traduz diretamente em benefícios tangíveis:

Para empresas: 20-30% mais valor publicitário para o mesmo orçamento, já que custos mínimos de transação significam que mais do investimento chega a pessoas reais  
Para publishers: Retendo 90%+ da receita em vez dos típicos 65% após os intermediários  
Para usuários: Valor financeiro real de micro-recompensas, impossível com sistemas tradicionais  
Processamento de Transações Ultrarrápido  
Enquanto outras soluções blockchain enfrentam confirmações lentas (Bitcoin: 10+ minutos) ou taxas altas de gás (Ethereum: frequentemente $1+ por transação), a Stellar entrega liquidação final em apenas 3-5 segundos—rápido o suficiente para suportar nosso modelo de recompensa por impressão em tempo real e em escala.

Essa velocidade permite:

- Validação imediata das visualizações de anúncios
- Micro-recompensas instantâneas que os usuários veem acumulando em tempo real
- Uma experiência fluida onde pagamentos acontecem tão rápido quanto as impressões são verificadas

A combinação de taxas quase zero e transações ultrarrápidas faz do Adescentralized não apenas uma solução publicitária mais ética, mas um modelo econômico fundamentalmente mais eficiente—onde praticamente 100% do investimento do anunciante flui diretamente para os criadores de valor: os usuários que visualizam anúncios e os publishers que os hospedam.

> *"Stellar não é apenas rápido — é feito para acesso equitativo às finanças."*

---

## 9. Modelo de Negócios & Monetização

| Fonte de Receita | Descrição | % da Receita |
|------------------|-----------|--------------|
| Taxa de Transação | 0,5% na conversão de fiat | 70% |
| Funcionalidades Premium | Suporte mais rápido, limites maiores | 10% |
| Acesso API B2B | Cobrança de ONGs ou empregadores usando nossa infraestrutura | 20% |

> *Mantenha taxas abaixo de 1% para competir com Wise, muito abaixo do Western Union (5–10%).*

---

## 10. Roteiro & Visão de Futuro

| Trimestre | Marco |
|-----------|-------|
| Q1 | Lançamento do MVP na Stellar Testnet |
| Q2 | Piloto em Nairobi com 500 usuários |
| Q3 | Contrato Soroban para pagamentos recorrentes |
| Q4 | Integração de conversão fiat |
| 2025 | Expansão para 3 novos países |

**Visão de Longo Prazo**:  
*Tornar-se o padrão de pagamentos para inclusão financeira na África, América Latina e Sudeste Asiático.*

---

## 11. Equipe & Funções

| Nome | Função | Habilidades |
|------|--------|-------------|
| Alice | Desenvolvedora Líder | Rust, Soroban, SDKs Stellar |
| Bob | Designer UX | Figma, pesquisa de usuário |
| Carol | Líder de Negócios | Análise de mercado, parcerias |
| Dave | Especialista em Blockchain | Contratos inteligentes, consenso |

> Adicione mini bios: ex. "Alice construiu ferramentas blockchain na startup XYZ."

---

## 12. Referências

**Referências da Seção 2**

1.
https://wisernotify.com/blog/lead-generation-stats/
61 New Lead Generation Statistics (2025 Edition)
Paid advertising can also result in generating quality leads. It is effective in outbound lead generation. Some lead generation stats are: 26. 68% of B2B
2.
https://oakinteractive.com/the-importance-of-lead-generation-for-business-growth/
·
(2024-12-19)
The Importance of Lead Generation for Business Growth
Lead generation provides valuable data and insights into your target audience's behavior and preferences. By tracking key metrics like
3.

ResearchGate
·
(2025-08-07)
(PDF) Role of social media in lead generation
Through targeted advertising, businesses can reach specific demographics, ensuring a higher quality of leads. Content marketing on social media,
4.

领英企业服务
Why Lead Generation is Important for Your Business
Lead generation serves as the lifeblood of your sales funnel, providing a vital connection between your business and potential customers.
5.
https://www.bookyourdata.com/blog/lead-generation-statistics
·
(2025-02-13)
73 Lead Generation Statistics and Trends for Success in
91% of marketers say lead generation is their most important goal. This statistic shows how important lead generation is for marketers worldwide
6.
https://wpforms.com/lead-generation-statistics-and-trends/
·
(2025-06-23)
120+ Fascinating Lead Generation Statistics and Trends
1. 79% of brands use content to generate leads (Adobe) · 2. 56% of marketers find targeted content the most important element of a lead nurturing
7.
https://abmatic.ai/blog/importance-of-lead-generation-for-businesses
The importance of lead generation for businesses
Discover how lead generation can improve customer acquisition, drive revenue & profits, and achieve business success. Learn the best practices & techniques.
8.
https://inbeat.agency/blog/lead-generation-statistics
·
(2025-05-29)
60+ Lead Generation Statistics You Can't Afford to Ignore
1. 91% of marketers consider lead generation the most important goal. Lead generation is essentially the whole point of marketing, especially
9.
https://www.wsiworld.com/blog/the-importance-of-keeping-your-lead-generation-pipeline-full
·
(2023-11-30)
The Importance of Keeping Your Lead Generation Pipeline
Summary: Lead generation is one of the main objectives of digital marketing. Find out why it is so important and how to do it effectively.
10.
https://99firms.com/research/lead-generation-statistics/
Lead Generation Statistics 2025
The lead generation industry is projected to reach $295.1 billion at a CAGR of 17% by 2027. Email marketing is one of the most prevalent B2B lead gen strategies
11.
https://www.topdraw.com/insights/is-online-advertising-expensive/
·
(2024-10-09)
Online Advertising Costs In 2025
Platform, Average CPC, Average CPM ; Google Search Ads, $2.32, $38.40 ; Google Display Ads, $0.67, $3.12 ; Facebook Ads, $1.35, $8.60 ; Instagram
12.
https://www.businessofapps.com/marketplace/social-media-marketing/research/facebook-ads-cost/
·
(2025-02-27)
Facebook Ads cost (2025)
Facebook Average CPM (Cost Per 1,000 views) – $8.96; Average CPC (Cost Per Click) – $0.58; Average CPI (Cost Per Install) – $1.00; Average CPA (
13.
https://www.businessofapps.com/ads/cpc/research/cpc-rates/
·
(2025-01-21)
Cost Per Click (CPC) Rates (2025)
Google Ads CPC rate (Search) – $2.69 · Google Ads CPC rate (Display) – $0.63 · Facebook Ads CPC rate – $0.63 · Instagram Ads CPC rate rage – $0.40
14.
https://app.bir.ch/facebook-advertising-costs/cpc-cost-per-click
Average CPC for Facebook Ads (updated weekly)
For example, if your spend was $100 and you got 50 links clicks, your cost per link click was $2 ($100/50=$2.00). What is a good CPC for Facebook ads? A good
15.
https://www.lyfemarketing.com/services/facebook-advertising-services/costs/
Facebook Advertising Pricing: What Facebook Ads Cost in
In 2025, the average cost-per-click (CPC) for Facebook ads is 51 cents and the cost per thousand views (CPM) is $8.77. GET A CUSTOM PROPOSAL. What Are Facebook
16.
https://www.wask.co/google-ads-cost
Google Advertising Costs by CPM
Average CPM for Google Ads typically ranges between $2 and $10 for Display Network campaigns and $20 to $30 for Search Network campaigns.
17.
https://www.adroll.com/blog/ad-cost-breakdown-facebook-instagram-tiktok-and-pinterest
·
(2025-06-13)
Social Media Ads Cost Breakdown by Platform
FB ad cost: $.44 per click average, $14.40 average cpm. Facebook ads are a pillar of most ecommerce brands' marketing strategies, so it's no
18.
https://www.klientboost.com/google-advertising-costs/cost-per-impression/
Google Advertising Costs – CPM
CPC vs. CPM in Google Ads · Pay for every 1,000 impressions · Common range: $3–$10 (varies by audience and placement) · Best for: Brand awareness and visibility
19.
https://www.outranking.io/blog/how-much-does-social-media-advertising-cost/
·
(2025-01-14)
How Much Does Social Media Advertising Cost in 2025?
Facebook: CPC ranges between $1.20 and $3.50, and CPM is $8.50 to $14.00. These costs make it a versatile option for both local and global
20.
https://aimers.io/blog/the-anatomy-of-online-advertising-costs-in-2025
·
(2024-02-05)
The Anatomy of Online Advertising Costs in 2025 [Updated]
The Average CPC in Google Ads is $4.22, but this can vary depending on the industry you're in. Legal and realtor services are generally more
21.
https://www.ana.net/content/show/id/pr-2019-trust-survey
New Survey Suggests Trust Remains An Industry Issue
New Survey Suggests Trust Remains An Industry Issue Due To Rebates And Digital Fraud · Rebates for digital ad data · Lack of transparency into the cost components
22.
https://pubmatic.com/news/addressing-the-challenges-with-in-app-advertising/
Addressing the challenges with in-app advertising
The first half of 2019 saw app install fraud alone cost the industry $2.3bn (£1.9bn). Add to this the lack of transparency between the two ends of the digital
23.
https://assets.publishing.service.gov.uk/media/5fe495ede90e071205803986/Appendix_O_-_measurement_issues_in_digital_advertising_WEB.pdf
Appendix O: measurement issues in digital advertising
For there to be effective competition between buyers and suppliers of digital advertising, advertisers need to be able to assess and evaluate the quality.
24.
https://adtechbook.clearcode.cc/ad-fraud-and-viewability/
Ad Fraud and Viewability - The AdTech Book by Clearcode
Ad fraud in digital advertising is a multi-billion dollar problem. There are many types of ad fraud, but they all work by misrepresenting advertising metrics.
25.

领英企业服务
Understanding the impact of fraud on digital marketing
Fraudulent practices can inflate costs, skew performance metrics, and result in the misallocation of marketing budgets. Fraudsters have become
26.
https://www.warc.com/newsandopinion/opinion/dollars-down-the-drain-understanding-the-long-term-impact-of-ad-fraud/en-gb/6502
·
(2024-01-15)
Understanding the long-term impact of ad fraud
Unchecked ad fraud can wreak havoc on a brand's digital marketing campaign by skewing traffic numbers. This negatively impacts optimising and scaling activity.
27.

ResearchGate
·
(2024-10-16)
digital advertising: challenges and opportunities
Key challenges include increasing consumer privacy concerns, ad-blocking technologies, and the complexities of measuring ad effectiveness across
28.
https://www.sanctuarymg.com/academy/advertising/digital-advertising-fraud/
·
(2024-06-13)
Digital Advertising Fraud and How to Fight Back
It encompasses various deceptive practices designed to drain advertising budgets without delivering genuine engagement or conversions.
29.
https://abusix.com/blog/what-is-digital-ad-fraud/
Digital Ad Fraud: What is it?
Firstly, ad fraud can make it difficult or impossible for your advertisements to reach the intended audience members. This negates the money and effort you put
30.
https://www.playwire.com/blog/ad-tech-unmasked-navigating-supply-chain-inefficiencies-and-contradictions
Navigating Supply Chain Inefficiencies and Contradictions
A Complex Ad Tech Landscape: Supply chain inefficiencies and contradictory ad metrics are largely increasing the complexities of the ad tech ecosystem. What Can
31.
https://www.mmm-online.com/news/why-the-adtech-ecosystem-continues-to-struggle-with-consumer-data/
·
(2025-03-17)
Why the adtech ecosystem continues to struggle with
Moreover, companies are grappling with issues that have been endemic to less developed markets within the region: poor data quality and outdated
32.

领英企业服务
The Ad Tech Middlemen Problem: Are We Consolidating or
Ad tech's push-and-pull between consolidation and fragmentation isn't going away. If anything, budgets will only flow into more channels (retail
33.
https://www.tse-fr.eu/sites/default/files/TSE/documents/conf/2025/digital/dannunzio.pdf
Digital Ecosystems: The Adtech Tax and Content Quality
作者：A D’Annunzio · 2024 · 被引用次数：2 — This is consistent with current practices and linked to the lack of transparency on the adtech fees charged to digital publishers and.
34.
https://www.relevant-digital.com/weeklywrap
What happened in Ad Tech?
The ANA's Q2 2025 Programmatic Transparency Benchmark shows that despite progress in supply-path consolidation, inefficiencies still drain an estimated $26.8
35.

arXiv
Inefficiencies in Digital Advertising Markets
作者：BR Gordon · 2019 · 被引用次数：267 — We discuss two types of organizational inefficiencies arising in the digital advertising ecosystem. Intra-firm inefficiencies may result from misalignments
36.
https://alphix.com/insights/educational-content/the-evolving-adtech-landscape-insights-and-trends-for-2025-and-beyond
·
(2025-05-05)
AdTech insights and trends for 2025 and beyond
This article explores the current state of the AdTech ecosystem, its key components and predictions for the future while highlighting the
37.
https://co.agencyspotter.com/6-biggest-problems-with-ad-tech/
6 Biggest Problems With Ad Tech
Here are the six biggest problems I have with ad and mar-tech. 1. Too Difficult To Use: “90% of marketing software is not doing a good job on UI,” said Jason
38.
https://www.adweek.com/programmatic/another-study-shows-how-drastically-publisher-revenue-is-being-swallowed-by-ad-tech-fees/
·
(2022-03-09)
Publisher Revenue Is Being Swallowed by Ad-Tech Fees
Expensive take rates. The study found that for half of ad impressions, middlemen's fees range from 22% to 45%, with an average of 35%. At the
39.
https://www.adexchanger.com/data-driven-thinking/ad-tech-must-address-its-market-flaws/
·
(2020-05-20)
Ad Tech Must Address Its Market Flaws

**Referências da Seção 4.1**

[^1]: TopDraw. Online Advertising Costs In 2025. Available from: https://www.topdraw.com/insights/is-online-advertising-expensive/
[^2]: Business of Apps. Digital Advertising Statistics. Available from: https://www.businessofapps.com/data/digital-advertising-statistics/
[^3]: WiserNotify. 61 New Lead Generation Statistics (2025 Edition). Available from: https://wisernotify.com/blog/lead-generation-stats/
[^4]: Book Your Data. 73 Lead Generation Statistics and Trends for Success in 2025. Available from: https://www.bookyourdata.com/blog/lead-generation-statistics
[^5]: Inbeat. 60+ Lead Generation Statistics You Can't Afford to Ignore. Available from: https://inbeat.agency/blog/lead-generation-statistics

**Referências da Seção 5.1**

* Google ads
[^1]https://www.statista.com/statistics/216573/google-global-market-share-of-search-traffic/

[^2]https://www.wordstream.com/blog/intent-data-google-ads

[^3]https://support.google.com/google-ads/answer/10724649?hl=pt-PT

[^4]https://www.webfx.com/ppc/average-google-ads-cpc/

[^5]https://www.semrush.com/blog/google-ads-for-beginners-ultimate-guide/

[^6]https://searchengineland.com/google-ads-black-box-why-is-this-happening-378377

[^7]https://blog.google/products/ads-commerce/5-ways-ai-is-transforming-google-ads/

[^8]https://www.insiderintelligence.com/content/amazon-s-advertising-business-growing-faster-than-google-s-meta-s-and-apple-s

[^9]https://iabuk.com/ad-blocking-study-2024

[^10]https://support.google.com/google-ads/answer/9012674?hl=pt-PT

* Brave 
[^1]: Brave. "Brave Transparency Report". Available at: https://brave.com/transparency/
[^2]: "Brave Browser Review". Forbes. Available at: https://www.forbes.com/advisor/business/software/brave-browser-review/
[^3]: Brave. "Features and Specifications". Available at: https://brave.com/features/