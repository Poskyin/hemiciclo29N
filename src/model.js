/* ===== Modelo de escaños: resultados 2023 por circunscripción + swing proporcional + D'Hondt (barrera 3%) ===== */
const MODEL_PARTIES = ["PP","PSOE","VOX","FA","POD","SALF","ERC","JUNTS","BILDU","PNV","BNG","CC","UPN","AA","CFV","UPC"];

/* Alianzas registradas para el 29-N (cierre de coaliciones, 16 oct. 2026):
   - C. Valenciana: Compromís-Front Valencià (Compromís, Podemos, EUPV, ERPV). El Frente Amplio no presenta lista propia: el voto estimado de FA y Podemos allí pasa a CFV.
   - Canarias: Unidad del Pueblo Canario (NC-BC, Podemos, IU, Sumar): el voto estimado de FA y Podemos allí pasa a UPC.
   - Cataluña: Podemos no se presenta y apoya a ERC. Su base allí (la de Sumar 2023) es sobre todo de los Comuns, así que repartimos su voto estimado a medias entre ERC y FA.
   Aliança Catalana no se presenta. */
const CFV_PROV = ["Alicante","Castellón","Valencia"];
const UPC_PROV = ["Las Palmas","S. C. de Tenerife"];
/* Si una encuesta da Compromís aparte (targets.CFV > 0), se reparte solo en la C. Valenciana con la geografía de Sumar 2023
   y el FA se reparte en el resto de España. SUMAR_CV_NAT: aportación aproximada de la C. Valenciana al 12,33% de Sumar en 2023. */
const SUMAR_CV_NAT = 1.7;

/* Resultado nacional 2023 (% voto válido). FA y POD comparten la base de Sumar 2023 (12,33). */
const NAT2023 = {PP:33.06, PSOE:31.68, VOX:12.38, SUMAR:12.33, ERC:1.89, JUNTS:1.60, BILDU:1.36, PNV:1.12, BNG:0.62, CC:0.47, UPN:0.21};
const OTHERS2023_NAT = 100 - Object.values(NAT2023).reduce((a,b)=>a+b,0); // ≈3,28 (incluye voto en blanco)

