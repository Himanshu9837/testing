"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7938],{26447:function(e,n,r){var t=r(63366),o=r(87462),s=r(67294),i=r(95408),c=r(98700),a=r(39707),u=r(59766),l=r(11496),p=r(27623),d=r(85893);const f=["component","direction","spacing","divider","children"];function h(e,n){const r=s.Children.toArray(e).filter(Boolean);return r.reduce(((e,t,o)=>(e.push(t),o<r.length-1&&e.push(s.cloneElement(n,{key:`separator-${o}`})),e)),[])}const m=(0,l.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,n)=>[n.root]})((({ownerState:e,theme:n})=>{let r=(0,o.Z)({display:"flex"},(0,i.k9)({theme:n},(0,i.P$)({values:e.direction,breakpoints:n.breakpoints.values}),(e=>({flexDirection:e}))));if(e.spacing){const t=(0,c.hB)(n),o=Object.keys(n.breakpoints.values).reduce(((n,r)=>(null==e.spacing[r]&&null==e.direction[r]||(n[r]=!0),n)),{}),s=(0,i.P$)({values:e.direction,base:o}),a=(0,i.P$)({values:e.spacing,base:o}),l=(n,r)=>{return{"& > :not(style) + :not(style)":{margin:0,[`margin${o=r?s[r]:e.direction,{row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"}[o]}`]:(0,c.NA)(t,n)}};var o};r=(0,u.Z)(r,(0,i.k9)({theme:n},a,l))}return r})),v=s.forwardRef((function(e,n){const r=(0,p.Z)({props:e,name:"MuiStack"}),s=(0,a.Z)(r),{component:i="div",direction:c="column",spacing:u=0,divider:l,children:v}=s,k=(0,t.Z)(s,f),Z={direction:c,spacing:u};return(0,d.jsx)(m,(0,o.Z)({as:i,ownerState:Z,ref:n},k,{children:l?h(v,l):v}))}));n.Z=v},37938:function(e,n,r){r.r(n),r.d(n,{default:function(){return t.Z}});var t=r(26447)},39707:function(e,n,r){r.d(n,{Z:function(){return a}});var t=r(87462),o=r(63366),s=r(59766),i=r(48528);const c=["sx"];function a(e){const{sx:n}=e,r=(0,o.Z)(e,c),{systemProps:a,otherProps:u}=(e=>{const n={systemProps:{},otherProps:{}};return Object.keys(e).forEach((r=>{i.G[r]?n.systemProps[r]=e[r]:n.otherProps[r]=e[r]})),n})(r);let l;return l=Array.isArray(n)?[a,...n]:"function"===typeof n?(...e)=>{const r=n(...e);return(0,s.P)(r)?(0,t.Z)({},a,r):a}:(0,t.Z)({},a,n),(0,t.Z)({},u,{sx:l})}}}]);