/* ===== Datos de la plataforma (actualizados el 18 de octubre de 2026) ===== */
const UPDATED = "18 de octubre de 2026";
const ELECTION_DATE = "2026-11-29T09:00:00+01:00";

/* Orden de izquierda a derecha para el hemiciclo */
const SEAT_ORDER = ["POD","AA","UPC","CFV","FA","BILDU","BNG","ERC","PSOE","PNV","CC","JUNTS","UPN","PP","SALF","VOX"];

const PARTIES = {
  PP:   {name:"Partido Popular", short:"PP", color:"#1F6FC5", leader:"Alberto Núñez Feijóo", role:"Candidato a la Presidencia (lema: «Por fin»)", r23:[33.06,137], scope:"Toda España"},
  PSOE: {name:"PSOE", short:"PSOE", color:"#E0251B", leader:"Pedro Sánchez", role:"Candidato (proclamado el 17 oct.) y presidente del Gobierno", r23:[31.68,121], scope:"Toda España"},
  VOX:  {name:"Vox", short:"Vox", color:"#5BB12F", leader:"Santiago Abascal", role:"Candidato a la Presidencia", r23:[12.38,33], scope:"Toda España"},
  FA:   {name:"Frente Amplio (Sumar)", short:"Sumar/FA", color:"#E0306E", leader:"Ada Colau", role:"Candidata a la Presidencia y cabeza de lista por Barcelona", r23:[12.33,31], scope:"Toda España salvo C. Valenciana", note:"Coalición de IU, Movimiento Sumar, Comuns, Más Madrid, CHA y otros. No se presenta en la C. Valenciana (allí va Compromís-Front Valencià) y en Canarias va dentro de Unidad del Pueblo Canario. El resultado de 2023 es el de Sumar, que entonces incluía a Podemos y Compromís."},
  POD:  {name:"Podemos", short:"Podemos", color:"#6E3A8E", leader:"Irene Montero", role:"Candidata y cabeza de lista por Madrid (primarias, 90%)", r23:null, scope:"Toda España salvo Cataluña", note:"En 2023 concurrió dentro de Sumar. No se presenta en Cataluña (apoya a ERC); en la C. Valenciana va en Compromís-Front Valencià y en Canarias en Unidad del Pueblo Canario."},
  SALF: {name:"Se Acabó La Fiesta", short:"SALF", color:"#8A6A4B", leader:"Alvise Pérez", role:"Fundador y cabeza de lista por Madrid", r23:null, scope:"Toda España", note:"No se presentó en 2023. Europeas 2024: 4,6% y 3 escaños."},
  ERC:  {name:"Esquerra Republicana", short:"ERC", color:"#F2A900", leader:"Gabriel Rufián", role:"Cabeza de lista; Podemos apoya sus listas en Cataluña", r23:[1.89,7], scope:"Cataluña"},
  JUNTS:{name:"Junts per Catalunya", short:"Junts", color:"#1FB5A6", leader:"Míriam Nogueras", role:"Cabeza de lista por Barcelona", r23:[1.60,7], scope:"Cataluña"},
  BILDU:{name:"EH Bildu", short:"Bildu", color:"#9DB82A", leader:"Por anunciar", role:"Mertxe Aizpurua no repite como candidata", r23:[1.36,6], scope:"País Vasco y Navarra"},
  PNV:  {name:"PNV", short:"PNV", color:"#2F7A43", leader:"Maribel Vaquero", role:"Portavoz en el Congreso", r23:[1.12,5], scope:"País Vasco"},
  BNG:  {name:"BNG", short:"BNG", color:"#6FB3E0", leader:"Néstor Rego", role:"Diputado y cabeza de lista en 2023", r23:[0.62,1], scope:"Galicia"},
  CC:   {name:"Coalición Canaria", short:"CC", color:"#E8C100", leader:"Cristina Valido", role:"Diputada y cabeza de lista en 2023", r23:[0.47,1], scope:"Canarias", note:"Se presenta como Coalición Canarias-Municipalistas Primero."},
  UPN:  {name:"UPN", short:"UPN", color:"#4F6FD8", leader:"Alberto Catalán", role:"Diputado en 2023", r23:[0.21,1], scope:"Navarra"},
  AA:   {name:"Adelante Andalucía", short:"AA", color:"#3BA67A", leader:"José Ignacio García", role:"Portavoz; lista propia en las 8 provincias andaluzas", r23:null, scope:"Andalucía"},
  CFV:  {name:"Compromís-Front Valencià", short:"Compromís", color:"#E8730C", leader:"Àgueda Micó", role:"Cabeza de lista por Valencia", r23:null, scope:"C. Valenciana", note:"Coalición de Compromís, Podemos, EUPV (IU) y ERPV. En 2023 Compromís fue dentro de Sumar."},
  UPC:  {name:"Unidad del Pueblo Canario", short:"UPC", color:"#0E7FA6", leader:"Por anunciar", role:"Coalición de NC-Bloque Canarista, Podemos, IU y Sumar", r23:null, scope:"Canarias"},
  D21:  {name:"Democracia21", short:"D21", color:"#6B5CA5", leader:"Miriam González", role:"Candidata; solo Madrid y Barcelona", r23:null, scope:"Madrid y Barcelona"},
  ASG:  {name:"Agrupación Socialista Gomera", short:"ASG", color:"#5E4FA2", leader:"Yaiza Castilla", role:"Candidata al Senado por La Gomera", r23:null, scope:"La Gomera"},
  AHI:  {name:"Agrupación Herreña Independiente", short:"AHI", color:"#4C9F38", leader:"Javier Armas", role:"Senador y candidato por El Hierro", r23:null, scope:"El Hierro"},
  GBAI: {name:"Geroa Bai", short:"Geroa Bai", color:"#B5476B", leader:"Uxue Barkos", role:"Senadora autonómica", r23:null, scope:"Navarra"},
  AC:   {name:"Aliança Catalana", short:"AC", color:"#2B4466", leader:"Sílvia Orriols", role:"Líder; no se presenta al 29-N", r23:null, scope:"Cataluña"}
};
const MAIN6 = ["PP","PSOE","VOX","FA","POD","SALF"];
const MINORS = ["ERC","JUNTS","BILDU","PNV","BNG","CC","UPN","AA"];
const DERIVED = ["CFV","UPC"]; // sin control propio: heredan el voto estimado de FA y Podemos en su comunidad
const OTHER_P = ["AA","D21","AC"];
const ALL_ORDER = ["POD","AA","UPC","CFV","FA","BILDU","BNG","ERC","PSOE","ASG","AHI","PNV","GBAI","CC","JUNTS","UPN","PP","SALF","VOX"];

/* ---------- Programas y documentos programáticos ----------
   Cada partido tiene varios documentos (docs). kind: "2026" precampaña (2025-2026), "doc" documento de partido reciente, "2023" programa electoral 23-J, "otro" otros documentos.
   Ningún partido había publicado su programa para el 29-N a 9 de octubre de 2026. */
