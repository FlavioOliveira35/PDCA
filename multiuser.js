// Funcionalidades multiusuário para o sistema PDCA
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sistema de usuários
    initUserSystem();
    
    // Configurar gerenciamento de PDCAs por usuário
    setupUserPDCAManagement();
    
    // Implementar sistema de compartilhamento
    implementSharingSystem();
    
    // Adicionar notificações entre usuários
    setupUserNotifications();
});

// Inicializar sistema de usuários
function initUserSystem() {
    // Simular banco de dados de usuários
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
    
    // Usuário atual (simulado)
    window.currentUser = window.usersDatabase[0];
    
    // Atualizar interface com informações do usuário
    updateUserInterface();
    
    // Adicionar seletor de usuário (para simulação)
    addUserSelector();
}

// Atualizar interface com informações do usuário
function updateUserInterface() {
    // Atualizar avatar e nome do usuário
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        const avatar = userProfile.querySelector('.avatar');
        const username = userProfile.querySelector('.username');
        
        if (avatar && username && window.currentUser) {
            avatar.src = window.currentUser.avatar;
            username.textContent = window.currentUser.name;
        }
    }
    
    // Atualizar seletor de usuário
    const userSelector = document.getElementById('user-selector');
    if (userSelector && window.currentUser) {
        userSelector.value = window.currentUser.id;
    }
}

