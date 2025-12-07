const CACHE_NAME = 'wizper-v1';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// インストール時のキャッシュ処理
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// リクエスト時のキャッシュ応答戦略
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュにあればそれを返す、なければネットワークへ
        return response || fetch(event.request);
      })
  );
});

