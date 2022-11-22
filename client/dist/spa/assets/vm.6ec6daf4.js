import{h as u,N as x,O as _,H as r,s as M}from"./index.abd329e6.js";const d={xs:18,sm:24,md:32,lg:38,xl:46},j={size:String};function q(e,n=d){return u(()=>e.size!==void 0?{fontSize:e.size in n?`${n[e.size]}px`:e.size}:null)}const b=e=>x(_(e)),A=e=>x(e);function C(e,n){return e!==void 0&&e()||n}function G(e,n){if(e!==void 0){const a=e();if(a!=null)return a.slice()}return n}function c(e,n){return e!==void 0?n.concat(e()):n}const g="0 0 24 24",h=e=>e,v=e=>`ionicons ${e}`,y={"mdi-":e=>`mdi ${e}`,"icon-":h,"bt-":e=>`bt ${e}`,"eva-":e=>`eva ${e}`,"ion-md":v,"ion-ios":v,"ion-logo":v,"iconfont ":h,"ti-":e=>`themify-icon ${e}`,"bi-":e=>`bootstrap-icons ${e}`},S={o_:"-outlined",r_:"-round",s_:"-sharp"},z={sym_o_:"-outlined",sym_r_:"-rounded",sym_s_:"-sharp"},Q=new RegExp("^("+Object.keys(y).join("|")+")"),D=new RegExp("^("+Object.keys(S).join("|")+")"),p=new RegExp("^("+Object.keys(z).join("|")+")"),F=/^[Mm]\s?[-+]?\.?\d/,I=/^img:/,O=/^svguse:/,N=/^ion-/,P=/^(fa-(solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;var J=b({name:"QIcon",props:{...j,tag:{type:String,default:"i"},name:String,color:String,left:Boolean,right:Boolean},setup(e,{slots:n}){const{proxy:{$q:a}}=M(),$=q(e),w=u(()=>"q-icon"+(e.left===!0?" on-left":"")+(e.right===!0?" on-right":"")+(e.color!==void 0?` text-${e.color}`:"")),o=u(()=>{let i,t=e.name;if(t==="none"||!t)return{none:!0};if(a.iconMapFn!==null){const s=a.iconMapFn(t);if(s!==void 0)if(s.icon!==void 0){if(t=s.icon,t==="none"||!t)return{none:!0}}else return{cls:s.cls,content:s.content!==void 0?s.content:" "}}if(F.test(t)===!0){const[s,f=g]=t.split("|");return{svg:!0,viewBox:f,nodes:s.split("&&").map(R=>{const[k,E,B]=R.split("@@");return r("path",{style:E,d:k,transform:B})})}}if(I.test(t)===!0)return{img:!0,src:t.substring(4)};if(O.test(t)===!0){const[s,f=g]=t.split("|");return{svguse:!0,src:s.substring(7),viewBox:f}}let l=" ";const m=t.match(Q);if(m!==null)i=y[m[1]](t);else if(P.test(t)===!0)i=t;else if(N.test(t)===!0)i=`ionicons ion-${a.platform.is.ios===!0?"ios":"md"}${t.substring(3)}`;else if(p.test(t)===!0){i="notranslate material-symbols";const s=t.match(p);s!==null&&(t=t.substring(6),i+=z[s[1]]),l=t}else{i="notranslate material-icons";const s=t.match(D);s!==null&&(t=t.substring(2),i+=S[s[1]]),l=t}return{cls:i,content:l}});return()=>{const i={class:w.value,style:$.value,"aria-hidden":"true",role:"presentation"};return o.value.none===!0?r(e.tag,i,C(n.default)):o.value.img===!0?r("span",i,c(n.default,[r("img",{src:o.value.src})])):o.value.svg===!0?r("span",i,c(n.default,[r("svg",{viewBox:o.value.viewBox||"0 0 24 24"},o.value.nodes)])):o.value.svguse===!0?r("span",i,c(n.default,[r("svg",{viewBox:o.value.viewBox},[r("use",{"xlink:href":o.value.src})])])):(o.value.cls!==void 0&&(i.class+=" "+o.value.cls),r(e.tag,i,c(n.default,[o.value.content])))}}});const U={size:{type:[Number,String],default:"1em"},color:String};function H(e){return{cSize:u(()=>e.size in d?`${d[e.size]}px`:e.size),classes:u(()=>"q-spinner"+(e.color?` text-${e.color}`:""))}}var K=b({name:"QSpinner",props:{...U,thickness:{type:Number,default:5}},setup(e){const{cSize:n,classes:a}=H(e);return()=>r("svg",{class:a.value+" q-spinner-mat",width:n.value,height:n.value,viewBox:"25 25 50 50"},[r("circle",{class:"path",cx:"50",cy:"50",r:"20",fill:"none",stroke:"currentColor","stroke-width":e.thickness,"stroke-miterlimit":"10"})])}});function L(e){return e.appContext.config.globalProperties.$router!==void 0}function T(e){return e.isUnmounted===!0||e.isDeactivated===!0}export{K as Q,J as a,G as b,b as c,c as d,A as e,L as f,q as g,C as h,j as u,T as v};
