/* ===== Hemiciclo 29N: lógica de la página ===== */
(function(){
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));
const esc = s => String(s==null?"":s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmt = (n, d=1) => n==null||isNaN(n) ? "—" : n.toLocaleString("es-ES",{minimumFractionDigits:d, maximumFractionDigits:d});
const MONTHS = ["ene.","feb.","mar.","abr.","may.","jun.","jul.","ago.","sep.","oct.","nov.","dic."];
const dateLabel = iso => { const [y,m,d] = iso.split("-").map(Number); return d+" "+MONTHS[m-1]; };
const P = PARTIES;
const color = k => (P[k]||{}).color || "#9AA0A6";
const sname = k => (P[k]||{}).short || k;
const store = { get(k){ try{return localStorage.getItem(k)}catch(e){return null} }, set(k,v){ try{localStorage.setItem(k,v)}catch(e){} } };

/* ---------- Encuestas: media ---------- */
let includeCIS = false;
function latestPerFirm(withCIS){
  const seen = new Set(), out = [];
  POLLS.filter(p => p.d >= "2026-09-01" && !p.out && (withCIS || !p.cis))
       .sort((a,b)=> b.d.localeCompare(a.d))
       .forEach(p => { if(!seen.has(p.firm)){ seen.add(p.firm); out.push(p); } });
  return out;
}
function average(withCIS){
  const set = latestPerFirm(withCIS), avg = {};
  MAIN6.concat(MINORS).forEach(k => {
    const vals = set.map(p=> k==="FA" && p.FA!=null ? p.FA + (p.CFV||0) : p[k]).filter(v => v!=null); // FA incluye Compromís si la encuesta lo da aparte
    avg[k] = vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : MINOR_DEFAULTS[k];
    if (MINORS.includes(k) && vals.length < 3) avg[k] = MINOR_DEFAULTS[k];
  });
  return {avg, n:set.length, set};
}
function pollTargets(p){
  const avg = average(false).avg, t = {};
  MAIN6.forEach(k => t[k] = p[k]!=null ? p[k] : avg[k]);
  MINORS.forEach(k => t[k] = p[k]!=null ? p[k] : MINOR_DEFAULTS[k]);
  if (p.CFV) t.CFV = p.CFV;
  return t;
}
const PRESET_2023 = {PP:33.06,PSOE:31.68,VOX:12.38,FA:12.33,POD:0,SALF:0,ERC:1.89,JUNTS:1.60,BILDU:1.36,PNV:1.12,BNG:0.62,CC:0.47,UPN:0.21,AC:0,AA:0};

/* ---------- Hemiciclo (SVG) ---------- */
function hemicycle(totals, opts={}){
  const W = 640, H = 340, cx = W/2, cy = H - 14, R = 300, r0 = 120, rows = 11, total = 350;
  const radii = Array.from({length:rows}, (_,i)=> r0 + (R - r0) * i/(rows-1));
  const sumR = radii.reduce((a,b)=>a+b,0);
  let counts = radii.map(r => Math.round(total * r / sumR));
  let diff = total - counts.reduce((a,b)=>a+b,0); counts[rows-1] += diff;
  const pts = [];
  radii.forEach((r,i) => { const k = counts[i]; for(let j=0;j<k;j++){ const a = Math.PI - (k===1?Math.PI/2: j*Math.PI/(k-1)); pts.push({a, x: cx + r*Math.cos(a), y: cy - r*Math.sin(a)}); } });
  pts.sort((p,q)=> q.a - p.a);
  const seq = []; SEAT_ORDER.forEach(k => { for(let i=0;i<(totals[k]||0);i++) seq.push(k); });
  while (seq.length < total) seq.push("_");
  const dotR = (R - r0)/(rows-1) * 0.42;
  let svg = `<svg class="hemi" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opts.label||"Reparto de 350 escaños")}">`;
  pts.forEach((p,i) => { const k = seq[i]; svg += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${dotR.toFixed(1)}" ${k==="_"?'style="fill:var(--soft)"':'fill="'+color(k)+'"'}><title>${esc(k==="_"?"Sin asignar":sname(k))}</title></circle>`; });
  const maj = Object.values(totals).reduce((a,b)=>a+b,0);
  svg += `<text x="${cx}" y="${cy-62}" text-anchor="middle" font-weight="800" font-size="54" style="fill:var(--ink);font-family:var(--display)">${opts.center!=null?opts.center:350}</text>`;
  svg += `<text x="${cx}" y="${cy-36}" text-anchor="middle" font-size="13" style="fill:var(--muted);font-family:var(--body)">${esc(opts.sub||"escaños · mayoría 176")}</text>`;
  const ty = cy - R - dotR; svg += `<line x1="${cx}" y1="${(ty-14).toFixed(1)}" x2="${cx}" y2="${(ty-3).toFixed(1)}" stroke-width="2" style="stroke:var(--ink)"/><text x="${cx+6}" y="${(ty-4).toFixed(1)}" font-size="11" style="fill:var(--muted);font-family:var(--body)">176</text>`;
  return svg + "</svg>";
}
function legend(totals){
  return `<div class="hemi-legend">` + SEAT_ORDER.slice().sort((a,b)=>(totals[b]||0)-(totals[a]||0)).filter(k=>totals[k]>0)
    .map(k=>`<span><i class="dot" style="background:${color(k)}"></i>${esc(sname(k))} <b>${totals[k]}</b></span>`).join("") + `</div>`;
}
const sumOf = (t, ks) => ks.reduce((a,k)=>a+(t[k]||0),0);
const BLOCS = [
  {id:"ppvox", name:"PP + Vox", ks:["PP","VOX"]},
  {id:"dcha", name:"PP + Vox + UPN + CC", ks:["PP","VOX","UPN","CC"]},
  {id:"izq", name:"PSOE + FA + Podemos y sus coaliciones", ks:["PSOE","FA","POD","CFV","UPC"]},
  {id:"inv23", name:"Bloque de la investidura de 2023", ks:["PSOE","FA","POD","CFV","UPC","ERC","JUNTS","BILDU","PNV","BNG","CC"], note:"PSOE, Sumar/FA, Podemos, Compromís, UPC, ERC, Junts, Bildu, PNV, BNG y CC"},
  {id:"grande", name:"PP + PSOE", ks:["PP","PSOE"]}
];

/* ---------- Vistas ---------- */
const VIEWS = [["resumen","Resumen"],["partidos","Partidos y programas"],["comparar","Comparar"],["encuestas","Encuestas"],["grupos","Voto por grupos"],["escanos","Congreso"],["senado","Senado"],["mapa","Mapa"],["pregunta","Pregúntale a Claude"],["calendario","Calendario y voto"]];
const SITE = typeof SITE_MODE !== "undefined" && SITE_MODE; // versión web independiente: sin consulta a Claude
const TABS = ["resumen","partidos","escanos","senado","pregunta","calendario"].filter(t => !(SITE && t === "pregunta"));
const SUBNAV = {partidos:[["partidos","Partidos y programas"],["comparar","Comparar"]], escanos:[["escanos","Escaños y pactos"],["encuestas","Encuestas"],["grupos","Voto por grupos"],["mapa","Mapa","congreso"]], senado:[["senado","Senado"],["mapa","Mapa","senado"]]};
const parentOf = id => id==="comparar" ? "partidos" : (id==="encuestas"||id==="grupos") ? "escanos" : id==="mapa" ? (mapMode==="senado" ? "senado" : "escanos") : id;
function subnav(id){ const items = SUBNAV[parentOf(id)]; if (!items) return "";
  return `<nav class="subnav" aria-label="Apartados">${items.map(([v,l,mm])=>`<button class="subtab" data-go="${v}"${mm?` data-mapmode="${mm}"`:""} aria-pressed="${v===id}">${l}</button>`).join("")}</nav>`; }
function markTab(id){ const p = parentOf(id); $$("#tabs .tab").forEach(b => b.setAttribute("aria-selected", b.dataset.v===p ? "true":"false")); }
function renderTabs(){
  $("#tabs").innerHTML = VIEWS.filter(([id])=>TABS.includes(id)).map(([id,l])=>`<button class="tab" role="tab" id="tab-${id}" aria-controls="v-${id}" data-v="${id}">${l}</button>`).join("");
  $$("#tabs .tab").forEach(b => b.addEventListener("click", ()=> show(b.dataset.v, true)));
}
function show(id, push){
  if (!VIEWS.some(v=>v[0]===id) || (SITE && id === "pregunta")) id = "resumen";
  $$(".view").forEach(v => v.hidden = v.id !== "v-"+id);
  if (id === "mapa") renderMapa(); else if (id === "senado") renderSenado();
  markTab(id);
  if (push) { try{ history.replaceState(null,"","#"+id); }catch(e){} try{ window.scrollTo({top:0}); }catch(e){} }
  const t = $("#tab-"+parentOf(id)), bar = $("#tabs"); if (t && bar) { const l = t.offsetLeft, r = l + t.offsetWidth; if (l < bar.scrollLeft || r > bar.scrollLeft + bar.clientWidth) bar.scrollLeft = l - 16; }
}

/* ---------- Cuenta atrás ---------- */
function daysLeft(){ const ms = new Date(ELECTION_DATE) - new Date(); return Math.max(0, Math.ceil(ms/86400000)); }
function renderCount(){
  const d = daysLeft();
  $("#count").innerHTML = d>0 ? `Faltan <strong class="num">${d}</strong> días` : `<strong>Jornada electoral</strong>`;
}

/* ---------- RESUMEN ---------- */
function renderResumen(){
  const {avg, n} = average(false);
  const sim = simulate(avg).totals;
  const order = MAIN6.slice().sort((a,b)=>avg[b]-avg[a]);
  const maxV = 40;
  const today = new Date().toISOString().slice(0,10);
  const next = CALENDAR.filter(c => c.d >= today).slice(0,3);
  $("#v-resumen").innerHTML = `
  <section class="hero">
    <div class="stack">
      <span class="eyebrow">Elecciones generales · Congreso y Senado</span>
      <h1>Domingo <em>29 de noviembre</em> de 2026</h1>
      <p class="lead">Consulta qué propone cada partido, qué dicen las encuestas, cómo se traducen en escaños y qué mayorías son posibles.${SITE?"":" Y pregunta a Claude lo que no encuentres."}</p>
      <div class="hero-facts">
        <div class="fact"><b class="num">${daysLeft()}</b><span>días para votar</span></div>
        <div class="fact"><b class="num">350</b><span>diputados</span></div>
        <div class="fact"><b class="num">176</b><span>mayoría absoluta</span></div>
        <div class="fact"><b class="num">52</b><span>circunscripciones</span></div>
      </div>
    </div>
    <div class="panel stack">
      <div class="row" style="justify-content:space-between"><span class="eyebrow">Proyección con la media de ${n} encuestas</span><button class="linkbtn" data-go="escanos">Abrir simulador</button></div>
      <div class="hemi-wrap">${hemicycle(sim,{center:sim.PP, sub:"escaños de PP · mayoría 176"})}</div>
      ${legend(sim)}
      <p class="small muted">Modelo propio: resultados de 2023 por provincia + media de encuestas (sin CIS) + D'Hondt con barrera del 3%. No es una encuesta.</p>
    </div>
  </section>

  <section class="stack">
    <h3>Lo último</h3>
    <div class="panel news">${NEWS.map(([dt,t])=>`<div class="news-item"><b>${esc(dt)}</b><span>${esc(t)}</span></div>`).join("")}</div>
  </section>

  <section class="grid2">
    <div class="panel stack">
      <span class="eyebrow">Estimación de voto · media desde el 1 de sept.</span>
      <div class="bars">${order.map(k=>`<div class="bar"><span class="nm"><i class="dot" style="background:${color(k)}"></i>${esc(sname(k))}</span><span class="tr"><i style="width:${(avg[k]/maxV*100).toFixed(1)}%;background:${color(k)}"></i></span><span class="v num">${fmt(avg[k])}%</span></div>`).join("")}</div>
      <p class="small muted">Última encuesta de cada empresa publicada desde el 1 de septiembre. Datos a ${UPDATED}. <button class="linkbtn" data-go="encuestas">Ver todas las encuestas</button> · <button class="linkbtn" data-go="grupos">Voto por edad, sexo y profesión</button></p>
    </div>
    <div class="panel stack">
      <span class="eyebrow">¿Quién suma 176? · con la proyección media</span>
      <div class="blocs">${BLOCS.slice(0,4).map(b=>{ const s = sumOf(sim,b.ks); return `<div class="bloc"><span class="lbl">${esc(b.name)}</span><span class="n num">${s}</span><div class="meter"><i style="width:${(s/350*100).toFixed(1)}%"></i><span class="maj"></span></div><span class="state ${s>=176?"ok":"no"}">${s>=176?"Mayoría absoluta":"Le faltan "+(176-s)}</span></div>`; }).join("")}</div>
    </div>
  </section>

  <section class="stack">
    <div class="row" style="justify-content:space-between"><h3>Próximas fechas</h3><button class="linkbtn" data-go="calendario">Calendario completo</button></div>
    <div class="next3">${next.map(c=>{ const [y,m,d] = c.d.split("-").map(Number); return `<div class="date-card"><div class="dd num">${d}</div><div class="mm">${MONTHS[m-1]} ${y}</div><p style="margin-top:8px">${esc(c.t)}</p></div>`; }).join("")}</div>
  </section>

  <section class="grid2">
    <div class="stack">
      <h3>Cómo hemos llegado aquí</h3>
      <div class="timeline">${CONTEXT.map(([d,t])=>`<div class="tl"><b>${esc(d)}</b>${esc(t)}</div>`).join("")}</div>
    </div>
    <div class="stack">
      <h3>Antes de leer</h3>
      <div class="panel stack small">
        <p><b>Programas.</b> A ${UPDATED} ningún partido ha publicado su programa para el 29-N (el del PP lo redacta Alma Ezcurra). Los anuncios más recientes van marcados como <span class="new">nuevo</span>. En cada ficha tienes sus documentos más recientes con enlace al original: propuestas de precampaña (<span class="flag t2026">2026</span>), ponencias de congreso u otros textos (<span class="flag tdoc">2024</span>) y el programa de las generales de 2023 (<span class="flag t2023">2023</span>). En el comparador, <span class="flag tvoto">voto</span> indica cómo votó el partido.</p>
        <p><b>Encuestas.</b> Son estimaciones con margen de error de unos ±2–3 puntos. El CIS se muestra aparte porque su estimación difiere mucho del resto.</p>
        <p><b>Escaños.</b> Los cálculos de esta web aplican un modelo sencillo y transparente, con las coaliciones registradas el 16 de octubre; puedes ver el reparto provincia a provincia.</p>
        <p><b>Neutralidad.</b> El orden de los partidos sigue su resultado o su estimación, nunca una preferencia.</p>
      </div>
    </div>
  </section>`;
}

/* ---------- PARTIDOS ---------- */
let currentParty = "PP", currentDoc = 0;
const STATE_P = PROGRAM_PARTIES.filter(k=>MAIN6.includes(k)), TERR_P = PROGRAM_PARTIES.filter(k=>!MAIN6.includes(k));
const flagCls = t => t==="2026"?"t2026":t==="2023"?"t2023":t==="voto"?"tvoto":"tdoc";
const docTag = d => d.kind==="2026"?"2026":d.kind==="2023"?"2023":((d.date.match(/20\d\d/g)||[]).pop()||"doc");
function partyChip(k){ return `<button class="chip" data-p="${k}" aria-pressed="${k===currentParty}"><i class="dot" style="background:${color(k)}"></i>${esc(P[k].name)}</button>`; }
function renderPartidos(){
  const v = $("#v-partidos");
  v.innerHTML = `${subnav("partidos")}
  <div class="view-head"><span class="eyebrow">Partidos y programas</span><h2>Qué propone cada partido</h2>
  <p class="lead">Los documentos programáticos más recientes de cada partido, resumidos y con enlace al original. Ninguno ha publicado aún su programa para el 29-N.</p></div>
  <div class="pick-groups">
    <div class="pick-group"><span class="eyebrow">Estatales</span><div class="party-pick" role="group" aria-label="Partidos estatales">${STATE_P.map(partyChip).join("")}</div></div>
    <div class="pick-group"><span class="eyebrow">Territoriales</span><div class="party-pick" role="group" aria-label="Partidos territoriales">${TERR_P.map(partyChip).join("")}</div></div>
  </div>
  <div id="party-detail" class="stack"></div>
  <section class="stack">
    <h3>Otros partidos</h3>
    <p class="muted small">Sin programa para unas generales o que no se presentan al 29-N.</p>
    <div class="terr">${OTHER_P.map(k=>{ const p=P[k]; return `<div class="panel"><h4><i class="dot" style="background:${p.color}"></i>${esc(p.name)}</h4><span class="small muted">${esc(p.scope)} · ${esc(p.leader)} (${esc(p.role.toLowerCase())})</span><span class="small">${p.r23?`2023: ${fmt(p.r23[0],2)}% y <b>${p.r23[1]}</b> escaño${p.r23[1]>1?"s":""}`:"No se presentó en 2023"}</span><p class="small">${esc(MINOR_NOTES[k])}</p></div>`; }).join("")}</div>
  </section>`;
  $$("#v-partidos .party-pick .chip").forEach(b => b.addEventListener("click", ()=>{ currentParty=b.dataset.p; currentDoc=0; $$("#v-partidos .party-pick .chip").forEach(c=>c.setAttribute("aria-pressed", c===b?"true":"false")); renderPartyDetail(); }));
  renderPartyDetail();
}
function renderPartyDetail(){
  const k = currentParty, p = P[k], g = PROGRAMS[k], avg = average(false).avg;
  if (currentDoc >= g.docs.length) currentDoc = 0;
  const d = g.docs[currentDoc];
  $("#party-detail").innerHTML = `
  <div class="grid2">
    <div class="ballot" style="--pc:${p.color}">
      <small>Elecciones al Congreso de los Diputados · 29 de noviembre de 2026</small>
      <div class="pname">${esc(p.name)}</div>
      <div class="cand">${esc(p.leader)}</div>
      <div class="small" style="color:#3B3F47">${esc(p.role)}${MAIN6.includes(k)?"":" · "+esc(p.scope)}</div>
      <div class="facts"><span>2023: ${p.r23?`<b>${fmt(p.r23[0],2)}%</b> · <b>${p.r23[1]}</b> escaño${p.r23[1]>1?"s":""}`:"no concurrió solo"}</span><span>Media de encuestas: <b>${fmt(avg[k], MAIN6.includes(k)?1:2)}%</b></span></div>
    </div>
    <div class="panel stack">
      <span class="eyebrow">En una frase</span>
      <p style="font-size:17px">${esc(g.pitch)}</p>
      ${p.note?`<p class="note">${esc(p.note)}</p>`:""}
      ${SITE?"":`<div class="row"><button class="btn" data-ask="${k}">Preguntar a Claude por ${esc(sname(k))}</button></div>`}
    </div>
  </div>
  <div class="panel prog">
    <div class="doc-head">
      <span class="eyebrow">Documentos (${g.docs.length})</span>
      <div class="party-pick" id="doc-pick" role="group" aria-label="Documento">${g.docs.map((x,i)=>`<button class="chip" data-d="${i}" aria-pressed="${i===currentDoc}">${esc(x.label)}${x.isNew?'<span class="new">nuevo</span>':""}</button>`).join("")}</div>
    </div>
    <div class="doc-meta">
      <span class="flag ${flagCls(docTag(d))}">${esc(docTag(d))}</span>
      <div><b>${esc(d.title)}</b><span class="small muted"> · ${esc(d.date)}</span></div>
      ${d.url?`<a class="btn ghost doc-link" href="${esc(d.url)}" target="_blank" rel="noopener">${/\.pdf$|\/pdf\//i.test(d.url)?"Documento original (PDF) ↗":"Ver fuente ↗"}</a>`:""}
    </div>
    ${d.more?`<div class="src more small"><span>Más fuentes:</span>${d.more.map(([t,u])=>`<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>`).join("")}</div>`:""}
    ${d.sections.map(s=>`<div class="prog-block"><h4>${esc(s.topic)}</h4><ul>${s.items.map(i=>`<li>${esc(i)}</li>`).join("")}</ul></div>`).join("")}
    <p class="small muted">Resumen propio a partir de la fuente enlazada.</p>
  </div>`;
  $$("#doc-pick .chip").forEach(b => b.addEventListener("click", ()=>{ currentDoc=+b.dataset.d; renderPartyDetail(); }));
  const askB = $("[data-ask]", $("#party-detail")); if (askB) askB.addEventListener("click", e => askAbout(`Resume las propuestas de ${P[e.currentTarget.dataset.ask].name} para el 29-N y en qué se diferencian de las de otros partidos.`));
}

/* ---------- COMPARAR ---------- */
let currentTopic = TOPICS[0].id;
let answers = {};
try { answers = JSON.parse(store.get("h29n-quiz")||"{}") || {}; } catch(e){ answers = {}; }
function renderComparar(){
  const v = $("#v-comparar");
  v.innerHTML = `${subnav("comparar")}
  <div class="view-head"><span class="eyebrow">Partidos · Comparar</span><h2>Tema a tema</h2><p class="lead">Las posiciones de los seis partidos estatales, una al lado de otra. La etiqueta indica de qué documento sale cada propuesta; las de los partidos territoriales están en su ficha.</p></div>
  <div class="party-pick" id="topic-pick" role="group" aria-label="Tema">${TOPICS.map(t=>`<button class="chip" data-t="${t.id}" aria-pressed="${t.id===currentTopic}">${esc(t.name)}</button>`).join("")}</div>
  <div class="cmp" id="cmp"></div>
  <section class="stack" style="margin-top:12px">
    <div class="view-head"><span class="eyebrow">Test orientativo</span><h2>¿Con quién coincides?</h2>
    <p class="lead">Siete afirmaciones sobre las que PP, PSOE, Vox, Frente Amplio y Podemos han fijado posición con propuestas o votos. Cada respuesta se compara solo con los partidos de los que hay dato.</p></div>
    <div class="grid2"><div class="quiz" id="quiz"></div><div class="panel stack" id="quiz-res" style="position:sticky; top:120px"></div></div>
  </section>`;
  $$("#topic-pick .chip").forEach(b => b.addEventListener("click", ()=>{ currentTopic=b.dataset.t; $$("#topic-pick .chip").forEach(c=>c.setAttribute("aria-pressed", c===b?"true":"false")); renderCmp(); }));
  renderCmp(); renderQuiz();
}
function renderCmp(){
  const t = TOPICS.find(x=>x.id===currentTopic);
  $("#cmp").innerHTML = MAIN6.map(k=>{ const rows = t.rows[k]||[]; const empty = !rows.length;
    return `<div class="cell${empty?" empty":""}" style="--pc:${color(k)}"><h4>${esc(P[k].name)}</h4>${empty?`<p>Sin propuesta concreta localizada.</p>`:rows.map(([tag,txt])=>`<p class="cmp-row"><span class="flag ${flagCls(tag)}">${esc(tag)}</span>${esc(txt)}</p>`).join("")}</div>`; }).join("");
}
const QUIZ_P = ["PP","PSOE","VOX","FA","POD"];
function renderQuiz(){
  $("#quiz").innerHTML = STATEMENTS.map((s,i)=>`
    <div class="q"><span class="eyebrow">${i+1} de ${STATEMENTS.length}</span><span class="qt">${esc(s.q)}</span>
      <div class="seg" role="group" aria-label="Tu respuesta">${[[1,"De acuerdo"],[0,"Neutral"],[-1,"En desacuerdo"]].map(([v,l])=>`<button data-i="${i}" data-a="${v}" aria-pressed="${answers[i]===v}">${l}</button>`).join("")}</div>
      <details><summary>En qué nos basamos</summary><p class="small" style="margin-top:6px">${esc(s.basis)}</p><p class="small muted" style="margin-top:4px">${QUIZ_P.map(k=>`${sname(k)}: ${s.pos[k]==null?"sin dato":s.pos[k]===1?"a favor":s.pos[k]===0?"matiza":"en contra"}`).join(" · ")}</p></details>
    </div>`).join("");
  $$("#quiz .seg button").forEach(b => b.addEventListener("click", ()=>{
    const i = +b.dataset.i, a = +b.dataset.a;
    if (answers[i]===a) delete answers[i]; else answers[i]=a;
    store.set("h29n-quiz", JSON.stringify(answers)); renderQuiz();
  }));
  const done = Object.keys(answers).length;
  const res = QUIZ_P.map(k=>{ let s=0,n=0; STATEMENTS.forEach((st,i)=>{ const a=answers[i], p=st.pos[k]; if(a==null||p==null) return; s += 1 - Math.abs(a-p)/2; n++; }); return {k, pct: n? s/n*100 : null, n}; })
    .sort((a,b)=>(b.pct??-1)-(a.pct??-1));
  $("#quiz-res").innerHTML = `<span class="eyebrow">Tu coincidencia · ${done} de ${STATEMENTS.length} respondidas</span>
    ${done? `<div class="bars">${res.map(r=>`<div class="bar"><span class="nm"><i class="dot" style="background:${color(r.k)}"></i>${esc(sname(r.k))}</span><span class="tr"><i style="width:${(r.pct||0).toFixed(0)}%;background:${color(r.k)}"></i></span><span class="v num">${r.pct==null?"—":fmt(r.pct,0)+"%"}</span></div>`).join("")}</div>
    <p class="small muted">Porcentaje sobre las afirmaciones en las que ese partido tiene posición conocida. Es una orientación con pocas preguntas, no una recomendación de voto.</p>
    <div class="row"><button class="btn ghost" id="quiz-reset">Borrar respuestas</button></div>`
    : `<p class="muted">Responde a las afirmaciones de la izquierda y aquí verás con qué partidos coincides más.</p>`}`;
  const r = $("#quiz-reset"); if (r) r.addEventListener("click", ()=>{ answers={}; store.set("h29n-quiz","{}"); renderQuiz(); });
}

/* ---------- ENCUESTAS ---------- */
function renderEncuestas(){
  const v = $("#v-encuestas");
  const A = average(includeCIS);
  const rows = POLLS.slice().sort((a,b)=>b.d.localeCompare(a.d));
  v.innerHTML = `${subnav("encuestas")}
  <div class="view-head"><span class="eyebrow">Congreso · Encuestas</span><h2>Qué dicen los sondeos</h2>
  <p class="lead">Estimación de voto de las principales encuestadoras y en qué se traduce en escaños según nuestro modelo.</p></div>
  <div class="row" style="justify-content:space-between">
    <span class="eyebrow">Media de las últimas encuestas de ${A.n} empresas (desde el 1 de sept.)</span>
    <label class="toggle"><input type="checkbox" id="cis-tog" ${includeCIS?"checked":""}> Incluir el CIS en la media</label>
  </div>
  <div class="tiles">${MAIN6.slice().sort((a,b)=>A.avg[b]-A.avg[a]).map(k=>`<div class="tile" style="--pc:${color(k)}"><div class="small" style="font-weight:600">${esc(sname(k))}</div><div class="n num">${fmt(A.avg[k])}<span style="font-size:20px">%</span></div><div class="d">2023: ${P[k].r23?fmt(P[k].r23[0])+"%":"—"}</div></div>`).join("")}</div>
  <section class="panel stack minw0">
    <div class="row" style="justify-content:space-between; align-items:flex-end"><div><span class="eyebrow">Encuestas en escaños</span><h3 style="margin-top:6px">Cada encuesta, en el Congreso</h3></div>
      <label class="toggle"><input type="checkbox" id="seat-all" ${seatRowsAll?"checked":""}> Mostrar también las anteriores al 1 de octubre</label></div>
    <div class="seat-legend">${SEAT_ORDER.filter(k=>MODEL_PARTIES.includes(k)).map(k=>`<span><i class="sq" style="background:${color(k)}"></i>${esc(sname(k))}</span>`).join("")}</div>
    <div class="seat-rows" id="seat-rows"></div>
    <p class="small muted">Los 350 escaños, ordenados de izquierda a derecha. La línea central marca la mitad de la cámara: quien la cruza llega a la mayoría absoluta (176). Escaños calculados con nuestro modelo a partir de cada encuesta, para compararlas con el mismo método; los que publica cada encuestadora están en la tabla de abajo.</p>
  </section>
  <section class="panel stack minw0">
    <div><span class="eyebrow">Partido a partido</span><h3 style="margin-top:6px">Qué le da cada encuestadora</h3></div>
    <div class="party-pick" id="pb-pick" role="group" aria-label="Partido">${MAIN6.concat(["ERC","JUNTS","BILDU","PNV"]).map(k=>`<button class="chip" data-pb="${k}" aria-pressed="${k===pollParty}"><i class="dot" style="background:${color(k)}"></i>${esc(sname(k))}</button>`).join("")}</div>
    <div id="party-bars"></div>
  </section>
  <section class="panel stack">
    <h3>Evolución en 2026</h3>
    <div id="trend"></div>
    <p class="small muted">Media mensual de las encuestas publicadas (sin el CIS). ${TREND.length} sondeos de enero a octubre.</p>
  </section>
  <section class="stack">
    <h3>Encuestas recientes</h3>
    <div class="table-wrap"><table>
      <thead><tr><th>Encuestadora</th><th>Fecha</th>${MAIN6.map(k=>`<th>${esc(sname(k))}</th>`).join("")}<th>Escaños publicados</th><th>Nuestro modelo</th></tr></thead>
      <tbody>${rows.map((p,i)=>{ const top = MAIN6.reduce((a,k)=>(p[k]||0)>(p[a]||0)?k:a,"PP"); const s = simulate(pollTargets(p)).totals;
        return `<tr class="${p.cis||p.out?"cis":""}"><td class="pollname"><b>${esc(p.firm)}</b><span>${esc([p.media, p.cis||p.out?"fuera de la media":"", p.field?(p.out?p.field:"campo: "+p.field):""].filter(Boolean).join(" · "))}</span></td><td>${dateLabel(p.d)}</td>
        ${MAIN6.map(k=>`<td class="${k===top?"top1":""}">${p[k]==null?"—":fmt(p[k])}${k==="FA"&&p.CFV?`<small class="muted" title="Compromís, aparte"> +${fmt(p.CFV)} C.</small>`:""}</td>`).join("")}
        <td style="text-align:left; white-space:normal; min-width:180px" class="small">${esc(p.seats||"—")}</td>
        <td><button class="linkbtn" data-load="${POLLS.indexOf(p)}">PP ${s.PP} · PSOE ${s.PSOE} · Vox ${s.VOX}</button></td></tr>`; }).join("")}</tbody>
    </table></div>
    <p class="small muted">«Nuestro modelo» aplica cada encuesta a los resultados de 2023 por provincia; donde la encuesta no da dato de partidos pequeños se usa su media. «+C.» es Compromís cuando la encuesta lo da aparte: en la media lo sumamos al Frente Amplio, porque el modelo pasa ese voto a Compromís-Front Valencià en la C. Valenciana. Las reestimaciones de los datos del CIS se muestran pero no entran en la media. Pulsa para abrirla en el simulador. Otro sondeo, el de Wintston para Artículo14 (29 sep.–1 oct.), solo publicó bloques: PP y Vox 204 escaños; PSOE y Sumar 112.</p>
  </section>`;
  $("#cis-tog").addEventListener("change", e => { includeCIS = e.target.checked; renderEncuestas(); });
  $("#seat-all").addEventListener("change", e => { seatRowsAll = e.target.checked; renderSeatRows(); });
  $$("#pb-pick .chip").forEach(b => b.addEventListener("click", ()=>{ pollParty = b.dataset.pb; $$("#pb-pick .chip").forEach(c=>c.setAttribute("aria-pressed", c===b?"true":"false")); renderPartyBars(); }));
  renderSeatRows(); renderPartyBars();
  $$("[data-load]", v).forEach(b => b.addEventListener("click", ()=>{ loadPreset("poll:"+b.dataset.load); renderEscanos(); show("escanos", true); }));
  renderTrend();
}
function renderTrend(){
  const ks = ["PP","PSOE","VOX","FA","POD","SALF"], idx = {PP:1,PSOE:2,VOX:3,FA:4,POD:5,SALF:6};
  const months = [...new Set(TREND.map(r=>r[0]))].sort((a,b)=>a-b);
  const series = {}; ks.forEach(k => series[k] = months.map(m => { const v = TREND.filter(r=>r[0]===m && r[idx[k]]!=null).map(r=>r[idx[k]]); return v.length ? v.reduce((a,b)=>a+b,0)/v.length : null; }));
  const W=720, H=300, L=36, Rr=128, T=14, B=28, ymax=40;
  const x = i => L + i*(W-L-Rr)/(months.length-1), y = v => T + (H-T-B)*(1 - v/ymax);
  let s = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Evolución mensual de la estimación de voto en 2026">`;
  [0,10,20,30,40].forEach(g => { s += `<line x1="${L}" x2="${W-Rr}" y1="${y(g)}" y2="${y(g)}" stroke-width="1" style="stroke:var(--line)"/><text x="${L-8}" y="${y(g)+4}" text-anchor="end" font-size="11" style="fill:var(--muted)">${g}%</text>`; });
  months.forEach((m,i)=>{ s += `<text x="${x(i)}" y="${H-8}" text-anchor="middle" font-size="11" style="fill:var(--muted)">${MONTHS[m-1].replace(".","")}</text>`; });
  const ends = [];
  ks.forEach(k => { const pts = series[k].map((v,i)=> v==null?null:[x(i),y(v)]).filter(Boolean);
    s += `<polyline fill="none" stroke="${color(k)}" stroke-width="${k==="PP"||k==="PSOE"||k==="VOX"?3:2}" stroke-linejoin="round" points="${pts.map(p=>p.map(n=>n.toFixed(1)).join(",")).join(" ")}"/>`;
    series[k].forEach((v,i)=>{ if(v!=null) s += `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3" fill="${color(k)}"><title>${sname(k)} · ${MONTHS[months[i]-1]}: ${fmt(v)}%</title></circle>`; });
    const lv = series[k][series[k].length-1]; ends.push({k, v:lv, y:y(lv)}); });
  ends.sort((a,b)=>a.y-b.y); for (let i=1;i<ends.length;i++) if (ends[i].y - ends[i-1].y < 13) ends[i].y = ends[i-1].y + 13;
  ends.forEach(e => { s += `<text x="${W-Rr+8}" y="${(e.y+4).toFixed(1)}" font-size="12" font-weight="700" style="fill:var(--ink)"><tspan fill="${color(e.k)}">●</tspan> ${esc(sname(e.k))} ${fmt(e.v)}</text>`; });
  $("#trend").innerHTML = s + "</svg>";
}


/* ---------- Voto por grupos ---------- */
let groupSrc = "cis", groupDim = "sexo";
function renderGrupos(){
  const v = $("#v-grupos");
  const S = GROUPS.sources.find(x=>x.id===groupSrc) || GROUPS.sources[0], ks = S.parties;
  const dim = S.dims.find(d=>d.id===groupDim) || S.dims[0];
  const lead = r => { let b=-1; ks.forEach((k,i)=>{ const x=r[i+2]; if (x!=null && (b<0 || x>r[b+2])) b=i; }); return b; };
  const rest = r => Math.max(0, 100 - ks.reduce((a,k,i)=>a+(r[i+2]||0),0));
  const bar = (r, isTot) => { const t = lead(r);
    const segs = ks.map((k,i)=>{ const val = r[i+2]; if (!val) return ""; const d = isTot ? null : val - S.total[i+2];
      const tip = `<b>${esc(r[0])}</b><br>${esc(sname(k))}: ${fmt(val)}%${d==null?"":` (${d>=0?"+":"−"}${fmt(Math.abs(d))} puntos sobre la media)`}`;
      return `<i tabindex="0" style="width:${val}%;background:${color(k)};color:${isDark(color(k))?"#fff":"#15171C"}" data-tip="${esc(tip)}">${val>=7?`<span class="num">${fmt(val,0)}</span>`:""}</i>`; }).join("");
    const o = rest(r);
    return `<div class="sgrow${isTot?" sgtot":""}"><span class="gname">${esc(r[0])}<small>${r[1]?`${r[1].toLocaleString("es-ES")} entrevistas · `:""}primero: ${t<0?"—":esc(sname(ks[t]))}</small></span>
      <span class="sgbar">${segs}${o>0.4?`<i class="sgrest" tabindex="0" style="width:${o.toFixed(1)}%" data-tip="<b>${esc(r[0])}</b><br>${esc(S.rest)}: ${fmt(o)}%">${o>=7?`<span class="num">${fmt(o,0)}</span>`:""}</i>`:""}</span></div>`; };
  const leaders = S.dims.filter(d=>d.id!=="ideo").map(d=>{ const by = {}; d.rows.forEach(r=>{ const i = lead(r); if (i<0) return; (by[ks[i]] = by[ks[i]]||[]).push(r[0].replace(/ años$/,"")); }); return {d, by}; });
  v.innerHTML = `${subnav("grupos")}
  <div class="view-head"><span class="eyebrow">Congreso · Voto por grupos</span><h2>¿Quién vota a quién?</h2>
  <p class="lead">Cómo se reparte el voto por sexo, edad, profesión, estudios, clase social, municipio, religión e ideología, según las encuestas que publican estos cruces.</p></div>
  <div class="stack" style="gap:12px">
    <div class="row"><span class="eyebrow" style="min-width:70px">Encuesta</span><div class="party-pick" id="g-src" role="group" aria-label="Encuesta">${GROUPS.sources.map(x=>`<button class="chip" data-src="${x.id}" aria-pressed="${x.id===S.id}">${esc(x.label)}</button>`).join("")}</div></div>
    <div class="row"><span class="eyebrow" style="min-width:70px">Grupo</span><div class="party-pick" id="g-pick" role="group" aria-label="Grupo">${S.dims.map(d=>`<button class="chip" data-g="${d.id}" aria-pressed="${d.id===dim.id}">${esc(d.label)}</button>`).join("")}</div></div>
  </div>
  <section class="panel stack minw0">
    <div class="row" style="justify-content:space-between; align-items:flex-start"><div><span class="eyebrow">${esc(S.firm)} · ${esc(S.what)}</span><h3 style="margin-top:6px">${esc(dim.label)}</h3></div>
      <span class="small muted">Publicada el ${dateLabel(S.d)} · campo ${esc(S.field)}</span></div>
    <div class="seat-legend">${ks.map(k=>`<span><i class="sq" style="background:${color(k)}"></i>${esc(S.id==="cis"&&k==="FA"?"Sumar/FA":sname(k))}</span>`).join("")}<span><i class="sq sgrest-sq"></i>${esc(S.rest)}</span></div>
    <div class="sgtable">${bar(S.total, true)}${dim.rows.map(r=>bar(r,false)).join("")}</div>
    <p class="small muted">${esc(S.note)}${dim.note?" "+esc(dim.note):""} Cuantas menos entrevistas tiene un grupo, mayor es su margen de error. Pasa el ratón o toca un tramo para ver la diferencia con la media. <a href="${esc(S.page||S.url)}" target="_blank" rel="noopener">Datos originales</a>.</p>
  </section>
  <section class="stack">
    <h3>Quién va primero en cada grupo</h3>
    <div class="grid3">${leaders.map(({d,by})=>`<div class="panel stack small"><span class="eyebrow">${esc(d.label)}</span>${ks.filter(k=>by[k]).map(k=>`<p><i class="dot" style="background:${color(k)}"></i> <b>${esc(sname(k))}</b>: ${esc(by[k].join(" · "))}</p>`).join("")}</div>`).join("")}</div>
    <p class="small muted">Según ${S.id==="cis"?"el CIS":esc(S.firm)}. Con diferencias de uno o dos puntos el orden puede cambiar de una encuesta a otra.${S.id==="cis"?" El CIS sitúa al PSOE muy por encima del resto de encuestas en su estimación general, y eso se nota también aquí.":""}</p>
  </section>
  <section class="stack">
    <h3>Otros datos por grupo</h3>
    <div class="grid2">${GROUPS.extra.map(e=>`<div class="panel stack small"><span class="eyebrow">${esc(e.who)}</span>${e.vals?`<div class="bars">${Object.keys(e.vals).map(k=>`<div class="bar"><span class="nm"><i class="dot" style="background:${color(k)}"></i>${esc(sname(k))}</span><span class="tr"><i style="width:${(e.vals[k]/45*100).toFixed(1)}%;background:${color(k)}"></i></span><span class="v num">${fmt(e.vals[k])}%</span></div>`).join("")}</div>`:""}<p>${esc(e.note)}</p><p class="muted">Fuente: <a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.src)}</a></p></div>`).join("")}</div>
    <p class="small muted">La mayoría de las encuestas privadas solo publican la estimación general, sin cruces por grupos.</p>
  </section>`;
  $$("#g-src .chip", v).forEach(b => b.addEventListener("click", ()=>{ groupSrc = b.dataset.src; renderGrupos(); }));
  $$("#g-pick .chip", v).forEach(b => b.addEventListener("click", ()=>{ groupDim = b.dataset.g; renderGrupos(); }));
  tipOn(v);
}

/* ---------- Encuestas: escaños en barra y barras por encuestadora ---------- */
let seatRowsAll = false, pollParty = "PP";
function tipOn(root){
  let tip = $("#viz-tip"); if (!tip) { tip = document.createElement("div"); tip.id = "viz-tip"; tip.className = "viz-tip"; tip.hidden = true; document.body.appendChild(tip); }
  $$("[data-tip]", root).forEach(el => {
    const showT = e => { tip.innerHTML = el.dataset.tip; tip.hidden = false; const r = el.getBoundingClientRect(); const x = (e && e.clientX!=null) ? e.clientX : r.left + r.width/2; const tw = tip.offsetWidth; tip.style.left = Math.max(8, Math.min(window.innerWidth - tw - 8, x - tw/2)) + "px"; tip.style.top = (r.top + window.scrollY - tip.offsetHeight - 8) + "px"; };
    el.addEventListener("mousemove", showT); el.addEventListener("mouseenter", showT); el.addEventListener("focus", showT);
    el.addEventListener("mouseleave", ()=> tip.hidden = true); el.addEventListener("blur", ()=> tip.hidden = true);
  });
}
function seatBar(t, label){
  const ks = SEAT_ORDER.filter(k => t[k] > 0);
  return `<div class="seatbar" role="img" aria-label="${esc(label)}: ${ks.map(k=>`${sname(k)} ${t[k]}`).join(", ")}">${ks.map(k=>{ const w = t[k]/350*100; const dark = isDark(color(k)); return `<i tabindex="0" style="width:${w.toFixed(3)}%;background:${color(k)}" data-tip="<b>${esc(sname(k))}</b> ${t[k]} escaños<br><span>${esc(label)}</span>">${t[k]>=18?`<span style="color:${dark?"#fff":"#15171C"}">${t[k]}</span>`:""}</i>`; }).join("")}<span class="seatbar-maj" aria-hidden="true"></span></div>`;
}
function isDark(hex){ const h = hex.replace("#",""); const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16); return (0.299*r + 0.587*g + 0.114*b) < 150; }
function renderSeatRows(){
  const el = $("#seat-rows"); if (!el) return;
  const A = average(includeCIS), avgT = simulate(A.avg).totals;
  const polls = POLLS.slice().sort((a,b)=>b.d.localeCompare(a.d)).filter(p => seatRowsAll || p.d >= "2026-10-01");
  const row = (name, sub, t, cls) => { const right = (t.PP||0) + (t.VOX||0); return `<div class="seat-row ${cls||""}"><div class="sr-name"><b>${esc(name)}</b><span>${esc(sub)}</span></div>${seatBar(t, name+(sub?" · "+sub:""))}<div class="sr-sum" title="PP + Vox"><b class="num">${right}</b><span>PP+Vox</span></div></div>`; };
  el.innerHTML = row("Media", `${A.n} encuestas${includeCIS?" con CIS":""}`, avgT, "avg") + polls.map(p => row(p.firm, dateLabel(p.d) + (p.cis ? " · CIS" : p.out ? " · reestimación" : ""), simulate(pollTargets(p)).totals, p.cis||p.out ? "out" : "")).join("");
  tipOn(el);
}
function renderPartyBars(){
  const el = $("#party-bars"); if (!el) return;
  const k = pollParty, set = latestPerFirm(true).filter(p => p[k] != null || (k==="FA" && p.FA != null));
  const val = p => k==="FA" ? p.FA + (p.CFV||0) : p[k];
  const rows = set.map(p => ({p, v: val(p)})).filter(r => r.v != null).sort((a,b)=>b.v-a.v);
  if (!rows.length) { el.innerHTML = `<p class="muted small">Ninguna encuestadora reciente da dato de ${esc(sname(k))}.</p>`; return; }
  const A = average(false).avg[k], r23 = P[k].r23 ? P[k].r23[0] : null;
  const max = Math.max(...rows.map(r=>r.v), A||0, r23||0) * 1.12;
  const x = v => (v/max*100).toFixed(2) + "%";
  const refL = (v, cls) => `<b class="ref ${cls}" style="left:${x(v)}"></b>`;
  const lab = (v, txt, cls) => { const pos = v/max*100; return `<span class="ref-lab ${cls}" style="left:${pos.toFixed(2)}%;${pos>70?"transform:translateX(-100%)":""}">${txt}</span>`; };
  const refs = (A?refL(A,"avg"):"") + (r23?refL(r23,"r23"):"");
  el.innerHTML = `<div class="pbars" style="--pc:${color(k)}">
    <div class="pbar pb-head" aria-hidden="true"><span class="pb-name"></span><span class="pb-track">${A?lab(A,`Media ${fmt(A)}%`,"avg"):""}${refs}</span></div>
    ${rows.map(({p,v})=>`<div class="pbar${p.cis?" cis":""}"><span class="pb-name">${esc(p.firm)}<small>${dateLabel(p.d)}${p.cis?" · CIS":""}</small></span><span class="pb-track">${refs}<i tabindex="0" style="width:${x(v)}" data-tip="<b>${esc(p.firm)}</b>${p.media?" · "+esc(p.media):""}<br>${esc(sname(k))}: ${fmt(v)}%${k==="FA"&&p.CFV?` (incl. Compromís ${fmt(p.CFV)})`:""}"></i><em class="num">${fmt(v)}%</em></span></div>`).join("")}
    <div class="pbar pb-head" aria-hidden="true"><span class="pb-name"></span><span class="pb-track">${r23?lab(r23,`2023: ${fmt(r23)}%`,"r23"):""}${refs}</span></div>
  </div>
  <p class="small muted">Última encuesta de cada empresa desde el 1 de septiembre. La línea continua es la media (sin CIS) y la discontinua, el resultado de 2023${k==="FA"?"; para el Frente Amplio sumamos Compromís cuando la encuesta lo da aparte":""}.</p>`;
  tipOn(el);
}

/* ---------- ESCAÑOS / SIMULADOR ---------- */
let simT = null, simLabel = "", coalition = new Set(["PP","VOX"]), currentProv = "Madrid";
function loadPreset(key){
  if (key === "avg") { simT = Object.assign({}, average(false).avg); simLabel = "Media de encuestas (sin CIS)"; }
  else if (key === "2023") { simT = Object.assign({}, PRESET_2023); simLabel = "Votos de 2023 con el reparto de escaños de 2026"; }
  else if (key.startsWith("poll:")) { const p = POLLS[+key.slice(5)]; simT = pollTargets(p); simLabel = `${p.firm}${p.media?" / "+p.media:""} (${dateLabel(p.d)})`; }
  simT.__key = key;
}
function renderEscanos(){
  if (!simT) loadPreset("avg");
  const v = $("#v-escanos");
  const opts = [["avg","Media de encuestas (sin CIS)"],["2023","Votos de 2023 (reparto 2026)"]].concat(POLLS.map((p,i)=>["poll:"+i, `${p.firm} · ${dateLabel(p.d)}`]));
  v.innerHTML = `${subnav("escanos")}
  <div class="view-head"><span class="eyebrow">Congreso · Escaños y pactos</span><h2>Del voto al hemiciclo</h2>
  <p class="lead">Mueve los porcentajes o carga una encuesta: el reparto se recalcula provincia a provincia con la ley D'Hondt y la barrera del 3%.</p></div>
  <div class="sim">
    <div class="panel stack">
      <label for="preset" class="eyebrow">Punto de partida</label>
      <select id="preset">${opts.map(([k,l])=>`<option value="${k}" ${simT.__key===k?"selected":""}>${esc(l)}</option>`).join("")}</select>
      <div class="sliders" id="sl-main">${MAIN6.map(k=>slider(k,0,45,0.1)).join("")}</div>
      <details class="more"><summary>Partidos territoriales</summary><div class="sliders" id="sl-min" style="margin-top:8px">${MINORS.map(k=>slider(k,0,6,0.05)).join("")}</div></details>
      <div class="sum-line"><span>Otros y voto en blanco</span><span class="num" id="others"></span></div>
    </div>
    <div class="stack minw0">
      <div class="panel stack">
        <div class="row" style="justify-content:space-between"><span class="eyebrow" id="sim-label"></span></div>
        <div id="sim-hemi"></div>
        <div class="table-wrap"><table class="seat-table"><thead><tr><th>Partido</th><th>Voto</th><th>Escaños</th><th>vs. 2023</th></tr></thead><tbody id="sim-table"></tbody></table></div>
      </div>
      <div class="panel pact">
        <div class="row" style="justify-content:space-between; align-items:flex-end"><div><span class="eyebrow">Pactómetro</span><h3 style="margin-top:6px">Elige partidos y suma</h3></div><div class="pact-total num" id="pact-total"></div></div>
        <div class="row" id="pact-presets">${BLOCS.map(b=>`<button class="chip" data-b="${b.id}">${esc(b.name)}</button>`).join("")}<button class="chip" data-b="clear">Vaciar</button></div>
        <div class="party-pick" id="pact-chips"></div>
        <div class="pact-bar" id="pact-bar"></div>
        <p class="small" id="pact-msg"></p>
        <p class="small muted">Investidura: en la primera votación hacen falta 176 votos a favor; 48 horas después basta con más síes que noes, así que las abstenciones cuentan.</p>
      </div>
    </div>
  </div>
  <section class="stack">
    <h3>Provincia a provincia</h3>
    <p class="small muted">Cuadraditos = escaños de cada circunscripción en este escenario. Pulsa una para ver el reparto D'Hondt y quién se queda cerca del último escaño.</p>
    <div class="grid2" style="align-items:start"><div class="prov-list" id="prov-list"></div><div class="panel stack" id="prov-detail" style="position:sticky; top:120px"></div></div>
  </section>
  <p class="note">Cómo calculamos: partimos del resultado de 2023 en cada provincia y multiplicamos el voto de cada partido por la variación nacional que marca el escenario (Frente Amplio y Podemos heredan la distribución de Sumar; SALF, la de Vox suavizada; Adelante Andalucía se reparte solo en Andalucía). Aplicamos las alianzas registradas para el 29-N: en la C. Valenciana el voto de FA y Podemos pasa a Compromís-Front Valencià; en Canarias, a Unidad del Pueblo Canario; en Cataluña, Podemos no se presenta (apoya a ERC) y repartimos su voto a medias entre ERC y FA. Aliança Catalana no se presenta. Con los votos y las listas de 2023 el modelo reproduce exactamente los 350 escaños de entonces. No recoge cambios locales ni partidos que solo se presentan en una provincia, como Democracia21.</p>`;
  $("#preset").addEventListener("change", e => { loadPreset(e.target.value); syncSliders(); updateSim(); });
  $$(".sl input", v).forEach(inp => inp.addEventListener("input", ()=>{ simT[inp.dataset.k] = +inp.value; simT.__key = "custom"; $("#o-"+inp.dataset.k).textContent = fmt(+inp.value, inp.step==="0.05"?2:1)+"%"; simLabel = "Escenario modificado por ti"; updateSim(); }));
  $$("#pact-presets .chip").forEach(b => b.addEventListener("click", ()=>{ const id=b.dataset.b; coalition = id==="clear" ? new Set() : new Set(BLOCS.find(x=>x.id===id).ks); updatePact(); }));
  updateSim();
}
function slider(k,min,max,step){
  const val = simT[k]||0;
  return `<div class="sl" style="--pc:${color(k)}"><label for="s-${k}"><i class="dot" style="background:${color(k)}"></i>${esc(sname(k))}</label><input type="range" id="s-${k}" data-k="${k}" min="${min}" max="${max}" step="${step}" value="${val}"><output id="o-${k}" for="s-${k}">${fmt(val, step===0.05?2:1)}%</output></div>`;
}
function syncSliders(){ MAIN6.concat(MINORS).forEach(k => { const i=$("#s-"+k); if(i){ i.value = simT[k]||0; $("#o-"+k).textContent = fmt(simT[k]||0, i.step==="0.05"?2:1)+"%"; } }); }
let lastSim = null;
function updateSim(){
  const res = simulate(simT, simT.__key==="2023" ? {pacts2023:true} : {}); lastSim = res;
  const t = res.totals; const topK = Object.keys(t).reduce((a,k)=>t[k]>t[a]?k:a,"PP");
  const sumAll = MAIN6.concat(MINORS).reduce((a,k)=>a+(simT[k]||0),0);
  $("#others").textContent = fmt(Math.max(0,100-sumAll))+"%";
  $("#sim-label").textContent = simLabel;
  $("#sim-hemi").innerHTML = hemicycle(t,{center: t[topK], sub:`escaños de ${sname(topK)} · mayoría 176`}) + legend(t);
  const ref = {PP:137,PSOE:121,VOX:33,FA:31,ERC:7,JUNTS:7,BILDU:6,PNV:5,BNG:1,CC:1,UPN:1};
  $("#sim-table").innerHTML = SEAT_ORDER.slice().sort((a,b)=>(t[b]-t[a])||((simT[b]||0)-(simT[a]||0))).filter(k=>t[k]>0||(simT[k]||0)>=1)
    .map(k=>{ const d = (t[k]||0) - (ref[k]||0); return `<tr><td><i class="dot" style="background:${color(k)}"></i>${esc(P[k].name)}</td><td>${DERIVED.includes(k)&&!(simT[k]>0)?'<span class="muted" title="Hereda el voto de FA y Podemos en su comunidad">en FA+Pod.</span>':fmt(simT[k]||0)+"%"}</td><td><b>${t[k]||0}</b></td><td class="delta ${d>0?"up":d<0?"down":""}">${k==="FA"?`<span title="En 2023 Sumar incluía a Podemos y Compromís">${d>0?"+":""}${d}*</span>`:DERIVED.includes(k)?'<span class="muted">nuevo</span>':(d>0?"+":"")+d}</td></tr>`; }).join("");
  updatePact(); renderProvList();
}
function updatePact(){
  if (!lastSim) return; const t = lastSim.totals;
  $("#pact-chips").innerHTML = SEAT_ORDER.filter(k=>t[k]>0).map(k=>`<button class="chip" data-c="${k}" aria-pressed="${coalition.has(k)}"><i class="dot" style="background:${color(k)}"></i>${esc(sname(k))} <span class="num">${t[k]}</span></button>`).join("");
  $$("#pact-chips .chip").forEach(b => b.addEventListener("click", ()=>{ const k=b.dataset.c; coalition.has(k)?coalition.delete(k):coalition.add(k); updatePact(); }));
  const ks = SEAT_ORDER.filter(k=>coalition.has(k)&&t[k]>0); const s = sumOf(t, ks);
  $("#pact-total").textContent = s;
  $("#pact-bar").innerHTML = ks.map(k=>`<i style="width:${(t[k]/350*100).toFixed(2)}%;background:${color(k)}" title="${esc(sname(k))} ${t[k]}"></i>`).join("") + `<span class="maj"></span>`;
  $("#pact-msg").innerHTML = !ks.length ? "Elige al menos un partido." : s>=176 ? `<b>Mayoría absoluta</b>: ${s} escaños, ${s-176} por encima de 176.` : `<b>Sin mayoría absoluta</b>: le faltan ${176-s} escaños. El resto suma ${350-s}.`;
}
function renderProvList(){
  const res = lastSim;
  $("#prov-list").innerHTML = res.provinces.map(pr=>{ const order = SEAT_ORDER.filter(k=>pr.alloc.seats[k]); const strip = order.flatMap(k=>Array(pr.alloc.seats[k]).fill(k));
    return `<button class="prov" data-pv="${esc(pr.name)}" aria-pressed="${pr.name===currentProv}"><span class="pn"><span>${esc(pr.name)}</span><span class="muted num">${pr.seats}</span></span><span class="seatstrip">${strip.map(k=>`<i style="background:${color(k)}" title="${esc(sname(k))}"></i>`).join("")}</span></button>`; }).join("");
  $$("#prov-list .prov").forEach(b => b.addEventListener("click", ()=>{ currentProv = b.dataset.pv; $$("#prov-list .prov").forEach(c=>c.setAttribute("aria-pressed", c===b?"true":"false")); renderProvDetail(); }));
  renderProvDetail();
}
function renderProvDetail(){
  const pr = lastSim.provinces.find(p=>p.name===currentProv) || lastSim.provinces[0];
  const ln = k => (pr.labels && pr.labels[k]) || sname(k);
  const elig = pr.alloc.eligible.slice().sort((a,b)=>pr.share[b]-pr.share[a]);
  const cut = pr.alloc.last ? pr.alloc.last.q : 0;
  const cols = Math.min(pr.seats, 12);
  const nx = pr.alloc.next;
  let gap = "";
  if (nx && pr.alloc.last) { const need = pr.alloc.last.q * nx.d - pr.share[nx.party]; gap = `El siguiente escaño sería para <b>${esc(ln(nx.party))}</b>: le faltan unos <b>${fmt(Math.max(0,need),2)} puntos</b> para quitárselo a ${esc(ln(pr.alloc.last.party))}.`; }
  const below = Object.keys(pr.share).filter(k=>pr.share[k]>=1 && pr.share[k]<3).sort((a,b)=>pr.share[b]-pr.share[a]);
  $("#prov-detail").innerHTML = `
    <div class="row" style="justify-content:space-between"><h3>${esc(pr.name)}</h3><span class="muted small">${pr.seats} escaños · ${esc(pr.ccaa)}</span></div>
    <div class="table-wrap"><table class="dh"><thead><tr><th>Partido</th><th>Voto</th>${Array.from({length:cols},(_,i)=>`<th>÷${i+1}</th>`).join("")}</tr></thead>
    <tbody>${elig.map(k=>`<tr><td><i class="dot" style="background:${color(k)}"></i> ${esc(ln(k))}</td><td>${fmt(pr.share[k])}%</td>${Array.from({length:cols},(_,i)=>{ const q = pr.share[k]/(i+1); const win = i < (pr.alloc.seats[k]||0); const isNext = nx && nx.party===k && nx.d===i+1; return `<td class="${win?"win":isNext?"next":"out"}">${fmt(q,2)}</td>`; }).join("")}</tr>`).join("")}</tbody></table></div>
    <p class="small">${gap||""}</p>
    ${below.length?`<p class="small muted">Por debajo de la barrera del 3%: ${below.map(k=>`${esc(ln(k))} (${fmt(pr.share[k])}%)`).join(", ")}.</p>`:""}
    <p class="small muted">Cocientes en % de voto válido. En amarillo, los ${pr.seats} cocientes más altos, que se llevan escaño${pr.seats>12?" (se muestran los 12 primeros divisores)":""}.</p>`;
}


/* ---------- SENADO ---------- */
function senListName(l, c){
  if (l === "SDP") return c.ccaa === "Baleares" ? ({"Mallorca":"Acord de Progrés","Ibiza":"Lista progresista (Ferrer)","Formentera":"Formentera al Senat","Menorca":"PSOE–Més"}[c.name] || "PSOE y aliados") : "Senado de Progreso";
  if (l === "UPNPP") return "UPN-PP";
  if (c.ccaa === "Cataluña") { if (l==="PSOE") return "PSC"; if (l==="FA") return "Comuns (C-DEM)"; if (l==="ERC") return "ERC-EH Bildu"; }
  if (l === "BILDU") return "ERC-EH Bildu";
  if (l === "CC") return "CC-Municipalistas";
  return sname(l);
}
function renderSenado(){
  const v = $("#v-senado"); if (!v) return;
  const res = currentRes(), S = senateProjection(res);
  S.circs.forEach(c => c.r23 = SEN_2023[c.name] || null);
  const scen = lastSim && simT && simT.__key !== "avg" ? simLabel : "Media de encuestas (sin CIS)";
  const el = S.totals, des = DESIGNATED.by, r23 = Object.assign({}, SEN_2023_TOTALS); r23.PSOE = (r23.PSOE||0) + (r23.IBIZA||0); delete r23.IBIZA;
  const tot = {}; ALL_ORDER.forEach(k => { const t = (el[k]||0) + (des[k]||0); if (t) tot[k] = t; });
  const keys = ALL_ORDER.filter(k => tot[k] || r23[k]).sort((a,b)=>(tot[b]||0)-(tot[a]||0));
  const T = SENATE_FACTS.total, M = SENATE_FACTS.majority;
  const left = ["PSOE","FA","CFV","UPC","POD"].reduce((s,k)=>s+(tot[k]||0),0);
  const ppv = (tot.PP||0) + (tot.VOX||0) + (tot.UPN||0);
  const msg = (tot.PP||0) >= M ? `El PP tendría <b>mayoría absoluta</b> en solitario: ${tot.PP} de ${T}.` : ppv >= M ? `El PP no llegaría solo a ${M} (tendría ${tot.PP||0}); con Vox y UPN sumaría ${ppv}.` : `Ni el PP solo (${tot.PP||0}) ni con Vox y UPN (${ppv}) llegaría a ${M}.`;
  const barOrder = ALL_ORDER.filter(k => tot[k]);
  v.innerHTML = `${subnav("senado")}
  <div class="view-head"><span class="eyebrow">Senado</span><h2>La otra cámara</h2>
  <p class="lead">El 29-N se eligen ${SENATE_FACTS.elected} senadores; otros ${DESIGNATED.total} los designan los parlamentos autonómicos y no cambian. Con ${T} escaños, la mayoría absoluta está en ${M}. El Senado no vota la investidura, pero puede vetar o enmendar las leyes (el Congreso puede levantar el veto) y tiene que aprobar la aplicación del artículo 155.</p></div>
  <section class="grid2">
    <div class="panel stack minw0">
      <div class="row" style="justify-content:space-between"><span class="eyebrow">Proyección orientativa · ${esc(scen)}</span><button class="linkbtn" id="sen-map">Ver en el mapa</button></div>
      <div class="sen-big"><span class="n num">${tot.PP||0}</span><span>senadores del PP de ${T}</span></div>
      <div class="pact-bar sen-bar">${barOrder.map(k=>`<i style="width:${(tot[k]/T*100).toFixed(2)}%;background:${color(k)}" title="${esc(sname(k))} ${tot[k]}"></i>`).join("")}<span class="maj" style="left:${(M/T*100).toFixed(2)}%"></span></div>
      <p class="small">${msg}</p>
      <div class="table-wrap"><table class="mini sen-table"><thead><tr><th>Partido</th><th title="Electos en 2023">2023</th><th title="Electos el 29-N (proyección)">29-N</th><th title="Designados por los parlamentos autonómicos">Autonóm.</th><th>Total</th></tr></thead>
      <tbody>${keys.map(k=>`<tr><td><i class="dot" style="background:${color(k)}"></i>${esc(sname(k))}</td><td>${r23[k]||0}${k==="PSOE"?"*":""}</td><td><b>${el[k]||0}</b></td><td>${des[k]||0}</td><td><b>${tot[k]||0}</b></td></tr>`).join("")}</tbody></table></div>
      <p class="small muted">«2023» y «29-N»: senadores electos; «Autonóm.»: designados por los parlamentos autonómicos. * Incluye el senador de la coalición progresista de Ibiza-Formentera. En la columna del PSOE van también los puestos del PSOE en Senado de Progreso y en los pactos de Baleares; los segundos puestos de los socios cuentan para el Frente Amplio o, en Valencia, para Compromís. ${esc(DESIGNATED.note)}</p>
    </div>
    <div class="panel stack">
      <span class="eyebrow">Cómo se vota</span>
      <ul class="plain">
        <li>Papeleta <b>sepia</b>, con listas abiertas: marcas a personas, no a un partido.</li>
        <li>Cada provincia peninsular elige <b>4 senadores</b> y se pueden marcar hasta 3. Así, la lista más votada suele llevarse 3 y la segunda, 1.</li>
        <li>Mallorca, Gran Canaria y Tenerife eligen 3 (se marcan 2). Menorca, Ibiza, Formentera, Lanzarote, Fuerteventura, La Palma, La Gomera y El Hierro eligen 1. Ceuta y Melilla, 2 (se marca 1).</li>
        <li><b>Novedad de 2026:</b> Formentera elige su propio senador, separado de Ibiza (reforma del artículo 69 de la Constitución). Por eso son 209 electos y no 208.</li>
        <li>El PP tiene ahora mayoría absoluta: ${SENATE_FACTS.now.PP} de ${SENATE_FACTS.total23} escaños al disolverse las Cortes.</li>
      </ul>
    </div>
  </section>
  <section class="stack">
    <h3>Los pactos al Senado</h3>
    <p class="small muted">La izquierda se ha unido en el Senado mucho más que en el Congreso: el PSOE va con el Frente Amplio en casi toda España, aunque al Congreso vayan por separado.</p>
    <div class="pacts">${SEN_PACTS.map(p=>`<div class="panel stack small"><h4>${esc(p.name)}</h4><span class="muted">${esc(p.parties)}</span><span><b>Dónde:</b> ${esc(p.scope)}</span><span>${esc(p.how)}</span>${p.aim?`<span><b>Objetivo:</b> ${esc(p.aim)}</span>`:""}<a href="${esc(p.src)}" target="_blank" rel="noopener">Fuente</a></div>`).join("")}</div>
    <p class="small"><button class="linkbtn" id="sen-ally">Ver qué partidos de izquierda van juntos en cada comunidad</button></p>
  </section>
  <section class="stack">
    <details class="more"><summary>Las 60 circunscripciones, una a una</summary>
    <div class="table-wrap" style="margin-top:10px"><table class="mini"><thead><tr><th>Circunscripción</th><th>Comunidad</th><th>Escaños</th><th>Proyección</th><th>2023</th><th>Las dos primeras listas</th></tr></thead>
    <tbody>${S.circs.map(c=>`<tr><td>${esc(c.name)}${c.close?' <span class="flag tdoc" title="Menos de 2 puntos entre las dos primeras listas">reñida</span>':""}${c.local?' <span class="flag tdoc" title="Partido insular: mantenemos su resultado de 2023">insular</span>':""}</td><td style="text-align:left">${esc(c.ccaa)}</td><td>${c.seats}</td><td style="text-align:left">${seatStrip(c.alloc)}</td><td style="text-align:left">${c.r23?seatStrip(c.r23):'<span class="muted small">nueva</span>'}</td><td style="text-align:left" class="small">${c.order.slice(0,2).map(l=>`${esc(senListName(l,c))} ${fmt(c.lists[l])}%`).join(" · ")}</td></tr>`).join("")}</tbody></table></div></details>
  </section>
  <p class="note">Cómo calculamos: tomamos el voto estimado de cada provincia en el modelo del Congreso, lo agrupamos en las listas al Senado de 2026 (Senado de Progreso, ERC-EH Bildu, UPN-PP, pactos de Baleares…) y aplicamos el patrón habitual: en las circunscripciones de 4, la lista más votada gana 3 y la segunda 1 (2 y 2 si las separa menos de 1 punto). Las islas usan el voto de su provincia; en La Gomera y El Hierro mantenemos a ASG y AHI, que ganaron en 2023 y no están en las encuestas. Con los votos y las listas de 2023, el método acierta 201 de los 208 escaños. En el Senado se vota a personas, así que el resultado real puede desviarse, sobre todo en las circunscripciones reñidas.</p>`;
  $("#sen-map").addEventListener("click", ()=>{ mapMode = "senado"; show("mapa", true); });
  $("#sen-ally").addEventListener("click", ()=>{ mapMode = "alianzas"; show("mapa", true); });
}

/* ---------- MAPA ---------- */
let mapMode = "congreso", mapLevel = "prov", mapSel = "Madrid", mapColor = "win", gradParty = "lead", allySide = "izq";
const mixC = (c, t) => `color-mix(in srgb, ${c} ${Math.round(t*100)}%, var(--card))`;
const avgShare = o => { const s = {}; Object.entries(o.share).forEach(([k,v]) => s[k] = v / o.seats); return s; };
const CCAA_OF = {}; PROVINCES.forEach(p => CCAA_OF[p[0]] = p[1]);
const CCAA_LIST = Array.from(new Set(PROVINCES.map(p=>p[1]))).sort((a,b)=>a.localeCompare(b,"es"));
function currentRes(){ return lastSim || simulate(average(false).avg); }
function topKeys(seats){ const m = Math.max(0, ...Object.values(seats)); return m ? ALL_ORDER.filter(k => seats[k] === m) : []; }
const TIE_DEFS = new Map();
function tieFill(ks){ const id = "tie-" + ks.join("-"); if (!TIE_DEFS.has(id)) { const w = 3.2; TIE_DEFS.set(id, `<pattern id="${id}" patternUnits="userSpaceOnUse" width="${w*ks.length}" height="${w*ks.length}" patternTransform="rotate(45)">${ks.map((k,i)=>`<rect x="${i*w}" y="0" width="${w}" height="${w*ks.length}" fill="${color(k)}"/>`).join("")}</pattern>`); } return `url(#${id})`; }
const tieSwatch = ks => `repeating-linear-gradient(45deg, ${ks.map((k,i)=>`${color(k)} ${i*4}px ${(i+1)*4}px`).join(", ")})`;
function topKey(seats, share){ let best=null; Object.keys(seats).forEach(k=>{ if(!seats[k]) return; if(!best || seats[k]>seats[best] || (seats[k]===seats[best] && (share?share[k]||0:0)>(share?share[best]||0:0))) best=k; }); return best; }
function addTo(o, k, v){ o[k] = (o[k]||0) + v; }
function congressBy(level){
  const res = currentRes(), out = {};
  res.provinces.forEach(pr => { const key = level==="prov" ? pr.name : pr.ccaa; const o = out[key] = out[key] || {seats:0, alloc:{}, share:{}, provs:[]};
    o.seats += pr.seats; o.provs.push(pr); Object.entries(pr.alloc.seats).forEach(([k,v])=>addTo(o.alloc,k,v)); Object.entries(pr.share).forEach(([k,v])=>addTo(o.share,k,v*pr.seats)); });
  return out;
}
function senateBy(level){
  const S = senateProjection(currentRes()), out = {};
  S.circs.forEach(c => { const key = level==="prov" ? c.prov : c.ccaa; const o = out[key] = out[key] || {seats:0, alloc:{}, share:{}, circs:[]};
    c.r23 = SEN_2023[c.name] || null; c.labels = c.order.slice(0,6).map(l => `${senListName(l, c)} ${fmt(c.lists[l])}%`);
    o.seats += c.seats; o.circs.push(c); Object.entries(c.alloc).forEach(([k,v])=>addTo(o.alloc,k,v)); Object.entries(c.lists).forEach(([k,v])=>addTo(o.share, k==="SDP"?"PSOE":k==="UPNPP"?"UPN":k, v*c.seats)); });
  return out;
}
const RIGHT_TYPES = {
  sep:{label:"PP y Vox por separado", color:"#9AA3AE"},
  part:{label:"PP en coalición en parte del territorio", color:"#8DB6E6"},
  coal:{label:"PP en coalición con un partido regional", color:"#1F6FC5"}
};
const rightOf = n => RIGHT_BY_CCAA[n] || {type:"sep", congreso:[], senado:[]};
const ALLY_TYPES = {
  sep:{label:"FA y Podemos por separado", color:"#9AA3AE"},
  reg:{label:"FA con un partido regional; Podemos aparte", color:"#D9467A"},
  uni:{label:"Lista unitaria de la izquierda", color:"#E8730C"},
  erc:{label:"Podemos no se presenta y apoya a ERC", color:"#C9A227"}
};
function spainSVG(fillOf, level, sel){
  const [x,y,w,h] = MAP.vb;
  let s = `<svg class="spain" viewBox="${x} ${y} ${w} ${h}" role="group" aria-label="Mapa de España por ${level==="prov"?"provincias":"comunidades"}"><path d="${MAP.frame}" class="frame"/>`;
  if (level === "prov") {
    Object.entries(MAP.prov).forEach(([n,d]) => { if (n==="Ceuta"||n==="Melilla") return; s += `<path d="${d}" class="rg${n===sel?" sel":""}" data-k="${esc(n)}" style="fill:${fillOf(n)}" tabindex="0" role="button" aria-label="${esc(n)}"><title>${esc(n)}</title></path>`; });
  } else {
    Object.entries(MAP.ccaa).forEach(([n,d]) => { if (n==="Ceuta"||n==="Melilla") return; s += `<path d="${d}" class="rg${n===sel?" sel":""}" data-k="${esc(n)}" style="fill:${fillOf(n)}" tabindex="0" role="button" aria-label="${esc(n)}"><title>${esc(n)}</title></path>`; });
  }
  ["Ceuta","Melilla"].forEach(n => { const [cx,cy] = MAP.cent[n]; s += `<circle cx="${cx}" cy="${cy}" r="7" class="rg${n===sel?" sel":""}" data-k="${n}" style="fill:${fillOf(n)}" tabindex="0" role="button" aria-label="${n}"><title>${n}</title></circle><text x="${cx+10}" y="${cy+4}" class="maplbl">${n}</text>`; });
  return s.replace('<path d="'+MAP.frame+'" class="frame"/>', `<defs>${Array.from(TIE_DEFS.values()).join("")}</defs><path d="${MAP.frame}" class="frame"/>`) + "</svg>";
}
function seatChips(alloc){ return ALL_ORDER.slice().sort((a,b)=>(alloc[b]||0)-(alloc[a]||0)).filter(k=>alloc[k]>0).map(k=>`<span class="schip"><i class="dot" style="background:${color(k)}"></i>${esc(sname(k))} <b>${alloc[k]}</b></span>`).join(""); }
function seatStrip(alloc){ return `<span class="seatstrip big">${ALL_ORDER.filter(k=>alloc[k]).flatMap(k=>Array(alloc[k]).fill(k)).map(k=>`<i style="background:${color(k)}" title="${esc(sname(k))}"></i>`).join("")}</span>`; }
function renderMapa(){
  const v = $("#v-mapa"); if (!v) return;
  if (mapMode === "alianzas") mapLevel = "ccaa";
  const level = mapLevel;
  if (level==="ccaa" && !CCAA_LIST.includes(mapSel)) mapSel = CCAA_OF[mapSel] || "Madrid";
  if (level==="prov" && !CCAA_OF[mapSel]) mapSel = (PROVINCES.find(p=>p[1]===mapSel)||PROVINCES[41])[0];
  let data = null, fillOf, legendKs = new Set();
  const ties = new Map();
  const winFill = n => { const o = data[n]; const ks = o ? topKeys(o.alloc) : []; if (!ks.length) return "var(--soft)"; if (ks.length === 1) { legendKs.add(ks[0]); return color(ks[0]); } ties.set(ks.join("-"), ks); return tieFill(ks); };
  TIE_DEFS.clear();
  let gradInfo = null;
  if (mapMode === "congreso") { data = congressBy(level); fillOf = winFill; }
  else if (mapMode === "senado") { data = senateBy(level); fillOf = winFill; }
  else if (allySide === "dcha") { fillOf = n => RIGHT_TYPES[rightOf(n).type].color; }
  else { fillOf = n => { const a = LEFT_BY_CCAA[n]; return a ? ALLY_TYPES[a.type].color : "var(--soft)"; }; }
  if (data && mapColor === "grad") {
    const sh = {}; Object.keys(data).forEach(n => sh[n] = avgShare(data[n]));
    const avail = ALL_ORDER.filter(k => Object.values(sh).some(s => (s[k]||0) >= 0.5));
    if (gradParty !== "lead" && !avail.includes(gradParty)) gradParty = "lead";
    const val = n => { const s = sh[n]; if (!s) return null; if (gradParty === "lead") { const k = Object.keys(s).reduce((x,y)=>s[y]>(s[x]||0)?y:x, "PP"); return {k, v:s[k]}; } return {k:gradParty, v:s[gradParty]||0}; };
    const vals = Object.keys(sh).map(val).filter(Boolean).map(x=>x.v); const lo = Math.min(...vals), hi = Math.max(...vals);
    const leads = new Set();
    fillOf = n => { const x = val(n); if (!x) return "var(--soft)"; leads.add(x.k); const t = hi > lo ? (x.v - lo) / (hi - lo) : 1; return mixC(color(x.k), 0.1 + 0.9 * t); };
    gradInfo = {avail, lo, hi, leads};
  }
  const svg = spainSVG(fillOf, level, mapSel);
  const scen = lastSim && simT && simT.__key !== "avg" ? simLabel : "Media de encuestas (sin CIS)";
  const legend = mapMode==="alianzas"
    ? Object.entries(allySide==="dcha" ? RIGHT_TYPES : ALLY_TYPES).map(([k,t])=>`<span><i class="sq" style="background:${t.color}"></i>${esc(t.label)}</span>`).join("")
    : gradInfo
    ? ALL_ORDER.filter(k=>gradInfo.leads.has(k)).map(k=>`<span class="gleg"><i class="gbar" style="background:linear-gradient(to right, ${mixC(color(k),0.1)}, ${color(k)})"></i>${esc(sname(k))}</span>`).join("") + `<span class="muted">de ${fmt(gradInfo.lo)}% a ${fmt(gradInfo.hi)}%</span>`
    : ALL_ORDER.filter(k=>legendKs.has(k)).map(k=>`<span><i class="sq" style="background:${color(k)}"></i>${esc(sname(k))}</span>`).join("")
      + Array.from(ties.values()).map(ks=>`<span><i class="sq" style="background:${tieSwatch(ks)}"></i>Empate ${esc(ks.map(sname).join("–"))}</span>`).join("");
  const opts = (level==="prov" ? PROVINCES.map(p=>p[0]).sort((a,b)=>a.localeCompare(b,"es")) : CCAA_LIST);
  v.innerHTML = `${subnav("mapa")}
  <div class="view-head"><span class="eyebrow">Mapa</span><h2>España, provincia a provincia</h2>
  <p class="lead">Quién gana cada provincia o comunidad en el Congreso y en el Senado, y cómo se ha organizado la izquierda en cada territorio. Pulsa en el mapa o elige en la lista.</p></div>
  <div class="row map-ctl">
    <div class="seg" role="group" aria-label="Qué mostrar">${[["congreso","Congreso"],["senado","Senado"],["alianzas","Alianzas"]].map(([k,l])=>`<button data-mm="${k}" aria-pressed="${mapMode===k}">${l}</button>`).join("")}</div>
    ${mapMode==="alianzas"?`<div class="seg" role="group" aria-label="Bloque">${[["izq","Izquierda"],["dcha","Derecha"]].map(([k,l])=>`<button data-as="${k}" aria-pressed="${allySide===k}">${l}</button>`).join("")}</div>`:""}
    ${mapMode!=="alianzas"?`<div class="seg" role="group" aria-label="Color">${[["win","Ganador"],["grad","Gradiente"]].map(([k,l])=>`<button data-mc="${k}" aria-pressed="${mapColor===k}">${l}</button>`).join("")}</div>`:""}
    ${gradInfo?`<label class="sr-only" for="grad-sel">Partido del gradiente</label><select id="grad-sel"><option value="lead" ${gradParty==="lead"?"selected":""}>Partido más votado</option>${gradInfo.avail.map(k=>`<option value="${k}" ${gradParty===k?"selected":""}>${esc(mapMode==="senado"&&k==="PSOE"?"PSOE y aliados":sname(k))}</option>`).join("")}</select>`:""}
    ${mapMode!=="alianzas"?`<div class="seg" role="group" aria-label="Nivel">${[["prov","Provincias"],["ccaa","Comunidades"]].map(([k,l])=>`<button data-ml="${k}" aria-pressed="${mapLevel===k}">${l}</button>`).join("")}</div>`:""}
    <label class="sr-only" for="map-sel">Elegir territorio</label><select id="map-sel">${opts.map(n=>`<option ${n===mapSel?"selected":""}>${esc(n)}</option>`).join("")}</select>
  </div>
  <div class="map-grid">
    <div class="panel stack minw0">
      <div class="map-wrap">${svg}</div>
      <div class="map-legend">${legend}</div>
      <p class="small muted">${mapMode==="alianzas" ? (allySide==="dcha" ? esc(RIGHT_NOTE) : "Listas al Congreso a la izquierda del PSOE en cada comunidad, tras el cierre de coaliciones del 16 de octubre. Al Senado, el PSOE va con el Frente Amplio en casi toda España.") : gradInfo ? `Gradiente: cuanto más intenso, mayor porcentaje de voto estimado ${gradParty==="lead"?"del partido más votado en cada territorio":"de "+esc(sname(gradParty))} (${esc(scen)}).${mapMode==="senado"?" Voto por listas al Senado.":""}${level==="ccaa"?" En las comunidades, media de sus provincias ponderada por escaños.":""}` : `Color: partido con más ${mapMode==="senado"?"senadores":"escaños"} en este escenario; a rayas, si hay empate (${esc(scen)}). ${mapMode==="senado"?"En las provincias de las islas se suman las circunscripciones insulares.":"Cambia el escenario en Congreso › Escaños y pactos."}`}</p>
    </div>
    <div class="panel stack minw0" id="map-detail"></div>
  </div>
  ${mapMode==="alianzas" ? allyTable() : ""}`;
  $$("[data-mm]", v).forEach(b => b.addEventListener("click", ()=>{ mapMode = b.dataset.mm; renderMapa(); }));
  $$("[data-ml]", v).forEach(b => b.addEventListener("click", ()=>{ mapLevel = b.dataset.ml; renderMapa(); }));
  $$("[data-as]", v).forEach(b => b.addEventListener("click", ()=>{ allySide = b.dataset.as; renderMapa(); }));
  $$("[data-mc]", v).forEach(b => b.addEventListener("click", ()=>{ mapColor = b.dataset.mc; renderMapa(); }));
  const gs = $("#grad-sel"); if (gs) gs.addEventListener("change", e => { gradParty = e.target.value; renderMapa(); });
  markTab("mapa");
  $("#map-sel").addEventListener("change", e => { mapSel = e.target.value; renderMapa(); });
  $$(".spain .rg", v).forEach(el => { const go = ()=>{ mapSel = el.dataset.k; renderMapa(); }; el.addEventListener("click", go); el.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); go(); } }); });
  renderMapDetail(data);
}
function renderMapDetail(data){
  const el = $("#map-detail"), n = mapSel;
  if (mapMode === "alianzas") { el.innerHTML = allyCard(n); return; }
  const o = data[n];
  if (!o) { el.innerHTML = `<p class="muted">Sin datos.</p>`; return; }
  const camara = mapMode==="senado" ? "senadores" : "diputados";
  const tk = topKeys(o.alloc);
  let html = `<div class="row" style="justify-content:space-between"><h3>${esc(n)}</h3><span class="muted small">${o.seats} ${camara}${mapLevel==="prov"&&mapMode==="congreso"?" · "+esc(CCAA_OF[n]):""}</span></div>${seatStrip(o.alloc)}<div class="schips">${seatChips(o.alloc)}</div>${tk.length>1?`<p class="small"><i class="sq" style="background:${tieSwatch(tk)}"></i><b>Empate</b> entre ${esc(tk.map(sname).join(", ").replace(/, ([^,]*)$/," y $1"))}, con ${o.alloc[tk[0]]} cada uno.</p>`:""}`;
  if (mapColor === "grad" && mapLevel === "ccaa") { const s = avgShare(o); const top = Object.keys(s).filter(k=>s[k]>=1).sort((a,b)=>s[b]-s[a]).slice(0,7);
    html += `<p class="small">Voto estimado${mapMode==="senado"?" por listas al Senado":""}${mapLevel==="ccaa"?" (media ponderada por escaños)":""}: ${top.map(k=>`${esc(mapMode==="senado"&&k==="PSOE"?"PSOE y aliados":sname(k))} ${fmt(s[k])}%`).join(" · ")}</p>`; }
  if (mapMode === "congreso") {
    if (mapLevel === "ccaa") html += `<div class="table-wrap"><table class="mini"><thead><tr><th>Provincia</th><th>Escaños</th><th>Reparto</th></tr></thead><tbody>${o.provs.map(pr=>`<tr><td>${esc(pr.name)}</td><td>${pr.seats}</td><td style="text-align:left">${seatStrip(pr.alloc.seats)}</td></tr>`).join("")}</tbody></table></div>`;
    else { const pr = o.provs[0]; const top = Object.keys(pr.share).filter(k=>pr.share[k]>=1).sort((a,b)=>pr.share[b]-pr.share[a]).slice(0,7);
      html += `<p class="small">Voto estimado: ${top.map(k=>`${esc(sname(k))} ${fmt(pr.share[k])}%`).join(" · ")}</p><div class="row"><button class="btn ghost" id="to-dh">Ver el reparto D'Hondt</button></div>`; }
    html += `<p class="small muted">2023: ${esc(r23Text(n))}</p>`;
  } else {
    html += `<div class="table-wrap"><table class="mini"><thead><tr><th>Circunscripción</th><th>Senadores</th><th>Proyección</th><th>2023</th></tr></thead><tbody>${o.circs.map(c=>`<tr><td>${esc(c.name)}${c.close?' <span class="flag tdoc" title="Menos de 2 puntos entre las dos primeras listas">reñida</span>':""}${c.local?' <span class="flag tdoc" title="Partido insular: mantenemos su resultado de 2023">insular</span>':""}</td><td>${c.seats}</td><td style="text-align:left">${seatStrip(c.alloc)}</td><td style="text-align:left">${c.r23?seatStrip(c.r23):"—"}</td></tr>`).join("")}</tbody></table></div>`;
    if (mapLevel === "prov") html += `<p class="small">Voto estimado por listas al Senado: ${o.circs[0].labels.map(esc).join(" · ")}</p>`;
    html += `<div class="row"><button class="btn ghost" data-go="senado">Ver la sección Senado</button></div>`;
  }
  el.innerHTML = html;
  const b = $("#to-dh"); if (b) b.addEventListener("click", ()=>{ currentProv = n; renderProvList(); show("escanos", true); const t=$("#prov-detail"); if (t) try{ t.scrollIntoView({block:"start"}); }catch(e){} });
}
let R23 = null;
function r23Text(n){
  const isProv = !!CCAA_OF[n]; const ps = PROVINCES.filter(p => isProv ? p[0]===n : p[1]===n);
  if (!R23) R23 = simulate(PRESET_2023, {seatKey:3, vox2023:true, pacts2023:true});
  const t = {}; ps.forEach(p => { const r = R23.provinces.find(x=>x.name===p[0]); Object.entries(r.alloc.seats).forEach(([k,v])=>addTo(t,k,v)); });
  return SEAT_ORDER.slice().sort((a,b)=>(t[b]||0)-(t[a]||0)).filter(k=>t[k]).map(k=>`${k==="FA"?"Sumar":sname(k)} ${t[k]}`).join(", ") + " escaños";
}
function allyList(arr){ return arr.map(x=>`<li><b>${esc(x[0])}</b>${x[1]?` <span class="muted">— ${esc(x[1])}</span>`:""}</li>`).join(""); }
function allyCard(n){
  const L = LEFT_BY_CCAA[n], R = rightOf(n), O = OTHERS_BY_CCAA[n] || [];
  const side = allySide === "dcha" ? RIGHT_TYPES[R.type] : (L ? ALLY_TYPES[L.type] : null);
  const rC = R.congreso.length ? R.congreso : [["PP y Vox","por separado"]];
  const rS = R.senado.length ? R.senado : [["PP y Vox","por separado (negocian en algunas provincias)"]];
  return `<div class="row" style="justify-content:space-between"><h3>${esc(n)}</h3>${side?`<span class="small"><i class="sq" style="background:${side.color}"></i>${esc(side.label)}</span>`:""}</div>
    <div class="ally-blk${allySide==="izq"?" on":""}"><span class="eyebrow">Izquierda</span>${L?`<span class="small muted">Congreso</span><ul class="ally">${allyList(L.congreso)}</ul><span class="small muted">Senado</span><ul class="ally">${allyList(L.senado)}</ul>${L.note?`<p class="small muted">${esc(L.note)}</p>`:""}`:`<p class="small muted">Sin información publicada.</p>`}</div>
    <div class="ally-blk${allySide==="dcha"?" on":""}"><span class="eyebrow">Derecha</span><span class="small muted">Congreso</span><ul class="ally">${allyList(rC)}</ul><span class="small muted">Senado</span><ul class="ally">${allyList(rS)}</ul></div>
    ${O.length?`<div class="ally-blk"><span class="eyebrow">Otros partidos</span><ul class="ally">${allyList(O)}</ul></div>`:""}`;
}
function allyTable(){
  const cell = arr => arr.map(x=>`<div><b>${esc(x[0])}</b>${x[1]?`: ${esc(x[1])}`:""}</div>`).join("");
  return `<section class="stack"><h3>Desglose por comunidad</h3>
  <p class="small"><b>PP y Vox:</b> ${esc(RIGHT_NOTE)}</p>
  <div class="table-wrap"><table class="ally-table"><thead><tr><th>Comunidad</th><th>Izquierda al Congreso</th><th>Izquierda al Senado</th><th>Derecha y otros</th></tr></thead><tbody>${CCAA_LIST.map(c=>{ const L=LEFT_BY_CCAA[c], R=rightOf(c), O=OTHERS_BY_CCAA[c]||[];
    const rt = R.congreso.concat(R.senado.map(x=>[x[0]+" (Senado)", x[1]]));
    return `<tr><td><i class="sq" style="background:${allySide==="dcha"?RIGHT_TYPES[R.type].color:(L?ALLY_TYPES[L.type].color:"var(--soft)")}"></i><b>${esc(c)}</b></td><td>${L?cell(L.congreso):"—"}</td><td>${L?cell(L.senado):"—"}</td><td>${rt.length?cell(rt):`<div class="muted">PP y Vox, por separado</div>`}${O.length?cell(O):""}</td></tr>`; }).join("")}</tbody></table></div>
  <p class="small muted">Fuentes: coaliciones registradas ante la Junta Electoral Central y acuerdos publicados hasta el ${UPDATED}. Las listas definitivas se presentan entre el 21 y el 26 de octubre.</p></section>`;
}

