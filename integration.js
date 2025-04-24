// Integração de todos os módulos e finalização do sistema
document.addEventListener('DOMContentLoaded', function() {
    // Carregar scripts necessários
    loadRequiredScripts();
    
    // Inicializar Chart.js para gráficos
    initChartJS();
    
    // Integrar todos os módulos
    integrateAllModules();
    
    // Adicionar funcionalidades finais
    addFinalFeatures();
    
    // Configurar detecção de erros
    setupErrorHandling();
});

// Carregar scripts necessários
function loadRequiredScripts() {
    // Verificar se Chart.js já está carregado
    if (typeof Chart === 'undefined') {
        // Criar elemento de script para Chart.js
        const chartScript = document.createElement('script');
        chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        chartScript.async = true;
        
        // Adicionar ao documento
        document.head.appendChild(chartScript);
    }
    
    // Verificar se Font Awesome já está carregado
    if (!document.querySelector('link[href*="font-awesome"]')) {
        // Criar elemento de link para Font Awesome
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        
        // Adicionar ao documento
        document.head.appendChild(fontAwesomeLink);
    }
}

// Inicializar Chart.js para gráficos
function initChartJS() {
    // Verificar se Chart.js está carregado
    if (typeof Chart !== 'undefined') {
        // Configurar padrões globais
        Chart.defaults.font.family = "'Poppins', 'Helvetica', 'Arial', sans-serif";
        Chart.defaults.color = '#7f8c8d';
        Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(52, 73, 94, 0.8)';
        Chart.defaults.plugins.legend.labels.padding = 10;
    } else {
        // Tentar novamente após um curto atraso
        setTimeout(initChartJS, 500);
    }
}

