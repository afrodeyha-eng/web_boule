<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

if($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'message' => 'Método no permitido']);
  exit();
}

// Configurar correo destino
$MAIL_DESTINO = 'afrodeyha@gmail.com'; // Cambiar por tu correo
$CARPETA_DATOS = __DIR__ . '/diagnosticos/datos/';

// Crear carpeta si no existe
if(!is_dir($CARPETA_DATOS)) {
  mkdir($CARPETA_DATOS, 0755, true);
}

// Obtener datos del POST
$input = json_decode(file_get_contents('php://input'), true);

if(!$input) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
  exit();
}

// Extraer datos
$municipio = $input['municipio'] ?? '';
$provincia = $input['provincia'] ?? '';
$funcionario = $input['funcionario'] ?? '';
$cargo = $input['cargo'] ?? '';
$area = $input['area'] ?? '';
$email = $input['email'] ?? '';
$telefono = $input['telefono'] ?? '';
$indice_global = $input['indice_global'] ?? 0;
$respuestas_detalle = $input['respuestas_detalle'] ?? '';
$fecha = date('Y-m-d');
$fecha_formato = date('d/m/Y');

// Validar datos mínimos
if(empty($municipio) || empty($email) || empty($funcionario)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Faltan datos requeridos']);
  exit();
}

// Guardar datos en JSON
$datos_diagnostico = [
  'fecha' => $fecha,
  'timestamp' => time(),
  'municipio' => $municipio,
  'provincia' => $provincia,
  'funcionario' => $funcionario,
  'cargo' => $cargo,
  'area' => $area,
  'email' => $email,
  'telefono' => $telefono,
  'indice_global' => $indice_global,
  'respuestas_detalle' => $respuestas_detalle
];

// Nombre de archivo con fecha y municipio
$nombre_archivo = 'diagnostico_' . $fecha . '_' . preg_replace('/[^a-zA-Z0-9_-]/', '_', $municipio) . '.json';
$ruta_archivo = $CARPETA_DATOS . $nombre_archivo;

// Guardar JSON
$json_guardado = file_put_contents($ruta_archivo, json_encode($datos_diagnostico, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

if(!$json_guardado) {
  error_log("Error guardando diagnóstico en: $ruta_archivo");
}

// Construir correo
$asunto = "Diagnóstico Smart City — $municipio";

$mensaje = "
Diagnóstico Smart City completado — envío automático.

DATOS DEL MUNICIPIO
Municipio: $municipio" . (!empty($provincia) ? " ($provincia)" : "") . "
Funcionario/a: $funcionario — $cargo
Área: " . (!empty($area) ? $area : '-') . "
Email: $email
Teléfono: " . (!empty($telefono) ? $telefono : '-') . "
Fecha: $fecha_formato

RESULTADO
Índice global: $indice_global/100

RESPUESTAS COMPLETAS
$respuestas_detalle
";

// Encabezados de correo
$headers = "From: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Intentar enviar correo
$success = @mail($MAIL_DESTINO, $asunto, $mensaje, $headers);

// Responder al cliente
http_response_code(200);
echo json_encode([
  'success' => true,
  'message' => 'Diagnóstico guardado correctamente',
  'archivo' => $nombre_archivo,
  'email_enviado' => $success
]);
?>