const PROGRAMS = {
  PP: {
    pitch:"Vivienda con rebajas fiscales para jóvenes, ley antiokupación, inmigración por puntos, bajada de impuestos y regeneración institucional. Su programa para el 29-N lo redacta Alma Ezcurra y aún no se ha publicado.",
    docs:[
      {kind:"2026", label:"Últimos anuncios", isNew:true, title:"Anuncios de precampaña", date:"7–18 oct. 2026", url:"https://www.elprogreso.es/articulo/espana/directo-carrera-29-n/202610171251242006667.html", more:[["Propuestas económicas de PP y Vox (Moncloa.com, 16 oct.)","https://www.moncloa.com/2026/10/16/propuestas-economicas-vox-pp-29n-3449552/"],["Ezcurra y Muñoz (elDiario.es, 7 oct.)","https://www.eldiario.es/politica/ultima-hora-actualidad-politica-directo_6_13567873_1125658.html"],["Listas del PP (EFE/Infobae, 14 oct.)","https://www.infobae.com/espana/agencias/2026/10/14/el-pp-apuesta-por-la-discrecion-y-apurara-hasta-el-final-para-comunicar-sus-listas-del-29n/"]], sections:[
        {topic:"Vivienda y seguridad", items:["Ley antiokupación para echar a los okupas en 48 horas, que redactará Xavier García Albiol, cabeza de lista por Barcelona (17–18 oct.).","«Tolerancia cero» con la delincuencia y la reincidencia."]},
        {topic:"Trabajo", items:["Ampliar el límite de horas extraordinarias.","Que las mutuas puedan dar altas médicas."]},
        {topic:"Campaña", items:["Alma Ezcurra redacta el programa; Ester Muñoz es la portavoz de campaña y Miguel Tellado la dirige.","Lema «Por fin». Feijóo promete un «cambio sereno, pero contundente» y dejar el Estado de bienestar «más fuerte».","El PP apurará hasta el 26 de octubre para anunciar sus listas."]}
      ]},
      {kind:"2026", label:"Precampaña 2026", title:"Propuestas anunciadas en 2025 y 2026", date:"oct. 2025 – sep. 2026", url:"https://www.idealista.com/news/inmobiliario/vivienda/2026/09/28/916106-el-pp-propone-acabar-con-las-zonas-tensionadas-y-avales-de-hasta-el-100-para-la", sections:[
        {topic:"Vivienda", items:[
          "Crear las condiciones para construir 1 millón de viviendas en 4 años y liberalizar suelo en el primer Consejo de Ministros.",
          "Rebaja de hasta el 60% en los impuestos de compra para jóvenes: IVA e ITP del 10% al 4%, IRPF bonificado los primeros 4 años de trabajo y donaciones de padres a hijos para vivienda sin tributar (ahorro estimado por el PP: 21.000–26.000 €).",
          "Avales públicos del 95% o 100% para que los jóvenes paguen la entrada.",
          "Derogar la Ley de Vivienda de 2023 y eliminar las zonas tensionadas; ley antiokupación con desalojo en 24–48 h.",
          "Silencio administrativo positivo para licencias y vincular la financiación autonómica a las viviendas que construya cada comunidad."]},
        {topic:"Inmigración", items:[
          "Plan Nacional de Inmigración (oct. 2025): una autoridad estatal única para la política migratoria.",
          "Visado por puntos (formación, idioma, integración; la hispanidad suma) y visado temporal ligado al contrato de trabajo.",
          "Cuotas anuales para países que cooperen en repatriaciones; fin de las regularizaciones generalizadas y un régimen transitorio por puntos para quienes ya están en España.",
          "Pérdida de la residencia por delitos graves, ayudas ligadas a la búsqueda activa de empleo, nacionalidad más exigente y pruebas de edad de menores en 72 h."]},
        {topic:"Economía", items:[
          "Movilizar hasta 300.000 millones de euros en infraestructuras (julio de 2026).",
          "Decálogo económico de septiembre de 2026 centrado en vivienda, rebajas fiscales y menos trámites."]}
      ]},
      {kind:"doc", label:"Congreso del PP 2025", title:"XXI Congreso Nacional: compromisos de Feijóo en la clausura", date:"6 jul. 2025", url:"https://s1.elespanol.com/2025/07/06/actualidad/250706_Discurso_Feijoo_clausura_XXI_Congreso_Nacional_PP.pdf", sections:[
        {topic:"Instituciones", items:[
          "Plan de Regeneración Democrática con contrapesos al poder.",
          "Elegir a los responsables de organismos del Estado por mérito, sin cargos políticos en los cinco años anteriores.",
          "Reformar las leyes del CGPJ, del Tribunal Constitucional y de la Fiscalía General.",
          "Auditar el gasto del Gobierno y publicar los resultados.",
          "Presentar Presupuestos cada año y convocar elecciones si no se aprueban."]},
        {topic:"Impuestos y empleo", items:[
          "Revisar las 97 subidas de impuestos de los últimos años y bajarlos.",
          "Menos burocracia para autónomos y pequeño comercio.",
          "Subir el salario mínimo con acuerdo de sindicatos y empresas, y elevar el salario medio.",
          "Que el subsidio no compita con el empleo."]},
        {topic:"Servicios públicos", items:[
          "Plan de vivienda en el primer Consejo de Ministros.",
          "Afrontar la falta de médicos y cumplir y financiar la ley ELA.",
          "Plan Nacional del Agua.",
          "Garantizar la actualización de las pensiones y su viabilidad."]},
        {topic:"Educación y lengua", items:[
          "Ley de lenguas que garantice la enseñanza en español en toda España, respetando las cooficiales.",
          "Una educación que exija esfuerzo, sin aprobados generales."]},
        {topic:"Inmigración y seguridad", items:[
          "Reducir la inmigración ilegal con normas, orden y control.",
          "Más medios, reconocimiento y autoridad para las fuerzas de seguridad."]},
        {topic:"Pactos", items:[
          "Gobernar en solitario, sin coalición; sin cordón sanitario a Vox; sin pactos con el PSOE de Sánchez.",
          "Ningún acuerdo con Bildu mientras no pida perdón a las víctimas de ETA."]}
      ]},
      {kind:"2023", label:"Programa 23-J", title:"Programa electoral 2023: 365 medidas (resumen oficial)", date:"4 jul. 2023", url:"https://www.pp.es/storage/2023/07/23.07.04._resumen_programa_electoral.pdf", sections:[
        {topic:"Impuestos", items:["Rebajar el IRPF a las rentas de menos de 40.000 €.","IVA reducido temporal para carne, pescado y conservas.","Reforma fiscal para proteger el ahorro y la inversión."]},
        {topic:"Empleo", items:["Reforma de las políticas activas de empleo, con más formación.","Cuentas individuales y portables para los trabajadores.","Plan para reducir a la mitad la brecha de empleo femenino en la legislatura."]},
        {topic:"Vivienda", items:["Pacto de Estado por la Vivienda con comunidades y ayuntamientos.","Avales para jóvenes de hasta 35 años.","Más vivienda social y suelo público."]},
        {topic:"Sanidad", items:["Plan de choque contra el déficit de especialistas.","Plan contra las agresiones a sanitarios.","Historia clínica electrónica única."]},
        {topic:"Educación", items:["Reformar la LOMLOE, con educación gratuita de 0 a 3 años.","EBAU común en toda España.","Equilibrio lingüístico en las comunidades bilingües."]},
        {topic:"Seguridad y justicia", items:["Ampliar la prisión permanente revisable a asesinatos con ocultación del cadáver.","Desalojo de okupas en un máximo de 24 horas.","Plan de choque judicial y nueva Ley de Enjuiciamiento Criminal."]},
        {topic:"Instituciones", items:["Reformar la ley del Tribunal Constitucional y una nueva ley de secretos oficiales.","Limitar los decretos-ley y reformar la Ley del Indulto y el estatuto del Fiscal General.","Derogar la Ley de Memoria Democrática y aprobar una ley de concordia."]},
        {topic:"Modelo territorial", items:["Reformar la financiación autonómica y local.","Reformar el Código Penal en sedición, malversación y referéndum ilegal."]},
        {topic:"Energía y agua", items:["Pacto Nacional del Agua.","Desbloquear los permisos de renovables.","Eliminar las intervenciones excepcionales en el mercado eléctrico."]},
        {topic:"Familia e igualdad", items:["Pacto de Estado por la conciliación y ampliar el título de familia numerosa.","Nueva ley trans.","Eliminar el término «disminuido» de la Constitución."]},
        {topic:"Defensa y exterior", items:["Fuerzas Armadas hasta 140.000 efectivos en dos legislaturas.","Plan de refuerzo consular.","Más lazos con Iberoamérica y relación equilibrada con el Magreb."]}
      ]}
    ]
  },
  PSOE: {
    pitch:"Hace campaña con su paquete de vivienda (regulación del alquiler, préstamos a coste cero para la primera compra y deducción por alquiler), el balance económico y el rechazo a un Gobierno con Vox. Está redactando su programa; su último documento programático es la ponencia de su congreso de 2024.",
    docs:[
      {kind:"2026", label:"Últimos anuncios", isNew:true, title:"Mitin de Dos Hermanas y medidas del Gobierno", date:"10–18 oct. 2026", url:"https://es.euronews.com/2026/10/10/sanchez-abre-la-campana-electoral-del-29n-en-su-ciudad-talisman-con-la-vivienda-como-eje-p", more:[["Medidas del Gobierno en precampaña (Moncloa.com, 18 oct.)","https://www.moncloa.com/2026/10/18/sanchez-decretos-campana-29n-3450823"],["Dimisión de Montse Mínguez (Euronews, 16 oct.)","https://es.euronews.com/2026/10/16/dimite-portavoz-psoe-debido-negocios-inmobiliarios-pareja-plena-crisis"],["Marc Pons y el programa (Última Hora, 18 oct.)","https://www.ultimahora.es/noticias/elecciones-29n/2026/10/18/2731293/marc-pons-redactara-propuestas-transicion-ecologica-del-programa-electoral-del-psoe.html"],["Proclamación de Sánchez (El Progreso)","https://www.elprogreso.es/articulo/espana/directo-carrera-29-n/202610171251242006667.html"]], sections:[
        {topic:"Vivienda (Dos Hermanas, 10 oct.)", items:["Préstamos «TU CASA» de hasta 50.000 € a coste cero para la primera vivienda: se devuelven al acabar la hipoteca, en 120 cuotas al 0%. Fondo de 10.000 millones del ICO.","Deducción del alquiler en la renta: casi 1.000 € al año con un alquiler de 800 € al mes.","Prórroga de hasta dos años de los alquileres para inquilinos al corriente de pago, con límite a las subidas.","280 millones en avales para construir vivienda industrializada y 400 millones para proveedores de vivienda social.","Casa 47 comprará inmuebles de la Seguridad Social para vivienda; limitar las compras de fondos, ligar las ventajas fiscales de las SOCIMI al alquiler asequible y que los pisos turísticos tributen como negocio."]},
        {topic:"Gobierno en precampaña", items:["Decreto de 45,3 millones para Ceuta, ligado a la atención a menores migrantes.","Anuncio de 500 plazas de jueces y 200 de fiscales para 2027.","Negociación de una nueva subida del salario mínimo (Yolanda Díaz) y posible revalorización de las pensiones aunque el Gobierno esté en funciones."]},
        {topic:"Candidatura y programa", items:["El Comité Federal proclamó a Sánchez candidato por unanimidad el 17 de octubre; las mujeres encabezan el 52% de las listas al Congreso.","Montse Mínguez dimitió como portavoz el 16 de octubre por los negocios inmobiliarios de su pareja; la sustituye Rebeca Torró.","Marc Pons redactará las propuestas de transición ecológica del programa."]}
      ]},
      {kind:"2026", label:"Precampaña 2026", title:"Decretos y anuncios del Gobierno", date:"sep. – oct. 2026", url:"https://www.idealista.com/news/finanzas/economia/2026/09/29/916383-el-gobierno-acuerda-proteger-los-desahucios-hasta-2030-y-prohibir-la-compra-por-fondos", sections:[
        {topic:"Vivienda", items:[
          "Prórroga extraordinaria de 2 años de los alquileres que venzan antes del 31-12-2028 y tope del 2% a las subidas hasta finales de 2027.",
          "Suspensión de desahucios de personas vulnerables sin alternativa habitacional hasta 2030.",
          "Veto hasta 2028 a compras de vivienda por entidades por debajo del 70% de su tasación (salvo para alquiler social).",
          "Regular el alquiler de temporada y por habitaciones; IVA del 10% para pisos turísticos y del 4% para vivienda protegida.",
          "Plan «TU CASA»: préstamo ICO al 0% de hasta el 20% del precio (máx. 50.000 €), con un fondo de 10.000 millones; ampliar el parque público con Casa 47.",
          "Bonificaciones fiscales para inquilinos con rentas de hasta 33.000 €."]},
        {topic:"Defensa", items:["Rechaza el objetivo del 5% del PIB en defensa que pide la OTAN."]},
        {topic:"Inmigración", items:["Regularización extraordinaria de inmigrantes aprobada por el Gobierno en 2026."]},
        {topic:"Empleo (votación)", items:["Impulsó con Sumar la jornada de 37,5 horas, rechazada por el Congreso en septiembre de 2025."]}
      ]},
      {kind:"doc", label:"41.º Congreso 2024", title:"Ponencia marco del 41.º Congreso Federal", date:"nov. 2024", url:"https://www.elindependiente.com/espana/2024/11/11/federalizar-la-agencia-tributaria-derecho-al-voto-para-los-mayores-de-16-anos-fiscalidad-verde-las-claves-de-la-ponencia-del-41o-congreso-del-psoe/", sections:[
        {topic:"Financiación y Estado", items:["Reforma de la financiación con más recursos para todas las comunidades y reducir a la mitad la diferencia por habitante.","Evitar la competencia fiscal a la baja en Patrimonio, Sucesiones y el IRPF alto.","Federalizar la dirección de la Agencia Tributaria y aliviar la deuda autonómica.","Reformar el Senado como cámara territorial."]},
        {topic:"Constitución y derechos", items:["Llevar a la Constitución el aborto, el matrimonio igualitario, la subida del salario mínimo, la sanidad universal, el derecho al agua y la titularidad pública permanente de la vivienda protegida.","Voto a los 16 años y un «escaño ciudadano» en Congreso y Senado."]},
        {topic:"Empleo e impuestos", items:["Jornada media de no más de 36 horas semanales en 2030.","Obligar a las empresas de más de 250 empleados a repartir parte de sus beneficios con la plantilla.","Reforma fiscal con más ingresos, menos fraude y más progresividad; fiscalidad ambiental con un bono climático."]},
        {topic:"Vivienda", items:["Parque público de al menos el 6% de las viviendas.","Rehabilitar 1,5 millones de viviendas antes de 2030.","Acabar con los pisos turísticos ilegales."]},
        {topic:"Inmigración", items:["Canales de migración segura y ordenada y homologación ágil de títulos."]},
        {topic:"Clima, agua y movilidad", items:["80% de electricidad renovable y 5% menos de consumo de agua en 2030.","Banco público de agua y nuevas desaladoras.","80.000 puntos de recarga en 2030, billete único de transporte y que las grandes empresas paguen el 50% del transporte público de su plantilla."]},
        {topic:"Igualdad", items:["Delito de terapias de conversión.","Ley abolicionista de la prostitución."]},
        {topic:"Exterior", items:["Más integración europea en exterior y defensa.","Solución de dos Estados en Israel y Palestina y apoyo a Ucrania."]}
      ]},
      {kind:"2023", label:"Programa 23-J", title:"Programa electoral 2023 (presentación)", date:"7 jul. 2023", url:"https://www.elindependiente.com/wp-content/uploads/2023/07/PresentacionProgramaElectoral_PS_7jul2023-1.pdf", sections:[
        {topic:"Empleo", items:["Pleno empleo con una tasa de paro del 8%, mediante un acuerdo social.","Que el salario mínimo nunca baje del 60% del salario medio, por ley."]},
        {topic:"Vivienda", items:["183.000 viviendas públicas de alquiler, la mitad para jóvenes.","Ampliar el Bono de Alquiler Joven.","Cuenta de ahorro para la primera vivienda con hasta 30.000 € libres de impuestos."]},
        {topic:"Pensiones", items:["Revalorizar las pensiones con el IPC por ley.","5.000 millones al año al fondo de reserva."]},
        {topic:"Sanidad", items:["Incluir dentista, fisioterapia, oftalmología, psiquiatría y psicología clínica en la sanidad pública.","Plazos máximos por ley: 30 días para pruebas y 15 días para atención psicológica a jóvenes."]},
        {topic:"Educación y juventud", items:["250.000 nuevas plazas de FP.","Universidad y FP superior gratis para quien apruebe a la primera.","Transporte urbano gratis para niños y estudiantes hasta 24 años."]},
        {topic:"Igualdad", items:["Permisos de nacimiento de 16 a 20 semanas.","Ley de Paridad y red pública de cuidados."]},
        {topic:"Instituciones", items:["Debates electorales obligatorios y fin de los aforamientos no ligados al cargo.","Renovar el CGPJ con el sistema actual.","Nueva financiación autonómica en un año, con gasto mínimo del 7% del PIB en sanidad, 5% en educación y 2% en servicios sociales."]},
        {topic:"Clima y agua", items:["Que los vecinos participen en la ubicación de renovables y reciban el 10% de los beneficios.","Duplicar la desalación y blindar la gestión pública del agua urbana."]}
      ]}
    ]
  },
  VOX: {
    pitch:"Centra su oferta en la «prioridad nacional», la «remigración» y la desregulación, que plantea como condiciones para pactar con el PP. Su último programa completo es el del 23-J.",
    docs:[
      {kind:"2026", label:"Últimos anuncios", isNew:true, title:"Ejes para el 29-N (Estepona)", date:"11–16 oct. 2026", url:"https://www.voxespana.es/abascal/abascal-reivindica-la-remigracion-la-desregulacion-y-la-prioridad-nacional-como-ejes-de-vox-para-el-29n-20261011", more:[["Propuestas económicas de PP y Vox (Moncloa.com, 16 oct.)","https://www.moncloa.com/2026/10/16/propuestas-economicas-vox-pp-29n-3449552/"],["Abascal reúne a la cúpula para el 29-N (The Objective, 14 oct.)","https://theobjective.com/espana/politica/2026-10-14/abascal-cupula-vox-29-n-elecciones/"]], sections:[
        {topic:"Inmigración", items:["«Remigración»: repatriar a quien entre ilegalmente, a los delincuentes y a quienes vivan de ayudas sociales.","«Prioridad nacional» como eje, sin medidas concretas nuevas."]},
        {topic:"Economía", items:["Desregulación: quitar trabas y leyes que encarecen la construcción de vivienda y la actividad de empresas, agricultores y autónomos.","Bajar la presión fiscal y recortar el «gasto ideológico».","IRPF de dos tramos."]},
        {topic:"Pensiones", items:["Garantizar su pago «como sea y al precio que sea».","Pasar a un modelo mixto de reparto y capitalización (José María Figaredo)."]}
      ]},
      {kind:"2026", label:"Precampaña 2026", title:"Propuestas y condiciones de 2026", date:"jun. – oct. 2026", url:"https://es.euronews.com/2026/10/05/vox-pp-condiciones-gobernar-espana-remigracion-desregularizacion-prioridad-nacional", sections:[
        {topic:"Condiciones para gobernar", items:["Prioridad nacional, desregulación y remigración, como condiciones para un acuerdo con el PP."]},
        {topic:"Vivienda", items:["Prioridad para los españoles en vivienda protegida, alquiler social y ayudas (moción rechazada en junio de 2026).","Eliminar o reducir mucho los impuestos de compra de la primera vivienda.","Más control de empadronamientos fraudulentos y «pisos patera»."]},
        {topic:"Inmigración", items:["«Remigración» de los extranjeros que no trabajan ni contribuyen y viven de ayudas.","Frenar el «efecto llamada» y recurrir la regularización del Gobierno.","«Tolerancia cero» con el islamismo."]}
      ]},
      {kind:"2023", label:"Programa 23-J", title:"Programa electoral 2023", date:"jul. 2023", url:"https://static.poder360.com.br/2023/07/Programa-VOX-2023.pdf", sections:[
        {topic:"Impuestos", items:["IRPF con dos tipos: 15% hasta 70.000 € y 25% por encima, con 4 puntos menos por hijo.","Suprimir Patrimonio, Sucesiones y Donaciones y la plusvalía municipal.","Impuesto de Sociedades al 15% y presupuestos de base cero."]},
        {topic:"Empleo", items:["Bonificar el 100% de las cotizaciones el primer año y el 50% el segundo en contratos indefinidos.","Derogar la reforma laboral.","Sin cuota de autónomos para quien ingrese menos del salario mínimo."]},
        {topic:"Vivienda", items:["Tolerancia cero con la okupación.","Sin IVA en la primera vivienda y recuperar la deducción por vivienda habitual.","Liberar suelo y derogar la ley de vivienda y el control de rentas."]},
        {topic:"Pensiones y social", items:["Pensiones contributivas exentas de IRPF.","Más plazas de residencias y refuerzo de la dependencia."]},
        {topic:"Sanidad", items:["Sistema Nacional de Salud único, recuperando competencias.","Reducir listas de espera con conciertos privados.","Derogar las leyes de eutanasia y aborto y aprobar una ley de cuidados paliativos."]},
        {topic:"Educación", items:["Devolver al Estado las competencias educativas.","Prueba única de acceso a la universidad y cheque escolar.","Derecho a estudiar en español en toda España."]},
        {topic:"Inmigración", items:["Inmigración legal adaptada al mercado laboral.","Repatriar a los menores extranjeros a sus países.","Sanidad para inmigrantes irregulares solo en urgencias; impedir su empadronamiento.","Despliegue militar en Ceuta, Melilla y Canarias."]},
        {topic:"Modelo territorial", items:["Estado unitario descentralizado administrativamente.","Suspender la autonomía de comunidades que atenten contra la unidad de España.","Integrar las policías autonómicas en las nacionales."]},
        {topic:"Instituciones y justicia", items:["Suprimir las subvenciones a partidos, sindicatos y patronales.","Cerrar las televisiones autonómicas y el Ministerio de Igualdad; menos ministerios y diputados.","Recuperar los delitos de referéndum ilegal y sedición."]},
        {topic:"Familia", items:["Derogar la Ley contra la Violencia de Género y sustituirla por una de violencia intrafamiliar.","Prohibir tratamientos de cambio de sexo en menores.","Deducción por nacimiento de 1.200 a 2.750 € según el número de hijo."]},
        {topic:"Energía y campo", items:["Contra la prohibición del motor de combustión en 2035.","Eliminar impuestos y normas «verdes».","Aranceles a los productos agrícolas de Marruecos."]},
        {topic:"Defensa y exterior", items:["Presión internacional para recuperar Gibraltar.","Incluir Ceuta y Melilla expresamente en la OTAN.","Servicio militar de reserva voluntario y más inversión en defensa."]}
      ]}
    ]
  },
  FA: {
    pitch:"Coalición de IU, Movimiento Sumar, Comuns, Más Madrid, CHA y otros partidos, con Ada Colau como candidata a la Presidencia. Ejes: vivienda, salarios y pensiones. No hubo acuerdo con Podemos. Su último programa es el de Sumar en 2023, cuando aún incluía a Podemos y Compromís.",
    docs:[
      {kind:"2026", label:"Últimos anuncios", isNew:true, title:"Presentación del Frente Amplio", date:"12–17 oct. 2026", url:"https://www.infobae.com/espana/agencias/2026/10/17/frente-amplio-defiende-que-intento-todo-por-un-pacto-de-unidad-pero-se-conjura-en-pasar-pagina-no-more-drama/", more:[["Coaliciones registradas (El Debate, 17 oct.)","https://www.eldebate.com/espana/20261017/nueve-coaliciones-registran-ante-junta-electoral-elecciones-29n_470781.html"],["Listas a la izquierda del PSOE por comunidad (Infobae, 17 oct.)","https://www.infobae.com/espana/2026/10/17/asi-quedan-los-acuerdos-de-la-izquierda-para-las-elecciones-generales-del-29-n-estas-son-las-listas-a-la-izquierda-del-psoe-en-cada-comunidad-autonoma/"]], sections:[
        {topic:"Candidatura", items:["Ada Colau, candidata a la Presidencia y cabeza de lista por Barcelona; Emilio Delgado (Más Madrid), por Madrid. Presentación el 17 de octubre en Madrid.","Coalición registrada: IU, Movimiento Sumar, Catalunya en Comú, Más Madrid, Chunta Aragonesista, Izquierda Asturiana, Verdes Equo, Batzarre y otros.","No se presenta en la C. Valenciana (allí va Compromís-Front Valencià, con EUPV) y en Canarias va dentro de Unidad del Pueblo Canario."]},
        {topic:"Unidad con Podemos", items:["No hubo acuerdo antes del cierre de coaliciones (16 oct.). Colau: «Si alguien no se quiere sentar a una mesa, no se le puede obligar»."]},
        {topic:"Propuestas", items:["Subir el salario mínimo (Ernest Urtasun).","Defender el sistema público de pensiones (Pablo Bustinduy).","Pide al PSOE ser «mucho más valiente» y aspira a volver a ser «la llave del Gobierno»."]},
        {topic:"Senado", items:["Va con el PSOE, Compromís, CHA y otros en la coalición «Senado de Progreso»."]}
      ]},
      {kind:"2026", label:"Precampaña 2026", title:"Propuestas del espacio de Sumar en 2025–2026", date:"jul. 2025 – oct. 2026", url:"https://orain.eus/es/politica/2026/10/04/sumar-fija-el-17-octubre-lanzar-el-frente-amplio-su-candidatura/", sections:[
                {topic:"Vivienda", items:["Renovación automática e indefinida de los contratos de alquiler.","Congelar los alquileres y moratoria de desahucios (septiembre de 2026).","Plan de vivienda 2026–2029 de 65.000 millones y 150.000 viviendas públicas al año.","Extender a toda España los límites a las compras especulativas."]},
        {topic:"Trabajo", items:["Registro horario para que no haya horas extra sin pagar, reducción de jornada y prestación por crianza."]},
        {topic:"Defensa", items:["Rechaza aumentar el gasto militar."]}
      ]},
      {kind:"2023", label:"Programa 23-J (Sumar)", title:"Programa electoral de Sumar 2023", date:"jul. 2023", url:"https://www.eldebate.com/espana/20230713/este-programa-electoral-sumar-elecciones-generales-23-j-cns_127754.html", sections:[
        {topic:"Impuestos", items:["Herencia universal de 20.000 € para jóvenes de 18 años.","Impuesto permanente a las grandes fortunas.","IRPF más progresivo desde 120.000 €, con un 52% por encima de 300.000 €.","Mantener los impuestos extraordinarios a energéticas y banca."]},
        {topic:"Empleo", items:["Bajar el paro al 7% al final de la legislatura.","Jornada máxima de 37,5 h en 2024 y reducción gradual hasta 32 h sin bajar sueldos.","Subir el salario mínimo por encima del IPC y currículum ciego."]},
        {topic:"Vivienda", items:["Dos millones de viviendas sociales de alquiler en menos de 10 años.","Bono de emergencia de 1.000 € por hogar con hipoteca variable.","Alquiler social obligatorio para grandes tenedores y precios de referencia del 30% de la renta en zonas tensionadas.","Limitar el alquiler turístico y alargar los contratos."]},
        {topic:"Pensiones y social", items:["Pensiones con el IPC y mínimas y no contributivas por encima del umbral de pobreza.","200 € al mes por hijo hasta los 18 años.","Ampliar el Ingreso Mínimo Vital."]},
        {topic:"Sanidad", items:["Medio punto más de PIB en sanidad cada año.","Dentista, óptica, audioprótesis, psicoterapia y fisioterapia en la sanidad pública.","Ley de tiempos máximos de espera y plan de salud mental."]},
        {topic:"Educación", items:["Educación de 0 a 3 años pública y gratuita.","Gasto educativo del 5% del PIB y después del 7%.","Menos alumnos por aula y comedores gratuitos en la pública."]},
        {topic:"Igualdad", items:["Acceso efectivo al aborto en la sanidad pública de todo el territorio.","Reproducción asistida pública para mujeres de hasta 45 años.","Permiso parental remunerado."]},
        {topic:"Modelo territorial", items:["España como país plurinacional.","En Cataluña, una consulta sobre el acuerdo que salga de la mesa de diálogo, sin referéndum de autodeterminación."]},
        {topic:"Clima, justicia y cultura", items:["500.000 empleos verdes.","Prohibir las pelotas de goma y convertir en delito las devoluciones en caliente.","Derogar la ley que protege la tauromaquia como patrimonio cultural."]}
      ]}
    ]
  },
  POD: {
    pitch:"Irene Montero, elegida en primarias con un 90%, encabeza la lista por Madrid con el lema «Paz, casa, trabajo». No hubo acuerdo con el Frente Amplio: en Cataluña apoya a ERC y va en coalición en la C. Valenciana (Compromís-Front Valencià) y en Canarias (Unidad del Pueblo Canario). En 2023 concurrió dentro de Sumar.",
    docs:[
      {kind:"2026", label:"Últimos anuncios", isNew:true, title:"Primarias y alianzas", date:"12–17 oct. 2026", url:"https://www.eldebate.com/espana/20261016/irene-montero-gana-primarias-abiertas-podemos-candidata-90-apoyo_470500.html", more:[["Pacto con ERC (ESdiario, 13 oct.)","https://www.esdiario.com/nacional/261013/200074/rufian-e-irene-montero-pactan-29n-dejan-frente-amplio-pelota-picada.html"],["Compromís-Front Valencià (El Salto, 16 oct.)","https://www.elsaltodiario.com/pais-valenciano/izquierda-valenciana-concurrira-unida-generales-siglas-compromis-front-valencia"],["Listas a la izquierda del PSOE (Infobae, 17 oct.)","https://www.infobae.com/espana/2026/10/17/asi-quedan-los-acuerdos-de-la-izquierda-para-las-elecciones-generales-del-29-n-estas-son-las-listas-a-la-izquierda-del-psoe-en-cada-comunidad-autonoma/"]], sections:[
        {topic:"Primarias (14–15 oct.)", items:["Irene Montero, única candidata, logra 24.136 de 26.590 votos (90%) y será cabeza de lista por Madrid.","Las listas de su equipo ganan en todas las circunscripciones salvo Badajoz (Congreso) y cinco del Senado.","El 87,7% de los inscritos respalda ir «en las candidaturas más fuertes y amplias posibles»."]},
        {topic:"Alianzas", items:["Sin acuerdo con el Frente Amplio.","Pacto con ERC: Podemos no presenta lista en Cataluña y apoya la de ERC; Rufián hará campaña con Montero fuera de Cataluña.","Coalición en la C. Valenciana (Compromís-Front Valencià; Podemos encabeza Alicante con María Teresa Pérez) y en Canarias (Unidad del Pueblo Canario)."]}
      ]},
      {kind:"2026", label:"Precampaña 2026", title:"Candidatura «Paz, casa, trabajo»", date:"feb. – oct. 2026", url:"https://www.democrata.es/politica/propone-irene-montero-con-quien-quiere-presentarse-claves-su-candidatura/", sections:[
        {topic:"Ejes", items:["Cinco prioridades: precios justos de la vivienda, trabajar menos para vivir mejor, bajar el coste de la vida, defender la paz y frenar la emergencia climática."]},
        {topic:"Trabajo", items:["Subir ya el salario mínimo a 1.800 € al mes (propuesta de febrero de 2026).","Reducir la jornada sin pérdida de sueldo, hacia 35 horas semanales."]},
        {topic:"Vivienda", items:["Intervenir los precios: Montero ha defendido bajar por ley el alquiler un 40%, prohibir la compra a no residentes y obligar a los fondos a ceder la mitad de sus viviendas al parque público."]},
        {topic:"Paz", items:["Contra el plan de rearme y el aumento del gasto militar."]}
      ]},
      {kind:"otro", label:"Ley de vivienda 2024", title:"Ley contra la especulación inmobiliaria (campaña europea)", date:"may. 2024", url:"https://www.eldebate.com/economia/20240518/congelar-precios-prohibir-compras-subir-impuestos-podemos-lleva-europa-ley-vivienda_198093.html", sections:[
        {topic:"Vivienda", items:["Congelar los alquileres durante toda la legislatura.","Contratos de alquiler de al menos 10 años (12 si el propietario es una empresa).","Que los grandes tenedores dediquen el 50% de sus viviendas a alquiler social (el 75% en la Sareb).","Permitir a los ayuntamientos prohibir la compra de vivienda que no sea para residir y limitar al 2% las viviendas turísticas."]}
      ]}
    ]
  },
  SALF: {
    pitch:"Partido de Alvise Pérez, centrado en la lucha contra la corrupción y el rechazo a los partidos tradicionales. Alvise encabeza la lista por Madrid. No hemos encontrado un programa detallado publicado.",
    docs:[
      {kind:"2026", label:"Últimos anuncios", isNew:true, title:"Candidatura al 29-N", date:"5–13 oct. 2026", url:"https://www.esdiario.com/nacional/261005/199492/ardillita-vuelve-comer-nueces-alvise-lanza-29n-encabezara-lista-salf-madrid.html", more:[["Avales en Córdoba (Cordópolis)","https://cordopolis.eldiario.es/cordoba-hoy/local/partido-alvise-supera-avales-exigidos-presentara-generales-cordoba_1_13590608.html"],["Avales en Zaragoza (Aragón Digital, 13 oct.)","https://www.aragondigital.es/articulo/politica/salf-llega-zaragoza-busca-avales-presentarse-elecciones-generales/202610131208431014946.html"]], sections:[
        {topic:"Candidatura", items:["Alvise Pérez será cabeza de lista por Madrid; es la primera vez que SALF se presenta al Congreso.","Recoge avales para presentarse en más provincias: los ha superado en Córdoba y los busca en Zaragoza."]}
      ]},
      {kind:"otro", label:"Ejes 2024–2025", title:"Ejes de Se Acabó La Fiesta", date:"2024 – 2025", url:"https://www.eldebate.com/espana/20240609/quien-alvise-perez-cual-programa-electoral-acabo-fiesta-cns_203773.html", sections:[
        {topic:"Ejes", items:["Lucha contra la corrupción como medida central.","Reforma del sistema político para reducir el peso de los partidos tradicionales.","Defensa de la libertad de expresión, sobre todo en redes sociales.","Discurso que vincula inmigración e inseguridad."]}
      ]}
    ]
  },
  ERC: {
    pitch:"Independentismo de izquierdas. Apoyó la investidura de Sánchez en 2023. Gabriel Rufián repite como cabeza de lista y Podemos apoya sus listas en Cataluña. Al Senado va con EH Bildu.",
    docs:[
      {kind:"2026", label:"Últimos anuncios", isNew:true, title:"Candidatura y alianzas", date:"11–17 oct. 2026", url:"https://www.articulo14.es/politica/gabriel-rufian-lista-erc-congreso-20261011.html", more:[["Pacto con Podemos (ESdiario, 13 oct.)","https://www.esdiario.com/nacional/261013/200074/rufian-e-irene-montero-pactan-29n-dejan-frente-amplio-pelota-picada.html"],["Rufián: «He fracasado» (Orain, 16 oct.)","https://orain.eus/es/politica/2026/10/16/rufian-se-disculpa-no-lograr-una-candidatura-unitaria-la-izquierda-he-fracasado/"],["Coaliciones registradas (El Debate, 17 oct.)","https://www.eldebate.com/espana/20261017/nueve-coaliciones-registran-ante-junta-electoral-elecciones-29n_470781.html"]], sections:[
        {topic:"Candidatura", items:["Gabriel Rufián será el cabeza de lista; los órganos del partido aprueban las listas el 20 de octubre.","Rechazó integrarse en el Frente Amplio y pidió disculpas por no lograr una candidatura unitaria de la izquierda."]},
        {topic:"Alianzas", items:["Podemos no se presenta en Cataluña y apoya las listas de ERC; Rufián y Montero harán campaña juntos.","Coalición ERC-EH Bildu para el Senado en Cataluña, País Vasco y Navarra."]}
      ]},
      {kind:"2023", label:"Programa 23-J", title:"Programa electoral 2023 (132 páginas)", date:"jul. 2023", url:"https://naciodigital.cat/politica/negociar-el-referendum-i-lamnistia-i-eliminar-el-senat-les-propostes-derc-per-al-23j.html", sections:[
        {topic:"Autodeterminación", items:["Negociar con el Gobierno un referéndum de autodeterminación reconocido internacionalmente.","Ley de amnistía.","Suprimir el Senado."]},
        {topic:"Derechos", items:["Derogar la ley mordaza y la ley de extranjería.","Despenalizar las injurias a la Corona.","Voto a los 16 años."]},
        {topic:"Financiación y social", items:["Acabar con el déficit fiscal de Cataluña.","Fondo de compensación por las infraestructuras presupuestadas y no ejecutadas.","Traspasar a Cataluña el Ingreso Mínimo Vital y acabar con la infrafinanciación sanitaria."]},
        {topic:"Lengua", items:["Plena normalización del catalán, con los mismos recursos estatales que el castellano."]}
      ]}
    ]
  },
  JUNTS: {
    pitch:"Independentismo. Fue clave en la investidura de 2023, pero retiró su apoyo al Gobierno en octubre de 2025 y votó contra los decretos de vivienda en 2026. No hemos encontrado su programa completo de 2023.",
    docs:[
      {kind:"2026", label:"Últimos anuncios", isNew:true, title:"Cabezas de lista", date:"8 oct. 2026", url:"https://www.diariodeleon.es/nacional/261008/2099696/junts-confirma-miriam-nogueras-candidata-29n.html", sections:[
        {topic:"Candidatura", items:["Míriam Nogueras repite como cabeza de lista por Barcelona; Marta Madrenas (Girona), Isidre Gavín (Lleida) y Josep Maria Cruset (Tarragona).","El partido destaca la cohesión de su grupo y la defensa de los intereses de Cataluña en el Congreso."]}
      ]},
      {kind:"2026", label:"Legislatura 2025–2026", title:"Propuestas durante la legislatura", date:"may. 2026", url:"https://www.elsaltodiario.com/vivienda/sumar-incluira-propuestas-junts-relanzar-prorroga-alquileres", sections:[
        {topic:"Vivienda", items:["Desgravación de alquileres e hipotecas y bonificaciones fiscales a inquilinos y pequeños propietarios.","Que los mayores de 65 que vendan su piso para pagar la residencia no paguen IRPF.","Dejar fuera de la prórroga de alquileres a quienes no estén al día de pago."]},
        {topic:"Financiación", items:["Que el Estado pague los gastos de las políticas sociales."]}
      ]},
      {kind:"2023", label:"Campaña 23-J", title:"Propuestas de campaña y condiciones de investidura", date:"jul. 2023", url:"https://junts.cat/wp-content/uploads/2026/08/MESJUNTS_28_070723.pdf", sections:[
        {topic:"Independencia", items:["La independencia como objetivo; no apoyar a ningún Gobierno español sin contrapartidas.","Tras el 23-J exigió amnistía y avances en autodeterminación para investir a Sánchez."]},
        {topic:"Economía", items:["Destinar a la Generalitat lo que Junts calcula como déficit fiscal (20.000 millones al año), para subir un 50% su presupuesto.","Eliminar el impuesto de sucesiones y reducir la cuota de autónomos."]}
      ]}
    ]
  },
  BILDU: {
    pitch:"Izquierda abertzale. Apoyó la investidura de 2023 y defiende prohibir los desahucios y prorrogar los alquileres. Renueva sus listas: Mertxe Aizpurua no repite. Al Senado va con ERC.",
    docs:[
      {kind:"2026", label:"Últimos anuncios", isNew:true, title:"Renovación de candidaturas", date:"11–17 oct. 2026", url:"https://orain.eus/es/politica/2026/10/11/mertxe-aizpurua-no-sera-candidata-eh-bildu-al-congreso/", more:[["Coaliciones registradas (El Debate, 17 oct.)","https://www.eldebate.com/espana/20261017/nueve-coaliciones-registran-ante-junta-electoral-elecciones-29n_470781.html"]], sections:[
        {topic:"Candidatura", items:["Mertxe Aizpurua no será candidata: considera que «ha terminado un ciclo». Bildu renueva sus listas en Álava, Bizkaia, Gipuzkoa y Navarra.","Coalición ERC-EH Bildu para el Senado."]}
      ]},
      {kind:"2023", label:"Compromiso 23-J", title:"Compromiso de Euskal Herria Bildu", date:"jul. 2023", url:"https://ehbildu.eus/dokumentuak/23J-COMPROMISO-DE-EUSKAL-HERRIA-BILDU.pdf", sections:[
        {topic:"Derecho a decidir", items:["Reconocer el carácter plurinacional del Estado y una solución política basada en el derecho a decidir."]},
        {topic:"Empleo", items:["Recuperar la indemnización de 45 días por despido y los salarios de tramitación.","Jornada de 32 horas sin bajar salarios.","Salario mínimo de 1.200 €."]},
        {topic:"Pensiones", items:["Pensiones mínimas de 1.080 € de inmediato.","Ningún aumento de la edad de jubilación ni del periodo de cálculo."]},
        {topic:"Vivienda", items:["Prórroga automática de los alquileres con las mismas condiciones.","Limitar la subida de las cuotas de hipotecas de menos de 250.000 €."]},
        {topic:"Servicios públicos y clima", items:["Derogar la ley que permite privatizar la gestión sanitaria (Ley 15/1997).","Transporte público con descuentos garantizados por ley.","Neutralidad climática en 2040 y empresas públicas de electricidad."]},
        {topic:"Memoria y derechos", items:["Ampliar la Ley de Memoria Democrática.","Derogar la ley mordaza y la Ley de Secretos Oficiales."]}
      ]}
    ]
  },
  PNV: {
    pitch:"Nacionalismo vasco de centroderecha. Apoyó la investidura de 2023 y se abstuvo en la ley de vivienda del PP en 2026.",
    docs:[
      {kind:"2023", label:"Programa 23-J", title:"«Con voz propia»: programa electoral 2023", date:"jul. 2023", url:"https://eaj-pnv.eus/es/adjuntos-documentos/20945/pdf/con-voz-propia-programa-electoral-23-j", sections:[
        {topic:"Autogobierno", items:["Transferir el régimen económico de la Seguridad Social, como prevé el Estatuto de Gernika.","Completar las transferencias pendientes y participación directa de Euskadi en la UE."]},
        {topic:"Concierto Económico", items:["Defender el Concierto y que las haciendas vascas puedan adaptar los nuevos impuestos estatales.","Capacidad normativa vasca sobre el IVA."]},
        {topic:"Economía y energía", items:["Menos burocracia en los fondos europeos.","Proteger la industria frente al coste energético; hidrógeno verde y eólica marina."]},
        {topic:"Social", items:["Mantener los bonos sociales eléctrico y térmico.","Derecho al olvido oncológico ante bancos y aseguradoras."]},
        {topic:"Instituciones", items:["Nueva Ley de Secretos Oficiales con desclasificación automática.","Actualizar el marco del CNI, eliminar aforamientos y regular los lobbies."]}
      ]}
    ]
  },
  BNG: {
    pitch:"Nacionalismo gallego de izquierdas. Apoyó la investidura de 2023 y pide más regulación del alquiler.",
    docs:[
      {kind:"2026", label:"Últimos anuncios", isNew:true, title:"Mensajes de precampaña", date:"18 oct. 2026", url:"https://www.elprogreso.es/articulo/espana/directo-carrera-29-n/202610171251242006667.html", sections:[
        {topic:"Galicia", items:["Néstor Rego pide llevar a las urnas el rechazo a la mina de Touro-O Pino y a la planta de Altri."]}
      ]},
      {kind:"2023", label:"Programa 23-J", title:"Programa electoral 2023", date:"jul. 2023", url:"https://www.bng.gal/media/bnggaliza/files/2023/07/05/23_bng_xerais_programa.pdf", sections:[
        {topic:"Autogobierno", items:["Transferir a Galicia la Seguridad Social, las relaciones laborales y la seguridad (Policía Galega).","Hacienda gallega con un modelo de concierto económico."]},
        {topic:"Impuestos", items:["IRPF más progresivo, con menos tributación del trabajo y más del capital.","Rebaja permanente del IVA de alimentos básicos, transporte y suministros."]},
        {topic:"Energía e industria", items:["Tarifa eléctrica gallega.","Declarar la costa gallega no apta para la eólica marina; complejo industrial en Navantia Ferrol."]},
        {topic:"Vivienda y servicios", items:["Inversión en vivienda de 250 € por habitante y viviendas de la Sareb para el instituto gallego de vivienda.","Educación pública gratuita de 0 a 18 años, con el 7% del PIB."]},
        {topic:"Otros", items:["Transferir y nacionalizar las autopistas AP-9 y AP-53.","Derogar la reforma laboral y la ley mordaza; jubilación a los 65."]}
      ]}
    ]
  },
  CC: {
    pitch:"Nacionalismo canario. Apoyó la investidura de 2023 a cambio de la «Agenda Canaria». Para el 29-N concurre como Coalición Canarias-Municipalistas Primero.",
    docs:[
      {kind:"2026", label:"Últimos anuncios", isNew:true, title:"Coalición registrada", date:"16–17 oct. 2026", url:"https://www.eldebate.com/espana/20261017/nueve-coaliciones-registran-ante-junta-electoral-elecciones-29n_470781.html", sections:[
        {topic:"Candidatura", items:["Coalición Canarias-Municipalistas Primero: Congreso por Canarias y Senado por Tenerife, Gran Canaria, Fuerteventura, Lanzarote, La Palma y La Gomera."]}
      ]},
      {kind:"2023", label:"Manifiesto 23-J", title:"52 compromisos con Canarias (manifiesto conjunto)", date:"26 jun. 2023", url:"https://www.redaccionmedica.com/contenido/images/00_COALICION%20POR%20CANARIAS.pdf", sections:[
        {topic:"Autogobierno", items:["Grupo parlamentario canario propio en Congreso y Senado.","No apoyar Presupuestos que incumplan el Régimen Económico y Fiscal (REF).","Desarrollar el Estatuto de 2018, incluida la gestión del litoral."]},
        {topic:"Transporte", items:["Mantener la bonificación del 100% en guaguas y tranvías.","Precios máximos en rutas aéreas y marítimas de servicio público.","Incluir los trenes de Gran Canaria y Tenerife en la red de ADIF."]},
        {topic:"Servicios y empleo", items:["Financiación de sanidad, educación y servicios sociales separada del REF; que el Estado pague el 50% de la dependencia.","Educación 0-3 gratuita.","Planes de empleo específicos para Canarias."]},
        {topic:"Exterior", items:["Exención para Canarias de la nueva tasa verde a los vuelos.","Voz propia en las negociaciones con Marruecos sobre aguas y migración."]}
      ]}
    ]
  },
  CFV: {
    pitch:"Coalición de la izquierda valenciana: Compromís, Podemos, Esquerra Unida (IU) y ERPV. Es la única lista a la izquierda del PSOE en la C. Valenciana. En 2023 Compromís concurrió dentro de Sumar.",
    docs:[
      {kind:"2026", label:"Últimos anuncios", isNew:true, title:"Coalición Compromís-Front Valencià", date:"16–17 oct. 2026", url:"https://www.elsaltodiario.com/pais-valenciano/izquierda-valenciana-concurrira-unida-generales-siglas-compromis-front-valencia", more:[["EUPV acepta la coalición (Alicante Plaza, 16 oct.)","https://alicanteplaza.es/alicanteplaza/comunitat-valenciana/reconciliacion-in-extremis-en-la-izquierda-eupv-acepta-la-ultima-oferta-de-compromis-e-iran-en-coalicion"],["Coaliciones registradas (El Debate, 17 oct.)","https://www.eldebate.com/espana/20261017/nueve-coaliciones-registran-ante-junta-electoral-elecciones-29n_470781.html"]], sections:[
        {topic:"Candidatura", items:["Valencia: Àgueda Micó y Alberto Ibáñez (Compromís) en los dos primeros puestos; EUPV, el tercero.","Alicante: María Teresa Pérez (Podemos). Castellón: encabeza Compromís.","«Front» no supone integrarse en el Frente Amplio: la coalición es solo valenciana y solo para el Congreso."]},
        {topic:"Senado", items:["Las listas al Senado dependen de un posible pacto con el PSOE."]}
      ]}
    ]
  },
  UPC: {
    pitch:"Coalición canaria de Nueva Canarias-Bloque Canarista, Podemos, Movimiento Sumar e IU Canaria, para el Congreso y el Senado.",
    docs:[
      {kind:"2026", label:"Últimos anuncios", isNew:true, title:"Coalición Unidad del Pueblo Canario", date:"16–17 oct. 2026", url:"https://www.eldebate.com/espana/20261017/nueve-coaliciones-registran-ante-junta-electoral-elecciones-29n_470781.html", more:[["Listas a la izquierda del PSOE (Infobae, 17 oct.)","https://www.infobae.com/espana/2026/10/17/asi-quedan-los-acuerdos-de-la-izquierda-para-las-elecciones-generales-del-29-n-estas-son-las-listas-a-la-izquierda-del-psoe-en-cada-comunidad-autonoma/"]], sections:[
        {topic:"Candidatura", items:["Registrada ante la Junta Electoral Central para el Congreso y el Senado.","Es el único territorio donde Podemos y los partidos del Frente Amplio van juntos."]}
      ]}
    ]
  },
  UPN: {
    pitch:"Regionalismo navarro de centroderecha. Votó a favor de la ley de vivienda del PP en 2026.",
    docs:[
      {kind:"2023", label:"Programa 23-J", title:"Programa electoral 2023", date:"jul. 2023", url:"https://www.upn.org/wp-content/uploads/2023/07/Programa-Generales-23J_V2-1.pdf", sections:[
        {topic:"Régimen foral", items:["Navarra como Comunidad Foral diferenciada; defender sus competencias.","Suprimir la Disposición Transitoria Cuarta de la Constitución.","Que el Gobierno de España no dependa de EH Bildu ni de los independentistas."]},
        {topic:"Infraestructuras", items:["Segunda fase del Canal de Navarra y ampliar a 50 años el pago del canon.","Tren de alta velocidad hasta Pamplona y autovía Tudela–Medinaceli."]},
        {topic:"Educación y vivienda", items:["Libertad de elección de centro y derogar la LOMLOE.","Derogar la Ley de Vivienda."]}
      ]}
    ]
  }
};
const PROGRAM_PARTIES = ["PP","PSOE","VOX","FA","POD","SALF","ERC","JUNTS","BILDU","PNV","BNG","CC","CFV","UPC","UPN"];

