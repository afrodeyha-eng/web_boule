// Boulé GovTech Bot Loader
// Chatbot widget que se carga como un script externo

(function() {
  'use strict';

  const BOT_CONFIG = {
    containerId: 'boule-bot-container',
    buttonId: 'boule-bot-btn',
    chatWindowId: 'boule-bot-chat',
    apiEndpoint: './bot-api.php',
    contactEmail: 'nestor.moscardo@gsolutions.com.ar',
    privacyContactEmail: 'experiencia@gsolutions.com.ar',
    iconSrc: 'assets/bot-icon.svg',
  };

  // Palabras inapropiadas: si el usuario las usa, el bot responde con calma
  // y respeto, sin repetirlas ni contestar de forma agresiva.
  const RUDE_WORDS = [
    'puta', 'puto', 'putas', 'putos', 'puteada', 'mierda', 'carajo',
    'pelotudo', 'pelotuda', 'boludo', 'boluda', 'forro', 'forra',
    'idiota', 'imbecil', 'estupido', 'estupida', 'tarado', 'tarada',
    'gil', 'giles', 'sorete', 'concha', 'pija', 'verga', 'mogolico',
    'mogolica', 'hdp', 'ladron', 'ladrones', 'chorro', 'chorros',
    'basura', 'inutil', 'inutiles', 'mediocre', 'mediocres'
  ];

  const RUDE_REGEX = new RegExp('\\b(' + RUDE_WORDS.join('|') + ')\\b', 'i');

  function normalizeText(text) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function containsRudeWords(text) {
    return RUDE_REGEX.test(normalizeText(text));
  }

  const POLITE_RESPONSE = `Lamento si algo te generó malestar. Estoy para ayudarte con respeto y buena predisposición. 🙏

Si preferís continuar la consulta con una persona de nuestro equipo, escribinos a **${BOT_CONFIG.contactEmail}** y te responderemos a la brevedad.`;

  const NO_ANSWER_RESPONSE = `Lo siento, no tengo una respuesta para esa consulta. Solo puedo responder sobre la información publicada en esta página (servicios, diferenciales, resultados, ubicación y contacto).

Para continuar tu consulta, escribinos a **${BOT_CONFIG.contactEmail}** y nuestro equipo te responderá a la brevedad. 📧`;

  // --- Protección de información confidencial ---
  // El bot solo comparte generalidades públicas sobre servicios y
  // metodología. Nunca comparte datos específicos de clientes, municipios
  // u organismos (volúmenes, contratos, facturación, datos personales,
  // credenciales, rutas de archivos, accesos a sistemas, etc.).

  const SENSITIVE_TERMS = [
    'factura', 'facturacion', 'cuanto factura', 'cuanto cobra', 'cuanto paga',
    'cuanto gana', 'contrato', 'acuerdo comercial', 'presupuesto interno',
    'credencial', 'contrasena', 'password', 'token de acceso',
    'ruta de archivo', 'carpeta de drive', 'estructura de carpetas',
    'pdf del contrato', 'pdfs de los contratos', 'donde trabaja',
    'datos personales', 'informacion interna', 'datos internos',
    'datos sensibles', 'detalles operativos', 'volumen operativo',
    'informacion operativa', 'acceso a los sistemas', 'informacion confidencial',
    'datos especificos', 'detalles especificos', 'informacion de drive',
    'que informacion tiene en drive'
  ];

  // Nombres de clientes/organismos: solo se puede responder de forma
  // genérica ("trabajamos con..."), nunca con detalles específicos.
  const CLIENT_NAMES = [
    'movistar', 'banco galicia', 'galicia', 'despegar', 'neotel',
    'municipio de san rafael', 'municipalidad de san rafael',
    'municipio de general alvear', 'municipalidad de general alvear',
    'municipio de gral. alvear', 'gobierno de mendoza'
  ];

  const SPECIFICS_WORDS = [
    'cuanto', 'cuantos', 'cuantas', 'detalle', 'detalles', 'dato', 'datos',
    'informacion', 'contrato', 'factura', 'facturacion', 'especifico',
    'especificos', 'confidencial'
  ];

  function isSensitiveQuery(text) {
    const norm = normalizeText(text);

    const hasSensitiveTerm = SENSITIVE_TERMS.some((t) => norm.includes(normalizeText(t)));
    if (hasSensitiveTerm) return true;

    const hasClientName = CLIENT_NAMES.some((c) => norm.includes(normalizeText(c)));
    const hasSpecificsWord = SPECIFICS_WORDS.some((w) => norm.includes(normalizeText(w)));

    return hasClientName && hasSpecificsWord;
  }

  const PRIVACY_RESPONSE = `Esa información es confidencial. No puedo compartir detalles específicos sobre clientes, municipios u organismos públicos. Solo puedo hablar sobre servicios y metodologías públicas.

Para consultas comerciales o específicas, contactate con: **${BOT_CONFIG.privacyContactEmail}**`;

  const INTENTS = {
    services: {
      keywords: ['servicio', 'servicios', 'qué ofrece', 'qué hace', 'soluciones', 'propuesta'],
      response: `Nuestra plataforma es modular. El alcance de cada servicio se define según lo que contrate cada organismo:

**En operación (Municipalidad de San Rafael):**
- Centro de Contacto — atención ciudadana
- Plataforma Legislativa — HCD de San Rafael

**En operación (Municipalidad de General Alvear):**
- Plataforma de gestión de recursos humanos

**Disponibles para implementación:**
- Visualización de Datos
- Formación (Impulsa GS+)
- Gestión y Recuperación de Activos (Cobranzas)
- Módulo Obras Privadas
- Smart Chatbot para atención ciudadana
- Atención integrada (ej. Licencias de Conducir)

**En desarrollo:**
- IA y analítica de interacciones (Speech Analytics)

¿Deseas más detalles sobre alguno de estos servicios?`
    },
    impulsa: {
      keywords: ['impulsa', 'habilidades blandas', 'habilidades comerciales', 'coaching ejecutivo'],
      response: `🎯 **Impulsa GS+** — Formación y Desarrollo

Desafiamos e impulsamos la mejor versión de las personas y su mundo: desbloqueamos el potencial de tu equipo para elevar tu organización al siguiente nivel.

**Líneas de trabajo:** Habilidades Blandas y Habilidades Comerciales.

**Nuestro proceso:** evaluación de necesidades, diseño de la capacitación, dictado, seguimiento post-capacitación, acompañamiento en la implementación (OJT) y acompañamiento personalizado.

**Beneficios clave:** auditorías internas de calidad, enfoque modular y flexible, sesiones de coaching ejecutivo y medición de resultados y satisfacción.

¿Querés más detalles sobre alguna etapa del proceso?`
    },
    speechAnalytics: {
      keywords: ['speech analytics', 'transcripcion automatica', 'analisis semantico', 'scoring automatizado', 'analitica de voz', 'analisis de grabaciones'],
      response: `🎙️ **Speech Analytics** — Tecnología con propósito, innovación con impacto

Transformamos conversaciones en conocimiento real: un módulo de calidad con escucha activa basada en IA que analiza interacciones entre asesores y clientes.

**Funcionalidades:**
- Transcripción automática (reconoce acentos, modismos y lenguaje coloquial)
- Análisis semántico y tonal (estado emocional, satisfacción, silencios prolongados)
- Detección de palabras clave configurable por campaña
- Scoring automatizado según criterios definidos

**Beneficios:** detección temprana de incumplimientos, escalabilidad (permite analizar el 100% de las interacciones) y mayor objetividad al eliminar sesgos humanos.

¿Te interesa alguna aplicación específica (ventas, postventa, cumplimiento)?`
    },
    obrasPrivadas: {
      keywords: ['obras privadas', 'permiso de obra', 'plano digital', 'inspeccion de obra', 'habitabilidad'],
      response: `🏗️ **Módulo Obras Privadas**

Damos trazabilidad al proceso de obras privadas, digitalizando tareas diarias y conectando las áreas involucradas.

**Perfiles:** Profesional de obra, Visador (aprueba o desaprueba planos digitales) e Inspector (registra visitas y estado de obra).

**Módulos:** Inicio de obra, Habitabilidades, Comercio e Inspección Ocular.

**Beneficios:** gestión 100% web sin software adicional, interfaz responsive, métricas en tiempo real, y soporte técnico y capacitación incluidos.

¿Querés conocer el detalle de algún módulo en particular?`
    },
    cobranzasDetalle: {
      keywords: ['cobranzas', 'recuperacion de activos', 'deudores', 'gestion de cobranza', 'mora'],
      response: `💰 **Gestión de Cobranzas**

Maximizamos la recuperación de activos financieros con estrategias disruptivas centradas en la experiencia del cliente.

**Metodología:** inteligencia de datos (machine learning para priorizar cartera), gestión omnicanal (teléfono, email, WhatsApp), adaptabilidad a los objetivos financieros de cada cliente y seguimiento analítico con KPIs.

**Resultados de referencia:** +35% de recuperación de activos, reducción de costos operativos por automatización, e implementación en aproximadamente 2 meses.

¿Querés más detalles sobre el proceso de gestión?`
    },
    smartChatbotDetalle: {
      keywords: ['smart chatbot', 'chatbot municipal', 'boleto digital', 'chatbot 24'],
      response: `🤖 **Smart Chatbot GS+** — Atención Ciudadana

Atención automatizada y personalizada para municipios, con funcionalidades como boleto digital, cursos y capacitaciones, información en tiempo real, reclamos y denuncias, turnos, multas de tránsito, consulta y pago de deudas, y agenda cultural.

Se integra mediante automatizaciones con bases de datos y servicios externos, y ofrece trazabilidad: monitoreo en tiempo real, identificación de zonas con más reclamos y registro para auditoría.

**Beneficios:** atención más rápida y ordenada, menor carga operativa y mayor cercanía con la comunidad.

El alcance de esta funcionalidad depende de lo que contrate cada organismo. ¿Querés saber más sobre alguna funcionalidad puntual?`
    },
    contactCenterDetalle: {
      keywords: ['contact center', 'centro de contacto detalle', 'equipo de asesores'],
      response: `📞 **Contact Center** — Atención al cliente omnicanal

A nivel corporativo, Global Solutions cuenta con un equipo de más de 480 asesores especializados en atención, ventas y cobranzas, capacitados para resolución ágil.

**Gestión omnicanal:** teléfono, email y WhatsApp, con metodología basada en inteligencia de datos, seguimiento analítico y adaptabilidad a cada perfil de cliente.

**Beneficios de referencia:** mejora en la recuperación de activos, reducción de costos operativos, implementación ágil e informes en tiempo real.

El alcance y la dotación de cada implementación se define según lo que contrate el organismo. ¿Te interesa conocer el proceso completo de atención?`
    },
    licenciasConducir: {
      keywords: ['licencia de conducir', 'licencias de conducir', 'carnet de conducir', 'registro de conducir'],
      response: `🪪 **Atención Integrada — Licencias de Conducir**

Un modelo de "un solo contacto, toda la solución": el ciudadano resuelve consultas y gestiona su turno en la misma interacción, por teléfono, WhatsApp, chat, web o correo electrónico.

**Incluye:** información sobre requisitos, documentación, costos y formas de pago, vigencia y renovación, y otorgamiento de turno en el mismo contacto.

**Beneficios:** trámites más simples y claros, menos traslados, menor carga de consultas presenciales y una gestión de turnos más eficiente para el organismo.

¿Querés conocer cómo se implementaría este modelo en tu organismo?`
    },
    contact: {
      keywords: ['contacto', 'contactar', 'comunicarse', 'teléfono', 'email', 'información'],
      response: `📧 **Contacto directo:**
Email: nestor.moscardo@gsolutions.com.ar
Email: alfonsina.coria@gsolutions.com.ar
Web: www.gsolutions.ar

¿Necesitas agendar una reunión? Puedo conectarte con nuestro equipo.`
    },
    location: {
      keywords: ['dónde', 'ubicación', 'localidad', 'san rafael', 'mendoza', 'oficina', 'direccion', 'dirección'],
      response: `📍 **Ubicación:**
Estamos en **San Lorenzo 50, San Rafael, Mendoza**, en pleno microcentro.
Contamos con sites propios operativos y flexibilidad para modelo híbrido en locaciones del Estado.

¿Te gustaría conocer más sobre nuestras instalaciones?`
    },
    capabilities: {
      keywords: ['capacidad', 'qué pueden', 'cuáles son', 'diferencial', 'ventaja', 'problema'],
      response: `💪 **Nuestros diferenciales:**
- **Descentralización**: personal especializado evita el embotellamiento de consultas
- **Filtro de consultas**: hasta un 70% de las consultas simples se resuelven por nuestros canales
- **Resolución en primer contacto**: la plataforma está preparada para integrarse con los sistemas de cada organismo, mediante las autorizaciones y desarrollos correspondientes
- **Omnicanalidad modular**: telefonía, WhatsApp, chatbot, redes sociales y otros canales digitales, según el alcance de cada implementación

¿Quieres saber más sobre alguno de estos aspectos?`
    },
    greeting: {
      keywords: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hi', 'hey', 'qué onda'],
      response: `👋 ¡Hola! Soy el bot de Boulé GovTech.

Puedo ayudarte con información sobre:
- Servicios que ofrecemos
- Cómo contactarnos
- Nuestros diferenciales
- Ubicación
- Y mucho más

¿En qué puedo ayudarte hoy?`
    },
    help: {
      keywords: ['ayuda', 'help', 'qué puedes', 'qué haces', 'cómo funciona'],
      response: `🤖 **¿Cómo funciono?**
Soy un asistente automático que responde solo sobre la información de esta página:
✓ Servicios que ofrecemos
✓ Información de contacto
✓ Nuestros diferenciales y resultados
✓ Ubicación e infraestructura

Escribe tus preguntas en lenguaje natural. Si no tengo la respuesta, te derivaré a nuestro mail de contacto para continuar la consulta.`
    },
    kpis: {
      keywords: ['kpi', 'métrica', 'metrica', 'resultado', 'fcr', 'tmo', 'sla', 'nps', 'medición', 'medicion', 'satisfacción', 'satisfaccion'],
      response: `📊 **Métricas que reportamos:**
- **FCR** - Resolución en el Primer Contacto: casos resueltos en la primera interacción
- **TMO** - Tiempo Medio de Operación: duración promedio de cada interacción
- **SLA** - Nivel de Servicio: llamadas atendidas dentro del tiempo objetivo
- **NPS** - Satisfacción del Ciudadano: experiencia percibida por quienes usan el servicio

¿Quieres saber más sobre alguna de estas métricas?`
    },
    diagnostico: {
      keywords: ['diagnóstico', 'diagnostico', 'diagnosticate', 'evaluación', 'evaluacion'],
      response: `📝 Podés hacer el diagnóstico de tu organismo desde la página "Diagnosticate" (botón en el menú superior).

Es una evaluación rápida que nos permite conocer tu situación actual y proponerte mejoras concretas.`
    },
    about: {
      keywords: ['quiénes son', 'quienes son', 'boulé', 'boule', 'empresa', 'global solutions', 'quién es', 'quien es', 'vision', 'visión', 'mision', 'misión', 'valores'],
      response: `Somos **Boulé GovTech**, by Global Solutions: una plataforma gubernamental integral y modular que conecta al Estado con los ciudadanos, empresas y organizaciones.

Actualmente acompañamos a la **Municipalidad de San Rafael** y a la **Municipalidad de General Alvear** con proyectos de atención ciudadana, gestión legislativa y administración de recursos humanos.

Boulé cuenta con el respaldo de la experiencia corporativa y operativa de **Global Solutions**, que ha prestado servicios para organizaciones como Movistar, Banco Galicia, Despegar y Prisma (antecedentes corporativos de Global Solutions).

Funcionamos como una capa central que se integra con los sistemas públicos existentes para complementarlos, sin necesidad de reemplazarlos.`
    },
    clients: {
      keywords: ['clientes', 'con quien trabajan', 'con quienes trabajan', 'trabajan con', 'municipios que atienden', 'organismos'],
      response: `**Clientes actuales de Boulé:** Municipalidad de San Rafael y Municipalidad de General Alvear.

**Antecedentes corporativos de Global Solutions:** Movistar, Banco Galicia, Despegar y Prisma.

Por privacidad, solo compartimos esta referencia general — no detalles específicos de cada operación. Para consultas puntuales, escribinos a nuestro contacto. 🤝`
    },
    integrations: {
      keywords: [
        'atm', 'registro civil', 'sistema de salud', 'sistemas de salud',
        'integracion con salud', 'integrado con salud', 'se integra con atm',
        'integracion con atm', 'integrado con atm', 'integracion con registro civil',
        'integrado con registro civil', 'sistemas provinciales', 'sistemas tributarios',
        'sistemas sanitarios', 'sistemas registrales'
      ],
      response: `Boulé no está integrado actualmente con sistemas como ATM, Registro Civil o Salud. Nuestra plataforma es modular y está preparada para integrarse con los sistemas de cada organismo cuando exista la autorización y el desarrollo correspondiente.

Cada solución se adapta al alcance específico contratado por el organismo. Para evaluar una integración puntual, escribinos a **${BOT_CONFIG.contactEmail}**.`
    },
    volumen: {
      keywords: [
        '89000', '89.000', 'llamadas actuales', 'atienden actualmente',
        'cuantas llamadas atienden', 'volumen actual', 'llamadas mensuales actuales'
      ],
      response: `La cifra de 89.000 interacciones mensuales corresponde a una capacidad proyectada de diseño, no al volumen que Boulé atiende actualmente. El volumen real depende del alcance contratado por cada organismo.

Actualmente acompañamos a la Municipalidad de San Rafael y a la Municipalidad de General Alvear. Para conocer el alcance de una implementación puntual, contactanos.`
    },
    meeting: {
      keywords: ['reunión', 'reunion', 'agendar', 'cita', 'demo', 'presupuesto', 'cotización', 'cotizacion'],
      response: `📅 Para agendar una reunión o pedir una propuesta, contactá directamente a:

Email: nestor.moscardo@gsolutions.com.ar
Email: alfonsina.coria@gsolutions.com.ar

Te responderemos a la brevedad.`
    }
  };

  function loadStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #boule-bot-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        font-family: 'Open Sans', sans-serif;
        z-index: 9999;
      }

      #boule-bot-btn {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: #ffffff;
        border: none;
        padding: 6px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(18, 169, 196, 0.4);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #boule-bot-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(18, 169, 196, 0.6);
      }

      #boule-bot-btn.is-hidden {
        display: none;
      }

      #boule-bot-btn img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .bot-header-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #ffffff;
        padding: 4px;
        object-fit: contain;
        flex-shrink: 0;
      }

      .bot-header-text {
        display: flex;
        flex-direction: column;
      }

      #boule-bot-chat {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 380px;
        height: 500px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
        display: none;
        flex-direction: column;
        overflow: hidden;
        animation: slideUp 0.3s ease;
      }

      #boule-bot-chat.is-open {
        display: flex;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .bot-header {
        background: linear-gradient(135deg, #1BA697, #12A9C4);
        color: white;
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .bot-header-title {
        font-weight: 600;
        font-size: 16px;
      }

      .bot-header-subtitle {
        font-size: 12px;
        opacity: 0.9;
      }

      .bot-close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .bot-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .bot-message {
        display: flex;
        gap: 8px;
        animation: messageSlide 0.3s ease;
      }

      @keyframes messageSlide {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .bot-message.user {
        flex-direction: row-reverse;
      }

      .bot-avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #eafaf8;
        flex-shrink: 0;
        object-fit: contain;
        padding: 2px;
      }

      .message-bubble {
        max-width: 70%;
        padding: 10px 14px;
        border-radius: 12px;
        font-size: 14px;
        line-height: 1.4;
        word-wrap: break-word;
        white-space: pre-line;
      }

      .message-bubble.bot a {
        color: #0B5F79;
        font-weight: 600;
      }

      .message-bubble.bot {
        background: #f0f0f0;
        color: #333;
      }

      .message-bubble.user {
        background: #0B5F79;
        color: white;
      }

      .bot-messages::-webkit-scrollbar {
        width: 6px;
      }

      .bot-messages::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      .bot-messages::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 3px;
      }

      .bot-input-area {
        padding: 12px;
        border-top: 1px solid #eee;
        display: flex;
        gap: 8px;
      }

      .bot-input {
        flex: 1;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 8px 12px;
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        outline: none;
        transition: border-color 0.2s;
      }

      .bot-input:focus {
        border-color: #0B5F79;
      }

      .bot-send-btn {
        background: #0B5F79;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 8px 12px;
        cursor: pointer;
        font-weight: 600;
        transition: background 0.2s;
      }

      .bot-send-btn:hover {
        background: #0a4f66;
      }

      .bot-send-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .typing-indicator {
        display: flex;
        gap: 4px;
        padding: 10px 14px;
        background: #f0f0f0;
        border-radius: 12px;
        width: fit-content;
      }

      .typing-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #999;
        animation: typing 1.4s infinite;
      }

      .typing-dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .typing-dot:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes typing {
        0%, 60%, 100% {
          opacity: 0.5;
        }
        30% {
          opacity: 1;
        }
      }

      @media (max-width: 480px) {
        #boule-bot-chat {
          width: calc(100vw - 20px);
          height: 60vh;
          max-height: 500px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function createBotHTML() {
    const container = document.createElement('div');
    container.id = BOT_CONFIG.containerId;

    container.innerHTML = `
      <button id="${BOT_CONFIG.buttonId}" aria-label="Abrir bot de Boulé" title="Bot de Boulé">
        <img src="${BOT_CONFIG.iconSrc}" alt="" width="64" height="64">
      </button>
      <div id="${BOT_CONFIG.chatWindowId}" class="bot-chat-window">
        <div class="bot-header">
          <div style="display:flex;align-items:center;gap:10px;">
            <img src="${BOT_CONFIG.iconSrc}" alt="" class="bot-header-icon" width="40" height="40">
            <div class="bot-header-text">
              <div class="bot-header-title">Boulé Bot</div>
              <div class="bot-header-subtitle">¿Cómo podemos ayudarte?</div>
            </div>
          </div>
          <button class="bot-close-btn" aria-label="Cerrar chat">✕</button>
        </div>
        <div class="bot-messages" id="botMessages"></div>
        <div class="bot-input-area">
          <input type="text" class="bot-input" id="botInput" placeholder="Escribe tu pregunta..." />
          <button class="bot-send-btn" id="botSend">Enviar</button>
        </div>
      </div>
    `;

    document.body.appendChild(container);
  }

  function matchIntent(userText) {
    // Normalizamos acentos para que "donde"/"dónde", "ubicacion"/"ubicación",
    // etc. coincidan igual, sin importar cómo escriba el usuario.
    const text = normalizeText(userText);

    // Nos quedamos con la palabra clave más larga (más específica) que
    // coincida, en vez de la primera que aparece en el objeto. Así, una
    // pregunta como "qué hace el smart chatbot" cae en la respuesta de
    // Smart Chatbot y no en la genérica de "qué hace".
    let bestResponse = null;
    let bestKeywordLength = 0;

    for (const [, intent] of Object.entries(INTENTS)) {
      for (const keyword of intent.keywords) {
        const normKeyword = normalizeText(keyword);
        if (text.includes(normKeyword) && normKeyword.length > bestKeywordLength) {
          bestKeywordLength = normKeyword.length;
          bestResponse = intent.response;
        }
      }
    }

    return bestResponse;
  }

  // --- Búsqueda de respaldo dentro del contenido de la página ---
  // Si ninguna respuesta fija coincide, buscamos en el texto real de la
  // página (títulos, párrafos) para intentar encontrar una respuesta antes
  // de derivar al mail de contacto.

  const STOPWORDS = new Set([
    'de', 'la', 'el', 'en', 'y', 'a', 'los', 'las', 'un', 'una', 'unos', 'unas',
    'que', 'es', 'por', 'para', 'con', 'su', 'sus', 'se', 'lo', 'como', 'mas',
    'o', 'pero', 'al', 'del', 'les', 'este', 'esta', 'estos', 'estas', 'ese',
    'esa', 'esos', 'esas', 'ya', 'muy', 'sin', 'sobre', 'entre', 'hay', 'donde',
    'cuando', 'cual', 'cuales', 'quien', 'quienes', 'tiene', 'tienen', 'son',
    'ser', 'estar', 'hace', 'hacer', 'fue', 'ha', 'han', 'sido', 'me', 'te',
    'nos', 'mi', 'tu', 'yo', 'el', 'ella', 'ellos', 'ellas', 'nosotros',
    'ustedes', 'usted', 'sera', 'seria', 'puede', 'pueden', 'podria',
    'podrian', 'quiero', 'quisiera', 'necesito', 'saber', 'decime', 'dime',
    'cuanto', 'cuanta', 'cuantos', 'cuantas'
  ]);

  // Stemming simple: reduce plurales/variantes básicas para que "bancos"
  // encuentre "banco", "servicios" encuentre "servicio", etc.
  function stem(token) {
    if (token.length > 4 && token.endsWith('s')) return token.slice(0, -1);
    return token;
  }

  function tokenize(text) {
    return normalizeText(text)
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length > 2 && !STOPWORDS.has(t))
      .map(stem);
  }

  let PAGE_INDEX = null;

  function buildPageIndex() {
    const botContainer = document.getElementById(BOT_CONFIG.containerId);
    const elements = Array.from(document.querySelectorAll('h1, h2, h3, p'))
      .filter((el) => !botContainer || !botContainer.contains(el));

    const blocks = [];
    const seen = new Set();
    let currentHeading = '';

    elements.forEach((el) => {
      const tag = el.tagName.toLowerCase();
      const text = el.textContent.replace(/\s+/g, ' ').trim();
      if (!text) return;

      if (tag === 'h1' || tag === 'h2' || tag === 'h3') {
        currentHeading = text;
        return;
      }

      if (text.length < 15 || seen.has(text)) return;
      seen.add(text);

      blocks.push({ heading: currentHeading, text, tokens: tokenize(text) });
    });

    // Frecuencia de cada palabra en el contenido: sirve para darle más peso
    // a términos específicos/poco comunes que a palabras genéricas.
    const df = new Map();
    blocks.forEach((block) => {
      new Set(block.tokens).forEach((t) => df.set(t, (df.get(t) || 0) + 1));
    });

    return { blocks, df };
  }

  function matchPageContent(userText) {
    if (!PAGE_INDEX) PAGE_INDEX = buildPageIndex();
    const { blocks, df } = PAGE_INDEX;

    const queryTokens = Array.from(new Set(tokenize(userText)));
    // Solo consideramos palabras que efectivamente aparecen en algún lugar
    // de la página; el resto no aporta información para buscar.
    const validTokens = queryTokens.filter((t) => df.has(t));
    if (validTokens.length === 0) return null;

    let best = null;
    let bestWeight = 0;
    let bestMatched = 0;

    blocks.forEach((block) => {
      if (block.tokens.length === 0) return;
      const blockSet = new Set(block.tokens);
      let matched = 0;
      let weighted = 0;

      validTokens.forEach((t) => {
        if (blockSet.has(t)) {
          matched++;
          weighted += 1 / df.get(t);
        }
      });

      if (matched > 0 && weighted > bestWeight) {
        bestWeight = weighted;
        bestMatched = matched;
        best = block;
      }
    });

    if (!best) return null;

    // Exigimos que al menos la mitad de las palabras relevantes de la
    // consulta coincidan con el bloque encontrado, para evitar respuestas
    // forzadas cuando la relación es débil o casual.
    const coverage = bestMatched / validTokens.length;
    if (coverage < 0.5) return null;

    return best.heading ? `**${best.heading}**\n\n${best.text}` : best.text;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function addMessage(text, isUser = false) {
    const messagesContainer = document.getElementById('botMessages');
    const messageEl = document.createElement('div');
    messageEl.className = `bot-message ${isUser ? 'user' : 'bot'}`;

    if (!isUser) {
      const avatar = document.createElement('img');
      avatar.src = BOT_CONFIG.iconSrc;
      avatar.alt = '';
      avatar.className = 'bot-avatar';
      messageEl.appendChild(avatar);
    }

    const bubble = document.createElement('div');
    bubble.className = `message-bubble ${isUser ? 'user' : 'bot'}`;

    let html = escapeHTML(text);
    if (!isUser) {
      html = html
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(
          BOT_CONFIG.contactEmail,
          `<a href="mailto:${BOT_CONFIG.contactEmail}">${BOT_CONFIG.contactEmail}</a>`
        )
        .replace(
          BOT_CONFIG.privacyContactEmail,
          `<a href="mailto:${BOT_CONFIG.privacyContactEmail}">${BOT_CONFIG.privacyContactEmail}</a>`
        );
    }
    bubble.innerHTML = html;

    messageEl.appendChild(bubble);
    messagesContainer.appendChild(messageEl);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTyping() {
    const messagesContainer = document.getElementById('botMessages');
    const messageEl = document.createElement('div');
    messageEl.className = 'bot-message bot';
    messageEl.id = 'typingIndicator';

    const avatar = document.createElement('img');
    avatar.src = BOT_CONFIG.iconSrc;
    avatar.alt = '';
    avatar.className = 'bot-avatar';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble bot';
    bubble.innerHTML = '<div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';

    messageEl.appendChild(avatar);
    messageEl.appendChild(bubble);
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function removeTyping() {
    const typingEl = document.getElementById('typingIndicator');
    if (typingEl) typingEl.remove();
  }

  function handleUserMessage() {
    const input = document.getElementById('botInput');
    const sendBtn = document.getElementById('botSend');
    const text = input.value.trim();

    if (!text) return;

    input.value = '';
    addMessage(text, true);

    sendBtn.disabled = true;
    input.disabled = true;

    showTyping();

    setTimeout(() => {
      removeTyping();

      // Si el mensaje contiene lenguaje inapropiado, responder siempre
      // con calma y respeto, sin importar el contenido.
      if (containsRudeWords(text)) {
        addMessage(POLITE_RESPONSE, false);
      } else if (isSensitiveQuery(text)) {
        // Consultas sobre datos específicos de clientes/municipios,
        // información financiera, operativa, personal o de acceso a
        // sistemas: nunca se responden, siempre se deriva por privacidad.
        addMessage(PRIVACY_RESPONSE, false);
      } else {
        // 1) Respuestas fijas ya redactadas para los temas más comunes.
        // 2) Si no hay coincidencia, buscar en el texto real de la página
        //    aunque la pregunta no use las palabras clave exactas.
        // 3) Si tampoco se encuentra nada, derivar al mail de contacto.
        const response = matchIntent(text) || matchPageContent(text);
        if (response) {
          addMessage(response, false);
        } else {
          addMessage(NO_ANSWER_RESPONSE, false);
        }
      }

      sendBtn.disabled = false;
      input.disabled = false;
      input.focus();
    }, 800 + Math.random() * 400);
  }

  function initBot() {
    loadStyles();
    createBotHTML();

    const btn = document.getElementById(BOT_CONFIG.buttonId);
    const chatWindow = document.getElementById(BOT_CONFIG.chatWindowId);
    const closeBtn = chatWindow.querySelector('.bot-close-btn');
    const input = document.getElementById('botInput');
    const sendBtn = document.getElementById('botSend');

    btn.addEventListener('click', () => {
      chatWindow.classList.toggle('is-open');
      if (chatWindow.classList.contains('is-open')) {
        input.focus();
        if (document.getElementById('botMessages').children.length === 0) {
          addMessage(INTENTS.greeting.response, false);
        }
      }
    });

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      chatWindow.classList.remove('is-open');
    });

    sendBtn.addEventListener('click', handleUserMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleUserMessage();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBot);
  } else {
    initBot();
  }
})();
