// Agregar campo uml_data a cada diagrama en software.data.js

// ── QUÍMICA — Diagrama de Clases ────────────────────────────
export const UML_QUIMICA_CLASES = {
  classes: [
    {
      id: "QuimicaController",
      name: "QuimicaController",
      type: "class",
      attributes: [],
      methods: [
        "+ analizarFormula(formula: String): ResultadoAnalisis",
        "+ validarFormula(formula: String): Boolean",
        "+ obtenerPregunta(): PreguntaQuiz",
      ],
    },
    {
      id: "NomenclaturService",
      name: "NomenclaturService",
      type: "class",
      attributes: ["- elementosDB: ElementosDB"],
      methods: [
        "+ analizar(atomos: Map, formula: String): ResultadoAnalisis",
        "+ classify(atomos: Map): String",
        "+ toIUPAC(atomos: Map, tipo: String): String",
        "+ toStock(atomos: Map, tipo: String): String",
        "+ toTradicional(atomos: Map): String",
      ],
    },
    {
      id: "BalanceoService",
      name: "BalanceoService",
      type: "class",
      attributes: [],
      methods: [
        "+ balancear(formula: String): String",
        "+ verificarBalance(atomos: Map): Boolean",
      ],
    },
    {
      id: "QuizService",
      name: "QuizService",
      type: "class",
      attributes: ["- nomenclaturService: NomenclaturService"],
      methods: [
        "+ generarPregunta(): PreguntaQuiz",
        "+ verificarRespuesta(id: String, resp: String): Boolean",
      ],
    },
    {
      id: "FormulaVisitor",
      name: "FormulaVisitor",
      type: "class",
      attributes: ["- atomos: Map<String, Integer>", "- multiplicador: int"],
      methods: [
        "+ visitFormula(ctx): Map",
        "+ visitGrupoParentesis(ctx): void",
        "+ visitElementoConSubindice(ctx): void",
        "+ getAtomos(): Map<String, Integer>",
      ],
    },
    {
      id: "ElementosDB",
      name: "ElementosDB",
      type: "class",
      attributes: ["- elementos: Map<String, ElementoInfo>"],
      methods: [
        "+ esMetal(simbolo: String): Boolean",
        "+ esNoMetal(simbolo: String): Boolean",
        "+ getEstadosOxidacion(simbolo: String): int[]",
        "+ getNombre(simbolo: String): String",
      ],
    },
    {
      id: "ResultadoAnalisis",
      name: "ResultadoAnalisis",
      type: "class",
      attributes: [
        "+ formula: String",
        "+ tipo: String",
        "+ nombreIUPAC: String",
        "+ nombreStock: String",
        "+ nombreTradicional: String",
        "+ pasos: List<String>",
        "+ atomos: Map<String, Integer>",
      ],
      methods: [],
    },
    {
      id: "ElementoInfo",
      name: "ElementoInfo",
      type: "class",
      attributes: [
        "+ simbolo: String",
        "+ nombre: String",
        "+ numeroAtomico: int",
        "+ esMetal: Boolean",
        "+ estadosOxidacion: int[]",
      ],
      methods: [],
    },
    {
      id: "PreguntaQuiz",
      name: "PreguntaQuiz",
      type: "class",
      attributes: [
        "+ id: String",
        "+ formula: String",
        "+ pregunta: String",
        "+ opciones: List<String>",
        "+ respuestaCorrecta: String",
      ],
      methods: [],
    },
  ],
  relations: [
    {
      from: "QuimicaController",
      to: "NomenclaturService",
      type: "use",
      label: "usa",
    },
    { from: "QuimicaController", to: "QuizService", type: "use", label: "usa" },
    {
      from: "NomenclaturService",
      to: "ElementosDB",
      type: "association",
      label: "",
    },
    {
      from: "NomenclaturService",
      to: "ResultadoAnalisis",
      type: "use",
      label: "retorna",
    },
    {
      from: "QuizService",
      to: "NomenclaturService",
      type: "association",
      label: "",
    },
    { from: "QuizService", to: "PreguntaQuiz", type: "use", label: "genera" },
    {
      from: "QuimicaController",
      to: "FormulaVisitor",
      type: "use",
      label: "instancia",
    },
    {
      from: "ElementosDB",
      to: "ElementoInfo",
      type: "association",
      label: "1..*",
      toLabel: "*",
    },
  ],
};

