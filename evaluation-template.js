// Plantilla de evaluación vacía (sin backend, datos planos)
// Esta estructura servirá como base para crear nuevas evaluaciones dinámicamente.
// Más adelante se agregarán funciones para guardar, listar y editar.

(function(global){
  const timestamp = () => new Date().toISOString();

  // Definiciones base (evitamos repetir strings en futuras funciones)
  const MCCALL_CAPACITIES = {
    operacion: { weight: 0.4, factors: ['correccion','confiabilidad','usabilidad','seguridad'] },
    transicion: { weight: 0.3, factors: ['portabilidad','reusabilidad','interoperabilidad'] },
    revision:  { weight: 0.3, factors: ['mantenimiento','flexibilidad','prueba'] }
  };

  const MCCALL_METRICS = {
    completitud:   { label: 'Compleción de funciones', expected: 4, obtained: null },
    complejidad:   { label: 'Complejidad', expected: 3, obtained: null },
    concision:     { label: 'Concisión', expected: 3, obtained: null },
    consistencia:  { label: 'Consistencia', expected: 4, obtained: null },
    eficiencia:    { label: 'Eficiencia de ejecución', expected: 3, obtained: null },
    seguridad:     { label: 'Seguridad', expected: 4, obtained: null },
    simplicidad:   { label: 'Simplicidad', expected: 4, obtained: null },
    independencia: { label: 'Independencia del software', expected: 4, obtained: null },
    estandarizacion:{ label: 'Estandarización de datos', expected: 3, obtained: null },
    exactitud:     { label: 'Exactitud de cálculo y control', expected: 4, obtained: null },
    operatividad:  { label: 'Operatividad', expected: 4, obtained: null },
    modularidad:   { label: 'Modularidad', expected: 4, obtained: null }
  };

  const MCCALL_FACTORS = {
    correccion:        { metrics: ['completitud','exactitud','operatividad'], score: null },
    confiabilidad:     { metrics: ['concision','eficiencia','exactitud'], score: null },
    usabilidad:        { metrics: ['consistencia','simplicidad'], score: null },
    seguridad:         { metrics: ['seguridad'], score: null },
    portabilidad:      { metrics: ['independencia','estandarizacion'], score: null },
    reusabilidad:      { metrics: ['modularidad'], score: null },
    interoperabilidad: { metrics: ['independencia','estandarizacion'], score: null },
    mantenimiento:     { metrics: ['complejidad','modularidad'], score: null },
    flexibilidad:      { metrics: ['complejidad','simplicidad'], score: null },
    prueba:            { metrics: ['complejidad','modularidad'], score: null }
  };

  // Boehm (estructura jerárquica simplificada)
  const BOEHM_LEVELS = {
    alto: { groups: ['utilidad_general','mantenibilidad','portabilidad'] },
    intermedio: { groups: ['fiabilidad','eficiencia','interactividad','facilidad_prueba','facilidad_entendimiento','modificabilidad'] },
    primitivo: { groups: [] } // Las primitivas se listan abajo
  };

  const BOEHM_PRIMITIVES = {
    // Portabilidad
    independencia: { group: 'portabilidad', expected: 5, obtained: null },
    auto_contencion: { group: 'portabilidad', expected: 5, obtained: null },
    // Fiabilidad
    precision: { group: 'fiabilidad', expected: 40, obtained: null },
    completitud: { group: 'fiabilidad', expected: null, obtained: null },
    robustez: { group: 'fiabilidad', expected: null, obtained: null },
    consistencia: { group: 'fiabilidad', expected: null, obtained: null },
    // Eficiencia
    responsabilidad: { group: 'eficiencia', expected: 15, obtained: null },
    eficiencia_dispositivos: { group: 'eficiencia', expected: null, obtained: null },
    accesibilidad: { group: 'eficiencia', expected: null, obtained: null },
    // Interactividad
    robustez_int: { group: 'interactividad', expected: 15, obtained: null },
    accesibilidad_int: { group: 'interactividad', expected: null, obtained: null },
    comunicacion: { group: 'interactividad', expected: null, obtained: null },
    // Facilidad de prueba
    auto_descripcion: { group: 'facilidad_prueba', expected: 5, obtained: null },
    estructuracion_prueba: { group: 'facilidad_prueba', expected: null, obtained: null },
    // Facilidad de entendimiento
    concision: { group: 'facilidad_entendimiento', expected: 10, obtained: null },
    legibilidad: { group: 'facilidad_entendimiento', expected: null, obtained: null },
    // Modificabilidad
    estructuracion_mod: { group: 'modificabilidad', expected: 5, obtained: null },
    escalabilidad: { group: 'modificabilidad', expected: null, obtained: null }
  };

  // FURPS
  const FURPS_CATEGORIES = {
    funcionalidad: { weight: 0.30, factors: ['caracteristicas','generalidad','seguridad'] },
    usabilidad:    { weight: 0.20, factors: ['capacidad_prueba','configuracion','compatibilidad','instalacion'] },
    fiabilidad:    { weight: 0.15, factors: ['fallos','exactitud','prediccion'] },
    rendimiento:   { weight: 0.20, factors: ['humanos','esteticos','consistencia','documentacion'] },
    soporte:       { weight: 0.15, factors: ['velocidad','respuesta','recursos','efectivo','eficacia'] }
  };

  const FURPS_FACTORS = {
    caracteristicas: { expected: 4, obtained: null },
    generalidad: { expected: 4, obtained: null },
    seguridad: { expected: 4, obtained: null },
    capacidad_prueba: { expected: 4, obtained: null },
    configuracion: { expected: 4, obtained: null },
    compatibilidad: { expected: 4, obtained: null },
    instalacion: { expected: 4, obtained: null },
    fallos: { expected: 4, obtained: null },
    exactitud: { expected: 4, obtained: null },
    prediccion: { expected: 4, obtained: null },
    humanos: { expected: 4, obtained: null },
    esteticos: { expected: 4, obtained: null },
    consistencia: { expected: 4, obtained: null },
    documentacion: { expected: 4, obtained: null },
    velocidad: { expected: 4, obtained: null },
    respuesta: { expected: 4, obtained: null },
    recursos: { expected: 4, obtained: null },
    efectivo: { expected: 4, obtained: null },
    eficacia: { expected: 4, obtained: null }
  };

  function createEmptyEvaluation(){
    return {
      id: null,          // se asignará más adelante (por ejemplo incremental en localStorage)
      name: '',          // nombre interno de la evaluación
      target: {          // RED objetivo
        name: '',        // Ej: "Rappi"
        url: ''
      },
      createdAt: timestamp(),
      updatedAt: timestamp(),
      models: {
        mccall: {
          capacities: JSON.parse(JSON.stringify(MCCALL_CAPACITIES)),
            // Clonar para evitar mutaciones a plantillas
          factors: JSON.parse(JSON.stringify(MCCALL_FACTORS)),
          metrics: JSON.parse(JSON.stringify(MCCALL_METRICS)),
          matrix: {},          // asociaciones dinámicas (metric-factor) si se requiere guardar
          globalScore: null,
          completeness: 0
        },
        boehm: {
          levels: JSON.parse(JSON.stringify(BOEHM_LEVELS)),
          primitives: JSON.parse(JSON.stringify(BOEHM_PRIMITIVES)),
          groupScores: {},  // se calcularán
          levelScores: {},  // se calcularán
          globalScore: null,
          completeness: 0
        },
        furps: {
          categories: JSON.parse(JSON.stringify(FURPS_CATEGORIES)),
          factors: JSON.parse(JSON.stringify(FURPS_FACTORS)),
          categoryScores: {},
          globalScore: null,
          completeness: 0
        }
      },
      summary: {
        overallScore: null,
        conclusion: ''
      },
      meta: {
        version: 1,
        template: true
      }
    };
  }

  // Exponer en el ámbito global por ahora.
  global.EVALUATION_TEMPLATE_FACTORY = {
    createEmptyEvaluation,
    definitions: {
      MCCALL_CAPACITIES,
      MCCALL_METRICS,
      MCCALL_FACTORS,
      BOEHM_LEVELS,
      BOEHM_PRIMITIVES,
      FURPS_CATEGORIES,
      FURPS_FACTORS
    }
  };
})(window);
