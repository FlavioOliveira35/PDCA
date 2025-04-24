// Implementação da tela principal pública para visualização de todos os PDCAs
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tela principal pública
    initPublicDashboard();
    
    // Configurar filtros e pesquisa
    setupFiltersAndSearch();
    
    // Implementar visualização em diferentes modos
    implementViewModes();
    
    // Adicionar estatísticas e métricas
    addStatisticsAndMetrics();
});

// Inicializar tela principal pública
function initPublicDashboard() {
    // Criar seção de PDCAs públicos na página inicial
    const homeSection = document.getElementById('home');
    if (homeSection) {
        // Verificar se já existe uma seção de PDCAs públicos
        let publicPDCASection = homeSection.querySelector('.public-pdca-section');
        
        if (!publicPDCASection) {
            // Criar nova seção
            publicPDCASection = document.createElement('div');
            publicPDCASection.className = 'public-pdca-section';
            publicPDCASection.innerHTML = `
                <h3>PDCAs Públicos</h3>
                <div class="public-pdca-filters">
                    <div class="filter-group">
                        <label for="public-filter-status">Status:</label>
                        <select id="public-filter-status">
                            <option value="all">Todos</option>
                            <option value="planning">Planejamento</option>
                            <option value="in-progress">Em andamento</option>
                            <option value="verification">Verificação</option>
                            <option value="action">Ação</option>
                            <option value="completed">Concluído</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="public-filter-user">Usuário:</label>
                        <select id="public-filter-user">
                            <option value="all">Todos</option>
                            ${window.usersDatabase ? window.usersDatabase.map(user => `
                                <option value="${user.id}">${user.name}</option>
                            `).join('') : ''}
                        </select>
                    </div>
                    <div class="search-group">
                        <input type="text" id="public-search" placeholder="Pesquisar PDCAs...">
                        <button id="public-search-btn"><i class="fas fa-search"></i></button>
                    </div>
                    <div class="view-mode-toggle">
                        <button class="view-mode-btn active" data-mode="grid"><i class="fas fa-th"></i></button>
                        <button class="view-mode-btn" data-mode="list"><i class="fas fa-list"></i></button>
                    </div>
                </div>
                <div class="public-pdca-container grid-view">
                    <!-- PDCAs públicos serão carregados aqui -->
                    <div class="loading-indicator">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Carregando PDCAs públicos...</p>
                    </div>
                </div>
                <div class="public-pdca-pagination">
                    <button class="pagination-prev" disabled><i class="fas fa-chevron-left"></i> Anterior</button>
                    <div class="pagination-info">Página <span class="current-page">1</span> de <span class="total-pages">1</span></div>
                    <button class="pagination-next" disabled>Próximo <i class="fas fa-chevron-right"></i></button>
                </div>
            `;
            
            // Inserir antes do footer
            const footer = document.querySelector('.footer');
            homeSection.insertBefore(publicPDCASection, footer);
            
            // Adicionar estilos CSS
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                .public-pdca-section {
                    margin-top: var(--space-xxl);
                    margin-bottom: var(--space-xxl);
                }
                
                .public-pdca-section h3 {
                    font-size: var(--font-size-xl);
                    margin-bottom: var(--space-xl);
                    color: var(--dark);
                    display: flex;
                    align-items: center;
                    gap: var(--space-sm);
                }
                
                .public-pdca-section h3::before {
                    content: '';
                    display: block;
                    width: 4px;
                    height: 24px;
                    background-color: var(--primary-color);
                    border-radius: var(--radius-sm);
                }
                
                .public-pdca-filters {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--space-md);
                    margin-bottom: var(--space-lg);
                    background-color: var(--white);
                    padding: var(--space-md);
                    border-radius: var(--radius-md);
                    box-shadow: var(--shadow-sm);
                }
                
                .filter-group {
                    display: flex;
                    align-items: center;
                    gap: var(--space-sm);
                }
                
                .filter-group label {
                    font-weight: 500;
                    color: var(--medium-dark);
                }
                
                .filter-group select {
                    padding: var(--space-sm) var(--space-md);
                    border: 1px solid var(--light-medium);
                    border-radius: var(--radius-md);
                    min-width: 150px;
                }
                
                .search-group {
                    display: flex;
                    flex: 1;
                    min-width: 200px;
                }
                
                .search-group input {
                    flex: 1;
                    padding: var(--space-sm) var(--space-md);
                    border: 1px solid var(--light-medium);
                    border-radius: var(--radius-md) 0 0 var(--radius-md);
                    font-family: 'Poppins', sans-serif;
                }
                
                .search-group button {
                    background-color: var(--primary-color);
                    color: var(--white);
                    border: none;
                    padding: var(--space-sm) var(--space-md);
                    border-radius: 0 var(--radius-md) var(--radius-md) 0;
                    cursor: pointer;
                    transition: background-color var(--transition-fast);
                }
                
                .search-group button:hover {
                    background-color: var(--primary-dark);
                }
                
                .view-mode-toggle {
                    display: flex;
                    gap: var(--space-xs);
                }
                
                .view-mode-btn {
                    background-color: var(--light);
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: var(--radius-md);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                }
                
                .view-mode-btn:hover {
                    background-color: var(--light-medium);
                }
                
                .view-mode-btn.active {
                    background-color: var(--primary-color);
                    color: var(--white);
                }
                
                .public-pdca-container {
                    margin-top: var(--space-lg);
                    min-height: 300px;
                    position: relative;
                }
                
                .public-pdca-container.grid-view {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: var(--space-lg);
                }
                
                .public-pdca-container.list-view {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-md);
                }
                
                .loading-indicator {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: var(--space-md);
                    color: var(--medium);
                }
                
                .loading-indicator i {
                    font-size: var(--font-size-xxl);
                    color: var(--primary-color);
                }
                
                .public-pdca-card {
                    background-color: var(--white);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    box-shadow: var(--shadow-md);
                    transition: transform var(--transition-normal), box-shadow var(--transition-normal);
                }
                
                .public-pdca-card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-lg);
                }
                
                .public-pdca-card-header {
                    padding: var(--space-md);
                    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
                    color: var(--white);
                    position: relative;
                }
                
                .public-pdca-card-header h4 {
                    margin: 0;
                    font-size: var(--font-size-lg);
                    margin-bottom: var(--space-xs);
                }
                
                .public-pdca-card-header p {
                    margin: 0;
                    font-size: var(--font-size-sm);
                    opacity: 0.8;
                }
                
                .public-pdca-card-status {
                    position: absolute;
                    top: var(--space-md);
                    right: var(--space-md);
                    padding: var(--space-xs) var(--space-sm);
                    border-radius: var(--radius-sm);
                    font-size: var(--font-size-xs);
                    font-weight: 500;
                    background-color: rgba(255, 255, 255, 0.2);
                }
                
                .public-pdca-card-body {
                    padding: var(--space-md);
                }
                
                .public-pdca-card-body p {
                    margin: 0;
                    margin-bottom: var(--space-md);
                    color: var(--medium-dark);
                }
                
                .public-pdca-card-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--space-md);
                    font-size: var(--font-size-sm);
                    color: var(--medium);
                }
                
                .public-pdca-card-creator {
                    display: flex;
                    align-items: center;
                    gap: var(--space-sm);
                }
                
                .public-pdca-card-creator img {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                
                .public-pdca-progress {
                    height: 8px;
                    background-color: var(--light-medium);
                    border-radius: var(--radius-sm);
                    margin-bottom: var(--space-md);
                    overflow: hidden;
                }
                
                .public-pdca-progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%);
                    border-radius: var(--radius-sm);
                }
                
                .public-pdca-card-footer {
                    padding: var(--space-md);
                    border-top: 1px solid var(--light-medium);
                    display: flex;
                    justify-content: space-between;
                }
                
                .public-pdca-card-footer button {
                    flex: 1;
                }
                
                .public-pdca-list-item {
                    background-color: var(--white);
                    border-radius: var(--radius-md);
                    padding: var(--space-md);
                    box-shadow: var(--shadow-sm);
                    display: flex;
                    gap: var(--space-md);
                    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
                }
                
                .public-pdca-list-item:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-md);
                }
                
                .public-pdca-list-status {
                    width: 8px;
                    border-radius: var(--radius-sm);
                }
                
                .public-pdca-list-status.planning {
                    background-color: var(--plan-color);
                }
                
                .public-pdca-list-status.in-progress {
                    background-color: var(--do-color);
                }
                
                .public-pdca-list-status.verification {
                    background-color: var(--check-color);
                }
                
                .public-pdca-list-status.action {
                    background-color: var(--act-color);
                }
                
                .public-pdca-list-status.completed {
                    background-color: var(--secondary-color);
                }
                
                .public-pdca-list-content {
                    flex: 1;
                }
                
                .public-pdca-list-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: var(--space-sm);
                }
                
                .public-pdca-list-title {
                    font-weight: 600;
                    color: var(--dark);
                    font-size: var(--font-size-lg);
                }
                
                .public-pdca-list-badge {
                    padding: var(--space-xs) var(--space-sm);
                    border-radius: var(--radius-sm);
                    font-size: var(--font-size-xs);
                    font-weight: 500;
                }
                
                .public-pdca-list-badge.planning {
                    background-color: rgba(52, 152, 219, 0.2);
                    color: var(--plan-color);
                }
                
                .public-pdca-list-badge.in-progress {
                    background-color: rgba(46, 204, 113, 0.2);
                    color: var(--do-color);
                }
                
                .public-pdca-list-badge.verification {
                    background-color: rgba(243, 156, 18, 0.2);
                    color: var(--check-color);
                }
                
                .public-pdca-list-badge.action {
                    background-color: rgba(231, 76, 60, 0.2);
                    color: var(--act-color);
                }
                
                .public-pdca-list-badge.completed {
                    background-color: rgba(46, 204, 113, 0.2);
                    color: var(--secondary-dark);
                }
                
                .public-pdca-list-description {
                    color: var(--medium);
                    margin-bottom: var(--space-md);
                }
                
                .public-pdca-list-meta {
                    display: flex;
                    justify-content: space-between;
                    font-size: var(--font-size-sm);
                    color: var(--medium);
                }
                
                .public-pdca-list-creator {
                    display: flex;
                    align-items: center;
                    gap: var(--space-sm);
                }
                
                .public-pdca-list-creator img {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                
                .public-pdca-list-progress {
                    width: 100px;
                    height: 8px;
                    background-color: var(--light-medium);
                    border-radius: var(--radius-sm);
                    overflow: hidden;
                }
                
                .public-pdca-list-progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%);
                    border-radius: var(--radius-sm);
                }
                
                .public-pdca-list-actions {
                    display: flex;
                    gap: var(--space-sm);
                }
                
                .public-pdca-pagination {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: var(--space-md);
                    margin-top: var(--space-xl);
                }
                
                .pagination-prev,
                .pagination-next {
                    background-color: var(--light);
                    border: none;
                    padding: var(--space-sm) var(--space-md);
                    border-radius: var(--radius-md);
                    font-weight: 500;
                    color: var(--medium-dark);
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    display: flex;
                    align-items: center;
                    gap: var(--space-sm);
                }
                
                .pagination-prev:hover,
                .pagination-next:hover {
                    background-color: var(--light-medium);
                }
                
                .pagination-prev:disabled,
                .pagination-next:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .pagination-info {
                    font-size: var(--font-size-sm);
                    color: var(--medium);
                }
                
                .no-results {
                    text-align: center;
                    padding: var(--space-xl);
                    color: var(--medium);
                }
                
                .no-results i {
                    font-size: var(--font-size-xxl);
                    margin-bottom: var(--space-md);
                    color: var(--light-medium);
                }
                
                @media (max-width: 768px) {
                    .public-pdca-filters {
                        flex-direction: column;
                        gap: var(--space-sm);
                    }
                    
                    .filter-group,
                    .search-group {
                        width: 100%;
                    }
                    
                    .public-pdca-container.grid-view {
                        grid-template-columns: 1fr;
                    }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }
    
    // Carregar PDCAs públicos
    loadPublicPDCAs();
}