// Adicionar seletor de usuário (para simulação)
function addUserSelector() {
    // Criar elemento de seletor
    const userSelectorContainer = document.createElement('div');
    userSelectorContainer.className = 'user-selector-container';
    userSelectorContainer.innerHTML = `
        <label for="user-selector">Simular usuário:</label>
        <select id="user-selector">
            ${window.usersDatabase.map(user => `
                <option value="${user.id}">${user.name}</option>
            `).join('')}
        </select>
    `;
    
    // Adicionar ao corpo do documento
    document.body.appendChild(userSelectorContainer);
    
    // Adicionar evento de alteração
    const userSelector = document.getElementById('user-selector');
    userSelector.addEventListener('change', function() {
        const selectedUserId = this.value;
        const selectedUser = window.usersDatabase.find(user => user.id === selectedUserId);
        
        if (selectedUser) {
            window.currentUser = selectedUser;
            updateUserInterface();
            loadUserPDCAs();
        }
    });
    
    // Adicionar estilos CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .user-selector-container {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background-color: var(--white);
            padding: var(--space-sm) var(--space-md);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-md);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: var(--space-sm);
        }
        
        .user-selector-container label {
            font-size: var(--font-size-sm);
            color: var(--medium-dark);
        }
        
        #user-selector {
            padding: var(--space-xs) var(--space-sm);
            border: 1px solid var(--light-medium);
            border-radius: var(--radius-sm);
            font-size: var(--font-size-sm);
        }
    `;
    document.head.appendChild(styleSheet);
}

// Configurar gerenciamento de PDCAs por usuário
function setupUserPDCAManagement() {
    // Simular banco de dados de PDCAs
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
    
    // Carregar PDCAs do usuário atual
    loadUserPDCAs();
    
    // Modificar função de criação de PDCA para associar ao usuário atual
    const originalCreateNewPDCA = window.createNewPDCA;
    window.createNewPDCA = function() {
        const title = document.getElementById('pdca-title').value;
        const description = document.getElementById('pdca-description').value;
        
        if (title.trim() === '') {
            alert('Por favor, informe um título para o PDCA.');
            return;
        }
        
        // Obter equipe selecionada
        const teamSelect = document.getElementById('pdca-team');
        const selectedTeam = Array.from(teamSelect.selectedOptions).map(option => option.value);
        
        // Obter prazo
        const deadline = document.getElementById('pdca-deadline').value;
        
        // Criar objeto PDCA
        window.currentPDCA = {
            id: generateId(),
            title: title,
            description: description,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: 'planning',
            progress: 0,
            createdBy: window.currentUser.id,
            sharedWith: selectedTeam,
            isPublic: false,
            deadline: deadline ? new Date(deadline) : null,
            plan: {},
            do: {},
            check: {},
            act: {}
        };
        
        // Adicionar à lista
        window.pdcaDatabase.push(window.currentPDCA);
        
        // Fechar modal
        document.getElementById('new-pdca-modal').classList.remove('active');
        
        // Navegar para a página Plan
        navigateToPage('plan');
        
        // Mostrar mensagem de sucesso
        showSuccessModal('PDCA criado com sucesso! Agora você pode começar a preencher as informações da etapa Plan.');
        
        // Atualizar lista de PDCAs recentes
        updateRecentPDCAs();
    };
    
    // Modificar função de conclusão de PDCA para atualizar banco de dados
    const originalCompletePDCA = document.querySelector('.complete-pdca');
    if (originalCompletePDCA) {
        originalCompletePDCA.addEventListener('click', function() {
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

// Carregar PDCAs do usuário atual
function loadUserPDCAs() {
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
}

// Atualizar lista de PDCAs recentes
function updateRecentPDCAs(pdcaList) {
    const pdcaListContainer = document.querySelector('.pdca-list');
    if (!pdcaListContainer) return;
    
    // Usar lista fornecida ou banco de dados global
    const pdcas = pdcaList || window.pdcaDatabase;
    
    // Ordenar por data de atualização (mais recentes primeiro)
    const sortedPDCAs = [...pdcas].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    // Limitar a 3 PDCAs
    const recentPDCAs = sortedPDCAs.slice(0, 3);
    
    // Limpar container
    pdcaListContainer.innerHTML = '';
    
    // Adicionar PDCAs recentes
    if (recentPDCAs.length > 0) {
        recentPDCAs.forEach(pdca => {
            const creator = window.usersDatabase.find(user => user.id === pdca.createdBy);
            
            const pdcaCard = document.createElement('div');
            pdcaCard.className = 'pdca-card';
            pdcaCard.innerHTML = `
                <div class="pdca-status ${pdca.status}"></div>
                <h4>${pdca.title}</h4>
                <p>Criado por: ${creator ? creator.name : 'Usuário desconhecido'}</p>
                <p>Última atualização: ${formatDate(pdca.updatedAt)}</p>
                <div class="pdca-progress">
                    <div class="progress-bar" style="width: ${pdca.progress}%"></div>
                </div>
                <button class="btn-view" data-pdca-id="${pdca.id}">Visualizar</button>
            `;
            
            pdcaListContainer.appendChild(pdcaCard);
            
            // Adicionar evento ao botão de visualização
            const viewButton = pdcaCard.querySelector('.btn-view');
            viewButton.addEventListener('click', function() {
                const pdcaId = this.getAttribute('data-pdca-id');
                loadPDCA(pdcaId);
            });
        });
    } else {
        pdcaListContainer.innerHTML = '<p class="no-pdca">Nenhum PDCA encontrado. Clique em "Novo PDCA" para criar um.</p>';
    }
}

// Atualizar dashboard
function updateDashboard(pdcaList) {
    // Usar lista fornecida ou banco de dados global
    const pdcas = pdcaList || window.pdcaDatabase;
    
    // Atualizar tabela de PDCAs
    updatePDCATable(pdcas);
    
    // Atualizar cards de resumo
    updateSummaryCards(pdcas);
    
    // Atualizar gráficos
    updateDashboardCharts(pdcas);
}

// Atualizar tabela de PDCAs
function updatePDCATable(pdcas) {
    const dashboardTable = document.querySelector('.dashboard-table tbody');
    if (!dashboardTable) return;
    
    // Limpar tabela
    dashboardTable.innerHTML = '';
    
    // Adicionar PDCAs à tabela
    pdcas.forEach(pdca => {
        const creator = window.usersDatabase.find(user => user.id === pdca.createdBy);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pdca.title}</td>
            <td>${creator ? creator.name : 'Usuário desconhecido'}</td>
            <td>${formatDate(pdca.createdAt)}</td>
            <td>${formatDate(pdca.updatedAt)}</td>
            <td><span class="status-badge ${pdca.status}">${getStatusLabel(pdca.status)}</span></td>
            <td>
                <div class="progress-bar-small">
                    <div class="progress-fill" style="width: ${pdca.progress}%"></div>
                </div>
            </td>
            <td>
                <button class="btn-icon view-pdca" data-pdca-id="${pdca.id}"><i class="fas fa-eye"></i></button>
                ${pdca.createdBy === window.currentUser.id ? `
                    <button class="btn-icon edit-pdca" data-pdca-id="${pdca.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon delete-pdca" data-pdca-id="${pdca.id}"><i class="fas fa-trash"></i></button>
                ` : ''}
                ${pdca.createdBy === window.currentUser.id ? `
                    <button class="btn-icon share-pdca" data-pdca-id="${pdca.id}"><i class="fas fa-share-alt"></i></button>
                ` : ''}
            </td>
        `;
        
        dashboardTable.appendChild(row);
        
        // Adicionar eventos aos botões
        const viewButton = row.querySelector('.view-pdca');
        viewButton.addEventListener('click', function() {
            const pdcaId = this.getAttribute('data-pdca-id');
            loadPDCA(pdcaId);
        });
        
        const editButton = row.querySelector('.edit-pdca');
        if (editButton) {
            editButton.addEventListener('click', function() {
                const pdcaId = this.getAttribute('data-pdca-id');
                loadPDCA(pdcaId, true);
            });
        }
        
        const deleteButton = row.querySelector('.delete-pdca');
        if (deleteButton) {
            deleteButton.addEventListener('click', function() {
                const pdcaId = this.getAttribute('data-pdca-id');
                confirmDeletePDCA(pdcaId);
            });
        }
        
        const shareButton = row.querySelector('.share-pdca');
        if (shareButton) {
            shareButton.addEventListener('click', function() {
                const pdcaId = this.getAttribute('data-pdca-id');
                showShareModal(pdcaId);
            });
        }
    });
}

