(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3269,1088,7892],{37412:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/resetpassword/[resetpassword]",function(){return r(79698)}])},75941:function(e,n){"use strict";n.Z={src:"/_next/static/media/Login_design.74f1c02d.svg",height:336,width:336}},71088:function(e,n,r){"use strict";r.r(n);var s=r(85893);r(67294);n.default=function(e){var n=e.prop,r=e.Headsize,t=e.Headcolor,a=e.Headalign,c=["Head-small","Head-medium","Head-large"],o=["White","Black"],i=["Center","Left","Right"],u=c.includes(r)?r:c[0],l=o.includes(t)?t:o[0],d=i.includes(a)?a:i[0];return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("div",{className:"head ".concat(u," ").concat(l," ").concat(d),children:(0,s.jsx)("h3",{children:n})})})}},57892:function(e,n,r){"use strict";r.r(n);var s=r(85893);r(67294);n.default=function(e){var n=e.prop,r=e.spansize,t=e.spancolor,a=e.spanalign,c=["small","medium","large"],o=["Left","Center"],i=c.includes(r)?r:c[0],u=c.includes(t)?t:"firstcolor",l=o.includes(a)?a:o[0];return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("div",{className:"span ".concat(i," ").concat(u,"  ").concat(l),children:(0,s.jsx)("h5",{children:n})})})}},79698:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return g},getInitialProps:function(){return x}});var s=r(34051),t=r.n(s),a=r(85893),c=r(67294),o=r(75941),i=r(72132),u=r(71088),l=r(57892),d=r(11163),p=r(25675),f=r.n(p);function h(e,n,r,s,t,a,c){try{var o=e[a](c),i=o.value}catch(u){return void r(u)}o.done?n(i):Promise.resolve(i).then(s,t)}function w(e){return function(){var n=this,r=arguments;return new Promise((function(s,t){var a=e.apply(n,r);function c(e){h(a,s,t,c,o,"next",e)}function o(e){h(a,s,t,c,o,"throw",e)}c(void 0)}))}}function m(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}i.Am.configure();var v=function(e){return(0,i.Am)(e)};function g(){var e,n,r=(0,d.useRouter)(),s=(0,c.useState)(!1),p=s[0],h=(s[1],(0,c.useState)("")),g=h[0],x=h[1],j=(0,c.useState)({password:"",cpassword:""}),y=j[0],N=j[1],b=function(r){e=r.target.name,n=r.target.value,N(function(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{},s=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),s.forEach((function(n){m(e,n,r[n])}))}return e}({},y,m({},e,n)))};console.log(y);var P=function(){var e=w(t().mark((function e(){var n,s,a,c;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=y.password,s=y.cpassword,!(y.password.length&&y.cpassword.length>=3)){e.next=11;break}return e.next=4,fetch("".concat("http://178.62.228.242:5000/","api/newpassword/").concat(g),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:n,cpassword:s})});case 4:return a=e.sent,e.next=7,a.json();case 7:c=e.sent,400!==a.status&&c?(v("Password Update Successfully"),r.replace("/login")):v("Oops  Password Not Match!"),e.next=12;break;case 11:y.password.length&&y.cpassword.length<=3?v("Password Greater than 3 character"):v("Fill Input First");case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,c.useEffect)((function(){if(r.isReady){var e=r.query.resetpassword;console.log(e),x(e)}}),[r.isReady]),(0,a.jsxs)("div",{className:" containerresetpassword",children:[(0,a.jsx)("div",{className:"alerts",children:(0,a.jsx)(i.Ix,{autoClose:600})}),p?(0,a.jsx)("div",{class:"loader"}):(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{className:"innerwrapper",children:[(0,a.jsx)("div",{className:"image1",children:(0,a.jsx)(f(),{src:o.Z})}),(0,a.jsxs)("div",{className:"innerwarpper5",children:[(0,a.jsxs)("div",{className:"title",children:[(0,a.jsx)(u.default,{prop:"Reset Your's Password"}),(0,a.jsx)(l.default,{prop:"Login to your account",spanalign:"Center"})]}),(0,a.jsx)("div",{className:"input-fields",children:(0,a.jsxs)("form",{method:"post",children:[(0,a.jsx)("input",{type:"password",placeholder:"New Password",name:"password",className:"input",onChange:b,required:!0}),(0,a.jsx)("input",{type:"password",placeholder:"Confirm Password",name:"cpassword",className:"input",onChange:b,required:!0})]})}),(0,a.jsx)("div",{className:"btn",children:(0,a.jsx)("button",{className:"button",onClick:P,children:"Confirm"})})]}),(0,a.jsx)("div",{className:"image2",children:(0,a.jsx)(f(),{src:o.Z})})]})})]})}function x(e){return j.apply(this,arguments)}function j(){return(j=w(t().mark((function e(n){return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.req,n.res.setHeader("Cache-Control","public, s-maxage=10, stale-while-revalidate=59"),e.abrupt("return",{props:{}});case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}},function(e){e.O(0,[2132,9774,2888,179],(function(){return n=37412,e(e.s=n);var n}));var n=e.O();_N_E=n}]);