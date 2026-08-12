// ================= DATA: FASES =================
function proc(name){ return { name }; }
function part(rol, funcion){ return { rol, funcion }; }

export const PHASES = [
  { id:"exploracion", label:"Prospección y Exploración",
    procesos:[ proc("Muestreo y geofísica"), proc("Cartografía regional"), proc("Modelo geológico") ],
    participantes:[ part("Geólogos","Reconocimiento y evaluación de recursos"), part("Geofísicos","Estudios de suelo y anomalías") ] },
  { id:"factibilidad", label:"Evaluación y Factibilidad",
    procesos:[ proc("Diseño de la mina"), proc("Estudios de rentabilidad"), proc("Impacto Ambiental (EIA)") ],
    participantes:[ part("Ingenieros de minas","Planificación de métodos"), part("Gerente financiero","Flujo de caja e inversión"), part("Consultores ambientales","Gestión de sostenibilidad"), part("Abogados","Revisión jurídica y titularidad") ] },
  { id:"construccion", label:"Desarrollo y Construcción",
    procesos:[ proc("Obras de infraestructura"), proc("Construcción de plantas"), proc("Accesos y energía") ],
    participantes:[ part("Empresas constructoras","Ejecución de obras"), part("Ingenieros civiles","Diseño estructural"), part("Proveedores","Logística, catering y salud") ] },
  { id:"produccion", label:"Producción o Explotación",
    procesos:[ proc("Extracción y transporte"), proc("Procesamiento y beneficio"), proc("Fundición y refinación"), proc("Mantenimiento preventivo") ],
    participantes:[ part("Operadores","Perforación, voladura y carguío"), part("Técnicos mecánicos","Soporte y revisiones"), part("Ingenieros químicos","Control de procesamiento"), part("Gerente de operaciones","Gestión productiva") ] },
  { id:"cierre", label:"Cierre y Post-Cierre",
    procesos:[ proc("Estabilización física y química"), proc("Rehabilitación ambiental"), proc("Monitoreo post-cierre") ],
    participantes:[ part("Especialistas en remediación","Restauración del sitio"), part("Autoridad Ambiental","Verificación de cumplimiento") ] },
  { id:"gobernanza", label:"Gobernanza y Control",
    procesos:[],
    participantes:[ part("Provincias","Dueñas de recursos y policía minera"), part("Secretaría de Nación","Políticas y asistencia"), part("Comunidades","Intercambio socioambiental") ] },
];

// ================= DATA: GEO =================
export const GEO_CATS = {
  exploracion:     { label:"Exploración",       color:"#00A896" },
  produccion:      { label:"Producción",        color:"#FF6B35" },
  ambiental:       { label:"Monitoreo Amb.",    color:"#2e9e4f" },
  comunidad:       { label:"Comunidad",         color:"#6b4fa0" },
  infraestructura: { label:"Infraestructura",   color:"#1c5fa8" },
};

export const MAP_CENTER = [-34.658, -68.345]; // San Rafael, Mendoza

// Puntos semilla — solo se usan si Firebase NO está configurado (modo memoria)
export const SEED_POINTS = [
  { name:"Frente de exploración Sur", cat:"exploracion",     lat:-34.720, lng:-68.420, desc:"Muestreo y geofísica en curso" },
  { name:"Planta de procesamiento",   cat:"produccion",      lat:-34.640, lng:-68.360, desc:"Beneficio y concentrado de mineral" },
  { name:"Estación piezómetro P-12",  cat:"ambiental",       lat:-34.665, lng:-68.300, desc:"Monitoreo de dique de relaves" },
  { name:"Mesa de diálogo Rama Caída",cat:"comunidad",       lat:-34.590, lng:-68.290, desc:"Relacionamiento comunitario" },
  { name:"Acceso y subestación",      cat:"infraestructura", lat:-34.700, lng:-68.340, desc:"Accesos y energía a faena" },
];
