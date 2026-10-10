const C='mathmax-v1';
const put=(r,res)=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res};
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin){e.respondWith(fetch(r).then(res=>put(r,res)).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));return}
 if(u.hostname==='cdn.jsdelivr.net'){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>put(r,res))))}});