// Integrar todos os módulos
function integrateAllModules() {
    // Verificar se todos os módulos estão disponíveis
    if (typeof animateAIAssistant === 'undefined' || 
        typeof navigateToPage === 'undefined' || 
        typeof loadUserPDCAs === 'undefined' || 
        typeof loadPublicPDCAs === 'undefined') {
        
        // Definir funções globais necessárias se não existirem
        if (typeof animateAIAssistant === 'undefined') {
            window.animateAIAssistant = function(pageId) {
                const aiAssistant = document.querySelector('.ai-assistant');
                if (!aiAssistant) return;
                
                // Resetar animação
                aiAssistant.style.animation = 'none';
                aiAssistant.offsetHeight; // Trigger reflow
                
                // Aplicar animação
                aiAssistant.style.animation = 'fadeInRight 0.5s forwards';
                
                // Atualizar mensagem do assistente com base na página
                updateAIAssistantMessage(pageId);
            };
        }
        
        if (typeof updateAIAssistantMessage === 'undefined') {
            window.updateAIAssistantMessage = function(pageId) {
                const aiMessage = document.querySelector('.ai-message');
                if (!aiMessage) return;
                
                // Definir mensagens por página
                const messages = {
                    'home': 'Bem-vindo ao sistema PDCA! Aqui você pode criar e gerenciar seus projetos de melhoria contínua. Como posso ajudar?',
                    'plan': 'Na etapa Plan (Planejar), você deve identificar o problema, analisar a situação atual e determinar as causas raiz. Precisa de ajuda?',
                    'do': 'Na etapa Do (Executar), você deve implementar as contramedidas planejadas. Defina ações claras com responsáveis e prazos.',
                    'check': 'Na etapa Check (Verificar), você deve avaliar os resultados das ações implementadas. Os objetivos foram atingidos?',
                    'act': 'Na etapa Act (Agir), você deve padronizar as melhorias bem-sucedidas ou iniciar um novo ciclo PDCA se necessário.',
                    'dashboard': 'No Dashboard, você pode visualizar todos os seus PDCAs e acompanhar o progresso de cada um. Utilize os filtros para encontrar informações específicas.'
                };
                
                // Atualizar mensagem
                aiMessage.textContent = messages[pageId] || messages['home'];
                
                // Animar digitação
                animateTyping(aiMessage);
            };
        }
        
        if (typeof animateTyping === 'undefined') {
            window.animateTyping = function(element) {
                const text = element.textContent;
                element.textContent = '';
                
                let i = 0;
                const speed = 30; // velocidade de digitação
                
                function typeWriter() {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, speed);
                    }
                }
                
                typeWriter();
            };
        }
        
        if (typeof navigateToPage === 'undefined') {
            window.navigateToPage = function(pageId) {
                // Obter a página atual
                const currentPage = document.querySelector('.page.active');
                if (!currentPage) return;
                
                // Obter a página de destino
                const targetPage = document.getElementById(pageId);
                if (!targetPage) return;
                
                // Verificar se já está na página de destino
                if (currentPage.id === pageId) return;
                
                // Animar a transição
                currentPage.style.opacity = '1';
                currentPage.style.transform = 'translateX(0)';
                
                // Configurar transição
                currentPage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                targetPage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                // Animar saída da página atual
                currentPage.style.opacity = '0';
                currentPage.style.transform = 'translateX(-50px)';
                
                // Preparar página de destino
                targetPage.style.opacity = '0';
                targetPage.style.transform = 'translateX(50px)';
                targetPage.classList.add('active');
                
                // Após a animação de saída, animar entrada da página de destino
                setTimeout(() => {
                    currentPage.classList.remove('active');
                    targetPage.style.opacity = '1';
                    targetPage.style.transform = 'translateX(0)';
                    
                    // Atualizar navegação
                    updateNavigation(pageId);
                    
                    // Animar entrada do assistente IA
                    animateAIAssistant(pageId);
                }, 300);
            };
        }
        
        if (typeof updateNavigation === 'undefined') {
            window.updateNavigation = function(pageId) {
                const navLinks = document.querySelectorAll('.main-nav a');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-page') === pageId) {
                        link.classList.add('active');
                    }
                });
            };
        }
        
        if (typeof loadUserPDCAs === 'undefined') {
            window.loadUserPDCAs = function() {
                if (!window.currentUser || !window.pdcaDatabase) return;
                
                // Filtrar PDCAs do usuário atual (criados por ele ou compartilhados com ele)
                const userPDCAs = window.pdcaDatabase.filter(pdca => 
                    pdca.createdBy === window.currentUser.id || 
                    pdca.sharedWith.includes(window.currentUser.id)
                );
                
                // Atualizar lista de PDCAs recentes
                updateRecentPDCAs(userPDCAs);
                
                // Atualizar dashboard
                updateDashboard(userPDCAs);
            };
        }
        
        if (typeof loadPublicPDCAs === 'undefined') {
            window.loadPublicPDCAs = function() {
                if (!window.pdcaDatabase) return;
                
                // Obter container
                const container = document.querySelector('.public-pdca-container');
                if (!container) return;
                
                // Remover indicador de carregamento
                const loadingIndicator = container.querySelector('.loading-indicator');
                if (loadingIndicator) {
                    loadingIndicator.remove();
                }
                
                // Filtrar PDCAs públicos
                const publicPDCAs = window.pdcaDatabase.filter(pdca => pdca.isPublic);
                
                // Verificar se há PDCAs públicos
                if (publicPDCAs.length === 0) {
                    container.innerHTML = `
                        <div class="no-results">
                            <i class="fas fa-search"></i>
                            <p>Nenhum PDCA público encontrado.</p>
                        </div>
                    `;
                    return;
                }
                
                // Ordenar por data de atualização (mais recentes primeiro)
                const sortedPDCAs = [...publicPDCAs].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                
                // Verificar modo de visualização atual
                const isGridView = container.classList.contains('grid-view');
                
                // Limpar container
                container.innerHTML = '';
                
                // Adicionar PDCAs
                sortedPDCAs.forEach(pdca => {
                    const creator = window.usersDatabase.find(user => user.id === pdca.createdBy);
                    
                    if (isGridView) {
                        // Criar card para visualização em grade
                        const pdcaCard = document.createElement('div');
                        pdcaCard.className = 'public-pdca-card';
                        pdcaCard.innerHTML = `
                            <div class="public-pdca-card-header">
                                <h4>${pdca.title}</h4>
                                <p>${pdca.description}</p>
                                <span class="public-pdca-card-status">${getStatusLabel(pdca.status)}</span>
                            </div>
                            <div class="public-pdca-card-body">
                                <div class="public-pdca-card-meta">
                                    <div class="public-pdca-card-creator">
                                        <img src="${creator ? creator.avatar : 'img/user-avatar.png'}" alt="${creator ? creator.name : 'Usuário'}">
                                        <span>${creator ? creator.name : 'Usuário desconhecido'}</span>
                                    </div>
                                    <div class="public-pdca-card-date">${formatDate(pdca.updatedAt)}</div>
                                </div>
                                <div class="public-pdca-progress">
                                    <div class="public-pdca-progress-bar" style="width: ${pdca.progress}%"></div>
                                </div>
                                <p>${getPDCASummary(pdca)}</p>
                            </div>
                            <div class="public-pdca-card-footer">
                                <button class="btn-primary view-public-pdca" data-pdca-id="${pdca.id}">Visualizar PDCA</button>
                            </div>
                        `;
                        
                        container.appendChild(pdcaCard);
                        
                        // Adicionar evento ao botão de visualização
                        const viewButton = pdcaCard.querySelector('.view-public-pdca');
                        viewButton.addEventListener('click', function() {
                            const pdcaId = this.getAttribute('data-pdca-id');
                            loadPDCA(pdcaId);
                        });
                    } else {
                        // Criar item para visualização em lista
                        const pdcaItem = document.createElement('div');
                        pdcaItem.className = 'public-pdca-list-item';
                        pdcaItem.innerHTML = `
                            <div class="public-pdca-list-status ${pdca.status}"></div>
                            <div class="public-pdca-list-content">
                                <div class="public-pdca-list-header">
                                    <div class="public-pdca-list-title">${pdca.title}</div>
                                    <div class="public-pdca-list-badge ${pdca.status}">${getStatusLabel(pdca.status)}</div>
                                </div>
                                <div class="public-pdca-list-description">${pdca.description}</div>
                                <div class="public-pdca-list-meta">
                                    <div class="public-pdca-list-creator">
                                        <img src="${creator ? creator.avatar : 'img/user-avatar.png'}" alt="${creator ? creator.name : 'Usuário'}">
                                        <span>${creator ? creator.name : 'Usuário desconhecido'}</span>
                                    </div>
                                    <div class="public-pdca-list-date">${formatDate(pdca.updatedAt)}</div>
                                    <div class="public-pdca-list-progress-container">
                                        <div class="public-pdca-list-progress">
                                            <div class="public-pdca-list-progress-bar" style="width: ${pdca.progress}%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="public-pdca-list-actions">
                                <button class="btn-primary view-public-pdca" data-pdca-id="${pdca.id}">Visualizar</button>
                            </div>
                        `;
                        
                        container.appendChild(pdcaItem);
                        
                        // Adicionar evento ao botão de visualização
                        const viewButton = pdcaItem.querySelector('.view-public-pdca');
                        viewButton.addEventListener('click', function() {
                            const pdcaId = this.getAttribute('data-pdca-id');
                            loadPDCA(pdcaId);
                        });
                    }
                });
            };
        }
        
        if (typeof getStatusLabel === 'undefined') {
            window.getStatusLabel = function(status) {
                switch (status) {
                    case 'planning':
                        return 'Planejamento';
                    case 'in-progress':
                        return 'Em andamento';
                    case 'verification':
                        return 'Verificação';
                    case 'action':
                        return 'Ação';
                    case 'completed':
                        return 'Concluído';
                    default:
                        return status;
                }
            };
        }
        
        if (typeof formatDate === 'undefined') {
            window.formatDate = function(date) {
                if (!date) return '';
                
                const d = new Date(date);
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const year = d.getFullYear();
                
                return `${day}/${month}/${year}`;
            };
        }
        
        if (typeof getPDCASummary === 'undefined') {
            window.getPDCASummary = function(pdca) {
                let summary = '';
                
                if (pdca.plan && pdca.plan.problem) {
                    summary += `Problema: ${truncateText(pdca.plan.problem, 100)}`;
                }
                
                if (pdca.status === 'completed' && pdca.check && pdca.check.results) {
                    summary += summary ? ' | ' : '';
                    summary += `Resultados: ${truncateText(pdca.check.results, 100)}`;
                }
                
                return summary || 'Sem detalhes disponíveis';
            };
        }
        
        if (typeof truncateText === 'undefined') {
            window.truncateText = function(text, maxLength) {
                if (!text) return '';
                
                if (text.length <= maxLength) {
                    return text;
                }
                
                return text.substring(0, maxLength) + '...';
            };
        }
    }
    
    // Inicializar dados de exemplo se não existirem
    initializeExampleData();
    
    // Configurar eventos globais
    setupGlobalEvents();
}