// Atualizar cards de resumo
function updateSummaryCards(pdcas) {
    // Total de PDCAs
    const totalPDCAs = pdcas.length;
    const totalCard = document.querySelector('.summary-card:nth-child(1) .summary-value');
    if (totalCard) {
        totalCard.textContent = totalPDCAs;
    }
    
    // PDCAs em andamento
    const inProgressPDCAs = pdcas.filter(pdca => pdca.status !== 'completed').length;
    const inProgressCard = document.querySelector('.summary-card:nth-child(2) .summary-value');
    if (inProgressCard) {
        inProgressCard.textContent = inProgressPDCAs;
    }
    
    // PDCAs concluídos
    const completedPDCAs = pdcas.filter(pdca => pdca.status === 'completed').length;
    const completedCard = document.querySelector('.summary-card:nth-child(3) .summary-value');
    if (completedCard) {
        completedCard.textContent = completedPDCAs;
    }
    
    // Usuários ativos
    const activeUsers = new Set(pdcas.map(pdca => pdca.createdBy)).size;
    const usersCard = document.querySelector('.summary-card:nth-child(4) .summary-value');
    if (usersCard) {
        usersCard.textContent = activeUsers;
    }
}

// Atualizar gráficos do dashboard
function updateDashboardCharts(pdcas) {
    // Gráfico de status
    const statusCounts = {
        'planning': 0,
        'in-progress': 0,
        'verification': 0,
        'action': 0,
        'completed': 0
    };
    
    pdcas.forEach(pdca => {
        if (statusCounts[pdca.status] !== undefined) {
            statusCounts[pdca.status]++;
        }
    });
    
    const statusChart = Chart.getChart('status-chart');
    if (statusChart) {
        statusChart.data.datasets[0].data = [
            statusCounts.planning,
            statusCounts['in-progress'],
            statusCounts.verification,
            statusCounts.action,
            statusCounts.completed
        ];
        statusChart.update();
    }
    
    // Gráfico por usuário
    const userCounts = {};
    pdcas.forEach(pdca => {
        if (!userCounts[pdca.createdBy]) {
            userCounts[pdca.createdBy] = 0;
        }
        userCounts[pdca.createdBy]++;
    });
    
    const userLabels = [];
    const userData = [];
    
    Object.keys(userCounts).forEach(userId => {
        const user = window.usersDatabase.find(u => u.id === userId);
        if (user) {
            userLabels.push(user.name);
            userData.push(userCounts[userId]);
        }
    });
    
    const userChart = Chart.getChart('user-chart');
    if (userChart) {
        userChart.data.labels = userLabels;
        userChart.data.datasets[0].data = userData;
        userChart.update();
    }
}

