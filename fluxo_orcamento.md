# Fluxo do Sistema de Orçamento - AAS ENERGIA SOLAR

## Visão Geral do Fluxo

O sistema de orçamento automatizado da AAS ENERGIA SOLAR seguirá um fluxo de 4 etapas principais, guiando o cliente desde a entrada de dados básicos até a geração da proposta final.

## Etapa 1: Dados do Cliente

### Campos de Entrada:
- Nome completo
- E-mail
- Telefone
- CEP
- Cidade/Estado (preenchimento automático via API de CEP)

### Validações:
- Todos os campos são obrigatórios
- E-mail deve ter formato válido
- Telefone deve ter formato válido (com máscara)
- CEP deve ter 8 dígitos numéricos

## Etapa 2: Informações de Consumo

### Campos de Entrada:
- Tipo de conexão (seleção única):
  * Monofásica
  * Bifásica
  * Trifásica
- Valor médio da conta de luz mensal (R$)
- Consumo médio mensal em kWh (opcional, calculado automaticamente se não preenchido)
- Tarifa de energia (R$/kWh) (opcional, valor padrão de 1,10)

### Cálculos Automáticos:
- Se o consumo não for informado: Consumo = Valor da conta ÷ Tarifa
- Número estimado de placas = Valor da conta ÷ 80
- Potência estimada do sistema (kWp) = Número de placas × 0,585 (considerando placas de 585W)

### Validações:
- Valor da conta deve ser numérico e maior que zero
- Consumo, se informado, deve ser numérico e maior que zero
- Tarifa, se informada, deve ser numérica e maior que zero

## Etapa 3: Informações do Local

### Campos de Entrada:
- Tipo de telhado/estrutura (seleção única):
  * Fibrocimento
  * Cerâmica
  * Metálico
  * Laje
  * Solo
  * Outro (especificar)
- Área disponível para instalação (m²)
- Horário de sombra no telhado (múltipla escolha):
  * Manhã (6h-12h)
  * Tarde (12h-18h)
  * Não há sombra significativa
- Orientação do telhado (opcional, com ilustração):
  * Norte
  * Sul
  * Leste
  * Oeste
  * Nordeste
  * Noroeste
  * Sudeste
  * Sudoeste

### Cálculos Automáticos:
- Área necessária para instalação (m²) = Número de placas × 2,6
- Verificação de viabilidade: Área disponível ≥ Área necessária
- Fator de correção por sombra:
  * Sem sombra: 100%
  * Sombra pela manhã ou tarde: 85%
  * Sombra em ambos períodos: 70%
- Fator de correção por orientação:
  * Norte: 100%
  * Nordeste/Noroeste: 95%
  * Leste/Oeste: 90%
  * Sudeste/Sudoeste: 85%
  * Sul: 80%

### Validações:
- Área disponível deve ser numérica e maior que zero
- Pelo menos uma opção de horário de sombra deve ser selecionada

## Etapa 4: Resultados e Simulação

### Exibição de Resultados:
- Número de placas recomendado
- Potência do sistema (kWp)
- Área necessária para instalação (m²)
- Energia estimada a ser gerada (kWh/mês)
- Economia mensal estimada (R$)

### Simulação Financeira:
- Tabela de projeção para 10 anos mostrando:
  * Ano
  * Produção de energia (kWh/ano)
  * Gasto sem energia solar (R$)
  * Gasto com energia solar (R$)
  * Economia (R$)
- Gráfico de economia acumulada
- Cálculo de payback (tempo de retorno do investimento)
- Valor estimado do investimento

### Opções de Financiamento:
- À vista com desconto
- Parcelamento em diferentes prazos
- Simulação de parcelas

### Ações Finais:
- Gerar proposta em PDF
- Solicitar visita técnica
- Compartilhar orçamento via WhatsApp/E-mail
- Salvar orçamento para consulta posterior

## Fórmulas e Parâmetros Utilizados

### Cálculo de Geração de Energia:
- Energia mensal (kWh) = Potência do sistema (kWp) × Irradiação solar diária média (kWh/m²/dia) × 30 dias × Fator de eficiência × Fator de correção por sombra × Fator de correção por orientação
- Irradiação solar diária média para Rio de Janeiro: 4,93 kWh/m²/dia
- Fator de eficiência do sistema: 0,75 (considerando perdas)

### Cálculo de Economia:
- Economia mensal (R$) = Energia gerada (kWh) × Tarifa de energia (R$/kWh)
- Inflação anual da tarifa de energia: 6% (para projeções futuras)
- Degradação anual dos painéis: 0,7% (conforme especificação dos fabricantes)

### Cálculo de Investimento:
- Valor base por Wp instalado: R$ 2,09
- Valor total estimado (R$) = Potência do sistema (Wp) × Valor por Wp
- Desconto para pagamento à vista: 3%

## Ajustes e Personalizações

O sistema permitirá ajustes manuais em alguns parâmetros para personalização do orçamento:
- Número de placas
- Modelo de inversor
- Tipo de estrutura
- Adição de itens opcionais (baterias, monitoramento, etc.)

Cada ajuste recalculará automaticamente os resultados e a simulação financeira.