/* [nombre, CCAA, escaños 2026 (RD 806/2026), escaños 2023, PP, PSOE, Vox, Sumar, {otros con base 2023}] */
const PROVINCES = [
 ["A Coruña","Galicia",8,8,43.1,28.2,5.1,12.2,{BNG:10.0}],
 ["Álava","País Vasco",4,4,17.9,27.7,3.9,12.7,{BILDU:19.5,PNV:16.6}],
 ["Albacete","Castilla-La Mancha",4,4,39.9,34.5,16.6,7.2,{}],
 ["Alicante","C. Valenciana",12,12,36.7,32.0,16.3,12.9,{}],
 ["Almería","Andalucía",6,6,41.0,29.0,21.4,6.6,{}],
 ["Asturias","Asturias",7,7,35.6,34.3,12.5,14.8,{}],
 ["Ávila","Castilla y León",3,3,43.3,27.4,15.4,5.1,{}],
 ["Badajoz","Extremadura",5,5,37.8,39.2,13.7,6.8,{}],
 ["Baleares","Baleares",8,8,35.6,30.2,15.2,16.6,{}],
 ["Barcelona","Cataluña",32,32,13.8,35.7,7.6,15.2,{ERC:12.3,JUNTS:9.7}],
 ["Bizkaia","País Vasco",8,8,11.5,25.8,2.6,10.9,{BILDU:20.7,PNV:27.0}],
 ["Burgos","Castilla y León",4,4,40.6,34.4,12.8,8.6,{}],
 ["Cáceres","Extremadura",4,4,38.1,38.9,13.6,6.9,{}],
 ["Cádiz","Andalucía",8,9,34.8,33.2,15.2,12.9,{}],
 ["Cantabria","Cantabria",5,5,42.1,33.3,14.1,8.5,{}],
 ["Castellón","C. Valenciana",5,5,35.2,32.6,15.9,14.3,{}],
 ["Ceuta","Ceuta",1,1,38.8,34.0,23.3,2.5,{}],
 ["Ciudad Real","Castilla-La Mancha",5,5,40.5,35.4,16.3,6.2,{}],
 ["Córdoba","Andalucía",6,6,37.9,32.1,13.9,13.7,{}],
 ["Cuenca","Castilla-La Mancha",3,3,39.8,37.4,15.6,5.6,{}],
 ["Gipuzkoa","País Vasco",6,6,8.7,23.3,2.1,10.6,{BILDU:31.2,PNV:22.6}],
 ["Girona","Cataluña",6,6,9.7,28.9,7.0,10.9,{ERC:14.7,JUNTS:19.6}],
 ["Granada","Andalucía",7,7,37.0,33.0,16.1,11.6,{}],
 ["Guadalajara","Castilla-La Mancha",3,3,36.3,33.0,19.3,9.2,{}],
 ["Huelva","Andalucía",5,5,36.4,36.0,14.6,10.4,{}],
 ["Huesca","Aragón",3,3,38.2,33.6,12.6,11.5,{}],
 ["Jaén","Andalucía",5,5,37.3,36.3,14.8,8.0,{}],
 ["La Rioja","La Rioja",4,4,45.6,35.7,9.8,6.6,{}],
 ["Las Palmas","Canarias",8,8,25.9,33.2,14.6,10.3,{CC:6.3}],
 ["León","Castilla y León",4,4,36.9,33.6,12.9,6.7,{}],
 ["Lleida","Cataluña",4,4,12.8,29.5,6.8,7.9,{ERC:18.6,JUNTS:18.0}],
 ["Lugo","Galicia",4,4,50.2,30.3,4.4,5.2,{BNG:8.7}],
 ["Madrid","Madrid",38,37,40.5,27.8,14.0,15.5,{}],
 ["Málaga","Andalucía",11,11,38.3,30.3,16.5,12.3,{}],
 ["Melilla","Melilla",1,1,49.2,25.4,15.9,3.0,{}],
 ["Murcia","Murcia",10,10,41.2,25.3,21.8,9.6,{}],
 ["Navarra","Navarra",5,5,16.7,27.4,5.7,12.8,{BILDU:17.2,UPN:15.3}],
 ["Ourense","Galicia",4,4,50.0,30.1,4.9,5.5,{BNG:8.2}],
 ["Palencia","Castilla y León",3,3,42.0,34.7,12.9,6.1,{}],
 ["Pontevedra","Galicia",7,7,39.6,31.4,4.7,13.2,{BNG:9.4}],
 ["Salamanca","Castilla y León",4,4,47.0,30.4,14.7,5.5,{}],
 ["S. C. de Tenerife","Canarias",7,7,35.4,33.5,0,10.8,{CC:16.7}],
 ["Segovia","Castilla y León",3,3,45.0,30.6,14.1,8.1,{}],
 ["Sevilla","Andalucía",12,12,33.4,36.6,13.3,14.0,{}],
 ["Soria","Castilla y León",2,2,37.2,29.5,9.8,3.4,{}],
 ["Tarragona","Cataluña",6,6,13.9,32.9,10.3,11.3,{ERC:15.1,JUNTS:11.1}],
 ["Teruel","Aragón",3,3,35.0,29.3,13.1,5.4,{}],
 ["Toledo","Castilla-La Mancha",6,6,37.8,32.6,19.6,8.2,{}],
 ["Valencia","C. Valenciana",16,16,33.6,32.1,15.2,16.9,{}],
 ["Valladolid","Castilla y León",5,5,40.8,32.8,15.2,8.9,{}],
 ["Zamora","Castilla y León",3,3,44.8,32.5,13.2,5.6,{}],
 ["Zaragoza","Aragón",7,7,36.0,30.8,15.3,13.5,{}]
];
/* Vox no se presentó en S. C. de Tenerife en 2023: se usa como base su 9,8% en el Senado de esa provincia. */
const VOX_SCT_BASE = 9.8;

