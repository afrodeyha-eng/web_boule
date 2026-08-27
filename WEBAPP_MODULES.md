# Boulé GovTech - Web App Modules

## Descripción General

La web app utiliza un sistema modular donde cada sección de la barra lateral carga un módulo específico. Los módulos están consolidados de los diferentes sistemas que viste en las imágenes de referencia.

## Acceso a la App

- **URL**: `webapp.html`
- **Requisitos**: Navegador moderno con soporte para ES6+
- **Responsive**: Funciona en desktop, tablet y mobile

---

## Módulos Disponibles

### 1. DASHBOARD (Inicio)
- **ID**: `dashboard`
- **Estado**: ✅ Implementado
- **Descripción**: Página principal con estadísticas, actividad reciente y accesos rápidos
- **Componentes**:
  - Grid de estadísticas (usuarios, tareas, completadas, reclamos)
  - Log de actividad reciente
  - Botones de acceso rápido a módulos frecuentes
- **Próximas mejoras**:
  - Gráficos interactivos
  - Widgets personalizables
  - Notificaciones en tiempo real

### 2. GESTIÓN OPERATIVA

#### 2.1 Asistencia
- **ID**: `asistencia`
- **Estado**: 📋 Estructura lista
- **Propósito**: Registrar y gestionar asistencia de personal
- **Características esperadas**:
  - Registro diario de entrada/salida
  - Justificantes y faltas
  - Reportes de asistencia
  - Integración con calendario

#### 2.2 Turnos
- **ID**: `turnos`
- **Estado**: 📋 Estructura lista
- **Propósito**: Gestión de horarios y asignación de turnos
- **Características esperadas**:
  - Calendario visual de turnos
  - Asignación automática
  - Cambios de turno solicitados
  - Disponibilidad de personal

#### 2.3 Equipos
- **ID**: `equipos`
- **Estado**: 📋 Estructura lista
- **Propósito**: Gestión de equipos y departamentos
- **Características esperadas**:
  - Listado de equipos
  - Miembros por equipo
  - Jerarquía organizacional
  - Responsables de equipo

#### 2.4 Feriados
- **ID**: `feriados`
- **Estado**: 📋 Estructura lista
- **Propósito**: Gestión de fechas especiales no laborales
- **Características esperadas**:
  - Calendario de feriados
  - Feriados nacionales y locales
  - Crear feriados personalizados
  - Importar calendarios

### 3. RECURSOS HUMANOS

#### 3.1 Legajos
- **ID**: `legajos`
- **Estado**: 📋 Estructura lista
- **Propósito**: Archivo digital de personal
- **Características esperadas**:
  - Datos personales
  - Documentos (contrato, DNI, etc)
  - Historial laboral
  - Certificados

#### 3.2 Agenda RRHH
- **ID**: `rrhh-agenda`
- **Estado**: 📋 Estructura lista
- **Propósito**: Calendario de eventos RRHH
- **Características esperadas**:
  - Entrevistas programadas
  - Capacitaciones
  - Evaluaciones
  - Notificaciones

#### 3.3 Cargos
- **ID**: `rrhh-cargos`
- **Estado**: 📋 Estructura lista
- **Propósito**: Gestión de posiciones y descripción de roles
- **Características esperadas**:
  - Catálogo de cargos
  - Descripción de funciones
  - Requisitos
  - Escala salarial

#### 3.4 Vacantes
- **ID**: `rrhh-vacantes`
- **Estado**: 📋 Estructura lista
- **Propósito**: Publicación y seguimiento de posiciones abiertas
- **Características esperadas**:
  - Crear vacantes
  - Postulantes
  - Seguimiento de candidatos
  - Integración con bolsa de trabajo

#### 3.5 Desempeño
- **ID**: `desempenio`
- **Estado**: 📋 Estructura lista
- **Propósito**: Evaluaciones de desempeño y KPIs
- **Características esperadas**:
  - Evaluaciones periódicas
  - Métricas de desempeño
  - Feedback 360
  - Planes de mejora

### 4. GESTIÓN DE RECLAMOS

#### 4.1 Auditorías/Reclamos
- **ID**: `auditorias`
- **Estado**: 📋 Estructura lista
- **Propósito**: Auditoría de reclamos y quejas
- **Características esperadas**:
  - Historial completo
  - Análisis de patrones
  - Reportes de auditoría
  - Trazabilidad

