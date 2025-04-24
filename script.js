// Variáveis globais
let currentPDCA = null;
let pdcaList = [];

// Inicialização do documento
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar navegação
    initNavigation();
    
    // Inicializar modais
    initModals();
    
    // Inicializar eventos dos botões
    initButtonEvents();
    
    // Inicializar assistente IA
    initAIAssistant();
    
    // Inicializar gráficos do dashboard
    initDashboardCharts();
    
    // Inicializar eventos do plano de ação
    initActionPlan();
    
    // Criar imagem PDCA para a página inicial
    createPDCACycleImage();
    
    // Carregar PDCAs salvos (simulado)
    loadSavedPDCAs();
});

// Inicializar navegação entre páginas
function initNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover classe ativa de todos os links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Adicionar classe ativa ao link clicado
            this.classList.add('active');
            
            // Obter a página a ser exibida
            const pageId = this.getAttribute('data-page');
            
            // Ocultar todas as páginas
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            
            // Exibir a página selecionada
            document.getElementById(pageId).classList.add('active');
        });
    });
    
    // Eventos para botões de navegação entre etapas do PDCA
    const nextStepButtons = document.querySelectorAll('.next-step');
    nextStepButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextPageId = this.getAttribute('data-next');
            navigateToPage(nextPageId);
        });
    });
    
    const prevStepButtons = document.querySelectorAll('.prev-step');
    prevStepButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevPageId = this.getAttribute('data-prev');
            navigateToPage(prevPageId);
        });
    });
}

// Navegar para uma página específica
function navigateToPage(pageId) {
    // Atualizar navegação
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    // Ocultar todas as páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Exibir a página selecionada
    document.getElementById(pageId).classList.add('active');
    
    // Animar entrada da IA
    animateAIAssistant(pageId);
}

// Inicializar modais
function initModals() {
    // Botões para abrir modais
    const modalTriggers = document.querySelectorAll('.btn-new-pdca, .start-pdca');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            document.getElementById('new-pdca-modal').classList.add('active');
        });
    });
    
    // Botões para fechar modais
    const closeButtons = document.querySelectorAll('.modal-close, .modal-cancel, .modal-ok');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('active');
        });
    });
    
    // Fechar modal ao clicar fora
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Botão para criar novo PDCA
    const createPDCAButton = document.querySelector('.modal-create');
    if (createPDCAButton) {
        createPDCAButton.addEventListener('click', function() {
            createNewPDCA();
        });
    }
}

// Inicializar eventos dos botões
function initButtonEvents() {
    // Botões de visualização de PDCAs
    const viewButtons = document.querySelectorAll('.btn-view');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Simular visualização de um PDCA existente
            navigateToPage('plan');
        });
    });
    
    // Botões de ferramentas de análise
    const toolButtons = document.querySelectorAll('.tool-button');
    toolButtons.forEach(button => {
        button.addEventListener('click', function() {
            const toolType = this.getAttribute('data-tool');
            
            // Remover classe ativa de todos os botões
            toolButtons.forEach(b => b.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Exibir ferramenta selecionada
            showAnalysisTool(toolType);
        });
    });
    
    // Botões de tipo de gráfico
    const chartTypeButtons = document.querySelectorAll('.chart-type');
    chartTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const chartType = this.getAttribute('data-type');
            
            // Remover classe ativa de todos os botões
            chartTypeButtons.forEach(b => b.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Atualizar tipo de gráfico
            updateChartType(chartType);
        });
    });
    
    // Botão para concluir PDCA
    const completePDCAButton = document.querySelector('.complete-pdca');
    if (completePDCAButton) {
        completePDCAButton.addEventListener('click', function() {
            showSuccessModal('PDCA concluído com sucesso! Os resultados foram salvos e estão disponíveis no Dashboard.');
        });
    }
}