// Carregar PDCA específico
function loadPDCA(pdcaId, editMode = false) {
    const pdca = window.pdcaDatabase.find(p => p.id === pdcaId);
    if (!pdca) return;
    
    // Definir PDCA atual
    window.currentPDCA = pdca;
    
    // Preencher formulários com dados do PDCA
    fillPDCAForms(pdca);
    
    // Navegar para a página Plan
    navigateToPage('plan');
    
    // Configurar modo de edição ou visualização
    setupEditMode(editMode);
}

// Preencher formulários com dados do PDCA
function fillPDCAForms(pdca) {
    // Plan
    if (pdca.plan) {
        document.getElementById('problem-description').value = pdca.plan.problem || '';
        document.getElementById('problem-importance').value = pdca.plan.importance || '';
        document.getElementById('problem-context').value = pdca.plan.context || '';
        document.getElementById('current-indicators').value = pdca.plan.indicators || '';
        document.getElementById('specific-objectives').value = pdca.plan.objectives || '';
        document.getElementById('potential-causes').value = pdca.plan.causes || '';
        document.getElementById('root-causes').value = pdca.plan.rootCauses || '';
    }
    
    // Do
    if (pdca.do) {
        document.getElementById('countermeasures').value = pdca.do.countermeasures || '';
        
        // Limpar tabela de ações
        const actionPlanItems = document.getElementById('action-plan-items');
        if (actionPlanItems) {
            actionPlanItems.innerHTML = '';
            
            // Adicionar ações
            if (pdca.do.actions && pdca.do.actions.length > 0) {
                pdca.do.actions.forEach(action => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><input type="text" value="${action.what || ''}" placeholder="Ação"></td>
                        <td><input type="text" value="${action.why || ''}" placeholder="Motivo"></td>
                        <td><input type="text" value="${action.where || ''}" placeholder="Local"></td>
                        <td><input type="date" value="${action.when || ''}"></td>
                        <td><input type="text" value="${action.who || ''}" placeholder="Responsável"></td>
                        <td><input type="text" value="${action.how || ''}" placeholder="Método"></td>
                        <td><input type="text" value="${action.howMuch || ''}" placeholder="Custo"></td>
                        <td>
                            <select>
                                <option value="pending" ${action.status === 'pending' ? 'selected' : ''}>Pendente</option>
                                <option value="in-progress" ${action.status === 'in-progress' ? 'selected' : ''}>Em andamento</option>
                                <option value="completed" ${action.status === 'completed' ? 'selected' : ''}>Concluído</option>
                            </select>
                        </td>
                        <td>
                            <button class="btn-icon delete-row"><i class="fas fa-trash"></i></button>
                        </td>
                    `;
                    
                    actionPlanItems.appendChild(row);
                    
                    // Adicionar evento ao botão de exclusão
                    const deleteButton = row.querySelector('.delete-row');
                    deleteButton.addEventListener('click', function() {
                        row.remove();
                    });
                });
            }
        }
    }
    
    // Check
    if (pdca.check) {
        document.getElementById('implemented-countermeasures').value = pdca.check.results || '';
        document.getElementById('indicator-evolution').value = pdca.check.evolution || '';
        document.getElementById('objective-achievement').value = pdca.check.achievement || '';
    }
    
    // Act
    if (pdca.act) {
        document.getElementById('additional-measures').value = pdca.act.additionalMeasures || '';
        document.getElementById('standardization').value = pdca.act.standardization || '';
        document.getElementById('next-a3').value = pdca.act.nextCycle || '';
        
        // Selecionar decisão
        const decisionRadios = document.querySelectorAll('input[name="cycle-decision"]');
        decisionRadios.forEach(radio => {
            if (radio.value === pdca.act.decision) {
                radio.checked = true;
            }
        });
    }
}

// Configurar modo de edição ou visualização
function setupEditMode(editMode) {
    const formInputs = document.querySelectorAll('.pdca-form input, .pdca-form textarea, .pdca-form select, .pdca-form button');
    
    formInputs.forEach(input => {
        if (input.classList.contains('next-step') || input.classList.contains('prev-step')) {
            // Manter botões de navegação habilitados
            input.disabled = false;
        } else {
            input.disabled = !editMode;
        }
    });
    
    // Mostrar mensagem de modo de visualização se necessário
    const viewModeMessage = document.querySelector('.view-mode-message');
    if (!viewModeMessage && !editMode) {
        const formSections = document.querySelectorAll('.form-section');
        formSections.forEach(section => {
            const message = document.createElement('div');
            message.className = 'view-mode-message';
            message.innerHTML = `
                <p>Você está no modo de visualização. Este PDCA foi criado por ${getPDCACreatorName(window.currentPDCA)}.</p>
                ${window.currentPDCA.createdBy === window.currentUser.id ? `
                    <button class="btn-primary enable-edit-mode">Habilitar edição</button>
                ` : ''}
            `;
            
            section.insertBefore(message, section.firstChild);
            
            // Adicionar evento ao botão de edição
            const editButton = message.querySelector('.enable-edit-mode');
            if (editButton) {
                editButton.addEventListener('click', function() {
                    setupEditMode(true);
                });
            }
        });
    } else if (viewModeMessage && editMode) {
        // Remover mensagens de modo de visualização
        const messages = document.querySelectorAll('.view-mode-message');
        messages.forEach(msg => msg.remove());
    }
}

// Obter nome do criador do PDCA
function getPDCACreatorName(pdca) {
    if (!pdca || !pdca.createdBy) return 'Usuário desconhecido';
    
    const creator = window.usersDatabase.find(user => user.id === pdca.createdBy);
    return creator ? creator.name : 'Usuário desconhecido';
}

// Confirmar exclusão de PDCA
function confirmDeletePDCA(pdcaId) {
    showConfirmationModal('Tem certeza que deseja excluir este PDCA? Esta ação não pode ser desfeita.', function() {
        deletePDCA(pdcaId);
    });
}

// Excluir PDCA
function deletePDCA(pdcaId) {
    // Remover do banco de dados
    window.pdcaDatabase = window.pdcaDatabase.filter(pdca => pdca.id !== pdcaId);
    
    // Atualizar interface
    updateRecentPDCAs();
    updateDashboard();
    
    // Mostrar mensagem de sucesso
    showSuccessModal('PDCA excluído com sucesso!');
}

// Implementar sistema de compartilhamento
function implementSharingSystem() {
    // Criar modal de compartilhamento
    const shareModal = document.createElement('div');
    shareModal.className = 'modal';
    shareModal.id = 'share-modal';
    shareModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Compartilhar PDCA</h3>
                <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Compartilhar com:</label>
                    <div class="user-list">
                        ${window.usersDatabase.map(user => `
                            <div class="user-item">
                                <input type="checkbox" id="share-${user.id}" value="${user.id}">
                                <label for="share-${user.id}">
                                    <img src="${user.avatar}" alt="${user.name}" class="user-avatar-small">
                                    <span>${user.name}</span>
                                </label>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="form-group">
                    <label for="pdca-public">Tornar público:</label>
                    <div class="toggle-switch">
                        <input type="checkbox" id="pdca-public">
                        <label for="pdca-public"></label>
                    </div>
                    <p class="help-text">PDCAs públicos são visíveis para todos os usuários na tela principal.</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-cancel">Cancelar</button>
                <button class="btn-primary modal-share">Compartilhar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(shareModal);
    
    // Adicionar estilos CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .user-list {
            max-height: 200px;
            overflow-y: auto;
            border: 1px solid var(--light-medium);
            border-radius: var(--radius-md);
            padding: var(--space-sm);
            margin-bottom: var(--space-md);
        }
        
        .user-item {
            display: flex;
            align-items: center;
            margin-bottom: var(--space-sm);
        }
        
        .user-item:last-child {
            margin-bottom: 0;
        }
        
        .user-item label {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            cursor: pointer;
        }
        
        .user-avatar-small {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
            margin-right: var(--space-md);
        }
        
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .toggle-switch label {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--light-medium);
            transition: var(--transition-normal);
            border-radius: 34px;
        }
        
        .toggle-switch label:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: var(--white);
            transition: var(--transition-normal);
            border-radius: 50%;
        }
        
        .toggle-switch input:checked + label {
            background-color: var(--primary-color);
        }
        
        .toggle-switch input:checked + label:before {
            transform: translateX(26px);
        }
        
        .help-text {
            font-size: var(--font-size-sm);
            color: var(--medium);
            margin-top: var(--space-xs);
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Adicionar eventos
    const closeButtons = shareModal.querySelectorAll('.modal-close, .modal-cancel');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            shareModal.classList.remove('active');
        });
    });
    
    // Fechar modal ao clicar fora
    shareModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
}

