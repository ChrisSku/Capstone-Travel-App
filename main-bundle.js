/*! For license information please see main-bundle.js.LICENSE.txt */
(()=>{"use strict";var e,t,n,s,i={16:(e,t,n)=>{n.d(t,{dy:()=>I,sY:()=>F});const s=new WeakMap,i=e=>"function"==typeof e&&s.has(e),r="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,o=(e,t,n=null)=>{for(;t!==n;){const n=t.nextSibling;e.removeChild(t),t=n}},a={},l={},d=`{{lit-${String(Math.random()).slice(2)}}}`,h=`\x3c!--${d}--\x3e`,u=new RegExp(`${d}|${h}`),c="$lit$";class p{constructor(e,t){this.parts=[],this.element=t;const n=[],s=[],i=document.createTreeWalker(t.content,133,null,!1);let r=0,o=-1,a=0;const{strings:l,values:{length:h}}=e;for(;a<h;){const e=i.nextNode();if(null!==e){if(o++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:n}=t;let s=0;for(let e=0;e<n;e++)m(t[e].name,c)&&s++;for(;s-- >0;){const t=l[a],n=g.exec(t)[2],s=n.toLowerCase()+c,i=e.getAttribute(s);e.removeAttribute(s);const r=i.split(u);this.parts.push({type:"attribute",index:o,name:n,strings:r}),a+=r.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),i.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(d)>=0){const s=e.parentNode,i=t.split(u),r=i.length-1;for(let t=0;t<r;t++){let n,r=i[t];if(""===r)n=v();else{const e=g.exec(r);null!==e&&m(e[2],c)&&(r=r.slice(0,e.index)+e[1]+e[2].slice(0,-c.length)+e[3]),n=document.createTextNode(r)}s.insertBefore(n,e),this.parts.push({type:"node",index:++o})}""===i[r]?(s.insertBefore(v(),e),n.push(e)):e.data=i[r],a+=r}}else if(8===e.nodeType)if(e.data===d){const t=e.parentNode;null!==e.previousSibling&&o!==r||(o++,t.insertBefore(v(),e)),r=o,this.parts.push({type:"node",index:o}),null===e.nextSibling?e.data="":(n.push(e),o--),a++}else{let t=-1;for(;-1!==(t=e.data.indexOf(d,t+1));)this.parts.push({type:"node",index:-1}),a++}}else i.currentNode=s.pop()}for(const e of n)e.parentNode.removeChild(e)}}const m=(e,t)=>{const n=e.length-t.length;return n>=0&&e.slice(n)===t},f=e=>-1!==e.index,v=()=>document.createComment(""),g=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class _{constructor(e,t,n){this.__parts=[],this.template=e,this.processor=t,this.options=n}update(e){let t=0;for(const n of this.__parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=r?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],n=this.template.parts,s=document.createTreeWalker(e,133,null,!1);let i,o=0,a=0,l=s.nextNode();for(;o<n.length;)if(i=n[o],f(i)){for(;a<i.index;)a++,"TEMPLATE"===l.nodeName&&(t.push(l),s.currentNode=l.content),null===(l=s.nextNode())&&(s.currentNode=t.pop(),l=s.nextNode());if("node"===i.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(l.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,i.name,i.strings,this.options));o++}else this.__parts.push(void 0),o++;return r&&(document.adoptNode(e),customElements.upgrade(e)),e}}const y=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),x=` ${d} `;class b{constructor(e,t,n,s){this.strings=e,this.values=t,this.type=n,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let s=0;s<e;s++){const e=this.strings[s],i=e.lastIndexOf("\x3c!--");n=(i>-1||n)&&-1===e.indexOf("--\x3e",i+1);const r=g.exec(e);t+=null===r?e+(n?x:h):e.substr(0,r.index)+r[1]+r[2]+c+r[3]+d}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==y&&(t=y.createHTML(t)),e.innerHTML=t,e}}const w=e=>null===e||!("object"==typeof e||"function"==typeof e),N=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class E{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new T(this)}_getValue(){const e=this.strings,t=e.length-1,n=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=n[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!N(e))return e}let s="";for(let i=0;i<t;i++){s+=e[i];const t=n[i];if(void 0!==t){const e=t.value;if(w(e)||!N(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class T{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===a||w(e)&&e===this.value||(this.value=e,i(e)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const e=this.value;this.value=a,e(this)}this.value!==a&&this.committer.commit()}}class V{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(v()),this.endNode=e.appendChild(v())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=v()),e.__insert(this.endNode=v())}insertAfterPart(e){e.__insert(this.startNode=v()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}const e=this.__pendingValue;e!==a&&(w(e)?e!==this.value&&this.__commitText(e):e instanceof b?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):N(e)?this.__commitIterable(e):e===l?(this.value=l,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,n="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=n:this.__commitNode(document.createTextNode(n)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof _&&this.value.template===t)this.value.update(e.values);else{const n=new _(t,e.processor,this.options),s=n._clone();n.update(e.values),this.__commitNode(s),this.value=n}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,s=0;for(const i of e)n=t[s],void 0===n&&(n=new V(this.options),t.push(n),0===s?n.appendIntoPart(this):n.insertAfterPart(t[s-1])),n.setValue(i),n.commit(),s++;s<t.length&&(t.length=s,this.clear(n&&n.endNode))}clear(e=this.startNode){o(this.startNode.parentNode,e.nextSibling,this.endNode)}}class A{constructor(e,t,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this.__pendingValue=e}commit(){for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}if(this.__pendingValue===a)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=a}}class S extends E{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new k(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class k extends T{}let C=!1;(()=>{try{const e={get capture(){return C=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class L{constructor(e,t,n){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=n,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}if(this.__pendingValue===a)return;const e=this.__pendingValue,t=this.value,n=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=P(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=a}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const P=e=>e&&(C?{capture:e.capture,passive:e.passive,once:e.once}:e.capture),M=new class{handleAttributeExpressions(e,t,n,s){const i=t[0];return"."===i?new S(e,t.slice(1),n).parts:"@"===i?[new L(e,t.slice(1),s.eventContext)]:"?"===i?[new A(e,t.slice(1),n)]:new E(e,t,n).parts}handleTextExpression(e){return new V(e)}};function O(e){let t=j.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},j.set(e.type,t));let n=t.stringsArray.get(e.strings);if(void 0!==n)return n;const s=e.strings.join(d);return n=t.keyString.get(s),void 0===n&&(n=new p(e,e.getTemplateElement()),t.keyString.set(s,n)),t.stringsArray.set(e.strings,n),n}const j=new Map,H=new WeakMap,F=(e,t,n)=>{let s=H.get(t);void 0===s&&(o(t,t.firstChild),H.set(t,s=new V(Object.assign({templateFactory:O},n))),s.appendInto(t)),s.setValue(e),s.commit()};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const I=(e,...t)=>new b(e,t,"html",M)},27:(e,t,n)=>{n.d(t,{_:()=>r});var s,i=n(16);function r(){return(0,i.dy)(s||(e=['<div class="loader"></div>'],t=['<div class="loader"></div>'],Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,s=e));var e,t}}},r={};function o(e){if(r[e])return r[e].exports;var t=r[e]={exports:{}};return i[e](t,t.exports,o),t.exports}o.m=i,o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((t,n)=>(o.f[n](e,t),t)),[])),o.u=e=>e+"-bundle.js",o.miniCssF=e=>e+".css",o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="capstone-travel-app:",o.l=(n,s,i,r)=>{if(e[n])e[n].push(s);else{var a,l;if(void 0!==i)for(var d=document.getElementsByTagName("script"),h=0;h<d.length;h++){var u=d[h];if(u.getAttribute("src")==n||u.getAttribute("data-webpack")==t+i){a=u;break}}a||(l=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,o.nc&&a.setAttribute("nonce",o.nc),a.setAttribute("data-webpack",t+i),a.src=n),e[n]=[s];var c=(t,s)=>{a.onerror=a.onload=null,clearTimeout(p);var i=e[n];if(delete e[n],a.parentNode&&a.parentNode.removeChild(a),i&&i.forEach((e=>e(s))),t)return t(s)},p=setTimeout(c.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=c.bind(null,a.onerror),a.onload=c.bind(null,a.onload),l&&document.head.appendChild(a)}},o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.p="",n=e=>new Promise(((t,n)=>{var s=o.miniCssF(e),i=o.p+s;if(((e,t)=>{for(var n=document.getElementsByTagName("link"),s=0;s<n.length;s++){var i=(o=n[s]).getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(i===e||i===t))return o}var r=document.getElementsByTagName("style");for(s=0;s<r.length;s++){var o;if((i=(o=r[s]).getAttribute("data-href"))===e||i===t)return o}})(s,i))return t();((e,t,n,s)=>{var i=document.createElement("link");i.rel="stylesheet",i.type="text/css",i.onerror=i.onload=r=>{if(i.onerror=i.onload=null,"load"===r.type)n();else{var o=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=o,l.request=a,i.parentNode.removeChild(i),s(l)}},i.href=t,document.head.appendChild(i)})(e,i,t,n)})),s={179:0},o.f.miniCss=(e,t)=>{s[e]?t.push(s[e]):0!==s[e]&&{283:1}[e]&&t.push(s[e]=n(e).then((()=>{s[e]=0}),(t=>{throw delete s[e],t})))},(()=>{var e={179:0};o.f.j=(t,n)=>{var s=o.o(e,t)?e[t]:void 0;if(0!==s)if(s)n.push(s[2]);else{var i=new Promise(((n,i)=>{s=e[t]=[n,i]}));n.push(s[2]=i);var r=o.p+o.u(t),a=new Error;o.l(r,(n=>{if(o.o(e,t)&&(0!==(s=e[t])&&(e[t]=void 0),s)){var i=n&&("load"===n.type?"missing":n.type),r=n&&n.target&&n.target.src;a.message="Loading chunk "+t+" failed.\n("+i+": "+r+")",a.name="ChunkLoadError",a.type=i,a.request=r,s[1](a)}}),"chunk-"+t,t)}};var t=(t,n)=>{for(var s,i,[r,a,l]=n,d=0,h=[];d<r.length;d++)i=r[d],o.o(e,i)&&e[i]&&h.push(e[i][0]),e[i]=0;for(s in a)o.o(a,s)&&(o.m[s]=a[s]);for(l&&l(o),t&&t(n);h.length;)h.shift()()},n=self.webpackChunkcapstone_travel_app=self.webpackChunkcapstone_travel_app||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),(()=>{var e,t=o(16),n=o(27),s=((e=window.location.pathname.split("/")).pop(),e.join("/")),i=window.location.pathname,r=document.querySelector("main"),a=document.querySelector("nav");function l(){return(0,t.sY)((0,n._)(),r),i=window.location.pathname,function(){for(var e=null==a?void 0:a.querySelectorAll(".nav-item"),t=0;t<e.length;t++)s+e[t].getAttribute("href")===i?e[t].classList.add("active"):e[t].classList.remove("active")}(),i.endsWith("/best-places.html")?o.e(597).then(o.bind(o,597)).then((function(e){return(0,t.sY)(e.init(),r)})):i.endsWith("/saved-places.html")?o.e(446).then(o.bind(o,446)).then((function(e){return(0,t.sY)(e.init(),r)})):void o.e(283).then(o.bind(o,283)).then((function(e){return e.init()}))}a.addEventListener("click",(function(e){e.composedPath().filter((function(e){return e instanceof HTMLLIElement})).forEach((function(e){return t=e.getAttribute("href"),void(i===t&&"/"!==i||(history.pushState({},t.substr(1),s+t),l()));var t}))})),window.onpopstate=l,l()})()})();
//# sourceMappingURL=main-bundle.js.map