/* Geografía de partidos sin base en 2023 (índices relativos, media ≈ 1 en su ámbito) */
const AA_IDX = {"Cádiz":1.5,"Sevilla":1.25,"Málaga":0.95,"Granada":0.85,"Córdoba":0.9,"Huelva":0.85,"Jaén":0.7,"Almería":0.55}; // Adelante Andalucía
const AND_SHARE = 0.1775;   // peso de Andalucía en el voto válido nacional (2023)

function baseShares(p, opts){
  const [name,, , , pp, psoe, vox, sumar, extra] = p;
  const voxB = (name==="S. C. de Tenerife" && !(opts&&opts.vox2023)) ? VOX_SCT_BASE : vox;
  return {pp, psoe, vox: voxB, sumar, extra};
}

/* targets: {PP:%, PSOE:%, VOX:%, FA:%, POD:%, SALF:%, ERC:%, ...} (% nacional de voto válido)
   opts.seatKey: 2 = escaños 2026 (por defecto), 3 = escaños 2023; opts.vox2023: usa Vox 0 en SCT (para validar); opts.pacts2023: sin las alianzas de 2026 */
function simulate(targets, opts){
  opts = opts || {};
  const seatIdx = opts.seatKey || 2;
  const T = {}; MODEL_PARTIES.forEach(k => T[k] = Math.max(0, +targets[k] || 0));
  const sumT = MODEL_PARTIES.reduce((a,k)=>a+T[k],0);
  const othersNat = Math.max(0.5, 100 - sumT);
  const totals = {}; MODEL_PARTIES.forEach(k=>totals[k]=0);
  const provinces = PROVINCES.map(p => {
    const name = p[0], seats = p[seatIdx];
    const b = baseShares(p, opts);
    const raw = {};
    raw.PP = b.pp * T.PP / NAT2023.PP;
    raw.PSOE = b.psoe * T.PSOE / NAT2023.PSOE;
    raw.VOX = b.vox * T.VOX / NAT2023.VOX;
    const cfvOwn = T.CFV > 0 && !opts.pacts2023;
    raw.FA = b.sumar * T.FA / (cfvOwn ? NAT2023.SUMAR - SUMAR_CV_NAT : NAT2023.SUMAR);
    raw.POD = b.sumar * T.POD / NAT2023.SUMAR;
    raw.SALF = T.SALF * (0.5 + 0.5 * (b.vox / NAT2023.VOX));
    ["ERC","JUNTS","BILDU","PNV","BNG","CC","UPN"].forEach(k => { raw[k] = (b.extra[k]||0) * T[k] / NAT2023[k]; });
    raw.AA = AA_IDX[name] ? T.AA / AND_SHARE * AA_IDX[name] : 0;
    raw.CFV = 0; raw.UPC = 0;
    const pieces = {FA: raw.FA, POD: raw.POD}; // antes de fusionar, para el Senado
    if (!opts.pacts2023) {
      if (CFV_PROV.includes(name)) { raw.CFV = (cfvOwn ? b.sumar * T.CFV / SUMAR_CV_NAT : raw.FA) + raw.POD; raw.FA = 0; raw.POD = 0; }
      else if (UPC_PROV.includes(name)) { raw.UPC = raw.FA + raw.POD; raw.FA = 0; raw.POD = 0; }
      else if (p[1] === "Cataluña") { raw.ERC += raw.POD/2; raw.FA += raw.POD/2; raw.POD = 0; }
    }
    const listed2023 = b.pp + b.psoe + (opts.vox2023 ? p[6] : b.vox) + b.sumar + Object.values(b.extra).reduce((a,v)=>a+v,0);
    const others2023 = Math.max(0.5, 100 - listed2023);
    const othersI = Math.min(40, others2023 * othersNat / OTHERS2023_NAT);
    const sumRaw = MODEL_PARTIES.reduce((a,k)=>a+raw[k],0);
    const scale = sumRaw > 0 ? (100 - othersI) / sumRaw : 0;
    const share = {}; MODEL_PARTIES.forEach(k => share[k] = raw[k]*scale);
    const parts = {FA: pieces.FA*scale, POD: pieces.POD*scale};
    let labels = null, upnpp = null;
    if (name === "Navarra" && !opts.pacts2023) { upnpp = {PP: share.PP, UPN: share.UPN}; share.UPN += share.PP; share.PP = 0; labels = {UPN:"UPN-PP"}; }
    const alloc = dhondt(share, seats, 3);
    if (upnpp && alloc.seats.UPN) { /* orden de la lista: UPN, PP, PP, UPN, PP */ const ord = ["UPN","PP","PP","UPN","PP"]; const n = alloc.seats.UPN; alloc.seats.UPN = 0; for (let i=0;i<n;i++){ const k = ord[i]||"PP"; alloc.seats[k] = (alloc.seats[k]||0) + 1; } if (!alloc.seats.UPN) delete alloc.seats.UPN; }
    MODEL_PARTIES.forEach(k => totals[k] += alloc.seats[k]||0);
    return {name, ccaa:p[1], seats, share, alloc, others: othersI, parts, labels, upnpp};
  });
  return {totals, provinces};
}

