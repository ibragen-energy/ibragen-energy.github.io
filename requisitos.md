# Requisitos para o Site da AAS ENERGIA SOLAR

## Requisitos Funcionais

### 1. Sistema de Orçamento Automatizado
- Formulário interativo para coleta de dados do cliente:
  - Tipo de conexão (monofásica, bifásica, trifásica)
  - Valor da conta de luz mensal (R$)
  - Espaço disponível para instalação (m²)
  - Horário de sombra no telhado
  - Tipo de estrutura (fibrocimento, cerâmica, metálica, etc.)
  - Localização (cidade/estado) para cálculo de irradiação solar
- Cálculo automático de:
  - Número de placas necessárias (baseado no valor da conta dividido por 80)
  - Potência do sistema dimensionado (kWp)
  - Energia estimada a ser gerada (kWh/mês)
  - Área útil necessária para instalação
- Apresentação de resultados:
  - Tabela de geração de energia estimada por ano
  - Economia projetada para 10+ anos
  - Retorno do investimento (payback)
  - Comparativo financeiro (com e sem energia solar)

### 2. Catálogo de Produtos
- Exibição organizada por categorias:
  - Painéis solares
  - Inversores
  - Controladores solares
  - Baterias
  - Sistemas de armazenamento
  - Estruturas de fixação
  - Cabos e conectores
- Ficha técnica detalhada de cada produto
- Imagens de alta qualidade
- Filtros de busca por especificações

### 3. Apresentação Institucional
- Página Sobre Nós (missão, visão, valores)
- Portfólio de projetos realizados
- Depoimentos de clientes
- Informações de contato

### 4. Simulador de Economia
- Cálculo de economia mensal e anual
- Projeção de economia para 10+ anos
- Gráficos comparativos
- Simulação de diferentes formas de pagamento

### 5. Geração de Proposta
- Criação de PDF personalizado com orçamento
- Inclusão de dados do cliente
- Detalhamento dos produtos recomendados
- Condições de pagamento
- Prazo de entrega

### 6. Área de Contato
- Formulário para solicitação de visita técnica
- Chat online para dúvidas
- Mapa de localização
- Telefones e e-mail

## Requisitos Tecnológicos

### 1. Frontend
- **Framework**: React.js com TypeScript
- **Biblioteca de componentes**: shadcn/ui
- **Estilização**: Tailwind CSS
- **Gráficos e visualizações**: Recharts
- **Ícones**: Lucide icons
- **Responsividade**: Design adaptável para dispositivos móveis e desktop

### 2. Backend (se necessário)
- **Framework**: Flask (Python)
- **Estrutura**:
  - API RESTful para processamento de orçamentos
  - Geração de PDFs com propostas personalizadas
  - Armazenamento de dados de clientes e orçamentos

### 3. Funcionalidades Técnicas
- Cálculos precisos baseados em fórmulas do setor de energia solar
- Integração com dados de irradiação solar por região
- Geração de gráficos interativos
- Formulários com validação em tempo real
- Exportação de orçamentos em PDF
- Armazenamento de dados de clientes (opcional)

### 4. Requisitos de Desempenho
- Tempo de carregamento rápido
- Cálculos em tempo real
- Interface fluida e responsiva
- Compatibilidade com principais navegadores

### 5. Segurança
- Proteção de dados do cliente
- Validação de entradas de formulário
- Prevenção contra ataques comuns (XSS, CSRF)

## Fluxo do Sistema de Orçamento

1. Cliente acessa o site e navega até a seção "Faça seu Orçamento"
2. Preenche formulário com dados básicos (tipo de conexão, valor da conta, etc.)
3. Sistema calcula automaticamente o dimensionamento inicial
4. Cliente visualiza resultados preliminares (número de placas, potência, etc.)
5. Sistema apresenta simulação de economia e retorno do investimento
6. Cliente pode ajustar parâmetros e ver resultados atualizados em tempo real
7. Cliente pode solicitar proposta detalhada via e-mail ou download imediato
8. Sistema gera PDF personalizado com orçamento completo

## Considerações Adicionais

- Interface intuitiva e amigável
- Design profissional alinhado com a identidade visual da empresa
- Conteúdo educativo sobre energia solar
- Otimização para mecanismos de busca (SEO)
- Integração com redes sociais
- Métricas e análises de uso do site