// Carregar PDCAs públicos
function loadPublicPDCAs() {
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
    
    // Atualizar paginação
    updatePagination(sortedPDCAs.length);
}

// Obter resumo do PDCA
function getPDCASummary(pdca) {
    let summary = '';
    
    if (pdca.plan && pdca.plan.problem) {
        summary += `Problema: ${truncateText(pdca.plan.problem, 100)}`;
    }
    
    if (pdca.status === 'completed' && pdca.check && pdca.check.results) {
        summary += summary ? ' | ' : '';
        summary += `Resultados: ${truncateText(pdca.check.results, 100)}`;
    }
    
    return summary || 'Sem detalhes disponíveis';
}

// Truncar texto
function truncateText(text, maxLength) {
    if (!text) return '';
    
    if (text.length <= maxLength) {
        return text;
    }
    
    return text.substring(0, maxLength) + '...';
}

// Atualizar paginação
function updatePagination(totalItems) {
    const paginationInfo = document.querySelector('.pagination-info');
    const totalPagesSpan = document.querySelector('.total-pages');
    const prevButton = document.querySelector('.pagination-prev');
    const nextButton = document.querySelector('.pagination-next');
    
    if (paginationInfo && totalPagesSpan && prevButton && nextButton) {
        // Simular paginação (para demonstração)
        const itemsPerPage = 6;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        totalPagesSpan.textContent = totalPages;
        
        // Desabilitar botões de paginação para demonstração
        prevButton.disabled = true;
        nextButton.disabled = totalPages <= 1;
    }
}

