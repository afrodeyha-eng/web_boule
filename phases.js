import { PHASES } from "./data.js";

export function renderPhase(id){
  const idx = PHASES.findIndex(p=>p.id===id);
  const p = PHASES[idx];

  document.querySelectorAll('.navitem').forEach(el=>el.classList.toggle('active', el.dataset.id===id));
  document.getElementById('pageTitle').innerHTML = `${p.label}<small id="pageSubtitle">Procesos y participantes de la fase</small>`;
  const pill = document.getElementById('phasePill');
  pill.style.display=''; pill.textContent = `FASE ${idx+1} / ${PHASES.length}`;

  const content = document.getElementById('content');
  let html = `<div class="breadcrumb">` + PHASES.map((ph,i)=>
    `<span class="bc-item ${ph.id===id?'active':''}" data-nav="${ph.id}">${i+1}. ${ph.label}</span>${i<PHASES.length-1?'<span class="bc-arrow">›</span>':''}`
  ).join('') + `</div>`;

  if(p.procesos.length){
    html += `<div class="section-label"><span class="n">P</span>Procesos</div><div class="proc-grid">`;
    p.procesos.forEach((pr,i)=>{ html += `<div class="proc-card" data-idx="${i}"><div class="step">PASO ${i+1}</div><div class="name">${pr.name}</div></div>`; });
    html += `</div>`;
  }

  html += `<div class="section-label"><span class="n">R</span>Participantes y Roles</div>
    <div class="tablewrap"><table><thead><tr><th>Rol</th><th>Función</th></tr></thead><tbody>`;
  p.participantes.forEach(pa=>{ html += `<tr><td class="rol">${pa.rol}</td><td>${pa.funcion}</td></tr>`; });
  html += `</tbody></table></div>`;

  content.innerHTML = html;

  content.querySelectorAll('.proc-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const already = card.classList.contains('selected');
      content.querySelectorAll('.proc-card').forEach(c=>c.classList.remove('selected'));
      if(!already) card.classList.add('selected');
    });
  });
  content.querySelectorAll('.bc-item').forEach(el=> el.addEventListener('click', ()=>renderPhase(el.dataset.nav)) );
}
