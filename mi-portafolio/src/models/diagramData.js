// src/data/diagramData.js
// Datos para LayerDiagram — Figura 1 (AI General) y Figura 2 (Banco Digital)

// ══════════════════════════════════════════════════════════════
// FIGURA 1 — AI General
// ══════════════════════════════════════════════════════════════
export const LAYERS_AI = [
  {
    id: "l1",
    label: "Capa 1 · UI visible",
    labelColor: "#38bdf8",
    nodes: [
      { id:"inicio",  theme:"blue",   title:"Inicio / UI",     sub:"Pantalla principal · hero · CTAs" },
      { id:"nav",     theme:"blue",   title:"Navegación",      sub:"Menús · rutas · flujos" },
      { id:"labels",  theme:"blue",   title:"Etiquetado",      sub:"Títulos · términos · UI copy" },
      { id:"search",  theme:"blue",   title:"Búsqueda",        sub:"Filtros · resultados" },
    ],
  },
  {
    id: "l2",
    label: "Capa 2 · Sistemas de soporte",
    labelColor: "#34d399",
    nodes: [
      { id:"tax",     theme:"green",  title:"Taxonomías",      sub:"Categorías · jerarquías" },
      { id:"content", theme:"purple", title:"Modelo contenido",sub:"Tipos · atributos · relaciones" },
      { id:"meta",    theme:"green",  title:"Metadatos",       sub:"Atributos · etiquetas" },
    ],
  },
  {
    id: "l3",
    label: "Capa 3 · Estrategia e investigación",
    labelColor: "#fb923c",
    nodes: [
      { id:"research",theme:"pink",   title:"Research",        sub:"Card sorting · tree testing" },
      { id:"strategy",theme:"amber",  title:"Estrategia",      sub:"Objetivos negocio · usuario" },
      { id:"audit",   theme:"pink",   title:"Auditoría",       sub:"Inventario de contenido" },
    ],
  },
];

export const LEGEND_AI = [
  { c:"#38bdf8", l:"Visible al usuario" },
  { c:"#34d399", l:"Sistemas de soporte" },
  { c:"#a78bfa", l:"Modelo de contenido" },
  { c:"#fb923c", l:"Estrategia" },
  { c:"#f472b6", l:"Investigación" },
];

export const INFO_AI = {
  inicio:   { badge:"Capa visible",        hex:"#38bdf8", title:"Inicio / Interfaz de Usuario",  body:"Es lo primero que el usuario ve. Pero es solo el resultado de toda la arquitectura que hay debajo. Si la AI está rota, la mejor UI no puede salvarlo.", chips:["Pantalla principal","Hero section","CTAs visibles","Layout","Componentes UI"] },
  nav:      { badge:"Capa visible",        hex:"#38bdf8", title:"Sistema de Navegación",         body:"Define cómo los usuarios se mueven por el espacio de información. Una mala navegación es señal directa de una AI deficiente: los usuarios no saben dónde están ni cómo llegar.", chips:["Nav global","Breadcrumbs","Sidebar","Footer nav","Contextual links"] },
  labels:   { badge:"Capa visible",        hex:"#38bdf8", title:"Sistema de Etiquetado",         body:"Las palabras en la interfaz. El gap entre el lenguaje del sistema y el del usuario es la fuente de confusión más frecuente y menos detectada en cualquier producto.", chips:["Títulos de sección","Labels de botones","Términos de menú","Tooltips","Microcopy"] },
  search:   { badge:"Capa visible",        hex:"#38bdf8", title:"Sistema de Búsqueda",           body:"Cuando el usuario no navega, busca. La calidad del buscador depende directamente de qué tan bien están estructurados los metadatos y la taxonomía.", chips:["Barra de búsqueda","Filtros facetados","Autocompletado","Resultados paginados"] },
  tax:      { badge:"Sistemas de soporte", hex:"#34d399", title:"Taxonomías y Ontologías",       body:'Una taxonomía es un sistema de clasificación jerárquico. Una ontología define las relaciones entre conceptos. Ejemplo: "Zapatos para correr" relaciona con "deporte".', chips:["Árbol de categorías","Vocabulario controlado","Relaciones semánticas","Facetas"] },
  content:  { badge:"Modelo de contenido", hex:"#a78bfa", title:"Modelo de Contenido",           body:"Define los tipos de contenido, sus atributos y las relaciones entre ellos. Es el plano estructural del CMS. Sin él, el contenido es caótico.", chips:["Tipos de contenido","Atributos / campos","Relaciones entre tipos","Content types"] },
  meta:     { badge:"Sistemas de soporte", hex:"#34d399", title:"Metadatos",                     body:"Datos sobre los datos. El usuario nunca los ve directamente, pero determinan si el contenido puede encontrarse, filtrarse e indexarse.", chips:["Título, descripción","Tags / etiquetas","Fecha, autor","Schema.org","Open Graph"] },
  research: { badge:"Investigación",       hex:"#f472b6", title:"Research de Usuarios",          body:"Antes de organizar información, hay que entender cómo el usuario categoriza el mundo. Card sorting y tree testing revelan el modelo mental real.", chips:["Card sorting abierto","Card sorting cerrado","Tree testing","First-click testing","Entrevistas"] },
  strategy: { badge:"Capa estratégica",    hex:"#fb923c", title:"Estrategia de Contenido",       body:"La capa más profunda. Define qué contenido existirá, para quién y con qué objetivo. Conecta los objetivos del negocio con las necesidades reales del usuario.", chips:["Objetivos de negocio","Necesidades usuario","Matriz de contenido","Principios editoriales"] },
  audit:    { badge:"Investigación",       hex:"#f472b6", title:"Auditoría de Contenido",        body:"Antes de diseñar cualquier estructura nueva, hay que entender qué contenido ya existe. Una auditoría mapea todo el contenido actual: qué hay, en qué estado está.", chips:["Inventario de URLs","Calidad de contenido","Duplicados","Gaps de contenido","Mapa actual"] },
};

