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
        component: loadLegajos
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
        component: loadAsistencia
    },
    turnos: {
        title: 'Turnos',
        component: loadPlaceholder
    },
    equipos: {
        title: 'Equipos',
        component: loadPlaceholder
    },
    calendario: {
        title: 'Calendario',
        component: loadPlaceholder
    },
    feriados: {
        title: 'Feriados',
        component: loadPlaceholder
    },
    reservas: {
        title: 'Reservas de Salas',
        component: loadReservas
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
function loadReservas(container) {
    const days = ['Lun 31', 'Mar 1', 'Mié 2', 'Jue 3', 'Vie 4'];
    const hours = [];

    for (let h = 8; h < 17; h++) {
        hours.push(`${String(h).padStart(2, '0')}:00`);
        hours.push(`${String(h).padStart(2, '0')}:30`);
    }

    let hoursGrid = ``;
    hours.forEach(hour => {
        hoursGrid += `
            <div class="time-row">
                <div class="time-label">${hour}</div>
                ${days.map(day => `<div class="time-cell" onclick="reservarSlot(this)"></div>`).join('')}
            </div>
        `;
    });

    container.innerHTML = `
        <div class="reservas-module">
            <div class="reservas-header">
                <h2>Reservas de Salas</h2>
                <div class="header-buttons">
                    <button class="info-btn" title="Información">ℹ️ Info</button>
                    <button class="export-btn" title="Exportar">📥 Exportar</button>
                </div>
            </div>

            <div class="sala-selector">
                <label>Sala:</label>
                <select class="sala-dropdown">
                    <option>Innovación (Sala actual de reuniones SL50)</option>
                    <option>Conferencias (Sala SL51)</option>
                    <option>Capacitación (Sala SL52)</option>
                    <option>Reuniones Pequeñas (Sala SL53)</option>
                </select>
            </div>

            <div class="week-info">
                <span class="week-text">Semana del 31/08 al 04/09</span>
                <div class="week-navigation">
                    <button class="nav-week-btn" onclick="previousWeek()">← Semana anterior</button>
                    <button class="nav-week-btn" onclick="nextWeek()">Semana siguiente →</button>
                </div>
            </div>

            <div class="calendar-container">
                <div class="calendar-header">
                    <div class="time-label-header"></div>
                    ${days.map(day => `<div class="day-header">${day}</div>`).join('')}
                </div>
                <div class="calendar-grid">
                    ${hoursGrid}
                </div>
            </div>
        </div>
    `;

    addReservasStyles();
}

function reservarSlot(element) {
    element.classList.toggle('reserved');
}

function previousWeek() {
    alert('Navegar a semana anterior');
}

function nextWeek() {
    alert('Navegar a semana siguiente');
}

function loadAsistencia(container) {
    const startDate = '1 ago 2026';
    const endDate = '31 ago 2026';

    container.innerHTML = `
        <div class="asistencia-module">
            <div class="asistencia-header">
                <div class="header-left">
                    <h2>Asistencia</h2>
                    <div class="tabs-group">
                        <button class="tab-btn active" onclick="switchAsistenciaTab(this, 'compania')">Compañía</button>
                        <button class="tab-btn" onclick="switchAsistenciaTab(this, 'mi')">Mi</button>
                    </div>
                </div>
                <div class="header-right">
                    <button class="action-btn" title="Exportar">
                        <span>📥</span> Exportar
                    </button>
                    <button class="action-btn" title="Enviar recordatorio">
                        <span>📧</span> Enviar recordatorio
                    </button>
                </div>
            </div>

            <div class="subtabs">
                <button class="subtab-btn active" onclick="switchSubtab(this, 'vista-general')">Vista general</button>
                <button class="subtab-btn" onclick="switchSubtab(this, 'horas-extra')">Horas extra</button>
            </div>

            <div class="controls-bar">
                <div class="date-control">
                    <button class="date-nav-btn">◀</button>
                    <input type="text" class="date-range-input" value="${startDate} - ${endDate}" readonly>
                    <button class="date-nav-btn">▶</button>
                    <button class="refresh-btn" title="Refrescar">🔄</button>
                </div>

                <div class="filter-controls">
                    <button class="filter-add-btn">⚙️ Añadir filtro</button>
                    <div class="search-box">
                        <input type="text" placeholder="Buscar..." class="search-input">
                        <span class="search-icon">🔍</span>
                    </div>
                </div>
            </div>

            <div class="results-info">
                Mostrando 1 - 6 de 6 en total
            </div>

            <div class="table-container">
                <table class="asistencia-table">
                    <thead>
                        <tr>
                            <th class="col-icon"></th>
                            <th class="col-nombre">Nombre completo</th>
                            <th class="col-numero">Previsto</th>
                            <th class="col-numero">Trabajado</th>
                            <th class="col-numero">Horas extra</th>
                            <th class="col-numero">Descanso</th>
                            <th class="col-numero">Licencia paga</th>
                            <th class="col-numero">Licencia no paga</th>
                            <th class="col-numero">Total licencia</th>
                            <th class="col-numero">Diferencia</th>
                            <th class="col-acciones"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="col-icon">⭐</td>
                            <td class="col-nombre">ALEJANDRA RUBIO</td>
                            <td class="col-numero">180h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero negative">-180h</td>
                            <td class="col-acciones"><button class="action-icon">→</button></td>
                        </tr>
                        <tr>
                            <td class="col-icon">⭐</td>
                            <td class="col-nombre">ALFONSINA CORIA</td>
                            <td class="col-numero">180h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero negative">-180h</td>
                            <td class="col-acciones"><button class="action-icon">→</button></td>
                        </tr>
                        <tr>
                            <td class="col-icon">⭐</td>
                            <td class="col-nombre">MARIA CALZADA</td>
                            <td class="col-numero">80h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero negative">-80h</td>
                            <td class="col-acciones"><button class="action-icon">→</button></td>
                        </tr>
                        <tr>
                            <td class="col-icon">⭐</td>
                            <td class="col-nombre">PABLO CANTERA</td>
                            <td class="col-numero">80h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero negative">-80h</td>
                            <td class="col-acciones"><button class="action-icon">→</button></td>
                        </tr>
                        <tr>
                            <td class="col-icon">⭐</td>
                            <td class="col-nombre">ROCIO GONZALEZ</td>
                            <td class="col-numero">80h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero negative">-80h</td>
                            <td class="col-acciones"><button class="action-icon">→</button></td>
                        </tr>
                        <tr>
                            <td class="col-icon">⭐</td>
                            <td class="col-nombre">TANIA PAJON CORREA</td>
                            <td class="col-numero">80h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero">0h</td>
                            <td class="col-numero negative">-80h</td>
                            <td class="col-acciones"><button class="action-icon">→</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    addAsistenciaStyles();
}

function switchAsistenciaTab(btn, tab) {
    document.querySelectorAll('.tabs-group .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function switchSubtab(btn, tab) {
    document.querySelectorAll('.subtab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function loadLegajos(container) {
    container.innerHTML = `
        <div class="legajos-module">
            <div class="module-header">
                <div class="header-title">
                    <span class="header-icon">📋</span>
                    <h2>Legajos</h2>
                </div>
                <button class="btn btn-primary" onclick="alert('Crear nuevo empleado')">
                    <span class="btn-icon">➕</span>
                    Alta de empleado
                </button>
            </div>

            <div class="filters-section">
                <div class="filter-group">
                    <input type="text" placeholder="Apellido o Nombre..." class="filter-input">
                    <button class="filter-btn">🔍</button>
                </div>

                <div class="filter-group">
                    <input type="text" placeholder="CUIT o CUIL..." class="filter-input">
                    <button class="filter-btn">🔍</button>
                </div>

                <div class="filter-group">
                    <input type="text" placeholder="DNI..." class="filter-input">
                    <button class="filter-btn">🔍</button>
                </div>

                <div class="filter-row">
                    <div class="filter-group">
                        <select class="filter-select">
                            <option>Secretaría...</option>
                            <option>Secretaría de Hacienda</option>
                            <option>Secretaría de Obras</option>
                            <option>Secretaría de Desarrollo Social</option>
                        </select>
                        <button class="filter-btn">🔍</button>
                    </div>

                    <div class="filter-group">
                        <select class="filter-select">
                            <option>Dirección...</option>
                            <option>Dirección General</option>
                            <option>Dirección Administrativa</option>
                            <option>Dirección de RRHH</option>
                        </select>
                        <button class="filter-btn">🔍</button>
                    </div>
                </div>

                <div class="filter-row">
                    <div class="filter-group">
                        <label>Fecha de ingreso. Desde</label>
                        <input type="date" class="filter-input date-input">
                    </div>
                    <div class="filter-group">
                        <label>hasta</label>
                        <input type="date" class="filter-input date-input">
                    </div>
                    <button class="filter-btn" style="align-self: flex-end;">🔍</button>
                </div>

                <div class="filter-checkbox">
                    <input type="checkbox" id="contratosVencidos">
                    <label for="contratosVencidos">mostrar contratos vencidos</label>
                </div>
            </div>

            <div class="results-section">
                <div class="results-placeholder">
                    <span class="placeholder-icon">📂</span>
                    <p>Ingresa los filtros de búsqueda para ver los legajos</p>
                </div>
            </div>
        </div>
    `;

    addLegajosStyles();
}

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

function addReservasStyles() {
    if (!document.getElementById('reservas-styles')) {
        const style = document.createElement('style');
        style.id = 'reservas-styles';
        style.textContent = `
            .reservas-module {
                animation: fadeIn 0.3s ease;
            }

            .reservas-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                padding-bottom: 20px;
                border-bottom: 2px solid var(--border-color);
            }

            .reservas-header h2 {
                font-size: 28px;
                margin: 0;
                color: var(--text-primary);
            }

            .header-buttons {
                display: flex;
                gap: 10px;
            }

            .info-btn,
            .export-btn {
                padding: 10px 16px;
                background-color: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: 6px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 600;
                color: var(--text-primary);
                transition: var(--transition);
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .info-btn:hover,
            .export-btn:hover {
                background-color: var(--primary-color);
                color: white;
                border-color: var(--primary-color);
            }

            .sala-selector {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 25px;
            }

            .sala-selector label {
                font-weight: 600;
                color: var(--text-primary);
                white-space: nowrap;
            }

            .sala-dropdown {
                flex: 1;
                max-width: 400px;
                padding: 12px 15px;
                border: 1px solid var(--border-color);
                border-radius: 6px;
                font-family: inherit;
                font-size: 14px;
                background-color: var(--bg-primary);
                color: var(--text-primary);
                cursor: pointer;
                transition: var(--transition);
            }

            .sala-dropdown:hover {
                border-color: var(--primary-color);
            }

            .sala-dropdown:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(13, 115, 119, 0.1);
            }

            .week-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                padding: 15px;
                background-color: var(--bg-secondary);
                border-radius: 6px;
            }

            .week-text {
                font-size: 16px;
                font-weight: 600;
                color: var(--text-primary);
            }

            .week-navigation {
                display: flex;
                gap: 10px;
            }

            .nav-week-btn {
                padding: 8px 16px;
                background-color: var(--bg-primary);
                border: 1px solid var(--border-color);
                border-radius: 6px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                color: var(--text-primary);
                transition: var(--transition);
            }

            .nav-week-btn:hover {
                background-color: var(--primary-color);
                color: white;
                border-color: var(--primary-color);
            }

            .calendar-container {
                background-color: var(--bg-primary);
                border-radius: 8px;
                overflow-x: auto;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }

            .calendar-header {
                display: grid;
                grid-template-columns: 50px repeat(5, 1fr);
                background-color: var(--bg-secondary);
                border-bottom: 2px solid var(--border-color);
                position: sticky;
                top: 0;
            }

            .time-label-header {
                padding: 12px;
            }

            .day-header {
                padding: 12px;
                font-weight: 600;
                color: var(--primary-color);
                text-align: center;
                border-right: 1px solid var(--border-color);
                font-size: 14px;
            }

            .day-header:last-child {
                border-right: none;
            }

            .calendar-grid {
                display: flex;
                flex-direction: column;
            }

            .time-row {
                display: grid;
                grid-template-columns: 50px repeat(5, 1fr);
                border-bottom: 1px solid var(--border-color);
            }

            .time-row:last-child {
                border-bottom: none;
            }

            .time-label {
                padding: 12px;
                font-size: 12px;
                font-weight: 500;
                color: var(--text-secondary);
                border-right: 1px solid var(--border-color);
                text-align: center;
            }

            .time-cell {
                padding: 12px;
                border-right: 1px solid var(--border-color);
                cursor: pointer;
                transition: var(--transition);
                background-color: var(--bg-primary);
                min-height: 30px;
                position: relative;
            }

            .time-cell:last-child {
                border-right: none;
            }

            .time-cell:hover {
                background-color: #E8F5F7;
            }

            .time-cell.reserved {
                background-color: var(--primary-color);
                color: white;
            }

            .time-cell.reserved:hover {
                background-color: var(--secondary-color);
            }

            @media (max-width: 768px) {
                .reservas-header {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 15px;
                }

                .header-buttons {
                    width: 100%;
                }

                .info-btn,
                .export-btn {
                    flex: 1;
                    justify-content: center;
                }

                .week-info {
                    flex-direction: column;
                    gap: 15px;
                }

                .week-navigation {
                    width: 100%;
                }

                .nav-week-btn {
                    flex: 1;
                }

                .sala-selector {
                    flex-direction: column;
                    align-items: flex-start;
                }

                .sala-dropdown {
                    width: 100%;
                    max-width: 100%;
                }

                .calendar-container {
                    overflow-x: auto;
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

function addAsistenciaStyles() {
    if (!document.getElementById('asistencia-styles')) {
        const style = document.createElement('style');
        style.id = 'asistencia-styles';
        style.textContent = `
            .asistencia-module {
                animation: fadeIn 0.3s ease;
            }

            .asistencia-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 25px;
                padding-bottom: 20px;
                border-bottom: 2px solid var(--border-color);
            }

            .header-left {
                display: flex;
                align-items: flex-start;
                gap: 20px;
            }

            .asistencia-header h2 {
                font-size: 28px;
                margin: 0;
                color: var(--text-primary);
            }

            .tabs-group {
                display: flex;
                gap: 10px;
            }

            .tab-btn {
                padding: 8px 16px;
                background-color: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: 6px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                color: var(--text-secondary);
                transition: var(--transition);
            }

            .tab-btn:hover {
                background-color: var(--bg-tertiary);
            }

            .tab-btn.active {
                background-color: var(--primary-color);
                color: white;
                border-color: var(--primary-color);
            }

            .header-right {
                display: flex;
                gap: 10px;
            }

            .action-btn {
                padding: 10px 16px;
                background-color: var(--primary-color);
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 600;
                transition: var(--transition);
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .action-btn:hover {
                background-color: var(--secondary-color);
                transform: translateY(-2px);
            }

            .subtabs {
                display: flex;
                gap: 0;
                margin-bottom: 20px;
                border-bottom: 2px solid var(--border-color);
            }

            .subtab-btn {
                padding: 12px 20px;
                background: none;
                border: none;
                border-bottom: 3px solid transparent;
                cursor: pointer;
                font-size: 14px;
                color: var(--text-secondary);
                font-weight: 500;
                transition: var(--transition);
            }

            .subtab-btn:hover {
                color: var(--text-primary);
            }

            .subtab-btn.active {
                color: var(--primary-color);
                border-bottom-color: var(--primary-color);
            }

            .controls-bar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                gap: 20px;
            }

            .date-control {
                display: flex;
                align-items: center;
                gap: 10px;
                background-color: var(--bg-primary);
                padding: 10px 15px;
                border-radius: 6px;
                border: 1px solid var(--border-color);
            }

            .date-nav-btn {
                background: none;
                border: none;
                font-size: 16px;
                cursor: pointer;
                padding: 5px 8px;
                transition: var(--transition);
            }

            .date-nav-btn:hover {
                color: var(--primary-color);
            }

            .date-range-input {
                padding: 0;
                border: none;
                background: none;
                font-size: 14px;
                font-weight: 600;
                color: var(--text-primary);
                cursor: pointer;
                min-width: 150px;
                text-align: center;
            }

            .refresh-btn {
                background: none;
                border: none;
                font-size: 16px;
                cursor: pointer;
                padding: 5px 8px;
                transition: var(--transition);
            }

            .refresh-btn:hover {
                color: var(--primary-color);
                transform: rotate(180deg);
            }

            .filter-controls {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .filter-add-btn {
                padding: 10px 16px;
                background-color: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: 6px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                color: var(--text-primary);
                transition: var(--transition);
            }

            .filter-add-btn:hover {
                background-color: var(--bg-tertiary);
            }

            .search-box {
                display: flex;
                align-items: center;
                background-color: var(--bg-primary);
                border: 1px solid var(--border-color);
                border-radius: 6px;
                padding: 0 12px;
            }

            .search-input {
                flex: 1;
                border: none;
                background: none;
                padding: 10px 8px;
                font-size: 14px;
            }

            .search-input:focus {
                outline: none;
            }

            .search-icon {
                cursor: pointer;
                font-size: 16px;
            }

            .results-info {
                font-size: 13px;
                color: var(--text-secondary);
                margin-bottom: 15px;
            }

            .table-container {
                background-color: var(--bg-primary);
                border-radius: 8px;
                overflow-x: auto;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }

            .asistencia-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 13px;
            }

            .asistencia-table thead {
                background-color: var(--bg-secondary);
                border-bottom: 2px solid var(--border-color);
            }

            .asistencia-table th {
                padding: 12px 15px;
                text-align: left;
                font-weight: 600;
                color: var(--text-primary);
                white-space: nowrap;
            }

            .asistencia-table td {
                padding: 12px 15px;
                border-bottom: 1px solid var(--border-color);
            }

            .asistencia-table tbody tr:hover {
                background-color: var(--bg-secondary);
            }

            .col-icon {
                width: 40px;
                text-align: center;
            }

            .col-nombre {
                font-weight: 500;
                color: var(--primary-color);
            }

            .col-numero {
                text-align: right;
                color: var(--text-secondary);
                font-family: 'Courier New', monospace;
            }

            .col-numero.negative {
                color: var(--danger-color);
            }

            .col-acciones {
                width: 40px;
                text-align: center;
            }

            .action-icon {
                background: none;
                border: none;
                font-size: 16px;
                cursor: pointer;
                padding: 5px;
                transition: var(--transition);
            }

            .action-icon:hover {
                color: var(--primary-color);
            }

            @media (max-width: 768px) {
                .asistencia-header {
                    flex-direction: column;
                    gap: 15px;
                }

                .controls-bar {
                    flex-direction: column;
                    align-items: stretch;
                }

                .date-control,
                .search-box {
                    width: 100%;
                }

                .table-container {
                    overflow-x: auto;
                }

                .col-numero {
                    font-size: 12px;
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

function addLegajosStyles() {
    if (!document.getElementById('legajos-styles')) {
        const style = document.createElement('style');
        style.id = 'legajos-styles';
        style.textContent = `
            .legajos-module {
                animation: fadeIn 0.3s ease;
            }

            .module-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid var(--border-color);
            }

            .header-title {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .header-icon {
                font-size: 32px;
            }

            .module-header h2 {
                font-size: 28px;
                margin: 0;
                color: var(--text-primary);
            }

            .btn {
                padding: 10px 20px;
                border: none;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: var(--transition);
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .btn-primary {
                background-color: var(--primary-color);
                color: white;
            }

            .btn-primary:hover {
                background-color: var(--secondary-color);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(13, 115, 119, 0.2);
            }

            .btn-icon {
                font-size: 16px;
            }

            .filters-section {
                background-color: var(--bg-primary);
                border-radius: 8px;
                padding: 25px;
                margin-bottom: 30px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }

            .filter-group {
                display: flex;
                gap: 8px;
                margin-bottom: 15px;
            }

            .filter-input,
            .filter-select {
                flex: 1;
                padding: 10px 15px;
                border: 1px solid var(--border-color);
                border-radius: 6px;
                font-family: inherit;
                font-size: 14px;
                transition: var(--transition);
            }

            .filter-input:focus,
            .filter-select:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(13, 115, 119, 0.1);
            }

            .filter-input::placeholder {
                color: var(--text-tertiary);
            }

            .filter-btn {
                padding: 10px 15px;
                background-color: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: 6px;
                cursor: pointer;
                font-size: 16px;
                transition: var(--transition);
                flex-shrink: 0;
            }

            .filter-btn:hover {
                background-color: var(--primary-color);
                color: white;
                border-color: var(--primary-color);
            }

            .filter-row {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-bottom: 15px;
            }

            .filter-group label {
                display: block;
                font-size: 12px;
                font-weight: 600;
                color: var(--text-secondary);
                margin-bottom: 5px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .date-input {
                padding: 10px 15px;
            }

            .filter-checkbox {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-top: 15px;
                padding-top: 15px;
                border-top: 1px solid var(--border-color);
            }

            .filter-checkbox input[type="checkbox"] {
                width: 18px;
                height: 18px;
                cursor: pointer;
                accent-color: var(--primary-color);
            }

            .filter-checkbox label {
                cursor: pointer;
                font-size: 14px;
                color: var(--text-primary);
                margin: 0;
                text-transform: none;
                letter-spacing: normal;
            }

            .results-section {
                background-color: var(--bg-primary);
                border-radius: 8px;
                min-height: 400px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .results-placeholder {
                text-align: center;
                color: var(--text-secondary);
            }

            .placeholder-icon {
                font-size: 64px;
                display: block;
                margin-bottom: 15px;
            }

            .results-placeholder p {
                font-size: 16px;
                margin: 0;
            }

            @media (max-width: 768px) {
                .module-header {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 15px;
                }

                .btn-primary {
                    width: 100%;
                    justify-content: center;
                }

                .filter-row {
                    grid-template-columns: 1fr;
                }

                .filter-group {
                    flex-direction: column;
                }

                .filter-btn {
                    width: 100%;
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
