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

  const INTENTS = {
    services: {
      keywords: ['servicio', 'servicios', 'qué ofrece', 'qué hace', 'soluciones', 'propuesta'],
      response: `Ofrecemos 6 soluciones principales:
1. **Centro de Contacto** - Atención omnicanal 24/7
2. **Plataforma Legislativa** - Democratizar procesos legislativos
3. **Visualización de Datos** - Dashboards en tiempo real
4. **Formación** - Capacitación continua de equipos
5. **Recuperación de Activos** - BPO especializado en cobranza
6. **IA & Analítica de Voz** - NLP para análisis automático

¿Deseas más detalles sobre alguno de estos servicios?`
    },
    contact: {
      keywords: ['contacto', 'contactar', 'comunicarse', 'teléfono', 'email', 'información'],
      response: `📧 **Contacto directo:**
**Néstor Moscardo**
Email: nestor.moscardo@gsolutions.com.ar
Teléfono: +54 2604 576822
Web: www.gsolutions.ar

¿Necesitas agendar una reunión? Puedo conectarte con nuestro equipo.`
    },
    location: {
      keywords: ['dónde', 'ubicación', 'localidad', 'san rafael', 'mendoza', 'oficina'],
      response: `📍 **Ubicación:**
Estamos ubicados en el microcentro de San Rafael, Mendoza.
Contamos con sites propios operativos y flexibilidad para modelo híbrido en locaciones del Estado.

¿Te gustaría conocer más sobre nuestras instalaciones?`
    },
    capabilities: {
      keywords: ['capacidad', 'qué pueden', 'cuáles son', 'diferencial', 'ventaja', 'problema'],
      response: `💪 **Nuestros diferenciales:**
- **Descentralización**: Evitamos embotellamiento con personal especializado
- **Filtro de consultas**: 70% de consultas simples resueltas por bot
- **Resolución en primer contacto**: Nuestros operadores acceden directamente a sistemas
- **Omnicanalidad real**: Apps, llamadas, WhatsApp, Accesible (LSA) + bot 24/7

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
      keywords: ['quiénes son', 'quienes son', 'boulé', 'boule', 'empresa', 'global solutions', 'quién es', 'quien es'],
      response: `Somos **Boulé GovTech**, by Global Solutions: una plataforma gubernamental integral y modular que conecta al Estado con los ciudadanos, empresas y organizaciones.

Funcionamos como una capa central que se integra con los sistemas públicos existentes para complementarlos, sin necesidad de reemplazarlos.

Respaldados por operaciones críticas para Movistar, Banco Galicia, Despegar, Municipalidad de San Rafael y Municipalidad de Gral. Alvear.`
    },
    meeting: {
      keywords: ['reunión', 'reunion', 'agendar', 'cita', 'demo', 'presupuesto', 'cotización', 'cotizacion'],
      response: `📅 Para agendar una reunión o pedir una propuesta, contactá directamente a:

**Néstor Moscardo**
Email: nestor.moscardo@gsolutions.com.ar
Teléfono: +54 2604 576822

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
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #7c3aed, #a855f7);
        border: none;
        color: white;
        font-size: 28px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #boule-bot-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(124, 58, 237, 0.6);
      }

      #boule-bot-btn.is-hidden {
        display: none;
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
        background: linear-gradient(135deg, #7c3aed, #a855f7);
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
        color: #7c3aed;
        font-weight: 600;
      }

      .message-bubble.bot {
        background: #f0f0f0;
        color: #333;
      }

      .message-bubble.user {
        background: #7c3aed;
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
        border-color: #7c3aed;
      }

      .bot-send-btn {
        background: #7c3aed;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 8px 12px;
        cursor: pointer;
        font-weight: 600;
        transition: background 0.2s;
      }

      .bot-send-btn:hover {
        background: #6d28d9;
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
        💬
      </button>
      <div id="${BOT_CONFIG.chatWindowId}" class="bot-chat-window">
        <div class="bot-header">
          <div>
            <div class="bot-header-title">Boulé Bot</div>
            <div class="bot-header-subtitle">¿Cómo podemos ayudarte?</div>
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
    const text = userText.toLowerCase();

    for (const [, intent] of Object.entries(INTENTS)) {
      for (const keyword of intent.keywords) {
        if (text.includes(keyword)) {
          return intent.response;
        }
      }
    }

    return null;
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

    const bubble = document.createElement('div');
    bubble.className = `message-bubble ${isUser ? 'user' : 'bot'}`;

    let html = escapeHTML(text);
    if (!isUser) {
      html = html
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(
          BOT_CONFIG.contactEmail,
          `<a href="mailto:${BOT_CONFIG.contactEmail}">${BOT_CONFIG.contactEmail}</a>`
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

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble bot';
    bubble.innerHTML = '<div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';

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
      } else {
        const response = matchIntent(text);
        if (response) {
          addMessage(response, false);
        } else {
          // Sin respuesta: solo sabemos lo que está en la página.
          // Derivar al mail de contacto para continuar la consulta.
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