// Inicializar assistente IA
function initAIAssistant() {
    const aiSubmitButtons = document.querySelectorAll('.ai-submit');
    aiSubmitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const aiQuestion = this.closest('.ai-question');
            const userResponse = aiQuestion.querySelector('textarea').value;
            
            if (userResponse.trim() !== '') {
                // Processar resposta do usuário
                processUserResponse(aiQuestion, userResponse);
            }
        });
    });
}

// Processar resposta do usuário para o assistente IA
function processUserResponse(aiQuestion, userResponse) {
    // Obter a pergunta atual
    const questionText = aiQuestion.querySelector('p').textContent;
    
    // Limpar campo de texto
    aiQuestion.querySelector('textarea').value = '';
    
    // Criar elemento de resposta do usuário
    const userResponseElement = document.createElement('div');
    userResponseElement.className = 'ai-user-response';
    userResponseElement.innerHTML = `
        <p><strong>Sua resposta:</strong> ${userResponse}</p>
    `;
    
    // Inserir resposta do usuário antes do botão
    aiQuestion.insertBefore(userResponseElement, aiQuestion.querySelector('.ai-submit'));
    
    // Ocultar elementos da pergunta atual
    aiQuestion.querySelector('p').style.display = 'none';
    aiQuestion.querySelector('textarea').style.display = 'none';
    aiQuestion.querySelector('.ai-submit').style.display = 'none';
    
    // Determinar próxima pergunta com base na pergunta atual
    let nextQuestion = '';
    let pageId = '';
    
    if (questionText.includes('problema que você identificou')) {
        nextQuestion = 'Qual a importância deste problema para a organização?';
        pageId = 'plan';
        
        // Preencher automaticamente o campo de descrição do problema
        document.getElementById('problem-description').value = userResponse;
    } 
    else if (questionText.includes('importância deste problema')) {
        nextQuestion = 'Quais indicadores mostram que este é um problema real?';
        pageId = 'plan';
        
        // Preencher automaticamente o campo de importância do problema
        document.getElementById('problem-importance').value = userResponse;
    }
    else if (questionText.includes('indicadores mostram')) {
        nextQuestion = 'Qual resultado específico você deseja alcançar ao resolver este problema?';
        pageId = 'plan';
        
        // Preencher automaticamente o campo de indicadores
        document.getElementById('current-indicators').value = userResponse;
    }
    else if (questionText.includes('resultado específico')) {
        nextQuestion = 'Quais são as possíveis causas deste problema?';
        pageId = 'plan';
        
        // Preencher automaticamente o campo de objetivos
        document.getElementById('specific-objectives').value = userResponse;
    }
    else if (questionText.includes('possíveis causas')) {
        nextQuestion = 'Quais contramedidas você planeja implementar para resolver o problema?';
        pageId = 'do';
        
        // Preencher automaticamente o campo de causas potenciais
        document.getElementById('potential-causes').value = userResponse;
        
        // Navegar para a próxima etapa
        setTimeout(() => {
            navigateToPage('do');
        }, 1000);
    }
    else if (questionText.includes('contramedidas')) {
        nextQuestion = 'Quem serão os responsáveis pela implementação dessas contramedidas?';
        pageId = 'do';
        
        // Preencher automaticamente o campo de contramedidas
        document.getElementById('countermeasures').value = userResponse;
    }
    else if (questionText.includes('responsáveis pela implementação')) {
        nextQuestion = 'Como você vai medir os resultados das ações implementadas?';
        pageId = 'check';
        
        // Adicionar ação ao plano
        addActionToTable(userResponse);
        
        // Navegar para a próxima etapa
        setTimeout(() => {
            navigateToPage('check');
        }, 1000);
    }
    else if (questionText.includes('medir os resultados')) {
        nextQuestion = 'Os resultados obtidos atendem aos objetivos estabelecidos?';
        pageId = 'check';
        
        // Preencher automaticamente o campo de evolução dos indicadores
        document.getElementById('indicator-evolution').value = userResponse;
    }
    else if (questionText.includes('atendem aos objetivos')) {
        nextQuestion = 'Quais medidas adicionais são necessárias para atender completamente aos objetivos?';
        pageId = 'act';
        
        // Preencher automaticamente o campo de atendimento aos objetivos
        document.getElementById('objective-achievement').value = userResponse;
        
        // Navegar para a próxima etapa
        setTimeout(() => {
            navigateToPage('act');
        }, 1000);
    }
    else if (questionText.includes('medidas adicionais')) {
        nextQuestion = 'Como você planeja padronizar as melhorias alcançadas?';
        pageId = 'act';
        
        // Preencher automaticamente o campo de medidas adicionais
        document.getElementById('additional-measures').value = userResponse;
    }
    else if (questionText.includes('padronizar as melhorias')) {
        nextQuestion = 'Parabéns! Você completou todas as etapas do PDCA. Deseja revisar alguma etapa específica?';
        pageId = 'act';
        
        // Preencher automaticamente o campo de padronização
        document.getElementById('standardization').value = userResponse;
    }
    else {
        nextQuestion = 'Obrigado por suas respostas! Você pode revisar e editar todas as informações nos formulários abaixo.';
    }
    
    // Criar nova pergunta
    if (nextQuestion) {
        setTimeout(() => {
            createNextAIQuestion(aiQuestion.closest('.ai-message'), nextQuestion, pageId);
        }, 1000);
    }
}