// Inicializar dados de exemplo se não existirem
function initializeExampleData() {
    // Verificar se já existem dados
    if (!window.usersDatabase) {
        window.usersDatabase = [
            {
                id: 'user1',
                name: 'João Silva',
                email: 'joao.silva@exemplo.com',
                avatar: 'img/user-avatar.png',
                role: 'admin'
            },
            {
                id: 'user2',
                name: 'Maria Oliveira',
                email: 'maria.oliveira@exemplo.com',
                avatar: 'img/user-avatar.png',
                role: 'user'
            },
            {
                id: 'user3',
                name: 'Carlos Santos',
                email: 'carlos.santos@exemplo.com',
                avatar: 'img/user-avatar.png',
                role: 'user'
            },
            {
                id: 'user4',
                name: 'Ana Pereira',
                email: 'ana.pereira@exemplo.com',
                avatar: 'img/user-avatar.png',
                role: 'user'
            },
            {
                id: 'user5',
                name: 'Pedro Costa',
                email: 'pedro.costa@exemplo.com',
                avatar: 'img/user-avatar.png',
                role: 'user'
            }
        ];
    }
    
    if (!window.currentUser) {
        window.currentUser = window.usersDatabase[0];
    }
    
    if (!window.pdcaDatabase) {
        window.pdcaDatabase = [
            {
                id: 'pdca1',
                title: 'Melhoria do processo de atendimento',
                description: 'Reduzir o tempo de espera e melhorar a satisfação dos clientes',
                createdAt: new Date(2025, 3, 15),
                updatedAt: new Date(2025, 3, 20),
                status: 'completed',
                progress: 100,
                createdBy: 'user1',
                sharedWith: ['user2', 'user3'],
                isPublic: true,
                plan: {
                    problem: 'Tempo de espera elevado no atendimento ao cliente',
                    importance: 'Afeta diretamente a satisfação do cliente e a reputação da empresa',
                    context: 'Departamento de atendimento ao cliente',
                    indicators: 'Tempo médio de espera: 15 minutos, Satisfação do cliente: 65%',
                    objectives: 'Reduzir o tempo de espera para menos de 5 minutos e aumentar a satisfação para 90%',
                    causes: 'Falta de pessoal, Processos ineficientes, Treinamento inadequado',
                    rootCauses: 'Processos manuais que poderiam ser automatizados'
                },
                do: {
                    countermeasures: 'Implementar sistema de autoatendimento, Revisar e otimizar processos, Treinar equipe',
                    actions: [
                        {
                            what: 'Implementar sistema de autoatendimento',
                            why: 'Reduzir carga de trabalho dos atendentes',
                            where: 'Recepção',
                            when: '2025-04-01',
                            who: 'Equipe de TI',
                            how: 'Instalação de quiosques',
                            howMuch: 'R$ 15.000,00',
                            status: 'completed'
                        },
                        {
                            what: 'Revisar processos',
                            why: 'Identificar e eliminar etapas desnecessárias',
                            where: 'Departamento de atendimento',
                            when: '2025-04-05',
                            who: 'Gerente de operações',
                            how: 'Análise de fluxo de trabalho',
                            howMuch: 'R$ 0,00',
                            status: 'completed'
                        }
                    ]
                },
                check: {
                    results: 'Tempo médio de espera reduzido para 4 minutos, Satisfação do cliente aumentou para 92%',
                    evolution: 'Melhoria significativa em todos os indicadores',
                    achievement: 'Objetivos atingidos e superados'
                },
                act: {
                    additionalMeasures: 'Monitoramento contínuo dos indicadores',
                    standardization: 'Documentação dos novos processos e treinamento de novos funcionários',
                    nextCycle: 'Focar na melhoria da qualidade do atendimento',
                    decision: 'standardize'
                }
            },
            {
                id: 'pdca2',
                title: 'Redução de desperdícios na produção',
                description: 'Identificar e eliminar desperdícios no processo produtivo',
                createdAt: new Date(2025, 3, 18),
                updatedAt: new Date(2025, 3, 22),
                status: 'in-progress',
                progress: 65,
                createdBy: 'user2',
                sharedWith: ['user1'],
                isPublic: true,
                plan: {
                    problem: 'Alto nível de desperdício de materiais na linha de produção',
                    importance: 'Impacto direto nos custos e na sustentabilidade',
                    context: 'Linha de produção principal',
                    indicators: 'Taxa de desperdício: 12%, Custo mensal com desperdícios: R$ 45.000,00',
                    objectives: 'Reduzir a taxa de desperdício para menos de 5% e economizar R$ 30.000,00 por mês',
                    causes: 'Equipamentos desajustados, Falta de padronização, Treinamento insuficiente',
                    rootCauses: 'Manutenção preventiva inadequada dos equipamentos'
                },
                do: {
                    countermeasures: 'Implementar programa de manutenção preventiva, Padronizar processos, Treinar operadores',
                    actions: [
                        {
                            what: 'Implementar manutenção preventiva',
                            why: 'Garantir funcionamento adequado dos equipamentos',
                            where: 'Linha de produção',
                            when: '2025-04-20',
                            who: 'Equipe de manutenção',
                            how: 'Cronograma semanal de verificações',
                            howMuch: 'R$ 5.000,00',
                            status: 'completed'
                        },
                        {
                            what: 'Padronizar processos',
                            why: 'Garantir consistência nas operações',
                            where: 'Linha de produção',
                            when: '2025-04-25',
                            who: 'Supervisor de produção',
                            how: 'Documentação e treinamento',
                            howMuch: 'R$ 2.000,00',
                            status: 'in-progress'
                        }
                    ]
                },
                check: {
                    results: 'Taxa de desperdício reduzida para 7%, Economia mensal de R$ 20.000,00',
                    evolution: 'Melhoria significativa, mas ainda não atingiu a meta',
                    achievement: 'Objetivos parcialmente atingidos'
                },
                act: {
                    additionalMeasures: 'Análise detalhada das causas remanescentes',
                    standardization: 'Padronização parcial dos processos melhorados',
                    nextCycle: 'Iniciar novo ciclo focado nas causas remanescentes',
                    decision: 'new-cycle'
                }
            },
            {
                id: 'pdca3',
                title: 'Otimização da cadeia de suprimentos',
                description: 'Melhorar a eficiência da cadeia de suprimentos',
                createdAt: new Date(2025, 3, 20),
                updatedAt: new Date(2025, 3, 23),
                status: 'planning',
                progress: 25,
                createdBy: 'user3',
                sharedWith: [],
                isPublic: true,
                plan: {
                    problem: 'Atrasos frequentes na entrega de matérias-primas',
                    importance: 'Impacta diretamente o cronograma de produção e entrega aos clientes',
                    context: 'Departamento de compras e logística',
                    indicators: 'Taxa de atraso: 25%, Tempo médio de atraso: 5 dias',
                    objectives: 'Reduzir a taxa de atraso para menos de 5% e o tempo médio para menos de 1 dia',
                    causes: 'Comunicação ineficiente com fornecedores, Falta de planejamento, Problemas logísticos',
                    rootCauses: 'Ausência de um sistema integrado de gestão de fornecedores'
                },
                do: {
                    countermeasures: 'Implementar sistema de gestão de fornecedores, Melhorar comunicação, Revisar contratos',
                    actions: []
                },
                check: {
                    results: '',
                    evolution: '',
                    achievement: ''
                },
                act: {
                    additionalMeasures: '',
                    standardization: '',
                    nextCycle: '',
                    decision: ''
                }
            }
        ];
    }
}

