if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise((async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},s=(s,r)=>{Promise.all(s.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(s)};self.define=(s,t,n)=>{r[s]||(r[s]=Promise.resolve().then((()=>{let r={};const a={uri:location.origin+s.slice(1)};return Promise.all(t.map((s=>{switch(s){case"exports":return r;case"module":return a;default:return e(s)}}))).then((e=>{const s=n(...e);return r.default||(r.default=s),r}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/FDjEekgYrh70jlGPqHrZk/_buildManifest.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/FDjEekgYrh70jlGPqHrZk/_ssgManifest.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/20.fbe8645e9aa12e1aa3d8.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/69c383044fbfc759ad3cc2d6e859ec7caa571793.df81232afd90ca3313c3.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/7c3c2c69ed832d0c1dd0d429b07945215fb7ae0f.077f3ec91af179d9cc7f.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/83a958db58d780f89f9eafa8ec77715ee6fb8756.8d7537b8253e1cdabca9.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/9058f31809328101d96179024fb78f178df05807.5af32a9f3e9f47d80ac2.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/9a521051a94dd6f94472689bd9c28b8350847ae2.fafc38044ffd610f0f76.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/f642ace9ae74d9c8bd7a4ec936c7724ae5049b7d.1cb44e921dac26b76568.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/fa5744826a55cd3db2a3184cb16474cd4b30d972.f34c5bbb66210f646d30.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/framework.efe182f2d62be1d8151a.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/main-68fa83cbc0ceb1b25c51.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/pages/_app-9b26966d8b888d193c59.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/pages/_error-530123317f428f5a3cb4.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/pages/checkout/%5Bvendor%5D-78c92932176f2b399f45.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/pages/checkout/success-c39ba86151323e190b96.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/pages/index-a968a992027fe5d55086.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/pages/login-7f9ebfc9f05db61d0e19.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/pages/restaurants-39016c441dc11d335996.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/pages/restaurants/%5Brestaurant%5D-f40abb0753a3b4a38a6f.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/pages/signup-f07fa6dca0a071a29f1b.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/polyfills-5ba9c403cc30e4733b64.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/_next/static/chunks/webpack-b30e70891ffe9326a6cc.js",revision:"FDjEekgYrh70jlGPqHrZk"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:r,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));