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
$fecha = date('d/m/Y');

// Validar datos mínimos
if(empty($municipio) || empty($email) || empty($funcionario)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Faltan datos requeridos']);
  exit();
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
Fecha: $fecha

RESULTADO
Índice global: $indice_global/100

RESPUESTAS COMPLETAS
$respuestas_detalle
";

// Encabezados de correo
$headers = "From: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Enviar correo
$success = mail($MAIL_DESTINO, $asunto, $mensaje, $headers);

if($success) {
  http_response_code(200);
  echo json_encode(['success' => true, 'message' => 'Diagnóstico enviado correctamente']);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Error al enviar el correo']);
}
?>