// Configurar eventos globais
function setupGlobalEvents() {
    // Adicionar evento de clique para botões de navegação
    document.querySelectorAll('[data-page]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            navigateToPage(pageId);
        });
    });
    
    // Adicionar evento de clique para botões de próximo e anterior
    document.querySelectorAll('.next-step, .prev-step').forEach(button => {
        button.addEventListener('click', function() {
            const targetPageId = this.hasAttribute('data-next') 
                ? this.getAttribute('data-next') 
                : this.getAttribute('data-prev');
            
            navigateToPage(targetPageId);
        });
    });
    
    // Adicionar evento de clique para botão de novo PDCA
    const newPDCAButton = document.querySelector('.new-pdca-btn');
    if (newPDCAButton) {
        newPDCAButton.addEventListener('click', function() {
            const newPDCAModal = document.getElementById('new-pdca-modal');
            if (newPDCAModal) {
                newPDCAModal.classList.add('active');
            }
        });
    }
    
    // Adicionar evento de clique para botões de fechar modal
    document.querySelectorAll('.modal-close, .modal-cancel').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Fechar modais ao clicar fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Adicionar evento de clique para botão de criar PDCA
    const createPDCAButton = document.querySelector('.modal-create');
    if (createPDCAButton) {
        createPDCAButton.addEventListener('click', function() {
            createNewPDCA();
        });
    }
    
    // Adicionar evento de clique para botão de completar PDCA
    const completePDCAButton = document.querySelector('.complete-pdca');
    if (completePDCAButton) {
        completePDCAButton.addEventListener('click', function() {
            if (window.currentPDCA) {
                // Atualizar status e progresso
                window.currentPDCA.status = 'completed';
                window.currentPDCA.progress = 100;
                window.currentPDCA.updatedAt = new Date();
                
                // Atualizar no banco de dados
                const index = window.pdcaDatabase.findIndex(pdca => pdca.id === window.currentPDCA.id);
                if (index !== -1) {
                    window.pdcaDatabase[index] = window.currentPDCA;
                }
                
                // Mostrar mensagem de sucesso
                showSuccessModal('PDCA concluído com sucesso! Os resultados foram salvos e estão disponíveis no Dashboard.');
                
                // Atualizar lista de PDCAs recentes
                updateRecentPDCAs();
                
                // Atualizar dashboard
                updateDashboard();
            }
        });
    }
}

// Adicionar funcionalidades finais
function addFinalFeatures() {
    // Adicionar tutorial interativo
    addInteractiveTutorial();
    
    // Adicionar exportação de PDCA
    addPDCAExport();
    
    // Adicionar tema escuro
    addDarkThemeSupport();
    
    // Adicionar suporte a impressão
    addPrintSupport();
}

