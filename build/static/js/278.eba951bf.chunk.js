"use strict";(self.webpackChunkchat=self.webpackChunkchat||[]).push([[278],{278:function(e,r,n){n.r(r),n.d(r,{default:function(){return q}});var t=n(2791),o=n(6314),c=n(890),i=n(4165),a=n(5861),u=n(6727),d=n(1134),s=n(4695),l=n(6151),h=n(3254),m=n(1413),f=n(5987),p=n(1676),g=n(184),x=["keyName","inputs"];function v(e){var r=e.keyName,n=void 0===r?"":r,c=e.inputs,i=void 0===c?[]:c,a=(0,f.Z)(e,x),u=(0,t.useRef)(null),s=(0,d.Gc)().control;return(0,g.jsx)(o.Z,{direction:"row",spacing:2,justifyContent:"center",ref:u,children:i.map((function(e,r){return(0,g.jsx)(d.Qr,{name:"".concat(n).concat(r+1),control:s,render:function(e){var t=e.field,o=e.fieldState.error;return(0,g.jsx)(p.Z,(0,m.Z)((0,m.Z)({},t),{},{error:!!o,autoFocus:0===r,placeholder:"-",onChange:function(e){!function(e,r){var t=e.target,o=t.maxLength,c=t.value,i=t.name.replace(n,""),a=Number(i),u=document.querySelector("input[name=".concat(n).concat(a+1,"]"));c.length>o&&(e.target.value=c[0]),c.length>=o&&a<6&&null!==u&&u.focus(),r(e)}(e,t.onChange)},onFocus:function(e){return e.currentTarget.select()},InputProps:{sx:{width:{xs:36,sm:56},height:{xs:36,sm:56},"& input":{p:0,textAlign:"center"}}},inputProps:{maxLength:1,type:"number"}},a))}},e)}))})}var Z=n(9434),y=n(2732);function j(){var e=(0,Z.I0)(),r=(0,Z.v9)((function(e){return e.auth})).email,n=u.Ry().shape({code1:u.Z_().required("Code is required"),code2:u.Z_().required("Code is required"),code3:u.Z_().required("Code is required"),code4:u.Z_().required("Code is required"),code5:u.Z_().required("Code is required"),code6:u.Z_().required("Code is required")}),t=(0,d.cI)({mode:"onChange",resolver:(0,s.X)(n),defaultValues:{code1:"",code2:"",code3:"",code4:"",code5:"",code6:""}}),c=t.handleSubmit,m=t.formState,f=(m.isSubmitting,m.errors,function(){var n=(0,a.Z)((0,i.Z)().mark((function n(t){return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:try{e((0,y.if)({email:r,otp:"".concat(t.code1).concat(t.code2).concat(t.code3).concat(t.code4).concat(t.code5).concat(t.code6)}))}catch(o){console.error(o)}case 1:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}());return(0,g.jsx)(h.ZP,{methods:t,onSubmit:c(f),children:(0,g.jsxs)(o.Z,{spacing:3,children:[(0,g.jsx)(v,{keyName:"code",inputs:["code1","code2","code3","code4","code5","code6"]}),(0,g.jsx)(l.Z,{fullWidth:!0,size:"large",type:"submit",variant:"contained",sx:{mt:3,bgcolor:"text.primary",color:function(e){return"light"===e.palette.mode?"common.white":"grey.800"},"&:hover":{bgcolor:"text.primary",color:function(e){return"light"===e.palette.mode?"common.white":"grey.800"}}},children:"Verify"})]})})}function q(){var e=(0,Z.v9)((function(e){return e.auth})).email;return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(o.Z,{spacing:2,sx:{mb:5,position:"relative"},children:[(0,g.jsx)(c.Z,{variant:"h4",children:"Please Verify OTP"}),(0,g.jsx)(o.Z,{direction:"row",spacing:.5,children:(0,g.jsxs)(c.Z,{variant:"body2",children:["Sent to email ",e]})})]}),(0,g.jsx)(j,{})]})}}}]);
//# sourceMappingURL=278.eba951bf.chunk.js.map