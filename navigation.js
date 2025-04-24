// Aprimoramento da navegação entre páginas PDCA
document.addEventListener('DOMContentLoaded', function() {
    // Melhorar a transição entre páginas
    enhancePageTransitions();
    
    // Adicionar indicadores de progresso
    addProgressIndicators();
    
    // Implementar histórico de navegação
    implementNavigationHistory();
    
    // Adicionar atalhos de teclado
    addKeyboardShortcuts();
    
    // Melhorar a experiência em dispositivos móveis
    enhanceMobileExperience();
});

// Melhorar a transição entre páginas
function enhancePageTransitions() {
    const navLinks = document.querySelectorAll('.main-nav a, .next-step, .prev-step');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hasAttribute('data-page') || this.hasAttribute('data-next') || this.hasAttribute('data-prev')) {
                e.preventDefault();
                
                // Obter a página atual
                const currentPage = document.querySelector('.page.active');
                
                // Obter a página de destino
                let targetPageId;
                if (this.hasAttribute('data-page')) {
                    targetPageId = this.getAttribute('data-page');
                } else if (this.hasAttribute('data-next')) {
                    targetPageId = this.getAttribute('data-next');
                } else if (this.hasAttribute('data-prev')) {
                    targetPageId = this.getAttribute('data-prev');
                }
                
                const targetPage = document.getElementById(targetPageId);
                
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
                    updateNavigation(targetPageId);
                    
                    // Salvar no histórico
                    saveToNavigationHistory(targetPageId);
                    
                    // Atualizar indicador de progresso
                    updateProgressIndicator(targetPageId);
                    
                    // Animar entrada do assistente IA
                    animateAIAssistant(targetPageId);
                }, 300);
            }
        });
    });
}

// Atualizar navegação
function updateNavigation(pageId) {
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

// Adicionar indicadores de progresso
function addProgressIndicators() {
    // Criar elemento de progresso
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-indicator';
    progressContainer.innerHTML = `
        <div class="progress-step" data-step="plan">
            <div class="step-icon"><i class="fas fa-clipboard-list"></i></div>
            <div class="step-label">Plan</div>
        </div>
        <div class="progress-connector"></div>
        <div class="progress-step" data-step="do">
            <div class="step-icon"><i class="fas fa-play"></i></div>
            <div class="step-label">Do</div>
        </div>
        <div class="progress-connector"></div>
        <div class="progress-step" data-step="check">
            <div class="step-icon"><i class="fas fa-check-circle"></i></div>
            <div class="step-label">Check</div>
        </div>
        <div class="progress-connector"></div>
        <div class="progress-step" data-step="act">
            <div class="step-icon"><i class="fas fa-sync-alt"></i></div>
            <div class="step-label">Act</div>
        </div>
    `;
    
    // Inserir após o cabeçalho
    const header = document.querySelector('.header');
    header.parentNode.insertBefore(progressContainer, header.nextSibling);
    
    // Adicionar eventos de clique aos passos
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach(step => {
        step.addEventListener('click', function() {
            const stepId = this.getAttribute('data-step');
            navigateToPage(stepId);
        });
    });
    
    // Adicionar estilos CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .progress-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--space-md);
            background-color: var(--white);
            box-shadow: var(--shadow-sm);
            margin-bottom: var(--space-md);
        }
        
        .progress-step {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            transition: transform var(--transition-fast);
        }
        
        .progress-step:hover {
            transform: translateY(-3px);
        }
        
        .step-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--light);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: var(--space-xs);
            color: var(--medium);
            transition: all var(--transition-fast);
        }
        
        .progress-step.active .step-icon {
            background-color: var(--primary-color);
            color: var(--white);
        }
        
        .progress-step.completed .step-icon {
            background-color: var(--secondary-color);
            color: var(--white);
        }
        
        .step-label {
            font-size: var(--font-size-sm);
            font-weight: 500;
            color: var(--medium);
            transition: color var(--transition-fast);
        }
        
        .progress-step.active .step-label,
        .progress-step.completed .step-label {
            color: var(--dark);
        }
        
        .progress-connector {
            width: 50px;
            height: 2px;
            background-color: var(--light-medium);
            margin: 0 var(--space-sm);
        }
        
        .progress-connector.completed {
            background-color: var(--secondary-color);
        }
        
        @media (max-width: 768px) {
            .progress-indicator {
                overflow-x: auto;
                justify-content: flex-start;
                padding: var(--space-sm);
            }
            
            .step-icon {
                width: 30px;
                height: 30px;
                font-size: var(--font-size-sm);
            }
            
            .step-label {
                font-size: var(--font-size-xs);
            }
            
            .progress-connector {
                width: 30px;
            }
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Atualizar indicador de progresso inicial
    updateProgressIndicator('home');
}

