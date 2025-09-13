# Aplicación de Modelos de Calidad (Informe estático)

Sitio web académico para documentar la evaluación de una RED (p. ej. Rappi) aplicando los modelos de calidad McCall, Boehm y FURPS. El proyecto está en modo 100% estático: no hay backend, no hay almacenamiento en `localStorage`, ni lógica dinámica.

## Estado actual
- Página única (`index.html`) con secciones descriptivas de los tres modelos.
- Plantilla McCall ajustada a formato de informe estático:
  - “Capacidades y Factores de Calidad” con puntajes fijos (10 por factor) y “Puntaje Total Global” de 100.
  - “Relación entre Factores de Calidad y Métricas de la Calidad” colocada antes del “Cuestionario de Evaluación”, con la matriz estática según la plantilla proporcionada.
  - “Cuestionario de Evaluación” mostrado a continuación. Los controles visuales están deshabilitados y solo cumplen función expositiva.
- Estilos en `styles.css`. No se carga ningún JavaScript.

## Cómo ver el informe
1. Abre el archivo `index.html` en tu navegador.
2. Navega por las secciones con el menú superior.

## Cómo editar el contenido
Todo el contenido es plano y se modifica directamente en `index.html`:
- Título, presentación y enlaces: sección `#presentacion`.
- Descripción de los modelos: sección `#modelos`.
- Plantilla McCall: sección `#evaluacion` → artículo `#plantilla-mccall`.
  - Capacidades y puntajes: bloque “Capacidades y Factores de Calidad”. Para cambiar algún valor, edita los números en los elementos `<span>` correspondientes o el total mostrado.
  - Matriz “Relación entre Factores de Calidad y Métricas de la Calidad”: edita las celdas de la tabla según sea necesario (valores numéricos o marcadores “•” de relación).
  - “Cuestionario de Evaluación”: actualmente los `<select>` están deshabilitados por CSS (modo informe). Si deseas convertirlos en texto plano, reemplaza cada `<select>` por el valor esperado en una `<td>`.

Sugerencia: guarda un respaldo antes de hacer cambios grandes, ya que no hay lógica de cálculo ni validaciones automáticas.

## Estructura del proyecto
- `index.html`: contenido del informe.
- `styles.css`: estilos visuales y bloqueo de interactividad (modo informe).
- `script.js`: no se utiliza en el modo actual.
- `Plantilla modelo ejemplo/` y `Plantilla modelos/`: materiales de referencia.

## Alcances y limitaciones
- No hay persistencia ni cálculos automáticos; es un documento estático de presentación.
- La puntuación 10/100 se muestra fija por petición. Cambia los números manualmente si necesitas reflejar otro resultado.
- La matriz de relación y el cuestionario son expositivos; no realizan operaciones.

## Próximos pasos (opcionales)
Si en el futuro quieres volver a un modo interactivo:
- Reemplazar los `<select>` del cuestionario por entradas activas y vincular cálculos.
- Añadir lógica con JavaScript para calcular puntajes por factor y puntaje global.
- (Opcional) Reintroducir almacenamiento en `localStorage` o un backend con SQLite según sea necesario.

—
Si quieres que dejemos el informe con texto plano (sin `<select>`) o que extendamos el mismo formato a Boehm y FURPS, indícalo y lo aplicamos.
