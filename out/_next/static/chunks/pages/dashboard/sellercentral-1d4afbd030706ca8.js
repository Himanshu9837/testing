(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3732],{24740:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/sellercentral",function(){return a(5409)}])},5409:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return q},getInitialProps:function(){return P}});var n=a(34051),c=a.n(n),r=a(85893),l=a(67294),i=a(36825),t=a(60888),d=a(27036),o=a(21075),h=a(80923),u=a(10721),x=a(36876),m=(a(45787),a(45930)),j=a(11163),v=a(44510),p=a(32141),N=a(27608),f=a(9669),g=a.n(f),b=a(72132);function y(e,s,a,n,c,r,l){try{var i=e[r](l),t=i.value}catch(d){return void a(d)}i.done?s(t):Promise.resolve(t).then(n,c)}function w(e){return function(){var s=this,a=arguments;return new Promise((function(n,c){var r=e.apply(s,a);function l(e){y(r,n,c,l,i,"next",e)}function i(e){y(r,n,c,l,i,"throw",e)}l(void 0)}))}}var k=function(){var e="http://178.62.228.242:5000/",s=(0,l.useState)(new Date),a=s[0],n=s[1],i=(0,l.useState)(!1),f=i[0],y=i[1],k=(0,l.useState)(),S=k[0],Z=k[1],F=(0,l.useState)(),_=F[0],C=F[1],q=(0,l.useState)(),P=q[0],A=q[1],D=(0,l.useState)(""),E=D[0],L=D[1],z=(0,l.useState)(""),M=z[0],O=z[1],T=(0,l.useState)(""),I=T[0],U=T[1],$=(0,l.useState)([]),R=$[0],H=$[1],Y=(0,l.useState)(!1),B=Y[0],J=Y[1],X=(0,l.useState)(""),W=X[0],G=X[1],K=(0,l.useState)(""),Q=K[0],V=K[1],ee=(0,l.useState)(!0),se=ee[0],ae=ee[1],ne=(0,l.useState)([]),ce=ne[0],re=ne[1],le=(0,j.useRouter)();(0,l.useEffect)((function(){var s=localStorage.getItem("user");if(s){var a=null!==s?JSON.parse(s):[],n=a.tokenData.email,c=a.tokenData.id;fetch("".concat(e,"api/checklogin/").concat(n)).then((function(e){return e.json()})).then((function(e){console.log(e),1==e?le.push("/dashboard/sellercentral"):0==e&&le.push("/login")})),ie(),te(c),de(c),oe(),G(c)}else le.push("/login")}),[]);var ie=function(){var s=w(c().mark((function s(){var a;return c().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return setTimeout((function(){ae(!1)}),1500),s.next=3,fetch("".concat(e,"api/seller/sellerverificationstatus/"));case 3:return a=s.sent,s.next=6,a.json();case 6:a=s.sent,Z(a);case 8:case"end":return s.stop()}}),s)})));return function(){return s.apply(this,arguments)}}(),te=function(){var s=w(c().mark((function s(a){var n;return c().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return setTimeout((function(){ae(!1)}),1500),s.next=3,fetch("".concat(e,"api/seller/sellerdetails/").concat(a));case 3:return n=s.sent,s.next=6,n.json();case 6:n=s.sent,C(n.sellerapprovalstatus),L(n),console.log(n.sellerapprovalstatus),V(n._id),U(n.alertbox);case 12:case"end":return s.stop()}}),s)})));return function(e){return s.apply(this,arguments)}}(),de=function(){var s=w(c().mark((function s(a){var n;return c().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return setTimeout((function(){ae(!1)}),1500),s.next=3,fetch("".concat(e,"api/seller/checkavailability/").concat(a));case 3:return n=s.sent,s.next=6,n.json();case 6:n=s.sent,A(n);case 8:case"end":return s.stop()}}),s)})));return function(e){return s.apply(this,arguments)}}(),oe=function(){var s=w(c().mark((function s(){var a;return c().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return setTimeout((function(){ae(!1)}),1500),s.next=3,fetch("".concat(e,"api/seller/defaultdetails/"));case 3:return a=s.sent,s.next=6,a.json();case 6:a=s.sent,console.log(a),O(a);case 9:case"end":return s.stop()}}),s)})));return function(){return s.apply(this,arguments)}}(),he={clip:"rect(0px, 200px, 200px, 100px)"},ue=function(){y(!0)},xe=function(){y(!1)};b.Am.configure();var me=function(e){for(var s=[],a=0;a<e.target.files.length;a++){var n=e.target.files;n[a].size>5e6?b.Am.error("File Size too big"):(s.push(n[a].name),console.log(s),console.log(n),H(s),re(n),J(!0),console.log(R.length))}};return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"rightpannel",children:[(0,r.jsx)("div",{className:"alerts",children:(0,r.jsx)(b.Ix,{})}),(0,r.jsxs)("div",{className:"rightpannel_wrapper",children:[(0,r.jsxs)("div",{className:"seller",children:[(0,r.jsx)("h3",{className:"sellername",children:"Seller Central"}),(0,r.jsx)("p",{className:"sellerdescription",children:"Welcome to seller panel"})]}),se?(0,r.jsx)("div",{class:"loader loader1"}):(0,r.jsxs)("div",{className:"cards",children:[(0,r.jsxs)("div",{className:" cardss card1",children:[(0,r.jsxs)("div",{className:"seller-verify",children:[(0,r.jsx)("h4",{className:"verification",children:"Seller Approval Status"}),(0,r.jsx)("div",{className:"rightinformation"})]}),(0,r.jsxs)("div",{className:"main-content",children:[(0,r.jsx)("div",{className:_?"checkicon":"uncheckicon",children:S?(0,r.jsx)(r.Fragment,{children:_?(0,r.jsx)(t.Z,{}):(0,r.jsx)(v.Z,{})}):(0,r.jsx)(t.Z,{})}),(0,r.jsxs)("div",{className:"benefits",children:[S?(0,r.jsx)(r.Fragment,{children:_?(0,r.jsxs)("h5",{className:"authorize",children:["You are ",(0,r.jsx)("span",{className:"approve",children:"authorized"})," ","as a seller."]}):(0,r.jsxs)("h5",{className:"authorize",children:["You are"," ",(0,r.jsx)("span",{className:"unapprove",children:"unauthorized"})," as a seller."]})}):(0,r.jsxs)("h5",{className:"authorize",children:["You are ",(0,r.jsx)("span",{className:"approve",children:"authorized"})," as a seller."]}),(0,r.jsxs)("div",{className:"benift",children:[(0,r.jsx)("div",{className:"benefiticon",children:S?(0,r.jsx)(r.Fragment,{children:_?(0,r.jsx)(d.Z,{}):""}):(0,r.jsx)(d.Z,{})}),(0,r.jsx)("div",{className:"benefitdescription",children:S?(0,r.jsx)(r.Fragment,{children:_?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("p",{children:"No limit of selling"})}):""}):(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("p",{children:"No limit of selling"})})})]}),(0,r.jsxs)("div",{className:"benift",children:[(0,r.jsx)("div",{className:"benefiticon",children:S?(0,r.jsx)(r.Fragment,{children:_?(0,r.jsx)(d.Z,{}):""}):(0,r.jsx)(d.Z,{})}),(0,r.jsx)("div",{className:"benefitdescription",children:S?(0,r.jsx)(r.Fragment,{children:_?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("p",{children:"No limit of selling"})}):""}):(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("p",{children:"No limit of selling"})})})]})]})]})]}),S?(0,r.jsx)(r.Fragment,{children:P?(0,r.jsx)(r.Fragment,{children:_?(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"allcard",children:[(0,r.jsx)("div",{className:" cardss card2",children:(0,r.jsxs)("div",{className:"earn",children:[(0,r.jsx)("h4",{className:"earntitle",children:"Earning"}),(0,r.jsxs)("div",{class:"donut-chart",children:[(0,r.jsx)("div",{id:"part1",class:"portion-block",style:he,children:(0,r.jsx)("div",{class:"circle"})}),(0,r.jsx)("div",{id:"part2",class:"portion-block",children:(0,r.jsx)("div",{class:"circle"})}),(0,r.jsx)("div",{id:"part3",class:"portion-block",children:(0,r.jsx)("div",{class:"circle"})}),(0,r.jsx)("p",{class:"center",children:(0,r.jsxs)("div",{className:"walletbalance",children:[(0,r.jsx)("div",{className:"balanceicon",children:(0,r.jsx)(m.Z,{})}),(0,r.jsx)("p",{className:"money",children:"$12,560.30"}),(0,r.jsx)("p",{className:"balancename",children:"Balance"})]})})]})]})}),(0,r.jsxs)("div",{className:" cardss card3",children:[(0,r.jsxs)("div",{className:"card3head",children:[(0,r.jsx)("h4",{className:"statics",children:"Statics"}),(0,r.jsxs)("div",{className:"calender",children:[(0,r.jsxs)("div",{className:"calendericon",onMouseOver:ue,onMouseLeave:xe,children:[(0,r.jsx)(o.Z,{}),(0,r.jsx)(x.ZP,{onChange:n,value:a,className:f?"":"hide",onClickMonth:function(e){}})]}),(0,r.jsx)("span",{className:"days",children:(0,r.jsxs)("select",{name:"select",id:"selected",children:[(0,r.jsx)("option",{value:"30",children:"Last 30 days"}),(0,r.jsx)("option",{value:"60",children:"Last 60 days"}),(0,r.jsx)("option",{value:"90",children:"Last 90 days"})]})})]})]}),(0,r.jsxs)("div",{className:"staticdetails",children:[(0,r.jsxs)("div",{className:"orderdetail",children:[(0,r.jsx)("div",{className:"ordericon",children:(0,r.jsx)(h.Z,{})}),(0,r.jsxs)("div",{className:"purchasedetail",children:[(0,r.jsx)("h3",{className:"ordername",children:"Order"}),(0,r.jsx)("h4",{className:"orderqty",children:"134"})]})]}),(0,r.jsxs)("div",{className:"orderdetail",children:[(0,r.jsx)("div",{className:"ordericon",children:(0,r.jsx)(u.Z,{})}),(0,r.jsxs)("div",{className:"purchasedetail",children:[(0,r.jsx)("h3",{className:"ordername",children:"Revenue"}),(0,r.jsx)("h4",{className:"orderqty",children:"$3460.00"})]})]}),(0,r.jsxs)("div",{className:"orderdetail",children:[(0,r.jsx)("div",{className:"ordericon",children:(0,r.jsx)(h.Z,{})}),(0,r.jsxs)("div",{className:"purchasedetail",children:[(0,r.jsx)("h3",{className:"ordername",children:"Earning"}),(0,r.jsx)("h4",{className:"orderqty",children:"$1750.00"})]})]})]})]})]})}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"attention",children:(0,r.jsxs)("div",{className:"innerattention",children:[(0,r.jsx)("h3",{className:"attentiontitle",children:I?"Alert":"Attention"}),(0,r.jsx)("div",{className:"attentionicon",children:I?(0,r.jsx)(N.Z,{}):(0,r.jsx)(p.Z,{})}),(0,r.jsx)("div",{className:"attentiontext",children:I?(0,r.jsx)("div",{dangerouslySetInnerHTML:{__html:E.alerttextarea}}):(0,r.jsx)("div",{dangerouslySetInnerHTML:{__html:E.attentiontextarea}})})]})}),(0,r.jsx)("div",{className:"documentverify",children:(0,r.jsxs)("div",{className:"innerverify",children:[(0,r.jsx)("div",{className:"requiredbtn",children:(0,r.jsx)("button",{className:"reqbtn",children:"Required Documents"})}),(0,r.jsxs)("div",{className:"idcard",children:[(0,r.jsx)("p",{className:"documenttitle",children:E.documenttext}),(0,r.jsx)("div",{className:"idcardwrapper",children:(0,r.jsxs)("div",{className:"uploadbtns",children:[(0,r.jsxs)("div",{className:"submitphoto",children:[(0,r.jsxs)("label",{className:"upload-documnet",children:[(0,r.jsx)("input",{type:"file",onChange:function(e){return me(e)},name:"file",multiple:!0}),(0,r.jsx)("p",{className:"upload-text",children:"Upload"})]}),R.length>1?"".concat(R[0],", ").concat(R[1],", ..."):(0,r.jsx)("p",{className:"photoname",children:R})]}),(0,r.jsx)("div",{className:"photocheck",children:B?(0,r.jsx)(d.Z,{}):""})]})})]}),(0,r.jsx)("div",{className:"sumbitbutton",children:(0,r.jsx)("button",{className:"button submitbtn",onClick:function(s){if(console.log(ce),s.preventDefault(),ce.length>=1){for(var a=new FormData,n=0;n<ce.length;n++)a.append("documents",ce[n]);var c="".concat(e,"api/seller/updatedocuments/").concat(Q);g().post(c,a,{headers:{"content-type":"multipart/form-data"}}).then((function(e){b.Am.success("Upload sucessful."),J(!1),H([]),console.log(R),re([])})).catch((function(e){console.log(e)}))}else b.Am.error("Upload Please")},children:"Update"})})]})})]})}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"attention",children:(0,r.jsxs)("div",{className:"innerattention",children:[(0,r.jsx)("h3",{className:"attentiontitle",children:"Attention"}),(0,r.jsx)("div",{className:"attentionicon",children:(0,r.jsx)(p.Z,{})}),(0,r.jsx)("div",{className:"attentiontext",children:M.attentiontextarea})]})}),(0,r.jsx)("div",{className:"documentverify",children:(0,r.jsxs)("div",{className:"innerverify",children:[(0,r.jsx)("div",{className:"requiredbtn",children:(0,r.jsx)("button",{className:"reqbtn",children:"Required Documents"})}),(0,r.jsxs)("div",{className:"idcard",children:[(0,r.jsx)("p",{className:"documenttitle",children:M.documenttext}),(0,r.jsx)("div",{className:"idcardwrapper",children:(0,r.jsxs)("div",{className:"uploadbtns",children:[(0,r.jsxs)("div",{className:"submitphoto",children:[(0,r.jsxs)("label",{className:"upload-documnet",children:[(0,r.jsx)("input",{type:"file",onChange:function(e){return me(e)},name:"file",multiple:!0}),(0,r.jsx)("p",{className:"upload-text",children:"Upload"})]}),R.length>1?"".concat(R[0],", ").concat(R[1],", ..."):(0,r.jsx)("p",{className:"photoname",children:R})]}),(0,r.jsx)("div",{className:"photocheck",children:B?(0,r.jsx)(d.Z,{}):""})]})})]}),(0,r.jsx)("div",{className:"sumbitbutton",children:(0,r.jsx)("button",{className:"button submitbtn",onClick:function(s){var a=localStorage.getItem("user"),n=(null!==a?JSON.parse(a):[]).tokenData.id;if(console.log(ce),s.preventDefault(),ce.length>=1){var c=new FormData;c.append("termcondition","accepted"),c.append("userId",W);for(var r=0;r<ce.length;r++)c.append("documents",ce[r]);var l="".concat(e,"api/seller/createseller/");g().post(l,c,{headers:{"content-type":"multipart/form-data"}}).then((function(e){b.Am.success("Upload sucessful."),te(n)})).catch((function(e){console.log(e.response.data.error)}))}else b.Am.error("Upload Please")},children:"Sumbit"})})]})})]})}):(0,r.jsxs)("div",{className:"allcard",children:[(0,r.jsx)("div",{className:" cardss card2",children:(0,r.jsxs)("div",{className:"earn",children:[(0,r.jsx)("h4",{className:"earntitle",children:"Earning"}),(0,r.jsxs)("div",{class:"donut-chart",children:[(0,r.jsx)("div",{id:"part1",class:"portion-block",style:he,children:(0,r.jsx)("div",{class:"circle"})}),(0,r.jsx)("div",{id:"part2",class:"portion-block",children:(0,r.jsx)("div",{class:"circle"})}),(0,r.jsx)("div",{id:"part3",class:"portion-block",children:(0,r.jsx)("div",{class:"circle"})}),(0,r.jsx)("p",{class:"center",children:(0,r.jsxs)("div",{className:"walletbalance",children:[(0,r.jsx)("div",{className:"balanceicon",children:(0,r.jsx)(m.Z,{})}),(0,r.jsx)("p",{className:"money",children:"$12,560.30"}),(0,r.jsx)("p",{className:"balancename",children:"Balance"})]})})]})]})}),(0,r.jsxs)("div",{className:" cardss card3",children:[(0,r.jsxs)("div",{className:"card3head",children:[(0,r.jsx)("h4",{className:"statics",children:"Statics"}),(0,r.jsxs)("div",{className:"calender",children:[(0,r.jsxs)("div",{className:"calendericon",onMouseOver:ue,onMouseLeave:xe,children:[(0,r.jsx)(o.Z,{}),(0,r.jsx)(x.ZP,{onChange:n,value:a,className:f?"":"hide",onClickMonth:function(e){}})]}),(0,r.jsx)("span",{className:"days",children:(0,r.jsxs)("select",{name:"select",id:"selected",children:[(0,r.jsx)("option",{value:"30",children:"Last 30 days"}),(0,r.jsx)("option",{value:"60",children:"Last 60 days"}),(0,r.jsx)("option",{value:"90",children:"Last 90 days"})]})})]})]}),(0,r.jsxs)("div",{className:"staticdetails",children:[(0,r.jsxs)("div",{className:"orderdetail",children:[(0,r.jsx)("div",{className:"ordericon",children:(0,r.jsx)(h.Z,{})}),(0,r.jsxs)("div",{className:"purchasedetail",children:[(0,r.jsx)("h3",{className:"ordername",children:"Order"}),(0,r.jsx)("h4",{className:"orderqty",children:"134"})]})]}),(0,r.jsxs)("div",{className:"orderdetail",children:[(0,r.jsx)("div",{className:"ordericon",children:(0,r.jsx)(u.Z,{})}),(0,r.jsxs)("div",{className:"purchasedetail",children:[(0,r.jsx)("h3",{className:"ordername",children:"Revenue"}),(0,r.jsx)("h4",{className:"orderqty",children:"$3460.00"})]})]}),(0,r.jsxs)("div",{className:"orderdetail",children:[(0,r.jsx)("div",{className:"ordericon",children:(0,r.jsx)(h.Z,{})}),(0,r.jsxs)("div",{className:"purchasedetail",children:[(0,r.jsx)("h3",{className:"ordername",children:"Earning"}),(0,r.jsx)("h4",{className:"orderqty",children:"$1750.00"})]})]})]})]})]})]})]})]})})},S=a(29911),Z=a(35334),F=a(22903);function _(e,s,a,n,c,r,l){try{var i=e[r](l),t=i.value}catch(d){return void a(d)}i.done?s(t):Promise.resolve(t).then(n,c)}function C(e){return function(){var s=this,a=arguments;return new Promise((function(n,c){var r=e.apply(s,a);function l(e){_(r,n,c,l,i,"next",e)}function i(e){_(r,n,c,l,i,"throw",e)}l(void 0)}))}}function q(){var e=(0,l.useContext)(F.Z).load;return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"mainview",children:[(0,r.jsx)(S.default,{}),(0,r.jsx)("div",{className:"lodersouter ".concat(e?"active":""),children:(0,r.jsx)("div",{className:"innerloaders",children:(0,r.jsx)("div",{class:"loader"})})}),(0,r.jsxs)("div",{className:"mainview_wrapper",children:[(0,r.jsx)(i.Z,{}),(0,r.jsx)(k,{})]}),(0,r.jsx)(Z.default,{})]})})}function P(e){return A.apply(this,arguments)}function A(){return(A=C(c().mark((function e(s){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s.req,s.res.setHeader("Cache-Control","public, s-maxage=10, stale-while-revalidate=59"),e.abrupt("return",{props:{}});case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}},function(e){e.O(0,[2132,9107,6825,9774,2888,179],(function(){return s=24740,e(e.s=s);var s}));var s=e.O();_N_E=s}]);