// ── QUÍMICA — Casos de Uso ──────────────────────────────────
export const UML_QUIMICA_CU = {
  systemName: "Analizador de Nomenclatura Química",
  actors: [{ id: "estudiante", name: "Estudiante" }],
  usecases: [
    { id: "CU1", name: "Analizar fórmula química", rx: 80, ry: 26 },
    { id: "CU2", name: "Validar fórmula", rx: 65, ry: 24 },
    { id: "CU3", name: "Responder quiz", rx: 65, ry: 24 },
    { id: "CU4", name: "Ver pasos de razonamiento", rx: 80, ry: 26 },
    { id: "CU5", name: "Ver nomenclatura IUPAC", rx: 75, ry: 24 },
    { id: "CU6", name: "Ver nomenclatura Stock", rx: 72, ry: 24 },
    { id: "CU7", name: "Ver nomenclatura Tradicional", rx: 82, ry: 26 },
  ],
  relations: [
    { from: "estudiante", to: "CU1", type: "association" },
    { from: "estudiante", to: "CU2", type: "association" },
    { from: "estudiante", to: "CU3", type: "association" },
    { from: "CU1", to: "CU4", type: "include", label: "include" },
    { from: "CU1", to: "CU5", type: "include", label: "include" },
    { from: "CU1", to: "CU6", type: "include", label: "include" },
    { from: "CU1", to: "CU7", type: "include", label: "include" },
  ],
};

// ── QUÍMICA — Secuencia: Analizar Fórmula ──────────────────
export const UML_QUIMICA_SEQ = {
  participants: [
    { id: "est", name: "Estudiante", type: "actor" },
    { id: "react", name: "React", label: "Frontend" },
    { id: "ctrl", name: "QuimicaController", label: "Spring Boot" },
    { id: "visitor", name: "FormulaVisitor", label: "ANTLR4" },
    { id: "service", name: "NomenclaturService", label: "Service" },
    { id: "elemdb", name: "ElementosDB", label: "In-Memory" },
  ],
  messages: [
    { from: "est", to: "react", label: "ingresa formula", type: "sync" },
    { from: "react", to: "ctrl", label: "POST /api/analizar", type: "sync" },
    {
      from: "ctrl",
      to: "visitor",
      label: "new FormulaVisitor()",
      type: "sync",
    },
    {
      from: "visitor",
      to: "visitor",
      label: "parse .g4 → árbol",
      type: "sync",
    },
    {
      from: "visitor",
      to: "ctrl",
      label: "Map<átomo, cantidad>",
      type: "return",
    },
    {
      from: "ctrl",
      to: "service",
      label: "analizar(atomos, formula)",
      type: "sync",
    },
    {
      from: "service",
      to: "elemdb",
      label: "getEstadosOxidacion()",
      type: "sync",
    },
    { from: "elemdb", to: "service", label: "int[] estados", type: "return" },
    {
      from: "service",
      to: "service",
      label: "classify() + toIUPAC()",
      type: "sync",
    },
    { from: "service", to: "ctrl", label: "ResultadoAnalisis", type: "return" },
    { from: "ctrl", to: "react", label: "JSON response 200", type: "return" },
    {
      from: "react",
      to: "est",
      label: "muestra IUPAC · Stock · Tradicional",
      type: "return",
    },
  ],
};

