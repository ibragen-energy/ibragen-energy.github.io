import React, { useState } from 'react';

// Componente principal do formulário de orçamento
const OrcamentoForm = () => {
  // Estado para controlar a etapa atual do formulário
  const [step, setStep] = useState(1);
  
  // Estado para armazenar todos os dados do formulário
  const [formData, setFormData] = useState({
    // Etapa 1: Dados do cliente
    nome: '',
    email: '',
    telefone: '',
    cep: '',
    cidade: '',
    estado: '',
    
    // Etapa 2: Informações de consumo
    tipoConexao: 'monofasica',
    valorConta: '',
    consumo: '',
    tarifa: '1.10',
    
    // Etapa 3: Informações do local
    tipoTelhado: 'fibrocimento',
    areaDisponivel: '',
    horarioSombra: [],
    orientacaoTelhado: 'norte',
    
    // Resultados calculados
    numeroPlacas: 0,
    potenciaSistema: 0,
    areaNecessaria: 0,
    energiaGerada: 0,
    economiaMensal: 0
  });
  
  // Função para atualizar os dados do formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Tratamento especial para checkboxes (múltipla escolha)
    if (type === 'checkbox') {
      if (checked) {
        setFormData({
          ...formData,
          [name]: [...formData[name], value]
        });
      } else {
        setFormData({
          ...formData,
          [name]: formData[name].filter(item => item !== value)
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Função para avançar para a próxima etapa
  const nextStep = () => {
    // Validação da etapa atual antes de avançar
    if (validateCurrentStep()) {
      // Se for a última etapa, calcular resultados
      if (step === 3) {
        calculateResults();
      }
      setStep(step + 1);
    }
  };
  
  // Função para voltar para a etapa anterior
  const prevStep = () => {
    setStep(step - 1);
  };
  
  // Função para validar a etapa atual
  const validateCurrentStep = () => {
    // Implementar validações específicas para cada etapa
    switch (step) {
      case 1:
        // Validar dados do cliente
        if (!formData.nome || !formData.email || !formData.telefone || !formData.cep) {
          alert('Por favor, preencha todos os campos obrigatórios.');
          return false;
        }
        // Validar formato de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          alert('Por favor, insira um e-mail válido.');
          return false;
        }
        return true;
        
      case 2:
        // Validar informações de consumo
        if (!formData.valorConta || isNaN(formData.valorConta) || parseFloat(formData.valorConta) <= 0) {
          alert('Por favor, insira um valor válido para a conta de luz.');
          return false;
        }
        return true;
        
      case 3:
        // Validar informações do local
        if (!formData.areaDisponivel || isNaN(formData.areaDisponivel) || parseFloat(formData.areaDisponivel) <= 0) {
          alert('Por favor, insira uma área disponível válida.');
          return false;
        }
        if (formData.horarioSombra.length === 0) {
          alert('Por favor, selecione pelo menos uma opção de horário de sombra.');
          return false;
        }
        return true;
        
      default:
        return true;
    }
  };
  
  // Função para calcular os resultados com base nos dados fornecidos
  const calculateResults = () => {
    // Cálculo do número de placas
    let numeroPlacas = Math.ceil(parseFloat(formData.valorConta) / 80);
    
    // Cálculo da potência do sistema (kWp)
    const potenciaSistema = numeroPlacas * 0.585;
    
    // Cálculo da área necessária (m²)
    const areaNecessaria = numeroPlacas * 2.6;
    
    // Fator de correção por sombra
    let fatorSombra = 1.0;
    if (formData.horarioSombra.includes('manha') && formData.horarioSombra.includes('tarde')) {
      fatorSombra = 0.7;
    } else if (formData.horarioSombra.includes('manha') || formData.horarioSombra.includes('tarde')) {
      fatorSombra = 0.85;
    }
    
    // Fator de correção por orientação
    let fatorOrientacao = 1.0;
    switch (formData.orientacaoTelhado) {
      case 'norte':
        fatorOrientacao = 1.0;
        break;
      case 'nordeste':
      case 'noroeste':
        fatorOrientacao = 0.95;
        break;
      case 'leste':
      case 'oeste':
        fatorOrientacao = 0.9;
        break;
      case 'sudeste':
      case 'sudoeste':
        fatorOrientacao = 0.85;
        break;
      case 'sul':
        fatorOrientacao = 0.8;
        break;
      default:
        fatorOrientacao = 1.0;
    }
    
    // Irradiação solar diária média para Rio de Janeiro (kWh/m²/dia)
    const irradiacaoSolar = 4.93;
    
    // Fator de eficiência do sistema
    const fatorEficiencia = 0.75;
    
    // Cálculo da energia gerada mensal (kWh)
    const energiaGerada = potenciaSistema * irradiacaoSolar * 30 * fatorEficiencia * fatorSombra * fatorOrientacao;
    
    // Cálculo da economia mensal (R$)
    const economiaMensal = energiaGerada * parseFloat(formData.tarifa);
    
    // Atualizar o estado com os resultados calculados
    setFormData({
      ...formData,
      numeroPlacas,
      potenciaSistema,
      areaNecessaria,
      energiaGerada,
      economiaMensal
    });
  };
  
  // Função para gerar a projeção financeira para 10 anos
  const generateFinancialProjection = () => {
    const projection = [];
    let energiaAnual = formData.energiaGerada * 12;
    let tarifa = parseFloat(formData.tarifa);
    
    for (let ano = 1; ano <= 10; ano++) {
      // Aplicar degradação anual dos painéis (0.7%)
      energiaAnual *= 0.993;
      
      // Aplicar inflação anual da tarifa (6%)
      tarifa *= 1.06;
      
      // Calcular gastos e economia
      const gastoSemSolar = (formData.consumo || (formData.valorConta / parseFloat(formData.tarifa))) * 12 * tarifa;
      const gastoComSolar = (formData.consumo || (formData.valorConta / parseFloat(formData.tarifa))) * 12 * tarifa - energiaAnual * tarifa;
      const economia = gastoSemSolar - gastoComSolar;
      
      projection.push({
        ano: new Date().getFullYear() + ano,
        energiaAnual: Math.round(energiaAnual),
        gastoSemSolar: Math.round(gastoSemSolar * 100) / 100,
        gastoComSolar: Math.round(gastoComSolar * 100) / 100,
        economia: Math.round(economia * 100) / 100
      });
    }
    
    return projection;
  };
  
  // Função para calcular o valor do investimento
  const calculateInvestment = () => {
    // Valor base por Wp instalado
    const valorPorWp = 2.09;
    
    // Potência total em Wp
    const potenciaWp = formData.potenciaSistema * 1000;
    
    // Valor total estimado
    return potenciaWp * valorPorWp;
  };
  
  // Renderização condicional com base na etapa atual
  const renderStep = () => {
    switch (step) {
      case 1:
        return renderClientDataStep();
      case 2:
        return renderConsumptionDataStep();
      case 3:
        return renderLocationDataStep();
      case 4:
        return renderResultsStep();
      default:
        return renderClientDataStep();
    }
  };
  
  // Etapa 1: Dados do cliente
  const renderClientDataStep = () => (
    <div className="form-step">
      <h2>Dados do Cliente</h2>
      <div className="form-group">
        <label htmlFor="nome">Nome Completo*</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">E-mail*</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="telefone">Telefone*</label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="cep">CEP*</label>
        <input
          type="text"
          id="cep"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="cidade">Cidade</label>
        <input
          type="text"
          id="cidade"
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          readOnly
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="estado">Estado</label>
        <input
          type="text"
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          readOnly
        />
      </div>
      
      <div className="form-actions">
        <button type="button" onClick={nextStep} className="btn-primary">
          Próximo
        </button>
      </div>
    </div>
  );
  
  // Etapa 2: Informações de consumo
  const renderConsumptionDataStep = () => (
    <div className="form-step">
      <h2>Informações de Consumo</h2>
      
      <div className="form-group">
        <label>Tipo de Conexão*</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="tipoConexao"
              value="monofasica"
              checked={formData.tipoConexao === 'monofasica'}
              onChange={handleChange}
            />
            Monofásica
          </label>
          <label>
            <input
              type="radio"
              name="tipoConexao"
              value="bifasica"
              checked={formData.tipoConexao === 'bifasica'}
              onChange={handleChange}
            />
            Bifásica
          </label>
          <label>
            <input
              type="radio"
              name="tipoConexao"
              value="trifasica"
              checked={formData.tipoConexao === 'trifasica'}
              onChange={handleChange}
            />
            Trifásica
          </label>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="valorConta">Valor médio da conta de luz mensal (R$)*</label>
        <input
          type="number"
          id="valorConta"
          name="valorConta"
          value={formData.valorConta}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="consumo">Consumo médio mensal (kWh) (opcional)</label>
        <input
          type="number"
          id="consumo"
          name="consumo"
          value={formData.consumo}
          onChange={handleChange}
          min="0"
        />
        <small>Se não informado, será calculado automaticamente.</small>
      </div>
      
      <div className="form-group">
        <label htmlFor="tarifa">Tarifa de energia (R$/kWh) (opcional)</label>
        <input
          type="number"
          id="tarifa"
          name="tarifa"
          value={formData.tarifa}
          onChange={handleChange}
          min="0"
          step="0.01"
        />
        <small>Valor padrão: R$ 1,10/kWh</small>
      </div>
      
      <div className="form-actions">
        <button type="button" onClick={prevStep} className="btn-secondary">
          Voltar
        </button>
        <button type="button" onClick={nextStep} className="btn-primary">
          Próximo
        </button>
      </div>
    </div>
  );
  
  // Etapa 3: Informações do local
  const renderLocationDataStep = () => (
    <div className="form-step">
      <h2>Informações do Local</h2>
      
      <div className="form-group">
        <label htmlFor="tipoTelhado">Tipo de Telhado/Estrutura*</label>
        <select
          id="tipoTelhado"
          name="tipoTelhado"
          value={formData.tipoTelhado}
          onChange={handleChange}
          required
        >
          <option value="fibrocimento">Fibrocimento</option>
          <option value="ceramica">Cerâmica</option>
          <option value="metalico">Metálico</option>
          <option value="laje">Laje</option>
          <option value="solo">Solo</option>
          <option value="outro">Outro</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="areaDisponivel">Área disponível para instalação (m²)*</label>
        <input
          type="number"
          id="areaDisponivel"
          name="areaDisponivel"
          value={formData.areaDisponivel}
          onChange={handleChange}
          min="0"
          required
        />
      </div>
      
      <div className="form-group">
        <label>Horário de sombra no telhado*</label>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="horarioSombra"
              value="manha"
              checked={formData.horarioSombra.includes('manha')}
              onChange={handleChange}
            />
            Manhã (6h-12h)
          </label>
          <label>
            <input
              type="checkbox"
              name="horarioSombra"
              value="tarde"
              checked={formData.horarioSombra.includes('tarde')}
              onChange={handleChange}
            />
            Tarde (12h-18h)
          </label>
          <label>
            <input
              type="checkbox"
              name="horarioSombra"
              value="semSombra"
              checked={formData.horarioSombra.includes('semSombra')}
              onChange={handleChange}
            />
            Não há sombra significativa
          </label>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="orientacaoTelhado">Orientação do Telhado (opcional)</label>
        <select
          id="orientacaoTelhado"
          name="orientacaoTelhado"
          value={formData.orientacaoTelhado}
          onChange={handleChange}
        >
          <option value="norte">Norte</option>
          <option value="nordeste">Nordeste</option>
          <option value="leste">Leste</option>
          <option value="sudeste">Sudeste</option>
          <option value="sul">Sul</option>
          <option value="sudoeste">Sudoeste</option>
          <option value="oeste">Oeste</option>
          <option value="noroeste">Noroeste</option>
        </select>
      </div>
      
      <div className="form-actions">
        <button type="button" onClick={prevStep} className="btn-secondary">
          Voltar
        </button>
        <button type="button" onClick={nextStep} className="btn-primary">
          Calcular Orçamento
        </button>
      </div>
    </div>
  );
  
  // Etapa 4: Resultados e simulação
  const renderResultsStep = () => {
    const projection = generateFinancialProjection();
    const investimento = calculateInvestment();
    
    return (
      <div className="form-step results-step">
        <h2>Resultados do Orçamento</h2>
        
        <div className="results-summary">
          <div className="result-card">
            <h3>Número de Placas</h3>
            <p className="result-value">{formData.numeroPlacas}</p>
          </div>
          
          <div className="result-card">
            <h3>Potência do Sistema</h3>
            <p className="result-value">{formData.potenciaSistema.toFixed(2)} kWp</p>
          </div>
          
          <div className="result-card">
            <h3>Área Necessária</h3>
            <p className="result-value">{formData.areaNecessaria.toFixed(2)} m²</p>
          </div>
          
          <div className="result-card">
            <h3>Energia Gerada</h3>
            <p className="result-value">{formData.energiaGerada.toFixed(2)} kWh/mês</p>
          </div>
          
          <div className="result-card">
            <h3>Economia Mensal</h3>
            <p className="result-value">R$ {formData.economiaMensal.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="investment-summary">
          <h3>Investimento Estimado</h3>
          <p className="investment-value">R$ {investimento.toFixed(2)}</p>
          <p className="investment-discount">À vista com 3% de desconto: R$ {(investimento * 0.97).toFixed(2)}</p>
        </div>
        
        <div className="projection-table">
          <h3>Projeção para 10 Anos</h3>
          <table>
            <thead>
              <tr>
                <th>Ano</th>
                <th>Produção (kWh/ano)</th>
                <th>Sem Solar (R$)</th>
                <th>Com Solar (R$)</th>
                <th>Economia (R$)</th>
              </tr>
            </thead>
            <tbody>
              {projection.map((item, index) => (
                <tr key={index}>
                  <td>{item.ano}</td>
                  <td>{item.energiaAnual}</td>
                  <td>R$ {item.gastoSemSolar.toFixed(2)}</td>
                  <td>R$ {item.gastoComSolar.toFixed(2)}</td>
                  <td>R$ {item.economia.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="financing-options">
          <h3>Opções de Financiamento</h3>
          <div className="financing-cards">
            <div className="financing-card">
              <h4>6 parcelas</h4>
              <p>Entrada de 60%: R$ {(investimento * 0.6).toFixed(2)}</p>
              <p>Parcela: R$ {(investimento * 0.4 / 6).toFixed(2)}</p>
            </div>
            
            <div className="financing-card">
              <h4>24 parcelas</h4>
              <p>Entrada de 20%: R$ {(investimento * 0.2).toFixed(2)}</p>
              <p>Parcela: R$ {(investimento * 0.8 / 24 * 1.015).toFixed(2)}</p>
              <p><small>Taxa de 1,5% a.m.</small></p>
            </div>
            
            <div className="financing-card">
              <h4>60 parcelas</h4>
              <p>Sem entrada</p>
              <p>Parcela: R$ {(investimento / 60 * 1.028).toFixed(2)}</p>
              <p><small>Taxa de 2,8% a.m.</small></p>
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={prevStep} className="btn-secondary">
            Voltar
          </button>
          <button type="button" className="btn-primary">
            Gerar Proposta em PDF
          </button>
          <button type="button" className="btn-success">
            Solicitar Visita Técnica
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="orcamento-form-container">
      <div className="progress-bar">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
        <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>4</div>
      </div>
      
      <form className="orcamento-form">
        {renderStep()}
      </form>
    </div>
  );
};

export default OrcamentoForm;
