// src/models/components.data.js
// 3 componentes de ejemplo — reemplazar imágenes con URLs reales de R2

export const COMPONENTS_DATA = [

  // ── 1. Resistencia de Carbón ─────────────────────────────────────────────
  {
    id:           'resistencia-carbon-10k',
    nombre:       'Resistencia de Carbón 10kΩ',
    imagen:       'https://assets.mauricionoj.com/components/resistencia-carbon.jpg',
    categoria:    'pasivos',
    subcategoria: 'Resistencias de carbón',
    tags:         ['pasivo', 'resistencia', 'through-hole', 'carbón'],

    descripcion: 'Resistencia de película de carbón de uso general. Componente fundamental en cualquier circuito electrónico para limitar corriente y dividir tensiones. Ampliamente utilizada por su bajo costo y disponibilidad universal.',

    specs: {
      'Resistencia':       '10 kΩ',
      'Tolerancia':        '±5%',
      'Potencia':          '0.25 W (1/4 W)',
      'Voltaje máx.':      '250 V',
      'Coef. temperatura': '±200 ppm/°C',
      'Encapsulado':       'Through-hole (axial)',
      'Temperatura op.':   '-55°C a +155°C',
    },

    datasheet_url:  'https://assets.mauricionoj.com/components/datasheets/resistencia-carbon.pdf',
    precio_aprox:   'Q0.25 / $0.03',
    proyectos:      ['multimetro-diy', 'amplificador-audio'],

    formula_quimica:  'C (grafito) + SiO₂ (ligante cerámico)',
    composicion:      'Película de grafito depositada sobre substrato cerámico de alúmina (Al₂O₃), encapsulada en epoxi fenólico.',

    toxicidad:        'BAJO',
    toxicidad_notas:  'El grafito es relativamente inerte. El epoxi fenólico puede liberar compuestos orgánicos volátiles si se incinera incorrectamente.',

    origen_material:      'Grafito extraído principalmente de China y Madagascar. Alúmina derivada de bauxita (Australia, Guinea).',
    huella_carbono:       1.8,
    reciclabilidad:       40,
    conflicto_minerales:  false,
    conflicto_detalle:    '',
    alternativa_verde:    'Resistencia de película metálica (±1% tolerancia, menor ruido térmico, mayor estabilidad).',
    vida_util:            '25+ años en condiciones normales de operación.',
    disposicion:          'Reciclaje electrónico certificado. No desechar en basura doméstica. El substrato cerámico es inerte pero el epoxi requiere manejo especial.',

    rohs:   true,
    reach:  true,
    weee:   true,

    punto_conexion: 'La energía que "desperdicia" una resistencia no desaparece — se convierte en calor. En escala macro, millones de resistencias operando simultáneamente en centros de datos generan cargas térmicas que requieren sistemas de enfriamiento energéticamente costosos. Desde la ingeniería ambiental, optimizar la resistencia correcta no es solo eficiencia eléctrica: es reducir la demanda energética total del sistema.',
  },

  // ── 2. Capacitor Electrolítico 100µF ─────────────────────────────────────
  {
    id:           'capacitor-electrolitico-100uf',
    nombre:       'Capacitor Electrolítico 100µF / 25V',
    imagen:       'https://assets.mauricionoj.com/components/Capacitor_.png',
    categoria:    'pasivos',
    subcategoria: 'Capacitores electrolíticos',
    tags:         ['pasivo', 'capacitor', 'electrolítico', 'aluminio', 'through-hole'],

    descripcion: 'Capacitor electrolítico de aluminio polarizado. Usado en filtrado de fuentes de poder, desacoplamiento de señales y almacenamiento temporal de energía. Componente crítico en prácticamente toda fuente de alimentación.',

    specs: {
      'Capacitancia':      '100 µF',
      'Voltaje':           '25 V',
      'Tolerancia':        '-20% / +20%',
      'ESR':               '≤ 0.9 Ω',
      'Temperatura op.':   '-40°C a +85°C',
      'Vida útil':         '2,000 horas a 85°C',
      'Encapsulado':       'Through-hole (radial)',
      'Dimensiones':       'Ø8 × 11.5 mm',
    },

    datasheet_url:  'https://assets.mauricionoj.com/components/datasheets/capacitor-electrolitico.pdf',
    precio_aprox:   'Q0.75 / $0.10',
    proyectos:      ['fuente-poder-5v', 'amplificador-audio', 'rpi5-hat'],

    formula_quimica:  'Al₂O₃ (dieléctrico) + C₂H₅OH / H₂O (electrolito acuoso)',
    composicion:      'Láminas de aluminio grabado con óxido de aluminio como dieléctrico, electrolito líquido base etanol/agua, encapsulado en aluminio con sello de goma.',

    toxicidad:        'MEDIO',
    toxicidad_notas:  'El electrolito líquido puede contener solventes orgánicos. En caso de ruptura o sobrecalentamiento libera vapores irritantes. El electrolito viejo puede contener trazas de ácido bórico.',

    origen_material:      'Aluminio primario de bauxita (Australia, Brasil, Guinea). Proceso electrolítico de alta intensidad energética — uno de los metales más costosos de producir en términos energéticos.',
    huella_carbono:       8.5,
    reciclabilidad:       65,
    conflicto_minerales:  false,
    conflicto_detalle:    '',
    alternativa_verde:    'Capacitor de polímero sólido (menor ESR, mayor vida útil, sin electrolito líquido). Capacitor cerámico MLCC para valores bajos de capacitancia.',
    vida_util:            '2,000–5,000 horas a temperatura máxima. 15–20 años en condiciones normales (25°C).',
    disposicion:          'Reciclaje de aluminio. No perforar ni incinerar — el electrolito puede liberar vapores tóxicos. Entregar a centros de reciclaje electrónico certificados.',

    rohs:   true,
    reach:  false,
    weee:   true,

    punto_conexion: 'La producción de aluminio es uno de los procesos industriales más intensivos en energía del mundo, consumiendo aproximadamente 15 kWh por kilogramo. Un capacitor electrolítico contiene menos de 1g de aluminio, pero la industria electrónica global consume millones de toneladas anuales. Como ingeniero ambiental y electrónico, la decisión de usar un capacitor cerámico en lugar de electrolítico cuando la aplicación lo permite no es menor: reduce huella de carbono, elimina riesgos de derrame de electrolito y extiende la vida útil del circuito.',
  },

  // ── 3. Sensor DHT22 ──────────────────────────────────────────────────────
  {
    id:           'sensor-dht22',
    nombre:       'Sensor DHT22 — Temperatura y Humedad',
    imagen:       'https://assets.mauricionoj.com/components/dht22.jpg',
    categoria:    'sensores',
    subcategoria: 'Sensores ambientales',
    tags:         ['sensor', 'temperatura', 'humedad', 'digital', 'ambiental', 'IoT'],

    descripcion: 'Sensor digital de temperatura y humedad relativa de alta precisión. Utiliza un sensor capacitivo de humedad y un termistor NTC. Comunicación single-wire con protocolo propietario. Ideal para estaciones meteorológicas, automatización de invernaderos y monitoreo ambiental.',

    specs: {
      'Rango temperatura':   '-40°C a +80°C',
      'Precisión temp.':     '±0.5°C',
      'Rango humedad':       '0–100% RH',
      'Precisión humedad':   '±2–5% RH',
      'Voltaje':             '3.3–6V DC',
      'Corriente':           '1–1.5 mA en medición',
      'Protocolo':           'Single-wire (propietario)',
      'Periodo muestreo':    '2 segundos mínimo',
      'Encapsulado':         'DIP-4',
    },

    datasheet_url:  'https://assets.mauricionoj.com/components/datasheets/dht22.pdf',
    precio_aprox:   'Q45 / $5.50',
    proyectos:      ['estacion-meteorologica', 'invernadero-iot', 'rpi5-monitor-ambiental'],

    formula_quimica:  'SiO₂ (substrato) + polímero higroscópico (sensor capacitivo) + NTC (Mn-Ni-Co oxides)',
    composicion:      'Substrato de silicio con sensor capacitivo polimérico para humedad. Termistor NTC de óxido metálico (manganeso-níquel-cobalto). Encapsulado en ABS (acrilonitrilo butadieno estireno).',

    toxicidad:        'BAJO',
    toxicidad_notas:  'Componente de baja toxicidad en condiciones normales. El ABS puede liberar estireno en condiciones de incineración. Los óxidos metálicos del termistor NTC son inertes en encapsulado normal.',

    origen_material:      'Silicio de arena de cuarzo. Polímeros petroquímicos para el ABS. Metales de transición (Mn, Ni, Co) para el NTC — cobalto principalmente de República Democrática del Congo.',
    huella_carbono:       45.0,
    reciclabilidad:       30,
    conflicto_minerales:  true,
    conflicto_detalle:    'Contiene cobalto en el termistor NTC. El cobalto se extrae principalmente en la RDC bajo condiciones de trabajo que han sido asociadas con violaciones de derechos humanos y trabajo infantil. Representa < 0.1g del total del componente.',
    alternativa_verde:    'Sensor SHT31 (Sensirion) — mejor precisión, menor consumo, certificación industrial. BME280 para mediciones adicionales de presión atmosférica.',
    vida_util:            '5–8 años en condiciones normales. Sensible a condensación prolongada.',
    disposicion:          'Reciclaje electrónico certificado. El cobalto es recuperable y valioso — no desechar en basura doméstica. Programa de reciclaje de componentes electrónicos.',

    rohs:   true,
    reach:  true,
    weee:   true,

    punto_conexion: 'El DHT22 es un sensor diseñado para medir el ambiente, pero su fabricación tiene un impacto ambiental real: contiene cobalto, cuya extracción en la RDC genera conflictos socioambientales documentados. Como ingeniero ambiental, usar este sensor para monitorear ecosistemas crea una paradoja: el instrumento de medición forma parte del problema que intentamos cuantificar. Esta tensión es el núcleo del desafío en ingeniería sostenible — no existe tecnología de impacto cero, solo decisiones informadas sobre qué impactos aceptamos y cuáles minimizamos.',
  },

];

// ── Helpers ──────────────────────────────────────────────────────────────────

export const getComponentById = (id) =>
  COMPONENTS_DATA.find(c => c.id === id);

export const getComponentsByCategory = (cat) =>
  COMPONENTS_DATA.filter(c => c.categoria === cat);

export const getComponentsByProject = (projectId) =>
  COMPONENTS_DATA.filter(c => c.proyectos.includes(projectId));

export const getAllComponents = () => COMPONENTS_DATA;