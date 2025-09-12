// Script para la web de análisis de modelos de calidad

document.addEventListener('DOMContentLoaded', function() {
    const resultadosDiv = document.getElementById('resultados-contenido');

    // Función para calcular resultados
    function calcularResultados() {
        const resultados = {
            mccall: calcularModelo('mccall'),
            boehm: calcularModelo('boehm'),
            furps: calcularModelo('furps')
        };

        mostrarResultados(resultados);
    }

    // Función para calcular promedio de un modelo
    function calcularModelo(modelo) {
        const radios = document.querySelectorAll(`input[name^="${modelo}-"]:checked`);
        if (radios.length === 0) return { promedio: 0, completado: false };

        const suma = Array.from(radios).reduce((sum, radio) => sum + parseInt(radio.value), 0);
        const promedio = (suma / radios.length).toFixed(2);

        return {
            promedio: parseFloat(promedio),
            completado: radios.length > 0
        };
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
        if (e.target.type === 'radio' && e.target.name.startsWith('mccall-') || e.target.name.startsWith('boehm-') || e.target.name.startsWith('furps-')) {
            calcularResultados();
        }
    });

    // Event listener para el botón de calcular
    const calcularBtn = document.getElementById('calcular-btn');
    if (calcularBtn) {
        calcularBtn.addEventListener('click', calcularResultados);
    }
});