// Adicionar tutorial interativo
function addInteractiveTutorial() {
    // Criar botão de tutorial
    const tutorialButton = document.createElement('button');
    tutorialButton.className = 'tutorial-button';
    tutorialButton.innerHTML = '<i class="fas fa-question-circle"></i>';
    tutorialButton.title = 'Tutorial Interativo';
    
    // Adicionar ao corpo do documento
    document.body.appendChild(tutorialButton);
    
    // Criar modal de tutorial
    const tutorialModal = document.createElement('div');
    tutorialModal.className = 'modal tutorial-modal';
    tutorialModal.id = 'tutorial-modal';
    tutorialModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Tutorial Interativo</h3>
                <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="tutorial-steps">
                    <div class="tutorial-step active" data-step="1">
                        <h4>Bem-vindo ao Sistema PDCA!</h4>
                        <p>Este tutorial irá guiá-lo pelos principais recursos do sistema. Clique em "Próximo" para continuar.</p>
                        <img src="img/pdca-cycle.svg" alt="Ciclo PDCA" class="tutorial-image">
                    </div>
                    <div class="tutorial-step" data-step="2">
                        <h4>Criando um Novo PDCA</h4>
                        <p>Para criar um novo PDCA, clique no botão "Novo PDCA" na página inicial. Preencha o título, descrição e selecione a equipe que participará do projeto.</p>
                        <div class="tutorial-highlight">
                            <i class="fas fa-plus-circle"></i>
                            <span>Novo PDCA</span>
                        </div>
                    </div>
                    <div class="tutorial-step" data-step="3">
                        <h4>Etapa Plan (Planejar)</h4>
                        <p>Na etapa Plan, você deve identificar o problema, analisar a situação atual, definir objetivos e determinar as causas raiz.</p>
                        <div class="tutorial-highlight plan">
                            <i class="fas fa-clipboard-list"></i>
                            <span>Plan</span>
                        </div>
                    </div>
                    <div class="tutorial-step" data-step="4">
                        <h4>Etapa Do (Executar)</h4>
                        <p>Na etapa Do, você deve implementar as contramedidas planejadas. Defina ações claras com responsáveis, prazos e custos.</p>
                        <div class="tutorial-highlight do">
                            <i class="fas fa-play"></i>
                            <span>Do</span>
                        </div>
                    </div>
                    <div class="tutorial-step" data-step="5">
                        <h4>Etapa Check (Verificar)</h4>
                        <p>Na etapa Check, você deve avaliar os resultados das ações implementadas. Os objetivos foram atingidos? Quais foram as melhorias?</p>
                        <div class="tutorial-highlight check">
                            <i class="fas fa-check-circle"></i>
                            <span>Check</span>
                        </div>
                    </div>
                    <div class="tutorial-step" data-step="6">
                        <h4>Etapa Act (Agir)</h4>
                        <p>Na etapa Act, você deve padronizar as melhorias bem-sucedidas ou iniciar um novo ciclo PDCA se necessário.</p>
                        <div class="tutorial-highlight act">
                            <i class="fas fa-sync-alt"></i>
                            <span>Act</span>
                        </div>
                    </div>
                    <div class="tutorial-step" data-step="7">
                        <h4>Dashboard</h4>
                        <p>No Dashboard, você pode visualizar todos os seus PDCAs e acompanhar o progresso de cada um. Utilize os filtros para encontrar informações específicas.</p>
                        <div class="tutorial-highlight">
                            <i class="fas fa-chart-bar"></i>
                            <span>Dashboard</span>
                        </div>
                    </div>
                    <div class="tutorial-step" data-step="8">
                        <h4>Compartilhamento</h4>
                        <p>Você pode compartilhar seus PDCAs com outros usuários ou torná-los públicos para que todos possam visualizá-los.</p>
                        <div class="tutorial-highlight">
                            <i class="fas fa-share-alt"></i>
                            <span>Compartilhar</span>
                        </div>
                    </div>
                    <div class="tutorial-step" data-step="9">
                        <h4>Assistente IA</h4>
                        <p>O assistente IA está sempre disponível para ajudá-lo em cada etapa do PDCA. Ele fornece dicas e orientações para melhorar seu projeto.</p>
                        <div class="tutorial-highlight">
                            <i class="fas fa-robot"></i>
                            <span>Assistente IA</span>
                        </div>
                    </div>
                    <div class="tutorial-step" data-step="10">
                        <h4>Pronto para começar!</h4>
                        <p>Agora você conhece os principais recursos do sistema PDCA. Clique em "Concluir" para começar a usar o sistema.</p>
                        <div class="tutorial-complete">
                            <i class="fas fa-check"></i>
                            <span>Tutorial Concluído</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="tutorial-progress">
                    <div class="tutorial-progress-bar" style="width: 10%"></div>
                </div>
                <div class="tutorial-navigation">
                    <button class="btn-secondary tutorial-prev" disabled>Anterior</button>
                    <div class="tutorial-step-indicator">Passo <span class="current-step">1</span> de <span class="total-steps">10</span></div>
                    <button class="btn-primary tutorial-next">Próximo</button>
                </div>
            </div>
        </div>
    `;
    
    // Adicionar ao corpo do documento
    document.body.appendChild(tutorialModal);
    
    // Adicionar estilos CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .tutorial-button {
            position: fixed;
            bottom: 20px;
            left: 80px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--secondary-color);
            color: var(--white);
            border: none;
            font-size: var(--font-size-xl);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: var(--shadow-md);
            z-index: 1000;
            transition: all var(--transition-fast);
        }
        
        .tutorial-button:hover {
            background-color: var(--secondary-dark);
            transform: scale(1.1);
        }
        
        .tutorial-modal .modal-content {
            max-width: 600px;
        }
        
        .tutorial-steps {
            position: relative;
            min-height: 300px;
        }
        
        .tutorial-step {
            display: none;
            animation: fadeIn var(--transition-normal);
        }
        
        .tutorial-step.active {
            display: block;
        }
        
        .tutorial-image {
            display: block;
            max-width: 200px;
            margin: var(--space-md) auto;
        }
        
        .tutorial-highlight {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            padding: var(--space-md);
            background-color: var(--light);
            border-radius: var(--radius-md);
            margin-top: var(--space-md);
            font-weight: 500;
        }
        
        .tutorial-highlight.plan {
            background-color: rgba(52, 152, 219, 0.2);
            color: var(--plan-color);
        }
        
        .tutorial-highlight.do {
            background-color: rgba(46, 204, 113, 0.2);
            color: var(--do-color);
        }
        
        .tutorial-highlight.check {
            background-color: rgba(243, 156, 18, 0.2);
            color: var(--check-color);
        }
        
        .tutorial-highlight.act {
            background-color: rgba(231, 76, 60, 0.2);
            color: var(--act-color);
        }
        
        .tutorial-complete {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--space-md);
            margin-top: var(--space-xl);
        }
        
        .tutorial-complete i {
            font-size: var(--font-size-xxl);
            color: var(--secondary-color);
        }
        
        .tutorial-complete span {
            font-weight: 600;
            color: var(--dark);
        }
        
        .tutorial-progress {
            width: 100%;
            height: 6px;
            background-color: var(--light-medium);
            border-radius: var(--radius-sm);
            margin-bottom: var(--space-md);
            overflow: hidden;
        }
        
        .tutorial-progress-bar {
            height: 100%;
            background-color: var(--primary-color);
            border-radius: var(--radius-sm);
            transition: width var(--transition-normal);
        }
        
        .tutorial-navigation {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }
        
        .tutorial-step-indicator {
            font-size: var(--font-size-sm);
            color: var(--medium);
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Adicionar eventos
    tutorialButton.addEventListener('click', function() {
        tutorialModal.classList.add('active');
    });
    
    const closeButton = tutorialModal.querySelector('.modal-close');
    closeButton.addEventListener('click', function() {
        tutorialModal.classList.remove('active');
    });
    
    // Fechar modal ao clicar fora
    tutorialModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
    
    // Navegação do tutorial
    const prevButton = tutorialModal.querySelector('.tutorial-prev');
    const nextButton = tutorialModal.querySelector('.tutorial-next');
    const currentStepSpan = tutorialModal.querySelector('.current-step');
    const progressBar = tutorialModal.querySelector('.tutorial-progress-bar');
    
    let currentStep = 1;
    const totalSteps = tutorialModal.querySelectorAll('.tutorial-step').length;
    
    prevButton.addEventListener('click', function() {
        if (currentStep > 1) {
            // Ocultar passo atual
            const currentStepElement = tutorialModal.querySelector(`.tutorial-step[data-step="${currentStep}"]`);
            currentStepElement.classList.remove('active');
            
            // Decrementar passo
            currentStep--;
            
            // Mostrar passo anterior
            const prevStepElement = tutorialModal.querySelector(`.tutorial-step[data-step="${currentStep}"]`);
            prevStepElement.classList.add('active');
            
            // Atualizar navegação
            updateTutorialNavigation();
        }
    });
    
    nextButton.addEventListener('click', function() {
        if (currentStep < totalSteps) {
            // Ocultar passo atual
            const currentStepElement = tutorialModal.querySelector(`.tutorial-step[data-step="${currentStep}"]`);
            currentStepElement.classList.remove('active');
            
            // Incrementar passo
            currentStep++;
            
            // Mostrar próximo passo
            const nextStepElement = tutorialModal.querySelector(`.tutorial-step[data-step="${currentStep}"]`);
            nextStepElement.classList.add('active');
            
            // Atualizar navegação
            updateTutorialNavigation();
        } else {
            // Último passo, fechar tutorial
            tutorialModal.classList.remove('active');
            
            // Resetar para o primeiro passo
            currentStep = 1;
            updateTutorialNavigation();
            
            // Mostrar primeiro passo e ocultar os demais
            tutorialModal.querySelectorAll('.tutorial-step').forEach(step => {
                step.classList.remove('active');
            });
            tutorialModal.querySelector('.tutorial-step[data-step="1"]').classList.add('active');
        }
    });
    
    function updateTutorialNavigation() {
        // Atualizar texto do passo atual
        currentStepSpan.textContent = currentStep;
        
        // Atualizar barra de progresso
        const progress = (currentStep / totalSteps) * 100;
        progressBar.style.width = `${progress}%`;
        
        // Atualizar estado dos botões
        prevButton.disabled = currentStep === 1;
        
        if (currentStep === totalSteps) {
            nextButton.textContent = 'Concluir';
        } else {
            nextButton.textContent = 'Próximo';
        }
    }
}

// Adicionar exportação de PDCA
function addPDCAExport() {
    // Adicionar botão de exportação ao dashboard
    const dashboardActions = document.querySelector('.dashboard-actions');
    if (dashboardActions) {
        const exportButton = document.createElement('button');
        exportButton.className = 'btn-secondary export-pdca';
        exportButton.innerHTML = '<i class="fas fa-file-export"></i> Exportar PDCAs';
        
        dashboardActions.appendChild(exportButton);
        
        // Adicionar evento de clique
        exportButton.addEventListener('click', function() {
            showExportModal();
        });
    }
    
    // Criar modal de exportação
    const exportModal = document.createElement('div');
    exportModal.className = 'modal';
    exportModal.id = 'export-modal';
    exportModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Exportar PDCAs</h3>
                <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Formato de exportação:</label>
                    <div class="export-format-options">
                        <div class="export-format-option">
                            <input type="radio" id="export-pdf" name="export-format" value="pdf" checked>
                            <label for="export-pdf">
                                <i class="fas fa-file-pdf"></i>
                                <span>PDF</span>
                            </label>
                        </div>
                        <div class="export-format-option">
                            <input type="radio" id="export-excel" name="export-format" value="excel">
                            <label for="export-excel">
                                <i class="fas fa-file-excel"></i>
                                <span>Excel</span>
                            </label>
                        </div>
                        <div class="export-format-option">
                            <input type="radio" id="export-json" name="export-format" value="json">
                            <label for="export-json">
                                <i class="fas fa-file-code"></i>
                                <span>JSON</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>PDCAs a exportar:</label>
                    <div class="export-pdca-options">
                        <div class="export-pdca-option">
                            <input type="radio" id="export-all" name="export-pdcas" value="all" checked>
                            <label for="export-all">Todos os PDCAs</label>
                        </div>
                        <div class="export-pdca-option">
                            <input type="radio" id="export-selected" name="export-pdcas" value="selected">
                            <label for="export-selected">PDCAs selecionados</label>
                        </div>
                        <div class="export-pdca-option">
                            <input type="radio" id="export-current" name="export-pdcas" value="current">
                            <label for="export-current">PDCA atual</label>
                        </div>
                    </div>
                </div>
                <div class="form-group export-pdca-list" style="display: none;">
                    <label>Selecione os PDCAs:</label>
                    <div class="export-pdca-list-container">
                        ${window.pdcaDatabase ? window.pdcaDatabase.map(pdca => `
                            <div class="export-pdca-item">
                                <input type="checkbox" id="export-pdca-${pdca.id}" value="${pdca.id}">
                                <label for="export-pdca-${pdca.id}">${pdca.title}</label>
                            </div>
                        `).join('') : ''}
                    </div>
                </div>
                <div class="form-group">
                    <label>Opções adicionais:</label>
                    <div class="export-options">
                        <div class="export-option">
                            <input type="checkbox" id="export-include-charts" checked>
                            <label for="export-include-charts">Incluir gráficos</label>
                        </div>
                        <div class="export-option">
                            <input type="checkbox" id="export-include-images" checked>
                            <label for="export-include-images">Incluir imagens</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-cancel">Cancelar</button>
                <button class="btn-primary modal-export">Exportar</button>
            </div>
        </div>
    `;
    
    // Adicionar ao corpo do documento
    document.body.appendChild(exportModal);
    
    // Adicionar estilos CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .export-format-options {
            display: flex;
            gap: var(--space-md);
            margin-bottom: var(--space-md);
        }
        
        .export-format-option {
            flex: 1;
        }
        
        .export-format-option input[type="radio"] {
            display: none;
        }
        
        .export-format-option label {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--space-sm);
            padding: var(--space-md);
            border: 2px solid var(--light-medium);
            border-radius: var(--radius-md);
            cursor: pointer;
            transition: all var(--transition-fast);
        }
        
        .export-format-option label i {
            font-size: var(--font-size-xl);
            color: var(--medium);
        }
        
        .export-format-option input[type="radio"]:checked + label {
            border-color: var(--primary-color);
            background-color: rgba(52, 152, 219, 0.1);
        }
        
        .export-format-option input[type="radio"]:checked + label i {
            color: var(--primary-color);
        }
        
        .export-pdca-options {
            margin-bottom: var(--space-md);
        }
        
        .export-pdca-option {
            margin-bottom: var(--space-sm);
        }
        
        .export-pdca-list-container {
            max-height: 200px;
            overflow-y: auto;
            border: 1px solid var(--light-medium);
            border-radius: var(--radius-md);
            padding: var(--space-sm);
        }
        
        .export-pdca-item {
            margin-bottom: var(--space-sm);
        }
        
        .export-options {
            display: flex;
            gap: var(--space-xl);
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Adicionar eventos
    const closeButtons = exportModal.querySelectorAll('.modal-close, .modal-cancel');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            exportModal.classList.remove('active');
        });
    });
    
    // Fechar modal ao clicar fora
    exportModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
    
    // Mostrar/ocultar lista de PDCAs
    const exportPDCAsRadios = exportModal.querySelectorAll('input[name="export-pdcas"]');
    const exportPDCAList = exportModal.querySelector('.export-pdca-list');
    
    exportPDCAsRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'selected') {
                exportPDCAList.style.display = 'block';
            } else {
                exportPDCAList.style.display = 'none';
            }
        });
    });
    
    // Adicionar evento ao botão de exportação
    const exportButton = exportModal.querySelector('.modal-export');
    exportButton.addEventListener('click', function() {
        // Obter formato selecionado
        const formatRadios = exportModal.querySelectorAll('input[name="export-format"]');
        let selectedFormat;
        formatRadios.forEach(radio => {
            if (radio.checked) {
                selectedFormat = radio.value;
            }
        });
        
        // Obter PDCAs selecionados
        const pdcasRadios = exportModal.querySelectorAll('input[name="export-pdcas"]');
        let selectedPDCAs;
        pdcasRadios.forEach(radio => {
            if (radio.checked) {
                selectedPDCAs = radio.value;
            }
        });
        
        // Obter opções adicionais
        const includeCharts = document.getElementById('export-include-charts').checked;
        const includeImages = document.getElementById('export-include-images').checked;
        
        // Simular exportação
        simulateExport(selectedFormat, selectedPDCAs, includeCharts, includeImages);
        
        // Fechar modal
        exportModal.classList.remove('active');
    });
}

