var CACHE_VERSION = '2';	// Increment this by 1 to delete and recreate all of the current caches
var CACHE_NAME_STATIC = 'gz-lst-static';
var CACHE_NAME_DYNAMIC = 'gz-lst-dynamic'; 

var FIREBASE_DOMAIN = "https://www.googleapis.com";

self.addEventListener('install', function(event){
    console.log('[SW] installing...');
    event.waitUntil(caches.open(CACHE_NAME_STATIC+'-v'+CACHE_VERSION)
        .then(function(cache){
            console.log('[SW] precaching');
            cache.addAll([
                '/',
                '/index.html'
            ]);
        }));
});

self.addEventListener('activate', function(event){
    console.log('[SW] activating...');
    event.waitUntil(
        caches.keys()
            .then(function(keyList) {
                return Promise.all(keyList.map(function(key) {
                if (key !== (CACHE_NAME_STATIC+'-v'+CACHE_VERSION) &&
                    key !== (CACHE_NAME_DYNAMIC+'-v'+CACHE_VERSION)
                ) {
                    return caches.delete(key);
                }
                }));
            })
    );
    self.clients.claim();
});


self.addEventListener('fetch', (event) => {
	console.log('[SW]', 'fetch event', event);

	event.respondWith(
        caches.match(event.request)
            .then(function(response){
                if(response){
                    return response;
                }else{
                    return fetch(event.request)
                        .then(function(res){
                            if( 
                                !event.request.url.startsWith('chrome-extension://') &&
                                !event.request.url.includes('sockjs-node') &&
                                !event.request.url.includes(FIREBASE_DOMAIN)
                            ){
                                
                                return caches.open(CACHE_NAME_DYNAMIC+'-v'+CACHE_VERSION)
                                    .then(function(cache){
                                        cache.put(event.request.url, res.clone());
                                        return res;
                                    });
                            }else{
                                return res;
                            }
                        });
                }
            })
    );
});