// Atualizar indicador de progresso
function updateProgressIndicator(pageId) {
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressConnectors = document.querySelectorAll('.progress-connector');
    
    // Mapear páginas para etapas
    const pageToStep = {
        'home': '',
        'plan': 'plan',
        'do': 'do',
        'check': 'check',
        'act': 'act',
        'dashboard': ''
    };
    
    // Determinar a etapa atual
    const currentStep = pageToStep[pageId];
    
    // Ordem das etapas
    const stepOrder = ['plan', 'do', 'check', 'act'];
    
    if (currentStep) {
        const currentStepIndex = stepOrder.indexOf(currentStep);
        
        // Atualizar classes das etapas
        progressSteps.forEach(step => {
            const stepId = step.getAttribute('data-step');
            const stepIndex = stepOrder.indexOf(stepId);
            
            step.classList.remove('active', 'completed');
            
            if (stepIndex === currentStepIndex) {
                step.classList.add('active');
            } else if (stepIndex < currentStepIndex) {
                step.classList.add('completed');
            }
        });
        
        // Atualizar conectores
        progressConnectors.forEach((connector, index) => {
            connector.classList.remove('completed');
            if (index < currentStepIndex) {
                connector.classList.add('completed');
            }
        });
    } else {
        // Remover todas as classes ativas e completadas
        progressSteps.forEach(step => {
            step.classList.remove('active', 'completed');
        });
        
        progressConnectors.forEach(connector => {
            connector.classList.remove('completed');
        });
    }
}

