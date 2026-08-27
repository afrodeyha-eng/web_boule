// APP CONFIGURATION
const APP_CONFIG = {
    currentModule: 'dashboard',
    sidebarOpen: window.innerWidth > 768
};

// MODULE REGISTRY - Módulos disponibles consolidados
const MODULES = {
    dashboard: {
        title: 'Ir al inicio',
        component: loadDashboard
    },
    // RECURSOS HUMANOS
    legajos: {
        title: 'Legajos',
        component: loadPlaceholder
    },
    'rrhh-agenda': {
        title: 'RRHH Agenda',
        component: loadPlaceholder
    },
    'rrhh-cargos': {
        title: 'RRHH Cargos',
        component: loadPlaceholder
    },
    'rrhh-vacantes': {
        title: 'RRHH Vacantes',
        component: loadPlaceholder
    },
    desempenio: {
        title: 'Desempeño',
        component: loadPlaceholder
    },
    novedades: {
        title: 'Novedades',
        component: loadPlaceholder
    },
    recuperacion: {
        title: 'Recuperación',
        component: loadPlaceholder
    },
    // GESTIÓN OPERATIVA
    asistencia: {
        title: 'Asistencia',
        component: loadPlaceholder
    },
    turnos: {
        title: 'Turnos',
        component: loadPlaceholder
    },
    equipos: {
        title: 'Equipos',
        component: loadPlaceholder
    },
    feriados: {
        title: 'Feriados',
        component: loadPlaceholder
    },
    reservas: {
        title: 'Reservas de Salas',
        component: loadPlaceholder
    },
    // ATENCIÓN AL CIUDADANO
    'audit-llamadas': {
        title: 'Audit de Llamadas',
        component: loadPlaceholder
    },
    inbox: {
        title: 'Inbox',
        component: loadPlaceholder
    },
    // GESTIÓN DE RECLAMOS
    reclamos: {
        title: 'Reclamos',
        component: loadPlaceholder
    },
    'mapa-reclamos': {
        title: 'Mapa de Reclamos',
        component: loadPlaceholder
    },
    'reclamos-resueltos': {
        title: 'Reclamos resueltos',
        component: loadPlaceholder
    },
    'reclamos-estadisticas': {
        title: 'Reclamos estadísticas',
        component: loadPlaceholder
    },
    'ordenes-trabajo': {
        title: 'Órdenes de trabajo',
        component: loadPlaceholder
    },
    // GESTIÓN DE SOLICITUDES
    solicitudes: {
        title: 'Solicitudes',
        component: loadPlaceholder
    },
    tareas: {
        title: 'Tareas',
        component: loadPlaceholder
    },
    'pedidos-insumos': {
        title: 'Pedidos de insumos',
        component: loadPlaceholder
    },
    // INFORMACIÓN Y REPORTES
    reportes: {
        title: 'Reportes',
        component: loadPlaceholder
    },
    documentos: {
        title: 'Documentos',
        component: loadPlaceholder
    },
    activos: {
        title: 'Activos',
        component: loadPlaceholder
    },
    casos: {
        title: 'Casos',
        component: loadPlaceholder
    },
    biblioteca: {
        title: 'Biblioteca',
        component: loadPlaceholder
    },
    'tablero-comercial': {
        title: 'Tablero Comercial',
        component: loadPlaceholder
    },
    // SOPORTE
    it: {
        title: 'IT',
        component: loadPlaceholder
    },
    // CONFIGURACIÓN
    ajustes: {
        title: 'Ajustes',
        component: loadPlaceholder
    },
    notificaciones: {
        title: 'Notificaciones',
        component: loadPlaceholder
    },
    'mi-cuenta': {
        title: 'Mi Cuenta',
        component: loadPlaceholder
    }
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadModule('dashboard');
}

// EVENT LISTENERS
function setupEventListeners() {
    // Navigation items
    const navItems = document.querySelectorAll('[data-module]');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const moduleId = item.getAttribute('data-module');
            loadModule(moduleId);

            // Close sidebar on mobile after selecting
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });

    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const hamburger = document.getElementById('hamburger');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleSidebar);
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }

    // Handle window resize
    window.addEventListener('resize', handleWindowResize);

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            const sidebar = document.getElementById('sidebar');
            const hamburger = document.getElementById('hamburger');

            if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
                closeSidebar();
            }
        }
    });
}