// Simular exportação
function simulateExport(format, pdcas, includeCharts, includeImages) {
    // Mostrar modal de sucesso
    showSuccessModal(`PDCAs exportados com sucesso no formato ${format.toUpperCase()}!`);
}

// Mostrar modal de exportação
function showExportModal() {
    const exportModal = document.getElementById('export-modal');
    if (exportModal) {
        exportModal.classList.add('active');
    }
}

// Adicionar tema escuro
function addDarkThemeSupport() {
    // Adicionar botão de alternância de tema
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Alternar tema claro/escuro';
    
    // Adicionar ao corpo do documento
    document.body.appendChild(themeToggle);
    
    // Adicionar estilos CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .theme-toggle {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--dark);
            color: var(--white);
            border: none;
            font-size: var(--font-size-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: var(--shadow-md);
            z-index: 1000;
            transition: all var(--transition-fast);
        }
        
        .theme-toggle:hover {
            transform: scale(1.1);
        }
        
        body.dark-theme {
            --white: #1a1a1a;
            --light: #2c2c2c;
            --light-medium: #3a3a3a;
            --medium: #888888;
            --medium-dark: #bbbbbb;
            --dark: #f0f0f0;
            
            --primary-color: #3498db;
            --primary-dark: #2980b9;
            --secondary-color: #2ecc71;
            --secondary-dark: #27ae60;
            --accent-color: #e74c3c;
            
            --plan-color: #3498db;
            --do-color: #2ecc71;
            --check-color: #f39c12;
            --act-color: #e74c3c;
            
            --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
            --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.3);
            --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.3);
            
            color-scheme: dark;
        }
        
        body.dark-theme .theme-toggle {
            background-color: var(--light);
            color: var(--medium-dark);
        }
        
        body.dark-theme .theme-toggle i::before {
            content: "\\f185"; /* ícone do sol */
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Adicionar evento de clique
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        // Salvar preferência no localStorage
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('darkTheme', isDarkTheme);
    });
    
    // Verificar preferência salva
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
    }
}