// Implementar histórico de navegação
function implementNavigationHistory() {
    // Inicializar histórico
    window.pdcaNavigationHistory = [];
    
    // Adicionar botão de voltar
    const backButton = document.createElement('button');
    backButton.className = 'navigation-back';
    backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Voltar';
    backButton.style.display = 'none';
    
    // Inserir após o indicador de progresso
    const progressIndicator = document.querySelector('.progress-indicator');
    if (progressIndicator) {
        progressIndicator.parentNode.insertBefore(backButton, progressIndicator.nextSibling);
    }
    
    // Adicionar evento de clique
    backButton.addEventListener('click', function() {
        navigateBack();
    });
    
    // Adicionar estilos CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .navigation-back {
            background-color: var(--light);
            border: none;
            padding: var(--space-sm) var(--space-md);
            border-radius: var(--radius-md);
            font-weight: 500;
            color: var(--medium-dark);
            cursor: pointer;
            margin: 0 var(--space-md) var(--space-md);
            transition: all var(--transition-fast);
            display: flex;
            align-items: center;
            gap: var(--space-sm);
        }
        
        .navigation-back:hover {
            background-color: var(--light-medium);
        }
    `;
    document.head.appendChild(styleSheet);
}

// Salvar no histórico de navegação
function saveToNavigationHistory(pageId) {
    // Ignorar páginas específicas
    if (pageId === 'home' || pageId === 'dashboard') {
        return;
    }
    
    // Adicionar ao histórico
    window.pdcaNavigationHistory.push(pageId);
    
    // Mostrar botão de voltar se houver histórico
    const backButton = document.querySelector('.navigation-back');
    if (backButton && window.pdcaNavigationHistory.length > 1) {
        backButton.style.display = 'flex';
    }
}

// Navegar para trás
function navigateBack() {
    // Verificar se há histórico
    if (window.pdcaNavigationHistory.length <= 1) {
        return;
    }
    
    // Remover página atual do histórico
    window.pdcaNavigationHistory.pop();
    
    // Obter página anterior
    const previousPageId = window.pdcaNavigationHistory[window.pdcaNavigationHistory.length - 1];
    
    // Navegar para a página anterior
    navigateToPage(previousPageId);
    
    // Remover do histórico para evitar duplicação
    window.pdcaNavigationHistory.pop();
    
    // Ocultar botão de voltar se não houver mais histórico
    const backButton = document.querySelector('.navigation-back');
    if (backButton && window.pdcaNavigationHistory.length <= 1) {
        backButton.style.display = 'none';
    }
}

// Adicionar atalhos de teclado
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Verificar se não está em um campo de texto
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Atalhos
        switch (e.key) {
            case '1':
                if (e.altKey) navigateToPage('plan');
                break;
            case '2':
                if (e.altKey) navigateToPage('do');
                break;
            case '3':
                if (e.altKey) navigateToPage('check');
                break;
            case '4':
                if (e.altKey) navigateToPage('act');
                break;
            case 'h':
                if (e.altKey) navigateToPage('home');
                break;
            case 'd':
                if (e.altKey) navigateToPage('dashboard');
                break;
            case 'Escape':
                // Fechar modais abertos
                const activeModals = document.querySelectorAll('.modal.active');
                activeModals.forEach(modal => {
                    modal.classList.remove('active');
                });
                break;
        }
    });
    
    // Adicionar dicas de atalhos
    const tooltipContainer = document.createElement('div');
    tooltipContainer.className = 'keyboard-shortcuts-tooltip';
    tooltipContainer.innerHTML = `
        <button class="tooltip-toggle"><i class="fas fa-keyboard"></i></button>
        <div class="tooltip-content">
            <h4>Atalhos de teclado</h4>
            <ul>
                <li><kbd>Alt</kbd> + <kbd>1</kbd> - Plan</li>
                <li><kbd>Alt</kbd> + <kbd>2</kbd> - Do</li>
                <li><kbd>Alt</kbd> + <kbd>3</kbd> - Check</li>
                <li><kbd>Alt</kbd> + <kbd>4</kbd> - Act</li>
                <li><kbd>Alt</kbd> + <kbd>H</kbd> - Início</li>
                <li><kbd>Alt</kbd> + <kbd>D</kbd> - Dashboard</li>
                <li><kbd>Esc</kbd> - Fechar modal</li>
            </ul>
        </div>
    `;
    
    document.body.appendChild(tooltipContainer);
    
    // Adicionar evento de clique ao botão de alternância
    const tooltipToggle = tooltipContainer.querySelector('.tooltip-toggle');
    tooltipToggle.addEventListener('click', function() {
        tooltipContainer.classList.toggle('active');
    });
    
    // Adicionar estilos CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .keyboard-shortcuts-tooltip {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .tooltip-toggle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: var(--white);
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: var(--shadow-md);
            transition: background-color var(--transition-fast);
        }
        
        .tooltip-toggle:hover {
            background-color: var(--primary-dark);
        }
        
        .tooltip-content {
            position: absolute;
            bottom: 50px;
            right: 0;
            background-color: var(--white);
            border-radius: var(--radius-md);
            padding: var(--space-md);
            box-shadow: var(--shadow-lg);
            width: 250px;
            display: none;
        }
        
        .keyboard-shortcuts-tooltip.active .tooltip-content {
            display: block;
            animation: fadeIn var(--transition-normal);
        }
        
        .tooltip-content h4 {
            margin-bottom: var(--space-md);
            color: var(--dark);
        }
        
        .tooltip-content ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .tooltip-content li {
            margin-bottom: var(--space-sm);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .tooltip-content kbd {
            background-color: var(--light);
            border: 1px solid var(--light-medium);
            border-radius: var(--radius-sm);
            padding: 2px 5px;
            font-size: var(--font-size-xs);
            font-family: monospace;
        }
    `;
    document.head.appendChild(styleSheet);
}