// MODULE LOADING
function loadModule(moduleId) {
    const module = MODULES[moduleId];

    if (!module) {
        console.error(`Module ${moduleId} not found`);
        return;
    }

    APP_CONFIG.currentModule = moduleId;

    // Update page title
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.textContent = module.title;
    }

    // Update active nav item
    const navItems = document.querySelectorAll('[data-module]');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-module') === moduleId) {
            item.classList.add('active');
        }
    });

    // Load module component
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = '';
    module.component(contentArea);
}

// MODULE COMPONENTS
function loadDashboard(container) {
    container.innerHTML = `
        <div class="dashboard">
            <div class="dashboard-header">
                <h2>Bienvenido a tu Dashboard</h2>
                <p>2026-08-27</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">👥</div>
                    <div class="stat-content">
                        <h3>Total de Usuarios</h3>
                        <p class="stat-value">1,234</p>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">📋</div>
                    <div class="stat-content">
                        <h3>Tareas Pendientes</h3>
                        <p class="stat-value">45</p>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">✅</div>
                    <div class="stat-content">
                        <h3>Completadas Hoy</h3>
                        <p class="stat-value">23</p>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">⚠️</div>
                    <div class="stat-content">
                        <h3>Reclamos Activos</h3>
                        <p class="stat-value">12</p>
                    </div>
                </div>
            </div>

            <div class="dashboard-content">
                <div class="content-section">
                    <h3>Actividad Reciente</h3>
                    <div class="activity-list">
                        <div class="activity-item">
                            <span class="activity-icon">📝</span>
                            <div class="activity-text">
                                <p><strong>Nueva solicitud</strong> - Pedido de Insumos</p>
                                <small>Hace 2 horas</small>
                            </div>
                        </div>
                        <div class="activity-item">
                            <span class="activity-icon">✅</span>
                            <div class="activity-text">
                                <p><strong>Tarea completada</strong> - Revisión de Legajos</p>
                                <small>Hace 4 horas</small>
                            </div>
                        </div>
                        <div class="activity-item">
                            <span class="activity-icon">📊</span>
                            <div class="activity-text">
                                <p><strong>Reporte generado</strong> - Asistencia Semanal</p>
                                <small>Hace 1 día</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content-section">
                    <h3>Accesos Rápidos</h3>
                    <div class="quick-access-grid">
                        <button class="quick-access-btn" onclick="loadModuleFromBtn('asistencia')">
                            <span>👥</span>
                            Asistencia
                        </button>
                        <button class="quick-access-btn" onclick="loadModuleFromBtn('turnos')">
                            <span>🕐</span>
                            Turnos
                        </button>
                        <button class="quick-access-btn" onclick="loadModuleFromBtn('reportes')">
                            <span>📈</span>
                            Reportes
                        </button>
                        <button class="quick-access-btn" onclick="loadModuleFromBtn('tareas')">
                            <span>✓</span>
                            Tareas
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add dashboard styles
    addDashboardStyles();
}

function loadPlaceholder(container) {
    const moduleId = APP_CONFIG.currentModule;
    const module = MODULES[moduleId];

    container.innerHTML = `
        <div class="module-content">
            <div class="module-header">
                <h2>${module.title}</h2>
                <p class="module-subtitle">Módulo en desarrollo</p>
            </div>

            <div class="module-placeholder-content">
                <div class="placeholder-icon">🔨</div>
                <h3>Próximamente</h3>
                <p>Este módulo está siendo desarrollado. Vuelve pronto para ver las nuevas funcionalidades.</p>

                <div class="module-info">
                    <p><strong>Módulo ID:</strong> ${moduleId}</p>
                    <p><strong>Estado:</strong> En desarrollo</p>
                </div>
            </div>
        </div>
    `;

    addModuleStyles();
}

// HELPER FUNCTIONS
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');

    sidebar.classList.toggle('active');
    if (hamburger) {
        hamburger.classList.toggle('active');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');

    sidebar.classList.remove('active');
    if (hamburger) {
        hamburger.classList.remove('active');
    }
}

function handleWindowResize() {
    if (window.innerWidth > 768) {
        const sidebar = document.getElementById('sidebar');
        const hamburger = document.getElementById('hamburger');
        sidebar.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    }
}

function handleLogout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        // Aquí iría la lógica de logout
        alert('Sesión cerrada');
        // Redirigir a login
        // window.location.href = '/login';
    }
}

function loadModuleFromBtn(moduleId) {
    loadModule(moduleId);
}

// STYLES
function addDashboardStyles() {
    if (!document.getElementById('dashboard-styles')) {
        const style = document.createElement('style');
        style.id = 'dashboard-styles';
        style.textContent = `
            .dashboard {
                animation: fadeIn 0.3s ease;
            }

            .dashboard-header {
                margin-bottom: 30px;
            }

            .dashboard-header h2 {
                font-size: 28px;
                margin-bottom: 5px;
                color: var(--text-primary);
            }

            .dashboard-header p {
                color: var(--text-secondary);
                font-size: 14px;
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }

            .stat-card {
                background-color: var(--bg-primary);
                border-radius: 8px;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                transition: var(--transition);
            }

            .stat-card:hover {
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                transform: translateY(-2px);
            }

            .stat-icon {
                font-size: 40px;
            }

            .stat-content h3 {
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                color: var(--text-secondary);
                margin: 0;
            }

            .stat-value {
                font-size: 24px;
                font-weight: 700;
                color: var(--primary-color);
                margin: 5px 0 0 0;
            }

            .dashboard-content {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
            }

            .content-section {
                background-color: var(--bg-primary);
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            }

            .content-section h3 {
                margin: 0 0 20px 0;
                color: var(--text-primary);
                font-size: 18px;
            }

            .activity-list {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }

            .activity-item {
                display: flex;
                gap: 12px;
                padding: 12px;
                background-color: var(--bg-secondary);
                border-radius: 6px;
                border-left: 3px solid var(--primary-color);
            }

            .activity-icon {
                font-size: 20px;
                flex-shrink: 0;
            }

            .activity-text p {
                margin: 0;
                font-size: 14px;
                color: var(--text-primary);
            }

            .activity-text small {
                color: var(--text-tertiary);
                font-size: 12px;
            }

            .quick-access-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 12px;
            }

            .quick-access-btn {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 8px;
                padding: 15px;
                background-color: var(--bg-secondary);
                border: 2px solid transparent;
                border-radius: 6px;
                cursor: pointer;
                transition: var(--transition);
                font-size: 12px;
                font-weight: 600;
                color: var(--text-primary);
            }

            .quick-access-btn:hover {
                background-color: var(--primary-color);
                color: white;
                border-color: var(--primary-color);
            }

            .quick-access-btn span {
                font-size: 28px;
            }

            @media (max-width: 768px) {
                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }

                .dashboard-content {
                    grid-template-columns: 1fr;
                }
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function addModuleStyles() {
    if (!document.getElementById('module-styles')) {
        const style = document.createElement('style');
        style.id = 'module-styles';
        style.textContent = `
            .module-content {
                animation: fadeIn 0.3s ease;
            }

            .module-header {
                margin-bottom: 30px;
            }

            .module-header h2 {
                font-size: 28px;
                margin-bottom: 5px;
                color: var(--text-primary);
            }

            .module-subtitle {
                color: var(--text-secondary);
                font-size: 14px;
                margin: 0;
            }

            .module-placeholder-content {
                background-color: var(--bg-primary);
                border-radius: 8px;
                padding: 60px 30px;
                text-align: center;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            }

            .placeholder-icon {
                font-size: 64px;
                margin-bottom: 20px;
            }

            .module-placeholder-content h3 {
                font-size: 24px;
                margin: 0 0 10px 0;
                color: var(--text-primary);
            }

            .module-placeholder-content p {
                color: var(--text-secondary);
                margin: 0 0 20px 0;
            }

            .module-info {
                display: inline-block;
                background-color: var(--bg-secondary);
                border-radius: 6px;
                padding: 15px 20px;
                text-align: left;
            }

            .module-info p {
                margin: 8px 0;
                font-size: 14px;
                color: var(--text-primary);
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
