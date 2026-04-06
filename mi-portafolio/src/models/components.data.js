// src/models/components.data.js

// ── Fórmula Score de Sostenibilidad (0–100) ────────────────────────────────
//
//   Score = (reciclabilidad  × 0.35)   ← % recuperable, ya en escala 0-100
//         + (co2_score       × 0.35)   ← normalizado inversamente vs. MAX_CO2 = 20 g
//         + (toxicidad_score × 0.20)   ← BAJO=100 | MEDIO=50 | ALTO=0 | n/d=75
//         + (conflicto_score × 0.10)   ← false=100 | true=0 | n/d=100
//
//   co2_score = Math.max(0, (1 - huella_carbono / MAX_CO2) * 100)
//   MAX_CO2 referencia = 20 g CO₂eq (umbral conservador para este tipo de componentes)
//
//   Etiquetas orientativas:
//     80–100 → "Muy sostenible"
//     60–79  → "Aceptable"
//     40–59  → "Atención"
//      0–39  → "Impacto alto"

const MAX_CO2 = 20;

const TOXICIDAD_SCORE = { BAJO: 100, MEDIO: 50, ALTO: 0 };
const TOXICIDAD_DEFAULT = 75; // cuando el campo no está definido

export function calcularScore(c) {
  const reciclabilidad = c.reciclabilidad ?? 40;
  const co2 = c.huella_carbono ?? 5;
  const tox = TOXICIDAD_SCORE[c.toxicidad] ?? TOXICIDAD_DEFAULT;
  const conflicto = c.conflicto_minerales === true ? 0 : 100;

  const co2_score = Math.max(0, (1 - co2 / MAX_CO2) * 100);

  return Math.round(
    reciclabilidad * 0.35 + co2_score * 0.35 + tox * 0.2 + conflicto * 0.1,
  );
}

export function etiquetaScore(score) {
  if (score >= 80) return "Muy sostenible";
  if (score >= 60) return "Aceptable";
  if (score >= 40) return "Atención";
  return "Impacto alto";
}

// ─────────────────────────────────────────────────────────────────────────────