// ── LABORATORIO — Diagrama de Clases ────────────────────────
export const UML_LAB_CLASES = {
  classes: [
    {
      id: "Usuario",
      name: "Usuario",
      type: "class",
      attributes: [
        "+ id: int",
        "+ nombre: String",
        "+ email: String",
        "+ passwordHash: String",
        "+ rol: Rol",
      ],
      methods: [
        "+ login(email, pass): Token",
        "+ hasPermission(action): Boolean",
      ],
    },
    {
      id: "Practica",
      name: "Practica",
      type: "class",
      attributes: [
        "+ id: int",
        "+ nombre: String",
        "+ descripcion: String",
        "+ fecha: Date",
        "+ docente_id: int",
      ],
      methods: ["+ create(data): Practica", "+ getGrupos(): Grupo[]"],
    },
    {
      id: "Grupo",
      name: "Grupo",
      type: "class",
      attributes: ["+ id: int", "+ practica_id: int", "+ nombre: String"],
      methods: [
        "+ getEstudiantes(): Usuario[]",
        "+ registrarAsistencia(data): void",
      ],
    },
    {
      id: "Equipo",
      name: "Equipo",
      type: "class",
      attributes: [
        "+ id: int",
        "+ codigo: String",
        "+ nombre: String",
        "+ estado: EstadoEquipo",
        "+ foto_url: String",
      ],
      methods: [
        "+ actualizarEstado(estado): void",
        "+ subirFoto(file): String",
      ],
    },
    {
      id: "Asistencia",
      name: "Asistencia",
      type: "class",
      attributes: [
        "+ id: int",
        "+ estudiante_id: int",
        "+ practica_id: int",
        "+ presente: Boolean",
        "+ fecha: Date",
      ],
      methods: [],
    },
    {
      id: "ReporteService",
      name: "ReporteService",
      type: "class",
      attributes: ["- r2Client: S3Client"],
      methods: [
        "+ generarAsistencia(practica_id): Buffer",
        "+ generarInventario(): Buffer",
        "+ subirR2(buffer, nombre): String",
      ],
    },
  ],
  relations: [
    {
      from: "Usuario",
      to: "Practica",
      type: "association",
      label: "crea",
      fromLabel: "1",
      toLabel: "*",
    },
    {
      from: "Practica",
      to: "Grupo",
      type: "association",
      label: "tiene",
      fromLabel: "1",
      toLabel: "*",
    },
    {
      from: "Grupo",
      to: "Usuario",
      type: "association",
      label: "inscribe",
      fromLabel: "*",
      toLabel: "*",
    },
    {
      from: "Practica",
      to: "Equipo",
      type: "association",
      label: "usa",
      fromLabel: "*",
      toLabel: "*",
    },
    {
      from: "Practica",
      to: "Asistencia",
      type: "association",
      label: "",
      fromLabel: "1",
      toLabel: "*",
    },
    {
      from: "Usuario",
      to: "Asistencia",
      type: "association",
      label: "",
      fromLabel: "1",
      toLabel: "*",
    },
    { from: "ReporteService", to: "Practica", type: "use", label: "consulta" },
    {
      from: "ReporteService",
      to: "Asistencia",
      type: "use",
      label: "consulta",
    },
  ],
};

// ── LABORATORIO — Casos de Uso ──────────────────────────────
export const UML_LAB_CU = {
  systemName: "Sistema de Gestión de Laboratorio",
  actors: [
    { id: "admin", name: "Administrador" },
    { id: "docente", name: "Docente" },
  ],
  usecases: [
    { id: "CU1", name: "Iniciar sesión", rx: 65, ry: 22 },
    { id: "CU2", name: "Gestionar usuarios", rx: 70, ry: 22 },
    { id: "CU3", name: "Crear práctica", rx: 60, ry: 22 },
    { id: "CU4", name: "Registrar asistencia", rx: 72, ry: 22 },
    { id: "CU5", name: "Gestionar equipos", rx: 68, ry: 22 },
    { id: "CU6", name: "Generar reporte PDF", rx: 72, ry: 22 },
    { id: "CU7", name: "Asignar estudiantes", rx: 70, ry: 22 },
  ],
  relations: [
    { from: "admin", to: "CU1", type: "association" },
    { from: "admin", to: "CU2", type: "association" },
    { from: "admin", to: "CU5", type: "association" },
    { from: "admin", to: "CU6", type: "association" },
    { from: "docente", to: "CU1", type: "association" },
    { from: "docente", to: "CU3", type: "association" },
    { from: "docente", to: "CU4", type: "association" },
    { from: "docente", to: "CU6", type: "association" },
    { from: "docente", to: "CU7", type: "association" },
    { from: "CU3", to: "CU7", type: "include", label: "include" },
  ],
};

// ── LABORATORIO — Secuencia: Registro de Práctica ──────────
export const UML_LAB_SEQ = {
  participants: [
    { id: "doc", name: "Docente", type: "actor" },
    { id: "react", name: "React SPA", label: "Frontend" },
    { id: "api", name: "Express API", label: "Backend" },
    { id: "jwt", name: "JWT Middleware", label: "Auth" },
    { id: "db", name: "MySQL 8", label: "Database" },
  ],
  messages: [
    {
      from: "doc",
      to: "react",
      label: "llena form Nueva Práctica",
      type: "sync",
    },
    {
      from: "react",
      to: "api",
      label: "POST /practicas + Bearer JWT",
      type: "sync",
    },
    { from: "api", to: "jwt", label: "jwt.verify(token)", type: "sync" },
    {
      from: "jwt",
      to: "api",
      label: "{ userId, rol: docente }",
      type: "return",
    },
    { from: "api", to: "db", label: "INSERT INTO practicas", type: "sync" },
    { from: "db", to: "api", label: "practica_id: 42", type: "return" },
    { from: "api", to: "db", label: "INSERT asignacion equipos", type: "sync" },
    { from: "db", to: "api", label: "OK", type: "return" },
    {
      from: "api",
      to: "react",
      label: "201 Created { practica_id }",
      type: "return",
    },
    { from: "react", to: "doc", label: "muestra confirmación", type: "return" },
  ],
};