// Configurar filtros e pesquisa
function setupFiltersAndSearch() {
    // Obter elementos
    const statusFilter = document.getElementById('public-filter-status');
    const userFilter = document.getElementById('public-filter-user');
    const searchInput = document.getElementById('public-search');
    const searchButton = document.getElementById('public-search-btn');
    
    if (statusFilter && userFilter && searchInput && searchButton) {
        // Adicionar eventos
        statusFilter.addEventListener('change', applyFilters);
        userFilter.addEventListener('change', applyFilters);
        searchButton.addEventListener('click', applyFilters);
        
        // Adicionar evento de tecla Enter no campo de pesquisa
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    }
}

// Aplicar filtros
function applyFilters() {
    // Obter valores dos filtros
    const statusFilter = document.getElementById('public-filter-status');
    const userFilter = document.getElementById('public-filter-user');
    const searchInput = document.getElementById('public-search');
    
    if (!statusFilter || !userFilter || !searchInput || !window.pdcaDatabase) return;
    
    const statusValue = statusFilter.value;
    const userValue = userFilter.value;
    const searchValue = searchInput.value.trim().toLowerCase();
    
    // Filtrar PDCAs
    let filteredPDCAs = window.pdcaDatabase.filter(pdca => pdca.isPublic);
    
    // Aplicar filtro de status
    if (statusValue !== 'all') {
        filteredPDCAs = filteredPDCAs.filter(pdca => pdca.status === statusValue);
    }
    
    // Aplicar filtro de usuário
    if (userValue !== 'all') {
        filteredPDCAs = filteredPDCAs.filter(pdca => pdca.createdBy === userValue);
    }
    
    // Aplicar pesquisa
    if (searchValue) {
        filteredPDCAs = filteredPDCAs.filter(pdca => 
            pdca.title.toLowerCase().includes(searchValue) || 
            pdca.description.toLowerCase().includes(searchValue) ||
            (pdca.plan && pdca.plan.problem && pdca.plan.problem.toLowerCase().includes(searchValue))
        );
    }
    
    // Obter container
    const container = document.querySelector('.public-pdca-container');
    if (!container) return;
    
    // Verificar se há PDCAs filtrados
    if (filteredPDCAs.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>Nenhum PDCA encontrado com os filtros selecionados.</p>
            </div>
        `;
        
        // Atualizar paginação
        updatePagination(0);
        return;
    }
    
    // Ordenar por data de atualização (mais recentes primeiro)
    const sortedPDCAs = [...filteredPDCAs].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    // Verificar modo de visualização atual
    const isGridView = container.classList.contains('grid-view');
    
    // Limpar container
    container.innerHTML = '';
    
    // Adicionar PDCAs filtrados
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
    
    // Atualizar paginação
    updatePagination(sortedPDCAs.length);
}

// Implementar visualização em diferentes modos
function implementViewModes() {
    // Obter botões de modo de visualização
    const viewModeButtons = document.querySelectorAll('.view-mode-btn');
    
    if (viewModeButtons.length > 0) {
        viewModeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover classe ativa de todos os botões
                viewModeButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adicionar classe ativa ao botão clicado
                this.classList.add('active');
                
                // Obter modo de visualização
                const viewMode = this.getAttribute('data-mode');
                
                // Obter container
                const container = document.querySelector('.public-pdca-container');
                if (!container) return;
                
                // Atualizar classe do container
                container.className = 'public-pdca-container';
                container.classList.add(`${viewMode}-view`);
                
                // Recarregar PDCAs com o novo modo de visualização
                loadPublicPDCAs();
            });
        });
    }
}

// Adicionar estatísticas e métricas
function addStatisticsAndMetrics() {
    // Criar seção de estatísticas
    const homeSection = document.getElementById('home');
    if (homeSection) {
        // Verificar se já existe uma seção de estatísticas
        let statsSection = homeSection.querySelector('.pdca-stats-section');
        
        if (!statsSection) {
            // Criar nova seção
            statsSection = document.createElement('div');
            statsSection.className = 'pdca-stats-section';
            statsSection.innerHTML = `
                <h3>Estatísticas do PDCA</h3>
                <div class="pdca-stats-container">
                    <div class="pdca-stats-card">
                        <div class="stats-icon">
                            <i class="fas fa-tasks"></i>
                        </div>
                        <div class="stats-content">
                            <h4>Total de PDCAs</h4>
                            <div class="stats-value" id="stats-total">0</div>
                        </div>
                    </div>
                    <div class="pdca-stats-card">
                        <div class="stats-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stats-content">
                            <h4>PDCAs Concluídos</h4>
                            <div class="stats-value" id="stats-completed">0</div>
                        </div>
                    </div>
                    <div class="pdca-stats-card">
                        <div class="stats-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stats-content">
                            <h4>Usuários Ativos</h4>
                            <div class="stats-value" id="stats-users">0</div>
                        </div>
                    </div>
                    <div class="pdca-stats-card">
                        <div class="stats-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="stats-content">
                            <h4>Taxa de Conclusão</h4>
                            <div class="stats-value" id="stats-completion-rate">0%</div>
                        </div>
                    </div>
                </div>
                <div class="pdca-stats-charts">
                    <div class="stats-chart-container">
                        <h4>PDCAs por Status</h4>
                        <canvas id="stats-status-chart"></canvas>
                    </div>
                    <div class="stats-chart-container">
                        <h4>PDCAs por Mês</h4>
                        <canvas id="stats-monthly-chart"></canvas>
                    </div>
                </div>
            `;
            
            // Inserir após a seção de recursos
            const featuresSection = homeSection.querySelector('.features');
            if (featuresSection) {
                homeSection.insertBefore(statsSection, featuresSection.nextSibling);
            } else {
                // Inserir no início da página
                homeSection.insertBefore(statsSection, homeSection.firstChild.nextSibling);
            }
            
            // Adicionar estilos CSS
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                .pdca-stats-section {
                    margin: var(--space-xxl) 0;
                }
                
                .pdca-stats-section h3 {
                    font-size: var(--font-size-xl);
                    margin-bottom: var(--space-xl);
                    color: var(--dark);
                    display: flex;
                    align-items: center;
                    gap: var(--space-sm);
                }
                
                .pdca-stats-section h3::before {
                    content: '';
                    display: block;
                    width: 4px;
                    height: 24px;
                    background-color: var(--primary-color);
                    border-radius: var(--radius-sm);
                }
                
                .pdca-stats-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: var(--space-lg);
                    margin-bottom: var(--space-xl);
                }
                
                .pdca-stats-card {
                    background-color: var(--white);
                    border-radius: var(--radius-lg);
                    padding: var(--space-lg);
                    box-shadow: var(--shadow-md);
                    display: flex;
                    align-items: center;
                    gap: var(--space-lg);
                }
                
                .stats-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: var(--font-size-xl);
                    color: var(--white);
                }
                
                .stats-content {
                    flex: 1;
                }
                
                .stats-content h4 {
                    font-size: var(--font-size-md);
                    color: var(--medium);
                    margin-bottom: var(--space-xs);
                }
                
                .stats-value {
                    font-size: var(--font-size-xxl);
                    font-weight: 700;
                    color: var(--dark);
                }
                
                .pdca-stats-charts {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: var(--space-xl);
                    margin-top: var(--space-xl);
                }
                
                .stats-chart-container {
                    background-color: var(--white);
                    border-radius: var(--radius-lg);
                    padding: var(--space-lg);
                    box-shadow: var(--shadow-md);
                }
                
                .stats-chart-container h4 {
                    font-size: var(--font-size-lg);
                    color: var(--dark);
                    margin-bottom: var(--space-lg);
                    text-align: center;
                }
                
                @media (max-width: 768px) {
                    .pdca-stats-charts {
                        grid-template-columns: 1fr;
                    }
                }
            `;
            document.head.appendChild(styleSheet);
            
            // Inicializar gráficos
            initStatsCharts();
        }
        
        // Atualizar estatísticas
        updateStatistics();
    }
}

