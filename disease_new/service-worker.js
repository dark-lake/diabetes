if(!self.define){let e,s={};const n=(n,r)=>(n=new URL(n+".js",r).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let o={};const t=e=>n(e,c),l={module:{uri:c},exports:o,require:t};s[c]=Promise.all(r.map((e=>l[e]||t(e)))).then((e=>(i(...e),o)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"data-manage"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"css/app.ee3d066a.css",revision:null},{url:"css/chunk-vendors.60c37cda.css",revision:null},{url:"index.html",revision:"9cc5e0f36958587b2a03a9bd298456ea"},{url:"js/app.c0216ef5.js",revision:null},{url:"js/chunk-vendors.3c21cde4.js",revision:null},{url:"manifest.json",revision:"0ff18055e6aee279ce0f6971ce78c891"},{url:"robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"},{url:"site_prop.json",revision:"d41d8cd98f00b204e9800998ecf8427e"}],{})}));
//# sourceMappingURL=service-worker.js.map