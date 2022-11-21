import{c as A,g as G,Q as J}from"./QBtn.7111cd47.js";import{c as T,h as Z,b as ee,d as te}from"./vm.c81ccf03.js";import{g as f,F as g,h as y,E as U,m as H,n as E,N as I,B as j,q as O,O as N,P as Q,l as S,p as oe,Q as K,R as q,S as ne,K as ie,_ as le,f as re,o as ae,i as se,w as B,u as ue,A as ce,e as R,d as X,t as de,r as fe}from"./index.8d9e16c5.js";var ve=T({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:a}){const o=f(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>g("div",{class:o.value,role:"toolbar"},Z(a.default))}});function he(){const e=y(!U.value);return e.value===!1&&H(()=>{e.value=!0}),e}const Y=typeof ResizeObserver<"u",D=Y===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var W=T({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:a}){let o=null,t,i={width:-1,height:-1};function d(s){s===!0||e.debounce===0||e.debounce==="0"?u():o===null&&(o=setTimeout(u,e.debounce))}function u(){if(clearTimeout(o),o=null,t){const{offsetWidth:s,offsetHeight:l}=t;(s!==i.width||l!==i.height)&&(i={width:s,height:l},a("resize",i))}}const{proxy:h}=O();if(Y===!0){let s;const l=m=>{t=h.$el.parentNode,t?(s=new ResizeObserver(d),s.observe(t),u()):m!==!0&&j(()=>{l(!0)})};return H(()=>{l()}),E(()=>{clearTimeout(o),s!==void 0&&(s.disconnect!==void 0?s.disconnect():t&&s.unobserve(t))}),I}else{let m=function(){clearTimeout(o),l!==void 0&&(l.removeEventListener!==void 0&&l.removeEventListener("resize",d,N.passive),l=void 0)},b=function(){m(),t&&t.contentDocument&&(l=t.contentDocument.defaultView,l.addEventListener("resize",d,N.passive),u())};const s=he();let l;return H(()=>{j(()=>{t=h.$el,t&&b()})}),E(m),h.trigger=d,()=>{if(s.value===!0)return g("object",{style:D.style,tabindex:-1,type:"text/html",data:D.url,"aria-hidden":"true",onLoad:b})}}}}),me=T({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:a,emit:o}){const{proxy:{$q:t}}=O(),i=oe(K,Q);if(i===Q)return console.error("QHeader needs to be child of QLayout"),Q;const d=y(parseInt(e.heightHint,10)),u=y(!0),h=f(()=>e.reveal===!0||i.view.value.indexOf("H")>-1||t.platform.is.ios&&i.isContainer.value===!0),s=f(()=>{if(e.modelValue!==!0)return 0;if(h.value===!0)return u.value===!0?d.value:0;const n=d.value-i.scroll.value.position;return n>0?n:0}),l=f(()=>e.modelValue!==!0||h.value===!0&&u.value!==!0),m=f(()=>e.modelValue===!0&&l.value===!0&&e.reveal===!0),b=f(()=>"q-header q-layout__section--marginal "+(h.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(l.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),z=f(()=>{const n=i.rows.value.top,w={};return n[0]==="l"&&i.left.space===!0&&(w[t.lang.rtl===!0?"right":"left"]=`${i.left.size}px`),n[2]==="r"&&i.right.space===!0&&(w[t.lang.rtl===!0?"left":"right"]=`${i.right.size}px`),w});function c(n,w){i.update("header",n,w)}function p(n,w){n.value!==w&&(n.value=w)}function V({height:n}){p(d,n),c("size",n)}function $(n){m.value===!0&&p(u,!0),o("focusin",n)}S(()=>e.modelValue,n=>{c("space",n),p(u,!0),i.animate()}),S(s,n=>{c("offset",n)}),S(()=>e.reveal,n=>{n===!1&&p(u,e.modelValue)}),S(u,n=>{i.animate(),o("reveal",n)}),S(i.scroll,n=>{e.reveal===!0&&p(u,n.direction==="up"||n.position<=e.revealOffset||n.position-n.inflectionPoint<100)});const _={};return i.instances.header=_,e.modelValue===!0&&c("size",d.value),c("space",e.modelValue),c("offset",s.value),E(()=>{i.instances.header===_&&(i.instances.header=void 0,c("size",0),c("offset",0),c("space",!1))}),()=>{const n=ee(a.default,[]);return e.elevated===!0&&n.push(g("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),n.push(g(W,{debounce:0,onResize:V})),g("header",{class:b.value,style:z.value,onFocusin:$},n)}}});const ge=[null,document,document.body,document.scrollingElement,document.documentElement];function be(e,a){let o=G(a);if(o===void 0){if(e==null)return window;o=e.closest(".scroll,.scroll-y,.overflow-auto")}return ge.includes(o)?window:o}function we(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function ye(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}let C;function F(){if(C!==void 0)return C;const e=document.createElement("p"),a=document.createElement("div");A(e,{width:"100%",height:"200px"}),A(a,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),a.appendChild(e),document.body.appendChild(a);const o=e.offsetWidth;a.style.overflow="scroll";let t=e.offsetWidth;return o===t&&(t=a.clientWidth),a.remove(),C=o-t,C}const{passive:M}=N,pe=["both","horizontal","vertical"];var ze=T({name:"QScrollObserver",props:{axis:{type:String,validator:e=>pe.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:a}){const o={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let t=null,i,d;S(()=>e.scrollTarget,()=>{s(),h()});function u(){t!==null&&t();const b=Math.max(0,we(i)),z=ye(i),c={top:b-o.position.top,left:z-o.position.left};if(e.axis==="vertical"&&c.top===0||e.axis==="horizontal"&&c.left===0)return;const p=Math.abs(c.top)>=Math.abs(c.left)?c.top<0?"up":"down":c.left<0?"left":"right";o.position={top:b,left:z},o.directionChanged=o.direction!==p,o.delta=c,o.directionChanged===!0&&(o.direction=p,o.inflectionPoint=o.position),a("scroll",{...o})}function h(){i=be(d,e.scrollTarget),i.addEventListener("scroll",l,M),l(!0)}function s(){i!==void 0&&(i.removeEventListener("scroll",l,M),i=void 0)}function l(b){if(b===!0||e.debounce===0||e.debounce==="0")u();else if(t===null){const[z,c]=e.debounce?[setTimeout(u,e.debounce),clearTimeout]:[requestAnimationFrame(u),cancelAnimationFrame];t=()=>{c(z),t=null}}}const{proxy:m}=O();return S(()=>m.$q.lang.rtl,u),H(()=>{d=m.$el.parentNode,h()}),E(()=>{t!==null&&t(),s()}),Object.assign(m,{trigger:l,getPosition:()=>o}),I}}),Se=T({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:a,emit:o}){const{proxy:{$q:t}}=O(),i=y(null),d=y(t.screen.height),u=y(e.container===!0?0:t.screen.width),h=y({position:0,direction:"down",inflectionPoint:0}),s=y(0),l=y(U.value===!0?0:F()),m=f(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),b=f(()=>e.container===!1?{minHeight:t.screen.height+"px"}:null),z=f(()=>l.value!==0?{[t.lang.rtl===!0?"left":"right"]:`${l.value}px`}:null),c=f(()=>l.value!==0?{[t.lang.rtl===!0?"right":"left"]:0,[t.lang.rtl===!0?"left":"right"]:`-${l.value}px`,width:`calc(100% + ${l.value}px)`}:null);function p(r){if(e.container===!0||document.qScrollPrevented!==!0){const v={position:r.position.top,direction:r.direction,directionChanged:r.directionChanged,inflectionPoint:r.inflectionPoint.top,delta:r.delta.top};h.value=v,e.onScroll!==void 0&&o("scroll",v)}}function V(r){const{height:v,width:x}=r;let L=!1;d.value!==v&&(L=!0,d.value=v,e.onScrollHeight!==void 0&&o("scrollHeight",v),_()),u.value!==x&&(L=!0,u.value=x),L===!0&&e.onResize!==void 0&&o("resize",r)}function $({height:r}){s.value!==r&&(s.value=r,_())}function _(){if(e.container===!0){const r=d.value>s.value?F():0;l.value!==r&&(l.value=r)}}let n;const w={instances:{},view:f(()=>e.view),isContainer:f(()=>e.container),rootRef:i,height:d,containerHeight:s,scrollbarWidth:l,totalWidth:f(()=>u.value+l.value),rows:f(()=>{const r=e.view.toLowerCase().split(" ");return{top:r[0].split(""),middle:r[1].split(""),bottom:r[2].split("")}}),header:q({size:0,offset:0,space:!1}),right:q({size:300,offset:0,space:!1}),footer:q({size:0,offset:0,space:!1}),left:q({size:300,offset:0,space:!1}),scroll:h,animate(){n!==void 0?clearTimeout(n):document.body.classList.add("q-body--layout-animate"),n=setTimeout(()=>{document.body.classList.remove("q-body--layout-animate"),n=void 0},155)},update(r,v,x){w[r][v]=x}};if(ie(K,w),F()>0){let x=function(){r=null,v.classList.remove("hide-scrollbar")},L=function(){if(r===null){if(v.scrollHeight>t.screen.height)return;v.classList.add("hide-scrollbar")}else clearTimeout(r);r=setTimeout(x,300)},P=function(k){r!==null&&k==="remove"&&(clearTimeout(r),x()),window[`${k}EventListener`]("resize",L)},r=null;const v=document.body;S(()=>e.container!==!0?"add":"remove",P),e.container!==!0&&P("add"),ne(()=>{P("remove")})}return()=>{const r=te(a.default,[g(ze,{onScroll:p}),g(W,{onResize:V})]),v=g("div",{class:m.value,style:b.value,ref:e.container===!0?void 0:i,tabindex:-1},r);return e.container===!0?g("div",{class:"q-layout-container overflow-hidden",ref:i},[g(W,{onResize:$}),g("div",{class:"absolute-full",style:z.value},[g("div",{class:"scroll",style:c.value},[v])])]):v}}});const xe={setup(){const e=ue(),a=re(),o=y(f(()=>a.isAuth)),t=y(f(()=>a.user));return{store:a,isAuth:o,user:t,logout:async()=>{try{e.push("/"),a.setIsAuth(!1),a.setUser({}),await ce.logout()}catch{}},router:e}}},_e=X("span",{class:"text-grey q-mr-sm"},"Logged as: ",-1),Le={class:"q-mr-md"};function Te(e,a,o,t,i,d){const u=fe("RouterView");return ae(),se(Se,null,{default:B(()=>[R(me,{style:{"background-color":"transparent"}},{default:B(()=>[R(ve,{class:"row justify-end"},{default:B(()=>[_e,X("span",Le,de(t.store.user.username),1),R(J,{onClick:t.logout,color:"grey",flat:"",round:"",dense:"",icon:"logout"},null,8,["onClick"])]),_:1})]),_:1}),R(u)]),_:1})}var He=le(xe,[["render",Te]]);export{He as default};