// ══════════════════════════════════════════════════════════════
// FIGURA 2 — Banco Digital
// ══════════════════════════════════════════════════════════════
export const LAYERS_BANK = [
  {
    id: "b1",
    label: "Capa 1 · Interfaz de usuario",
    labelColor: "#38bdf8",
    nodes: [
      { id:"bk-web",     theme:"blue", title:"Banca Web",          sub:"Portal · estados · comprobantes" },
      { id:"bk-app",     theme:"blue", title:"App · Banca digital", sub:"Dashboard · saldos · transferencias" },
      { id:"bk-canales", theme:"pink", title:"Canales",             sub:"ATM · sucursal · USSD · Bot" },
    ],
  },
  {
    id: "b2",
    label: "Capa 2 · Productos financieros",
    labelColor: "#a78bfa",
    nodes: [
      { id:"bk-cuentas",    theme:"purple", title:"Cuentas",     sub:"Corriente · ahorro · plazo" },
      { id:"bk-tarjetas",   theme:"purple", title:"Tarjetas",    sub:"Débito · crédito · prepago" },
      { id:"bk-creditos",   theme:"purple", title:"Créditos",    sub:"Personal · hipoteca · auto" },
      { id:"bk-inversiones",theme:"purple", title:"Inversiones", sub:"Fondos · CETES · seguros" },
    ],
  },
  {
    id: "b3",
    label: "Capa 3 · Servicios de soporte",
    labelColor: "#34d399",
    nodes: [
      { id:"bk-tax",       theme:"green", title:"Taxonomía fin.",     sub:"Tipo · riesgo · plazo" },
      { id:"bk-perfil",    theme:"green", title:"Perfil usuario",     sub:"Natural · empresa · segmentos" },
      { id:"bk-meta-trans",theme:"green", title:"Metadatos transacc.",sub:"Categoría · comercio · estado" },
    ],
  },
  {
    id: "b4",
    label: "Capa 4 · Estrategia y cumplimiento",
    labelColor: "#fb923c",
    nodes: [
      { id:"bk-reg",      theme:"amber", title:"Regulación",    sub:"CNBV · KYC · AML" },
      { id:"bk-strategy", theme:"amber", title:"Estrategia UX", sub:"Research · modelos mentales" },
      { id:"bk-core",     theme:"amber", title:"Core bancario", sub:"CBS · APIs · pasarela" },
    ],
  },
];

export const LEGEND_BANK = [
  { c:"#38bdf8", l:"App / Web" },
  { c:"#f472b6", l:"Canales alt." },
  { c:"#a78bfa", l:"Productos financieros" },
  { c:"#34d399", l:"Servicios de soporte" },
  { c:"#fb923c", l:"Estrategia · cumplimiento" },
];