const MINOR_NOTES = {
  ERC:PROGRAMS.ERC.pitch, JUNTS:PROGRAMS.JUNTS.pitch, BILDU:PROGRAMS.BILDU.pitch, PNV:PROGRAMS.PNV.pitch, BNG:PROGRAMS.BNG.pitch, CC:PROGRAMS.CC.pitch, UPN:PROGRAMS.UPN.pitch, CFV:PROGRAMS.CFV.pitch, UPC:PROGRAMS.UPC.pitch,
  AA:"Izquierda andalucista. Va sola en las 8 provincias andaluzas, con cabezas de lista sin experiencia institucional (siete mujeres y un hombre), y rechazó integrarse en el Frente Amplio. Algunas encuestas le dan 1–3 escaños.",
  D21:"Partido nuevo de Miriam González con Ciudadanos y UCIN. Solo se presenta en Madrid y Barcelona. Propone un plan nacional de construcción de barrios, quitar los impuestos de vivienda a menores de 35 años, despolitizar el CGPJ, eliminar aforamientos y cortar subvenciones a partidos.",
  AC:"No se presenta al 29-N: Sílvia Orriols descarta ir al Congreso porque busca la independencia «desde Cataluña». Las encuestas que la incluían le daban 1–4 escaños."
};

/* ---------- Comparador por temas: [etiqueta, texto] ---------- */
const TOPICS = [
  {id:"vivienda", name:"Vivienda", rows:{
    PP:[["2026","Suelo para 1 millón de viviendas en 4 años, impuestos de compra un 60% más bajos para jóvenes, avales del 95–100%, derogar la Ley de Vivienda y las zonas tensionadas, y ley antiokupación con desalojo en 48 h."],["2023","Pacto de Estado, avales hasta 35 años y desalojo de okupas en 24 h."]],
    PSOE:[["2026","Prórroga de alquileres, tope del 2%, sin desahucios de vulnerables hasta 2030, veto a compras especulativas, préstamos de hasta 50.000 € a coste cero para la entrada y deducción del alquiler en la renta."],["2024","Parque público de al menos el 6% y 1,5 millones de viviendas rehabilitadas en 2030."],["2023","183.000 viviendas públicas de alquiler."]],
    VOX:[["2026","Prioridad nacional en vivienda protegida y ayudas, eliminar o rebajar mucho los impuestos de compra y quitar trabas para construir."],["2023","Sin IVA en la primera vivienda, deducción por vivienda y derogar la ley de vivienda y el control de rentas."]],
    FA:[["2026","Alquiler indefinido, congelación de rentas, moratoria de desahucios y 150.000 viviendas públicas al año."],["2023","2 millones de viviendas sociales en 10 años y alquiler social obligatorio para grandes tenedores."]],
    POD:[["2026","Bajar por ley el alquiler, prohibir la compra a no residentes y que los fondos cedan la mitad de sus pisos."],["2024","Congelar alquileres y contratos de 10 años."]],
    SALF:[]}},
  {id:"impuestos", name:"Impuestos", rows:{
    PP:[["2025","Revisar las 97 subidas de impuestos y bajarlos."],["2023","Rebajar el IRPF a rentas de menos de 40.000 €."]],
    PSOE:[["2024","Reforma fiscal más progresiva, sin competencia a la baja en Patrimonio y Sucesiones; fiscalidad ambiental con bono climático."],["2026","IVA del 10% a pisos turísticos y bonificaciones a inquilinos."]],
    VOX:[["2026","IRPF de dos tramos y menos presión fiscal."],["2023","IRPF de dos tipos (15% y 25%), suprimir Patrimonio, Sucesiones y plusvalía, Sociedades al 15%."]],
    FA:[["2023","Impuesto permanente a grandes fortunas, IRPF del 52% por encima de 300.000 € y herencia universal de 20.000 €."]],
    POD:[["2026","Bajar el coste de la vida interviniendo precios."]],
    SALF:[]}},
  {id:"empleo", name:"Trabajo y salarios", rows:{
    PP:[["2026","Ampliar el límite de horas extra, que las mutuas puedan dar altas médicas e IRPF bonificado para jóvenes en sus 4 primeros años de trabajo."],["2025","Subir el salario mínimo con acuerdo social y que el subsidio no compita con el empleo."],["voto","Votó contra la jornada de 37,5 h (2025)."]],
    PSOE:[["2024","Jornada media de 36 h en 2030 y reparto de beneficios en grandes empresas."],["2023","Salario mínimo por ley al 60% del salario medio; paro al 8%."]],
    VOX:[["2023","Derogar la reforma laboral y bonificar el 100% de las cotizaciones el primer año en contratos indefinidos."],["voto","Votó contra la jornada de 37,5 h (2025)."]],
    FA:[["2026","Subir el salario mínimo, reducir la jornada, registro horario y prestación por crianza."],["2023","37,5 h y después 32 h; paro al 7%."]],
    POD:[["2026","Salario mínimo de 1.800 € y jornada hacia 35 h sin bajar sueldos."]],
    SALF:[]}},
  {id:"pensiones", name:"Pensiones y familias", rows:{
    PP:[["2025","Garantizar la actualización de las pensiones y su viabilidad; apoyo a la natalidad."]],
    PSOE:[["2023","Pensiones con el IPC por ley y 5.000 millones al año al fondo de reserva; permisos de nacimiento de 20 semanas."]],
    VOX:[["2026","Garantizar su pago y pasar a un modelo mixto de reparto y capitalización."],["2023","Pensiones contributivas sin IRPF y deducción por nacimiento de 1.200 a 2.750 €."]],
    FA:[["2026","Defender el sistema público de pensiones."],["2023","Pensiones mínimas por encima del umbral de pobreza y 200 € al mes por hijo."]],
    POD:[],
    SALF:[]}},
  {id:"sanidad", name:"Sanidad y educación", rows:{
    PP:[["2025","Afrontar la falta de médicos y financiar la ley ELA; ley de lenguas con enseñanza en español."],["2023","Plan de choque de especialistas, 0-3 gratuito y EBAU común."]],
    PSOE:[["2023","Dentista, fisio y psicología en la sanidad pública, plazos máximos por ley, 250.000 plazas de FP y matrícula gratis aprobando a la primera."]],
    VOX:[["2023","Recentralizar sanidad y educación, conciertos para las listas de espera, cheque escolar y derogar las leyes de eutanasia y aborto."]],
    FA:[["2023","Medio punto más de PIB en sanidad al año, dental y psicoterapia públicas, 0-3 gratuito y 7% del PIB en educación."]],
    POD:[],
    SALF:[]}},
  {id:"inmigracion", name:"Inmigración", rows:{
    PP:[["2026","Visado por puntos y temporal ligado al empleo, cuotas por países que cooperen, fin de las regularizaciones generalizadas y pérdida de residencia por delitos graves."]],
    PSOE:[["2026","Regularización extraordinaria aprobada en 2026."],["2024","Canales de migración segura y ordenada."]],
    VOX:[["2026","Remigración de quienes «viven de ayudas», prioridad nacional y recurso contra la regularización."],["2023","Repatriar a menores extranjeros y sanidad solo de urgencias para irregulares."]],
    FA:[["2026","Apoya la regularización y rechaza el visado por puntos del PP."]],
    POD:[["2026","A favor de la regularización y en contra del endurecimiento migratorio."]],
    SALF:[["2025","Vincula inmigración e inseguridad, sin medidas concretas."]]}},
  {id:"territorial", name:"Modelo territorial", rows:{
    PP:[["2026","Ligar la financiación autonómica a la construcción de viviendas."],["2023","Reformar el Código Penal en sedición, malversación y referéndum ilegal."]],
    PSOE:[["2024","Más recursos para todas las comunidades, federalizar la Agencia Tributaria y Senado territorial."]],
    VOX:[["2023","Estado unitario, suspender autonomías que atenten contra la unidad e integrar las policías autonómicas."]],
    FA:[["2023","España plurinacional y consulta en Cataluña sobre el acuerdo de la mesa de diálogo."]],
    POD:[],
    SALF:[]}},
  {id:"instituciones", name:"Instituciones y justicia", rows:{
    PP:[["2025","Cargos por mérito, reformar CGPJ, Constitucional y Fiscalía, y elecciones si no hay Presupuestos."],["2023","Derogar la Ley de Memoria Democrática."]],
    PSOE:[["2023","Debates electorales obligatorios y fin de aforamientos no ligados al cargo."],["2024","Voto a los 16 años y blindar derechos en la Constitución."]],
    VOX:[["2023","Suprimir subvenciones a partidos y sindicatos, cerrar televisiones autonómicas y recuperar el delito de sedición."]],
    FA:[["2023","Prohibir las pelotas de goma y castigar las devoluciones en caliente."]],
    POD:[],
    SALF:[["2025","Lucha anticorrupción y reforma del sistema político."]]}},
  {id:"clima", name:"Clima y energía", rows:{
    PP:[["2025","Plan Nacional del Agua."],["2023","Desbloquear renovables y retirar la intervención en el mercado eléctrico."]],
    PSOE:[["2024","80% de electricidad renovable en 2030, desaladoras y bono climático."],["2023","Que los vecinos cobren el 10% de los beneficios de las renovables cercanas."]],
    VOX:[["2023","Contra la prohibición del motor de combustión en 2035 y eliminar los impuestos «verdes»."]],
    FA:[["2023","500.000 empleos verdes."]],
    POD:[["2026","La emergencia climática como uno de sus cinco ejes."]],
    SALF:[]}},
  {id:"defensa", name:"Defensa y exterior", rows:{
    PP:[["2023","Fuerzas Armadas hasta 140.000 efectivos."],["2025","Posición «firme y fiable» en los compromisos internacionales."]],
    PSOE:[["2026","Rechaza el objetivo del 5% del PIB en defensa."],["2024","Más integración europea en defensa, apoyo a Ucrania y dos Estados en Israel y Palestina."]],
    VOX:[["2023","Recuperar Gibraltar, Ceuta y Melilla en la OTAN y más gasto en defensa."]],
    FA:[["2026","Contra aumentar el gasto militar."]],
    POD:[["2026","«Paz» frente al rearme."]],
    SALF:[]}}
];