// Inicializar gráficos de estatísticas
function initStatsCharts() {
    // Gráfico de status
    const statusChartCtx = document.getElementById('stats-status-chart');
    if (statusChartCtx) {
        window.statsStatusChart = new Chart(statusChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['Planejamento', 'Em andamento', 'Verificação', 'Ação', 'Concluídos'],
                datasets: [{
                    data: [0, 0, 0, 0, 0],
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
    
    // Gráfico mensal
    const monthlyChartCtx = document.getElementById('stats-monthly-chart');
    if (monthlyChartCtx) {
        window.statsMonthlyChart = new Chart(monthlyChartCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [{
                    label: 'PDCAs Criados',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: '#3498db'
                }, {
                    label: 'PDCAs Concluídos',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: '#2ecc71'
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
}

// Atualizar estatísticas
function updateStatistics() {
    if (!window.pdcaDatabase) return;
    
    // Calcular estatísticas
    const totalPDCAs = window.pdcaDatabase.length;
    const completedPDCAs = window.pdcaDatabase.filter(pdca => pdca.status === 'completed').length;
    const activeUsers = new Set(window.pdcaDatabase.map(pdca => pdca.createdBy)).size;
    const completionRate = totalPDCAs > 0 ? Math.round((completedPDCAs / totalPDCAs) * 100) : 0;
    
    // Atualizar valores
    const totalStats = document.getElementById('stats-total');
    const completedStats = document.getElementById('stats-completed');
    const usersStats = document.getElementById('stats-users');
    const completionRateStats = document.getElementById('stats-completion-rate');
    
    if (totalStats) totalStats.textContent = totalPDCAs;
    if (completedStats) completedStats.textContent = completedPDCAs;
    if (usersStats) usersStats.textContent = activeUsers;
    if (completionRateStats) completionRateStats.textContent = `${completionRate}%`;
    
    // Atualizar gráfico de status
    const statusCounts = {
        'planning': 0,
        'in-progress': 0,
        'verification': 0,
        'action': 0,
        'completed': 0
    };
    
    window.pdcaDatabase.forEach(pdca => {
        if (statusCounts[pdca.status] !== undefined) {
            statusCounts[pdca.status]++;
        }
    });
    
    if (window.statsStatusChart) {
        window.statsStatusChart.data.datasets[0].data = [
            statusCounts.planning,
            statusCounts['in-progress'],
            statusCounts.verification,
            statusCounts.action,
            statusCounts.completed
        ];
        window.statsStatusChart.update();
    }
    
    // Atualizar gráfico mensal
    const monthlyCounts = {
        created: Array(12).fill(0),
        completed: Array(12).fill(0)
    };
    
    window.pdcaDatabase.forEach(pdca => {
        const createdDate = new Date(pdca.createdAt);
        const createdMonth = createdDate.getMonth();
        monthlyCounts.created[createdMonth]++;
        
        if (pdca.status === 'completed') {
            const completedDate = new Date(pdca.updatedAt);
            const completedMonth = completedDate.getMonth();
            monthlyCounts.completed[completedMonth]++;
        }
    });
    
    if (window.statsMonthlyChart) {
        window.statsMonthlyChart.data.datasets[0].data = monthlyCounts.created;
        window.statsMonthlyChart.data.datasets[1].data = monthlyCounts.completed;
        window.statsMonthlyChart.update();
    }
}
