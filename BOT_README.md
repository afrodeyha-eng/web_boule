# 🤖 Boulé GovTech Bot Loader

Widget de chat inteligente cargable en cualquier página web.

## ✨ Características

- **Chat flotante**: Widget que aparece en la esquina inferior derecha de la página
- **Inteligencia conversacional**: Responde automáticamente a preguntas sobre servicios, contacto, ubicación y capacidades
- **Interfaz moderna**: Diseño limpio y responsivo, funciona en móvil y desktop
- **Fácil integración**: Solo requiere una línea de código
- **Cero dependencias**: JavaScript puro, sin librerías externas

## 🚀 Instalación

Solo necesitas agregar una línea en tu página HTML:

```html
<script src="bot-loader.js"></script>
```

Coloca esta línea al final de tu documento HTML, antes de cerrar el `</body>`.

## 💬 Capacidades del Bot

El bot **solo responde sobre la información publicada en la página**:

1. **Servicios** - Información sobre las 6 soluciones principales
2. **Contacto** - Email, teléfono y website
3. **Ubicación** - Dónde estamos ubicados
4. **Diferenciales** - Ventajas competitivas
5. **Resultados / KPIs** - FCR, TMO, SLA, NPS
6. **Diagnóstico** - Cómo acceder a la evaluación
7. **Quiénes somos** - Presentación de la empresa
8. **Reuniones** - Cómo agendar una reunión
9. **Saludos y ayuda** - Responde de forma amigable

## 🛡️ Reglas de comportamiento

- **Nunca responde de forma agresiva**, aunque el usuario use lenguaje ofensivo.
- **Filtro de lenguaje inapropiado**: si detecta groserías o insultos, responde con calma y respeto, sin repetir esas palabras, y ofrece continuar la consulta por mail.
- **Búsqueda en el contenido real de la página**: si la pregunta no coincide con ninguna respuesta fija, el bot busca en los títulos y párrafos del sitio (aunque la pregunta no use exactamente las mismas palabras) y devuelve el fragmento más relevante.
- **Sin respuesta = derivación**: si tampoco encuentra nada relacionado en la página, lo dice claramente y deriva la consulta a **nestor.moscardo@gsolutions.com.ar**.
- **No inventa información**: no responde nada que no esté en la página.
- El texto del usuario se muestra escapado (sin HTML), lo que también previene inyección de código en el chat.

### 🔎 Cómo funciona la búsqueda en la página

Cuando ninguna respuesta fija coincide, el bot:
1. Indexa los títulos (`h1`, `h2`, `h3`) y párrafos (`p`) visibles de la página al cargar.
2. Convierte la pregunta del usuario y cada fragmento de texto en palabras clave (ignorando tildes, mayúsculas y palabras vacías como "de", "el", "que", etc.), aplicando además una reducción simple de plurales.
3. Le da más peso a las palabras específicas/poco comunes que a las genéricas, para encontrar el párrafo más relacionado.
4. Si al menos la mitad de las palabras relevantes de la pregunta coinciden con un fragmento de la página, responde con ese contenido.
5. Si no encuentra nada suficientemente relacionado, responde con el mensaje de derivación al mail de contacto.

Esto permite que preguntas como "¿trabajan con bancos?" encuentren la mención a "Banco Galicia" en la página, aunque esa frase exacta no esté registrada como respuesta fija.

### Ejemplos de preguntas que entiende:

- "¿Qué servicios ofrecen?"
- "¿Cómo los contacto?"
- "¿Dónde están ubicados?"
- "¿Cuáles son sus ventajas?"
- "Hola, necesito ayuda"
- "¿Qué puedes hacer?"

## 🎨 Personalización

### Cambiar colores

Modifica los valores de gradiente en la sección de estilos:

```javascript
background: linear-gradient(135deg, #7c3aed, #a855f7); // Cambiar estos valores
```

Colores sugeridos:
- Violeta actual: `#7c3aed` a `#a855f7`
- Azul: `#0ea5e9` a `#06b6d4`
- Verde: `#10b981` a `#14b8a6`
- Rojo: `#ef4444` a `#f97316`

### Agregar nuevas respuestas

En el objeto `INTENTS`, agrega una nueva entrada:

```javascript
yourTopic: {
  keywords: ['palabra1', 'palabra2', 'palabra3'],
  response: `Tu respuesta aquí`
}
```

### Cambiar el emoji del botón

En `createBotHTML()`, reemplaza el emoji:

```javascript
<button id="${BOT_CONFIG.buttonId}">
  💬  <!-- Cambiar este emoji -->
</button>
```

## 📱 Responsive Design

El bot se adapta automáticamente a:
- **Desktop**: Ventana de 380x500px
- **Tablet**: Ventana redimensionada según viewport
- **Móvil**: Ancho dinámico, máximo 500px de altura

## ⚙️ Configuración Avanzada

### Cambiar posición del botón

En `loadStyles()`, modifica `bottom` y `right`:

```css
#boule-bot-container {
  bottom: 20px;  /* distancia desde abajo */
  right: 20px;   /* distancia desde derecha */
}
```

### Cambiar tamaño del botón

```css
#boule-bot-btn {
  width: 60px;   /* diámetro */
  height: 60px;  /* diámetro */
  font-size: 28px; /* tamaño del emoji */
}
```

## 🔌 Extensión con API

Para conectar con un backend:

1. Modifica el objeto `BOT_CONFIG`:
```javascript
const BOT_CONFIG = {
  apiEndpoint: 'https://tu-api.com/chat', // tu endpoint
  // ... resto de config
};
```

2. En `handleUserMessage()`, reemplaza la lógica de `matchIntent()` con una llamada a tu API:

```javascript
function handleUserMessage() {
  // ... código existente ...
  
  fetch(BOT_CONFIG.apiEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text })
  })
  .then(res => res.json())
  .then(data => {
    removeTyping();
    addMessage(data.response, false);
    // ... habilitar input ...
  });
}
```

## 🎯 Casos de uso

- ✅ Centro de Contacto Ciudadano
- ✅ FAQ automático 24/7
- ✅ Pre-calificación de consultas
- ✅ Soporte al ciudadano
- ✅ Redirección inteligente a operadores
- ✅ Recopilación inicial de información

## 📊 Analytics

Para rastrear uso, puedes agregar:

```javascript
function addMessage(text, isUser = false) {
  // ... código existente ...
  
  if (isUser) {
    gtag('event', 'bot_message', { message: text });
  }
}
```

## 🐛 Solución de problemas

### El bot no aparece
- Asegúrate que `bot-loader.js` está en la misma carpeta
- Verifica que no hay errores en la consola
- Revisa que el `<script>` esté después de `</head>` o antes de `</body>`

### El bot aparece pero no responde
- Revisa la consola del navegador (F12 → Console)
- Verifica que los keywords coincidan con tu input
- Agrega más keywords a los intents

### Problemas de estilos
- Asegúrate que las fuentes de Google Fonts se cargan correctamente
- Verifica que no hay conflictos con CSS global

## 📄 Licencia

© 2024 Boulé GovTech · By Global Solutions. Todos los derechos reservados.