/* ---------- Senado ---------- */
const SEN_2023 = {"Almería":{"PP":3,"PSOE":1},"Cádiz":{"PP":3,"PSOE":1},"Córdoba":{"PP":3,"PSOE":1},"Granada":{"PP":3,"PSOE":1},"Huelva":{"PP":2,"PSOE":2},"Jaén":{"PP":3,"PSOE":1},"Málaga":{"PP":3,"PSOE":1},"Sevilla":{"PSOE":3,"PP":1},"Huesca":{"PP":3,"PSOE":1},"Teruel":{"PP":3,"PSOE":1},"Zaragoza":{"PP":3,"PSOE":1},"Asturias":{"PP":3,"PSOE":1},"Mallorca":{"PP":2,"PSOE":1},"Menorca":{"PP":1},"Ibiza":{"PSOE":1},"Gran Canaria":{"PSOE":2,"PP":1},"Tenerife":{"PSOE":2,"PP":1},"Lanzarote":{"PSOE":1},"Fuerteventura":{"PSOE":1},"La Palma":{"PSOE":1},"La Gomera":{"ASG":1},"El Hierro":{"AHI":1},"Cantabria":{"PP":3,"PSOE":1},"Albacete":{"PP":3,"PSOE":1},"Ciudad Real":{"PP":3,"PSOE":1},"Cuenca":{"PP":3,"PSOE":1},"Guadalajara":{"PP":3,"PSOE":1},"Toledo":{"PP":3,"PSOE":1},"Ávila":{"PP":3,"PSOE":1},"Burgos":{"PP":3,"PSOE":1},"León":{"PP":3,"PSOE":1},"Palencia":{"PP":3,"PSOE":1},"Salamanca":{"PP":3,"PSOE":1},"Segovia":{"PP":3,"PSOE":1},"Soria":{"PP":3,"PSOE":1},"Valladolid":{"PP":3,"PSOE":1},"Zamora":{"PP":3,"PSOE":1},"Barcelona":{"PSOE":3,"ERC":1},"Girona":{"PSOE":3,"JUNTS":1},"Lleida":{"PSOE":3,"ERC":1},"Tarragona":{"PSOE":3,"ERC":1},"Alicante":{"PP":3,"PSOE":1},"Castellón":{"PP":3,"PSOE":1},"Valencia":{"PP":2,"PSOE":2},"Badajoz":{"PP":2,"PSOE":2},"Cáceres":{"PP":2,"PSOE":2},"A Coruña":{"PP":3,"PSOE":1},"Lugo":{"PP":3,"PSOE":1},"Ourense":{"PP":3,"PSOE":1},"Pontevedra":{"PP":3,"PSOE":1},"Madrid":{"PP":3,"PSOE":1},"Murcia":{"PP":3,"PSOE":1},"Navarra":{"PSOE":3,"UPN":1},"Álava":{"PSOE":3,"BILDU":1},"Bizkaia":{"PNV":3,"PSOE":1},"Gipuzkoa":{"BILDU":3,"PNV":1},"La Rioja":{"PP":3,"PSOE":1},"Ceuta":{"PP":2},"Melilla":{"PP":2}}; // Ibiza: coalición progresista (PSOE, Sumar, EUIB, Ara Eivissa) por Ibiza-Formentera
/* Senadores designados por los parlamentos autonómicos (no cambian con las generales). Fuente: senado.es y Europa Press, oct. 2026 */
const DESIGNATED = {total:58, by:{PP:23,PSOE:19,VOX:5,JUNTS:3,ERC:1,BILDU:1,PNV:1,BNG:1,CC:1,CFV:1,FA:1,GBAI:1}, note:"Compromís (1) y Más Madrid (1) aparecen con Compromís-Front Valencià y Frente Amplio."};
const SENATE_FACTS = {elected:209, total:267, majority:134, elected23:208, total23:266, now:{PP:143,PSOE:91,BILDU:5,PNV:5,VOX:5,ERC:4,JUNTS:4,UPN:1,BNG:1,CC:1,CFV:1,FA:1,GBAI:1,ASG:1,AHI:1,IND:1}};
const SEN_2023_TOTALS = {PP:120,PSOE:72,BILDU:4,PNV:4,ERC:3,JUNTS:1,UPN:1,IBIZA:1,ASG:1,AHI:1};
const SEN_PACTS = [
  {name:"Senado de Progreso", parties:"PSOE, IU, Movimiento Sumar, Más Madrid, Compromís, Chunta Aragonesista y Batzarre", scope:"Toda España salvo Cataluña, Baleares y Canarias (también País Vasco, Navarra, Ceuta y Melilla)", how:"Sustituye a las listas del PSOE al Senado. Reparto general: el PSOE pone el 1.º y el 3.º candidato y los socios el 2.º. En Badajoz, Cáceres, Huelva y Valencia el PSOE pone el 1.º y el 2.º; en Álava y Sevilla, los tres. En Galicia el PSdeG encabeza y el Frente Amplio va 2.º; en Aragón el 2.º es de IU (Huesca) o de CHA (Zaragoza y Teruel). Alicante y Castellón, pendientes.", aim:"Disputar al PP la mayoría absoluta que tiene en el Senado.", src:"https://www.nuevatribuna.es/articulo/actualidad/senadoras-senadores-democracia-celebra-que-hayan-conseguido-listas-unitarias-izquierda-senado/20261017090815255307.html"},
  {name:"Pactos insulares en Baleares", parties:"PSIB-PSOE con MÉS, Sumar, EU y otros partidos de cada isla", scope:"Mallorca, Menorca, Ibiza y Formentera", how:"Mallorca: «Acord de Progrés per Mallorca» (PSIB, MÉS, Sumar y EU), con Catalina Cladera. Ibiza: el independiente Juanjo Ferrer, con PSOE, Ara Eivissa, IU y Podemos. Formentera: «Formentera al Senat» (PSOE, Gent per Formentera y Sumar). Menorca: acuerdo PSOE–Més, sin cerrar.", src:"https://canal4diario.com/29n/2026/10/18/psib-mes-sumar-y-esquerra-unida-concurriran-juntos-al-senado-bajo-la-marca-acord-de-progres-per-mallorca/"},
  {name:"ERC-EH Bildu", parties:"ERC y EH Bildu", scope:"Cataluña, País Vasco y Navarra", how:"Repiten la lista conjunta. Encabezan por Bildu Josu Estarrona (Álava), Idurre Bideguren (Bizkaia), Sonia Jacinto (Gipuzkoa) y Floren Aoiz (Navarra).", src:"https://www.infobae.com/america/agencias/2026/10/17/registradas-en-la-jec-nueve-coaliciones-electorales-dos-para-el-congreso-tres-para-el-senado-y-cuatro-autonomicas/"},
  {name:"Comuns-Front Ampli per la democràcia", parties:"Catalunya en Comú y Comuns", scope:"Cataluña (solo Senado)", how:"En Cataluña no hay Senado de Progreso: el PSC va solo y los Comuns, con su propia lista.", src:"https://www.eldebate.com/espana/20261017/nueve-coaliciones-registran-ante-junta-electoral-elecciones-29n_470781.html"},
  {name:"Unidad del Pueblo Canario", parties:"NC-Bloque Canarista, Podemos, Movimiento Sumar e IU Canaria", scope:"Canarias (Congreso y Senado)", how:"En Canarias el PSOE va solo al Senado, salvo un pacto progresista en La Gomera.", src:"https://www.infobae.com/america/agencias/2026/10/17/registradas-en-la-jec-nueve-coaliciones-electorales-dos-para-el-congreso-tres-para-el-senado-y-cuatro-autonomicas/"},
  {name:"CC-Municipalistas Primero", parties:"Coalición Canaria y Municipalistas Primero", scope:"Tenerife, Gran Canaria, Fuerteventura, Lanzarote, La Palma y La Gomera", how:"No se presenta en El Hierro, donde AHI propone repetir con Javier Armas. En La Gomera, ASG presenta a Yaiza Castilla.", src:"https://www.eldebate.com/espana/20261017/nueve-coaliciones-registran-ante-junta-electoral-elecciones-29n_470781.html"},
  {name:"UPN-PP", parties:"UPN y PP («Unión del Pueblo Navarro en coalición con el Partido Popular»)", scope:"Navarra (Congreso y Senado)", how:"Al Congreso, UPN encabeza con una mujer; el PP lleva el 2.º (Sergio Sayas), el 3.º y el 5.º, y UPN el 4.º. Al Senado, UPN pone el 1.º y el 3.º candidato y el PP el 2.º. En 2023 fueron por separado y sacaron un diputado cada uno. En Formentera el PP va con Compromís per Formentera («Sa Unió»).", src:"https://www.vozpopuli.com/espana/politica/elecciones-generales-del-29-n-en-directo-ultima-hora-de-las-listas-electorales-sanchez-y-feijoo.html"},
  {name:"PP y Vox: en negociación", parties:"PP y Vox", scope:"Senado, en algunas provincias (sin cerrar)", how:"Tras el pacto PSOE–Frente Amplio, PP y Vox estudian que Vox no presente lista al Senado en algunas provincias o que incluya candidatos en las del PP, para no dividir el voto. No hay acuerdo: Vox lo decide en su Comité Ejecutivo del 19 de octubre. Se citan, entre otras, Valencia, Sevilla, Huelva, Badajoz y Cáceres; Vox mantendría lista propia donde tiene más opciones, como Murcia, Almería y Ceuta. Nuestra proyección supone listas separadas.", aim:"Llegar a los tres quintos del Senado (161 de 267), que permiten, entre otras cosas, designar magistrados del Tribunal Constitucional.", src:"https://www.elespanol.com/espana/politica/20261018/vox-dispuesto-demostrar-altura-miras-frente-popular-senado-lunes-decidira-pacta-pp/1003744424775_0.html"},
  {name:"Coalición Existe", parties:"Teruel Existe y Aragón Existe", scope:"Aragón (Congreso y Senado)", how:"Teruel Existe tuvo un diputado y dos senadores en 2019; en 2023 no obtuvo escaño.", src:"https://www.infobae.com/america/agencias/2026/10/17/registradas-en-la-jec-nueve-coaliciones-electorales-dos-para-el-congreso-tres-para-el-senado-y-cuatro-autonomicas/"}
];

