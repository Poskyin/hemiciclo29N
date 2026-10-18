# Two-Hemiciclo 29N

Web informativa sobre las elecciones generales del 29 de noviembre de 2026: programas de los partidos, comparador por temas, encuestas, simulador de escaños del Congreso, proyección del Senado y mapa por provincias y comunidades.

- **Página:** `index.html` (un solo archivo, sin dependencias; Vercel la sirve como sitio estático).
- **Código fuente:** carpeta `src/`
  - `data.js`: partidos, programas, encuestas, calendario, pactos y alianzas.
  - `model.js`: modelo de escaños (resultados de 2023 por provincia + swing proporcional + D'Hondt) y proyección del Senado.
  - `mapdata.js`: contornos de provincias y comunidades, generados con es-atlas.
  - `app.js`, `style.css` y `template.html`: interfaz.
- **Regenerar la página:** `python3 build.py --site`


Datos actualizados el 18 de octubre de 2026.