export const COMPONENTS_DATA = [
  // ── 1. Resistencia de Carbón ───────────────────────────────────────────────
  {
    id: "resistencia-carbon-10k",
    nombre: "Resistencia de Carbón 10kΩ",
    imagen: "https://assets.mauricionoj.com/components/resistencia-carbon.jpg",
    categoria: "pasivos",
    subcategoria: "Resistencias de carbón",
    tags: ["pasivo", "resistencia", "through-hole", "carbón"],
    descripcion:
      "Resistencia de película de carbón de uso general. Fundamental para limitar corriente.",
    specs: { Resistencia: "10 kΩ", Tolerancia: "±5%", Potencia: "0.25 W" },
    precio_aprox: "Q0.25",
    toxicidad: "BAJO",
    huella_carbono: 1.0,
    reciclabilidad: 50,
    conflicto_minerales: false,
    score_sostenibilidad: 81,
    punto_conexion:
      "La eficiencia térmica en microescala reduce la necesidad de enfriamiento masivo.",
  },

  // ── 2. Capacitor Electrolítico ─────────────────────────────────────────────
  {
    id: "capacitor-electrolitico-100uf",
    nombre: "Capacitor Electrolítico 100µF / 25V",
    imagen: "https://assets.mauricionoj.com/components/Capacitor_.png",
    categoria: "pasivos",
    subcategoria: "Capacitores electrolíticos",
    tags: ["pasivo", "capacitor", "electrolítico", "aluminio"],
    descripcion:
      "Capacitor polarizado para filtrado de fuentes de poder y almacenamiento temporal.",
    specs: { Capacitancia: "100 µF", Voltaje: "25 V", ESR: "≤ 0.9 Ω" },
    precio_aprox: "Q0.75",
    toxicidad: "MEDIO",
    huella_carbono: 2.0,
    reciclabilidad: 30,
    conflicto_minerales: false,
    score_sostenibilidad: 62,
    punto_conexion:
      "La producción de aluminio es intensiva en energía; elegir polímero sólido extiende la vida útil y reduce desechos.",
  },

  // ── 3. DFPlayer Mini ───────────────────────────────────────────────────────
  {
    id: "dfplayer-mini",
    nombre: "DFPlayer Mini MP3 Player",
    imagen: "https://assets.mauricionoj.com/components/DFPlayer_Mini.png",
    categoria: "modulos",
    subcategoria: "Audio",
    tags: ["mp3", "audio", "sd-card", "reproductor"],
    descripcion:
      "Módulo de reproducción de audio compacto compatible con Arduino. Soporta FAT16/FAT32 y decodificación de hardware MP3/WAV.",
    specs: {
      Voltaje: "3.2V - 5.0V",
      "Salida DAC": "24-bit",
      SNR: "85dB",
      "Frec. Muestreo": "8/11.025/12/16/22.05/24/32/44.1/48 kHz",
    },
    precio_aprox: "Q28.00",
    proyectos: ["tienda-de-barrio-audio", "alarma-ambiental"],
    formula_quimica: "PCB de Fibra de Vidrio + Chips de Silicio + Estaño (Sn)",
    composicion:
      "Circuito integrado de control, ranura micro-SD de acero inoxidable, componentes SMD.",
    toxicidad: "MEDIO",
    toxicidad_notas:
      "Contiene metales pesados en soldaduras si no es 100% RoHS. El sustrato de PCB es difícil de degradar.",
    origen_material:
      "Silicio (China), Cobre (Chile), Plásticos (Petroquímicos).",
    huella_carbono: 12.4,
    reciclabilidad: 25,
    conflicto_minerales: false,
    score_sostenibilidad: 42,
    alternativa_verde:
      "Sistemas de audio basados en software (I2S) para reducir componentes físicos.",
    vida_util: "10+ años bajo uso normal.",
    disposicion:
      "Centro de reciclaje electrónico. Recuperación de metales preciosos (oro en pines).",
    punto_conexion:
      "Al integrar audio en proyectos ambientales (como alertas sonoras de sequía), usamos tecnología para sensibilizar al humano. Sin embargo, cada módulo sumado aumenta la carga de basura electrónica al final de su ciclo.",
  },

  // ── 4. Sensor PIR HC-SR501 ────────────────────────────────────────────────
  {
    id: "sensor-pir-hc-sr501",
    nombre: "Sensor de Movimiento PIR HC-SR501",
    imagen: "https://assets.mauricionoj.com/components/HC_SR501.png",
    categoria: "sensores",
    subcategoria: "Infrarrojos",
    tags: ["movimiento", "pir", "seguridad", "ahorro-energia"],
    descripcion:
      "Sensor infrarrojo pasivo que detecta calor corporal en movimiento. Incluye lente de Fresnel.",
    specs: {
      "Rango detección": "3 a 7 metros",
      Ángulo: "< 120 grados",
      Voltaje: "4.5V - 20V",
      "Consumo reposo": "50 µA",
    },
    precio_aprox: "Q25.00",
    proyectos: ["iluminacion-inteligente", "monitoreo-fauna"],
    formula_quimica: "Polietileno (Lente) + Cerámica Piroeléctrica",
    composicion:
      "Elemento piroeléctrico sensible al calor infrarrojo, lente de polietileno de alta densidad.",
    toxicidad: "BAJO",
    toxicidad_notas:
      "El lente es plástico reciclable (PE). El elemento cerámico es inerte.",
    origen_material: "Cerámicas avanzadas (Japón/China), Polietileno (Global).",
    huella_carbono: 8.2,
    reciclabilidad: 55,
    conflicto_minerales: false,
    score_sostenibilidad: 70,
    alternativa_verde:
      "Sensores de microondas (mayor consumo) o sensores de presión piezocerámicos.",
    vida_util:
      "8 años (la sensibilidad del elemento cerámico decae con el tiempo).",
    disposicion:
      "Separar el lente plástico del PCB para reciclaje diferenciado.",
    punto_conexion:
      "Desde el diseño de sistemas, el PIR es el aliado #1 del medio ambiente: permite que la iluminación de ciudades u oficinas solo consuma energía cuando es estrictamente necesario, reduciendo emisiones de CO2 por generación eléctrica.",
  },

  // ── 5. Barómetro BMP180 ───────────────────────────────────────────────────
  {
    id: "sensor-bmp180",
    nombre: "Sensor de Presión y Temp BMP180",
    imagen: "https://assets.mauricionoj.com/components/bmp180.png",
    categoria: "sensores",
    subcategoria: "Presión Atmosférica",
    tags: ["barometro", "clima", "presion", "temperatura", "I2C"],
    descripcion:
      "Sensor barométrico de ultra-baja potencia y alta precisión. Mide presión atmosférica y temperatura.",
    specs: {
      "Rango Presión": "300 a 1100 hPa",
      "Precisión Altitud": "0.17 m",
      Interfaz: "I2C",
      Voltaje: "1.8V - 3.6V",
    },
    precio_aprox: "Q25.00",
    proyectos: ["estacion-climatica-guatemala", "dron-monitoreo"],
    formula_quimica: "Si (Silicio) + Au (Oro en conexiones) + Epoxi",
    composicion:
      "Sensor piezo-resistivo micromecanizado en silicio (MEMS) dentro de encapsulado metálico.",
    toxicidad: "BAJO",
    toxicidad_notas:
      "Inerte en condiciones normales. El encapsulado metálico protege los componentes internos.",
    origen_material:
      "Silicio purificado, metales de transición para el encapsulado.",
    huella_carbono: 5.1,
    reciclabilidad: 20,
    conflicto_minerales: true,
    conflicto_detalle:
      "Contiene trazas de oro para la unión de cables (wire bonding).",
    score_sostenibilidad: 53,
    alternativa_verde:
      "BMP280 (mejor precisión/menor consumo) o BME280 (incluye humedad).",
    vida_util: "10+ años en ambiente seco.",
    disposicion: "Reciclaje de metales no ferrosos.",
    punto_conexion:
      "Como ingenieros ambientales, el barómetro nos permite cuantificar la densidad del aire. Esto es vital para calcular la dispersión de contaminantes en áreas urbanas como Ciudad de Guatemala.",
  },

  // ── 6. Módulo GY-68 (BMP085) ──────────────────────────────────────────────
  {
    id: "modulo-gy-68",
    nombre: "Módulo de Presión GY-68 (BMP085)",
    imagen: "https://assets.mauricionoj.com/components/GY_68.png",
    categoria: "sensores",
    subcategoria: "Presión Atmosférica",
    tags: ["barometro", "presion", "temperatura", "I2C", "altitud"],
    descripcion:
      "Módulo de sensor barométrico BMP085 montado en PCB con regulación de voltaje integrada. Predecesor del BMP180, mide presión y temperatura con alta precisión.",
    specs: {
      "Rango Presión": "300 a 1100 hPa",
      "Precisión Altitud": "± 0.5 m",
      Interfaz: "I2C",
      Voltaje: "3.3V - 5V",
      "Modos de operación":
        "Ultra Low Power / Standard / High Res / Ultra High Res",
    },
    precio_aprox: "Q30.00",
    proyectos: ["estacion-climatica-guatemala", "dron-monitoreo"],
    formula_quimica: "Si (Silicio) + PCB FR4 + Regulador 3.3V",
    composicion:
      "Sensor MEMS BMP085 sobre PCB azul con regulador de tensión LDO y filtros de desacople.",
    toxicidad: "BAJO",
    toxicidad_notas:
      "Construcción inerte; el módulo incluye condensadores de cerámica sin plomo.",
    origen_material: "Silicio (Alemania/Bosch), FR4 (China).",
    huella_carbono: 6.0,
    reciclabilidad: 22,
    conflicto_minerales: false,
    score_sostenibilidad: 62,
    alternativa_verde:
      "BMP280 o BME280 con menor consumo energético y mayor precisión.",
    vida_util: "10+ años en ambiente interior seco.",
    disposicion: "Reciclaje de PCB en centro de e-waste certificado.",
    punto_conexion:
      "La medición precisa de altitud permite a ingenieros ambientales mapear microclimas en zonas montañosas de Guatemala, donde los gradientes de presión son clave para predecir lluvias locales.",
  },

  // ── 7. Lector RFID RC522 ──────────────────────────────────────────────────
  {
    id: "lector-rfid-rc522",
    nombre: "Módulo Lector RFID RC522",
    imagen: "https://assets.mauricionoj.com/components/RC522.png",
    categoria: "comunicacion",
    subcategoria: "Identificación",
    tags: ["rfid", "nfc", "seguridad", "acceso"],
    descripcion:
      "Lector de tarjetas de 13.56 MHz. Ideal para sistemas de inventario y control de acceso.",
    specs: {
      Frecuencia: "13.56 MHz",
      Protocolo: "SPI",
      Distancia: "2 - 5 cm",
      Voltaje: "3.3V",
    },
    precio_aprox: "Q37.00",
    proyectos: ["inventario-tienda-barrio", "control-acceso-lab"],
    toxicidad: "MEDIO",
    huella_carbono: 15.5,
    reciclabilidad: 15,
    conflicto_minerales: false,
    score_sostenibilidad: 33,
    punto_conexion:
      "El RFID elimina el uso de papel en inventarios, digitalizando procesos de logística ambiental y seguimiento de residuos peligrosos.",
  },

  // ── 8. Sensor de Gas MQ-2 ─────────────────────────────────────────────────
  {
    id: "sensor-gas-mq2",
    nombre: "Sensor de Gas y Humo MQ-2",
    imagen: "https://assets.mauricionoj.com/components/MQ.png",
    categoria: "sensores",
    subcategoria: "Gas",
    tags: ["gas", "humo", "seguridad", "ambiental"],
    descripcion:
      "Sensor para detección de GLP, propano, metano, alcohol e hidrógeno. Requiere precalentamiento.",
    specs: {
      Detección: "Humo y Gases Inflamables",
      "Voltaje Calentador": "5V",
      "Resistencia carga": "Ajustable",
      Salida: "Analógica y Digital",
    },
    precio_aprox: "Q35.00",
    proyectos: ["detector-fugas-hogar", "analisis-calidad-aire"],
    toxicidad: "ALTO",
    toxicidad_notas:
      "El elemento sensible de SnO2 puede ser tóxico si se manipula el polvo interno. El calentador consume energía constante (aprox. 800mW).",
    huella_carbono: 8.0,
    reciclabilidad: 20,
    conflicto_minerales: false,
    score_sostenibilidad: 38,
    punto_conexion:
      "Es una paradoja: para medir la contaminación, el sensor gasta energía constantemente calentando su resistencia interna. Optimizar los ciclos de lectura es clave para la eficiencia energética del nodo IoT.",
  },

  // ── 9. Sensor de Lluvia ───────────────────────────────────────────────────
  {
    id: "sensor-lluvia-placa",
    nombre: "Módulo Sensor de Lluvia",
    imagen: "https://assets.mauricionoj.com/components/sensor_lluvia.png",
    categoria: "sensores",
    subcategoria: "Clima",
    tags: ["agua", "lluvia", "clima", "precipitacion"],
    descripcion:
      "Detector de gotas de agua por conductividad superficial. Ideal para estaciones de riego automático.",
    specs: {
      Superficie: "Niquelada / Dorada",
      Salida: "Digital (DO) y Analógica (AO)",
      Ajuste: "Potenciómetro de umbral",
    },
    precio_aprox: "Q25.00",
    proyectos: ["riego-automatizado", "proteccion-ventanas"],
    toxicidad: "BAJO",
    huella_carbono: 3.0,
    reciclabilidad: 35,
    conflicto_minerales: false,
    score_sostenibilidad: 72,
    punto_conexion:
      "Fundamental para la ingeniería ambiental en la optimización del recurso hídrico, deteniendo sistemas de riego al detectar precipitación natural.",
  },

  // ── 10. LDR Fotorresistencia ──────────────────────────────────────────────
  {
    id: "ldr-fotorresistencia",
    nombre: "LDR Fotorresistencia (5mm)",
    imagen: "https://assets.mauricionoj.com/components/LDR.png",
    categoria: "pasivos",
    subcategoria: "Sensores de Luz",
    tags: ["luz", "fotorresistencia", "ldr", "analógico", "pasivo"],
    descripcion:
      "Resistencia dependiente de la luz (LDR / GL5528). Su resistencia disminuye al aumentar la iluminación.",
    specs: {
      "Resistencia en oscuridad": "≥ 1 MΩ",
      "Resistencia en luz (10 lux)": "8 - 20 kΩ",
      "Tiempo de respuesta": "20ms (subida) / 30ms (bajada)",
      "Pico espectral": "540 nm (luz visible verde)",
    },
    precio_aprox: "Q2.50",
    proyectos: ["iluminacion-inteligente", "estacion-climatica-guatemala"],
    formula_quimica: "CdS (Sulfuro de Cadmio)",
    composicion:
      "Célula fotoconductora de sulfuro de cadmio con carcasa de plástico transparente.",
    toxicidad: "ALTO",
    toxicidad_notas:
      "Contiene Cadmio (Cd), metal pesado altamente tóxico y cancerígeno. Uso restringido bajo directiva RoHS.",
    origen_material:
      "Cadmio (subproducto de minería de Zinc, China/Kazajistán).",
    huella_carbono: 3.8,
    reciclabilidad: 10,
    conflicto_minerales: false,
    score_sostenibilidad: 42,
    alternativa_verde:
      "Fotodiodos de silicio (BPW34) o fototransistores sin metales pesados.",
    vida_util: "5-7 años.",
    disposicion:
      "RESIDUO PELIGROSO. Centro de recolección de e-waste certificado.",
    punto_conexion:
      "El LDR ilustra una tensión ética en ingeniería ambiental: usamos un sensor que mide luz natural pero que contiene un tóxico que contaminaría el suelo si se desecha mal.",
  },

  // ── 11. KY-002 Sensor de Vibración ───────────────────────────────────────
  {
    id: "ky-002-vibracion",
    nombre: "KY-002 Módulo Sensor de Vibración",
    imagen: "https://assets.mauricionoj.com/components/KY_002.png",
    categoria: "sensores",
    subcategoria: "Movimiento",
    tags: ["vibración", "choque", "impacto", "digital", "ky"],
    descripcion:
      "Módulo de detección de vibración o impacto mecánico basado en interruptor de lámina de resorte.",
    specs: {
      Voltaje: "3.3V - 5V",
      Salida: "Digital (DO)",
      "Tipo sensor": "Interruptor de lámina SW-18010P",
      Corriente: "< 1 mA",
    },
    precio_aprox: "Q12.00",
    proyectos: ["alarma-ambiental", "detector-sismos-basico"],
    toxicidad: "BAJO",
    huella_carbono: 2.5,
    reciclabilidad: 40,
    conflicto_minerales: false,
    score_sostenibilidad: 75,
    alternativa_verde:
      "Acelerómetros MEMS (MPU-6050) para mayor precisión y menor consumo en detección sísmica.",
    vida_util: "3-5 años (el resorte metálico se fatiga con el tiempo).",
    disposicion: "Reciclaje de PCB en centro de e-waste.",
    punto_conexion:
      "En redes de monitoreo sísmico de bajo costo para comunidades rurales de Guatemala, el KY-002 puede ser el primer aviso de actividad tectónica.",
  },

  // ── 12. KY-010 Barrera Óptica ─────────────────────────────────────────────
  {
    id: "ky-010-barrera-optica",
    nombre: "KY-010 Módulo Barrera Óptica (Photo Interrupter)",
    imagen: "https://assets.mauricionoj.com/components/KY_010.png",
    categoria: "sensores",
    subcategoria: "Ópticos",
    tags: ["óptico", "barrera", "interruptor", "IR", "conteo", "ky"],
    descripcion:
      "Sensor de barrera óptica con LED IR emisor y fototransistor receptor enfrentados. Detecta objetos que interrumpen el haz de luz.",
    specs: {
      Voltaje: "3.3V - 5V",
      Salida: "Digital (DO)",
      "Distancia ranura": "5 mm",
      "Longitud onda": "940 nm (IR)",
    },
    precio_aprox: "Q15.00",
    proyectos: ["contador-afluencia", "control-riego-goteo"],
    toxicidad: "BAJO",
    huella_carbono: 3.0,
    reciclabilidad: 35,
    conflicto_minerales: false,
    score_sostenibilidad: 72,
    alternativa_verde:
      "Sensores Hall de efecto magnético para entornos con polvo o humedad.",
    vida_util: "5-8 años.",
    disposicion: "Reciclaje de PCB estándar.",
    punto_conexion:
      "Contabilizar el flujo de agua en sistemas de riego por goteo permite calcular el consumo hídrico exacto.",
  },

  // ── 13. KY-018 Módulo LDR ─────────────────────────────────────────────────
  {
    id: "ky-018-fotorresistencia",
    nombre: "KY-018 Módulo Sensor de Luz (LDR)",
    imagen: "https://assets.mauricionoj.com/components/KY_018.png",
    categoria: "sensores",
    subcategoria: "Sensores de Luz",
    tags: ["luz", "fotorresistencia", "ldr", "analógico", "ky"],
    descripcion:
      "Módulo de tres pines con fotorresistencia GL5528 integrada en PCB. Incluye resistencia pull-down para lectura analógica directa.",
    specs: {
      Voltaje: "3.3V - 5V",
      Salida: "Analógica (AO)",
      "Componente base": "LDR GL5528",
      "Rango resistencia": "1 kΩ (luz plena) - 1 MΩ (oscuridad total)",
    },
    precio_aprox: "Q10.00",
    proyectos: ["iluminacion-inteligente", "estacion-climatica-guatemala"],
    toxicidad: "ALTO",
    toxicidad_notas:
      "Contiene sulfuro de cadmio (CdS). Ver advertencias del LDR GL5528.",
    huella_carbono: 3.2,
    reciclabilidad: 15,
    conflicto_minerales: false,
    score_sostenibilidad: 45,
    alternativa_verde:
      "Módulo con fotodiodo BPW34 o sensor digital TSL2561 libre de cadmio.",
    vida_util: "5-7 años.",
    disposicion:
      "RESIDUO PELIGROSO por contenido de Cadmio. Centro de e-waste.",
    punto_conexion:
      "Medir la radiación solar disponible permite optimizar la orientación de paneles fotovoltaicos en comunidades rurales sin red eléctrica.",
  },

  // ── 14. KY-020 Sensor de Inclinación ─────────────────────────────────────
  {
    id: "ky-020-inclinacion",
    nombre: "KY-020 Módulo Sensor de Inclinación (Tilt)",
    imagen: "https://assets.mauricionoj.com/components/KY_020.png",
    categoria: "sensores",
    subcategoria: "Movimiento",
    tags: ["inclinación", "tilt", "movimiento", "digital", "ky"],
    descripcion:
      "Sensor de inclinación basado en interruptor de bola metálica. Detecta cambio de posición al superar cierto ángulo.",
    specs: {
      Voltaje: "3.3V - 5V",
      Salida: "Digital (DO)",
      "Ángulo de activación": "≈ 45°",
      Tipo: "Ball Switch SW-200D",
    },
    precio_aprox: "Q10.00",
    proyectos: ["alarma-ambiental", "monitoreo-deslizamientos"],
    toxicidad: "BAJO",
    huella_carbono: 2.0,
    reciclabilidad: 45,
    conflicto_minerales: false,
    score_sostenibilidad: 77,
    alternativa_verde:
      "Acelerómetro MPU-6050 para medición de ángulo precisa y multieje.",
    vida_util: "5+ años.",
    disposicion: "Reciclaje electrónico estándar.",
    punto_conexion:
      "En zonas de ladera de Guatemala, un arreglo de sensores de inclinación puede detectar movimientos del suelo y disparar alertas tempranas de deslizamiento.",
  },

  // ── 15. KY-022 Receptor IR ────────────────────────────────────────────────
  {
    id: "ky-022-receptor-ir",
    nombre: "KY-022 Módulo Receptor IR 38kHz",
    imagen: "https://assets.mauricionoj.com/components/KY_022.png",
    categoria: "comunicacion",
    subcategoria: "Infrarrojo",
    tags: ["infrarrojo", "ir", "receptor", "control-remoto", "ky"],
    descripcion:
      "Módulo receptor de señales infrarrojas a 38kHz (protocolo NEC/RC5/Sony). Compatible con controles remotos estándar.",
    specs: {
      Voltaje: "3.3V - 5V",
      Salida: "Digital desmodulada",
      Frecuencia: "38 kHz",
      "Chip receptor": "VS1838B",
      "Ángulo recepción": "45°",
      Distancia: "hasta 18 m",
    },
    precio_aprox: "Q12.00",
    proyectos: ["control-remoto-invernadero", "automatizacion-hogar"],
    toxicidad: "BAJO",
    huella_carbono: 2.8,
    reciclabilidad: 30,
    conflicto_minerales: false,
    score_sostenibilidad: 71,
    alternativa_verde:
      "Comunicación RF 433MHz o Bluetooth BLE para mayor alcance sin línea de vista.",
    vida_util: "8+ años.",
    disposicion: "Reciclaje de PCB estándar.",
    punto_conexion:
      "Automatizar sistemas de riego o ventilación de invernaderos con control remoto IR aprovecha infraestructura de bajo costo para maximizar la eficiencia hídrica.",
  },

  // ── 16. KY-032 Sensor de Obstáculos IR ───────────────────────────────────
  {
    id: "ky-032-obstaculos-ir",
    nombre: "KY-032 Sensor Evasión de Obstáculos IR",
    imagen: "https://assets.mauricionoj.com/components/KY_032.png",
    categoria: "sensores",
    subcategoria: "Infrarrojos",
    tags: ["infrarrojo", "obstáculo", "proximidad", "robotica", "ky"],
    descripcion:
      "Sensor de proximidad infrarrojo con par emisor-receptor. Detecta obstáculos por reflexión de luz IR. Distancia ajustable.",
    specs: {
      Voltaje: "3.3V - 5V",
      Salida: "Digital (DO)",
      "Rango detección": "2 - 40 cm (ajustable)",
      "Longitud onda": "940 nm",
      Ajuste: "Potenciómetro de umbral",
    },
    precio_aprox: "Q15.00",
    proyectos: ["robot-recolector", "contador-fauna"],
    toxicidad: "BAJO",
    huella_carbono: 3.5,
    reciclabilidad: 35,
    conflicto_minerales: false,
    score_sostenibilidad: 71,
    alternativa_verde:
      "Sensor ultrasónico HC-SR04 para mejor desempeño en superficies oscuras o brillantes.",
    vida_util: "5-8 años.",
    disposicion: "Reciclaje de PCB en centro de e-waste.",
    punto_conexion:
      "En sistemas de monitoreo de fauna nocturna, el sensor IR detecta el paso de animales sin perturbación visual, permitiendo conteos automatizados.",
  },

  // ── 17. KY-033 Seguidor de Línea ──────────────────────────────────────────
  {
    id: "ky-033-seguidor-linea",
    nombre: "KY-033 Sensor Seguidor de Línea IR",
    imagen: "https://assets.mauricionoj.com/components/KY_033.png",
    categoria: "sensores",
    subcategoria: "Ópticos",
    tags: ["línea", "seguidor", "IR", "robotica", "óptico", "ky"],
    descripcion:
      "Sensor óptico reflectivo que distingue superficies claras de oscuras por reflectividad IR.",
    specs: {
      Voltaje: "3.3V - 5V",
      Salida: "Digital (DO)",
      "Distancia de trabajo": "0 - 4 cm",
      Chip: "Comparador LM393",
    },
    precio_aprox: "Q12.00",
    proyectos: ["robot-recolector", "sistema-clasificacion-residuos"],
    toxicidad: "BAJO",
    huella_carbono: 2.5,
    reciclabilidad: 35,
    conflicto_minerales: false,
    score_sostenibilidad: 73,
    alternativa_verde: "Sensor de color TCS3200 para clasificación por color.",
    vida_util: "5+ años.",
    disposicion: "Reciclaje de PCB estándar.",
    punto_conexion:
      "Un robot con KY-033 puede automatizar la clasificación de residuos reciclables, diferenciando materiales por reflectividad superficial.",
  },

  // ── 18. KY-037 Micrófono ──────────────────────────────────────────────────
  {
    id: "ky-037-microfono",
    nombre: "KY-037 Sensor de Sonido (Micrófono Alta Sensibilidad)",
    imagen: "https://assets.mauricionoj.com/components/KY_037.png",
    categoria: "sensores",
    subcategoria: "Audio",
    tags: ["sonido", "micrófono", "audio", "ruido", "ky"],
    descripcion:
      "Módulo de micrófono electret de alta sensibilidad con salida analógica y digital. Detecta presencia e intensidad de sonido ambiental.",
    specs: {
      Voltaje: "3.3V - 5V",
      Salida: "Analógica (AO) + Digital (DO)",
      Sensibilidad: "Alta (ajustable por potenciómetro)",
      "Tipo micrófono": "Electret condenser",
      Chip: "LM393",
    },
    precio_aprox: "Q15.00",
    proyectos: ["monitoreo-ruido-urbano", "alarma-ambiental"],
    toxicidad: "BAJO",
    toxicidad_notas:
      "El micrófono electret contiene una pequeña cámara con FET interno; inerte en condiciones normales.",
    huella_carbono: 3.0,
    reciclabilidad: 30,
    conflicto_minerales: false,
    score_sostenibilidad: 70,
    alternativa_verde:
      "Micrófono MEMS digital (SPH0645) con salida I2S para mayor precisión espectral.",
    vida_util: "5-8 años.",
    disposicion: "Reciclaje de PCB. El micrófono puede ser reutilizado.",
    punto_conexion:
      "El monitoreo de contaminación acústica en zonas urbanas puede hacerse con redes de nodos de bajo costo, generando mapas de ruido que guíen políticas de ordenamiento territorial.",
  },

  // ── 19. Módulo Sensor de Voltaje ──────────────────────────────────────────
  {
    id: "modulo-sensor-voltaje",
    nombre: "Módulo Sensor de Voltaje DC",
    imagen:
      "https://assets.mauricionoj.com/components/modulo_sensor_voltaje.png",
    categoria: "sensores",
    subcategoria: "Electricidad",
    tags: ["voltaje", "medición", "batería", "energía", "analógico"],
    descripcion:
      "Divisor de voltaje resistivo que escala tensiones de hasta 25V DC al rango ADC de 0-5V del microcontrolador.",
    specs: {
      "Voltaje máximo entrada": "25V DC",
      "Voltaje salida": "0 - 5V (proporcional)",
      Relación: "1:5 (divisor resistivo)",
      Voltaje: "3.3V - 5V (VCC referencia)",
    },
    precio_aprox: "Q15.00",
    proyectos: ["monitor-bateria-solar", "estacion-climatica-guatemala"],
    toxicidad: "BAJO",
    huella_carbono: 2.0,
    reciclabilidad: 40,
    conflicto_minerales: false,
    score_sostenibilidad: 76,
    alternativa_verde:
      "INA219 (medición de voltaje y corriente vía I2C) para mayor precisión.",
    vida_util: "10+ años (componentes puramente pasivos).",
    disposicion: "Reciclaje de PCB estándar.",
    punto_conexion:
      "En sistemas de energía solar para comunidades rurales, este módulo permite registrar el estado de carga de baterías en tiempo real.",
  },

  // ── 20. Sensor de Humedad de Suelo ────────────────────────────────────────
  {
    id: "sensor-humedad-suelo",
    nombre: "Sensor de Humedad de Suelo",
    imagen: "https://assets.mauricionoj.com/components/senso_humedad_suelo.png",
    categoria: "sensores",
    subcategoria: "Clima",
    tags: ["humedad", "suelo", "agricultura", "riego", "agua"],
    descripcion:
      "Sonda de medición de humedad del suelo por conductividad eléctrica. Permite detectar el nivel de hidratación del sustrato.",
    specs: {
      Voltaje: "3.3V - 5V",
      Salida: "Analógica (AO) + Digital (DO)",
      Ajuste: "Potenciómetro de umbral",
      Material: "PCB con recubrimiento niquelado",
    },
    precio_aprox: "Q20.00",
    proyectos: ["riego-automatizado", "monitoreo-suelos-agricolas"],
    formula_quimica: "Ni (Níquel) + Cu (Cobre) en sonda + FR4",
    composicion:
      "Dos electrodos paralelos bañados en níquel que miden conductividad del suelo.",
    toxicidad: "MEDIO",
    toxicidad_notas:
      "Los electrodos metálicos se corroen en suelos húmedos, liberando iones de cobre.",
    origen_material: "Cobre (Chile), Níquel (Rusia/Indonesia).",
    huella_carbono: 4.5,
    reciclabilidad: 30,
    conflicto_minerales: false,
    score_sostenibilidad: 58,
    alternativa_verde:
      "Sensor capacitivo de humedad de suelo para mayor durabilidad y menor contaminación del sustrato.",
    vida_util: "1-2 años (resistivo en campo); 3-5 años (capacitivo).",
    disposicion:
      "Retirar del suelo y limpiar antes de desechar. Reciclaje de PCB.",
    punto_conexion:
      "Un sensor de humedad de suelo puede reducir el consumo de agua agrícola hasta un 40%, conectando la electrónica de bajo costo con la soberanía hídrica de Guatemala.",
  },

  // ── 21. Sensor de Nivel de Agua ───────────────────────────────────────────
  {
    id: "sensor-nivel-agua",
    nombre: "Sensor de Nivel de Agua",
    imagen: "https://assets.mauricionoj.com/components/sensor_nivel_agua.png",
    categoria: "sensores",
    subcategoria: "Clima",
    tags: ["agua", "nivel", "inundación", "lluvia", "hidrico"],
    descripcion:
      "Sensor de nivel o presencia de agua por conductividad entre pistas paralelas. Detecta acumulación, desbordamientos o nivel en depósitos.",
    specs: {
      Voltaje: "3.3V - 5V",
      Salida: "Analógica (AO) + Digital (DO)",
      Dimensiones: "62 mm x 20 mm",
      "Área activa": "40 mm x 16 mm",
    },
    precio_aprox: "Q18.00",
    proyectos: ["alerta-inundacion", "control-deposito-agua"],
    formula_quimica: "Cu (Cobre) + Sn (Estaño) en pistas conductoras",
    composicion:
      "PCB con pistas de cobre paralelas intercaladas. La conductividad del agua cierra el circuito proporcionalmente.",
    toxicidad: "BAJO",
    toxicidad_notas:
      "Las pistas de cobre se oxidan lentamente. No usar en agua potable para consumo humano.",
    origen_material: "Cobre (Chile), Fibra de vidrio FR4.",
    huella_carbono: 3.0,
    reciclabilidad: 35,
    conflicto_minerales: false,
    score_sostenibilidad: 72,
    alternativa_verde:
      "Sensores ultrasónicos (JSN-SR04T) para medición sin contacto y mayor durabilidad.",
    vida_util: "1-3 años (oxidación de pistas en contacto constante con agua).",
    disposicion: "Reciclaje de PCB. No contaminar agua con el módulo dañado.",
    punto_conexion:
      "En cuencas hidrográficas de Guatemala amenazadas por inundaciones, redes de sensores de nivel pueden complementar los sistemas del INSIVUMEH, mejorando la alerta temprana comunitaria.",
  },

  // ── 22. KY-015 DHT11 ──────────────────────────────────────────────────────
  {
    id: "ky-015-dht11",
    nombre: "KY-015 Módulo Temperatura y Humedad (DHT11)",
    imagen:
      "https://assets.mauricionoj.com/components/temperatura_humedad_KY_015.png",
    categoria: "sensores",
    subcategoria: "Clima",
    tags: ["temperatura", "humedad", "clima", "dht11", "ky"],
    descripcion:
      "Módulo sensor de temperatura y humedad relativa basado en DHT11. Comunicación digital de un solo hilo (1-Wire).",
    specs: {
      "Rango Temperatura": "0°C - 50°C (±2°C)",
      "Rango Humedad": "20% - 90% HR (±5%)",
      Voltaje: "3.3V - 5V",
      Salida: "Digital (1-Wire)",
      "Frecuencia muestreo": "1 Hz",
    },
    precio_aprox: "Q18.00",
    proyectos: ["estacion-climatica-guatemala", "invernadero-inteligente"],
    formula_quimica: "Polímero higroscópico (sensing) + NTC (temperatura)",
    composicion:
      "Elemento capacitivo de polímero para humedad y NTC para temperatura, en carcasa ventilada.",
    toxicidad: "BAJO",
    toxicidad_notas:
      "Componentes plásticos ABS y electrónica estándar. Sin materiales peligrosos significativos.",
    origen_material: "Polímeros (Petroquímicos), Silicio (China).",
    huella_carbono: 4.0,
    reciclabilidad: 30,
    conflicto_minerales: false,
    score_sostenibilidad: 69,
    alternativa_verde:
      "DHT22 / AM2302 (mayor precisión) o BME280 (incluye presión, vía I2C).",
    vida_util: "3-5 años en campo.",
    disposicion: "Reciclaje de PCB y plástico ABS por separado.",
    punto_conexion:
      "Una red de módulos KY-015 distribuidos en el altiplano guatemalteco puede generar perfiles de temperatura y humedad que apoyen estudios de cambio climático local.",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

export const getComponentById = (id) =>
  COMPONENTS_DATA.find((c) => c.id === id);

export const getComponentsByCategory = (cat) =>
  COMPONENTS_DATA.filter((c) => c.categoria === cat);

export const getComponentsByProject = (projectId) =>
  COMPONENTS_DATA.filter((c) => c.proyectos?.includes(projectId));

export const getAllComponents = () => COMPONENTS_DATA;

// Ordena de mayor a menor score (campo estático; calcularScore() como fallback)
export const getComponentsByScore = () =>
  [...COMPONENTS_DATA].sort(
    (a, b) =>
      (b.score_sostenibilidad ?? calcularScore(b)) -
      (a.score_sostenibilidad ?? calcularScore(a)),
  );

// Filtra componentes por rango de score
export const getComponentsByScoreRange = (min = 0, max = 100) =>
  COMPONENTS_DATA.filter((c) => {
    const s = c.score_sostenibilidad ?? calcularScore(c);
    return s >= min && s <= max;
  });