/* ---------- Alianzas de la derecha y de otros partidos por comunidad ---------- */
const RIGHT_BY_CCAA = {
  "Navarra":{type:"coal", congreso:[["UPN-PP","UPN 1.º y 4.º; PP 2.º (Sergio Sayas), 3.º y 5.º"]], senado:[["UPN-PP","UPN 1.º y 3.º; PP 2.º"]]},
  "Baleares":{type:"part", congreso:[], senado:[["Sa Unió (Formentera)","PP con Compromís per Formentera"]]}
};
const OTHERS_BY_CCAA = {
  "Canarias":[["CC-Municipalistas Primero","Congreso por Canarias; Senado en todas las islas salvo El Hierro"],["ASG","Senado por La Gomera (Yaiza Castilla)"],["AHI","Senado por El Hierro (Javier Armas)"]],
  "Aragón":[["Coalición Existe","Teruel Existe y Aragón Existe, Congreso y Senado"]],
  "Madrid":[["Democracia21","Miriam González con Ciudadanos y UCIN"]],
  "Cataluña":[["Democracia21","Ciudadanos y UCIN, solo por Barcelona"],["Junts","solo"]],
  "Navarra":[["Geroa Bai","Senado, con el PNV dentro (Anika Luján)"]],
  "País Vasco":[["PNV","solo"]],
  "Galicia":[["BNG","solo"]]
};
const RIGHT_NOTE = "PP y Vox negocian unir fuerzas en el Senado en algunas provincias (que Vox no presente lista o meta candidatos en las del PP), sin acuerdo cerrado: Vox lo decide el 19 de octubre.";

