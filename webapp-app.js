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
        component: loadDesempenio
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
        component: loadCalendario
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
        component: loadReportes
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
        component: loadCasos
    },
    biblioteca: {
        title: 'Biblioteca',
        component: loadBiblioteca
    },
    'tablero-comercial': {
        title: 'Tablero Comercial',
        component: loadTableroPersonal
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
function loadTableroPersonal(container) {
    container.innerHTML = `
        <div class="tablero-module">
            <div class="tablero-header">
                <div class="header-left">
                    <span class="tablero-icon">🏆</span>
                    <h2>Tablero de Requerimientos de Personal</h2>
                </div>
                <div class="period-selector">
                    <label>PERÍODO:</label>
                    <select class="period-select">
                        <option>SEPTIEMBRE 2026</option>
                        <option>AGOSTO 2026</option>
                        <option>JULIO 2026</option>
                    </select>
                    <span class="date-range">2026-08-25 — 2026-09-24</span>
                </div>
            </div>

            <div class="tablero-summary">
                <div class="summary-item">
                    <span class="summary-label">Total Requerido</span>
                    <span class="summary-value">156</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Cubierto</span>
                    <span class="summary-value" style="color: var(--success-color);">89</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Porcentaje Cubierto</span>
                    <span class="summary-value" style="color: var(--primary-color);">57%</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Pendiente</span>
                    <span class="summary-value" style="color: var(--danger-color);">67</span>
                </div>
            </div>

            <div class="table-wrapper">
                <table class="tablero-table">
                    <thead>
                        <tr>
                            <th class="col-departamento">Departamento</th>
                            <th colspan="6" class="section-header">SOLICITADO</th>
                            <th colspan="6" class="section-header">APROBADO</th>
                            <th colspan="5" class="section-header">CUBIERTO</th>
                            <th class="section-header">%</th>
                        </tr>
                        <tr>
                            <th class="col-departamento"></th>
                            <th>Hoy</th>
                            <th>Prev</th>
                            <th>Aprob</th>
                            <th>Arrastre</th>
                            <th>Total</th>
                            <th>Obj</th>
                            <th>Hoy</th>
                            <th>Prev</th>
                            <th>Aprob</th>
                            <th>Arrastre</th>
                            <th>Total</th>
                            <th>Base</th>
                            <th>Hoy</th>
                            <th>Prev</th>
                            <th>Aprob</th>
                            <th>Arrastre</th>
                            <th>Total</th>
                            <th>%</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="group-header">
                            <td colspan="19" style="font-weight: 700; background-color: #003d52; color: white;">DIRECCIÓN GENERAL</td>
                        </tr>
                        <tr>
                            <td class="col-departamento">Administración</td>
                            <td>0</td><td>3</td><td>1</td><td>0</td><td>4</td><td>5</td>
                            <td>0</td><td>3</td><td>1</td><td>0</td><td>4</td><td>68%</td>
                            <td>0</td><td>2</td><td>0</td><td>0</td><td>2</td><td class="progress-cell" style="background-color: #4CAF50;">50%</td>
                        </tr>
                        <tr>
                            <td class="col-departamento">Finanzas</td>
                            <td>0</td><td>5</td><td>2</td><td>1</td><td>8</td><td>8</td>
                            <td>0</td><td>5</td><td>2</td><td>1</td><td>8</td><td>92%</td>
                            <td>0</td><td>4</td><td>2</td><td>0</td><td>6</td><td class="progress-cell" style="background-color: #FFC107;">75%</td>
                        </tr>
                        <tr>
                            <td class="col-departamento">RRHH</td>
                            <td>0</td><td>2</td><td>1</td><td>0</td><td>3</td><td>3</td>
                            <td>0</td><td>2</td><td>1</td><td>0</td><td>3</td><td>85%</td>
                            <td>0</td><td>2</td><td>1</td><td>0</td><td>3</td><td class="progress-cell" style="background-color: #4CAF50;">100%</td>
                        </tr>
                        <tr class="group-header">
                            <td colspan="19" style="font-weight: 700; background-color: #003d52; color: white;">OPERACIONES</td>
                        </tr>
                        <tr>
                            <td class="col-departamento">Infraestructura</td>
                            <td>0</td><td>15</td><td>8</td><td>2</td><td>25</td><td>28</td>
                            <td>0</td><td>14</td><td>8</td><td>2</td><td>24</td><td>78%</td>
                            <td>0</td><td>10</td><td>5</td><td>1</td><td>16</td><td class="progress-cell" style="background-color: #4CAF50;">64%</td>
                        </tr>
                        <tr>
                            <td class="col-departamento">Operaciones</td>
                            <td>0</td><td>22</td><td>12</td><td>3</td><td>37</td><td>42</td>
                            <td>0</td><td>20</td><td>12</td><td>3</td><td>35</td><td>72%</td>
                            <td>0</td><td>16</td><td>8</td><td>2</td><td>26</td><td class="progress-cell" style="background-color: #FFC107;">70%</td>
                        </tr>
                        <tr>
                            <td class="col-departamento">Logística</td>
                            <td>0</td><td>8</td><td>4</td><td>1</td><td>13</td><td>15</td>
                            <td>0</td><td>7</td><td>4</td><td>1</td><td>12</td><td>68%</td>
                            <td>0</td><td>5</td><td>3</td><td>0</td><td>8</td><td class="progress-cell" style="background-color: #FF6B6B;">61%</td>
                        </tr>
                        <tr class="group-header">
                            <td colspan="19" style="font-weight: 700; background-color: #003d52; color: white;">ATENCIÓN AL CLIENTE</td>
                        </tr>
                        <tr>
                            <td class="col-departamento">Call Center</td>
                            <td>0</td><td>35</td><td>20</td><td>5</td><td>60</td><td>68</td>
                            <td>0</td><td>32</td><td>20</td><td>5</td><td>57</td><td>80%</td>
                            <td>0</td><td>28</td><td>18</td><td>4</td><td>50</td><td class="progress-cell" style="background-color: #4CAF50;">83%</td>
                        </tr>
                        <tr>
                            <td class="col-departamento">Soporte</td>
                            <td>0</td><td>12</td><td>8</td><td>2</td><td>22</td><td>25</td>
                            <td>0</td><td>11</td><td>8</td><td>2</td><td>21</td><td>76%</td>
                            <td>0</td><td>9</td><td>6</td><td>1</td><td>16</td><td class="progress-cell" style="background-color: #FFC107;">73%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    addTableroStyles();
}

function loadReportes(container) {
    container.innerHTML = `
        <div class="reportes-module">
            <div class="reportes-header">
                <div class="header-title">
                    <span class="reportes-icon">📊</span>
                    <h2>Reportes</h2>
                </div>
            </div>

            <div class="tab-buttons">
                <button class="tab-btn active" data-tab="personal">Requerimientos de Personal</button>
                <button class="tab-btn" data-tab="administrativo">Objetivos Administrativos</button>
            </div>

            <!-- TAB: REQUERIMIENTOS DE PERSONAL -->
            <div class="tab-content active" id="personal-tab">
                <div class="report-controls">
                    <div class="control-group">
                        <label class="control-label">
                            <input type="checkbox" id="realtime-toggle"> Monitoreo en tiempo real
                        </label>
                    </div>
                </div>

                <div class="date-range-section">
                    <div class="date-group">
                        <label>Desde</label>
                        <input type="date" class="date-input" value="2026-08-25">
                    </div>
                    <div class="date-group">
                        <label>Hasta</label>
                        <input type="date" class="date-input" value="2026-09-24">
                    </div>
                </div>

                <div class="filters-section">
                    <div class="filter-label">Departamentos</div>
                    <div class="filter-options">
                        <label class="filter-radio">
                            <input type="radio" name="dept" value="all" checked> Todos los Departamentos
                        </label>
                        <label class="filter-radio">
                            <input type="radio" name="dept" value="adminstrativo"> Dirección General
                        </label>
                        <label class="filter-radio">
                            <input type="radio" name="dept" value="operaciones"> Operaciones
                        </label>
                        <label class="filter-radio">
                            <input type="radio" name="dept" value="cliente"> Atención al Cliente
                        </label>
                    </div>
                </div>

                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-number">156</div>
                        <div class="metric-label">Total Requerido</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-number">89</div>
                        <div class="metric-label">Cubierto</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-number">57%</div>
                        <div class="metric-label">Porcentaje Cubierto</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-number">67</div>
                        <div class="metric-label">Pendiente</div>
                    </div>
                </div>

                <div class="charts-container">
                    <div class="chart-box">
                        <div class="chart-title">Cobertura por Departamento</div>
                        <div class="chart-placeholder">
                            <svg viewBox="0 0 100 100" style="width: 200px; height: 200px;">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#4CAF50" stroke-width="8" stroke-dasharray="75.4 251.2" transform="rotate(-90 50 50)"/>
                                <circle cx="50" cy="50" r="30" fill="white"/>
                                <text x="50" y="50" text-anchor="middle" dy=".3em" font-size="20" font-weight="bold">57%</text>
                            </svg>
                            <div class="chart-label">Promedio de Cobertura: 57%</div>
                        </div>
                    </div>
                    <div class="chart-box">
                        <div class="chart-title">Distribución de Vacantes</div>
                        <div class="chart-placeholder">
                            <svg viewBox="0 0 100 100" style="width: 200px; height: 200px;">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#FF6B6B" stroke-width="8" stroke-dasharray="62.7 251.2" transform="rotate(-90 50 50)"/>
                                <circle cx="50" cy="50" r="25" fill="white"/>
                                <text x="50" y="50" text-anchor="middle" dy=".3em" font-size="16" font-weight="bold">67</text>
                                <text x="50" y="65" text-anchor="middle" dy=".3em" font-size="12" fill="#666">Vacantes</text>
                            </svg>
                            <div class="chart-label">Posiciones por cubrir: 67</div>
                        </div>
                    </div>
                </div>

                <div class="time-period-buttons">
                    <button class="period-btn active">Por Días</button>
                    <button class="period-btn">Por Horas</button>
                </div>
            </div>

            <!-- TAB: OBJETIVOS ADMINISTRATIVOS -->
            <div class="tab-content" id="administrativo-tab">
                <div class="report-controls">
                    <div class="control-group">
                        <label class="control-label">
                            <input type="checkbox" id="realtime-toggle-2"> Monitoreo en tiempo real
                        </label>
                    </div>
                </div>

                <div class="date-range-section">
                    <div class="date-group">
                        <label>Desde</label>
                        <input type="date" class="date-input" value="2026-08-25">
                    </div>
                    <div class="date-group">
                        <label>Hasta</label>
                        <input type="date" class="date-input" value="2026-09-24">
                    </div>
                </div>

                <div class="filters-section">
                    <div class="filter-label">Áreas</div>
                    <div class="filter-options">
                        <label class="filter-radio">
                            <input type="radio" name="area" value="all" checked> Todas las Áreas
                        </label>
                        <label class="filter-radio">
                            <input type="radio" name="area" value="produccion"> Producción
                        </label>
                        <label class="filter-radio">
                            <input type="radio" name="area" value="calidad"> Calidad
                        </label>
                        <label class="filter-radio">
                            <input type="radio" name="area" value="eficiencia"> Eficiencia
                        </label>
                    </div>
                </div>

                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-number">12</div>
                        <div class="metric-label">Objetivos Totales</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-number">8</div>
                        <div class="metric-label">En Progreso</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-number">67%</div>
                        <div class="metric-label">Cumplimiento</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-number">4</div>
                        <div class="metric-label">Pendiente</div>
                    </div>
                </div>

                <div class="charts-container">
                    <div class="chart-box">
                        <div class="chart-title">Cumplimiento de Objetivos</div>
                        <div class="chart-placeholder">
                            <svg viewBox="0 0 100 100" style="width: 200px; height: 200px;">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#4CAF50" stroke-width="8" stroke-dasharray="84.5 251.2" transform="rotate(-90 50 50)"/>
                                <circle cx="50" cy="50" r="30" fill="white"/>
                                <text x="50" y="50" text-anchor="middle" dy=".3em" font-size="20" font-weight="bold">67%</text>
                            </svg>
                            <div class="chart-label">Promedio de Cumplimiento: 67%</div>
                        </div>
                    </div>
                    <div class="chart-box">
                        <div class="chart-title">Estado de Objetivos</div>
                        <div class="chart-placeholder">
                            <div style="display: flex; gap: 20px; justify-content: center; padding: 40px;">
                                <div style="text-align: center;">
                                    <div style="font-size: 32px; font-weight: bold; color: #4CAF50;">8</div>
                                    <div style="font-size: 12px; color: #666;">En Progreso</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="font-size: 32px; font-weight: bold; color: #FFC107;">2</div>
                                    <div style="font-size: 12px; color: #666;">Atrasados</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="font-size: 32px; font-weight: bold; color: #4CAF50;">2</div>
                                    <div style="font-size: 12px; color: #666;">Completados</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="time-period-buttons">
                    <button class="period-btn active">Por Días</button>
                    <button class="period-btn">Por Horas</button>
                </div>
            </div>
        </div>
    `;

    addReportesStyles();
    addReportesEventListeners(container);
}

function addReportesEventListeners(container) {
    const tabBtns = container.querySelectorAll('.tab-btn');
    const tabContents = container.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            const tabElement = container.querySelector(`#${tabName}-tab`);
            if (tabElement) {
                tabElement.classList.add('active');
            }
        });
    });
}

function addReportesStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .reportes-module {
            animation: fadeIn 0.3s ease-in;
        }

        .reportes-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid var(--border-color);
        }

        .header-title {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .reportes-icon {
            font-size: 32px;
        }

        .reportes-header h2 {
            margin: 0;
            font-size: 24px;
            color: var(--text-primary);
        }

        .tab-buttons {
            display: flex;
            gap: 15px;
            margin-bottom: 25px;
            border-bottom: 2px solid var(--border-color);
        }

        .tab-btn {
            padding: 12px 20px;
            background: none;
            border: none;
            border-bottom: 3px solid transparent;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-secondary);
            cursor: pointer;
            transition: all 0.3s;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .tab-btn:hover {
            color: var(--primary-color);
        }

        .tab-btn.active {
            color: var(--primary-color);
            border-bottom-color: var(--primary-color);
        }

        .tab-content {
            display: none;
            animation: fadeIn 0.3s ease-in;
        }

        .tab-content.active {
            display: block;
        }

        .report-controls {
            margin-bottom: 20px;
        }

        .control-group {
            display: flex;
            align-items: center;
        }

        .control-label {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            font-size: 14px;
            color: var(--text-primary);
            margin: 0;
        }

        .control-label input[type="checkbox"] {
            width: 18px;
            height: 18px;
            cursor: pointer;
            accent-color: var(--primary-color);
        }

        .date-range-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 25px;
        }

        .date-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .date-group label {
            font-size: 12px;
            font-weight: 600;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .date-input {
            padding: 10px 15px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-size: 14px;
            color: var(--text-primary);
            background-color: var(--bg-primary);
        }

        .filters-section {
            margin-bottom: 25px;
            padding: 15px;
            background-color: var(--bg-secondary);
            border-radius: 8px;
        }

        .filter-label {
            font-size: 12px;
            font-weight: 600;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 12px;
        }

        .filter-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
        }

        .filter-radio {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            font-size: 14px;
            color: var(--text-primary);
            margin: 0;
        }

        .filter-radio input[type="radio"] {
            width: 18px;
            height: 18px;
            cursor: pointer;
            accent-color: var(--primary-color);
        }

        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-bottom: 25px;
        }

        .metric-card {
            background-color: var(--bg-secondary);
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            border-left: 4px solid var(--primary-color);
        }

        .metric-number {
            font-size: 28px;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 8px;
        }

        .metric-label {
            font-size: 12px;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .charts-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 25px;
        }

        .chart-box {
            background-color: var(--bg-secondary);
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }

        .chart-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 15px;
        }

        .chart-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            min-height: 250px;
            justify-content: center;
        }

        .chart-label {
            font-size: 13px;
            color: var(--text-secondary);
            margin-top: 10px;
        }

        .time-period-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-top: 20px;
        }

        .period-btn {
            padding: 12px 30px;
            background-color: var(--bg-secondary);
            border: 2px solid transparent;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-secondary);
            cursor: pointer;
            transition: all 0.3s;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .period-btn:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
        }

        .period-btn.active {
            background-color: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }

        @media (max-width: 768px) {
            .metrics-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .charts-container {
                grid-template-columns: 1fr;
            }

            .tab-buttons {
                flex-direction: column;
                gap: 0;
                border-bottom: none;
            }

            .tab-btn {
                border-bottom: none;
                border-top: 2px solid var(--border-color);
            }

            .tab-btn.active {
                border-top-color: var(--primary-color);
                border-bottom: none;
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

function loadCalendario(container) {
    const nombres = ['AARON', 'ABIGAIL', 'ADA', 'ADRIAN', 'ADRIANA', 'AGOSTINA', 'AGUSTIN', 'AILEN', 'ALEJANDRA', 'ALEJANDRO', 'ALFONSINA', 'ALICIA', 'ALMA', 'ALMENDRA', 'ALONSO', 'ALVARO', 'AMALIA', 'AMANDA', 'AMELIA'];
    const apellidos = ['MANSILLA', 'OLIVAREZ', 'PEREZ', 'MORNACCO', 'VAZQUEZ', 'VALITUTTI', 'ANTEQUE', 'SCHIAVO', 'CASALE', 'CRUZ', 'ARANO', 'ESTRELLA', 'RUBIO', 'CORIA', 'CALZADA'];
    const roles = ['PROGRAMADOR', 'ASESOR', 'DIRECTOR', 'GERENTE', 'AUXILIAR', 'SUPERVISOR', 'CONTADOR', 'ADMINISTRATIVO'];
    const emojis = ['👨‍💼', '👩‍💼', '👨‍🔧', '👩‍🔧', '👨‍💻', '👩‍💻', '👨‍🎓', '👩‍🎓'];

    const getRandomName = () => {
        const nombre = nombres[Math.floor(Math.random() * nombres.length)];
        const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
        return `${nombre} ${apellido}`;
    };

    const generatePeople = (count) => {
        const people = [];
        const usedNames = new Set();
        for (let i = 0; i < count; i++) {
            let name;
            do {
                name = getRandomName();
            } while (usedNames.has(name));
            usedNames.add(name);
            const statusArray = ['✅', '🏥', '❌', '📅'];
            people.push({
                name: name,
                role: roles[Math.floor(Math.random() * roles.length)],
                emoji: emojis[Math.floor(Math.random() * emojis.length)],
                status: statusArray[Math.floor(Math.random() * 4)]
            });
        }
        return people;
    };

    const year = 2026, month = 7;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    let calendarHtml = '';
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab', 'Dom'];
    days.forEach(day => {
        calendarHtml += `<div class="day-header">${day}</div>`;
    });

    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarHtml += '<div class="day-cell other-month"></div>';
    }

    const statusArray = ['✅', '🏥', '❌', '📅'];
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === 28;
        const status = statusArray[Math.floor(Math.random() * 4)];
        calendarHtml += `<div class="day-cell ${isToday ? 'today' : ''}">
            <div class="day-number">${day}</div>
            <div class="day-indicator">${status}</div>
        </div>`;
    }

    const people = generatePeople(15);
    let peopleHtml = '';
    people.forEach(person => {
        peopleHtml += `
            <div class="person-item">
                <div class="person-avatar">${person.emoji}</div>
                <div class="person-info">
                    <div class="person-name">${person.name}</div>
                    <div class="person-role">${person.role}</div>
                </div>
                <div class="person-status">${person.status}</div>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="calendario-module">
            <div class="calendario-content">
                <div class="calendar-container">
                    <div class="calendar-header">
                        <h2>Agosto 2026</h2>
                        <div class="calendar-nav">
                            <button class="nav-btn">← Anterior</button>
                            <button class="nav-btn">Siguiente →</button>
                            <button class="nav-btn">Hoy</button>
                        </div>
                    </div>

                    <div class="calendar-grid">
                        ${calendarHtml}
                    </div>

                    <div style="padding: 15px; background: var(--bg-secondary); border-radius: 6px; font-size: 12px; color: var(--text-secondary);">
                        Mostrando 1 - 50 de 342 en total
                    </div>
                </div>

                <div class="people-sidebar">
                    <div class="people-header">Personal</div>
                    <div class="tabs-group">
                        <button class="tab-item active">Compañía</button>
                        <button class="tab-item">Mi</button>
                    </div>
                    <div class="people-list">
                        ${peopleHtml}
                    </div>
                    <div class="legend">
                        <div style="font-weight: 600; margin-bottom: 10px;">Leyenda</div>
                        <div class="legend-item">
                            <span class="legend-icon">✅</span>
                            <span>Presente</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-icon">🏥</span>
                            <span>Licencia</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-icon">❌</span>
                            <span>Ausencia</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-icon">📅</span>
                            <span>Vacaciones</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    addCalendarioStyles();
}

function addCalendarioStyles() {
    if (!document.getElementById('calendario-styles')) {
        const style = document.createElement('style');
        style.id = 'calendario-styles';
        style.textContent = `
            .calendario-module {
                animation: fadeIn 0.3s ease;
            }

            .calendario-content {
                display: flex;
                gap: 20px;
                height: calc(100vh - 200px);
            }

            .calendar-container {
                flex: 1;
                background: white;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                overflow-y: auto;
            }

            .calendar-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 2px solid var(--border-color);
            }

            .calendar-header h2 {
                margin: 0;
                font-size: 20px;
                color: var(--text-primary);
            }

            .calendar-nav {
                display: flex;
                gap: 10px;
            }

            .nav-btn {
                padding: 6px 12px;
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                transition: all 0.3s;
            }

            .nav-btn:hover {
                background: var(--border-color);
            }

            .calendar-grid {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 2px;
                background: var(--border-color);
                padding: 2px;
                border-radius: 4px;
                margin-bottom: 20px;
            }

            .day-header {
                background: var(--primary-color);
                color: white;
                padding: 12px;
                text-align: center;
                font-weight: 600;
                font-size: 12px;
            }

            .day-cell {
                background: white;
                padding: 8px;
                min-height: 80px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            .day-number {
                font-weight: 700;
                font-size: 14px;
                color: var(--text-primary);
                margin-bottom: 5px;
            }

            .day-indicator {
                font-size: 20px;
            }

            .day-cell.other-month {
                background: var(--bg-secondary);
            }

            .day-cell.today {
                background: #E3F2FD;
                border: 2px solid var(--primary-color);
            }

            .people-sidebar {
                width: 280px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                overflow-y: auto;
                display: flex;
                flex-direction: column;
            }

            .people-header {
                padding: 15px;
                border-bottom: 2px solid var(--border-color);
                font-weight: 600;
                font-size: 14px;
                color: var(--text-primary);
            }

            .tabs-group {
                display: flex;
                gap: 0;
                border-bottom: 1px solid var(--border-color);
            }

            .tab-item {
                flex: 1;
                padding: 10px;
                background: white;
                border: none;
                cursor: pointer;
                font-size: 11px;
                font-weight: 600;
                color: var(--text-secondary);
                border-bottom: 2px solid transparent;
                transition: all 0.3s;
            }

            .tab-item.active {
                color: var(--primary-color);
                border-bottom-color: var(--primary-color);
            }

            .tab-item:hover {
                background: var(--bg-secondary);
            }

            .people-list {
                flex: 1;
                overflow-y: auto;
                padding: 10px;
            }

            .person-item {
                display: flex;
                gap: 10px;
                padding: 10px;
                margin-bottom: 8px;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s;
                background: white;
                border: 1px solid var(--border-color);
            }

            .person-item:hover {
                background: var(--bg-secondary);
                transform: translateX(3px);
            }

            .person-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                flex-shrink: 0;
            }

            .person-info {
                flex: 1;
                min-width: 0;
            }

            .person-name {
                font-size: 12px;
                font-weight: 600;
                color: var(--text-primary);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .person-role {
                font-size: 11px;
                color: var(--text-secondary);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .person-status {
                font-size: 18px;
                margin-right: 5px;
            }

            .legend {
                padding: 15px;
                border-top: 1px solid var(--border-color);
                font-size: 11px;
            }

            .legend-item {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 8px;
            }

            .legend-icon {
                font-size: 16px;
                width: 20px;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

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
                <h2>Asistencia</h2>
            </div>

            <div class="main-tabs">
                <button class="main-tab-btn active" onclick="switchAsistenciaMainTab(event, 'general')">Asistencia General</button>
                <button class="main-tab-btn" onclick="switchAsistenciaMainTab(event, 'relojes')">Relojes Estado</button>
                <button class="main-tab-btn" onclick="switchAsistenciaMainTab(event, 'reportes')">Reportes de Asistencia</button>
            </div>

            <!-- ASISTENCIA GENERAL TAB -->
            <div class="main-tab-content active" id="general-tab">
                <div class="asistencia-header-inner">
                    <div class="header-left">
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

            <!-- RELOJES ESTADO TAB -->
            <div class="main-tab-content" id="relojes-tab">
                <div class="relojes-container">
                    <div class="relojes-section">
                        <h3 class="section-title">Administración</h3>
                        <div class="relojes-grid">
                            <div class="reloj-card">
                                <div class="reloj-nombre">ALVEAR 1</div>
                                <div class="reloj-timestamp">28/08/2026 09:37</div>
                                <div class="reloj-status online">Conectado</div>
                            </div>
                            <div class="reloj-card">
                                <div class="reloj-nombre">ALVEAR 2</div>
                                <div class="reloj-timestamp">28/08/2026 09:37</div>
                                <div class="reloj-status online">Conectado</div>
                            </div>
                        </div>
                    </div>

                    <div class="relojes-section">
                        <h3 class="section-title">Finanzas</h3>
                        <div class="relojes-grid">
                            <div class="reloj-card">
                                <div class="reloj-nombre">BOWEN</div>
                                <div class="reloj-timestamp">28/08/2026 09:37</div>
                                <div class="reloj-status online">Conectado</div>
                            </div>
                            <div class="reloj-card">
                                <div class="reloj-nombre">FAMILIA</div>
                                <div class="reloj-timestamp">28/08/2026 09:37</div>
                                <div class="reloj-status online">Conectado</div>
                            </div>
                        </div>
                    </div>

                    <div class="relojes-section">
                        <h3 class="section-title">RRHH</h3>
                        <div class="relojes-grid">
                            <div class="reloj-card">
                                <div class="reloj-nombre">JUZGADO</div>
                                <div class="reloj-timestamp">28/08/2026 09:37</div>
                                <div class="reloj-status online">Conectado</div>
                            </div>
                            <div class="reloj-card">
                                <div class="reloj-nombre">POLI</div>
                                <div class="reloj-timestamp">28/08/2026 09:37</div>
                                <div class="reloj-status online">Conectado</div>
                            </div>
                        </div>
                    </div>

                    <div class="relojes-section">
                        <h3 class="section-title">Operaciones</h3>
                        <div class="relojes-grid">
                            <div class="reloj-card">
                                <div class="reloj-nombre">CARMENSA</div>
                                <div class="reloj-timestamp">28/08/2026 09:37</div>
                                <div class="reloj-status online">Conectado</div>
                            </div>
                            <div class="reloj-card">
                                <div class="reloj-nombre">MATADERO</div>
                                <div class="reloj-timestamp">28/08/2026 09:37</div>
                                <div class="reloj-status offline">Desconectado</div>
                            </div>
                            <div class="reloj-card">
                                <div class="reloj-nombre">OESTE</div>
                                <div class="reloj-timestamp">28/08/2026 09:37</div>
                                <div class="reloj-status online">Conectado</div>
                            </div>
                        </div>
                    </div>

                    <div class="relojes-section">
                        <h3 class="section-title">Atención al Cliente</h3>
                        <div class="relojes-grid">
                            <div class="reloj-card">
                                <div class="reloj-nombre">SPAT 1</div>
                                <div class="reloj-timestamp">28/08/2026 09:37</div>
                                <div class="reloj-status online">Conectado</div>
                            </div>
                            <div class="reloj-card">
                                <div class="reloj-nombre">SPAT 2</div>
                                <div class="reloj-timestamp">28/08/2026 09:37</div>
                                <div class="reloj-status online">Conectado</div>
                            </div>
                        </div>
                    </div>

                    <div class="relojes-section">
                        <h3 class="section-title">Contingencia</h3>
                        <div class="relojes-grid">
                            <div class="reloj-card">
                                <div class="reloj-nombre">CONTINGENCIA</div>
                                <div class="reloj-timestamp">28/08/2026 09:37</div>
                                <div class="reloj-status online">Conectado</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- REPORTES DE ASISTENCIA TAB -->
            <div class="main-tab-content" id="reportes-tab">
                <div class="reportes-asistencia">
                    <div class="reportes-header">
                        <h3>Reportes de Asistencia por Departamento</h3>
                        <button class="refresh-btn" onclick="refreshReportesAsistencia()" title="Actualizar datos">🔄 Actualizar</button>
                    </div>

                    <div class="reportes-charts">
                        <div class="chart-container">
                            <h4>Asistencia General</h4>
                            <canvas id="asistencia-chart" width="400" height="200"></canvas>
                        </div>
                        <div class="chart-container">
                            <h4>Distribución por Departamento</h4>
                            <canvas id="departamento-chart" width="400" height="200"></canvas>
                        </div>
                    </div>

                    <h4 style="margin-top: 30px; margin-bottom: 15px;">Detalles por Departamento</h4>
                    <div class="reportes-grid">
                        <div class="reporte-card">
                            <div class="reporte-titulo">Administración</div>
                            <div class="reporte-chart">
                                <svg viewBox="0 0 100 100" class="progress-circle">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" stroke-width="8"/>
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#4CAF50" stroke-width="8" stroke-dasharray="214.5 254.47" transform="rotate(-90 50 50)"/>
                                    <text x="50" y="55" text-anchor="middle" font-size="18" font-weight="bold">95%</text>
                                </svg>
                            </div>
                            <div class="reporte-stat">Presentes: <strong>19/20</strong></div>
                            <div class="reporte-stat">Ausentes: <strong>1</strong></div>
                            <div class="reporte-stat">Tardanzas: <strong>1</strong></div>
                        </div>
                        <div class="reporte-card">
                            <div class="reporte-titulo">Finanzas</div>
                            <div class="reporte-chart">
                                <svg viewBox="0 0 100 100" class="progress-circle">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" stroke-width="8"/>
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#4CAF50" stroke-width="8" stroke-dasharray="248.88 254.47" transform="rotate(-90 50 50)"/>
                                    <text x="50" y="55" text-anchor="middle" font-size="18" font-weight="bold">98%</text>
                                </svg>
                            </div>
                            <div class="reporte-stat">Presentes: <strong>49/50</strong></div>
                            <div class="reporte-stat">Ausentes: <strong>0</strong></div>
                            <div class="reporte-stat">Tardanzas: <strong>1</strong></div>
                        </div>
                        <div class="reporte-card">
                            <div class="reporte-titulo">RRHH</div>
                            <div class="reporte-chart">
                                <svg viewBox="0 0 100 100" class="progress-circle">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" stroke-width="8"/>
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#4CAF50" stroke-width="8" stroke-dasharray="254.47 254.47" transform="rotate(-90 50 50)"/>
                                    <text x="50" y="55" text-anchor="middle" font-size="18" font-weight="bold">100%</text>
                                </svg>
                            </div>
                            <div class="reporte-stat">Presentes: <strong>15/15</strong></div>
                            <div class="reporte-stat">Ausentes: <strong>0</strong></div>
                            <div class="reporte-stat">Tardanzas: <strong>0</strong></div>
                        </div>
                        <div class="reporte-card">
                            <div class="reporte-titulo">Operaciones</div>
                            <div class="reporte-chart">
                                <svg viewBox="0 0 100 100" class="progress-circle">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" stroke-width="8"/>
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#FFC107" stroke-width="8" stroke-dasharray="233.58 254.47" transform="rotate(-90 50 50)"/>
                                    <text x="50" y="55" text-anchor="middle" font-size="18" font-weight="bold">92%</text>
                                </svg>
                            </div>
                            <div class="reporte-stat">Presentes: <strong>69/75</strong></div>
                            <div class="reporte-stat">Ausentes: <strong>3</strong></div>
                            <div class="reporte-stat">Tardanzas: <strong>2</strong></div>
                        </div>
                        <div class="reporte-card">
                            <div class="reporte-titulo">Atención al Cliente</div>
                            <div class="reporte-chart">
                                <svg viewBox="0 0 100 100" class="progress-circle">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" stroke-width="8"/>
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#FF6B6B" stroke-width="8" stroke-dasharray="223.93 254.47" transform="rotate(-90 50 50)"/>
                                    <text x="50" y="55" text-anchor="middle" font-size="18" font-weight="bold">88%</text>
                                </svg>
                            </div>
                            <div class="reporte-stat">Presentes: <strong>44/50</strong></div>
                            <div class="reporte-stat">Ausentes: <strong>5</strong></div>
                            <div class="reporte-stat">Tardanzas: <strong>3</strong></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    addAsistenciaStyles();
    addAsistenciaEventListeners();
}

function switchAsistenciaMainTab(evt, tab) {
    evt.preventDefault();
    document.querySelectorAll('.main-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.main-tab-content').forEach(c => c.classList.remove('active'));
    evt.target.classList.add('active');
    document.getElementById(tab + '-tab').classList.add('active');
}

function addAsistenciaEventListeners() {
    const mainTabBtns = document.querySelectorAll('.main-tab-btn');
    mainTabBtns.forEach(btn => {
        btn.addEventListener('click', switchAsistenciaMainTab);
    });
}

function refreshReportesAsistencia() {
    console.log('Actualizando datos de reportes...');
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
    const nombres = ['Carlos', 'María', 'Juan', 'Ana', 'Pedro', 'Rosa', 'Luis', 'Laura', 'Diego', 'Martina', 'Francisco', 'Isabel', 'Andrés', 'Beatriz', 'Roberto'];
    const apellidos = ['García', 'López', 'Martínez', 'Rodríguez', 'Pérez', 'Fernández', 'González', 'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Ruiz', 'Castro', 'Morales', 'Vargas'];
    const puestos = ['Gerente', 'Analista', 'Coordinador', 'Especialista', 'Asistente', 'Supervisor', 'Jefe de Proyecto', 'Consultor', 'Técnico', 'Administrador'];
    const departamentos = ['RRHH', 'IT', 'Contabilidad', 'Operaciones', 'Ventas', 'Marketing', 'Legal', 'Logística'];
    const ubicaciones = ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza'];
    const colores = ['6366f1', '0891b2', 'dc2626', '16a34a', 'ea580c', '9333ea', 'd946ef', 'ec4899'];

    const generateEmployee = (index) => {
        const nombre = nombres[Math.floor(Math.random() * nombres.length)];
        const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
        const puesto = puestos[Math.floor(Math.random() * puestos.length)];
        const dpto = departamentos[Math.floor(Math.random() * departamentos.length)];
        const ubicacion = ubicaciones[Math.floor(Math.random() * ubicaciones.length)];
        const iniciales = nombre[0] + apellido[0];
        const color = colores[Math.floor(Math.random() * colores.length)];
        const fechaIngreso = new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
        const manager = nombres[Math.floor(Math.random() * nombres.length)] + ' ' + apellidos[Math.floor(Math.random() * apellidos.length)];

        return {
            nombre: `${nombre} ${apellido}`,
            iniciales,
            puesto,
            dpto,
            ubicacion,
            manager,
            fecha: fechaIngreso.toLocaleDateString('es-AR'),
            color
        };
    };

    const empleados = Array.from({length: 18}, (_, i) => generateEmployee(i));

    let filteredEmpleados = empleados;

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
                    <input type="text" id="nombreFilter" placeholder="Buscar por nombre..." class="filter-input">
                </div>

                <div class="filter-group">
                    <select id="deptoFilter" class="filter-select">
                        <option value="">Todos los Departamentos</option>
                        ${departamentos.map(d => `<option value="${d}">${d}</option>`).join('')}
                    </select>
                </div>

                <div class="filter-group">
                    <select id="ubicacionFilter" class="filter-select">
                        <option value="">Todas las Ubicaciones</option>
                        ${ubicaciones.map(u => `<option value="${u}">${u}</option>`).join('')}
                    </select>
                </div>
            </div>

            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Puesto</th>
                            <th>Departamento</th>
                            <th>Ubicación</th>
                            <th>Manager</th>
                            <th>Comenzó en</th>
                        </tr>
                    </thead>
                    <tbody id="legajosTable">
                        ${empleados.map(emp => `
                            <tr class="empleado-row" data-nombre="${emp.nombre.toLowerCase()}" data-dpto="${emp.dpto}" data-ubicacion="${emp.ubicacion}">
                                <td class="nombre-cell">
                                    <div class="employee-info">
                                        <img src="https://ui-avatars.com/api/?name=${emp.iniciales}&background=${emp.color}&color=fff&bold=true" alt="${emp.nombre}" class="avatar">
                                        <span>${emp.nombre}</span>
                                    </div>
                                </td>
                                <td>${emp.puesto}</td>
                                <td>${emp.dpto}</td>
                                <td>${emp.ubicacion}</td>
                                <td>${emp.manager}</td>
                                <td>${emp.fecha}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    addLegajosStyles();

    const nombreInput = container.querySelector('#nombreFilter');
    const deptoSelect = container.querySelector('#deptoFilter');
    const ubicacionSelect = container.querySelector('#ubicacionFilter');

    const filterTable = () => {
        const nombreValue = nombreInput.value.toLowerCase();
        const deptoValue = deptoSelect.value;
        const ubicacionValue = ubicacionSelect.value;

        document.querySelectorAll('.empleado-row').forEach(row => {
            const nombre = row.dataset.nombre;
            const dpto = row.dataset.dpto;
            const ubicacion = row.dataset.ubicacion;

            const matchNombre = nombre.includes(nombreValue);
            const matchDpto = !deptoValue || dpto === deptoValue;
            const matchUbicacion = !ubicacionValue || ubicacion === ubicacionValue;

            row.style.display = matchNombre && matchDpto && matchUbicacion ? '' : 'none';
        });
    };

    nombreInput.addEventListener('keyup', filterTable);
    deptoSelect.addEventListener('change', filterTable);
    ubicacionSelect.addEventListener('change', filterTable);
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

function addTableroStyles() {
    if (!document.getElementById('tablero-styles')) {
        const style = document.createElement('style');
        style.id = 'tablero-styles';
        style.textContent = `
            .tablero-module {
                animation: fadeIn 0.3s ease;
            }

            .tablero-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                padding-bottom: 20px;
                border-bottom: 2px solid var(--border-color);
            }

            .header-left {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .tablero-icon {
                font-size: 32px;
            }

            .tablero-header h2 {
                font-size: 28px;
                margin: 0;
                color: var(--text-primary);
            }

            .period-selector {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .period-selector label {
                font-weight: 600;
                font-size: 12px;
                text-transform: uppercase;
                color: var(--text-secondary);
            }

            .period-select {
                padding: 8px 12px;
                border: 1px solid var(--border-color);
                border-radius: 4px;
                font-family: inherit;
                font-size: 13px;
                background-color: var(--bg-primary);
            }

            .date-range {
                font-size: 12px;
                color: var(--text-secondary);
                white-space: nowrap;
            }

            .tablero-summary {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 15px;
                margin-bottom: 25px;
                background-color: var(--bg-secondary);
                padding: 20px;
                border-radius: 8px;
            }

            .summary-item {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .summary-label {
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                color: var(--text-secondary);
            }

            .summary-value {
                font-size: 28px;
                font-weight: 700;
                color: var(--text-primary);
            }

            .table-wrapper {
                background-color: var(--bg-primary);
                border-radius: 8px;
                overflow-x: auto;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }

            .tablero-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
            }

            .tablero-table thead {
                background-color: #F0F0F0;
                border-bottom: 2px solid var(--border-color);
                position: sticky;
                top: 0;
                z-index: 10;
            }

            .tablero-table th {
                padding: 10px 8px;
                text-align: center;
                font-weight: 600;
                color: var(--text-primary);
                border-right: 1px solid var(--border-color);
                white-space: nowrap;
            }

            .tablero-table th:last-child {
                border-right: none;
            }

            .col-departamento {
                text-align: left !important;
                font-weight: 600;
                min-width: 160px;
                background-color: var(--bg-secondary);
                position: sticky;
                left: 0;
                z-index: 5;
            }

            .section-header {
                background-color: #E8E8E8;
                font-weight: 700;
                text-transform: uppercase;
                font-size: 11px;
            }

            .tablero-table td {
                padding: 10px 8px;
                text-align: center;
                border-right: 1px solid #E0E0E0;
                border-bottom: 1px solid #E0E0E0;
            }

            .tablero-table td:last-child {
                border-right: none;
            }

            .group-header {
                background-color: #003d52 !important;
                font-weight: 700;
                color: white !important;
            }

            .tablero-table tbody tr:nth-child(odd):not(.group-header) {
                background-color: #F9F9F9;
            }

            .progress-cell {
                font-weight: 600;
                color: white;
            }

            @media (max-width: 768px) {
                .period-selector {
                    flex-direction: column;
                    align-items: flex-start;
                }

                .tablero-summary {
                    grid-template-columns: repeat(2, 1fr);
                }

                .table-wrapper {
                    font-size: 11px;
                }
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
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

            .main-tabs {
                display: flex;
                gap: 15px;
                margin-bottom: 25px;
                border-bottom: 2px solid var(--border-color);
            }

            .main-tab-btn {
                padding: 12px 20px;
                background: none;
                border: none;
                border-bottom: 3px solid transparent;
                cursor: pointer;
                font-size: 14px;
                color: var(--text-secondary);
                font-weight: 600;
                transition: var(--transition);
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .main-tab-btn:hover {
                color: var(--primary-color);
            }

            .main-tab-btn.active {
                color: var(--primary-color);
                border-bottom-color: var(--primary-color);
            }

            .main-tab-content {
                display: none;
                animation: fadeIn 0.3s ease;
            }

            .main-tab-content.active {
                display: block;
            }

            .asistencia-header-inner {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }

            .relojes-container {
                animation: fadeIn 0.3s ease;
            }

            .relojes-section {
                margin-bottom: 35px;
            }

            .section-title {
                font-size: 14px;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 15px;
                padding: 10px 0;
                border-bottom: 2px solid var(--border-color);
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .relojes-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 15px;
                margin-bottom: 20px;
            }

            .reloj-card {
                background: white;
                border: 1px solid var(--border-color);
                border-radius: 6px;
                padding: 15px;
                text-align: center;
                transition: var(--transition);
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            }

            .reloj-card:hover {
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                transform: translateY(-2px);
            }

            .reloj-nombre {
                font-size: 14px;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 8px;
            }

            .reloj-timestamp {
                font-size: 12px;
                color: var(--text-secondary);
                margin-bottom: 10px;
            }

            .reloj-status {
                display: inline-block;
                padding: 6px 12px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
            }

            .reloj-status.online {
                background-color: #E8F5E9;
                color: #2E7D32;
            }

            .reloj-status.offline {
                background-color: #FFEBEE;
                color: #C62828;
            }

            .reportes-asistencia {
                animation: fadeIn 0.3s ease;
            }

            .reportes-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 2px solid var(--border-color);
            }

            .reportes-header h3 {
                margin: 0;
                font-size: 18px;
                color: var(--text-primary);
            }

            .reportes-charts {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 25px;
                margin-bottom: 30px;
                background: var(--bg-secondary);
                padding: 20px;
                border-radius: 8px;
            }

            .chart-container {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .chart-container h4 {
                margin: 0 0 15px 0;
                font-size: 14px;
                color: var(--text-primary);
            }

            .reportes-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 20px;
            }

            .reporte-card {
                background: white;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                transition: var(--transition);
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            }

            .reporte-card:hover {
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                transform: translateY(-3px);
            }

            .reporte-titulo {
                font-size: 14px;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 2px solid var(--border-color);
            }

            .reporte-chart {
                display: flex;
                justify-content: center;
                margin-bottom: 15px;
                height: 120px;
            }

            .progress-circle {
                width: 100%;
                height: 100%;
            }

            .reporte-stat {
                font-size: 12px;
                color: var(--text-secondary);
                margin: 8px 0;
                line-height: 1.6;
            }

            .reporte-stat strong {
                color: var(--primary-color);
                font-weight: 700;
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

            .table-container {
                background-color: var(--bg-primary);
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }

            .data-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 14px;
            }

            .data-table thead {
                background-color: var(--bg-secondary);
                border-bottom: 2px solid var(--border-color);
            }

            .data-table th {
                padding: 15px;
                text-align: left;
                font-weight: 600;
                color: var(--text-secondary);
                text-transform: uppercase;
                font-size: 12px;
                letter-spacing: 0.5px;
            }

            .data-table td {
                padding: 15px;
                border-bottom: 1px solid var(--border-color);
                color: var(--text-primary);
            }

            .data-table tbody tr {
                transition: var(--transition);
            }

            .data-table tbody tr:hover {
                background-color: var(--bg-secondary);
            }

            .employee-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .avatar {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid var(--border-color);
            }

            .nombre-cell {
                font-weight: 500;
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

function loadCasos(container) {
    const casosData = {
        asignado: [
            {
                id: 1,
                title: 'Caso de urgente atención',
                days: 2,
                status: 'pending',
                createdDate: 'Creado hace 2 días'
            }
        ],
        creado: [
            {
                id: 2,
                title: 'Incidente de sistema crítico',
                days: 2,
                status: 'pending',
                createdDate: 'Creado hace 2 días'
            },
            {
                id: 3,
                title: 'Solicitud de información',
                days: 60,
                status: 'resolved',
                createdDate: 'Creado hace 2 meses'
            },
            {
                id: 4,
                title: 'Reporte de irregularidades',
                days: 120,
                status: 'critical',
                createdDate: 'Creado hace 4 meses'
            }
        ]
    };

    const html = `
        <div class="casos-module">
            <div class="casos-header">
                <h2>Casos</h2>
                <div class="casos-actions">
                    <a href="#" class="link-irregularidades">Denuncia de irregularidades</a>
                    <button class="btn-crear-caso">+ Crear un caso</button>
                </div>
            </div>

            <div class="casos-tabs">
                <button class="tab-btn active" onclick="switchCasosTab(this, 'asignado')">
                    Asignado a mi
                    <span class="tab-count">0</span>
                </button>
                <button class="tab-btn" onclick="switchCasosTab(this, 'creado')">
                    Creado por mi
                    <span class="tab-count">3</span>
                </button>
            </div>

            <div class="casos-content">
                <div id="asignado-content" class="casos-list active">
                    ${casosData.asignado.map(caso => `
                        <div class="caso-item">
                            <div class="caso-status">
                                ${caso.status === 'resolved' ? '✓' : '○'}
                            </div>
                            <div class="caso-info">
                                <h3 class="caso-title">${caso.title}</h3>
                                <p class="caso-date">${caso.createdDate}</p>
                            </div>
                            <div class="caso-action">
                                <button class="btn-star">⭐</button>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div id="creado-content" class="casos-list">
                    ${casosData.creado.map(caso => `
                        <div class="caso-item ${caso.status}">
                            <div class="caso-status ${caso.status}">
                                ${caso.status === 'resolved' ? '✓' : caso.status === 'critical' ? '⚠️' : '⭐'}
                            </div>
                            <div class="caso-info">
                                <h3 class="caso-title">${caso.title}</h3>
                                <p class="caso-date">${caso.createdDate}</p>
                            </div>
                            <div class="caso-action">
                                <button class="btn-star">⭐</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="casos-footer">
                Mostrando 1 - ${Math.max(casosData.asignado.length, casosData.creado.length)} de ${casosData.creado.length} en total
            </div>
        </div>
    `;

    container.innerHTML = html;
    addCasosStyles();
}

function switchCasosTab(button, tabName) {
    const tabsContainer = button.parentElement;
    const tabButtons = tabsContainer.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const allLists = document.querySelectorAll('.casos-list');
    allLists.forEach(list => list.classList.remove('active'));

    const activeList = document.getElementById(`${tabName}-content`);
    if (activeList) {
        activeList.classList.add('active');
    }
}

function addCasosStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .casos-module {
            padding: 30px;
            background-color: var(--bg-secondary);
            border-radius: 8px;
            animation: fadeIn 0.3s ease-in;
        }

        .casos-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            gap: 20px;
        }

        .casos-header h2 {
            margin: 0;
            font-size: 28px;
            color: var(--text-primary);
        }

        .casos-actions {
            display: flex;
            gap: 15px;
            align-items: center;
        }

        .link-irregularidades {
            color: var(--primary-color);
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .link-irregularidades:hover {
            color: var(--secondary-color);
            text-decoration: underline;
        }

        .btn-crear-caso {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s ease;
            white-space: nowrap;
        }

        .btn-crear-caso:hover {
            background-color: var(--secondary-color);
        }

        .casos-tabs {
            display: flex;
            gap: 20px;
            border-bottom: 2px solid var(--border-color);
            margin-bottom: 30px;
        }

        .tab-btn {
            background: none;
            border: none;
            padding: 15px 0;
            font-size: 16px;
            font-weight: 500;
            color: var(--text-secondary);
            cursor: pointer;
            border-bottom: 3px solid transparent;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .tab-btn.active {
            color: var(--primary-color);
            border-bottom-color: var(--primary-color);
        }

        .tab-count {
            background-color: var(--primary-color);
            color: white;
            border-radius: 12px;
            padding: 2px 8px;
            font-size: 12px;
            font-weight: 600;
        }

        .casos-content {
            margin-bottom: 20px;
            min-height: 300px;
        }

        .casos-list {
            display: none;
        }

        .casos-list.active {
            display: block;
            animation: fadeIn 0.3s ease-in;
        }

        .caso-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 20px;
            background-color: var(--bg-primary);
            border-radius: 8px;
            margin-bottom: 15px;
            border-left: 4px solid var(--border-color);
            transition: box-shadow 0.3s ease;
        }

        .caso-item:hover {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .caso-item.pending {
            border-left-color: var(--accent-color);
        }

        .caso-item.resolved {
            border-left-color: var(--success-color);
        }

        .caso-item.critical {
            border-left-color: var(--danger-color);
        }

        .caso-status {
            min-width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            background-color: var(--bg-secondary);
        }

        .caso-status.pending {
            border-color: var(--accent-color);
            color: var(--accent-color);
        }

        .caso-status.resolved {
            border-color: var(--success-color);
            color: var(--success-color);
            background-color: rgba(6, 168, 125, 0.1);
        }

        .caso-status.critical {
            border-color: var(--danger-color);
            color: var(--danger-color);
            background-color: rgba(214, 40, 40, 0.1);
        }

        .caso-info {
            flex: 1;
            min-width: 0;
        }

        .caso-title {
            margin: 0 0 5px 0;
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .caso-date {
            margin: 0;
            font-size: 13px;
            color: var(--text-secondary);
        }

        .caso-action {
            display: flex;
            gap: 10px;
        }

        .btn-star {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            padding: 5px;
            transition: transform 0.2s ease;
        }

        .btn-star:hover {
            transform: scale(1.1);
        }

        .casos-footer {
            text-align: center;
            color: var(--text-secondary);
            font-size: 14px;
            padding: 20px;
            background-color: var(--bg-primary);
            border-radius: 6px;
        }

        @media (max-width: 768px) {
            .casos-module {
                padding: 20px;
            }

            .casos-header {
                flex-direction: column;
                align-items: flex-start;
            }

            .casos-actions {
                flex-direction: column;
                width: 100%;
            }

            .btn-crear-caso {
                width: 100%;
                justify-content: center;
            }

            .caso-item {
                flex-wrap: wrap;
            }
        }
    `;
    document.head.appendChild(style);
}

function loadDesempenio(container) {
    const html = `
        <div class="desempenio-module">
            <div class="desempenio-header">
                <h2>Desempeño</h2>
            </div>

            <div class="desempenio-layout">
                <div class="desempenio-sidebar">
                    <nav class="desempenio-nav">
                        <button class="desempenio-nav-item active" onclick="switchDesempenioSection(this, '1:1s')">
                            <span class="nav-icon">👤</span>
                            <span class="nav-label">1:1s</span>
                        </button>
                        <button class="desempenio-nav-item" onclick="switchDesempenioSection(this, 'objetivos')">
                            <span class="nav-icon">🎯</span>
                            <span class="nav-label">Objetivos</span>
                        </button>
                        <button class="desempenio-nav-item" onclick="switchDesempenioSection(this, 'feedback')">
                            <span class="nav-icon">💬</span>
                            <span class="nav-label">Feedback</span>
                        </button>
                        <button class="desempenio-nav-item" onclick="switchDesempenioSection(this, 'kpi')">
                            <span class="nav-icon">📊</span>
                            <span class="nav-label">KPI</span>
                        </button>
                        <button class="desempenio-nav-item" onclick="switchDesempenioSection(this, 'evaluaciones')">
                            <span class="nav-icon">⭐</span>
                            <span class="nav-label">Evaluaciones</span>
                        </button>
                        <button class="desempenio-nav-item" onclick="switchDesempenioSection(this, 'planes')">
                            <span class="nav-icon">📋</span>
                            <span class="nav-label">Planes de desarrollo</span>
                        </button>
                    </nav>
                </div>

                <div class="desempenio-content">
                    <div id="1:1s-section" class="section-content active">
                        <div class="section-header">
                            <h3>1:1s</h3>
                            <p class="section-description">Reuniones uno a uno programadas y completadas</p>
                        </div>
                        <div class="content-placeholder">
                            <div class="placeholder-icon">👤</div>
                            <p>No hay 1:1s programadas</p>
                            <button class="btn-primary">Programar 1:1</button>
                        </div>
                    </div>

                    <div id="objetivos-section" class="section-content">
                        <div class="section-header">
                            <h3>Objetivos</h3>
                            <p class="section-description">Objetivos personales y de equipo</p>
                        </div>
                        <div class="content-placeholder">
                            <div class="placeholder-icon">🎯</div>
                            <p>No hay objetivos definidos</p>
                            <button class="btn-primary">Crear objetivo</button>
                        </div>
                    </div>

                    <div id="feedback-section" class="section-content">
                        <div class="section-header">
                            <h3>Feedback</h3>
                            <p class="section-description">Retroalimentación recibida y enviada</p>
                        </div>
                        <div class="content-placeholder">
                            <div class="placeholder-icon">💬</div>
                            <p>No hay feedback pendiente</p>
                            <button class="btn-primary">Solicitar feedback</button>
                        </div>
                    </div>

                    <div id="kpi-section" class="section-content">
                        <div class="section-header">
                            <h3>KPI</h3>
                            <p class="section-description">Indicadores clave de desempeño</p>
                        </div>
                        <div class="content-placeholder">
                            <div class="placeholder-icon">📊</div>
                            <p>No hay KPIs definidos</p>
                            <button class="btn-primary">Establecer KPI</button>
                        </div>
                    </div>

                    <div id="evaluaciones-section" class="section-content">
                        <div class="section-header">
                            <h3>Evaluaciones</h3>
                            <p class="section-description">Evaluaciones de desempeño periódicas</p>
                        </div>
                        <div class="content-placeholder">
                            <div class="placeholder-icon">⭐</div>
                            <p>No hay evaluaciones pendientes</p>
                            <button class="btn-primary">Ver historial</button>
                        </div>
                    </div>

                    <div id="planes-section" class="section-content">
                        <div class="section-header">
                            <h3>Planes de Desarrollo</h3>
                            <p class="section-description">Planes personalizados de crecimiento profesional</p>
                        </div>
                        <div class="content-placeholder">
                            <div class="placeholder-icon">📋</div>
                            <p>No hay planes de desarrollo</p>
                            <button class="btn-primary">Crear plan</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
    addDesempenioStyles();
}

function switchDesempenioSection(button, sectionId) {
    const navItems = button.parentElement.querySelectorAll('.desempenio-nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    button.classList.add('active');

    const allSections = document.querySelectorAll('.section-content');
    allSections.forEach(section => section.classList.remove('active'));

    const activeSection = document.getElementById(`${sectionId}-section`);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}

function addDesempenioStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .desempenio-module {
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 30px;
            background-color: var(--bg-secondary);
        }

        .desempenio-header {
            margin-bottom: 30px;
        }

        .desempenio-header h2 {
            margin: 0;
            font-size: 28px;
            color: var(--text-primary);
        }

        .desempenio-layout {
            display: flex;
            gap: 30px;
            flex: 1;
            min-height: 0;
        }

        .desempenio-sidebar {
            width: 200px;
            flex-shrink: 0;
        }

        .desempenio-nav {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .desempenio-nav-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            background-color: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            color: var(--text-secondary);
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: left;
        }

        .desempenio-nav-item:hover {
            background-color: var(--bg-secondary);
            border-color: var(--primary-color);
            color: var(--primary-color);
        }

        .desempenio-nav-item.active {
            background-color: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }

        .nav-icon {
            font-size: 18px;
        }

        .nav-label {
            white-space: nowrap;
        }

        .desempenio-content {
            flex: 1;
            min-width: 0;
            overflow-y: auto;
        }

        .section-content {
            display: none;
            animation: fadeIn 0.3s ease-in;
        }

        .section-content.active {
            display: block;
        }

        .section-header {
            margin-bottom: 30px;
        }

        .section-header h3 {
            margin: 0 0 10px 0;
            font-size: 24px;
            color: var(--text-primary);
        }

        .section-description {
            margin: 0;
            font-size: 14px;
            color: var(--text-secondary);
        }

        .content-placeholder {
            background-color: var(--bg-primary);
            border-radius: 8px;
            padding: 60px 40px;
            text-align: center;
            border: 2px dashed var(--border-color);
        }

        .placeholder-icon {
            font-size: 64px;
            display: block;
            margin-bottom: 20px;
        }

        .content-placeholder p {
            margin: 0 0 20px 0;
            font-size: 16px;
            color: var(--text-secondary);
        }

        .btn-primary {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 10px 24px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .btn-primary:hover {
            background-color: var(--secondary-color);
        }

        @media (max-width: 768px) {
            .desempenio-module {
                padding: 20px;
            }

            .desempenio-layout {
                flex-direction: column;
                gap: 20px;
            }

            .desempenio-sidebar {
                width: 100%;
            }

            .desempenio-nav {
                flex-direction: row;
                flex-wrap: wrap;
            }

            .desempenio-nav-item {
                flex: 1;
                min-width: 120px;
                justify-content: center;
                padding: 10px 12px;
                font-size: 12px;
            }

            .nav-label {
                display: none;
            }

            .desempenio-nav-item.active .nav-label {
                display: inline;
            }
        }
    `;
    document.head.appendChild(style);
}

function loadBiblioteca(container) {
    const categories = [
        { id: 'identidad', name: 'Identidad Corporativa', icon: '🎨' },
        { id: 'politicas', name: 'Políticas y Reglamentos', icon: '📋' },
        { id: 'procesos', name: 'Procesos', icon: '⚙️' },
        { id: 'reflexion', name: 'Espacio de reflexión', icon: '💭' },
        { id: 'tecnica', name: 'Formación Técnica', icon: '💻' },
        { id: 'blandas', name: 'Formación en Habilidades Blandas', icon: '🎯' },
        { id: 'beneficios', name: 'Beneficios Corporativos', icon: '🎁' },
        { id: 'peopleforce', name: 'Cómo uso People Force', icon: '👥' },
        { id: 'explica', name: 'GS Explica', icon: '📢' },
        { id: 'innova', name: 'GS Innova', icon: '💡' },
        { id: 'mundial', name: 'Copa Mundial 2026', icon: '⚽' },
        { id: 'raiz', name: 'Programa Raiz', icon: '🌱' }
    ];

    const documents = {
        identidad: [
            { title: 'Logo Global Solutions', description: 'Guía de uso del logo corporativo', docs: 3 },
            { title: 'Colores Corporativos', description: 'Paleta de colores oficial', docs: 2 },
            { title: 'Tipografía', description: 'Fuentes permitidas y estilos', docs: 2 }
        ],
        politicas: [
            { title: 'Código de Conducta', description: 'Normas de comportamiento laboral', docs: 5 },
            { title: 'Política de Privacidad', description: 'Protección de datos personales', docs: 3 },
            { title: 'Reglamento Interno', description: 'Normas de trabajo', docs: 4 }
        ],
        procesos: [
            { title: 'Proceso de Selección', description: 'Cómo se realiza la selección de personal', docs: 6 },
            { title: 'Onboarding', description: 'Inducción de nuevos empleados', docs: 4 },
            { title: 'Evaluación de Desempeño', description: 'Proceso de evaluación anual', docs: 5 }
        ],
        reflexion: [
            { title: 'Mindfulness', description: 'Técnicas de meditación y relajación', docs: 3 },
            { title: 'Trabajo en Equipo', description: 'Dinámicas de integración', docs: 4 },
            { title: 'Balance Vida-Trabajo', description: 'Consejos para la conciliación', docs: 3 }
        ],
        tecnica: [
            { title: 'Java Avanzado', description: 'Cursos de programación Java', docs: 8 },
            { title: 'Bases de Datos', description: 'SQL y NoSQL', docs: 6 },
            { title: 'Cloud Computing', description: 'AWS y Azure', docs: 7 }
        ],
        blandas: [
            { title: 'Liderazgo', description: 'Desarrollo de habilidades de liderazgo', docs: 5 },
            { title: 'Comunicación Efectiva', description: 'Mejora de la comunicación', docs: 4 },
            { title: 'Inteligencia Emocional', description: 'Gestión emocional', docs: 4 }
        ],
        beneficios: [
            { title: 'Plan de Salud', description: 'Cobertura médica y dental', docs: 3 },
            { title: 'Jubilación', description: 'Planes de retiro', docs: 4 },
            { title: 'Vacaciones', description: 'Políticas de licencias', docs: 2 }
        ],
        peopleforce: [
            { title: 'Login y Acceso', description: 'Cómo acceder a la plataforma', docs: 2 },
            { title: 'Gestión de Perfil', description: 'Actualizar información personal', docs: 3 },
            { title: 'Consultas Frecuentes', description: 'Preguntas comunes', docs: 4 }
        ],
        explica: [
            { title: 'Historia Global Solutions', description: 'Nuestra trayectoria', docs: 3 },
            { title: 'Misión y Visión', description: 'Nuestros objetivos', docs: 2 },
            { title: 'Valores Corporativos', description: 'Qué nos define', docs: 2 }
        ],
        innova: [
            { title: 'Proyectos en Desarrollo', description: 'Nuevas iniciativas', docs: 5 },
            { title: 'Innovación Digital', description: 'Transformación digital', docs: 4 },
            { title: 'Casos de Éxito', description: 'Proyectos completados', docs: 6 }
        ],
        mundial: [
            { title: 'Horarios de Transmisión', description: 'Cuándo ver los partidos', docs: 2 },
            { title: 'Equipos Participantes', description: 'Selecciones clasificadas', docs: 1 },
            { title: 'Normas para Seguir', description: 'Reglas del campeonato', docs: 3 }
        ],
        raiz: [
            { title: 'Programa de Sustentabilidad', description: 'Iniciativas ambientales', docs: 5 },
            { title: 'Responsabilidad Social', description: 'Acciones comunitarias', docs: 4 },
            { title: 'Voluntariado', description: 'Oportunidades de contribuir', docs: 3 }
        ]
    };

    let currentCategory = 'identidad';

    container.innerHTML = `
        <div class="biblioteca-module">
            <div class="biblioteca-header">
                <h2>Biblioteca Digital</h2>
                <div class="biblioteca-search">
                    <input type="text" id="bibliotecaSearch" placeholder="Buscar documentos..." class="search-input">
                    <span class="search-icon">🔍</span>
                </div>
            </div>

            <div class="biblioteca-layout">
                <aside class="biblioteca-sidebar">
                    <div class="biblioteca-categories">
                        ${categories.map(cat => `
                            <button class="category-item ${cat.id === currentCategory ? 'active' : ''}"
                                    data-category="${cat.id}">
                                <span class="category-icon">${cat.icon}</span>
                                <span class="category-name">${cat.name}</span>
                            </button>
                        `).join('')}
                    </div>
                </aside>

                <div class="biblioteca-content">
                    <div class="documents-grid" id="documentsGrid">
                        ${renderDocuments('identidad')}
                    </div>
                </div>
            </div>
        </div>
    `;

    function renderDocuments(categoryId) {
        const docs = documents[categoryId] || [];
        if (docs.length === 0) {
            return '<div class="no-documents">No hay documentos en esta categoría</div>';
        }
        return docs.map(doc => `
            <div class="document-card">
                <div class="document-icon">📄</div>
                <h3>${doc.title}</h3>
                <p>${doc.description}</p>
                <div class="document-footer">
                    <span class="doc-count">${doc.docs} documento${doc.docs !== 1 ? 's' : ''}</span>
                    <button class="btn-view">Ver</button>
                </div>
            </div>
        `).join('');
    }

    // Category selection handler
    const categoryButtons = container.querySelectorAll('.category-item');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            const grid = container.querySelector('#documentsGrid');
            grid.innerHTML = renderDocuments(currentCategory);
        });
    });

    // Search handler
    const searchInput = container.querySelector('#bibliotecaSearch');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const grid = container.querySelector('#documentsGrid');

        if (!searchTerm) {
            grid.innerHTML = renderDocuments(currentCategory);
            return;
        }

        let filteredDocs = [];
        for (const categoryId in documents) {
            documents[categoryId].forEach(doc => {
                if (doc.title.toLowerCase().includes(searchTerm) ||
                    doc.description.toLowerCase().includes(searchTerm)) {
                    filteredDocs.push({ ...doc, categoryId });
                }
            });
        }

        if (filteredDocs.length === 0) {
            grid.innerHTML = '<div class="no-documents">No se encontraron documentos</div>';
        } else {
            grid.innerHTML = filteredDocs.map(doc => `
                <div class="document-card">
                    <div class="document-icon">📄</div>
                    <h3>${doc.title}</h3>
                    <p>${doc.description}</p>
                    <div class="document-footer">
                        <span class="doc-count">${doc.docs} documento${doc.docs !== 1 ? 's' : ''}</span>
                        <button class="btn-view">Ver</button>
                    </div>
                </div>
            `).join('');
        }
    });

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .biblioteca-module {
            padding: 30px;
            background-color: var(--bg-secondary);
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .biblioteca-header {
            margin-bottom: 30px;
        }

        .biblioteca-header h2 {
            margin: 0 0 20px 0;
            font-size: 32px;
            color: var(--text-primary);
            font-weight: 700;
        }

        .biblioteca-search {
            position: relative;
            max-width: 400px;
        }

        .search-input {
            width: 100%;
            padding: 12px 40px 12px 16px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-size: 14px;
            background-color: var(--bg-primary);
            color: var(--text-primary);
            transition: border-color 0.3s ease;
        }

        .search-input:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(30, 90, 122, 0.1);
        }

        .search-icon {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-secondary);
            pointer-events: none;
        }

        .biblioteca-layout {
            display: flex;
            gap: 30px;
            flex: 1;
            min-height: 0;
        }

        .biblioteca-sidebar {
            width: 250px;
            flex-shrink: 0;
            background-color: var(--bg-primary);
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            overflow-y: auto;
        }

        .biblioteca-categories {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .category-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            border: none;
            background-color: transparent;
            border-radius: 6px;
            cursor: pointer;
            color: var(--text-primary);
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
            text-align: left;
        }

        .category-item:hover {
            background-color: var(--bg-secondary);
        }

        .category-item.active {
            background-color: var(--primary-color);
            color: white;
        }

        .category-icon {
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
        }

        .category-name {
            flex: 1;
            text-align: left;
        }

        .biblioteca-content {
            flex: 1;
            overflow-y: auto;
            min-width: 0;
        }

        .documents-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
        }

        .document-card {
            background-color: var(--bg-primary);
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
        }

        .document-card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
        }

        .document-icon {
            font-size: 32px;
            margin-bottom: 12px;
        }

        .document-card h3 {
            margin: 0 0 8px 0;
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .document-card p {
            margin: 0 0 16px 0;
            font-size: 13px;
            color: var(--text-secondary);
            flex: 1;
        }

        .document-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 12px;
            border-top: 1px solid var(--border-color);
        }

        .doc-count {
            font-size: 12px;
            color: var(--text-tertiary);
            font-weight: 500;
        }

        .btn-view {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 6px 16px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .btn-view:hover {
            background-color: var(--primary-light);
        }

        .no-documents {
            grid-column: 1 / -1;
            text-align: center;
            padding: 60px 20px;
            color: var(--text-secondary);
            background-color: var(--bg-primary);
            border-radius: 8px;
        }

        @media (max-width: 1024px) {
            .biblioteca-layout {
                gap: 20px;
            }

            .biblioteca-sidebar {
                width: 200px;
            }

            .documents-grid {
                grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            }
        }

        @media (max-width: 768px) {
            .biblioteca-module {
                padding: 20px;
            }

            .biblioteca-header h2 {
                font-size: 24px;
            }

            .biblioteca-search {
                max-width: 100%;
            }

            .biblioteca-layout {
                flex-direction: column;
                gap: 20px;
            }

            .biblioteca-sidebar {
                width: 100%;
            }

            .biblioteca-categories {
                flex-direction: row;
                flex-wrap: wrap;
                gap: 10px;
            }

            .category-item {
                flex: 1;
                min-width: 120px;
                justify-content: center;
                padding: 10px 12px;
                font-size: 12px;
            }

            .category-name {
                display: none;
            }

            .category-item.active .category-name {
                display: inline;
            }

            .documents-grid {
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 15px;
            }

            .document-card {
                padding: 15px;
            }

            .document-card h3 {
                font-size: 14px;
            }

            .document-card p {
                font-size: 12px;
            }
        }

        @media (max-width: 480px) {
            .biblioteca-module {
                padding: 15px;
            }

            .biblioteca-header h2 {
                font-size: 20px;
            }

            .documents-grid {
                grid-template-columns: 1fr;
            }

            .document-card {
                padding: 12px;
            }
        }
    `;
    document.head.appendChild(style);
}
