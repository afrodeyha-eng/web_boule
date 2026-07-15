<?php
$CARPETA_DATOS = __DIR__ . '/datos/';

// Obtener lista de archivos
$archivos = [];
if(is_dir($CARPETA_DATOS)) {
  $archivos = array_filter(glob($CARPETA_DATOS . '*.json'), 'is_file');
  rsort($archivos); // Ordenar por más reciente primero
}

// Procesar filtros y descargas
$filtro_municipio = isset($_GET['municipio']) ? sanitize($_GET['municipio']) : '';
$exportar_csv = isset($_GET['export_csv']);
$ver_detalle = isset($_GET['ver']) ? sanitize($_GET['ver']) : '';

function sanitize($str) {
  return htmlspecialchars(strip_tags($str), ENT_QUOTES);
}

// Función para exportar CSV
if($exportar_csv) {
  header('Content-Type: text/csv; charset=utf-8');
  header('Content-Disposition: attachment; filename=diagnosticos_' . date('Y-m-d') . '.csv');

  $output = fopen('php://output', 'w');
  fputcsv($output, ['Fecha', 'Municipio', 'Provincia', 'Funcionario', 'Cargo', 'Área', 'Email', 'Teléfono', 'Índice Global'], ';');

  foreach($archivos as $archivo) {
    $json = json_decode(file_get_contents($archivo), true);
    if($json) {
      fputcsv($output, [
        $json['fecha'],
        $json['municipio'],
        $json['provincia'] ?? '',
        $json['funcionario'],
        $json['cargo'],
        $json['area'] ?? '',
        $json['email'],
        $json['telefono'] ?? '',
        $json['indice_global']
      ], ';');
    }
  }
  fclose($output);
  exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel de Diagnósticos — Boulé</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f4f7fa;
      color: #0f1e36;
      padding: 20px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      padding: 40px;
    }
    h1 {
      font-size: 28px;
      margin-bottom: 8px;
      color: #0f1e36;
    }
    .subtitle {
      color: #5a6b85;
      margin-bottom: 24px;
      font-size: 14px;
    }
    .controls {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }
    input, select {
      padding: 10px 12px;
      border: 1.5px solid #dde5ee;
      border-radius: 8px;
      font-family: inherit;
      font-size: 14px;
    }
    input:focus, select:focus {
      outline: 2px solid #00a896;
      border-color: #00a896;
    }
    button {
      padding: 10px 20px;
      background: #00a896;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
    }
    button:hover {
      background: #0d8577;
    }
    .btn-secondary {
      background: #5a6b85;
    }
    .btn-secondary:hover {
      background: #3f4a5a;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 28px;
    }
    .stat-card {
      background: #f4f7fa;
      padding: 16px;
      border-radius: 10px;
      border-left: 4px solid #00a896;
    }
    .stat-label {
      font-size: 12px;
      color: #5a6b85;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .stat-value {
      font-size: 24px;
      font-weight: 800;
      color: #0f1e36;
    }
    .table-wrapper {
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    thead {
      background: #f4f7fa;
      border-bottom: 2px solid #dde5ee;
    }
    th {
      padding: 12px;
      text-align: left;
      font-weight: 700;
      color: #5a6b85;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #dde5ee;
    }
    tbody tr:hover {
      background: #f9fafc;
    }
    .indice {
      font-weight: 800;
      font-size: 14px;
      padding: 4px 8px;
      border-radius: 6px;
      display: inline-block;
    }
    .indice.critico { background: #fff4ef; color: #ff6b35; }
    .indice.alerta { background: #fdf7ec; color: #e8a13d; }
    .indice.desarrollo { background: #e8f4f8; color: #3d9be8; }
    .indice.avanzado { background: #e8f5f1; color: #00a896; }
    .actions {
      display: flex;
      gap: 8px;
    }
    a {
      color: #00a896;
      text-decoration: none;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background 0.2s;
    }
    a:hover {
      background: rgba(0,168,150,0.1);
    }
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #5a6b85;
    }
    .empty-state p {
      font-size: 14px;
      margin-top: 8px;
    }
    .modal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal.active { display: flex; }
    .modal-content {
      background: white;
      border-radius: 12px;
      padding: 32px;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      position: relative;
    }
    .modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal h2 {
      margin-bottom: 16px;
      font-size: 20px;
    }
    .modal .campo {
      margin-bottom: 12px;
      font-size: 13px;
    }
    .modal .label {
      color: #5a6b85;
      font-weight: 700;
      display: block;
      margin-bottom: 4px;
    }
    .modal .valor {
      color: #0f1e36;
      font-weight: 600;
    }
  </style>
</head>
<body>

<div class="container">
  <h1>📊 Panel de Diagnósticos Smart City</h1>
  <p class="subtitle">Boulé — Global Solutions</p>

  <?php if(empty($archivos)): ?>
    <div class="empty-state">
      <p style="font-size: 48px; margin-bottom: 12px;">📋</p>
      <p><strong>Aún no hay diagnósticos completados</strong></p>
      <p style="font-size: 13px; margin-top: 8px;">Los diagnósticos aparecerán aquí cuando se completen a través del formulario.</p>
    </div>
  <?php else: ?>
    <div class="controls">
      <input type="text" id="filtroMunicipio" placeholder="Filtrar por municipio..." />
      <a href="?export_csv=1" style="display: inline-block; background: #ff6b35; color: white; padding: 10px 20px; border-radius: 8px;">📥 Descargar CSV</a>
    </div>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-label">Total de diagnósticos</div>
        <div class="stat-value"><?php echo count($archivos); ?></div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Municipios únicos</div>
        <div class="stat-value">
          <?php
          $municipios = array_unique(array_map(function($f) {
            $j = json_decode(file_get_contents($f), true);
            return $j['municipio'] ?? '';
          }, $archivos));
          echo count($municipios);
          ?>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Índice promedio</div>
        <div class="stat-value">
          <?php
          $indices = array_map(function($f) {
            $j = json_decode(file_get_contents($f), true);
            return $j['indice_global'] ?? 0;
          }, $archivos);
          $promedio = $indices ? round(array_sum($indices) / count($indices)) : 0;
          echo $promedio;
          ?>
        </div>
      </div>
    </div>

    <div class="table-wrapper">
      <table id="tablaDiagnosticos">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Municipio</th>
            <th>Provincia</th>
            <th>Funcionario</th>
            <th>Índice</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach($archivos as $archivo): ?>
            <?php $json = json_decode(file_get_contents($archivo), true); if($json): ?>
              <tr class="fila-diagnostico" data-municipio="<?php echo strtolower($json['municipio']); ?>">
                <td><?php echo $json['fecha']; ?></td>
                <td><strong><?php echo sanitize($json['municipio']); ?></strong></td>
                <td><?php echo sanitize($json['provincia'] ?? '-'); ?></td>
                <td><?php echo sanitize($json['funcionario']); ?></td>
                <td>
                  <?php
                  $i = $json['indice_global'];
                  if($i < 25) $clase = 'critico';
                  elseif($i < 50) $clase = 'alerta';
                  elseif($i < 75) $clase = 'desarrollo';
                  else $clase = 'avanzado';
                  ?>
                  <span class="indice <?php echo $clase; ?>"><?php echo $i; %>/100</span>
                </td>
                <td>
                  <div class="actions">
                    <a href="#" onclick="verDetalle('<?php echo basename($archivo); ?>')">Ver</a>
                    <a href="?ver=<?php echo basename($archivo); ?>" download>Descargar</a>
                  </div>
                </td>
              </tr>
            <?php endif; ?>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  <?php endif; ?>
</div>

<div class="modal" id="modalDetalle">
  <div class="modal-content">
    <button class="modal-close" onclick="cerrarModal()">✕</button>
    <div id="detalleContenido"></div>
  </div>
</div>

<script>
function verDetalle(archivo) {
  event.preventDefault();
  const modal = document.getElementById('modalDetalle');
  const contenido = document.getElementById('detalleContenido');

  fetch('datos/' + archivo)
    .then(r => r.json())
    .then(d => {
      contenido.innerHTML = `
        <h2>${d.municipio}${d.provincia ? ', ' + d.provincia : ''}</h2>
        <div class="campo">
          <span class="label">Índice Global</span>
          <span class="valor">${d.indice_global}/100</span>
        </div>
        <div class="campo">
          <span class="label">Funcionario</span>
          <span class="valor">${d.funcionario}</span>
        </div>
        <div class="campo">
          <span class="label">Cargo</span>
          <span class="valor">${d.cargo}</span>
        </div>
        ${d.area ? '<div class="campo"><span class="label">Área</span><span class="valor">' + d.area + '</span></div>' : ''}
        <div class="campo">
          <span class="label">Email</span>
          <span class="valor">${d.email}</span>
        </div>
        ${d.telefono ? '<div class="campo"><span class="label">Teléfono</span><span class="valor">' + d.telefono + '</span></div>' : ''}
        <div class="campo">
          <span class="label">Fecha</span>
          <span class="valor">${d.fecha}</span>
        </div>
      `;
      modal.classList.add('active');
    });
}

function cerrarModal() {
  document.getElementById('modalDetalle').classList.remove('active');
}

document.getElementById('filtroMunicipio')?.addEventListener('keyup', function() {
  const filtro = this.value.toLowerCase();
  document.querySelectorAll('.fila-diagnostico').forEach(fila => {
    fila.style.display = fila.dataset.municipio.includes(filtro) ? '' : 'none';
  });
});
</script>

</body>
</html>