/* ===== Senado: 209 senadores electos en 60 circunscripciones (Formentera elige uno propio desde 2026) =====
   Proyección orientativa: el voto de cada provincia (modelo del Congreso) se agrupa en las listas al Senado de 2026
   y se aplica el patrón habitual del voto limitado: en las de 4 escaños, la lista más votada gana 3 y la segunda 1
   (2 y 2 si las separa menos de 1 punto); en las de 3, 2 y 1; en las de 2, 2 y 0 si la ventaja supera 3 puntos (si no, 1 y 1). */
const SEN_ISLANDS = {
  "Baleares": [["Mallorca",3],["Menorca",1],["Ibiza",1],["Formentera",1]],
  "Las Palmas": [["Gran Canaria",3],["Lanzarote",1],["Fuerteventura",1]],
  "S. C. de Tenerife": [["Tenerife",3],["La Palma",1],["La Gomera",1],["El Hierro",1]]
};
const SEN_CIRCS = []; // [circunscripción, provincia, ccaa, escaños]
PROVINCES.forEach(p => {
  if (SEN_ISLANDS[p[0]]) SEN_ISLANDS[p[0]].forEach(([n,s]) => SEN_CIRCS.push([n, p[0], p[1], s]));
  else SEN_CIRCS.push([p[0], p[0], p[1], (p[0]==="Ceuta"||p[0]==="Melilla") ? 2 : 4]);
});
const SEN_LOCAL = {"La Gomera":"ASG", "El Hierro":"AHI"}; // partidos insulares que no recoge el modelo: se mantiene su resultado de 2023
const SDP_PSOE3 = ["Álava","Sevilla"];                   // el PSOE pone los 3 candidatos de Senado de Progreso
function senateLists(pr, circ, y2023){
  const s = pr.share, c = pr.ccaa, L = {}, add = (k,v) => { if (v > 0.05) L[k] = (L[k]||0) + v; };
  ["PP","VOX","SALF","AA","JUNTS","PNV","BNG"].forEach(k => add(k, s[k]||0));
  if (y2023) { add("PSOE", s.PSOE); add("FA", s.FA); ["ERC","BILDU","UPN","CC"].forEach(k=>add(k, s[k]||0)); if (circ==="Ibiza") { L.SDP = (L.PSOE||0) + (L.FA||0); delete L.PSOE; delete L.FA; } return L; }
  if (c === "Cataluña") { add("PSOE", s.PSOE); add("FA", s.FA); add("ERC", s.ERC); }
  else if (c === "Canarias") { add("PSOE", s.PSOE); add("UPC", s.UPC); if (circ !== "El Hierro") add("CC", s.CC); }
  else if (c === "Baleares") { add("SDP", s.PSOE + s.FA + (circ==="Ibiza" ? s.POD : 0)); if (circ !== "Ibiza") add("POD", s.POD); }
  else {
    const val = CFV_PROV.includes(pr.name);
    add("SDP", s.PSOE + (val ? pr.parts.FA : s.FA));
    add("POD", val ? pr.parts.POD : s.POD);
    add("BILDU", s.BILDU);
    if (pr.name === "Navarra") { L.UPNPP = pr.upnpp ? pr.upnpp.PP + pr.upnpp.UPN : (L.PP||0) + (s.UPN||0); delete L.PP; }
  }
  return L;
}
/* Reparto de los escaños de una lista entre partidos (orden de candidatos publicado) */
function senateSeatsOf(list, n, circ, prov, ccaa){
  const o = {};
  if (list === "SDP") {
    if (ccaa === "Baleares" || n < 2 || SDP_PSOE3.includes(circ)) o.PSOE = n;
    else { o.PSOE = n - 1; o[CFV_PROV.includes(prov) ? "CFV" : "FA"] = 1; }
  } else if (list === "UPNPP") { if (n >= 2) { o.UPN = n - 1; o.PP = 1; } else o.UPN = n; }
  else o[list] = n;
  return o;
}
function senateProjection(res, opts){
  opts = opts || {};
  const y2023 = !!opts.y2023;
  const circs = y2023 ? SEN_CIRCS.filter(c=>c[0]!=="Formentera").map(c => c[0]==="Ibiza" ? ["Ibiza","Baleares","Baleares",1] : c) : SEN_CIRCS;
  const totals = {}, out = [];
  circs.forEach(([name, prov, ccaa, seats]) => {
    const pr = res.provinces.find(p => p.name === prov);
    const lists = senateLists(pr, name, y2023);
    const ord = Object.keys(lists).sort((a,b) => lists[b] - lists[a]);
    const [a, b] = ord, gap = lists[a] - (lists[b]||0);
    const win = {};
    if (seats === 4) { if (gap < 1) { win[a] = 2; win[b] = 2; } else { win[a] = 3; win[b] = 1; } }
    else if (seats === 3) { win[a] = 2; win[b] = 1; }
    else if (seats === 2) { if (gap > 3) win[a] = 2; else { win[a] = 1; win[b] = 1; } }
    else win[a] = 1;
    let alloc = {}, local = false;
    if (SEN_LOCAL[name]) { alloc = {[SEN_LOCAL[name]]: 1}; local = true; }
    else Object.entries(win).forEach(([l,n]) => Object.entries(senateSeatsOf(l, n, name, prov, ccaa)).forEach(([k,v]) => alloc[k] = (alloc[k]||0) + v));
    Object.entries(alloc).forEach(([k,v]) => totals[k] = (totals[k]||0) + v);
    out.push({name, prov, ccaa, seats, lists, order: ord, alloc, local, close: seats > 1 && gap < 2 && !local});
  });
  return {totals, circs: out};
}

/* D'Hondt con barrera (% del voto válido de la circunscripción) */
function dhondt(share, seats, barrier){
  const eligible = Object.keys(share).filter(k => share[k] >= barrier);
  const quotients = [];
  eligible.forEach(k => { for (let d=1; d<=seats; d++) quotients.push({party:k, d, q: share[k]/d}); });
  quotients.sort((a,b)=> b.q - a.q);
  const won = quotients.slice(0, seats);
  const res = {}; won.forEach(x => res[x.party] = (res[x.party]||0)+1);
  const last = won[won.length-1] || null;
  const next = quotients[seats] || null;
  return {seats:res, eligible, last, next, quotients: quotients.slice(0, seats + 4)};
}

if (typeof module !== "undefined") module.exports = {simulate, dhondt, senateProjection, PROVINCES, MODEL_PARTIES, NAT2023, SEN_CIRCS};
