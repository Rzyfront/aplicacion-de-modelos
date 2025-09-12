// Script para la web de análisis de modelos de calidad

document.addEventListener('DOMContentLoaded', function() {
    const resultadosDiv = document.getElementById('resultados-contenido');

    // Función para calcular resultados
    function calcularResultados() {
        const resultados = {
            mccall: calcularModeloMcCall(),
            boehm: calcularModeloBoehm(),
            furps: calcularModeloFURPS()
        };

        mostrarResultados(resultados);
    }

    // Función para calcular modelo McCall
    function calcularModeloMcCall() {
        const selects = document.querySelectorAll('.puntaje-mccall');
        let suma = 0;
        let completados = 0;

        selects.forEach(select => {
            const valor = parseInt(select.value) || 0;
            if (valor > 0) {
                suma += valor;
                completados++;
            }
        });

        const promedio = completados > 0 ? (suma / completados).toFixed(2) : 0;

        return {
            promedio: parseFloat(promedio),
            completado: completados > 0
        };
    }

    // Función para calcular modelo Boehm
    function calcularModeloBoehm() {
        const selects = document.querySelectorAll('.puntaje-boehm');
        let suma = 0;
        let completados = 0;

        selects.forEach(select => {
            const valor = parseInt(select.value) || 0;
            if (valor > 0) {
                suma += valor;
                completados++;
            }
        });

        const promedio = completados > 0 ? (suma / completados).toFixed(2) : 0;

        return {
            promedio: parseFloat(promedio),
            completado: completados > 0
        };
    }

    // Función para calcular modelo FURPS
    function calcularModeloFURPS() {
        const selects = document.querySelectorAll('.puntaje-furps');
        let suma = 0;
        let completados = 0;

        selects.forEach(select => {
            const valor = parseInt(select.value) || 0;
            if (valor > 0) {
                suma += valor;
                completados++;
            }
        });

        const promedio = completados > 0 ? (suma / completados).toFixed(2) : 0;

        return {
            promedio: parseFloat(promedio),
            completado: completados > 0
        };
    }

    // Función para actualizar tabla de equivalencia McCall
    function actualizarTablaMcCall() {
        const caracteristicas = ['correctitud', 'fiabilidad', 'eficiencia', 'seguridad', 'facilidad-mantenimiento', 'facilidad-prueba', 'facilidad-comprension', 'facilidad-modificacion', 'portabilidad'];

        caracteristicas.forEach(caracteristica => {
            const select = document.querySelector(`[data-caracteristica="${caracteristica}"]`);
            if (select) {
                const valor = parseInt(select.value) || 0;
                const esperado = 4; // Puntaje esperado siempre es 4
                const total = (valor * esperado) / 4;

                document.getElementById(`mccall-${caracteristica}-obtenido`).textContent = valor;
                document.getElementById(`mccall-${caracteristica}-total`).textContent = total.toFixed(2);
            }
        });

        // Calcular totales por nivel
        const niveles = ['primitivo', 'intermedio', 'alto'];
        niveles.forEach(nivel => {
            const selectsNivel = document.querySelectorAll(`[data-nivel="${nivel}"]`);
            let sumaNivel = 0;
            let countNivel = 0;

            selectsNivel.forEach(select => {
                const valor = parseInt(select.value) || 0;
                if (valor > 0) {
                    sumaNivel += valor;
                    countNivel++;
                }
            });

            if (countNivel > 0) {
                const promedioNivel = sumaNivel / countNivel;
                document.getElementById(`mccall-${nivel}-total`).textContent = promedioNivel.toFixed(2);
            }
        });
    }

    // Función para actualizar tabla de equivalencia Boehm
    function actualizarTablaBoehm() {
        const caracteristicas = ['utilidad', 'fiabilidad', 'eficiencia', 'usabilidad', 'mantenibilidad', 'portabilidad', 'reusabilidad', 'testabilidad'];

        caracteristicas.forEach(caracteristica => {
            const select = document.querySelector(`[data-caracteristica="${caracteristica}"]`);
            if (select) {
                const valor = parseInt(select.value) || 0;
                const esperado = 4; // Puntaje esperado siempre es 4
                const total = (valor * esperado) / 4;

                document.getElementById(`boehm-${caracteristica}-obtenido`).textContent = valor;
                document.getElementById(`boehm-${caracteristica}-total`).textContent = total.toFixed(2);
            }
        });

        // Calcular totales por nivel
        const niveles = ['primitivo', 'intermedio', 'alto'];
        niveles.forEach(nivel => {
            const selectsNivel = document.querySelectorAll(`[data-nivel="${nivel}"]`);
            let sumaNivel = 0;
            let countNivel = 0;

            selectsNivel.forEach(select => {
                const valor = parseInt(select.value) || 0;
                if (valor > 0) {
                    sumaNivel += valor;
                    countNivel++;
                }
            });

            if (countNivel > 0) {
                const promedioNivel = sumaNivel / countNivel;
                document.getElementById(`boehm-${nivel}-total`).textContent = promedioNivel.toFixed(2);
            }
        });
    }

    // Función para actualizar tabla de equivalencia FURPS
    function actualizarTablaFURPS() {
        const factores = {
            funcionalidad: ['caracteristicas', 'generalidad', 'seguridad'],
            usabilidad: ['prueba', 'config', 'compatibilidad', 'instalacion'],
            fiabilidad: ['fallos', 'exactitud', 'prediccion'],
            rendimiento: ['humanos', 'esteticos', 'consistencia', 'documentacion'],
            soporte: ['velocidad', 'respuesta', 'recursos', 'efectivo', 'eficacia']
        };

        // Actualizar cada factor
        Object.keys(factores).forEach(caracteristica => {
            const factoresCaracteristica = factores[caracteristica];
            let sumaCaracteristica = 0;
            let countCaracteristica = 0;

            factoresCaracteristica.forEach(factor => {
                const select = document.querySelector(`[data-caracteristica="${caracteristica}"][data-factor="${factor}"]`);
                if (select) {
                    const valor = parseInt(select.value) || 0;
                    const esperado = 4; // Puntaje esperado siempre es 4
                    const total = (valor * esperado) / 4;

                    // Construir IDs correctos según el HTML
                    let prefijo = '';
                    if (caracteristica === 'funcionalidad') prefijo = 'func';
                    else if (caracteristica === 'usabilidad') prefijo = 'usab';
                    else if (caracteristica === 'fiabilidad') prefijo = 'fiab';
                    else if (caracteristica === 'rendimiento') prefijo = 'rend';
                    else if (caracteristica === 'soporte') prefijo = 'sop';

                    document.getElementById(`furps-${prefijo}-${factor}-obtenido`).textContent = valor;
                    document.getElementById(`furps-${prefijo}-${factor}-total`).textContent = total.toFixed(2);

                    if (valor > 0) {
                        sumaCaracteristica += total;
                        countCaracteristica++;
                    }
                }
            });

            // Calcular total de la característica
            if (countCaracteristica > 0) {
                const promedioCaracteristica = sumaCaracteristica / countCaracteristica;
                document.getElementById(`furps-${caracteristica}-total`).textContent = promedioCaracteristica.toFixed(2);
            }
        });
    }

    // Función para mostrar resultados
    function mostrarResultados(resultados) {
        let html = '<h3>Resultados del Análisis</h3>';

        html += '<table style="width: 100%; border-collapse: collapse;">';
        html += '<tr><th style="border: 1px solid #ddd; padding: 8px;">Modelo</th><th style="border: 1px solid #ddd; padding: 8px;">Promedio</th><th style="border: 1px solid #ddd; padding: 8px;">Estado</th></tr>';

        for (const [modelo, data] of Object.entries(resultados)) {
            const nombreModelo = modelo.charAt(0).toUpperCase() + modelo.slice(1);
            const estado = data.completado ? 'Completado' : 'Incompleto';
            html += `<tr><td style="border: 1px solid #ddd; padding: 8px;">${nombreModelo}</td><td style="border: 1px solid #ddd; padding: 8px;">${data.promedio}</td><td style="border: 1px solid #ddd; padding: 8px;">${estado}</td></tr>`;
        }

        html += '</table>';

        // Calcular promedio general
        const promediosCompletados = Object.values(resultados).filter(r => r.completado).map(r => r.promedio);
        if (promediosCompletados.length > 0) {
            const promedioGeneral = (promediosCompletados.reduce((sum, p) => sum + p, 0) / promediosCompletados.length).toFixed(2);
            html += `<p><strong>Promedio General: ${promedioGeneral}</strong></p>`;
        }

        resultadosDiv.innerHTML = html;
    }

    // Event listeners para recalcular cuando cambien las selecciones
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('puntaje-mccall')) {
            actualizarTablaMcCall();
            calcularResultados();
        } else if (e.target.classList.contains('puntaje-boehm')) {
            actualizarTablaBoehm();
            calcularResultados();
        } else if (e.target.classList.contains('puntaje-furps')) {
            actualizarTablaFURPS();
            calcularResultados();
        }
    });

    // Event listener para el botón de calcular
    const calcularBtn = document.getElementById('calcular-btn');
    if (calcularBtn) {
        calcularBtn.addEventListener('click', calcularResultados);
    }

    // Calcular resultados iniciales
    calcularResultados();

    // ===== NUEVAS FUNCIONALIDADES PARA LA MATRIZ DE CONSOLIDACIÓN =====

    // Función para actualizar cálculos basados en checkboxes
    function actualizarMatrizConsolidacion() {
        const checkboxes = document.querySelectorAll('.checkbox-metrica');
        const resultadosFactores = {};

        // Inicializar contadores para cada factor
        const factores = ['correccion', 'confiabilidad', 'usabilidad', 'seguridad', 'portabilidad', 'reusabilidad', 'interoperabilidad', 'mantenimiento', 'flexibilidad', 'prueba'];
        factores.forEach(factor => {
            resultadosFactores[factor] = { total: 0, count: 0 };
        });

        // Calcular puntajes basados en checkboxes marcados
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const metrica = checkbox.dataset.metrica;
                const factor = checkbox.dataset.factor;
                const puntajeMetrica = obtenerPuntajeMetrica(metrica);

                if (puntajeMetrica > 0) {
                    resultadosFactores[factor].total += puntajeMetrica;
                    resultadosFactores[factor].count++;
                }
            }
        });

        // Calcular promedios por factor
        factores.forEach(factor => {
            const { total, count } = resultadosFactores[factor];
            const promedio = count > 0 ? (total / count).toFixed(2) : '0.00';
            actualizarPuntajeFactor(factor, promedio);
        });

        // Actualizar gráfico de resultados
        actualizarGraficoResultados();
    }

    // Función para obtener puntaje de una métrica del cuestionario
    function obtenerPuntajeMetrica(metrica) {
        const select = document.querySelector(`[data-metrica="${metrica}"]`);
        return select ? (parseInt(select.value) || 0) : 0;
    }

    // Función para actualizar puntaje de factor en la tabla de consolidación
    function actualizarPuntajeFactor(factor, promedio) {
        const elemento = document.getElementById(`mccall-${factor}`);
        if (elemento) {
            elemento.textContent = promedio;
        }
    }

    // Función para actualizar el gráfico circular de resultados
    function actualizarGraficoResultados() {
        const operacion = calcularPuntajeCapacidad('operacion');
        const transicion = calcularPuntajeCapacidad('transicion');
        const revision = calcularPuntajeCapacidad('revision');

        // Calcular porcentaje total ponderado
        const totalPonderado = (operacion * 0.4) + (transicion * 0.3) + (revision * 0.3);
        const porcentaje = Math.min(totalPonderado * 25, 100); // Convertir a porcentaje (0-100)

        // Actualizar gráfico circular
        const grafico = document.getElementById('grafico-progreso');
        grafico.style.setProperty('--porcentaje', `${porcentaje * 3.6}deg`); // 3.6 = 360/100
        grafico.textContent = `${Math.round(porcentaje)}%`;

        // Actualizar interpretación
        const interpretacion = document.getElementById('interpretacion-resultado');
        if (porcentaje >= 80) {
            interpretacion.textContent = 'Excelente calidad del software. El sistema cumple con altos estándares en todas las capacidades evaluadas.';
        } else if (porcentaje >= 60) {
            interpretacion.textContent = 'Buena calidad del software. Hay áreas que pueden mejorarse, pero el sistema es funcional y confiable.';
        } else if (porcentaje >= 40) {
            interpretacion.textContent = 'Calidad aceptable. Se requieren mejoras significativas en varias áreas para optimizar el rendimiento.';
        } else {
            interpretacion.textContent = 'Calidad deficiente. Es necesario revisar y mejorar fundamentalmente el diseño y desarrollo del software.';
        }
    }

    // Función para calcular puntaje de capacidad basado en factores
    function calcularPuntajeCapacidad(capacidad) {
        const factoresPorCapacidad = {
            operacion: ['correccion', 'confiabilidad', 'usabilidad', 'seguridad'],
            transicion: ['portabilidad', 'reusabilidad', 'interoperabilidad'],
            revision: ['mantenimiento', 'flexibilidad', 'prueba']
        };

        const factores = factoresPorCapacidad[capacidad] || [];
        let suma = 0;
        let count = 0;

        factores.forEach(factor => {
            const elemento = document.getElementById(`mccall-${factor}`);
            if (elemento) {
                const valor = parseFloat(elemento.textContent) || 0;
                if (valor > 0) {
                    suma += valor;
                    count++;
                }
            }
        });

        return count > 0 ? suma / count : 0;
    }

    // ===== FUNCIONALIDADES DE LOCALSTORAGE =====

    // Función para guardar evaluación
    function guardarEvaluacion() {
        try {
            const datosEvaluacion = {
                timestamp: new Date().toISOString(),
                cuestionario: {},
                matriz: {},
                resultados: {}
            };

            // Guardar datos del cuestionario
            document.querySelectorAll('.puntaje-mccall').forEach(select => {
                const metrica = select.dataset.metrica;
                const factor = select.dataset.factor;
                const valor = select.value;
                datosEvaluacion.cuestionario[`${factor}-${metrica}`] = valor;
            });

            // Guardar estado de checkboxes
            document.querySelectorAll('.checkbox-metrica').forEach(checkbox => {
                const metrica = checkbox.dataset.metrica;
                const factor = checkbox.dataset.factor;
                datosEvaluacion.matriz[`${metrica}-${factor}`] = checkbox.checked;
            });

            // Guardar en localStorage
            localStorage.setItem('evaluacionMcCall', JSON.stringify(datosEvaluacion));

            alert('Evaluación guardada exitosamente en el navegador.');
        } catch (error) {
            alert('Error al guardar la evaluación: ' + error.message);
        }
    }

    // Función para cargar evaluación
    function cargarEvaluacion() {
        try {
            const datosGuardados = localStorage.getItem('evaluacionMcCall');
            if (!datosGuardados) {
                alert('No se encontró ninguna evaluación guardada.');
                return;
            }

            const datosEvaluacion = JSON.parse(datosGuardados);

            // Cargar datos del cuestionario
            Object.keys(datosEvaluacion.cuestionario).forEach(key => {
                const [factor, metrica] = key.split('-');
                const select = document.querySelector(`[data-factor="${factor}"][data-metrica="${metrica}"]`);
                if (select) {
                    select.value = datosEvaluacion.cuestionario[key];
                }
            });

            // Cargar estado de checkboxes
            Object.keys(datosEvaluacion.matriz).forEach(key => {
                const [metrica, factor] = key.split('-');
                const checkbox = document.querySelector(`[data-metrica="${metrica}"][data-factor="${factor}"]`);
                if (checkbox) {
                    checkbox.checked = datosEvaluacion.matriz[key];
                }
            });

            // Recalcular todo
            actualizarTablaMcCall();
            actualizarMatrizConsolidacion();
            calcularResultados();

            alert('Evaluación cargada exitosamente.');
        } catch (error) {
            alert('Error al cargar la evaluación: ' + error.message);
        }
    }

    // Función para limpiar evaluación
    function limpiarEvaluacion() {
        if (!confirm('¿Está seguro de que desea limpiar toda la evaluación? Esta acción no se puede deshacer.')) {
            return;
        }

        try {
            // Limpiar selects del cuestionario
            document.querySelectorAll('.puntaje-mccall').forEach(select => {
                select.value = '';
            });

            // Limpiar checkboxes
            document.querySelectorAll('.checkbox-metrica').forEach(checkbox => {
                checkbox.checked = false;
            });

            // Limpiar localStorage
            localStorage.removeItem('evaluacionMcCall');

            // Recalcular todo
            actualizarTablaMcCall();
            actualizarMatrizConsolidacion();
            calcularResultados();

            alert('Evaluación limpiada exitosamente.');
        } catch (error) {
            alert('Error al limpiar la evaluación: ' + error.message);
        }
    }

    // ===== EVENT LISTENERS PARA NUEVAS FUNCIONALIDADES =====

    // Event listener para checkboxes de la matriz
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('checkbox-metrica')) {
            actualizarMatrizConsolidacion();
        }
    });

    // Hacer funciones globales para los botones
    window.guardarEvaluacion = guardarEvaluacion;
    window.cargarEvaluacion = cargarEvaluacion;
    window.limpiarEvaluacion = limpiarEvaluacion;

    // Inicializar cálculos de matriz
    actualizarMatrizConsolidacion();
});