// Melhorar a experiência em dispositivos móveis
function enhanceMobileExperience() {
    // Adicionar botão de menu para dispositivos móveis
    const header = document.querySelector('.header');
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Inserir no início do cabeçalho
    header.insertBefore(mobileMenuButton, header.firstChild);
    
    // Adicionar evento de clique
    mobileMenuButton.addEventListener('click', function() {
        document.body.classList.toggle('mobile-menu-open');
    });
    
    // Adicionar estilos CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .mobile-menu-button {
            display: none;
            background: none;
            border: none;
            font-size: var(--font-size-xl);
            color: var(--medium-dark);
            cursor: pointer;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-button {
                display: block;
            }
            
            .header {
                flex-wrap: wrap;
            }
            
            .main-nav {
                width: 100%;
                display: none;
                margin-top: var(--space-md);
            }
            
            .main-nav ul {
                flex-direction: column;
                gap: var(--space-sm);
            }
            
            .main-nav a {
                width: 100%;
                justify-content: flex-start;
            }
            
            .user-menu {
                display: none;
                width: 100%;
                margin-top: var(--space-md);
            }
            
            body.mobile-menu-open .main-nav,
            body.mobile-menu-open .user-menu {
                display: block;
                animation: fadeIn var(--transition-normal);
            }
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Adicionar gestos de deslize para navegação em dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 100;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Deslize para a esquerda (avançar)
            const currentPageId = getCurrentPageId();
            const nextPageId = getNextPageId(currentPageId);
            if (nextPageId) {
                navigateToPage(nextPageId);
            }
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Deslize para a direita (voltar)
            const currentPageId = getCurrentPageId();
            const prevPageId = getPrevPageId(currentPageId);
            if (prevPageId) {
                navigateToPage(prevPageId);
            }
        }
    }
    
    function getCurrentPageId() {
        const currentPage = document.querySelector('.page.active');
        return currentPage ? currentPage.id : null;
    }
    
    function getNextPageId(currentPageId) {
        const pageOrder = ['home', 'plan', 'do', 'check', 'act', 'dashboard'];
        const currentIndex = pageOrder.indexOf(currentPageId);
        
        if (currentIndex !== -1 && currentIndex < pageOrder.length - 1) {
            return pageOrder[currentIndex + 1];
        }
        
        return null;
    }
    
    function getPrevPageId(currentPageId) {
        const pageOrder = ['home', 'plan', 'do', 'check', 'act', 'dashboard'];
        const currentIndex = pageOrder.indexOf(currentPageId);
        
        if (currentIndex > 0) {
            return pageOrder[currentIndex - 1];
        }
        
        return null;
    }
}

// Função aprimorada de navegação para página
function navigateToPage(pageId) {
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
    
    // Determinar direção da animação
    const pageOrder = ['home', 'plan', 'do', 'check', 'act', 'dashboard'];
    const currentIndex = pageOrder.indexOf(currentPage.id);
    const targetIndex = pageOrder.indexOf(pageId);
    const direction = targetIndex > currentIndex ? 'forward' : 'backward';
    
    // Animar saída da página atual
    if (direction === 'forward') {
        currentPage.style.opacity = '0';
        currentPage.style.transform = 'translateX(-50px)';
    } else {
        currentPage.style.opacity = '0';
        currentPage.style.transform = 'translateX(50px)';
    }
    
    // Preparar página de destino
    if (direction === 'forward') {
        targetPage.style.opacity = '0';
        targetPage.style.transform = 'translateX(50px)';
    } else {
        targetPage.style.opacity = '0';
        targetPage.style.transform = 'translateX(-50px)';
    }
    targetPage.classList.add('active');
    
    // Após a animação de saída, animar entrada da página de destino
    setTimeout(() => {
        currentPage.classList.remove('active');
        targetPage.style.opacity = '1';
        targetPage.style.transform = 'translateX(0)';
        
        // Atualizar navegação
        updateNavigation(pageId);
        
        // Salvar no histórico
        saveToNavigationHistory(pageId);
        
        // Atualizar indicador de progresso
        updateProgressIndicator(pageId);
        
        // Animar entrada do assistente IA
        animateAIAssistant(pageId);
        
        // Fechar menu móvel se estiver aberto
        document.body.classList.remove('mobile-menu-open');
    }, 300);
}
