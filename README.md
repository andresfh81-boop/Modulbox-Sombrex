# Configurador MODULBOX Sombrex (PWA offline)

App instalable en el móvil (PWA) para configurar soportes, brazos y generar el plano técnico
de toldos **MODULBOX Sombrex**. Funciona sin conexión una vez instalada. Disponible en 6
idiomas (ES/EN/FR/DE/IT/PT).

App hermana de la de MODULBOX‑400 (`Modulbox.AFH`): misma interfaz, pero con las tablas de
datos de la variante Sombrex (`Arms and brackets Modulbox_sbx_Ad.xlsx`).

## Diferencias respecto a la MODULBOX‑400

- Tablas L3 / L2 / L1 / T3 / T2 / nº kits de soporte de pared propias de Sombrex (2 y 3 brazos).
- Terminales calculados por tabla: **T3** (brazos laterales) y **T2** (brazo central, 3+ brazos),
  con ajuste de **T2 según el modelo** (OPEN → +19,5 mm; SemiOPEN → +35 mm; SemiBOX/FullBOX → sin ajuste).
- Salida hasta 3,50 m.
- **4 brazos**: aproximado con las tablas de la MODULBOX‑400 (el Excel Sombrex no trae datos de 4 brazos).
- Redondeo de línea al múltiplo de 0,25 m superior (como la MODULBOX‑400), no truncado como el Excel.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo y **vacío** en GitHub (p. ej. `Modulbox.Sombrex`).
2. Sube este contenido:
```
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```
3. En GitHub: **Settings → Pages → Source → Deploy from a branch → main / (root)**.
4. Espera 1-2 minutos. La URL será `https://TU_USUARIO.github.io/TU_REPO/`.

## Instalar en el móvil

1. Abre esa URL con el navegador del móvil (Chrome en Android, Safari en iPhone).
2. Android/Chrome: aviso "Instalar" en la propia app, o menú ⋮ → "Instalar aplicación".
3. iPhone/Safari: botón compartir → "Añadir a pantalla de inicio".
4. A partir de ahí funciona sin conexión, con icono propio.

Es una app **distinta** a la de MODULBOX‑400 (otro `scope` y otro `CACHE_NAME`): pueden
convivir instaladas a la vez en el mismo dispositivo.

## Actualizar la app

Cada vez que cambies `index.html`, sube los cambios (`git add -A && git commit -m "..." && git push`)
y sube en 1 el número de `CACHE_NAME` en `sw.js` (p. ej. `modulbox-sbx-v2`) para que los
dispositivos descarguen la versión nueva.