#### 4.2 Reclamos
- **ID**: `reclamos`
- **Estado**: 📋 Estructura lista
- **Propósito**: Registro y seguimiento de reclamos ciudadanos
- **Características esperadas**:
  - Formulario de ingreso
  - Estados de reclamo
  - Asignación a responsables
  - Notificaciones al ciudadano

#### 4.3 Mapa de Reclamos
- **ID**: `mapa-reclamos`
- **Estado**: 📋 Estructura lista
- **Propósito**: Visualización geográfica de reclamos
- **Características esperadas**:
  - Mapa interactivo
  - Filtros por zona/tipo
  - Heat maps de concentración
  - Análisis geoespacial

#### 4.4 Reclamos Resueltos
- **ID**: `reclamos-resueltos`
- **Estado**: 📋 Estructura lista
- **Propósito**: Archivo de reclamos cerrados y resueltos
- **Características esperadas**:
  - Historial de resoluciones
  - Tiempo promedio de cierre
  - Evaluación de soluciones
  - Satisfacción ciudadana

#### 4.5 Órdenes de Trabajo
- **ID**: `ordenes-trabajo`
- **Estado**: 📋 Estructura lista
- **Propósito**: Gestión de trabajos y mantenimiento
- **Características esperadas**:
  - Crear órdenes
  - Asignación a técnicos
  - Seguimiento en tiempo real
  - Reportes de avance

### 5. GESTIÓN DE SOLICITUDES

#### 5.1 Solicitudes
- **ID**: `solicitudes`
- **Estado**: 📋 Estructura lista
- **Propósito**: Gestión general de solicitudes
- **Características esperadas**:
  - Tipos de solicitud
  - Flujos de aprobación
  - Seguimiento de estado
  - Notificaciones

#### 5.2 Tareas
- **ID**: `tareas`
- **Estado**: 📋 Estructura lista
- **Propósito**: Gestión de tareas y TO-DO
- **Características esperadas**:
  - Crear tareas
  - Asignación a usuarios
  - Prioridades
  - Checklist
  - Vencimientos

#### 5.3 Pedidos de Insumos
- **ID**: `pedidos-insumos`
- **Estado**: 📋 Estructura lista
- **Propósito**: Gestión de solicitudes de materiales
- **Características esperadas**:
  - Catálogo de insumos
  - Crear pedidos
  - Aprobaciones
  - Seguimiento de entrega

#### 5.4 Reservas/Salas
- **ID**: `reservas`
- **Estado**: 📋 Estructura lista
- **Propósito**: Gestión de espacios y salas
- **Características esperadas**:
  - Calendario de disponibilidad
  - Reservar salas
  - Capacidad de espacios
  - Equipamiento

### 6. INFORMACIÓN Y REPORTES

#### 6.1 Reportes
- **ID**: `reportes`
- **Estado**: 📋 Estructura lista
- **Propósito**: Generación y visualización de reportes
- **Características esperadas**:
  - Reportes predefinidos
  - Reportes personalizados
  - Exportación (PDF, Excel)
  - Programación de reportes
  - Gráficos interactivos

#### 6.2 Documentos
- **ID**: `documentos`
- **Estado**: 📋 Estructura lista
- **Propósito**: Gestión documental
- **Características esperadas**:
  - Repositorio centralizado
  - Búsqueda de documentos
  - Control de versiones
  - Permisos de acceso

#### 6.3 Casos
- **ID**: `casos`
- **Estado**: 📋 Estructura lista
- **Propósito**: Gestión de casos y expedientes
- **Características esperadas**:
  - Crear casos
  - Seguimiento
  - Documentos asociados
  - Timeline de eventos

#### 6.4 Activos
- **ID**: `activos`
- **Estado**: 📋 Estructura lista
- **Propósito**: Gestión de inventario y activos
- **Características esperadas**:
  - Inventario de equipos
  - Asignación a usuarios
  - Mantenimiento
  - Depreciación

#### 6.5 Biblioteca
- **ID**: `biblioteca`
- **Estado**: 📋 Estructura lista
- **Propósito**: Repositorio de conocimiento y recursos
- **Características esperadas**:
  - Base de conocimiento
  - Manuales y guías
  - FAQs
  - Búsqueda semantica

### 7. CONFIGURACIÓN

#### 7.1 Notificaciones
- **ID**: `notificaciones`
- **Estado**: 📋 Estructura lista
- **Propósito**: Gestión de preferencias de notificaciones
- **Características esperadas**:
  - Preferencias de canales
  - Frecuencia de notificaciones
  - Filtros
  - Historial de notificaciones

