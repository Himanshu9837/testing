(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9155],{1066:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/emailverify/[verifyemail]",function(){return t(57161)}])},63792:function(e,n){"use strict";n.Z={src:"/_next/static/media/checked_1.a0402efc.png",height:94,width:97,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAV1BMVEUwuXs3soksuHgfrXVVxpIvuHsCnGYltnMNom8ns3gzu3w1u37z+vgrt3cyunwjtXIpt3bO7OHN7t8KoG7Z8uYMom/i9ew6vIEKoG4ltXX+/v9xz6SR2bpIYAeFAAAAGXRSTlP9/rWE/e79AfoS2HD9KJ7KxP391f4W+P6fxOlqGgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAEFJREFUCJkFwQUCwCAMALFDW2xusP3/nUuQNAVsE1IGCA0H/b4+y/xu/hhGWXwd1USldL+aqA9i6VH3E5GSg0vyA1bdAoX47rYPAAAAAElFTkSuQmCC"}},57161:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return p},getInitialProps:function(){return v}});var r=t(34051),i=t.n(r),a=t(85893),s=t(67294),c=t(63792),o=t(11163),u=t(9669),l=t.n(u),A=t(25675),d=t.n(A);function f(e,n,t,r,i,a,s){try{var c=e[a](s),o=c.value}catch(u){return void t(u)}c.done?n(o):Promise.resolve(o).then(r,i)}function h(e){return function(){var n=this,t=arguments;return new Promise((function(r,i){var a=e.apply(n,t);function s(e){f(a,r,i,s,c,"next",e)}function c(e){f(a,r,i,s,c,"throw",e)}s(void 0)}))}}function p(){var e=(0,o.useRouter)();return(0,s.useEffect)((function(){!function(){if(e.isReady){var n=e.query.verifyemail;console.log(n),l()({method:"POST",url:"".concat("http://178.62.228.242:5000/","api/emailsuccess/").concat(n)}).then((function(e){console.log("res",e)})).catch((function(e){console.log("error in request",e)}))}}()}),[e.isReady]),(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{class:"conatiner",children:(0,a.jsx)("div",{class:"paymentstatus",children:(0,a.jsx)("div",{class:"paymentwrapper",id:"emailverify",children:(0,a.jsxs)("div",{className:"emailwrapper",children:[(0,a.jsx)("div",{class:"paymenticon",children:(0,a.jsx)(d(),{src:c.Z,alt:"notfound"})}),(0,a.jsxs)("div",{class:"payment-detail",children:[(0,a.jsx)("h2",{className:"auth",children:"Authenication complete"}),(0,a.jsx)("p",{className:"paraemail",children:"You may now close this window  and go back to the previous page"})]})]})})})})})}function v(e){return m.apply(this,arguments)}function m(){return(m=h(i().mark((function e(n){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.req,n.res.setHeader("Cache-Control","public, s-maxage=10, stale-while-revalidate=59"),e.abrupt("return",{props:{}});case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}},function(e){e.O(0,[9774,2888,179],(function(){return n=1066,e(e.s=n);var n}));var n=e.O();_N_E=n}]);