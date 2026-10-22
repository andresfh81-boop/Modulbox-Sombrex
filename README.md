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
- **4 brazos**: desactivado (no se fabrica de momento). Las tablas aproximadas de la MODULBOX‑400
  siguen en el código por si se retoma; basta con reactivar la opción en el selector.
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

Cada vez que cambies `index.html`, sube los cambios (`git add -A && git commit -m "..." && git push`).
Con conexión la app carga siempre la versión publicada (si internet tarda más de 4 s, abre la copia
guardada), así que el cambio llega al abrirla, sin hacer nada más.

Conviene seguir subiendo en 1 el número de `CACHE_NAME` en `sw.js` (p. ej. `modulbox-sbx-v31`): así se renueva
también la copia sin conexión y, si alguien tiene la app abierta, le sale el aviso «Hay una versión
nueva» con el botón «Actualizar».

## Interruptor remoto

Al abrirse (y al volver a la app, y cada 10 min) consulta
`https://raw.githubusercontent.com/andresfh81-boop/estado-apps/main/estado.json`, clave `modulbox-sombrex`:

- `"activa": false` → pantalla «App desactivada» (con el `mensaje`, si lo hay) y no deja usarla.
  Se acuerda: **sigue bloqueada sin conexión** hasta que lea `"activa": true`.
- `"activa": true` → funciona (y se quita el bloqueo si lo había).
- Sin conexión, sin el archivo o sin la clave → no cambia nada (sigue como estaba).

El cambio en GitHub tarda hasta unos 5 minutos en llegar. `sw.js` deja pasar esa petición directa a internet.
