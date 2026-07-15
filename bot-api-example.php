<?php
/**
 * Boulé GovTech Bot API Example
 *
 * Este es un ejemplo de cómo crear un backend para el bot.
 * Reemplaza la lógica local del bot con llamadas a este endpoint.
 *
 * Uso:
 * POST /bot-api.php
 * {
 *   "message": "¿Qué servicios ofrecen?"
 * }
 *
 * Respuesta:
 * {
 *   "response": "Ofrecemos 6 soluciones...",
 *   "intent": "services",
 *   "confidence": 0.95
 * }
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Método no permitido']);
  exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['message'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Campo "message" requerido']);
  exit;
}

$userMessage = strtolower(trim($input['message']));

// Definir intents y respuestas (idéntico a bot-loader.js)
$intents = [
  'services' => [
    'keywords' => ['servicio', 'servicios', 'qué ofrece', 'qué hace', 'soluciones', 'propuesta'],
    'response' => "Ofrecemos 6 soluciones principales:\n1. **Centro de Contacto** - Atención omnicanal 24/7\n2. **Plataforma Legislativa** - Democratizar procesos legislativos\n3. **Visualización de Datos** - Dashboards en tiempo real\n4. **Formación** - Capacitación continua de equipos\n5. **Recuperación de Activos** - BPO especializado en cobranza\n6. **IA & Analítica de Voz** - NLP para análisis automático\n\n¿Deseas más detalles sobre alguno de estos servicios?"
  ],
  'contact' => [
    'keywords' => ['contacto', 'contactar', 'comunicarse', 'teléfono', 'email', 'información'],
    'response' => "📧 **Contacto directo:**\n**Néstor Moscardo**\nEmail: nestor.moscardo@gsolutions.com.ar\nTeléfono: +54 2604 576822\nWeb: www.gsolutions.ar\n\n¿Necesitas agendar una reunión? Puedo conectarte con nuestro equipo."
  ],
  'location' => [
    'keywords' => ['dónde', 'ubicación', 'localidad', 'san rafael', 'mendoza', 'oficina'],
    'response' => "📍 **Ubicación:**\nEstamos ubicados en el microcentro de San Rafael, Mendoza.\nContamos con sites propios operativos y flexibilidad para modelo híbrido en locaciones del Estado.\n\n¿Te gustaría conocer más sobre nuestras instalaciones?"
  ],
  'capabilities' => [
    'keywords' => ['capacidad', 'qué pueden', 'cuáles son', 'diferencial', 'ventaja', 'problema'],
    'response' => "💪 **Nuestros diferenciales:**\n- **Descentralización**: Evitamos embotellamiento con personal especializado\n- **Filtro de consultas**: 70% de consultas simples resueltas por bot\n- **Resolución en primer contacto**: Nuestros operadores acceden directamente a sistemas\n- **Omnicanalidad real**: Apps, llamadas, WhatsApp, Accesible (LSA) + bot 24/7\n\n¿Quieres saber más sobre alguno de estos aspectos?"
  ],
  'greeting' => [
    'keywords' => ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hi', 'hey', 'qué onda'],
    'response' => "👋 ¡Hola! Soy el bot de Boulé GovTech.\n\nPuedo ayudarte con información sobre:\n- Servicios que ofrecemos\n- Cómo contactarnos\n- Nuestros diferenciales\n- Ubicación\n- Y mucho más\n\n¿En qué puedo ayudarte hoy?"
  ],
  'help' => [
    'keywords' => ['ayuda', 'help', 'qué puedes', 'qué haces', 'cómo funciona'],
    'response' => "🤖 **¿Cómo funciono?**\nSoy un asistente automático que puede:\n✓ Responder preguntas sobre servicios\n✓ Proporcionar información de contacto\n✓ Explicar nuestros diferenciales\n✓ Conectarte con el equipo de ventas\n\nEscribe tus preguntas en lenguaje natural. Si no puedo ayudarte, te conectaré con un humano."
  ]
];

// Buscar intent que coincida
$matchedIntent = null;
$confidence = 0;

foreach ($intents as $intentName => $intentData) {
  foreach ($intentData['keywords'] as $keyword) {
    if (strpos($userMessage, $keyword) !== false) {
      $matchedIntent = $intentName;
      $confidence = 0.95; // Puedes hacer esto más sofisticado con scores
      break 2;
    }
  }
}

if ($matchedIntent) {
  http_response_code(200);
  echo json_encode([
    'response' => $intents[$matchedIntent]['response'],
    'intent' => $matchedIntent,
    'confidence' => $confidence
  ]);
} else {
  // Si no encuentra coincidencia, respuesta por defecto
  http_response_code(200);
  echo json_encode([
    'response' => "No estoy seguro de tu pregunta. Puedo ayudarte con:\n- Servicios\n- Contacto\n- Ubicación\n- Nuestros diferenciales\n\n¿Podrías reformular tu pregunta?",
    'intent' => 'unknown',
    'confidence' => 0
  ]);
}
?>
