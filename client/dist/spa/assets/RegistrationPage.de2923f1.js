import{Q as _,a as d}from"./QForm.bac847a1.js";import{Q as h}from"./vm.e1a0da41.js";import{_ as w,h as o,f as b,o as c,a as V,e as n,w as x,A as p,U,d as t,t as k,i as g,j as y,k as L,u as P,r as E}from"./index.42e2b6da.js";import{v as R}from"./emailValidation.001f0b79.js";import{P as S}from"./PrimaryButton.676e9e17.js";const T={setup(){const r=o(""),a=o(""),m=o(""),e=o(!1),l=o(!1),u=P(),i=b();return{email:r,password:a,isLoading:e,isRegistrationError:l,username:m,pushToLogin:()=>{u.push("/login")},submitForm:async()=>{try{e.value=!0,l.value=!1,await new Promise(v=>setTimeout(v,600)),await p.registration({email:r.value,username:m.value,password:a.value}),await p.login({email:r.value,password:a.value});const f=await U.getUser();i.setIsAuth(!0),i.setUser(f.data),u.push("/profile"),e.value=!1}catch{l.value=!0,e.value=!1}},validateEmail:R}},components:{PrimaryButton:S}},B={class:"absolute-center"},Q=t("h1",{class:"form-title"},"Registration",-1),z={class:"text-negative error-msg"},A={class:"submit"},C={class:"q-mt-md text-grey"};function F(r,a,m,e,l,u){const i=E("primary-button");return c(),V("div",B,[n(_,{onSubmit:e.submitForm},{default:x(()=>[Q,n(d,{filled:"",modelValue:e.email,"onUpdate:modelValue":a[0]||(a[0]=s=>e.email=s),label:"Email","label-color":"grey",color:"white","lazy-rules":"",rules:[s=>!!s||"Email is missing",()=>e.validateEmail(e.email)||"Invalid email"]},null,8,["modelValue","rules"]),n(d,{filled:"",modelValue:e.username,"onUpdate:modelValue":a[1]||(a[1]=s=>e.username=s),label:"Username","label-color":"grey",color:"white",type:"text","lazy-rules":"",rules:[s=>s&&s.length>0||"Please type your username"]},null,8,["modelValue","rules"]),n(d,{filled:"",modelValue:e.password,"onUpdate:modelValue":a[2]||(a[2]=s=>e.password=s),label:"Password","label-color":"grey",color:"white",type:"password","lazy-rules":"",rules:[s=>s&&s.length>0||"Please type password"]},null,8,["modelValue","rules"]),t("p",z,k(e.isRegistrationError?"User with this email already exists":""),1),t("div",A,[e.isLoading?y("",!0):(c(),g(i,{key:0,class:"btn",text:"Registration"})),e.isLoading?(c(),g(h,{key:1,color:"white",size:"3em",thickness:2})):y("",!0)]),t("p",C,[L(" Already have an account? "),t("a",{onClick:a[3]||(a[3]=(...s)=>e.pushToLogin&&e.pushToLogin(...s)),class:"q-ml-sm text-white cursor-pointer"},"Login")])]),_:1},8,["onSubmit"])])}var H=w(T,[["render",F]]);export{H as default};