/* ---------- Alianzas de la izquierda por comunidad (Congreso y Senado) ---------- */
const LEFT_BY_CCAA = {
  "Andalucía":{type:"sep", congreso:[["Frente Amplio Por Andalucía","IU, Movimiento Sumar, Iniciativa del Pueblo Andaluz y Verdes Equo"],["Podemos Andalucía","lista propia"],["Adelante Andalucía","lista propia en las 8 provincias"]], senado:[["Senado de Progreso","PSOE + FA; en Sevilla el PSOE pone los 3 candidatos"],["Adelante Andalucía","listas propias"]]},
  "Aragón":{type:"reg", congreso:[["CHA-Frente Amplio Aragón","CHA, IU, Movimiento Sumar, Partido Verde y Recortes Cero"],["Podemos","lista propia"],["Coalición Existe","Teruel Existe y Aragón Existe"]], senado:[["Senado de Progreso","Huesca: PSOE-IU-PSOE; Zaragoza y Teruel: PSOE-CHA-PSOE"],["Coalición Existe",""]]},
  "Asturias":{type:"reg", congreso:[["Frente Amplio","con Somos Asturies"],["Podemos","lista propia"]], senado:[["Senado de Progreso","PSOE + FA"]]},
  "Baleares":{type:"reg", congreso:[["Ara MÉS-Front Ampli","MÉS per Mallorca, Més per Menorca, Ara Eivissa, Sumar e IU"],["Podemos","lista propia"]], senado:[["Mallorca","Acord de Progrés per Mallorca (PSIB, MÉS, Sumar, EU)"],["Ibiza","Juanjo Ferrer (PSOE, Ara Eivissa, IU, Podemos)"],["Formentera","Formentera al Senat (PSOE, Gent per Formentera, Sumar)"],["Menorca","PSOE–Més, sin cerrar"]]},
  "Canarias":{type:"uni", congreso:[["Unidad del Pueblo Canario","NC-Bloque Canarista, Podemos, Movimiento Sumar e IU Canaria"],["Drago Canarias","Alberto Rodríguez (S. C. de Tenerife) y Héctor Morán (Las Palmas)"]], senado:[["Unidad del Pueblo Canario",""],["PSOE","solo, salvo un pacto progresista en La Gomera"]]},
  "Cantabria":{type:"sep", congreso:[["Frente Amplio",""],["Podemos","lista propia"]], senado:[["Senado de Progreso","PSOE + FA"]], note:"El PRC no se presenta."},
  "Castilla-La Mancha":{type:"sep", congreso:[["Frente Amplio",""],["Podemos","lista propia"]], senado:[["Senado de Progreso","en las 5 provincias"]]},
  "Castilla y León":{type:"sep", congreso:[["Frente Amplio",""],["Podemos","lista propia"]], senado:[["Senado de Progreso","en las 9 provincias"]]},
  "Cataluña":{type:"erc", congreso:[["ERC","Gabriel Rufián; Podemos no se presenta y apoya su lista"],["Frente Amplio (Comuns)","Ada Colau y Ernest Urtasun en Barcelona"]], senado:[["ERC-EH Bildu",""],["Comuns-Front Ampli per la democràcia",""],["PSC","solo: no hay Senado de Progreso en Cataluña"]]},
  "C. Valenciana":{type:"uni", congreso:[["Compromís-Front Valencià","Compromís, Podemos, EUPV y ERPV. Valencia: Àgueda Micó; Alicante: María Teresa Pérez (Podemos)"]], senado:[["Senado de Progreso","PSOE + Compromís, IU y Sumar; en Valencia el PSOE pone el 1.º y el 2.º. Alicante y Castellón, pendientes"]], note:"Es la única comunidad donde el Frente Amplio no presenta lista propia al Congreso."},
  "Extremadura":{type:"sep", congreso:[["Frente Amplio",""],["Podemos","lista propia"]], senado:[["Senado de Progreso","el PSOE pone el 1.º y el 2.º en Badajoz y Cáceres"]], note:"Algunas fuentes hablan de repetir la coalición Unidas por Extremadura; no está confirmada."},
  "Galicia":{type:"sep", congreso:[["BNG",""],["Frente Amplio",""],["Podemos","lista propia"]], senado:[["Senado de Progreso","PSdeG 1.º y FA 2.º"],["BNG","solo"]]},
  "Madrid":{type:"sep", congreso:[["Frente Amplio","Emilio Delgado (Más Madrid)"],["Podemos","Irene Montero"]], senado:[["Senado de Progreso","PSOE, Más Madrid, IU y Sumar"]]},
  "Murcia":{type:"sep", congreso:[["Frente Amplio","con IU-Verdes"],["Podemos","lista propia"]], senado:[["Senado de Progreso","PSOE + FA"]]},
  "Navarra":{type:"reg", congreso:[["Frente Amplio","con Batzarre"],["Podemos","lista propia"],["EH Bildu",""],["Geroa Bai",""]], senado:[["Senado de Progreso","PSN + IU y Batzarre"],["ERC-EH Bildu","Floren Aoiz"],["Geroa Bai","fuera del pacto"]]},
  "País Vasco":{type:"sep", congreso:[["EH Bildu","Oskar Matute, Mikel Otero, Oihana Etxebarrieta"],["Frente Amplio","Ezker Anitza-IU, Sumar…"],["Podemos","lista propia"]], senado:[["Senado de Progreso","PSE + FA; en Álava el PSE pone los 3"],["ERC-EH Bildu",""],["PNV","solo"]]},
  "La Rioja":{type:"sep", congreso:[["Frente Amplio","IU"],["Podemos","lista propia"]], senado:[["Senado de Progreso","PSOE + FA"]]},
  "Ceuta":{type:"sep", congreso:[["Frente Amplio y Podemos","sin detalles publicados"]], senado:[["Senado de Progreso","el reparto publicado incluía a Ceuta Ya, que lo niega"]]}
};

/* ---------- Test de afinidad (posiciones documentadas: 1 a favor, 0 matizado, -1 en contra, null sin dato) ---------- */
const STATEMENTS = [
  {q:"El Estado debe prorrogar los alquileres y limitar por ley sus subidas.", basis:"Decretos de vivienda de sept. 2026 (PSOE y Sumar), tumbados el 2 de octubre por PP, Vox y Junts. Podemos pide ir más lejos.", pos:{PSOE:1,FA:1,POD:1,PP:-1,VOX:-1}},
  {q:"Hay que derogar la Ley de Vivienda de 2023 y suprimir las zonas tensionadas.", basis:"Ley de vivienda del PP, admitida a trámite en abril de 2026 con PP, Vox, Junts y UPN a favor y PSOE, Sumar y Podemos en contra.", pos:{PP:1,VOX:1,PSOE:-1,FA:-1,POD:-1}},
  {q:"Comprar la primera vivienda debería pagar muchos menos impuestos.", basis:"Propuestas del PP (rebaja del 60%) y de Vox (eliminarlos). El PSOE solo rebaja el IVA de la vivienda protegida y se abstuvo en parte de la moción del PP.", pos:{PP:1,VOX:1,PSOE:0,FA:null,POD:null}},
  {q:"Las ayudas y la vivienda protegida deben dar prioridad a los españoles.", basis:"Moción de Vox (junio de 2026), rechazada por todos los demás grupos. El PP defiende priorizar por «arraigo», no por nacionalidad.", pos:{VOX:1,PP:0,PSOE:-1,FA:-1,POD:-1}},
  {q:"Es acertado regularizar a los inmigrantes que ya viven y trabajan en España.", basis:"Regularización del Gobierno (2026). Vox la recurre; el PP propone acabar con las regularizaciones generalizadas y un régimen transitorio por puntos.", pos:{PSOE:1,FA:1,POD:1,PP:0,VOX:-1}},
  {q:"Hay que reducir por ley la jornada laboral sin bajar el sueldo.", basis:"La ley de 37,5 h (PSOE y Sumar) fue rechazada en sept. de 2025 con los votos de PP, Vox y Junts. Podemos propone 35 h.", pos:{PSOE:1,FA:1,POD:1,PP:-1,VOX:-1}},
  {q:"Hay que poder desalojar a okupas en 24–48 horas.", basis:"Moción del PP aprobada en sept. de 2026: el PSOE se abstuvo y Sumar votó en contra.", pos:{PP:1,VOX:1,PSOE:0,FA:-1,POD:null}}
];

/* ---------- Encuestas recientes ----------
   d: fecha (fin de campo o publicación según el agregador). seats: escaños publicados por la propia encuestadora. */
