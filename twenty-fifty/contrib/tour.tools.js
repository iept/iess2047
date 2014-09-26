/*
 * Copyright (c) 2009 Simo Kinnunen.
 * Licensed under the MIT license.
 *
 * @version 1.09i
 */
var Cufon=(function(){var m=function(){return m.replace.apply(null,arguments)};var x=m.DOM={ready:(function(){var C=false,E={loaded:1,complete:1};var B=[],D=function(){if(C){return}C=true;for(var F;F=B.shift();F()){}};if(document.addEventListener){document.addEventListener("DOMContentLoaded",D,false);window.addEventListener("pageshow",D,false)}if(!window.opera&&document.readyState){(function(){E[document.readyState]?D():setTimeout(arguments.callee,10)})()}if(document.readyState&&document.createStyleSheet){(function(){try{document.body.doScroll("left");D()}catch(F){setTimeout(arguments.callee,1)}})()}q(window,"load",D);return function(F){if(!arguments.length){D()}else{C?F():B.push(F)}}})(),root:function(){return document.documentElement||document.body}};var n=m.CSS={Size:function(C,B){this.value=parseFloat(C);this.unit=String(C).match(/[a-z%]*$/)[0]||"px";this.convert=function(D){return D/B*this.value};this.convertFrom=function(D){return D/this.value*B};this.toString=function(){return this.value+this.unit}},addClass:function(C,B){var D=C.className;C.className=D+(D&&" ")+B;return C},color:j(function(C){var B={};B.color=C.replace(/^rgba\((.*?),\s*([\d.]+)\)/,function(E,D,F){B.opacity=parseFloat(F);return"rgb("+D+")"});return B}),fontStretch:j(function(B){if(typeof B=="number"){return B}if(/%$/.test(B)){return parseFloat(B)/100}return{"ultra-condensed":0.5,"extra-condensed":0.625,condensed:0.75,"semi-condensed":0.875,"semi-expanded":1.125,expanded:1.25,"extra-expanded":1.5,"ultra-expanded":2}[B]||1}),getStyle:function(C){var B=document.defaultView;if(B&&B.getComputedStyle){return new a(B.getComputedStyle(C,null))}if(C.currentStyle){return new a(C.currentStyle)}return new a(C.style)},gradient:j(function(F){var G={id:F,type:F.match(/^-([a-z]+)-gradient\(/)[1],stops:[]},C=F.substr(F.indexOf("(")).match(/([\d.]+=)?(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)/ig);for(var E=0,B=C.length,D;E<B;++E){D=C[E].split("=",2).reverse();G.stops.push([D[1]||E/(B-1),D[0]])}return G}),quotedList:j(function(E){var D=[],C=/\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g,B;while(B=C.exec(E)){D.push(B[3]||B[1])}return D}),recognizesMedia:j(function(G){var E=document.createElement("style"),D,C,B;E.type="text/css";E.media=G;try{E.appendChild(document.createTextNode("/**/"))}catch(F){}C=g("head")[0];C.insertBefore(E,C.firstChild);D=(E.sheet||E.styleSheet);B=D&&!D.disabled;C.removeChild(E);return B}),removeClass:function(D,C){var B=RegExp("(?:^|\\s+)"+C+"(?=\\s|$)","g");D.className=D.className.replace(B,"");return D},supports:function(D,C){var B=document.createElement("span").style;if(B[D]===undefined){return false}B[D]=C;return B[D]===C},textAlign:function(E,D,B,C){if(D.get("textAlign")=="right"){if(B>0){E=" "+E}}else{if(B<C-1){E+=" "}}return E},textShadow:j(function(F){if(F=="none"){return null}var E=[],G={},B,C=0;var D=/(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;while(B=D.exec(F)){if(B[0]==","){E.push(G);G={};C=0}else{if(B[1]){G.color=B[1]}else{G[["offX","offY","blur"][C++]]=B[2]}}}E.push(G);return E}),textTransform:(function(){var B={uppercase:function(C){return C.toUpperCase()},lowercase:function(C){return C.toLowerCase()},capitalize:function(C){return C.replace(/\b./g,function(D){return D.toUpperCase()})}};return function(E,D){var C=B[D.get("textTransform")];return C?C(E):E}})(),whiteSpace:(function(){var D={inline:1,"inline-block":1,"run-in":1};var C=/^\s+/,B=/\s+$/;return function(H,F,G,E){if(E){if(E.nodeName.toLowerCase()=="br"){H=H.replace(C,"")}}if(D[F.get("display")]){return H}if(!G.previousSibling){H=H.replace(C,"")}if(!G.nextSibling){H=H.replace(B,"")}return H}})()};n.ready=(function(){var B=!n.recognizesMedia("all"),E=false;var D=[],H=function(){B=true;for(var K;K=D.shift();K()){}};var I=g("link"),J=g("style");function C(K){return K.disabled||G(K.sheet,K.media||"screen")}function G(M,P){if(!n.recognizesMedia(P||"all")){return true}if(!M||M.disabled){return false}try{var Q=M.cssRules,O;if(Q){search:for(var L=0,K=Q.length;O=Q[L],L<K;++L){switch(O.type){case 2:break;case 3:if(!G(O.styleSheet,O.media.mediaText)){return false}break;default:break search}}}}catch(N){}return true}function F(){if(document.createStyleSheet){return true}var L,K;for(K=0;L=I[K];++K){if(L.rel.toLowerCase()=="stylesheet"&&!C(L)){return false}}for(K=0;L=J[K];++K){if(!C(L)){return false}}return true}x.ready(function(){if(!E){E=n.getStyle(document.body).isUsable()}if(B||(E&&F())){H()}else{setTimeout(arguments.callee,10)}});return function(K){if(B){K()}else{D.push(K)}}})();function s(D){var C=this.face=D.face,B={"\u0020":1,"\u00a0":1,"\u3000":1};this.glyphs=D.glyphs;this.w=D.w;this.baseSize=parseInt(C["units-per-em"],10);this.family=C["font-family"].toLowerCase();this.weight=C["font-weight"];this.style=C["font-style"]||"normal";this.viewBox=(function(){var F=C.bbox.split(/\s+/);var E={minX:parseInt(F[0],10),minY:parseInt(F[1],10),maxX:parseInt(F[2],10),maxY:parseInt(F[3],10)};E.width=E.maxX-E.minX;E.height=E.maxY-E.minY;E.toString=function(){return[this.minX,this.minY,this.width,this.height].join(" ")};return E})();this.ascent=-parseInt(C.ascent,10);this.descent=-parseInt(C.descent,10);this.height=-this.ascent+this.descent;this.spacing=function(L,N,E){var O=this.glyphs,M,K,G,P=[],F=0,J=-1,I=-1,H;while(H=L[++J]){M=O[H]||this.missingGlyph;if(!M){continue}if(K){F-=G=K[H]||0;P[I]-=G}F+=P[++I]=~~(M.w||this.w)+N+(B[H]?E:0);K=M.k}P.total=F;return P}}function f(){var C={},B={oblique:"italic",italic:"oblique"};this.add=function(D){(C[D.style]||(C[D.style]={}))[D.weight]=D};this.get=function(H,I){var G=C[H]||C[B[H]]||C.normal||C.italic||C.oblique;if(!G){return null}I={normal:400,bold:700}[I]||parseInt(I,10);if(G[I]){return G[I]}var E={1:1,99:0}[I%100],K=[],F,D;if(E===undefined){E=I>400}if(I==500){I=400}for(var J in G){if(!k(G,J)){continue}J=parseInt(J,10);if(!F||J<F){F=J}if(!D||J>D){D=J}K.push(J)}if(I<F){I=F}if(I>D){I=D}K.sort(function(M,L){return(E?(M>=I&&L>=I)?M<L:M>L:(M<=I&&L<=I)?M>L:M<L)?-1:1});return G[K[0]]}}function r(){function D(F,G){if(F.contains){return F.contains(G)}return F.compareDocumentPosition(G)&16}function B(G){var F=G.relatedTarget;if(!F||D(this,F)){return}C(this,G.type=="mouseover")}function E(F){C(this,F.type=="mouseenter")}function C(F,G){setTimeout(function(){var H=d.get(F).options;m.replace(F,G?h(H,H.hover):H,true)},10)}this.attach=function(F){if(F.onmouseenter===undefined){q(F,"mouseover",B);q(F,"mouseout",B)}else{q(F,"mouseenter",E);q(F,"mouseleave",E)}}}function u(){var C=[],D={};function B(H){var E=[],G;for(var F=0;G=H[F];++F){E[F]=C[D[G]]}return E}this.add=function(F,E){D[F]=C.push(E)-1};this.repeat=function(){var E=arguments.length?B(arguments):C,F;for(var G=0;F=E[G++];){m.replace(F[0],F[1],true)}}}function A(){var D={},B=0;function C(E){return E.cufid||(E.cufid=++B)}this.get=function(E){var F=C(E);return D[F]||(D[F]={})}}function a(B){var D={},C={};this.extend=function(E){for(var F in E){if(k(E,F)){D[F]=E[F]}}return this};this.get=function(E){return D[E]!=undefined?D[E]:B[E]};this.getSize=function(F,E){return C[F]||(C[F]=new n.Size(this.get(F),E))};this.isUsable=function(){return !!B}}function q(C,B,D){if(C.addEventListener){C.addEventListener(B,D,false)}else{if(C.attachEvent){C.attachEvent("on"+B,function(){return D.call(C,window.event)})}}}function v(C,B){var D=d.get(C);if(D.options){return C}if(B.hover&&B.hoverables[C.nodeName.toLowerCase()]){b.attach(C)}D.options=B;return C}function j(B){var C={};return function(D){if(!k(C,D)){C[D]=B.apply(null,arguments)}return C[D]}}function c(F,E){var B=n.quotedList(E.get("fontFamily").toLowerCase()),D;for(var C=0;D=B[C];++C){if(i[D]){return i[D].get(E.get("fontStyle"),E.get("fontWeight"))}}return null}function g(B){return document.getElementsByTagName(B)}function k(C,B){return C.hasOwnProperty(B)}function h(){var C={},B,F;for(var E=0,D=arguments.length;B=arguments[E],E<D;++E){for(F in B){if(k(B,F)){C[F]=B[F]}}}return C}function o(E,M,C,N,F,D){var K=document.createDocumentFragment(),H;if(M===""){return K}var L=N.separate;var I=M.split(p[L]),B=(L=="words");if(B&&t){if(/^\s/.test(M)){I.unshift("")}if(/\s$/.test(M)){I.push("")}}for(var J=0,G=I.length;J<G;++J){H=z[N.engine](E,B?n.textAlign(I[J],C,J,G):I[J],C,N,F,D,J<G-1);if(H){K.appendChild(H)}}return K}function l(D,M){var C=D.nodeName.toLowerCase();if(M.ignore[C]){return}var E=!M.textless[C];var B=n.getStyle(v(D,M)).extend(M);var F=c(D,B),G,K,I,H,L,J;if(!F){return}for(G=D.firstChild;G;G=I){K=G.nodeType;I=G.nextSibling;if(E&&K==3){if(H){H.appendData(G.data);D.removeChild(G)}else{H=G}if(I){continue}}if(H){D.replaceChild(o(F,n.whiteSpace(H.data,B,H,J),B,M,G,D),H);H=null}if(K==1){if(G.firstChild){if(G.nodeName.toLowerCase()=="cufon"){z[M.engine](F,null,B,M,G,D)}else{arguments.callee(G,M)}}J=G}}}var t=" ".split(/\s+/).length==0;var d=new A();var b=new r();var y=new u();var e=false;var z={},i={},w={autoDetect:false,engine:null,forceHitArea:false,hover:false,hoverables:{a:true},ignore:{applet:1,canvas:1,col:1,colgroup:1,head:1,iframe:1,map:1,optgroup:1,option:1,script:1,select:1,style:1,textarea:1,title:1,pre:1},printable:true,selector:(window.Sizzle||(window.jQuery&&function(B){return jQuery(B)})||(window.dojo&&dojo.query)||(window.Ext&&Ext.query)||(window.YAHOO&&YAHOO.util&&YAHOO.util.Selector&&YAHOO.util.Selector.query)||(window.$$&&function(B){return $$(B)})||(window.$&&function(B){return $(B)})||(document.querySelectorAll&&function(B){return document.querySelectorAll(B)})||g),separate:"words",textless:{dl:1,html:1,ol:1,table:1,tbody:1,thead:1,tfoot:1,tr:1,ul:1},textShadow:"none"};var p={words:/\s/.test("\u00a0")?/[^\S\u00a0]+/:/\s+/,characters:"",none:/^/};m.now=function(){x.ready();return m};m.refresh=function(){y.repeat.apply(y,arguments);return m};m.registerEngine=function(C,B){if(!B){return m}z[C]=B;return m.set("engine",C)};m.registerFont=function(D){if(!D){return m}var B=new s(D),C=B.family;if(!i[C]){i[C]=new f()}i[C].add(B);return m.set("fontFamily",'"'+C+'"')};m.replace=function(D,C,B){C=h(w,C);if(!C.engine){return m}if(!e){n.addClass(x.root(),"cufon-active cufon-loading");n.ready(function(){n.addClass(n.removeClass(x.root(),"cufon-loading"),"cufon-ready")});e=true}if(C.hover){C.forceHitArea=true}if(C.autoDetect){delete C.fontFamily}if(typeof C.textShadow=="string"){C.textShadow=n.textShadow(C.textShadow)}if(typeof C.color=="string"&&/^-/.test(C.color)){C.textGradient=n.gradient(C.color)}else{delete C.textGradient}if(!B){y.add(D,arguments)}if(D.nodeType||typeof D=="string"){D=[D]}n.ready(function(){for(var F=0,E=D.length;F<E;++F){var G=D[F];if(typeof G=="string"){m.replace(C.selector(G),C,true)}else{l(G,C)}}});return m};m.set=function(B,C){w[B]=C;return m};return m})();Cufon.registerEngine("vml",(function(){var e=document.namespaces;if(!e){return}e.add("cvml","urn:schemas-microsoft-com:vml");e=null;var b=document.createElement("cvml:shape");b.style.behavior="url(#default#VML)";if(!b.coordsize){return}b=null;var h=(document.documentMode||0)<8;document.write(('<style type="text/css">cufoncanvas{text-indent:0;}@media screen{cvml\\:shape,cvml\\:rect,cvml\\:fill,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute;}cufoncanvas{position:absolute;text-align:left;}cufon{display:inline-block;position:relative;vertical-align:'+(h?"middle":"text-bottom")+";}cufon cufontext{position:absolute;left:-10000in;font-size:1px;}a cufon{cursor:pointer}}@media print{cufon cufoncanvas{display:none;}}</style>").replace(/;/g,"!important;"));function c(i,j){return a(i,/(?:em|ex|%)$|^[a-z-]+$/i.test(j)?"1em":j)}function a(l,m){if(m==="0"){return 0}if(/px$/i.test(m)){return parseFloat(m)}var k=l.style.left,j=l.runtimeStyle.left;l.runtimeStyle.left=l.currentStyle.left;l.style.left=m.replace("%","em");var i=l.style.pixelLeft;l.style.left=k;l.runtimeStyle.left=j;return i}function f(l,k,j,n){var i="computed"+n,m=k[i];if(isNaN(m)){m=k.get(n);k[i]=m=(m=="normal")?0:~~j.convertFrom(a(l,m))}return m}var g={};function d(p){var q=p.id;if(!g[q]){var n=p.stops,o=document.createElement("cvml:fill"),i=[];o.type="gradient";o.angle=180;o.focus="0";o.method="sigma";o.color=n[0][1];for(var m=1,l=n.length-1;m<l;++m){i.push(n[m][0]*100+"% "+n[m][1])}o.colors=i.join(",");o.color2=n[l][1];g[q]=o}return g[q]}return function(ac,G,Y,C,K,ad,W){var n=(G===null);if(n){G=K.alt}var I=ac.viewBox;var p=Y.computedFontSize||(Y.computedFontSize=new Cufon.CSS.Size(c(ad,Y.get("fontSize"))+"px",ac.baseSize));var y,q;if(n){y=K;q=K.firstChild}else{y=document.createElement("cufon");y.className="cufon cufon-vml";y.alt=G;q=document.createElement("cufoncanvas");y.appendChild(q);if(C.printable){var Z=document.createElement("cufontext");Z.appendChild(document.createTextNode(G));y.appendChild(Z)}if(!W){y.appendChild(document.createElement("cvml:shape"))}}var ai=y.style;var R=q.style;var l=p.convert(I.height),af=Math.ceil(l);var V=af/l;var P=V*Cufon.CSS.fontStretch(Y.get("fontStretch"));var U=I.minX,T=I.minY;R.height=af;R.top=Math.round(p.convert(T-ac.ascent));R.left=Math.round(p.convert(U));ai.height=p.convert(ac.height)+"px";var F=Y.get("color");var ag=Cufon.CSS.textTransform(G,Y).split("");var L=ac.spacing(ag,f(ad,Y,p,"letterSpacing"),f(ad,Y,p,"wordSpacing"));if(!L.length){return null}var k=L.total;var x=-U+k+(I.width-L[L.length-1]);var ah=p.convert(x*P),X=Math.round(ah);var O=x+","+I.height,m;var J="r"+O+"ns";var u=C.textGradient&&d(C.textGradient);var o=ac.glyphs,S=0;var H=C.textShadow;var ab=-1,aa=0,w;while(w=ag[++ab]){var D=o[ag[ab]]||ac.missingGlyph,v;if(!D){continue}if(n){v=q.childNodes[aa];while(v.firstChild){v.removeChild(v.firstChild)}}else{v=document.createElement("cvml:shape");q.appendChild(v)}v.stroked="f";v.coordsize=O;v.coordorigin=m=(U-S)+","+T;v.path=(D.d?"m"+D.d+"xe":"")+"m"+m+J;v.fillcolor=F;if(u){v.appendChild(u.cloneNode(false))}var ae=v.style;ae.width=X;ae.height=af;if(H){var s=H[0],r=H[1];var B=Cufon.CSS.color(s.color),z;var N=document.createElement("cvml:shadow");N.on="t";N.color=B.color;N.offset=s.offX+","+s.offY;if(r){z=Cufon.CSS.color(r.color);N.type="double";N.color2=z.color;N.offset2=r.offX+","+r.offY}N.opacity=B.opacity||(z&&z.opacity)||1;v.appendChild(N)}S+=L[aa++]}var M=v.nextSibling,t,A;if(C.forceHitArea){if(!M){M=document.createElement("cvml:rect");M.stroked="f";M.className="cufon-vml-cover";t=document.createElement("cvml:fill");t.opacity=0;M.appendChild(t);q.appendChild(M)}A=M.style;A.width=X;A.height=af}else{if(M){q.removeChild(M)}}ai.width=Math.max(Math.ceil(p.convert(k*P)),0);if(h){var Q=Y.computedYAdjust;if(Q===undefined){var E=Y.get("lineHeight");if(E=="normal"){E="1em"}else{if(!isNaN(E)){E+="em"}}Y.computedYAdjust=Q=0.5*(a(ad,E)-parseFloat(ai.height))}if(Q){ai.marginTop=Math.ceil(Q)+"px";ai.marginBottom=Q+"px"}}return y}})());Cufon.registerEngine("canvas",(function(){var b=document.createElement("canvas");if(!b||!b.getContext||!b.getContext.apply){return}b=null;var a=Cufon.CSS.supports("display","inline-block");var e=!a&&(document.compatMode=="BackCompat"||/frameset|transitional/i.test(document.doctype.publicId));var f=document.createElement("style");f.type="text/css";f.appendChild(document.createTextNode(("cufon{text-indent:0;}@media screen,projection{cufon{display:inline;display:inline-block;position:relative;vertical-align:middle;"+(e?"":"font-size:1px;line-height:1px;")+"}cufon cufontext{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden;text-indent:-10000in;}"+(a?"cufon canvas{position:relative;}":"cufon canvas{position:absolute;}")+"}@media print{cufon{padding:0;}cufon canvas{display:none;}}").replace(/;/g,"!important;")));document.getElementsByTagName("head")[0].appendChild(f);function d(p,h){var n=0,m=0;var g=[],o=/([mrvxe])([^a-z]*)/g,k;generate:for(var j=0;k=o.exec(p);++j){var l=k[2].split(",");switch(k[1]){case"v":g[j]={m:"bezierCurveTo",a:[n+~~l[0],m+~~l[1],n+~~l[2],m+~~l[3],n+=~~l[4],m+=~~l[5]]};break;case"r":g[j]={m:"lineTo",a:[n+=~~l[0],m+=~~l[1]]};break;case"m":g[j]={m:"moveTo",a:[n=~~l[0],m=~~l[1]]};break;case"x":g[j]={m:"closePath"};break;case"e":break generate}h[g[j].m].apply(h,g[j].a)}return g}function c(m,k){for(var j=0,h=m.length;j<h;++j){var g=m[j];k[g.m].apply(k,g.a)}}return function(V,w,P,t,C,W){var k=(w===null);if(k){w=C.getAttribute("alt")}var A=V.viewBox;var m=P.getSize("fontSize",V.baseSize);var B=0,O=0,N=0,u=0;var z=t.textShadow,L=[];if(z){for(var U=z.length;U--;){var F=z[U];var K=m.convertFrom(parseFloat(F.offX));var I=m.convertFrom(parseFloat(F.offY));L[U]=[K,I];if(I<B){B=I}if(K>O){O=K}if(I>N){N=I}if(K<u){u=K}}}var Z=Cufon.CSS.textTransform(w,P).split("");var E=V.spacing(Z,~~m.convertFrom(parseFloat(P.get("letterSpacing"))||0),~~m.convertFrom(parseFloat(P.get("wordSpacing"))||0));if(!E.length){return null}var h=E.total;O+=A.width-E[E.length-1];u+=A.minX;var s,n;if(k){s=C;n=C.firstChild}else{s=document.createElement("cufon");s.className="cufon cufon-canvas";s.setAttribute("alt",w);n=document.createElement("canvas");s.appendChild(n);if(t.printable){var S=document.createElement("cufontext");S.appendChild(document.createTextNode(w));s.appendChild(S)}}var aa=s.style;var H=n.style;var j=m.convert(A.height);var Y=Math.ceil(j);var M=Y/j;var G=M*Cufon.CSS.fontStretch(P.get("fontStretch"));var J=h*G;var Q=Math.ceil(m.convert(J+O-u));var o=Math.ceil(m.convert(A.height-B+N));n.width=Q;n.height=o;H.width=Q+"px";H.height=o+"px";B+=A.minY;H.top=Math.round(m.convert(B-V.ascent))+"px";H.left=Math.round(m.convert(u))+"px";var r=Math.max(Math.ceil(m.convert(J)),0)+"px";if(a){aa.width=r;aa.height=m.convert(V.height)+"px"}else{aa.paddingLeft=r;aa.paddingBottom=(m.convert(V.height)-1)+"px"}var X=n.getContext("2d"),D=j/A.height;X.scale(D,D*M);X.translate(-u,-B);X.save();function T(){var x=V.glyphs,ab,l=-1,g=-1,y;X.scale(G,1);while(y=Z[++l]){var ab=x[Z[l]]||V.missingGlyph;if(!ab){continue}if(ab.d){X.beginPath();if(ab.code){c(ab.code,X)}else{ab.code=d("m"+ab.d,X)}X.fill()}X.translate(E[++g],0)}X.restore()}if(z){for(var U=z.length;U--;){var F=z[U];X.save();X.fillStyle=F.color;X.translate.apply(X,L[U]);T()}}var q=t.textGradient;if(q){var v=q.stops,p=X.createLinearGradient(0,A.minY,0,A.maxY);for(var U=0,R=v.length;U<R;++U){p.addColorStop.apply(p,v[U])}X.fillStyle=p}else{X.fillStyle=P.get("color")}T();return s}})());

/*!
 * The following copyright notice may not be removed under any circumstances.
 *
 * Copyright:
 * Generated in 2010 by FontLab Studio. Copyright info pending.
 */
Cufon.registerFont({"w":237,"face":{"font-family":"ChunkFive","font-weight":400,"font-stretch":"normal","units-per-em":"360","panose-1":"0 0 0 0 0 0 0 0 0 0","ascent":"270","descent":"-90","x-height":"5","bbox":"-4 -293 369 83","underline-thickness":"18","underline-position":"-18","unicode-range":"U+0020-U+007C"},"glyphs":{" ":{"w":90},"e":{"d":"159,-60r31,35v-65,53,-182,46,-188,-66v-6,-105,156,-123,183,-42v4,13,8,40,0,61r-113,0v2,10,7,30,37,30v12,0,31,-2,50,-18xm101,-136v-22,0,-27,19,-28,28r54,0v0,-14,-3,-28,-26,-28","w":195},"f":{"d":"148,-267r-22,41v-10,-5,-31,-9,-31,15r0,31r33,0r0,47r-33,0r0,86r22,0r0,47r-108,0r0,-47r15,0r0,-86r-15,0r0,-47r15,0v1,-53,-10,-96,71,-96v19,0,44,4,53,9","w":138},"g":{"d":"9,42r19,-40v8,7,35,23,62,23v38,0,44,-19,42,-46v-5,6,-19,20,-42,20v-62,0,-86,-45,-86,-90v0,-71,73,-118,128,-78r7,-11r86,0r0,47r-22,0r0,108v0,60,-36,99,-112,99v-40,0,-68,-19,-82,-32xm80,-92v0,22,10,44,26,44v14,0,26,-18,26,-46v0,-24,-12,-43,-26,-43v-15,0,-26,18,-26,45","w":230},"h":{"d":"122,-47r0,47r-113,0r0,-47r15,0r0,-176r-15,0r0,-47r87,0r0,112v4,-6,31,-28,57,-28v80,0,60,71,63,139r17,0r0,47r-93,0r0,-98v0,-12,0,-33,-21,-33v-34,0,-20,51,-23,84r26,0"},"i":{"d":"110,-47r0,47r-101,0r0,-47r15,0r0,-86r-15,0r0,-47r84,0r0,133r17,0xm58,-196v-49,-2,-53,-72,0,-73v52,0,53,74,0,73","w":118},"j":{"d":"46,-25r0,-108r-15,0r0,-47r83,0r0,155v0,45,-13,100,-109,100r0,-48v42,0,41,-35,41,-52xm80,-196v-49,-2,-53,-72,0,-73v52,0,53,74,0,73","w":129},"o":{"d":"104,5v-51,0,-101,-32,-100,-96v0,-60,49,-93,99,-93v57,0,99,35,100,95v1,60,-44,94,-99,94xm104,-41v15,0,25,-21,25,-48v0,-27,-9,-49,-26,-49v-14,0,-25,22,-25,48v0,30,11,49,26,49","w":206},"u":{"d":"5,-132r0,-48r88,0r0,87v0,31,4,45,19,45v32,0,21,-52,23,-84r-24,0r0,-48r93,0r0,132r18,0r0,48r-68,0r-10,-23v-8,9,-20,28,-51,28v-73,0,-75,-63,-72,-137r-16,0","w":227},"t":{"d":"5,-133r0,-47r20,0r0,-33r66,-21r0,54r34,0r0,47r-34,0r0,64v0,12,-2,29,12,29v5,0,15,-3,22,-6r0,46v-11,4,-35,6,-43,6v-78,3,-52,-74,-57,-139r-20,0","w":130},"B":{"d":"244,-73v0,98,-142,69,-235,73r0,-47r21,0r0,-158r-21,0r0,-47v84,3,222,-20,222,62v0,30,-8,45,-35,56v26,7,48,26,48,61xm104,-47v31,2,57,0,58,-31v1,-29,-27,-34,-58,-31r0,62xm151,-178v0,-27,-21,-27,-47,-26r0,54v27,2,47,-1,47,-28","w":247},"D":{"d":"117,0r-108,0r0,-48r22,0r0,-156r-22,0r0,-48r110,0v87,0,137,54,137,123v0,82,-50,129,-139,129xm173,-129v0,-44,-19,-81,-68,-75r0,156v51,5,68,-31,68,-81","w":259},"C":{"d":"199,-91r43,46v-24,27,-63,51,-110,51v-76,0,-127,-49,-127,-129v0,-110,112,-166,165,-108r9,-21r56,0r0,103r-64,0v-1,-23,-13,-46,-39,-46v-57,0,-58,139,10,139v30,0,54,-31,57,-35","w":246},"N":{"d":"285,-252r0,47r-24,0r0,205r-77,0r-92,-137r0,91r28,0r0,46r-111,0r0,-46r21,0r0,-159r-21,0r0,-47r104,0r88,132r0,-85r-25,0r0,-47r109,0","w":293},"n":{"d":"120,-47r0,47r-111,0r0,-47r15,0r0,-86r-15,0r0,-47r77,0r8,22v12,-17,28,-28,51,-28v80,0,64,70,66,139r17,0r0,47r-91,0r0,-98v0,-12,1,-34,-20,-34v-34,0,-20,51,-23,85r26,0","w":232},"l":{"d":"114,-47r0,47r-105,0r0,-47r15,0r0,-177r-15,0r0,-46r84,0r0,223r21,0","w":119},"m":{"d":"116,-47r0,47r-107,0r0,-47r15,0r0,-85r-15,0r0,-48r68,0r8,22v6,-7,22,-27,45,-27v36,0,48,17,54,26v11,-13,28,-26,53,-26v77,2,66,68,67,136r17,0r0,49r-91,0r0,-88v0,-17,3,-45,-14,-45v-33,0,-14,55,-19,85r22,0r0,48r-93,0r0,-92v0,-29,-1,-41,-15,-41v-30,2,-12,58,-17,86r22,0","w":326},"p":{"d":"149,-88v0,-22,-10,-44,-26,-44v-14,0,-26,18,-26,46v0,24,12,43,26,43v15,0,26,-18,26,-45xm9,73r0,-47r15,0r0,-158r-15,0r0,-48r82,0r7,13v7,-5,21,-16,43,-16v56,0,85,43,85,94v0,79,-82,113,-129,79r0,36r20,0r0,47r-108,0","w":229},"q":{"d":"138,-93v0,-22,-10,-44,-26,-44v-14,0,-26,18,-26,46v0,24,12,43,26,43v15,0,26,-18,26,-45xm114,83r0,-47r24,0r0,-48v-51,37,-129,0,-129,-79v0,-81,81,-113,129,-78r7,-11r84,0r0,47r-18,0r0,168r18,0r0,48r-115,0"},"r":{"d":"111,-47r0,47r-102,0r0,-47r16,0r0,-86r-16,0r0,-47r68,0r11,23v9,-17,19,-32,56,-32r0,65v-49,-5,-55,30,-51,77r18,0","w":149},"P":{"d":"9,-204r0,-48r117,0v84,0,99,36,99,77v-1,57,-57,77,-122,72r0,55r22,0r0,48r-116,0r0,-48r20,0r0,-156r-20,0xm154,-172v0,-28,-21,-36,-51,-33r0,63v28,2,51,-5,51,-30","w":230},"x":{"d":"135,-135r0,-45r92,0r0,45r-24,0r-38,39r45,51r17,0r0,45r-115,0r0,-45r17,0r-27,-29r-26,29r23,0r0,45r-92,0r0,-45r24,0r37,-41r-45,-49r-16,0r0,-45r117,0r0,45r-17,0r25,27r27,-27r-24,0","w":233},"w":{"d":"102,-55v-1,-23,16,-94,27,-125r66,0v12,32,26,99,30,125v1,-18,9,-57,16,-78r-15,0r0,-47r88,0r0,47r-15,0r-42,133r-76,0r-25,-81r-26,81r-74,0r-41,-133r-15,0r0,-47r97,0r0,47r-12,0v7,20,16,59,17,78","w":313},"d":{"d":"132,-170r0,-53r-16,0r0,-47r90,0r0,223r17,0r0,47r-84,0r-7,-13v-5,4,-20,16,-45,16v-51,0,-83,-45,-83,-95v0,-76,79,-113,128,-78xm81,-92v0,22,10,44,26,44v14,0,25,-18,25,-46v0,-24,-11,-43,-25,-43v-15,0,-26,18,-26,45","w":228},"k":{"d":"110,0r-96,0r0,-47r14,0r0,-176r-14,0r0,-47r83,0r0,163r42,-25r-26,0r0,-48r100,0r0,48v-25,-3,-39,6,-52,15r49,70r18,0r0,47r-107,0r0,-47r15,0r-27,-39r-13,9r0,30r14,0r0,47","w":235},"K":{"d":"122,-252r0,47r-19,0r0,58r67,-58r-26,0r0,-47r120,0r0,47r-21,0r-52,45r73,113r20,0r0,47r-140,0r0,-47r24,0r-38,-61r-27,23r0,38r19,0r0,47r-113,0r0,-47r19,0r0,-158r-19,0r0,-47r113,0","w":293},"v":{"d":"91,-134v12,20,22,57,28,76v1,-22,19,-56,28,-76r-19,0r0,-46r93,0r0,46r-19,0r-62,134r-56,0r-67,-134r-17,0r0,-46r109,0r0,46r-18,0","w":220},"y":{"d":"114,-78r24,-56r-17,0r0,-46r91,0r0,45r-17,0r-68,166v-10,22,-26,51,-78,51v-19,0,-32,-9,-43,-18r27,-43v13,15,38,17,44,-7r5,-15r-70,-133r-15,0r0,-46r111,0r0,46r-17,0","w":208},"E":{"d":"9,-204r0,-48r217,0r0,80r-62,0r0,-32r-58,0r0,50r69,0r0,47r-69,0r0,59r58,0r0,-33r62,0r0,81r-217,0r0,-48r23,0r0,-156r-23,0","w":235},"W":{"d":"94,-205v8,35,15,93,23,124v5,-34,26,-126,36,-171r75,0r22,100v7,22,5,57,13,71v4,-41,15,-86,23,-124r-20,0r0,-47r103,0r0,47r-20,0r-53,205r-86,0v-12,-42,-17,-91,-32,-130v-6,46,-20,87,-30,130r-84,0r-47,-205r-21,0r0,-47r119,0r0,47r-21,0","w":365,"k":{"a":22,"s":22,"y":11,"r":22,"u":11,"o":22,"e":22}},"H":{"d":"9,-204r0,-48r117,0r0,48r-23,0r0,54r69,0r0,-54r-22,0r0,-48r117,0r0,48r-20,0r0,156r20,0r0,48r-117,0r0,-48r22,0r0,-54r-69,0r0,54r23,0r0,48r-117,0r0,-48r20,0r0,-156r-20,0","w":276},"U":{"d":"5,-205r0,-47r115,0r0,47r-20,0v0,51,-8,161,36,148v22,0,37,-9,37,-71r0,-76r-20,0r0,-48r107,0r0,47r-20,0r0,87v0,85,-35,124,-103,124v-73,0,-111,-40,-111,-122r0,-89r-21,0","w":265},"M":{"d":"261,-47r-2,-141r-48,188r-76,0v-16,-65,-37,-116,-48,-188v-4,44,0,96,-1,142r21,0r0,46r-98,0r0,-46r19,0r0,-159r-19,0r0,-47r137,0r36,135r35,-135r137,0r0,47r-20,0r0,158r20,0r0,47r-114,0r0,-47r21,0","w":362},"@":{"d":"67,-84v-5,-46,68,-109,108,-60r2,-14r36,5r-14,103v32,18,50,-27,50,-49v0,-54,-43,-98,-113,-98v-73,0,-104,68,-104,115v0,59,48,108,111,108v54,0,84,-26,84,-26r17,24v0,0,-37,32,-101,32v-74,0,-141,-55,-141,-138v0,-60,40,-145,134,-145v89,0,143,57,143,128v0,31,-14,84,-67,84v-19,0,-27,-7,-32,-12v-51,40,-106,8,-113,-57xm170,-102v-4,-9,-14,-24,-30,-24v-42,-1,-41,79,-8,80v10,0,20,-3,31,-9","w":280},"G":{"d":"188,0r-12,-23v-8,13,-30,26,-58,26v-63,0,-113,-48,-113,-126v0,-78,55,-133,111,-133v52,0,64,24,70,30r8,-26r53,0r0,107r-64,0v-1,-29,-20,-46,-41,-46v-29,0,-49,32,-49,68v0,56,58,87,83,48r0,-15r-22,0r0,-39r120,0r0,39r-14,0r0,90r-72,0","w":279},"T":{"d":"5,-252r242,0r0,94r-53,0r0,-46r-30,0r0,156r30,0r0,48r-134,0r0,-48r29,0r0,-156r-31,0r0,46r-53,0r0,-94","w":252,"k":{"a":22,"s":22,"y":14,"r":22,"u":14,"o":22,"e":22}},"R":{"d":"9,-204r0,-48r117,0v84,0,100,34,100,75v0,28,-22,48,-52,52v25,4,47,25,47,51v0,25,13,32,17,13r0,-12r24,0v2,43,-5,77,-53,77v-47,0,-70,-25,-70,-67v0,-33,-4,-40,-36,-40r0,55r22,0r0,48r-116,0r0,-48r20,0r0,-156r-20,0xm154,-173v0,-28,-21,-34,-51,-32r0,61v28,2,51,-4,51,-29","w":265},"V":{"d":"140,-124v8,18,7,36,13,43v7,-39,32,-87,46,-124r-19,0r0,-47r102,0r0,47r-18,0r-86,205r-66,0r-96,-205r-20,0r0,-47r133,0r0,47r-20,0","w":278,"k":{"a":22,"y":22,"u":22,"o":22,"e":22}},"X":{"d":"129,-46r0,46r-120,0r0,-46r31,0r53,-69r-65,-90r-19,0r0,-47r143,0r0,47r-21,0r35,48r37,-48r-32,0r0,-47r120,0r0,47r-31,0r-54,70r65,88r21,0r0,47r-144,0r0,-47r20,0r-34,-47r-38,48r33,0","w":300},"s":{"d":"73,-130v16,28,103,20,103,80v0,59,-99,70,-122,28r-4,22r-45,0r0,-65r49,0v0,19,27,24,38,24v7,0,16,-2,16,-12v0,-11,-27,-13,-53,-22v-24,-9,-48,-23,-48,-57v0,-63,95,-65,117,-24r3,-24r44,0r0,65r-47,0v0,-15,-19,-28,-37,-28v-8,0,-14,4,-14,13","w":182},"S":{"d":"72,0r-63,0r0,-91r67,0v0,30,30,36,45,36v13,0,31,-3,31,-18v0,-28,-138,-16,-138,-108v0,-88,122,-101,161,-40r3,-31r62,0r0,91r-65,0v0,-27,-21,-42,-46,-42v-10,0,-25,6,-25,19v0,37,143,28,143,113v0,90,-135,93,-171,43","w":255},"Q":{"d":"157,-2v-89,12,-152,-30,-152,-125v0,-73,49,-126,121,-126v124,0,153,142,94,218v1,21,23,33,23,7r0,-10r23,0v3,44,-11,75,-54,76v-30,0,-47,-19,-55,-40xm86,-108v14,-20,62,-23,83,-3v5,-43,-13,-89,-43,-89v-26,0,-47,48,-40,92xm104,-66v12,14,30,16,44,4v-2,-41,-36,-35,-44,-4","w":271},"z":{"d":"56,-108r-47,0r0,-72r178,0r0,46r-85,87r37,0r0,-25r51,0r0,72r-181,0r0,-47r87,-87r-40,0r0,26","w":199},"Z":{"d":"72,-157r-61,0r0,-95r236,0r1,48r-132,156r67,0r0,-46r64,0r0,94r-238,0r0,-47r131,-157r-68,0r0,47","w":257},"?":{"d":"40,-172r-39,-39v42,-63,179,-67,179,27v0,59,-69,48,-57,100r-67,0r0,-29v0,-33,57,-51,57,-71v0,-14,-14,-17,-27,-17v-15,0,-34,15,-46,29xm46,-37v0,-18,15,-38,41,-38v26,0,43,17,43,38v0,20,-17,37,-43,37v-23,0,-41,-18,-41,-37","w":187},"F":{"d":"9,-204r0,-48r215,0r0,80r-63,0r0,-32r-55,0r0,63r69,0r0,47r-69,0r0,46r37,0r0,48r-134,0r0,-48r22,0r0,-156r-22,0","w":229,"k":{"a":22,"s":22,"y":11,"r":22,"u":11,"o":22,"e":22}},"I":{"d":"9,-204r0,-48r120,0r0,48r-23,0r0,156r23,0r0,48r-120,0r0,-48r23,0r0,-156r-23,0","w":137},"J":{"d":"8,69r-1,-47v30,9,45,-2,46,-49r0,-177r-31,0r0,-48r136,0r0,48r-30,0v-5,127,38,304,-120,273","w":166},"L":{"d":"9,-204r0,-48r114,0r0,48r-19,0r0,156r46,0r0,-46r61,0r0,94r-202,0r0,-48r20,0r0,-156r-20,0","w":219},"O":{"d":"134,6v-75,0,-129,-43,-129,-133v0,-78,52,-131,127,-131v88,0,129,52,129,133v0,81,-46,131,-127,131xm134,-50v23,0,37,-30,37,-75v0,-44,-12,-78,-40,-78v-22,0,-37,31,-37,76v0,47,17,77,40,77","w":266},".":{"d":"46,1v-53,0,-54,-77,0,-79v52,1,56,81,0,79","w":92},"a":{"d":"28,-123r-15,-42v45,-34,175,-43,176,49r0,70r22,0r0,46r-77,0r-9,-16v-38,44,-115,24,-120,-37v-5,-56,76,-84,111,-54v9,-51,-66,-32,-88,-16xm74,-57v-1,23,37,19,42,5v0,-17,1,-24,-21,-24v-14,0,-21,8,-21,19","w":216},"b":{"d":"92,0r-81,0r0,-47r15,0r0,-176r-15,0r0,-47r87,0r0,104v8,-9,29,-17,47,-17v55,0,83,46,83,94v0,75,-79,118,-130,77xm149,-88v0,-22,-10,-44,-26,-44v-14,0,-25,18,-25,46v0,24,11,43,25,43v15,0,26,-18,26,-45","w":236},"c":{"d":"130,-99v-1,-17,-6,-37,-23,-37v-45,0,-42,90,5,88v19,0,32,-7,44,-20r32,36v-47,57,-188,51,-188,-59v0,-85,90,-114,134,-72r6,-17r43,0r0,81r-53,0","w":191},"[":{"d":"10,-204r0,-48r117,0v84,0,99,41,99,82v0,27,-15,46,-38,59r40,64r21,0r0,47r-69,0r-60,-96r-16,0r0,48r22,0r0,48r-116,0r0,-48r21,0r0,-156r-21,0xm156,-172v0,-28,-22,-36,-52,-33r0,63v29,2,53,-5,52,-30","w":259},"\\":{"d":"187,28r-51,1r-134,-300r51,0","w":188},"]":{"d":"119,0r-108,0r0,-47r15,0r0,-176r-15,0r0,-47r83,0r0,163r42,-25r-26,0r0,-48r101,0r0,48v-24,-2,-39,4,-51,13r50,72r15,0r0,47r-58,0r-61,-86r-12,9r0,30r25,0r0,47","w":232},"Y":{"d":"101,-206v12,21,24,45,33,68v7,-21,23,-47,33,-68r-19,0r0,-46r96,0r0,46r-19,0r-67,117r0,42r21,0r0,47r-116,0r0,-47r21,0r0,-42r-70,-117r-18,0r0,-46r124,0r0,46r-19,0","w":240,"k":{"a":22,"s":22,"y":11,"r":22,"u":14,"o":29,"e":22}},"1":{"d":"26,-165r-17,-39v21,-10,37,-17,63,-48r64,0r0,204r34,0r0,48r-144,0r0,-48r36,0r0,-133","w":178},"2":{"d":"191,-177v3,66,-86,85,-111,129r63,0r0,-29r60,0r0,77r-194,0r0,-52v20,-32,31,-42,53,-61v27,-22,63,-39,63,-61v0,-42,-63,-19,-74,4r-39,-41v45,-66,174,-61,179,34","w":212},"3":{"d":"189,-75v0,92,-146,101,-184,39r37,-38v16,24,78,38,80,-4v1,-29,-28,-28,-57,-27r0,-43v27,1,57,1,57,-24v0,-41,-53,-33,-74,-7r-35,-42v13,-14,44,-35,77,-35v84,0,118,86,66,122v12,8,33,27,33,59","w":194},"4":{"d":"4,-71r0,-51r103,-130r75,0r0,142r19,0r0,39r-19,0r0,23r19,0r0,48r-116,0r0,-48r22,0r0,-23r-103,0xm54,-110r53,0r0,-66","w":210},"5":{"d":"202,-86v0,104,-154,114,-197,47r40,-41v19,32,88,39,90,-9v2,-37,-56,-45,-71,-18r-46,-21r22,-124r143,0r0,54r-97,0r-6,35v52,-26,122,6,122,77","w":207},"'":{"d":"13,-252r71,0r-13,107r-45,0","w":98},",":{"d":"39,70r-41,-24v26,-32,38,-63,34,-117r66,18v1,46,-22,90,-59,123","w":97},":":{"d":"45,3v-51,0,-53,-77,0,-79v54,2,54,80,0,79xm45,-107v-50,0,-54,-76,0,-78v53,1,55,79,0,78","w":91},"6":{"d":"197,-227r-25,47v-12,-7,-30,-19,-52,-19v-27,0,-44,22,-48,49v45,-39,132,-9,132,62v0,48,-34,89,-93,91v-59,2,-103,-40,-105,-112v-1,-48,11,-144,106,-147v24,-1,64,11,85,29xm110,-116v-17,0,-31,13,-37,20v0,18,11,43,34,43v37,2,46,-63,3,-63","w":209},"7":{"d":"5,-180r0,-72r195,0r0,48r-97,204r-77,0r96,-204r-59,0r0,24r-58,0","w":203},"8":{"d":"101,5v-96,0,-128,-101,-57,-142v-56,-40,-20,-119,59,-119v84,0,113,88,56,120v69,40,34,141,-58,141xm89,-108v-29,12,-26,63,12,62v18,0,33,-10,33,-30v0,-25,-28,-31,-45,-32xm112,-164v25,-8,20,-49,-10,-47v-14,0,-26,11,-26,23v0,20,24,24,36,24","w":201},"9":{"d":"13,-25r24,-47v28,23,102,30,97,-31v-43,43,-129,7,-129,-62v0,-48,35,-89,94,-91v59,-2,105,41,107,113v1,55,-13,143,-108,146v-24,1,-64,-10,-85,-28xm99,-136v17,0,28,-14,34,-21v0,-18,-7,-42,-30,-42v-38,0,-48,63,-4,63","w":211},"-":{"d":"9,-62r0,-48r104,0r0,48r-104,0","w":122},";":{"d":"62,-100v-52,-1,-55,-78,0,-80v53,1,55,81,0,80xm2,46r41,24v37,-33,60,-77,59,-123r-66,-18v4,54,-8,85,-34,117","w":108},"=":{"d":"9,-62r0,-48r148,0r0,48r-148,0xm9,-141r0,-48r148,0r0,48r-148,0","w":166},"0":{"d":"109,4v-60,0,-104,-42,-104,-131v0,-76,42,-129,102,-129v71,0,103,51,103,131v0,80,-36,129,-101,129xm109,-51v17,0,29,-30,29,-74v1,-91,-60,-98,-61,-2v0,46,18,76,32,76","w":215},"!":{"d":"10,-37v0,-18,15,-38,41,-38v26,0,43,17,43,38v0,20,-17,37,-43,37v-23,0,-41,-18,-41,-37xm31,-93v-11,-49,-23,-96,-19,-159r86,0v4,64,-8,111,-20,159r-47,0","w":110},"(":{"d":"94,-293r37,38v-17,21,-56,65,-56,143v0,80,35,124,56,149r-37,38v-39,-35,-85,-105,-85,-187v0,-85,55,-155,85,-181","w":139},")":{"d":"9,-255r37,-38v30,26,85,96,85,181v0,82,-46,153,-85,188r-37,-39v21,-25,55,-69,55,-149v0,-78,-38,-122,-55,-143","w":139},"\"":{"d":"13,-252r69,0r-11,107r-45,0xm100,-252r69,0r-13,107r-45,0","w":181},"$":{"d":"81,-279r50,0r0,37v8,4,16,10,21,18r2,-20r53,0r0,84r-55,0v0,-25,-17,-40,-40,-40v-9,0,-22,6,-22,18v0,35,122,28,122,108v0,53,-44,69,-81,70r0,37r-50,0r0,-47v-6,-4,-13,-9,-19,-14r-4,22r-53,0r0,-87r57,0v0,29,29,35,43,35v10,0,27,-3,27,-18v0,-27,-117,-22,-117,-103v0,-48,36,-68,66,-70r0,-30","w":217},"%":{"d":"257,0v-43,0,-74,-29,-74,-75v0,-44,36,-73,73,-73v47,0,74,30,74,75v0,42,-27,73,-73,73xm80,-110v-43,0,-75,-29,-75,-75v0,-44,36,-73,73,-73v47,0,74,29,74,74v0,42,-26,74,-72,74xm109,0r-41,0r156,-252r41,0xm237,-75v0,53,40,56,39,2v1,-50,-39,-56,-39,-2xm80,-143v11,0,18,-16,18,-41v1,-50,-39,-55,-39,-1v0,26,12,42,21,42","w":335},"\/":{"d":"53,29r-51,-1r134,-299r51,0","w":188},"+":{"d":"188,-157r0,47r-66,0r0,66r-47,0r0,-66r-66,0r0,-47r66,0r0,-66r47,0r0,66r66,0","w":196},"<":{"d":"13,-122r0,-45r154,-64r18,44r-110,42r110,43r-18,44","w":197},">":{"d":"185,-167r0,45r-155,63r-17,-44r110,-42r-110,-42r17,-44","w":197},"&":{"d":"99,5v-103,-1,-132,-108,-42,-152v-50,-33,-24,-109,50,-109v94,0,98,93,38,114r33,33v9,-16,15,-33,19,-48r77,0r0,46r-35,0v-6,17,-13,30,-21,42v12,10,17,26,43,22r0,47r-53,0r-24,-23v-19,18,-51,28,-85,28xm71,-76v0,37,47,32,72,12v-17,-14,-29,-33,-48,-45v-10,6,-24,20,-24,33xm128,-194v0,-10,-6,-22,-21,-22v-11,0,-18,11,-18,20v0,29,39,37,39,2","w":277},"A":{"d":"291,-47r0,47r-144,0r0,-47r34,0r-8,-25r-74,0r-7,25r28,0r0,47r-115,0r0,-47r25,0r48,-158r-14,0r0,-47r138,0r64,205r25,0xm136,-193r-23,78r47,0","w":296},"|":{"d":"36,-252r48,0r0,325r-48,0r0,-325","w":119},"_":{"d":"9,0r0,-30r234,0r0,30r-234,0","w":251},"*":{"d":"136,-142r-33,25r-28,-40r-30,41r-32,-26r31,-34r-42,-15r15,-35r41,19r-5,-45r44,0r-6,46r41,-20r15,35r-44,15","w":148},"^":{"d":"82,-252r52,0r77,143r-64,0r-39,-81r-40,81r-64,0","w":214},"#":{"d":"25,-156r0,-49r56,0r17,-66r47,0r-17,66r48,0r17,-66r48,0r-17,66r41,0r0,49r-53,0r-11,41r44,0r0,49r-56,0r-17,66r-47,0r16,-66r-48,0r-17,66r-47,0r16,-66r-40,0r0,-49r53,0r10,-41r-43,0xm116,-156r-11,41r49,0r10,-41r-48,0","w":270},"\u00a0":{"w":90}}});

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
    {
        def: 'easeOutQuad',
        swing: function (x, t, b, c, d) {
            //alert(jQuery.easing.default);
            return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
        },
        easeInQuad: function (x, t, b, c, d) {
            return c*(t/=d)*t + b;
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        },
        easeInQuart: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        },
        easeOutQuart: function (x, t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        easeInQuint: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOutQuint: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOutQuint: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        },
        easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOutSine: function (x, t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },
        easeInExpo: function (x, t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOutExpo: function (x, t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOutExpo: function (x, t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        },
        easeInElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },
        easeInOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        },
        easeInBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        easeInBounce: function (x, t, b, c, d) {
            return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOutBounce: function (x, t, b, c, d) {
            if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
            return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    });

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
