if(!self.define){let e,s={};const n=(n,c)=>(n=new URL(n+".js",c).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,r)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let o={};const t=e=>n(e,i),l={module:{uri:i},exports:o,require:t};s[i]=Promise.all(c.map((e=>l[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"data-manage"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"css/app.ae3d4252.css",revision:null},{url:"css/chunk-vendors.60c37cda.css",revision:null},{url:"index.html",revision:"659548ed4690e38724182c4cf67ecebc"},{url:"js/app.61412c1c.js",revision:null},{url:"js/chunk-vendors.3c21cde4.js",revision:null},{url:"manifest.json",revision:"0ff18055e6aee279ce0f6971ce78c891"},{url:"robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map