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
});