const POLLS = [
  {firm:"EM-Analytics", media:"Electomanía (ElectoPanel)", d:"2026-10-18", field:"15–17 oct. · 3.141", PP:31.8,PSOE:27.1,VOX:18.9,FA:4.9,POD:2.0,SALF:1.7, CFV:1.3, ERC:2.1,JUNTS:1.2,BILDU:1.4,PNV:1.0,BNG:1.0,CC:0.3,AA:1.1, seats:"PP 134 · PSOE 111 · Vox 62 · ERC 8 · FA 7 · Compromís 3 · AA 3 · Podemos 1"},
  {firm:"Opina 360", media:"El Plural", d:"2026-10-17", field:"Reestimación de los datos del CIS", out:true, PP:28.0,PSOE:28.0,VOX:17.8,FA:7.3,POD:3.5,SALF:1.6, seats:"PP 119 · PSOE 118 · Vox 67 · Sumar 13 · Podemos 1"},
  {firm:"CIS", media:"Barómetro de octubre", d:"2026-10-14", field:"1–6 oct. · 5.025", PP:22.2,PSOE:34.0,VOX:17.1,FA:6.1,POD:3.1,SALF:1.8, ERC:3.0,JUNTS:1.1,BILDU:1.6,PNV:0.6,BNG:0.9,CC:0.2,UPN:0.1, cis:true},
  {firm:"Ateneo del Dato · reestimación", media:"elDiario.es", d:"2026-10-14", field:"Reestimación de los datos del CIS", out:true, PP:28.2,PSOE:28.6,VOX:17.5,FA:7.9,POD:3.0,SALF:null, seats:"PP 119 · PSOE 116 · Vox 66 · Sumar 15 · Podemos 2"},
  {firm:"GAD3", media:"ABC", d:"2026-10-12", field:"6–8 oct. · 1.077", PP:31.4,PSOE:26.4,VOX:18.2,FA:7.4,POD:2.3,SALF:1.8, ERC:2.6,JUNTS:1.5,BILDU:1.5,PNV:1.0,BNG:0.9,CC:0.4,UPN:0.1,AA:1.0, seats:"PP 133 · PSOE 107 · Vox 65 · Sumar 10 · ERC 10 · Bildu 8 · Podemos 2"},
  {firm:"GESOP", media:"Prensa Ibérica", d:"2026-10-12", field:"6–8 oct. · 1.000", PP:28.7,PSOE:26.1,VOX:18.9,FA:8.0,POD:2.6,SALF:2.0, ERC:2.5,JUNTS:1.9, seats:"PP 121–125 · PSOE 108–112 · Vox 68–72 · FA 14–17 · ERC 9–11 · Podemos 2"},
  {firm:"EM-Analytics", media:"Electomanía (ElectoPanel)", d:"2026-10-11", field:"5–9 oct. · 4.125", PP:31.5,PSOE:26.9,VOX:19.1,FA:4.9,POD:3.4,SALF:1.7, CFV:1.1, ERC:2.0,JUNTS:1.1,BILDU:1.4,PNV:1.1,BNG:1.0,CC:0.3,UPN:0.2,AA:1.1, seats:"PP 131 · PSOE 107 · Vox 67 · Sumar 8 · ERC 8 · Compromís 3 · AA 3 · Podemos 2"},
  {firm:"SocioMétrica", media:"El Español", d:"2026-10-11", field:"10–11 oct. · 1.000", PP:32.6,PSOE:26.2,VOX:18.8,FA:4.9,POD:2.8,SALF:2.1, CFV:0.9, ERC:2.0,JUNTS:1.5,BILDU:1.3,PNV:0.8,BNG:0.9,CC:0.5,UPN:0.2,AA:0.9, seats:"PP 141 · PSOE 104 · Vox 64 · Sumar 5 · Compromís 3 · ERC 8 · Podemos 2"},
  {firm:"Sigma Dos", media:"El Mundo", d:"2026-10-11", field:"1–8 oct. · 2.017", PP:31.9,PSOE:25.3,VOX:19.1,FA:7.6,POD:3.1,SALF:null, ERC:2.6,JUNTS:1.2,BILDU:1.1,PNV:0.9,BNG:0.9,CC:0.5,UPN:0.2,AA:0.8, seats:"PP 135 · PSOE 103 · Vox 68 · Sumar 9 · ERC 9 · Podemos 2 · AA 2"},
  {firm:"Target Point", media:"El Debate", d:"2026-10-11", field:"6–9 oct. · 1.002", PP:32.0,PSOE:25.9,VOX:18.7,FA:6.9,POD:3.4,SALF:1.3, seats:"PP 131–137 · PSOE 102–105 · Vox 62–66 · FA 10 · Podemos 2"},
  {firm:"Hamalgama Métrica", media:"Vozpópuli", d:"2026-10-11", field:"5–8 oct. · 1.000", PP:33.4,PSOE:25.3,VOX:19.6,FA:5.4,POD:3.3,SALF:1.8, ERC:1.9,JUNTS:1.7,BILDU:1.3,PNV:0.9,BNG:0.8,CC:0.5,UPN:0.2, seats:"PP 144 · PSOE 103 · Vox 68 · Sumar 5 · Podemos 2"},
  {firm:"40dB", media:"El País / SER", d:"2026-10-09", field:"7–8 oct. · 800", PP:31.9,PSOE:28.1,VOX:18.9,FA:5.3,POD:2.3,SALF:1.8, seats:"PP 123–140 · PSOE 105–117 · Vox 63–74 · Sumar 5–7 · Podemos 2"},
  {firm:"IMOP Insights", media:"El Confidencial", d:"2026-10-09", field:"5–7 oct. · 900", PP:30.4,PSOE:26.5,VOX:19.0,FA:7.6,POD:2.3,SALF:1.9, seats:"PP 130 · PSOE 110 · Vox 70 · Sumar 11 · Podemos 1"},
  {firm:"DYM", media:"20minutos", d:"2026-10-09", field:"5–7 oct. · 1.011", PP:34.0,PSOE:28.2,VOX:18.2,FA:3.6,POD:2.6,SALF:0.5, seats:"PP 139–143 · PSOE 107–111 · Vox 61–65 · Sumar 3–5 · Podemos 1–2"},
  {firm:"Invymark", media:"laSexta", d:"2026-10-09", PP:32.8,PSOE:28.0,VOX:18.8,FA:6.3,POD:3.2,SALF:1.8, ERC:1.9,JUNTS:1.2,BILDU:1.5,PNV:1.1},
  {firm:"NC Report", media:"La Razón", d:"2026-10-08", field:"1–6 oct. · 1.000", PP:34.1,PSOE:25.0,VOX:18.2,FA:5.3,POD:3.9,SALF:null, ERC:1.8,JUNTS:2.9,BILDU:1.4,PNV:0.9,BNG:0.7,CC:0.4,UPN:0.2, seats:"PP 146–148 · PSOE 98–102 · Vox 61–64 · Junts 10–11 · Sumar 6–8 · Podemos 2–4"},
  {firm:"EM-Analytics", media:"Electomanía", d:"2026-10-03", PP:31.3,PSOE:26.9,VOX:19.4,FA:6.3,POD:3.4,SALF:1.7, ERC:2.0,JUNTS:1.1,BILDU:1.4,PNV:1.1,BNG:1.0,CC:0.3,UPN:0.2,AA:1.1},
  {firm:"SocioMétrica", media:"El Español", d:"2026-10-03", PP:33.4,PSOE:26.5,VOX:18.1,FA:5.3,POD:3.1,SALF:2.2, ERC:2.2,JUNTS:1.2,BILDU:1.3,PNV:1.1,BNG:0.9,CC:0.6,UPN:0.2},
  {firm:"Ateneo del Dato", media:"", d:"2026-10-01", PP:33.2,PSOE:27.5,VOX:19.2,FA:7.0,POD:3.3,SALF:null},
  {firm:"40dB", media:"El País / SER", d:"2026-09-28", PP:31.6,PSOE:27.4,VOX:18.4,FA:5.6,POD:2.7,SALF:2.0},
  {firm:"SocioMétrica", media:"El Español", d:"2026-09-26", PP:33.9,PSOE:25.7,VOX:18.0,FA:5.7,POD:3.3,SALF:2.0, ERC:2.0,JUNTS:1.2,BILDU:1.4,PNV:0.9,BNG:1.0,CC:0.6,UPN:0.2, seats:"PP 145 · PSOE 107 · Vox 62 · Sumar 5"},
  {firm:"Celeste-Tel", media:"Onda Cero", d:"2026-09-21", PP:33.9,PSOE:25.4,VOX:17.8,FA:6.4,POD:3.3,SALF:1.7, ERC:2.0,JUNTS:1.5,BILDU:1.4,PNV:1.1,BNG:0.8,CC:0.5,UPN:0.2},
  {firm:"DYM", media:"Henneo", d:"2026-09-21", PP:34.7,PSOE:26.3,VOX:17.3,FA:4.5,POD:3.7,SALF:1.0, seats:"PP 144–148 · PSOE 102–105 · Vox 58–61 · Sumar 6–7"},
  {firm:"Invymark", media:"laSexta", d:"2026-09-11", PP:33.7,PSOE:26.8,VOX:18.6,FA:6.1,POD:3.3,SALF:1.8},
  {firm:"Target Point", media:"El Debate", d:"2026-09-10", PP:31.5,PSOE:25.6,VOX:18.9,FA:6.9,POD:2.8,SALF:2.5},
  {firm:"Hamalgama Métrica", media:"Vozpópuli", d:"2026-09-08", PP:33.6,PSOE:25.1,VOX:19.3,FA:5.6,POD:3.8,SALF:1.6, ERC:1.9,JUNTS:1.4,BILDU:1.3,PNV:0.9,BNG:0.8,CC:0.5,UPN:0.2},
  {firm:"CIS", media:"Barómetro de septiembre", d:"2026-09-04", PP:25.5,PSOE:31.0,VOX:16.6,FA:5.7,POD:3.7,SALF:1.8, ERC:2.5,JUNTS:0.7,BILDU:1.3,PNV:0.7,BNG:0.7,CC:0.2,UPN:0.1, cis:true},
  {firm:"NC Report", media:"La Razón", d:"2026-09-03", PP:34.5,PSOE:24.9,VOX:18.3,FA:5.7,POD:3.4,SALF:null, ERC:2.0,JUNTS:1.6,BILDU:1.4,PNV:1.0,BNG:0.8,CC:0.4,UPN:0.2},
  {firm:"GAD3", media:"", d:"2026-09-03", PP:31.1,PSOE:26.1,VOX:18.2,FA:7.0,POD:3.1,SALF:1.5, ERC:2.3,JUNTS:1.2,BILDU:1.5,PNV:0.9,BNG:0.9,CC:0.3,UPN:0.2,AA:1.0},
  {firm:"More in Common", media:"", d:"2026-08-28", PP:28.7,PSOE:27.0,VOX:20.3,FA:6.6,POD:3.6,SALF:2.3},
  {firm:"Data10", media:"OKdiario", d:"2026-08-27", PP:34.3,PSOE:25.4,VOX:18.1,FA:6.3,POD:3.6,SALF:null, ERC:2.0,JUNTS:1.4,BILDU:1.4,PNV:0.9,BNG:0.9,CC:0.5,UPN:0.2,AA:0.7, seats:"PP 145 · PSOE 100 · Vox 63 · Sumar 8"},
  {firm:"Sigma Dos", media:"El Mundo", d:"2026-08-26", PP:33.1,PSOE:25.4,VOX:17.9,FA:6.6,POD:2.8,SALF:null, ERC:2.4,JUNTS:1.1,BILDU:1.2,PNV:1.0,BNG:0.8,CC:0.5,UPN:0.2,AA:0.8, seats:"PP 143 · PSOE 101 · Vox 61 · Sumar 10"},
  {firm:"Cluster17", media:"Agenda Pública", d:"2026-08-25", PP:30.1,PSOE:28.1,VOX:16.1,FA:6.1,POD:3.6,SALF:1.7, ERC:2.0,JUNTS:1.6,BILDU:1.3,PNV:1.1}
];
const MINOR_DEFAULTS = {ERC:2.07,JUNTS:1.33,BILDU:1.38,PNV:1.02,BNG:0.87,CC:0.43,UPN:0.2,AA:1.0};

/* Serie 2026 para la evolución (sin CIS). [mes(1-10), PP, PSOE, Vox, Sumar, Podemos, SALF] */
const TREND = [
 [1,32.4,26.1,17.8,8.2,4.6,null],[1,32.1,26.1,20.0,5.8,4.1,1.8],[1,34.4,27.0,16.6,5.0,5.1,0.5],[1,32.1,26.0,19.9,5.6,4.2,1.7],[1,32.2,26.5,17.9,7.2,4.2,1.5],[1,33.7,27.1,16.9,5.2,4.9,0.7],[1,32.6,26.5,19.4,5.2,4.1,1.6],[1,30.0,26.1,19.2,8.0,3.2,1.8],[1,30.0,26.5,17.8,8.3,4.3,1.7],[1,32.5,25.7,17.9,6.5,3.8,2.1],[1,32.3,26.9,19.7,5.0,4.0,1.5],[1,33.5,26.3,17.6,6.1,4.4,null],[1,31.5,27.1,17.9,5.9,3.5,2.1],[1,32.2,26.8,19.8,4.7,4.5,1.5],
 [2,31.9,26.4,18.3,8.4,4.1,null],[2,32.0,26.5,20.1,5.7,3.8,2.2],[2,30.2,27.7,18.8,5.9,3.3,2.3],[2,29.4,27.0,20.3,7.2,3.8,null],[2,31.9,26.5,20.3,5.2,3.8,2.4],[2,30.5,25.8,20.3,6.7,3.7,2.4],[2,32.1,25.0,18.4,7.2,4.2,2.5],[2,33.1,25.9,18.1,6.0,4.3,null],[2,32.0,26.7,20.1,5.7,4.0,2.0],[2,31.6,26.0,19.5,6.6,2.2,2.9],[2,31.8,27.0,19.6,6.0,3.9,1.8],[2,31.2,27.7,18.0,6.4,3.7,1.6],
 [3,32.5,27.7,17.1,7.7,3.5,null],[3,31.6,28.8,19.3,5.4,3.9,1.6],[3,31.7,27.6,18.3,6.9,3.3,2.2],[3,31.1,28.6,18.7,5.8,2.7,1.6],[3,34.6,27.9,15.8,4.9,3.8,0.8],[3,31.9,26.5,18.0,6.6,3.6,2.5],[3,31.1,29.0,19.8,5.1,3.8,1.6],[3,30.7,28.9,20.3,5.1,3.8,1.9],[3,31.0,28.4,19.2,5.2,3.6,1.9],[3,30.5,28.3,19.5,5.0,3.3,1.9],
 [4,32.3,28.4,17.2,6.9,3.5,null],[4,31.3,28.4,17.9,5.7,2.5,2.3],[4,31.7,27.5,18.4,5.6,3.8,2.6],[4,31.1,28.0,17.1,7.7,2.9,1.8],[4,31.9,28.5,18.0,5.9,3.8,2.0],[4,32.4,27.5,17.7,6.5,3.5,1.9],[4,31.8,27.0,16.9,6.6,3.4,2.6],[4,31.5,28.7,18.1,5.7,3.7,1.9],[4,31.2,29.1,18.4,5.8,3.7,1.8],[4,32.8,26.9,18.3,5.8,3.8,null],[4,30.9,28.4,18.3,5.8,1.8,2.2],[4,30.8,29.3,18.7,5.6,3.7,1.8],
 [5,33.9,25.9,17.4,5.7,2.2,2.5],[5,33.1,27.8,17.6,5.5,3.6,1.7],[5,32.2,28.8,18.5,5.8,3.8,1.9],[5,31.2,25.4,18.9,5.3,3.1,2.0],[5,33.1,26.8,17.1,5.9,3.1,1.4],[5,34.7,25.1,17.9,6.3,3.6,null],[5,34.8,27.7,16.0,5.7,3.5,1.1],[5,32.0,29.1,18.5,6.0,3.8,1.8],[5,32.0,28.7,18.3,6.2,3.8,2.0],[5,32.0,29.0,18.2,6.0,3.8,2.0],[5,32.0,28.3,17.9,5.9,3.8,2.0],
 [6,32.0,28.0,17.2,5.8,3.1,2.1],[6,31.2,27.1,18.5,7.6,1.8,1.9],[6,31.3,25.7,17.1,8.2,3.3,2.2],[6,33.5,27.3,17.5,5.7,3.5,1.7],[6,33.0,26.8,18.2,5.9,3.6,1.8],[6,33.0,27.1,18.1,5.9,3.6,1.8],[6,32.0,25.6,18.1,7.2,3.2,2.2],[6,32.8,27.7,18.2,5.9,3.6,1.8],[6,32.6,26.4,17.2,7.0,3.4,null],[6,32.4,28.2,18.3,5.9,3.6,1.9],[6,32.4,27.7,17.4,6.2,2.3,2.1],
 [7,32.5,27.0,18.3,5.9,3.5,2.0],[7,34.9,27.0,16.5,3.8,4.1,1.0],[7,32.8,26.1,17.3,7.4,3.0,null],[7,32.5,26.3,17.8,6.6,3.6,1.5],[7,32.1,26.1,17.6,6.1,2.7,2.4],[7,32.5,27.5,18.3,6.1,3.3,2.0],[7,32.8,27.1,18.5,6.0,3.5,1.8],[7,29.5,27.0,19.2,7.2,3.7,1.6],[7,29.4,26.5,17.8,7.7,4.0,2.0],[7,33.8,25.9,18.8,5.9,3.8,1.6],[7,33.6,25.7,16.9,6.0,2.8,2.2],[7,33.0,27.1,18.3,5.9,3.6,1.8],[7,34.5,25.0,17.8,6.1,3.6,null],
 [8,32.3,25.7,19.0,6.4,3.6,2.0],[8,34.3,25.4,18.1,6.3,3.6,null],[8,33.1,25.4,17.9,6.6,2.8,null],[8,30.1,28.1,16.1,6.1,3.6,1.7],[8,32.0,26.1,19.0,6.4,3.5,2.0],[8,31.8,26.2,19.2,6.5,3.7,1.8],[8,32.1,26.2,19.1,6.2,3.9,1.9],[8,33.8,26.0,17.0,5.9,2.7,2.3],[8,34.2,25.2,18.0,5.9,3.5,null],[8,32.5,27.2,18.6,5.9,3.7,2.0],[8,28.7,27.0,20.3,6.6,3.6,2.3],
 [9,31.1,26.1,18.2,7.0,3.1,1.5],[9,34.5,24.9,18.3,5.7,3.4,null],[9,33.6,25.1,19.3,5.6,3.8,1.6],[9,31.5,25.6,18.9,6.9,2.8,2.5],[9,33.7,26.8,18.6,6.1,3.3,1.8],[9,34.7,26.3,17.3,4.5,3.7,1.0],[9,33.9,25.4,17.8,6.4,3.3,1.7],[9,33.9,25.7,18.0,5.7,3.3,2.0],[9,31.6,27.4,18.4,5.6,2.7,2.0],
 [10,33.2,27.5,19.2,7.0,3.3,null],[10,33.4,26.5,18.1,5.3,3.1,2.2],[10,31.3,26.9,19.4,6.3,3.4,1.7],
 [10,34.1,25.0,18.2,5.3,3.9,null],[10,32.8,28.0,18.8,6.3,3.2,1.8],[10,31.9,28.1,18.9,5.3,2.3,1.8],[10,30.4,26.5,19.0,7.6,2.3,1.9],[10,34.0,28.2,18.2,3.6,2.6,0.5],[10,33.4,25.3,19.6,5.4,3.3,1.8],[10,31.9,25.3,19.1,7.6,3.1,null],[10,32.0,25.9,18.7,6.9,3.4,1.3],[10,32.6,26.2,18.8,5.8,2.8,2.1],[10,31.5,26.9,19.1,6.0,3.4,1.7],[10,31.4,26.4,18.2,7.4,2.3,1.8],[10,28.7,26.1,18.9,8.0,2.6,2.0],[10,31.8,27.1,18.9,6.2,2.0,1.7]
];