#### 7.2 Ajustes
- **ID**: `ajustes`
- **Estado**: 📋 Estructura lista
- **Propósito**: Configuración general de la aplicación
- **Características esperadas**:
  - Perfil de usuario
  - Tema (claro/oscuro)
  - Idioma
  - Privacidad
  - Seguridad

### 8. CUENTA DE USUARIO

#### 8.1 Mi Cuenta
- **ID**: `mi-cuenta`
- **Estado**: 📋 Estructura lista
- **Propósito**: Gestión del perfil de usuario
- **Características esperadas**:
  - Información personal
  - Cambio de contraseña
  - Configuración de 2FA
  - Historial de acceso

---

## Arquitectura de Módulos

### Estructura de Carpetas Recomendada

```
/webapp
  /modules
    /asistencia
      - index.html
      - script.js
      - styles.css
    /turnos
      - index.html
      - script.js
      - styles.css
    /dashboard
      - index.html
      - script.js
      - styles.css
    ... (otros módulos)
  - webapp.html
  - webapp-app.js
  - webapp-styles.css
```

### Cómo Agregar un Nuevo Módulo

1. **Crear el módulo en `webapp-app.js`**:

```javascript
// En MODULES registry
nuevoModulo: {
    title: 'Título del Módulo',
    component: loadNuevoModulo
}

// Componente
function loadNuevoModulo(container) {
    container.innerHTML = `
        <!-- HTML del módulo -->
    `;
    // Agregar estilos si es necesario
    addNuevoModuloStyles();
}
```

2. **Agregar al sidebar en `webapp.html`**:

```html
<a href="#" class="nav-item" data-module="nuevo-modulo">
    <span class="nav-icon">🔧</span>
    <span class="nav-label">Nuevo Módulo</span>
</a>
```

3. **Los eventos se enlazan automáticamente** vía el JavaScript

---

## Próximas Fases

### Fase 1: Estructura Base ✅ COMPLETADA
- [x] Sidebar consolidada
- [x] Top bar con búsqueda
- [x] Dashboard
- [x] Sistema de carga modular

### Fase 2: Módulos de Gestión Operativa (Próxima)
- [ ] Asistencia
- [ ] Turnos
- [ ] Equipos
- [ ] Feriados

### Fase 3: Módulos de RRHH
- [ ] Legajos
- [ ] Agenda RRHH
- [ ] Cargos
- [ ] Vacantes
- [ ] Desempeño

### Fase 4: Módulos de Reclamos
- [ ] Auditorías
- [ ] Reclamos
- [ ] Mapa de Reclamos
- [ ] Órdenes de Trabajo

### Fase 5: Módulos Adicionales
- [ ] Reportes avanzados
- [ ] Integración con bases de datos
- [ ] APIs y webhooks
- [ ] Autenticación y permisos

---

## Notas Técnicas

- **Framework**: Vanilla JavaScript (sin dependencias)
- **Estilos**: CSS3 con variables personalizadas
- **Responsive**: Mobile-first
- **Navegadores soportados**: Chrome, Firefox, Safari, Edge (últimas versiones)
- **Tamaño base**: ~50KB (HTML + CSS + JS)

---

## Configuración de Desarrollo

Para agregar nuevas características:

1. Editar `webapp.html` para agregar elementos HTML
2. Editar `webapp-app.js` para agregar lógica
3. Editar `webapp-styles.css` para agregar estilos
4. Probar en navegador con F12 (DevTools)
5. Hacer commit y push a rama designada

---

## Soporte y Troubleshooting

**Problema**: El módulo no carga
- Verificar que el `data-module` en el HTML coincida con la clave en el objeto `MODULES`
- Revisar la consola (F12 → Console) para errores

**Problema**: Estilos no se aplican correctamente
- Verificar que los selectores CSS sean específicos
- Usar variables CSS (`:root`) en lugar de colores hardcodeados

**Problema**: Sidebar se cierra en mobile pero no debería
- Revisar la lógica en `handleWindowResize()`
- Verificar breakpoint de media queries

---

## Contacto y Contribuciones

Para agregar nuevos módulos o sugerencias:
- Crear una rama desde `claude/webapp-sidebar-hk8f6q`
- Seguir la estructura establecida
- Hacer commit con mensaje descriptivo
- Abrir PR para revisión
