const CACHE_NAME = 'nell-v1';

// ARQUIVOS DO CARTÃO DE VISITA — sempre disponíveis offline
const ARQUIVOS_ESSENCIAIS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/img/logo2026.png'
  // Adicione aqui: seu CSS principal, fontes, imagens do cartão
];

// INSTALAÇÃO: guarda os arquivos essenciais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        ARQUIVOS_ESSENCIAIS.map(url =>
          cache.add(url).catch(err => console.warn('Falha ao cachear:', url))
        )
      );
    })
  );
  self.skipWaiting();
});

// ATIVAÇÃO: limpa caches antigos quando você atualizar a versão
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// FETCH: estratégia mista
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Ignora requisições que não são GET (POST, PUT, etc.)
  if (event.request.method !== 'GET') return;

  // Ignora requisições de outros domínios (APIs externas, analytics)
  if (url.origin !== location.origin) return;

  // ESTRATÉGIA 1: Arquivos essenciais → Cache First
  // Tenta do cache primeiro, só vai na rede se não tiver
  if (ARQUIVOS_ESSENCIAIS.some(a => url.pathname === a || url.pathname === '/')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request);
      })
    );
    return;
  }

  // ESTRATÉGIA 2: Resto do site → Network First
  // Tenta da rede primeiro, cai no cache se estiver offline
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Guarda uma cópia atualizada no cache
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