// Criar próxima pergunta do assistente IA
function createNextAIQuestion(aiMessage, questionText, pageId) {
    // Criar elemento de nova pergunta
    const newQuestion = document.createElement('div');
    newQuestion.className = 'ai-question';
    newQuestion.innerHTML = `
        <p>${questionText}</p>
        <textarea placeholder="Digite sua resposta aqui..."></textarea>
        <button class="btn-primary ai-submit">Responder</button>
    `;
    
    // Adicionar nova pergunta
    aiMessage.appendChild(newQuestion);
    
    // Adicionar evento ao botão
    newQuestion.querySelector('.ai-submit').addEventListener('click', function() {
        const userResponse = newQuestion.querySelector('textarea').value;
        
        if (userResponse.trim() !== '') {
            // Processar resposta do usuário
            processUserResponse(newQuestion, userResponse);
        }
    });
    
    // Animar entrada da nova pergunta
    newQuestion.style.opacity = '0';
    newQuestion.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        newQuestion.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        newQuestion.style.opacity = '1';
        newQuestion.style.transform = 'translateY(0)';
    }, 100);
}

// Animar entrada do assistente IA
function animateAIAssistant(pageId) {
    const aiAssistant = document.querySelector(`#${pageId} .ai-assistant`);
    
    if (aiAssistant) {
        aiAssistant.style.opacity = '0';
        aiAssistant.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            aiAssistant.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            aiAssistant.style.opacity = '1';
            aiAssistant.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Inicializar gráficos do dashboard
function initDashboardCharts() {
    // Gráfico de status
    const statusCtx = document.getElementById('status-chart');
    if (statusCtx) {
        new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Planejamento', 'Execução', 'Verificação', 'Ação', 'Concluídos'],
                datasets: [{
                    data: [3, 2, 2, 1, 4],
                    backgroundColor: [
                        '#3498db',
                        '#2ecc71',
                        '#f39c12',
                        '#e74c3c',
                        '#9b59b6'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
    
    // Gráfico por usuário
    const userCtx = document.getElementById('user-chart');
    if (userCtx) {
        new Chart(userCtx, {
            type: 'bar',
            data: {
                labels: ['João Silva', 'Maria Oliveira', 'Carlos Santos', 'Ana Pereira', 'Pedro Costa'],
                datasets: [{
                    label: 'PDCAs criados',
                    data: [4, 3, 2, 2, 1],
                    backgroundColor: '#3498db'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                }
            }
        });
    }
    
    // Gráfico de resultados
    const resultsCtx = document.getElementById('results-chart');
    if (resultsCtx) {
        window.resultsChart = new Chart(resultsCtx, {
            type: 'bar',
            data: {
                labels: ['Antes', 'Meta', 'Atual'],
                datasets: [{
                    label: 'Desempenho',
                    data: [30, 80, 65],
                    backgroundColor: [
                        '#e74c3c',
                        '#3498db',
                        '#2ecc71'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Atualizar tipo de gráfico
function updateChartType(chartType) {
    if (window.resultsChart) {
        window.resultsChart.destroy();
        
        const resultsCtx = document.getElementById('results-chart');
        
        window.resultsChart = new Chart(resultsCtx, {
            type: chartType,
            data: {
                labels: ['Antes', 'Meta', 'Atual'],
                datasets: [{
                    label: 'Desempenho',
                    data: [30, 80, 65],
                    backgroundColor: [
                        '#e74c3c',
                        '#3498db',
                        '#2ecc71'
                    ],
                    borderColor: '#2c3e50',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Inicializar eventos do plano de ação
function initActionPlan() {
    // Botão para adicionar linha ao plano de ação
    const addActionButton = document.querySelector('.add-action-row');
    if (addActionButton) {
        addActionButton.addEventListener('click', function() {
            addActionRow();
        });
    }
    
    // Eventos para botões de exclusão de linha
    initDeleteRowButtons();
}

// Adicionar linha ao plano de ação
function addActionRow() {
    const actionPlanItems = document.getElementById('action-plan-items');
    
    if (actionPlanItems) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" placeholder="Ação"></td>
            <td><input type="text" placeholder="Motivo"></td>
            <td><input type="text" placeholder="Local"></td>
            <td><input type="date"></td>
            <td><input type="text" placeholder="Responsável"></td>
            <td><input type="text" placeholder="Método"></td>
            <td><input type="text" placeholder="Custo"></td>
            <td>
                <select>
                    <option value="pending">Pendente</option>
                    <option value="in-progress">Em andamento</option>
                    <option value="completed">Concluído</option>
                </select>
            </td>
            <td>
                <button class="btn-icon delete-row"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        actionPlanItems.appendChild(newRow);
        
        // Adicionar evento ao botão de exclusão
        const deleteButton = newRow.querySelector('.delete-row');
        deleteButton.addEventListener('click', function() {
            newRow.remove();
        });
    }
}

// Adicionar ação ao plano com base na resposta do usuário
function addActionToTable(userResponse) {
    const actionPlanItems = document.getElementById('action-plan-items');
    
    if (actionPlanItems) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" value="Implementar contramedidas" placeholder="Ação"></td>
            <td><input type="text" value="Resolver problema identificado" placeholder="Motivo"></td>
            <td><input type="text" value="Departamento afetado" placeholder="Local"></td>
            <td><input type="date" value="${getCurrentDate()}"></td>
            <td><input type="text" value="${userResponse}" placeholder="Responsável"></td>
            <td><input type="text" value="Seguir procedimento padrão" placeholder="Método"></td>
            <td><input type="text" value="A definir" placeholder="Custo"></td>
            <td>
                <select>
                    <option value="pending">Pendente</option>
                    <option value="in-progress" selected>Em andamento</option>
                    <option value="completed">Concluído</option>
                </select>
            </td>
            <td>
                <button class="btn-icon delete-row"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        actionPlanItems.appendChild(newRow);
        
        // Adicionar evento ao botão de exclusão
        const deleteButton = newRow.querySelector('.delete-row');
        deleteButton.addEventListener('click', function() {
            newRow.remove();
        });
    }
}

// Inicializar eventos para botões de exclusão de linha
function initDeleteRowButtons() {
    const deleteButtons = document.querySelectorAll('.delete-row');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            row.remove();
        });
    });
}

// Exibir ferramenta de análise selecionada
function showAnalysisTool(toolType) {
    const toolArea = document.querySelector('.analysis-tool-area');
    
    if (toolArea) {
        let toolContent = '';
        
        switch (toolType) {
            case 'fishbone':
                toolContent = `
                    <div class="fishbone-diagram">
                        <h4>Diagrama de Ishikawa (Espinha de Peixe)</h4>
                        <p>Clique nos campos para editar as causas potenciais em cada categoria.</p>
                        <div class="fishbone-container">
                            <div class="fishbone-category">
                                <h5>Máquina</h5>
                                <div class="fishbone-causes">
                                    <div class="fishbone-cause" contenteditable="true">Causa 1</div>
                                    <div class="fishbone-cause" contenteditable="true">Causa 2</div>
                                    <div class="fishbone-cause" contenteditable="true">Causa 3</div>
                                </div>
                            </div>
                            <div class="fishbone-category">
                                <h5>Método</h5>
                                <div class="fishbone-causes">
                                    <div class="fishbone-cause" contenteditable="true">Causa 1</div>
                                    <div class="fishbone-cause" contenteditable="true">Causa 2</div>
                                    <div class="fishbone-cause" contenteditable="true">Causa 3</div>
                                </div>
                            </div>
                            <div class="fishbone-category">
                                <h5>Mão de obra</h5>
                                <div class="fishbone-causes">
                                    <div class="fishbone-cause" contenteditable="true">Causa 1</div>
                                    <div class="fishbone-cause" contenteditable="true">Causa 2</div>
                                    <div class="fishbone-cause" contenteditable="true">Causa 3</div>
                                </div>
                            </div>
                            <div class="fishbone-category">
                                <h5>Material</h5>
                                <div class="fishbone-causes">
                                    <div class="fishbone-cause" contenteditable="true">Causa 1</div>
                                    <div class="fishbone-cause" contenteditable="true">Causa 2</div>
                                    <div class="fishbone-cause" contenteditable="true">Causa 3</div>
                                </div>
                            </div>
                            <div class="fishbone-category">
                                <h5>Medição</h5>
                                <div class="fishbone-causes">
                                    <div class="fishbone-cause" contenteditable="true">Causa 1</div>
                                    <div class="fishbone-cause" contenteditable="true">Causa 2</div>
                                    <div class="fishbone-cause" contenteditable="true">Causa 3</div>
                                </div>
                            </div>
                            <div class="fishbone-category">
                                <h5>Meio ambiente</h5>
                                <div class="fishbone-causes">
                                    <div class="fishbone-cause" contenteditable="true">Causa 1</div>
                                    <div class="fishbone-cause" contenteditable="true">Causa 2</div>
                                    <div class="fishbone-cause" contenteditable="true">Causa 3</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case '5why':
                toolContent = `
                    <div class="five-why-analysis">
                        <h4>Análise dos 5 Porquês</h4>
                        <p>Clique nos campos para editar as respostas.</p>
                        <div class="five-why-container">
                            <div class="five-why-item">
                                <div class="five-why-question">1. Por que o problema ocorre?</div>
                                <div class="five-why-answer" contenteditable="true">Resposta ao primeiro porquê...</div>
                            </div>
                            <div class="five-why-item">
                                <div class="five-why-question">2. Por que isso acontece?</div>
                                <div class="five-why-answer" contenteditable="true">Resposta ao segundo porquê...</div>
                            </div>
                            <div class="five-why-item">
                                <div class="five-why-question">3. Por que isso acontece?</div>
                                <div class="five-why-answer" contenteditable="true">Resposta ao terceiro porquê...</div>
                            </div>
                            <div class="five-why-item">
                                <div class="five-why-question">4. Por que isso acontece?</div>
                                <div class="five-why-answer" contenteditable="true">Resposta ao quarto porquê...</div>
                            </div>
                            <div class="five-why-item">
                                <div class="five-why-question">5. Por que isso acontece?</div>
                                <div class="five-why-answer" contenteditable="true">Resposta ao quinto porquê (causa raiz)...</div>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'pareto':
                toolContent = `
                    <div class="pareto-analysis">
                        <h4>Diagrama de Pareto</h4>
                        <p>Adicione as causas e suas frequências para gerar o gráfico.</p>
                        <div class="pareto-input">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Causa</th>
                                        <th>Frequência</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody id="pareto-items">
                                    <tr>
                                        <td><input type="text" placeholder="Causa"></td>
                                        <td><input type="number" placeholder="Frequência"></td>
                                        <td>
                                            <button class="btn-icon delete-pareto-row"><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button class="btn-secondary add-pareto-row"><i class="fas fa-plus"></i> Adicionar causa</button>
                            <button class="btn-primary generate-pareto"><i class="fas fa-chart-bar"></i> Gerar gráfico</button>
                        </div>
                        <div class="pareto-chart-container">
                            <canvas id="pareto-chart"></canvas>
                        </div>
                    </div>
                `;
                break;
                
            default:
                toolContent = '<p>Selecione uma ferramenta de análise acima.</p>';
        }
        
        toolArea.innerHTML = toolContent;
        
        // Adicionar eventos específicos para cada ferramenta
        if (toolType === 'pareto') {
            // Botão para adicionar linha ao Pareto
            const addParetoButton = document.querySelector('.add-pareto-row');
            if (addParetoButton) {
                addParetoButton.addEventListener('click', function() {
                    addParetoRow();
                });
            }
            
            // Botão para gerar gráfico de Pareto
            const generateParetoButton = document.querySelector('.generate-pareto');
            if (generateParetoButton) {
                generateParetoButton.addEventListener('click', function() {
                    generateParetoChart();
                });
            }
            
            // Eventos para botões de exclusão de linha
            initDeleteParetoRowButtons();
        }
    }
}

// Adicionar linha ao Pareto
function addParetoRow() {
    const paretoItems = document.getElementById('pareto-items');
    
    if (paretoItems) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" placeholder="Causa"></td>
            <td><input type="number" placeholder="Frequência"></td>
            <td>
                <button class="btn-icon delete-pareto-row"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        paretoItems.appendChild(newRow);
        
        // Adicionar evento ao botão de exclusão
        const deleteButton = newRow.querySelector('.delete-pareto-row');
        deleteButton.addEventListener('click', function() {
            newRow.remove();
        });
    }
}

// Inicializar eventos para botões de exclusão de linha do Pareto
function initDeleteParetoRowButtons() {
    const deleteButtons = document.querySelectorAll('.delete-pareto-row');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            row.remove();
        });
    });
}

// Gerar gráfico de Pareto
function generateParetoChart() {
    const paretoItems = document.getElementById('pareto-items');
    const paretoChartCanvas = document.getElementById('pareto-chart');
    
    if (paretoItems && paretoChartCanvas) {
        const rows = paretoItems.querySelectorAll('tr');
        const causes = [];
        const frequencies = [];
        
        rows.forEach(row => {
            const causeInput = row.querySelector('td:first-child input');
            const frequencyInput = row.querySelector('td:nth-child(2) input');
            
            if (causeInput.value.trim() !== '' && frequencyInput.value.trim() !== '') {
                causes.push(causeInput.value);
                frequencies.push(parseInt(frequencyInput.value));
            }
        });
        
        if (causes.length > 0) {
            // Ordenar causas por frequência (decrescente)
            const combinedData = causes.map((cause, index) => {
                return { cause, frequency: frequencies[index] };
            });
            
            combinedData.sort((a, b) => b.frequency - a.frequency);
            
            const sortedCauses = combinedData.map(item => item.cause);
            const sortedFrequencies = combinedData.map(item => item.frequency);
            
            // Calcular percentual acumulado
            const total = sortedFrequencies.reduce((sum, freq) => sum + freq, 0);
            let accumulated = 0;
            const accumulatedPercentages = sortedFrequencies.map(freq => {
                accumulated += freq;
                return (accumulated / total) * 100;
            });
            
            // Criar gráfico
            if (window.paretoChart) {
                window.paretoChart.destroy();
            }
            
            window.paretoChart = new Chart(paretoChartCanvas, {
                type: 'bar',
                data: {
                    labels: sortedCauses,
                    datasets: [
                        {
                            label: 'Frequência',
                            data: sortedFrequencies,
                            backgroundColor: '#3498db',
                            order: 2
                        },
                        {
                            label: 'Percentual acumulado',
                            data: accumulatedPercentages,
                            type: 'line',
                            borderColor: '#e74c3c',
                            backgroundColor: 'transparent',
                            pointBackgroundColor: '#e74c3c',
                            pointBorderColor: '#fff',
                            pointRadius: 5,
                            yAxisID: 'y1',
                            order: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Frequência'
                            }
                        },
                        y1: {
                            beginAtZero: true,
                            position: 'right',
                            max: 100,
                            title: {
                                display: true,
                                text: 'Percentual acumulado'
                            },
                            grid: {
                                drawOnChartArea: false
                            }
                        }
                    }
                }
            });
        }
    }
}

// Criar imagem do ciclo PDCA para a página inicial
function createPDCACycleImage() {
    // Simular a criação de uma imagem SVG do ciclo PDCA
    // Na implementação real, você pode usar uma imagem real ou criar um SVG mais elaborado
    const pdcaCycleImage = `
        <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <!-- Círculo base -->
            <circle cx="200" cy="200" r="150" fill="none" stroke="#ecf0f1" stroke-width="30" />
            
            <!-- Segmentos PDCA -->
            <path d="M200 50 A150 150 0 0 1 350 200" fill="none" stroke="#3498db" stroke-width="30" />
            <path d="M350 200 A150 150 0 0 1 200 350" fill="none" stroke="#2ecc71" stroke-width="30" />
            <path d="M200 350 A150 150 0 0 1 50 200" fill="none" stroke="#f39c12" stroke-width="30" />
            <path d="M50 200 A150 150 0 0 1 200 50" fill="none" stroke="#e74c3c" stroke-width="30" />
            
            <!-- Textos PDCA -->
            <text x="200" y="80" text-anchor="middle" fill="#2c3e50" font-size="24" font-weight="bold">PLAN</text>
            <text x="320" y="200" text-anchor="middle" fill="#2c3e50" font-size="24" font-weight="bold">DO</text>
            <text x="200" y="320" text-anchor="middle" fill="#2c3e50" font-size="24" font-weight="bold">CHECK</text>
            <text x="80" y="200" text-anchor="middle" fill="#2c3e50" font-size="24" font-weight="bold">ACT</text>
            
            <!-- Seta de ciclo contínuo -->
            <path d="M200 20 C 220 20, 220 10, 240 10 L 240 0 L 260 20 L 240 40 L 240 30 C 220 30, 220 20, 200 20" fill="#2c3e50" />
        </svg>
    `;
    
    // Salvar SVG como arquivo
    const blob = new Blob([pdcaCycleImage], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    // Criar elemento de imagem e adicionar à página
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Ciclo PDCA';
    
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.innerHTML = '';
        heroImage.appendChild(img);
    }
}

// Criar novo PDCA
function createNewPDCA() {
    const title = document.getElementById('pdca-title').value;
    const description = document.getElementById('pdca-description').value;
    
    if (title.trim() === '') {
        alert('Por favor, informe um título para o PDCA.');
        return;
    }
    
    // Criar objeto PDCA
    currentPDCA = {
        id: generateId(),
        title: title,
        description: description,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'planning',
        progress: 0,
        createdBy: 'Usuário',
        plan: {},
        do: {},
        check: {},
        act: {}
    };
    
    // Adicionar à lista
    pdcaList.push(currentPDCA);
    
    // Fechar modal
    document.getElementById('new-pdca-modal').classList.remove('active');
    
    // Navegar para a página Plan
    navigateToPage('plan');
    
    // Mostrar mensagem de sucesso
    showSuccessModal('PDCA criado com sucesso! Agora você pode começar a preencher as informações da etapa Plan.');
}

// Carregar PDCAs salvos (simulado)
function loadSavedPDCAs() {
    // Simulação de PDCAs salvos
    pdcaList = [
        {
            id: 'pdca1',
            title: 'Melhoria do processo de atendimento',
            description: 'Reduzir o tempo de espera e melhorar a satisfação dos clientes',
            createdAt: new Date(2025, 3, 15),
            updatedAt: new Date(2025, 3, 20),
            status: 'completed',
            progress: 100,
            createdBy: 'João Silva'
        },
        {
            id: 'pdca2',
            title: 'Redução de desperdícios na produção',
            description: 'Identificar e eliminar desperdícios no processo produtivo',
            createdAt: new Date(2025, 3, 18),
            updatedAt: new Date(2025, 3, 22),
            status: 'in-progress',
            progress: 65,
            createdBy: 'Maria Oliveira'
        },
        {
            id: 'pdca3',
            title: 'Otimização da cadeia de suprimentos',
            description: 'Melhorar a eficiência da cadeia de suprimentos',
            createdAt: new Date(2025, 3, 20),
            updatedAt: new Date(2025, 3, 23),
            status: 'planning',
            progress: 25,
            createdBy: 'Carlos Santos'
        }
    ];
}

// Exibir modal de sucesso
function showSuccessModal(message) {
    const successModal = document.getElementById('success-modal');
    const successMessage = document.getElementById('success-message');
    
    if (successModal && successMessage) {
        successMessage.textContent = message;
        successModal.classList.add('active');
    }
}

// Exibir modal de confirmação
function showConfirmationModal(message, confirmCallback) {
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmationMessage = document.getElementById('confirmation-message');
    const confirmButton = document.querySelector('.modal-confirm');
    
    if (confirmationModal && confirmationMessage && confirmButton) {
        confirmationMessage.textContent = message;
        
        // Remover eventos anteriores
        const newConfirmButton = confirmButton.cloneNode(true);
        confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);
        
        // Adicionar novo evento
        newConfirmButton.addEventListener('click', function() {
            confirmCallback();
            confirmationModal.classList.remove('active');
        });
        
        confirmationModal.classList.add('active');
    }
}

// Gerar ID único
function generateId() {
    return 'pdca_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
}

// Obter data atual formatada para input date
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

// Adicionar estilos CSS para as ferramentas de análise
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .fishbone-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 20px;
    }
    
    .fishbone-category {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 15px;
    }
    
    .fishbone-category h5 {
        margin-bottom: 10px;
        color: #2c3e50;
    }
    
    .fishbone-causes {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .fishbone-cause {
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        padding: 8px 12px;
        min-width: 150px;
        cursor: text;
    }
    
    .five-why-container {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-top: 20px;
    }
    
    .five-why-item {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 15px;
    }
    
    .five-why-question {
        font-weight: 500;
        margin-bottom: 10px;
        color: #2c3e50;
    }
    
    .five-why-answer {
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        padding: 10px;
        min-height: 60px;
        cursor: text;
    }
    
    .pareto-input {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    
    .pareto-input table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 15px;
    }
    
    .pareto-input th,
    .pareto-input td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #e0e0e0;
    }
    
    .pareto-input th {
        background-color: #f8f9fa;
        font-weight: 500;
    }
    
    .pareto-chart-container {
        height: 300px;
        margin-top: 20px;
    }
    
    .ai-user-response {
        background-color: #f0f8ff;
        border-radius: 8px;
        padding: 10px 15px;
        margin: 10px 0;
    }
`;

document.head.appendChild(styleSheet);