export const INFO_BANK = {
  "bk-app":         { badge:"Interfaz visible",          hex:"#38bdf8", title:"App / Banca digital",       body:"La pantalla que el usuario abre cada mañana. Detrás hay una taxonomía de productos, metadatos transaccionales y un modelo de contenido que determina qué mostrar, cuándo y a quién.", chips:["Dashboard principal","Saldos y movimientos","Transferencias","Notificaciones push"] },
  "bk-web":         { badge:"Interfaz visible",          hex:"#38bdf8", title:"Banca Web",                  body:"El portal web suele tener más funciones que el app. Su AI debe ser consistente con el app en etiquetas y estructura, aunque el contexto de uso sea diferente.", chips:["Portal empresas","Estados de cuenta","Gestión de beneficiarios","Descarga de comprobantes"] },
  "bk-canales":     { badge:"Canales alternativos",      hex:"#f472b6", title:"Canales alternativos",       body:"ATM, sucursal física, banca por teléfono, WhatsApp Banking. Cada canal tiene sus limitaciones pero deben compartir la misma AI base para no confundir al usuario.", chips:["ATM / cajero","Sucursal física","USSD / SMS banking","Banca telefónica","WhatsApp Bot"] },
  "bk-cuentas":     { badge:"Productos financieros",     hex:"#a78bfa", title:"Cuentas",                    body:"La taxonomía de cuentas es crítica. El usuario no distingue entre ellas técnicamente, pero la AI debe presentarlas con etiquetas que reflejen su propósito real.", chips:["Cuenta corriente","Cuenta de ahorro","Cuenta nómina","Cuenta en divisas"] },
  "bk-tarjetas":    { badge:"Productos financieros",     hex:"#a78bfa", title:"Tarjetas",                   body:"Débito, crédito, prepago, virtual, empresarial. Cada tipo tiene atributos distintos. El modelo de contenido debe contemplar todos estos atributos para presentarlos correctamente.", chips:["Tarjeta débito","Tarjeta crédito","Tarjeta prepago","Tarjeta virtual","Gestión de NIP"] },
  "bk-creditos":    { badge:"Productos financieros",     hex:"#a78bfa", title:"Créditos y Préstamos",       body:'El crédito es el producto con mayor carga emocional y regulatoria. Los términos "CAT", "tasa nominal", "tasa efectiva" deben explicarse en el contexto preciso donde aparecen.', chips:["Crédito personal","Hipoteca","Crédito automotriz","Simulador de crédito"] },
  "bk-inversiones": { badge:"Productos financieros",     hex:"#a78bfa", title:"Inversiones y Seguros",      body:"Fondos, CETES, seguros, afore. Alta complejidad conceptual y riesgo regulatorio. La AI debe clasificarlos por perfil de riesgo y presentar la información en lenguaje accesible.", chips:["Fondos de inversión","CETES directo","Seguros de vida","Afore","Perfil de riesgo"] },
  "bk-tax":         { badge:"Servicios de soporte",      hex:"#34d399", title:"Taxonomía financiera",       body:"Clasifica todos los productos del banco: por tipo, plazo, riesgo, moneda, segmento. Esta taxonomía alimenta los filtros de búsqueda y las recomendaciones personalizadas.", chips:["Clasificación por tipo","Por riesgo","Por plazo","Vocabulario controlado"] },
  "bk-perfil":      { badge:"Servicios de soporte",      hex:"#34d399", title:"Perfil de Usuario",          body:"La AI bancaria debe adaptarse a perfiles radicalmente distintos: un joven con su primera cuenta, una PyME que gestiona nómina, un jubilado que revisa pensión.", chips:["Persona natural","Empresa / PyME","Segmento premium","Segmento joven","Adulto mayor"] },
  "bk-meta-trans":  { badge:"Servicios de soporte",      hex:"#34d399", title:"Metadatos transaccionales",  body:"Cada transacción tiene metadatos: comercio, categoría de gasto, fecha, canal, estado. Estos permiten mostrar gráficas de hábitos de consumo y alertas inteligentes.", chips:["Categoría de gasto","Comercio / receptor","Canal de origen","Estado de transacción"] },
  "bk-reg":         { badge:"Estrategia y cumplimiento", hex:"#fb923c", title:"Regulación y Compliance",    body:"CNBV, CONDUSEF, KYC y AML determinan qué información debe recopilarse obligatoriamente, con qué etiquetas, en qué momento del flujo y cómo almacenarse.", chips:["KYC (identidad)","AML (lavado de dinero)","Consentimiento informado","Divulgación de CAT"] },
  "bk-strategy":    { badge:"Estrategia y cumplimiento", hex:"#fb923c", title:"Estrategia UX Bancaria",     body:"El research que define modelos mentales de cada segmento, flujos de onboarding, momentos de fricción crítica. Conecta la regulación con la experiencia humana.", chips:["Modelos mentales","Flujo de onboarding","Card sorting financiero","Journey map"] },
  "bk-core":        { badge:"Estrategia y cumplimiento", hex:"#fb923c", title:"Core Bancario y APIs",       body:"El CBS (Core Banking System) es la fuente de verdad: saldos, transacciones, límites, tasas. Si el CBS devuelve datos con nombres técnicos, la AI debe traducirlos antes de mostrarlos.", chips:["Core Banking System","Open Banking APIs","Pasarela de pagos","Sistema de alertas"] },
};