// Adicionar suporte a impressão
function addPrintSupport() {
    // Adicionar estilos de impressão
    const printStyleSheet = document.createElement('style');
    printStyleSheet.media = 'print';
    printStyleSheet.textContent = `
        @media print {
            body {
                background-color: white;
                color: black;
            }
            
            .header, .footer, .main-nav, .user-menu, .ai-assistant,
            .theme-toggle, .tutorial-button, .keyboard-shortcuts-tooltip,
            .user-selector-container, .notification-button, .notification-panel {
                display: none !important;
            }
            
            .container {
                width: 100%;
                max-width: 100%;
                padding: 0;
                margin: 0;
            }
            
            .page {
                display: block !important;
                opacity: 1 !important;
                transform: none !important;
                position: relative !important;
                margin-bottom: 20px;
                page-break-after: always;
            }
            
            .page:not(.active) {
                display: none !important;
            }
            
            .form-section {
                page-break-inside: avoid;
            }
            
            .btn-primary, .btn-secondary, .btn-icon, .next-step, .prev-step {
                display: none !important;
            }
            
            input, textarea, select {
                border: 1px solid #ddd;
                background-color: white;
            }
            
            .pdca-progress, .progress-bar, .progress-bar-small {
                border: 1px solid #ddd;
            }
            
            .progress-fill, .progress-bar-fill {
                background-color: #888;
            }
            
            .dashboard-table {
                width: 100%;
                border-collapse: collapse;
            }
            
            .dashboard-table th, .dashboard-table td {
                border: 1px solid #ddd;
                padding: 8px;
            }
            
            .dashboard-filters, .dashboard-actions {
                display: none !important;
            }
            
            .print-header {
                display: block;
                text-align: center;
                margin-bottom: 20px;
            }
            
            .print-footer {
                display: block;
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #888;
            }
        }
    `;
    document.head.appendChild(printStyleSheet);
    
    // Adicionar botão de impressão
    const printButton = document.createElement('button');
    printButton.className = 'print-button';
    printButton.innerHTML = '<i class="fas fa-print"></i>';
    printButton.title = 'Imprimir PDCA atual';
    
    // Adicionar ao corpo do documento
    document.body.appendChild(printButton);
    
    // Adicionar estilos CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .print-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--medium-dark);
            color: var(--white);
            border: none;
            font-size: var(--font-size-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: var(--shadow-md);
            z-index: 1000;
            transition: all var(--transition-fast);
        }
        
        .print-button:hover {
            background-color: var(--dark);
            transform: scale(1.1);
        }
        
        .print-header, .print-footer {
            display: none;
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Adicionar evento de clique
    printButton.addEventListener('click', function() {
        // Adicionar cabeçalho e rodapé de impressão
        let printHeader = document.querySelector('.print-header');
        if (!printHeader) {
            printHeader = document.createElement('div');
            printHeader.className = 'print-header';
            printHeader.innerHTML = `
                <h1>Sistema PDCA - Relatório</h1>
                <p>Data de impressão: ${new Date().toLocaleDateString()}</p>
            `;
            document.body.insertBefore(printHeader, document.body.firstChild);
        }
        
        let printFooter = document.querySelector('.print-footer');
        if (!printFooter) {
            printFooter = document.createElement('div');
            printFooter.className = 'print-footer';
            printFooter.innerHTML = `
                <p>Sistema PDCA - Página {page} de {total}</p>
            `;
            document.body.appendChild(printFooter);
        }
        
        // Imprimir
        window.print();
    });
}

// Configurar detecção de erros
function setupErrorHandling() {
    // Adicionar tratamento de erros global
    window.addEventListener('error', function(event) {
        console.error('Erro detectado:', event.error);
        
        // Registrar erro
        logError(event.error);
        
        // Mostrar mensagem de erro ao usuário
        showErrorModal('Ocorreu um erro no sistema. Por favor, tente novamente ou entre em contato com o suporte.');
        
        // Evitar que o erro seja exibido no console do navegador
        event.preventDefault();
    });
    
    // Adicionar tratamento de promessas não tratadas
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Promessa não tratada:', event.reason);
        
        // Registrar erro
        logError(event.reason);
        
        // Mostrar mensagem de erro ao usuário
        showErrorModal('Ocorreu um erro no sistema. Por favor, tente novamente ou entre em contato com o suporte.');
        
        // Evitar que o erro seja exibido no console do navegador
        event.preventDefault();
    });
}

