"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3250],{53707:function(e,a,n){var c=n(95318);a.Z=void 0;var t=c(n(64938)),s=n(85893),l=(0,t.default)((0,s.jsx)("path",{d:"m19 8-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"}),"Cached");a.Z=l},60888:function(e,a,n){var c=n(95318);a.Z=void 0;var t=c(n(64938)),s=n(85893),l=(0,t.default)((0,s.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckCircle");a.Z=l},3250:function(e,a,n){n.r(a);var c=n(85893),t=(n(21535),n(67294)),s=n(53707),l=n(22903),i=n(60888);a.default=function(e){var a=e.size,n=function(e){for(var a="",n=b.length,c=0;c<e;c++)a+=b.charAt(Math.floor(Math.random()*n));j(a)},d=["smalls","bigs"],r=d.includes(a)?a:d[0],o=(0,t.useContext)(l.Z),u=(o.capchaverify,o.setcapchaverify),h=(0,t.useState)(!1),m=h[0],p=h[1],f=(0,t.useState)({username:""}),v=f[0],y=f[1],x=(0,t.useState)(""),C=x[0],j=x[1],b="abcdefghijklmnopqrstuvwxyz1234567890";return(0,t.useEffect)((function(){n(8)}),[]),(0,c.jsx)("div",{class:"containercapcha",children:(0,c.jsxs)("div",{class:"capchainner",children:[(0,c.jsx)("div",{className:"randomnumber",id:"randoms",children:(0,c.jsx)("h4",{id:"captcha",className:"captcha",children:C})}),(0,c.jsxs)("div",{class:"entercapcha",children:[(0,c.jsx)("input",{type:"text",id:"inputType",className:"form-control ".concat(r),placeholder:"Enter Captcha",name:"username",onChange:function(e){var a=e.target.name,n=e.target.value;v[a]=n,y(v)},autocomplete:"off"}),(0,c.jsx)("div",{className:"reload",onClick:function(){n(8)},id:"reload",children:(0,c.jsx)(s.Z,{})})]}),m?(0,c.jsx)("div",{className:"completed",children:(0,c.jsx)(i.Z,{})}):(0,c.jsx)("div",{className:"verifycapchabtn",children:(0,c.jsx)("p",{id:"succesBTN",onClick:function(e){console.log(C);var a=document.getElementById("succesBTN"),n=document.getElementById("inputType"),c=document.getElementById("reload"),t=document.getElementById("randoms");a.style.cursor="wait",a.innerHTML="Checking...",n.disabled=!0,a.disabled=!0;setTimeout((function(){if(C==v.username)p(!0),a.innerHTML="Captcha Verified",a.disabled=!0,a.style.cursor="not-allowed",n.style.display="none",c.style.display="none",t.style.display="none",u(!1);else{a.style.cursor="not-allowed",a.innerHTML="Not Matched",a.disabled=!0;setTimeout((function(){a.style.cursor="pointer",a.innerHTML="Verify Captcha",a.disabled=!1,n.disabled=!1,n.value=""}),2e3)}}),2e3)},className:"verifycapchabtns",children:"Verify Captcha"})})]})})}}}]);