/* ---------- Calendario (RD 806/2026 y LOREG) ---------- */
const CALENDAR = [
  {d:"2026-10-05", t:"Sánchez anuncia la disolución de las Cortes", k:"hecho"},
  {d:"2026-10-06", t:"El BOE publica el Real Decreto 806/2026 de convocatoria", k:"hecho"},
  {d:"2026-10-14", t:"Primarias abiertas de Podemos (14–15 oct.): Irene Montero, candidata con el 90%", k:"hecho"},
  {d:"2026-10-16", t:"Cierre del plazo de coaliciones: nueve registradas, sin acuerdo entre Frente Amplio y Podemos", k:"hecho"},
  {d:"2026-10-17", t:"Presentación del Frente Amplio con Ada Colau; el PSOE proclama a Sánchez candidato", k:"hecho"},
  {d:"2026-10-20", t:"ERC aprueba sus listas al Congreso y al Senado", k:"partidos"},
  {d:"2026-10-21", t:"Se abre la presentación de candidaturas", k:"plazo"},
  {d:"2026-10-26", t:"Último día para presentar las listas", k:"plazo"},
  {d:"2026-11-02", t:"La Junta Electoral publica las candidaturas proclamadas", k:"plazo"},
  {d:"2026-11-13", t:"Empieza la campaña electoral (00:00 h)", k:"plazo"},
  {d:"2026-11-16", t:"Cara a cara Sánchez–Feijóo en Mediaset (aceptado por el PP)", k:"debate"},
  {d:"2026-11-19", t:"Último día para solicitar el voto por correo", k:"votante"},
  {d:"2026-11-23", t:"Último día en que pueden publicarse encuestas", k:"plazo"},
  {d:"2026-11-23", t:"Debate de portavoces en RTVE (propuesto)", k:"debate"},
  {d:"2026-11-25", t:"Último día para depositar el voto por correo en Correos", k:"votante"},
  {d:"2026-11-26", t:"Debate a varios en Atresmedia (propuesto; el PP lo acepta)", k:"debate"},
  {d:"2026-11-27", t:"Termina la campaña (24:00 h)", k:"plazo"},
  {d:"2026-11-28", t:"Jornada de reflexión", k:"plazo"},
  {d:"2026-11-29", t:"Elecciones generales: Congreso y Senado", k:"votante"},
  {d:"2026-12-23", t:"Sesión constitutiva de las nuevas Cortes (10:00 h)", k:"plazo"}
];

/* ---------- Novedades desde la versión anterior (9 oct.) ---------- */
const NEWS = [
  ["18 oct.","Último ElectoPanel: PP 134 escaños, PSOE 111 y Vox 62; Podemos baja al 2% y el Frente Amplio, a 7 escaños."],
  ["17 oct.","UPN y PP cierran su coalición en Navarra para el Congreso y el Senado. PP y Vox negocian unir listas al Senado en algunas provincias; Vox lo decide el 19 de octubre."],
  ["17 oct.","PSOE y Frente Amplio pactan listas conjuntas al Senado («Senado de Progreso») en toda España salvo Cataluña, Baleares y Canarias, para disputar al PP la mayoría absoluta."],
  ["17 oct.","Ada Colau es proclamada candidata del Frente Amplio a la Presidencia; Emilio Delgado encabeza la lista por Madrid. El PSOE proclama a Sánchez por unanimidad."],
  ["16 oct.","Cierre de coaliciones: Frente Amplio y Podemos van por separado. Podemos apoya a ERC en Cataluña y va en coalición en la C. Valenciana (Compromís-Front Valencià) y en Canarias (Unidad del Pueblo Canario)."],
  ["16 oct.","Irene Montero gana las primarias de Podemos con el 90% y será cabeza de lista por Madrid."],
  ["16 oct.","Dimite la portavoz del PSOE, Montse Mínguez, por los negocios inmobiliarios de su pareja. La sustituye Rebeca Torró."],
  ["14 oct.","El CIS de octubre sitúa al PSOE primero (34%) y al PP en el 22,2%. Dos reestimaciones de sus datos (Ateneo del Dato y Opina 360) los dejan empatados en torno al 28%. El resto de encuestas mantiene al PP en cabeza."],
  ["8–12 oct.","Oleada de doce encuestas tras la convocatoria: todas las que publican escaños dan a PP y Vox más de 176."],
  ["11 oct.","Abascal fija los ejes de Vox para el 29-N: remigración, desregulación y prioridad nacional."],
  ["10 oct.","Arranque de precampaña: Feijóo en Ifema con el lema «Por fin» y Sánchez en Dos Hermanas, con la vivienda como eje. Miriam González presenta Democracia21."],
  ["9 oct.","El PP acepta tres debates: cara a cara en Mediaset (16 nov.), portavoces en RTVE (23 nov.) y debate a varios en Atresmedia (26 nov.)."],
  ["5 oct.","Aliança Catalana confirma que no se presentará a las generales."]
];


const CONTEXT = [
  ["23 jul. 2023","Elecciones generales: PP 137 escaños, PSOE 121. Sánchez es investido en noviembre con 179 votos (PSOE, Sumar, ERC, Junts, Bildu, PNV, BNG y CC)."],
  ["Oct. 2025","Junts retira su apoyo al Gobierno. Desde entonces cada votación depende de acuerdos puntuales y no hay Presupuestos para 2026."],
  ["Dic. 2025 – may. 2026","Elecciones autonómicas en Extremadura, Aragón, Castilla y León y Andalucía. El PP gana y gobierna con Vox en las cuatro comunidades."],
  ["Verano 2026","Las encuestas recogen la crisis de Ceuta: PP y Vox superan juntos el 50% de estimación en varios sondeos."],
  ["23 sep. 2026","Desahucio de Maricarmen, de 87 años, en Madrid. Siguen protestas masivas por la vivienda."],
  ["2 oct. 2026","El Congreso tumba los dos decretos de vivienda del Gobierno con los votos de PP, Vox y Junts."],
  ["5–6 oct. 2026","Sánchez convoca elecciones para el 29 de noviembre y el Gobierno vuelve a aprobar los decretos, ahora con un fondo de 10.000 millones para la primera compra."],
  ["16–17 oct. 2026","Cierre de coaliciones sin unidad entre Frente Amplio y Podemos. Colau, candidata del Frente Amplio; Montero, de Podemos."]
];

const SOURCES = [
  ["Calendario electoral (Diario de Avisos)","https://diariodeavisos.elespanol.com/2026/10/elecciones-voto-por-correo/"],
  ["Reparto de escaños del RD 806/2026 (Artículo14)","https://www.articulo14.es/espana-por-la-igualdad/estas-son-las-provincias-que-ganan-escanos-y-las-que-pierden-de-cara-a-las-elecciones-del-29-n-20261006.html"],
  ["Encuestas recientes (PolitPro)","https://politpro.eu/en/spain"],
  ["Encuestas recientes (Bundestagwahlumfrage.de)","https://bundestagwahlumfrage.de/spanien/umfragen/"],
  ["Serie de encuestas 2026 (Wikipedia)","https://en.wikipedia.org/wiki/Opinion_polling_for_the_next_Spanish_general_election"],
  ["Escaños publicados por SocioMétrica y DYM (Diario de Avisos)","https://diariodeavisos.elespanol.com/2026/10/sondeos-elecciones-canarias/"],
  ["Resultados de 2023 por provincia (Wikipedia)","https://en.wikipedia.org/wiki/Results_breakdown_of_the_2023_Spanish_general_election_(Congress)"],
  ["Convocatoria y contexto (Semanario Universidad / EFE)","https://semanariouniversidad.com/?p=394276"],
  ["Decretos de vivienda (idealista)","https://www.idealista.com/news/finanzas/economia/2026/09/29/916383-el-gobierno-acuerda-proteger-los-desahucios-hasta-2030-y-prohibir-la-compra-por-fondos"],
  ["Coaliciones registradas ante la JEC (El Debate, 17 oct.)","https://www.eldebate.com/espana/20261017/nueve-coaliciones-registran-ante-junta-electoral-elecciones-29n_470781.html"],
  ["Listas a la izquierda del PSOE por comunidad (Infobae, 17 oct.)","https://www.infobae.com/espana/2026/10/17/asi-quedan-los-acuerdos-de-la-izquierda-para-las-elecciones-generales-del-29-n-estas-son-las-listas-a-la-izquierda-del-psoe-en-cada-comunidad-autonoma/"],
  ["Encuestas de octubre (elecciones29noviembre.com)","https://elecciones29noviembre.com/encuestas/"],
  ["Barómetro del CIS de octubre (Electomanía)","https://electomania.es/barometro-del-cis-oct26-la-izquierda-se-dispara-con-el-psoe-en-el-34/"],
  ["Debates del 29-N (Infobae, 9 oct.)","https://www.infobae.com/espana/2026/10/09/los-tres-debates-de-las-elecciones-generales-del-29n-ya-tienen-fecha-y-el-ultimo-se-celebrara-tres-dias-antes-de-los-comicios/"],
  ["Aliança Catalana no se presenta (Ara, 5 oct.)","https://es.ara.cat/politica/alianca-catalana-no-presenta-elecciones-espanolas_1_5870081.html"],
  ["Democracia21 (El Español, 10 oct.)","https://www.elespanol.com/espana/20261010/democracia-presenta-elecciones-madrid-barcelona-liderados-miriam-gonzalez/1003744416434_0.html"],
  ["Senado de Progreso: reparto de puestos (Nuevatribuna, 17 oct.)","https://www.nuevatribuna.es/articulo/actualidad/senadoras-senadores-democracia-celebra-que-hayan-conseguido-listas-unitarias-izquierda-senado/20261017090815255307.html"],
  ["Cómo concurre la izquierda en cada circunscripción (Público)","https://www.publico.es/politica/partidos/concurre-izquierda-elecciones-cada-circunscripcion.html"],
  ["Formentera, nueva circunscripción del Senado (Iberley)","https://www.iberley.es/noticias/entra-vigor-reforma-art-69-3-ce-36485"],
  ["Senadores designados por las comunidades (senado.es)","https://www.senado.es/web/composicionorganizacion/senadores/composicionsenado/consultaprocedenciageografica/designados/index.html"],
  ["Designados por partido (Europa Press/Infobae, 10 oct.)","https://www.infobae.com/espana/agencias/2026/10/10/el-senado-ya-tiene-casi-60-escanos-asignados-al-margen-de-las-elecciones-23-para-el-pp-y-19-para-el-psoe/"],
  ["Resultados del Senado 2023 (Última Hora)","https://www.ultimahora.es/elecciones/23j/senado/total-estatal.html"],
  ["PP y Vox ante el Senado (El Español, 18 oct.)","https://www.elespanol.com/espana/politica/20261018/vox-dispuesto-demostrar-altura-miras-frente-popular-senado-lunes-decidira-pacta-pp/1003744424775_0.html"],
  ["Coalición UPN-PP (Artículo14, 13 oct.)","https://www.articulo14.es/espana-por-la-igualdad/principio-de-acuerdo-entre-pp-y-upn-para-ir-en-coalicion-a-las-elecciones-del-29n-20261013.html"]
];

if (typeof module !== "undefined") module.exports = {POLLS, TREND, PARTIES, MINOR_DEFAULTS, STATEMENTS};