// Registrar erro
function logError(error) {
    // Simular registro de erro
    console.log('Erro registrado:', error);
}

// Mostrar modal de erro
function showErrorModal(message) {
    // Criar modal de erro
    let errorModal = document.getElementById('error-modal');
    
    if (!errorModal) {
        errorModal = document.createElement('div');
        errorModal.className = 'modal error-modal';
        errorModal.id = 'error-modal';
        errorModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Erro</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="error-icon">
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                    <p class="error-message">${message}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary modal-ok">OK</button>
                </div>
            </div>
        `;
        
        // Adicionar ao corpo do documento
        document.body.appendChild(errorModal);
        
        // Adicionar estilos CSS
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .error-modal .modal-content {
                max-width: 400px;
            }
            
            .error-icon {
                text-align: center;
                font-size: var(--font-size-xxl);
                color: var(--accent-color);
                margin-bottom: var(--space-md);
            }
            
            .error-message {
                text-align: center;
                color: var(--dark);
            }
        `;
        document.head.appendChild(styleSheet);
        
        // Adicionar eventos
        const closeButton = errorModal.querySelector('.modal-close');
        const okButton = errorModal.querySelector('.modal-ok');
        
        closeButton.addEventListener('click', function() {
            errorModal.classList.remove('active');
        });
        
        okButton.addEventListener('click', function() {
            errorModal.classList.remove('active');
        });
        
        // Fechar modal ao clicar fora
        errorModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    } else {
        // Atualizar mensagem
        errorModal.querySelector('.error-message').textContent = message;
    }
    
    // Exibir modal
    errorModal.classList.add('active');
}

// Mostrar modal de sucesso
function showSuccessModal(message) {
    // Criar modal de sucesso
    let successModal = document.getElementById('success-modal');
    
    if (!successModal) {
        successModal = document.createElement('div');
        successModal.className = 'modal success-modal';
        successModal.id = 'success-modal';
        successModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Sucesso</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <p class="success-message">${message}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary modal-ok">OK</button>
                </div>
            </div>
        `;
        
        // Adicionar ao corpo do documento
        document.body.appendChild(successModal);
        
        // Adicionar estilos CSS
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .success-modal .modal-content {
                max-width: 400px;
            }
            
            .success-icon {
                text-align: center;
                font-size: var(--font-size-xxl);
                color: var(--secondary-color);
                margin-bottom: var(--space-md);
            }
            
            .success-message {
                text-align: center;
                color: var(--dark);
            }
        `;
        document.head.appendChild(styleSheet);
        
        // Adicionar eventos
        const closeButton = successModal.querySelector('.modal-close');
        const okButton = successModal.querySelector('.modal-ok');
        
        closeButton.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
        
        okButton.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
        
        // Fechar modal ao clicar fora
        successModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    } else {
        // Atualizar mensagem
        successModal.querySelector('.success-message').textContent = message;
    }
    
    // Exibir modal
    successModal.classList.add('active');
    
    // Fechar automaticamente após 3 segundos
    setTimeout(function() {
        successModal.classList.remove('active');
    }, 3000);
}

// Mostrar modal de confirmação
function showConfirmationModal(message, confirmCallback) {
    // Criar modal de confirmação
    let confirmationModal = document.getElementById('confirmation-modal');
    
    if (!confirmationModal) {
        confirmationModal = document.createElement('div');
        confirmationModal.className = 'modal confirmation-modal';
        confirmationModal.id = 'confirmation-modal';
        confirmationModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Confirmação</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="confirmation-icon">
                        <i class="fas fa-question-circle"></i>
                    </div>
                    <p class="confirmation-message">${message}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary modal-cancel">Cancelar</button>
                    <button class="btn-primary modal-confirm">Confirmar</button>
                </div>
            </div>
        `;
        
        // Adicionar ao corpo do documento
        document.body.appendChild(confirmationModal);
        
        // Adicionar estilos CSS
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .confirmation-modal .modal-content {
                max-width: 400px;
            }
            
            .confirmation-icon {
                text-align: center;
                font-size: var(--font-size-xxl);
                color: var(--primary-color);
                margin-bottom: var(--space-md);
            }
            
            .confirmation-message {
                text-align: center;
                color: var(--dark);
            }
        `;
        document.head.appendChild(styleSheet);
        
        // Adicionar eventos
        const closeButton = confirmationModal.querySelector('.modal-close');
        const cancelButton = confirmationModal.querySelector('.modal-cancel');
        
        closeButton.addEventListener('click', function() {
            confirmationModal.classList.remove('active');
        });
        
        cancelButton.addEventListener('click', function() {
            confirmationModal.classList.remove('active');
        });
        
        // Fechar modal ao clicar fora
        confirmationModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    } else {
        // Atualizar mensagem
        confirmationModal.querySelector('.confirmation-message').textContent = message;
    }
    
    // Atualizar callback de confirmação
    const confirmButton = confirmationModal.querySelector('.modal-confirm');
    
    // Remover eventos anteriores
    const newConfirmButton = confirmButton.cloneNode(true);
    confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);
    
    // Adicionar novo evento
    newConfirmButton.addEventListener('click', function() {
        confirmationModal.classList.remove('active');
        if (typeof confirmCallback === 'function') {
            confirmCallback();
        }
    });
    
    // Exibir modal
    confirmationModal.classList.add('active');
}
