import { GEO_CATS, MAP_CENTER } from "./data.js";
import { subscribe, addPoint, deletePoint } from "./store.js";

let map=null, markers={}, userMarker=null;
let addingMode=false;
let activeFilters=new Set(Object.keys(GEO_CATS));
let POINTS=[];
let unsubscribe=null;
let storeMode="memory";

export function setStoreMode(mode){ storeMode = mode; }

export function renderGeo(){
  document.querySelectorAll('.navitem').forEach(el=>el.classList.toggle('active', el.dataset.id==='geo'));
  document.getElementById('pageTitle').innerHTML = `Geolocalización<small>Mapa operativo · puntos de faena</small>`;
  document.getElementById('phasePill').style.display='none';

  const syncOn = storeMode==="firebase";
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="sync-badge ${syncOn?'on':'off'}"><span class="dot"></span>${syncOn ? 'Sincronizado con Firebase (los puntos quedan guardados)' : 'Modo memoria — configurá Firebase en js/store.js para guardar'}</div>
    <div class="kpis" id="geoKpis"></div>
    <div class="adding-banner" id="addingBanner">📍 Modo alta activo — hacé clic en el mapa para ubicar el nuevo punto (Esc para cancelar)</div>
    <div class="geo-layout">
      <div id="map"></div>
      <div class="geo-side">
        <div class="geo-panel">
          <h3>Mi ubicación</h3>
          <p class="hint">Centrá el mapa en tu posición real usando el GPS del dispositivo.</p>
          <button class="geo-btn primary" id="locateBtn">◎ Ubicarme ahora</button>
          <div class="geo-status" id="locStatus">Ubicación no solicitada.</div>
        </div>

        <div class="geo-panel">
          <h3>Nuevo punto</h3>
          <p class="hint">Cargá un punto de faena. Escribí las coordenadas o activá el modo mapa y hacé clic.</p>
          <div class="field"><label>Nombre</label><input id="npName" placeholder="Ej: Frente de voladura N-3"></div>
          <div class="field"><label>Categoría</label><select id="npCat">${Object.entries(GEO_CATS).map(([k,c])=>`<option value="${k}">${c.label}</option>`).join('')}</select></div>
          <div class="field"><label>Descripción</label><input id="npDesc" placeholder="Detalle breve"></div>
          <div class="field"><label>Latitud</label><input id="npLat" placeholder="-34.658"></div>
          <div class="field"><label>Longitud</label><input id="npLng" placeholder="-68.345"></div>
          <button class="geo-btn orange" id="addMapBtn">📍 Marcar en el mapa</button>
          <button class="geo-btn primary" id="saveBtn" style="margin-top:8px;">Guardar punto</button>
        </div>

        <div class="geo-panel">
          <h3>Puntos registrados</h3>
          <div class="filter-row" id="filterRow"></div>
          <div class="points-list" id="pointsList"></div>
        </div>
      </div>
    </div>`;

  setTimeout(()=>{
    map = L.map('map', {zoomControl:true}).setView(MAP_CENTER, 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom:19, attribution:'© OpenStreetMap' }).addTo(map);
    map.on('click', (e)=>{
      if(addingMode){
        document.getElementById('npLat').value = e.latlng.lat.toFixed(5);
        document.getElementById('npLng').value = e.latlng.lng.toFixed(5);
        setAddingMode(false);
        document.getElementById('npName').focus();
      }
    });
    renderFilters();

    // suscripción a datos (tiempo real si Firebase)
    if(unsubscribe) unsubscribe();
    unsubscribe = subscribe((points)=>{
      POINTS = points;
      if(map){ renderMarkers(); renderPointsList(); renderKpis(); }
    });

    document.getElementById('locateBtn').addEventListener('click', locateUser);
    document.getElementById('addMapBtn').addEventListener('click', ()=>setAddingMode(!addingMode));
    document.getElementById('saveBtn').addEventListener('click', savePoint);
  }, 50);
}

function catIcon(color){
  return L.divIcon({
    className:'',
    html:`<div style="width:20px;height:20px;background:${color};border:3px solid #fff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 5px rgba(0,0,0,.35)"></div>`,
    iconSize:[20,20], iconAnchor:[10,20], popupAnchor:[0,-18]
  });
}

function renderMarkers(){
  Object.values(markers).forEach(m=>map.removeLayer(m));
  markers={};
  POINTS.filter(p=>activeFilters.has(p.cat)).forEach(p=>{
    const c = GEO_CATS[p.cat] || {label:p.cat, color:'#6b7688'};
    const m = L.marker([p.lat,p.lng], {icon:catIcon(c.color)}).addTo(map);
    m.bindPopup(`<b>${p.name}</b><br><span style="color:${c.color};font-weight:700;font-size:11px">${c.label}</span><br>${p.desc||''}<br><small>${(+p.lat).toFixed(4)}, ${(+p.lng).toFixed(4)}</small>`);
    markers[p.id]=m;
  });
}

function renderFilters(){
  const row = document.getElementById('filterRow');
  row.innerHTML = Object.entries(GEO_CATS).map(([k,c])=>{
    const on = activeFilters.has(k);
    return `<span class="filter-chip ${on?'active':''}" data-cat="${k}" style="${on?`background:${c.color}`:''}">${c.label}</span>`;
  }).join('');
  row.querySelectorAll('.filter-chip').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      const cat = chip.dataset.cat;
      if(activeFilters.has(cat)) activeFilters.delete(cat); else activeFilters.add(cat);
      renderFilters(); renderMarkers(); renderPointsList(); renderKpis();
    });
  });
}

function renderPointsList(){
  const list = document.getElementById('pointsList');
  if(!list) return;
  const visible = POINTS.filter(p=>activeFilters.has(p.cat));
  if(!visible.length){ list.innerHTML = `<p style="font-size:12px;color:#9aa3b5;padding:6px 2px">No hay puntos para los filtros activos.</p>`; return; }
  list.innerHTML = visible.map(p=>{
    const c = GEO_CATS[p.cat] || {label:p.cat, color:'#6b7688'};
    return `<div class="point-item" data-id="${p.id}">
      <span class="point-dot" style="background:${c.color}"></span>
      <div><div class="pi-name">${p.name}</div><div class="pi-meta">${c.label} · ${(+p.lat).toFixed(3)}, ${(+p.lng).toFixed(3)}</div></div>
      <span class="pi-del" data-del="${p.id}" title="Eliminar">✕</span>
    </div>`;
  }).join('');
  list.querySelectorAll('.point-item').forEach(el=>{
    el.addEventListener('click', (ev)=>{
      if(ev.target.dataset.del) return;
      const p = POINTS.find(x=>x.id==el.dataset.id);
      map.setView([p.lat,p.lng], 14);
      if(markers[p.id]) markers[p.id].openPopup();
    });
  });
  list.querySelectorAll('.pi-del').forEach(el=>{
    el.addEventListener('click', async (ev)=>{
      ev.stopPropagation();
      await deletePoint(el.dataset.del);
    });
  });
}

function renderKpis(){
  const el = document.getElementById('geoKpis');
  if(!el) return;
  const total = POINTS.length;
  const visible = POINTS.filter(p=>activeFilters.has(p.cat)).length;
  const cats = new Set(POINTS.map(p=>p.cat)).size;
  el.innerHTML = `
    <div class="kpi"><div class="v">${total}</div><div class="l">Puntos totales</div></div>
    <div class="kpi"><div class="v">${visible}</div><div class="l">Visibles</div></div>
    <div class="kpi"><div class="v">${cats}</div><div class="l">Categorías activas</div></div>`;
}

function setAddingMode(on){
  addingMode = on;
  document.getElementById('addingBanner').classList.toggle('show', on);
  if(map) map.getContainer().style.cursor = on ? 'crosshair' : '';
  document.getElementById('addMapBtn').textContent = on ? '✕ Cancelar marcado' : '📍 Marcar en el mapa';
}
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && addingMode) setAddingMode(false); });

async function savePoint(){
  const name = document.getElementById('npName').value.trim();
  const cat = document.getElementById('npCat').value;
  const desc = document.getElementById('npDesc').value.trim();
  const lat = parseFloat(document.getElementById('npLat').value);
  const lng = parseFloat(document.getElementById('npLng').value);
  if(!name){ alert('Ingresá un nombre para el punto.'); return; }
  if(isNaN(lat)||isNaN(lng)){ alert('Ingresá coordenadas válidas o marcá en el mapa.'); return; }
  if(!activeFilters.has(cat)) activeFilters.add(cat);
  await addPoint({ name, cat, lat, lng, desc });
  document.getElementById('npName').value='';
  document.getElementById('npDesc').value='';
  document.getElementById('npLat').value='';
  document.getElementById('npLng').value='';
  renderFilters();
  map.setView([lat,lng], 14);
}

function locateUser(){
  const st = document.getElementById('locStatus');
  if(!navigator.geolocation){ st.className='geo-status err'; st.textContent='El navegador no soporta geolocalización.'; return; }
  st.className='geo-status'; st.textContent='Solicitando ubicación…';
  navigator.geolocation.getCurrentPosition(
    (pos)=>{
      const {latitude, longitude, accuracy} = pos.coords;
      map.setView([latitude, longitude], 14);
      if(userMarker) map.removeLayer(userMarker);
      userMarker = L.circleMarker([latitude,longitude], {radius:9, color:'#1c5fa8', fillColor:'#1c5fa8', fillOpacity:.6, weight:3}).addTo(map);
      userMarker.bindPopup(`<b>Mi ubicación</b><br><small>Precisión ~${Math.round(accuracy)} m</small>`).openPopup();
      st.className='geo-status ok'; st.textContent=`Ubicación fijada: ${latitude.toFixed(4)}, ${longitude.toFixed(4)} (±${Math.round(accuracy)} m).`;
    },
    (err)=>{
      st.className='geo-status err';
      const msgs={1:'Permiso denegado. Habilitá la ubicación en el navegador.',2:'Posición no disponible.',3:'Tiempo de espera agotado.'};
      st.textContent = msgs[err.code] || 'No se pudo obtener la ubicación.';
    },
    {enableHighAccuracy:true, timeout:10000, maximumAge:0}
  );
}
