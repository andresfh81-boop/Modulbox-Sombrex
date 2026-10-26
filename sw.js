const CACHE_NAME = 'modulbox-sbx-v49';
const APP_SHELL = [
'./',
'./index.html',
'./manifest.json',
'./vendor/html2canvas.min.js',
'./vendor/jspdf.umd.min.js',
'./perfiles-modelo.js',
'./icon-32.png',
'./icon-180.png',
'./icon-192.png',
'./icon-512.png'
];
// Con conexión, la página se pide siempre a internet; si tarda más de esto, se abre la copia guardada.
const NET_TIMEOUT = 4000;

// cache: 'reload' para no guardar una copia vieja que tenga el navegador o GitHub Pages.
self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(CACHE_NAME)
.then((cache) => cache.addAll(APP_SHELL.map((url) => new Request(url, { cache: 'reload' }))))
.then(() => self.skipWaiting())
);
});

self.addEventListener('activate', (event) => {
event.waitUntil(
caches.keys().then((keys) =>
Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
).then(() => self.clients.claim())
);
});

const guardar = (request, response) => {
if (response && response.status === 200 && response.type === 'basic') {
const clone = response.clone();
caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
}
return response;
};

// La página (index.html): primero internet, y la copia guardada si no hay conexión o tarda demasiado.
const paginaRed = (event) => {
const red = fetch(event.request.url, { cache: 'no-cache' }).then((response) => guardar(event.request, response));
event.waitUntil(red.catch(() => {}));
const copia = () => caches.match(event.request, { ignoreSearch: true }).then((c) => c || caches.match('./index.html'));
return new Promise((resolve) => {
let hecho = false;
const dar = (r) => { if (!hecho && r) { hecho = true; resolve(r); } };
const timer = setTimeout(() => copia().then(dar), NET_TIMEOUT);
red.then((r) => { clearTimeout(timer); dar(r); })
.catch(() => { clearTimeout(timer); copia().then((c) => { dar(c); if (!hecho) resolve(Response.error()); }); });
});
};

self.addEventListener('fetch', (event) => {
if (event.request.method !== 'GET') return;

if (event.request.mode === 'navigate') {
event.respondWith(paginaRed(event));
return;
}

// Resto de archivos (librerías, iconos): la copia guardada al momento y se renueva detrás.
event.respondWith(
caches.match(event.request).then((cached) => {
const red = fetch(event.request).then((response) => guardar(event.request, response));
if (cached) {
event.waitUntil(red.catch(() => {}));
return cached;
}
return red;
})
);
});
