// src/models/projects.data.js
// Empieza con 5 proyectos. Agrega más siguiendo el mismo esquema.
// cats disponibles: 'electric' | 'ttl' | 'expfis' | 'ia' | 'maker' | 'compiler' | 'fintech' | 'ambiental' | 'sistemas' | 'fisica' | 'quimica' | 'math' | 'cyber'

export const projectsData = [
  {
    id: "E01",
    icon: "🔋",
    cat: "electric",
    diff: "basico",
    title: "Ley de Ohm — Calcula, Mide, Compara",
    short: "V=IR para 10 combinaciones. Multímetro valida la teoría. Curva V-I característica.",
    desc: "El fundamento absoluto de la electrónica. Calcula V, I y R teóricos con la Ley de Ohm, arma el circuito en protoboard y mide con multímetro. Construye la curva V-I y entiende por qué los componentes reales difieren del valor nominal.",
    tags: ["Ley de Ohm", "V-I-R", "Multímetro", "Protoboard"],
    hw: "Protoboard + Resistencias surtidas + Multímetro + LM7805 (fuente 5V)",
    cost: "~$0",
    status: "pendiente", // 'pendiente' | 'en-progreso' | 'completado'
    steps: [
      "TEÓRICO: Calcular I=V/R para R=100Ω, 220Ω, 470Ω, 1kΩ, 4.7kΩ a V=5V",
      "TEÓRICO: Calcular potencia disipada P=V²/R para cada resistencia",
      "Armar cada circuito en protoboard con fuente LM7805",
      "Medir V y I con multímetro en cada combinación",
      "Graficar curva V-I: la pendiente es 1/R",
      "Analizar diferencia entre valor nominal y valor real medido",
    ],
    skills: ["Ley de Ohm", "Multímetro", "Circuitos básicos", "Análisis de errores", "Código de colores"],
    concept: "La Ley de Ohm V=IR es válida para resistores lineales. Un resistor de 1kΩ puede medir 950Ω–1050Ω por tolerancia del 5%. La curva V-I de una resistencia es una línea recta cuya pendiente es exactamente 1/R.",
    insight: "Los resistores tienen tolerancia del 5% o 1%. Medir la resistencia real con multímetro y comparar con el código de colores enseña más sobre incertidumbre de medición que cualquier libro.",
  },
  {
    id: "TTL01",
    icon: "🚦",
    cat: "ttl",
    diff: "basico",
    title: "Tablas de Verdad Físicas — Las 5 Compuertas TTL",
    short: "AND, OR, NOT, NAND, XOR con LEDs y pulsadores. La base de toda electrónica digital.",
    desc: "El primer paso en lógica digital. Conecta cada IC TTL, aplica combinaciones de entrada con pulsadores y observa la salida en LEDs. Verifica cada fila de la tabla de verdad físicamente. Entiende la diferencia entre lógica positiva y negativa.",
    tags: ["AND", "OR", "NOT", "NAND", "XOR", "Álgebra de Boole"],
    hw: "74LS08 + 74LS32 + 74LS04 + 74LS00 + 74LS86 + LEDs + Resistencias 220Ω + Protoboard",
    cost: "~$0",
    status: "pendiente",
    steps: [
      "Alimentar ICs a 5V con LM7805 + cap desacoplamiento 100nF en cada VCC",
      "AND (74LS08): verificar A·B con las 4 combinaciones posibles (00,01,10,11)",
      "OR (74LS32): verificar A+B — observar que solo 0,0→0",
      "NOT (74LS04): verificar A' — el inversor más simple",
      "NAND (74LS00): verificar (A·B)' — demostrar que NAND es universal",
      "XOR (74LS86A): verificar A⊕B — suma sin acarreo, detector de diferencia",
    ],
    skills: ["Álgebra de Boole", "TTL 74LS", "Tablas de verdad", "Electrónica digital"],
    concept: "Las compuertas TTL operan con lógica positiva: 0V≈0 lógico, 5V≈1 lógico. En la práctica, cualquier voltaje <0.8V se lee como 0 y >2V se lee como 1. Este margen de ruido es la robustez del estándar TTL.",
    insight: "La compuerta NAND es 'universal': puedes construir cualquier función lógica usando solo compuertas NAND. Los primeros microprocesadores estaban construidos casi exclusivamente con NANDs.",
  },
  {
    id: "F01",
    icon: "🎯",
    cat: "expfis",
    diff: "medio",
    title: "Ley de Newton II — Plano Inclinado",
    short: "Calcula a=g·sin(θ)-μg·cos(θ). Mide con HC-SR04. Grafica error vs ángulo.",
    desc: "Antes de construir nada: calcula teóricamente la aceleración para 5 ángulos. Luego construye el plano, mide con HC-SR04 la posición vs tiempo y calcula la aceleración real. Grafica el error porcentual vs ángulo.",
    tags: ["Dinámica", "HC-SR04", "Regresión", "Rozamiento"],
    hw: "RPi5 + HC-SR04 + Plano inclinado de madera + Bisagra ajustable + Transportador",
    cost: "~$6",
    status: "pendiente",
    steps: [
      "TEÓRICO: Calcular a=g·sin(θ)-μ·g·cos(θ) para θ=10°,20°,30°,45°,60°",
      "TEÓRICO: Estimar tiempo de recorrido con cinemática para d=0.5m",
      "Construir plano inclinado con bisagra ajustable y transportador",
      "HC-SR04 mide posición cada 50ms → calcular velocidad y aceleración real",
      "Ajustar μ (coeficiente de rozamiento) con scipy.optimize",
      "Graficar: teoría vs medición, error %, efecto de rozamiento en cada ángulo",
    ],
    skills: ["Mecánica clásica", "NumPy", "HC-SR04", "scipy.optimize", "Matplotlib"],
    concept: "La aceleración real es menor que g·sin(θ) por el rozamiento cinético. El coeficiente μk se puede extraer comparando la aceleración medida con la teórica sin rozamiento.",
    insight: "Típicamente el error es 5-15% por rozamiento y error de medición. El proyecto enseña a modelar imperfecciones reales que los libros de texto suelen ignorar.",
  },
  {
    id: "I01",
    icon: "👁️",
    cat: "ia",
    diff: "medio",
    title: "Visión YOLOv8n — Detección en Tiempo Real",
    short: "YOLOv8 Nano con ONNX Runtime en RPi5. Cámara CSI. 15+ FPS.",
    desc: "YOLOv8 Nano corriendo con ONNX Runtime sobre RPi5. Detecta personas, objetos y anomalías en tiempo real desde la cámara CSI. Base para proyectos de seguridad, clasificación ambiental o automatización.",
    tags: ["YOLOv8", "ONNX", "OpenCV", "Cámara CSI"],
    hw: "RPi5 + Cámara CSI módulo 3",
    cost: "~$15",
    status: "pendiente",
    steps: [
      "Instalar ONNX Runtime ARM64 + Picamera2 en RPi5",
      "Descargar YOLOv8n exportado en formato ONNX",
      "Capturar frames desde la cámara CSI e inferir en tiempo real",
      "Dibujar bounding boxes y etiquetas sobre el frame",
      "Optimizar con ONNX Runtime session options para ARM",
      "Extender: detector de intrusos, clasificador de residuos sólidos",
    ],
    skills: ["YOLOv8", "ONNX Runtime", "OpenCV", "Picamera2", "Python"],
    concept: "ONNX (Open Neural Network Exchange) permite ejecutar modelos entrenados en PyTorch directamente en hardware embebido sin necesidad de GPU, usando optimizaciones para CPU ARM.",
    insight: "YOLOv8n (nano) logra el balance perfecto entre velocidad y precisión para hardware limitado: 15+ FPS en RPi5 con detección de 80 clases de objetos.",
  },
  {
    id: "M01",
    icon: "🖊️",
    cat: "maker",
    diff: "medio",
    title: "Plotter CNC — Lectoras de CD/DVD Recicladas",
    short: "2 motores paso a paso de lectoras viejas trazan vectores G-code. Arduino + GRBL.",
    desc: "Los rieles de las lectoras de CD tienen motores paso a paso de precisión. Conectados en X e Y, con servo para el marcador, forman un plotter XY controlado por G-code desde el RPi5. El costo es casi cero usando materiales reciclados.",
    tags: ["CNC", "G-code", "GRBL", "CD/DVD", "Reciclado"],
    hw: "2× Lectora CD/DVD + Arduino UNO + Driver A4988 + Servo SG90 + RPi5",
    cost: "~$5",
    status: "pendiente",
    steps: [
      "Desmontar 2 lectoras de CD, extraer rieles y motores paso a paso",
      "Construir estructura XY con madera o perfiles de aluminio reciclados",
      "Arduino UNO + drivers A4988 controlan cada eje (X e Y)",
      "Servo SG90 levanta/baja el marcador (eje Z)",
      "RPi5 convierte archivos SVG a G-code con Inkscape + plugin",
      "Calibrar pasos/mm y hacer pruebas con figuras geométricas básicas",
    ],
    skills: ["G-code", "GRBL", "Arduino", "Motores paso a paso", "Mecatrónica"],
    concept: null,
    insight: "Los rieles de lectoras CD tienen precisión de ~0.01mm por paso — mayor que muchos CNC comerciales de bajo costo. La electrónica de precisión está literalmente en la basura.",
  },
];

// Helper para obtener todos los proyectos
export const getAllProjects = () => projectsData;

// Helper para filtrar por categoría
export const getProjectsByCategory = (cat) =>
  cat === "all" ? projectsData : projectsData.filter((p) => p.cat === cat);

// Helper para obtener un proyecto por id
export const getProjectById = (id) => projectsData.find((p) => p.id === id);