// Mostrar modal de compartilhamento
function showShareModal(pdcaId) {
    const pdca = window.pdcaDatabase.find(p => p.id === pdcaId);
    if (!pdca) return;
    
    const shareModal = document.getElementById('share-modal');
    if (!shareModal) return;
    
    // Limpar seleções anteriores
    const checkboxes = shareModal.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.id === 'pdca-public') {
            checkbox.checked = pdca.isPublic;
        } else {
            const userId = checkbox.value;
            checkbox.checked = pdca.sharedWith.includes(userId);
            
            // Desabilitar checkbox do próprio criador
            if (userId === pdca.createdBy) {
                checkbox.checked = true;
                checkbox.disabled = true;
            } else {
                checkbox.disabled = false;
            }
        }
    });
    
    // Adicionar evento ao botão de compartilhamento
    const shareButton = shareModal.querySelector('.modal-share');
    const newShareButton = shareButton.cloneNode(true);
    shareButton.parentNode.replaceChild(newShareButton, shareButton);
    
    newShareButton.addEventListener('click', function() {
        // Obter usuários selecionados
        const selectedUsers = [];
        const userCheckboxes = shareModal.querySelectorAll('.user-item input[type="checkbox"]');
        userCheckboxes.forEach(checkbox => {
            if (checkbox.checked && !checkbox.disabled) {
                selectedUsers.push(checkbox.value);
            }
        });
        
        // Obter configuração de visibilidade pública
        const isPublic = document.getElementById('pdca-public').checked;
        
        // Atualizar PDCA
        pdca.sharedWith = selectedUsers;
        pdca.isPublic = isPublic;
        
        // Atualizar no banco de dados
        const index = window.pdcaDatabase.findIndex(p => p.id === pdcaId);
        if (index !== -1) {
            window.pdcaDatabase[index] = pdca;
        }
        
        // Fechar modal
        shareModal.classList.remove('active');
        
        // Mostrar mensagem de sucesso
        showSuccessModal('PDCA compartilhado com sucesso!');
        
        // Atualizar interface
        updateDashboard();
    });
    
    // Exibir modal
    shareModal.classList.add('active');
}