/* ---------- PREGÚNTALE A CLAUDE ---------- */
let sampleFn = null, turns = [], busy = false, ctl = null;
const SUGG = [
  "¿En qué se diferencian PP y PSOE en vivienda?",
  "¿Qué mayorías salen con la media de encuestas?",
  "¿Qué es la «prioridad nacional» de Vox y quién la apoya?",
  "¿Qué pasa si nadie llega a 176 escaños?",
  "¿Cómo voto por correo y hasta cuándo?",
  "¿Por qué Podemos y el Frente Amplio van por separado?"
];
function dossier(){
  const A = average(false), sAvg = simulate(A.avg).totals;
  const L = [];
  L.push(`DATOS RECOPILADOS EL ${UPDATED.toUpperCase()}. Elecciones generales en España el domingo 29 de noviembre de 2026 (Congreso y Senado), convocadas por el Real Decreto 806/2026 tras el rechazo en el Congreso de los decretos de vivienda.`);
  L.push("\nCALENDARIO:\n" + CALENDAR.map(c=>`- ${c.d}: ${c.t}`).join("\n"));
  L.push("\nCONTEXTO:\n" + CONTEXT.map(([d,t])=>`- ${d}: ${t}`).join("\n"));
  L.push("\nREGLAS: 350 diputados en 52 circunscripciones (Madrid 38, Barcelona 32, Valencia 16; Madrid gana un escaño y Cádiz pierde uno respecto a 2023). Barrera del 3% por provincia y ley D'Hondt. Investidura (art. 99 CE): 176 votos en primera votación o mayoría simple 48 h después; si en dos meses no hay presidente, nuevas elecciones. Mesas abiertas de 9:00 a 20:00. ALIANZAS 29-N (cierre de coaliciones el 16 oct.): Frente Amplio y Podemos van por separado salvo en Canarias (Unidad del Pueblo Canario, con NC-BC, IU y Sumar); en la C. Valenciana la única lista a la izquierda del PSOE es Compromís-Front Valencià (Compromís, Podemos, EUPV y ERPV); en Cataluña Podemos no se presenta y apoya a ERC. Al Senado: «Senado de Progreso» (PSOE, IU, Sumar, Más Madrid, Compromís, CHA, Batzarre) y ERC-EH Bildu. Aliança Catalana no se presenta. Democracia21 (Miriam González, con Cs y UCIN) solo se presenta en Madrid y Barcelona. El modelo de escaños de esta web aplica esas alianzas. Voto por correo: solicitarlo en Correos (presencial con DNI o en línea con certificado digital) hasta el 19 de noviembre y depositarlo hasta el 25. SENADO: el 29-N se eligen 209 senadores (4 por provincia peninsular; Mallorca, Gran Canaria y Tenerife 3; Menorca, Ibiza, Formentera, Lanzarote, Fuerteventura, La Palma, La Gomera y El Hierro 1; Ceuta y Melilla 2). Formentera elige senador propio por primera vez (reforma del art. 69 CE, 2026). Otros 58 son designados por los parlamentos autonómicos (PP 23, PSOE 19, Vox 5, Junts 3 y 1 cada uno ERC, Bildu, PNV, BNG, CC, Compromís, Más Madrid y Geroa Bai). Total 267, mayoría absoluta 134. Al disolverse, el PP tenía 143 de 266. En 2023 se eligieron: PP 120, PSOE 72, Bildu 4, PNV 4, ERC 3, Junts 1, UPN 1, ASG 1, AHI 1 y la coalición progresista de Ibiza-Formentera 1. Voto limitado: en las de 4 escaños se marcan hasta 3, por lo que la lista más votada suele lograr 3 y la segunda 1.");
  L.push("\nPROGRAMAS Y DOCUMENTOS DE CADA PARTIDO. Ningún partido ha publicado aún su programa para el 29-N (el del PP lo redacta Alma Ezcurra; el PSOE también lo está redactando). Cada documento indica tipo, fecha y enlace: «Precampaña 2026» = propuestas anunciadas en 2025-2026; congreso/legislatura = documentos de partido; «23-J» = programa de las generales de 2023.");
  PROGRAM_PARTIES.forEach(k=>{ const p=P[k], g=PROGRAMS[k]; L.push(`\n## ${p.name} (${p.scope}) — ${p.leader} (${p.role}). 2023: ${p.r23?p.r23[0]+"% y "+p.r23[1]+" escaños":"no concurrió solo"}. ${p.note||""}\nResumen: ${g.pitch}` + g.docs.map(d=>`\n### ${d.label}: ${d.title} (${d.date}) <${d.url}>\n` + d.sections.map(s=>`- ${s.topic}: ` + s.items.join(" | ")).join("\n")).join("")); });
  L.push("\nOTROS PARTIDOS:\n" + OTHER_P.map(k=>`- ${P[k].name} (${P[k].scope}; ${P[k].leader}). ${P[k].r23?"2023: "+P[k].r23[0]+"%, "+P[k].r23[1]+" escaños. ":""}${MINOR_NOTES[k]}`).join("\n"));
  L.push("\nCOMPARADOR POR TEMAS (etiqueta = año del documento o «voto» = cómo votó):\n" + TOPICS.map(t=>`* ${t.name}: ` + MAIN6.map(k=>`${sname(k)}: ${(t.rows[k]||[]).length?t.rows[k].map(([g,x])=>`[${g}] ${x}`).join(" "):"sin propuesta localizada"}`).join(" / ")).join("\n"));
  L.push("\nENCUESTAS (fecha; PP, PSOE, Vox, Sumar/FA, Podemos, SALF; escaños publicados):\n" + POLLS.map(p=>`- ${p.firm}${p.media?" / "+p.media:""} (${p.d}${p.cis?", CIS, fuera de la media":""}${p.out?", reestimación de datos del CIS, fuera de la media":""}): ${MAIN6.map(k=>`${sname(k)} ${p[k]==null?"—":p[k]}`).join(", ")}${p.CFV?", Compromís "+p.CFV:""}${p.seats?"; escaños: "+p.seats:""}`).join("\n"));
  L.push(`\nMEDIA (última encuesta de ${A.n} empresas desde el 1 sept., sin CIS): ` + MAIN6.map(k=>`${sname(k)} ${A.avg[k].toFixed(1)}%`).join(", "));
  L.push("PROYECCIÓN DE ESCAÑOS DE ESTA WEB CON LA MEDIA (modelo: resultados 2023 por provincia + swing proporcional + D'Hondt): " + SEAT_ORDER.filter(k=>sAvg[k]).map(k=>`${sname(k)} ${sAvg[k]}`).join(", ") + `. PP+Vox = ${sAvg.PP+sAvg.VOX}.`);
  try { const SP = senateProjection(simulate(A.avg)).totals; L.push("PROYECCIÓN ORIENTATIVA DEL SENADO DE ESTA WEB (209 electos, con la media de encuestas y las listas al Senado de 2026): " + ALL_ORDER.filter(k=>SP[k]).map(k=>`${sname(k)} ${SP[k]}`).join(", ") + `. Con los designados: PP ${(SP.PP||0)+DESIGNATED.by.PP} de 267.`); } catch(e){}
  L.push("\nPACTOS AL SENADO 2026:\n" + SEN_PACTS.map(p=>`- ${p.name} (${p.parties}). Dónde: ${p.scope}. ${p.how}`).join("\n"));
  L.push("\nIZQUIERDA POR COMUNIDAD (Congreso | Senado):\n" + Object.entries(LEFT_BY_CCAA).map(([c,x])=>`- ${c}: ${x.congreso.map(y=>y[0]+(y[1]?" ("+y[1]+")":"")).join("; ")} | ${x.senado.map(y=>y[0]+(y[1]?" ("+y[1]+")":"")).join("; ")}`).join("\n"));
  if (lastSim && simT && simT.__key !== "avg") L.push(`ESCENARIO QUE EL USUARIO TIENE AHORA EN EL SIMULADOR (${simLabel}): ` + SEAT_ORDER.filter(k=>lastSim.totals[k]).map(k=>`${sname(k)} ${lastSim.totals[k]} (${(simT[k]||0).toFixed(1)}%)`).join(", "));
  return L.join("\n");
}
const RULES = () => `Eres el asistente de «Hemiciclo 29N», una web para consultar las elecciones generales españolas del 29 de noviembre de 2026.
Instrucciones:
- Responde en español, claro y al grano, sin rodeos ni vocabulario rebuscado.
- Básate sobre todo en el DOSIER de abajo. Si la respuesta no está en él, dilo y, si aportas conocimiento general, avisa de que puede estar desactualizado.
- Sé neutral: nunca recomiendes a quién votar. Trata a todos los partidos con el mismo rigor y no califiques sus propuestas como buenas o malas; si te piden valoración, expón argumentos a favor y en contra.
- Distingue lo anunciado en 2026, los documentos de partido, lo votado y el programa de 2023, y di de qué documento sale cada cosa. Si te piden el texto completo, da el enlace al documento original. No inventes cifras ni propuestas.
- Las encuestas son estimaciones con margen de error; dilo cuando hables de ellas.
- Formato: párrafos cortos; usa listas solo para comparar varios partidos. Máximo unas 250 palabras salvo que pidan más.

DOSIER:
${dossier()}`;
function md(text){
  const lines = esc(text).split(/\n/); let out = "", list = null;
  const inline = s => s.replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/`(.+?)`/g,"<code>$1</code>");
  const close = () => { if (list) { out += `</${list}>`; list = null; } };
  lines.forEach(l => {
    let m;
    if ((m = l.match(/^\s*[-*•]\s+(.*)/))) { if (list!=="ul"){ close(); out+="<ul>"; list="ul"; } out += `<li>${inline(m[1])}</li>`; }
    else if ((m = l.match(/^\s*\d+[.)]\s+(.*)/))) { if (list!=="ol"){ close(); out+="<ol>"; list="ol"; } out += `<li>${inline(m[1])}</li>`; }
    else if ((m = l.match(/^#{1,4}\s+(.*)/))) { close(); out += `<h4>${inline(m[1])}</h4>`; }
    else if (!l.trim()) { close(); }
    else { close(); out += `<p>${inline(l)}</p>`; }
  });
  close(); return out;
}
function renderPregunta(){
  const v = $("#v-pregunta");
  v.innerHTML = `
  <div class="view-head"><span class="eyebrow">Pregúntale a Claude</span><h2>Tu consulta, con los datos de esta web</h2>
  <p class="lead">Claude responde con el dosier de programas, encuestas, calendario y el escenario que tengas en el simulador. Usa tu cuenta de Claude; la primera vez te pedirá permiso.</p></div>
  <div class="panel chat">
    <div class="sugg" id="sugg">${SUGG.map(q=>`<button class="chip" data-q="${esc(q)}">${esc(q)}</button>`).join("")}</div>
    <div class="msgs" id="msgs" aria-live="polite"></div>
    <form class="composer" id="composer">
      <label for="ask" class="eyebrow" style="position:absolute; left:-9999px">Tu pregunta</label>
      <textarea id="ask" rows="2" placeholder="Pregunta sobre programas, encuestas, pactos o cómo votar"></textarea>
      <button class="btn" type="submit" id="send">Preguntar</button>
      <button class="btn ghost" type="button" id="stop" hidden>Parar</button>
    </form>
    <p class="small muted" id="chat-note">Las respuestas pueden contener errores: contrasta lo importante con las fuentes de cada partido.</p>
  </div>`;
  $$("#sugg .chip").forEach(b => b.addEventListener("click", ()=> send(b.dataset.q)));
  $("#composer").addEventListener("submit", e => { e.preventDefault(); const q = $("#ask").value.trim(); if (q) send(q); });
  $("#ask").addEventListener("keydown", e => { if (e.key==="Enter" && !e.shiftKey){ e.preventDefault(); $("#composer").requestSubmit(); } });
  $("#stop").addEventListener("click", ()=> ctl && ctl.abort());
  renderMsgs();
}
function renderMsgs(streamText){
  const box = $("#msgs"); if (!box) return;
  box.innerHTML = turns.map(t => t.role==="user" ? `<div class="msg user">${esc(t.content)}</div>` : `<div class="msg bot${t.err?" err":""}">${md(t.content)}</div>`).join("")
    + (busy ? `<div class="msg bot">${streamText ? md(streamText) : `<span class="thinking">Pensando…</span>`}</div>` : "");
  if (!turns.length && !busy) box.innerHTML = `<p class="muted small">Elige una pregunta sugerida o escribe la tuya.</p>`;
}
function askAbout(q){ show("pregunta", true); send(q); }
const ERRS = {not_granted:"No has dado permiso a esta página para usar Claude.", sampling_disabled:"Claude no está disponible para tu cuenta.", rate_limited:"Demasiadas consultas seguidas. Espera un poco y vuelve a intentarlo.", session_expired:"Tu sesión ha caducado. Vuelve a iniciar sesión en Claude.", refused:"Claude no ha respondido a esa consulta. Prueba a formularla de otra manera.", prompt_too_large:"La conversación es demasiado larga. Recarga la página para empezar de nuevo.", empty_completion:"No ha llegado respuesta. Prueba con una pregunta más concreta."};
async function send(q){
  if (busy) return;
  if (!sampleFn) { const n = $("#chat-note"); if (n) n.innerHTML = "<b>La consulta a Claude solo funciona al abrir esta página dentro de Claude.</b> El resto de la web funciona igual."; return; }
  const ta = $("#ask"); if (ta) ta.value = "";
  turns.push({role:"user", content:q}); busy = true; renderMsgs();
  $("#send").disabled = true; $("#stop").hidden = false;
  ctl = new AbortController();
  const hist = turns.slice(-10).filter(t=>!t.err).map(t=>({role:t.role, content:t.content}));
  while (hist.length && hist[0].role!=="user") hist.shift();
  try {
    const {text, truncated} = await sampleFn([{role:"user", content:RULES()}, ...hist], {signal: ctl.signal, cache:false, onText: ({text}) => renderMsgs(text)});
    turns.push({role:"assistant", content: text + (truncated ? "\n\n(Respuesta cortada por longitud.)" : "")});
  } catch(e){
    const code = e && e.code;
    if (code === "cancelled") { if (e.text) turns.push({role:"assistant", content:e.text}); }
    else { if (e && e.text) turns.push({role:"assistant", content:e.text}); turns.push({role:"assistant", content: ERRS[code] || "Se ha cortado la conexión. Vuelve a intentarlo.", err:true});
      if (code==="not_granted"||code==="sampling_disabled") { sampleFn = null; } }
  } finally {
    busy = false; ctl = null; renderMsgs();
    const s=$("#send"), st=$("#stop"); if (s) s.disabled=false; if (st) st.hidden=true;
  }
}

/* ---------- CALENDARIO ---------- */
function renderCalendario(){
  const today = new Date().toISOString().slice(0,10);
  const kinds = {hecho:"Hecho", plazo:"Plazo oficial", votante:"Para votantes", partidos:"Partidos", debate:"Debate"};
  $("#v-calendario").innerHTML = `
  <div class="view-head"><span class="eyebrow">Calendario y voto</span><h2>Fechas y cómo votar</h2><p class="lead">Plazos del Real Decreto 806/2026 y de la ley electoral.</p></div>
  <div class="grid2" style="align-items:start">
    <div class="cal">${CALENDAR.map(c=>{ const [y,m,d] = c.d.split("-").map(Number); const cls = c.d<today?"past":c.d===today?"today":""; return `<div class="cal-item ${cls}"><div class="cd num">${d}<span>${MONTHS[m-1]}</span></div><div>${esc(c.t)}<span class="kind">${kinds[c.k]}</span></div></div>`; }).join("")}</div>
    <div class="faq">
      <details open><summary>¿Quién puede votar?</summary><p>Las personas con nacionalidad española mayores de 18 años inscritas en el censo electoral. Quienes viven en el extranjero votan desde allí, por correo o en el consulado.</p></details>
      <details><summary>¿Cómo voto por correo?</summary><p>Pídelo en cualquier oficina de Correos con tu DNI o en la web de Correos con certificado digital o DNI electrónico, hasta el 19 de noviembre. Recibirás en casa las papeletas y los sobres. Entrega el voto en Correos como tarde el 25 de noviembre.</p></details>
      <details><summary>¿Qué voto el 29-N?</summary><p>Dos papeletas. Congreso (papeleta blanca): eliges una lista cerrada de un partido. Senado (papeleta sepia): marcas con una cruz hasta tres candidatos en las provincias peninsulares, que eligen 4 senadores cada una.</p></details>
      <details><summary>¿Cómo se reparten los 350 escaños?</summary><p>Cada provincia elige un número fijo de diputados según su población (Madrid 38, Barcelona 32, Soria 2; Ceuta y Melilla, 1). Solo entran en el reparto los partidos con al menos el 3% del voto válido de esa provincia, y los escaños se asignan con la ley D'Hondt: se divide el voto de cada partido entre 1, 2, 3… y se dan los escaños a los cocientes más altos. En el simulador puedes ver la tabla de cada provincia.</p></details>
      <details><summary>¿Qué pasa después del 29-N?</summary><p>Las Cortes se constituyen el 23 de diciembre. El rey propone un candidato, que necesita 176 votos en la primera votación o más síes que noes 48 horas después. Si en dos meses desde la primera votación nadie es investido, se repiten las elecciones.</p></details>
      <details><summary>¿Hasta cuándo hay encuestas?</summary><p>La ley prohíbe publicar sondeos en los cinco días previos a la votación, así que el último día es el 23 de noviembre.</p></details>
    </div>
  </div>
  <section class="stack"><h3>Fuentes</h3><div class="src">${SOURCES.map(([t,u])=>`<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>`).join("")}</div>
  <p class="small muted">Las fuentes de cada partido aparecen en su ficha. Datos recopilados el ${UPDATED}.</p></section>`;
}

/* ---------- Arranque ---------- */
function goLinks(){ document.addEventListener("click", e => { const g = e.target.closest("[data-go]"); if (g) { if (g.dataset.mapmode) mapMode = g.dataset.mapmode; show(g.dataset.go, true); } }); }
function boot(){
  renderTabs(); renderCount(); goLinks();
  renderResumen(); renderPartidos(); renderComparar(); renderEncuestas(); renderGrupos(); renderEscanos(); if (!SITE) renderPregunta(); renderCalendario();
  const h = (location.hash||"").replace("#","");
  show(h || "resumen", false);
  window.addEventListener("hashchange", ()=> show((location.hash||"").replace("#",""), false));
  if (SITE) { const s = $("#v-pregunta"); if (s) s.remove(); }
  else if (window.claude && typeof window.claude.use === "function") {
    window.claude.use("sample").then(fn => { sampleFn = fn || null; if (!fn) { const n=$("#chat-note"); if (n) n.innerHTML = "<b>La consulta a Claude solo funciona al abrir esta página dentro de Claude.</b> El resto de la web funciona igual."; } }).catch(()=>{ sampleFn = null; });
  } else { const n=$("#chat-note"); if (n) n.innerHTML = "<b>La consulta a Claude solo funciona al abrir esta página dentro de Claude.</b> El resto de la web funciona igual."; }
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