// Adicionar notificações entre usuários
function setupUserNotifications() {
    // Criar sistema de notificações
    window.notificationsDatabase = [
        {
            id: 'notif1',
            userId: 'user1',
            type: 'share',
            message: 'Maria Oliveira compartilhou um PDCA com você',
            pdcaId: 'pdca2',
            createdAt: new Date(2025, 3, 22),
            read: false
        },
        {
            id: 'notif2',
            userId: 'user2',
            type: 'comment',
            message: 'João Silva comentou no seu PDCA',
            pdcaId: 'pdca2',
            createdAt: new Date(2025, 3, 23),
            read: true
        }
    ];
    
    // Adicionar ícone de notificações
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        const notificationButton = document.createElement('div');
        notificationButton.className = 'notification-button';
        notificationButton.innerHTML = `
            <i class="fas fa-bell"></i>
            <span class="notification-badge">0</span>
        `;
        
        userMenu.insertBefore(notificationButton, userMenu.firstChild);
        
        // Adicionar evento de clique
        notificationButton.addEventListener('click', function() {
            toggleNotificationPanel();
        });
    }
    
    // Criar painel de notificações
    const notificationPanel = document.createElement('div');
    notificationPanel.className = 'notification-panel';
    notificationPanel.innerHTML = `
        <div class="notification-header">
            <h3>Notificações</h3>
            <button class="mark-all-read">Marcar todas como lidas</button>
        </div>
        <div class="notification-list"></div>
    `;
    
    document.body.appendChild(notificationPanel);
    
    // Adicionar evento ao botão de marcar todas como lidas
    const markAllReadButton = notificationPanel.querySelector('.mark-all-read');
    markAllReadButton.addEventListener('click', function() {
        markAllNotificationsAsRead();
    });
    
    // Adicionar estilos CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .notification-button {
            position: relative;
            cursor: pointer;
            font-size: var(--font-size-lg);
            color: var(--medium-dark);
            margin-right: var(--space-md);
        }
        
        .notification-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background-color: var(--accent-color);
            color: var(--white);
            font-size: var(--font-size-xs);
            width: 18px;
            height: 18px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-panel {
            position: absolute;
            top: 60px;
            right: 20px;
            width: 350px;
            background-color: var(--white);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            display: none;
        }
        
        .notification-panel.active {
            display: block;
            animation: fadeIn var(--transition-normal);
        }
        
        .notification-header {
            padding: var(--space-md);
            border-bottom: 1px solid var(--light-medium);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .notification-header h3 {
            margin: 0;
            font-size: var(--font-size-lg);
            color: var(--dark);
        }
        
        .mark-all-read {
            background: none;
            border: none;
            color: var(--primary-color);
            cursor: pointer;
            font-size: var(--font-size-sm);
        }
        
        .notification-list {
            max-height: 300px;
            overflow-y: auto;
        }
        
        .notification-item {
            padding: var(--space-md);
            border-bottom: 1px solid var(--light-medium);
            cursor: pointer;
            transition: background-color var(--transition-fast);
        }
        
        .notification-item:hover {
            background-color: var(--light);
        }
        
        .notification-item.unread {
            background-color: rgba(52, 152, 219, 0.1);
        }
        
        .notification-item.unread:hover {
            background-color: rgba(52, 152, 219, 0.2);
        }
        
        .notification-content {
            margin-bottom: var(--space-xs);
        }
        
        .notification-time {
            font-size: var(--font-size-xs);
            color: var(--medium);
        }
        
        .no-notifications {
            padding: var(--space-md);
            text-align: center;
            color: var(--medium);
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Atualizar notificações
    updateNotifications();
    
    // Adicionar evento de clique fora para fechar o painel
    document.addEventListener('click', function(e) {
        const notificationPanel = document.querySelector('.notification-panel');
        const notificationButton = document.querySelector('.notification-button');
        
        if (notificationPanel && notificationPanel.classList.contains('active')) {
            if (!notificationPanel.contains(e.target) && !notificationButton.contains(e.target)) {
                notificationPanel.classList.remove('active');
            }
        }
    });
}

// Atualizar notificações
function updateNotifications() {
    if (!window.currentUser || !window.notificationsDatabase) return;
    
    // Filtrar notificações do usuário atual
    const userNotifications = window.notificationsDatabase.filter(notif => notif.userId === window.currentUser.id);
    
    // Contar notificações não lidas
    const unreadCount = userNotifications.filter(notif => !notif.read).length;
    
    // Atualizar badge
    const notificationBadge = document.querySelector('.notification-badge');
    if (notificationBadge) {
        notificationBadge.textContent = unreadCount;
        notificationBadge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
    
    // Atualizar lista de notificações
    const notificationList = document.querySelector('.notification-list');
    if (notificationList) {
        notificationList.innerHTML = '';
        
        if (userNotifications.length > 0) {
            // Ordenar por data (mais recentes primeiro)
            const sortedNotifications = [...userNotifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            
            sortedNotifications.forEach(notif => {
                const notificationItem = document.createElement('div');
                notificationItem.className = `notification-item ${notif.read ? '' : 'unread'}`;
                notificationItem.innerHTML = `
                    <div class="notification-content">${notif.message}</div>
                    <div class="notification-time">${formatTimeAgo(notif.createdAt)}</div>
                `;
                
                notificationList.appendChild(notificationItem);
                
                // Adicionar evento de clique
                notificationItem.addEventListener('click', function() {
                    handleNotificationClick(notif);
                });
            });
        } else {
            notificationList.innerHTML = '<div class="no-notifications">Nenhuma notificação</div>';
        }
    }
}

// Alternar painel de notificações
function toggleNotificationPanel() {
    const notificationPanel = document.querySelector('.notification-panel');
    if (notificationPanel) {
        notificationPanel.classList.toggle('active');
    }
}

// Lidar com clique em notificação
function handleNotificationClick(notification) {
    // Marcar como lida
    notification.read = true;
    
    // Atualizar no banco de dados
    const index = window.notificationsDatabase.findIndex(n => n.id === notification.id);
    if (index !== -1) {
        window.notificationsDatabase[index] = notification;
    }
    
    // Atualizar interface
    updateNotifications();
    
    // Navegar para o PDCA relacionado, se houver
    if (notification.pdcaId) {
        loadPDCA(notification.pdcaId);
        
        // Fechar painel de notificações
        const notificationPanel = document.querySelector('.notification-panel');
        if (notificationPanel) {
            notificationPanel.classList.remove('active');
        }
    }
}

// Marcar todas as notificações como lidas
function markAllNotificationsAsRead() {
    if (!window.currentUser || !window.notificationsDatabase) return;
    
    // Atualizar notificações do usuário atual
    window.notificationsDatabase.forEach(notif => {
        if (notif.userId === window.currentUser.id) {
            notif.read = true;
        }
    });
    
    // Atualizar interface
    updateNotifications();
}

// Adicionar notificação
function addNotification(userId, type, message, pdcaId) {
    if (!window.notificationsDatabase) return;
    
    // Criar nova notificação
    const newNotification = {
        id: 'notif_' + Date.now(),
        userId: userId,
        type: type,
        message: message,
        pdcaId: pdcaId,
        createdAt: new Date(),
        read: false
    };
    
    // Adicionar ao banco de dados
    window.notificationsDatabase.push(newNotification);
    
    // Atualizar interface se o usuário atual for o destinatário
    if (window.currentUser && window.currentUser.id === userId) {
        updateNotifications();
    }
}

// Formatar data
function formatDate(date) {
    if (!date) return '';
    
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    return `${day}/${month}/${year}`;
}

// Formatar tempo relativo
function formatTimeAgo(date) {
    if (!date) return '';
    
    const now = new Date();
    const diff = now - new Date(date);
    
    // Converter para segundos
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) {
        return 'agora mesmo';
    }
    
    // Converter para minutos
    const minutes = Math.floor(seconds / 60);
    
    if (minutes < 60) {
        return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} atrás`;
    }
    
    // Converter para horas
    const hours = Math.floor(minutes / 60);
    
    if (hours < 24) {
        return `${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`;
    }
    
    // Converter para dias
    const days = Math.floor(hours / 24);
    
    if (days < 30) {
        return `${days} ${days === 1 ? 'dia' : 'dias'} atrás`;
    }
    
    // Converter para meses
    const months = Math.floor(days / 30);
    
    if (months < 12) {
        return `${months} ${months === 1 ? 'mês' : 'meses'} atrás`;
    }
    
    // Converter para anos
    const years = Math.floor(months / 12);
    
    return `${years} ${years === 1 ? 'ano' : 'anos'} atrás`;
}

// Obter rótulo de status
function getStatusLabel(status) {
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
}

// Implementar sistema de compartilhamento
function implementSharingSystem() {
    // Criar modal de compartilhamento
    const shareModal = document.createElement('div');
    shareModal.className = 'modal';
    shareModal.id = 'share-modal';
    shareModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Compartilhar PDCA</h3>
                <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Compartilhar com:</label>
                    <div class="user-list">
                        ${window.usersDatabase.map(user => `
                            <div class="user-item">
                                <input type="checkbox" id="share-${user.id}" value="${user.id}">
                                <label for="share-${user.id}">
                                    <img src="${user.avatar}" alt="${user.name}" class="user-avatar-small">
                                    <span>${user.name}</span>
                                </label>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="form-group">
                    <label for="pdca-public">Tornar público:</label>
                    <div class="toggle-switch">
                        <input type="checkbox" id="pdca-public">
                        <label for="pdca-public"></label>
                    </div>
                    <p class="help-text">PDCAs públicos são visíveis para todos os usuários na tela principal.</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-cancel">Cancelar</button>
                <button class="btn-primary modal-share">Compartilhar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(shareModal);
    
    // Adicionar eventos
    const closeButtons = shareModal.querySelectorAll('.modal-close, .modal-cancel');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            shareModal.classList.remove('active');
        });
    });
    
    // Fechar modal ao clicar fora
    shareModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
}
