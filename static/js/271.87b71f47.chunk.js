"use strict";(self.webpackChunkmy_todo_list=self.webpackChunkmy_todo_list||[]).push([[271],{4271:function(e,s,r){r.r(s),r.d(s,{Login:function(){return z}});var a=r(1413),n=r(2791),i=r(6378),t=r(7831),o=r(6151),l=r(9174),c=r(5705),d=r(7689),m=r(5987),u=r(3027),p="CustomInput_input__F4ARm",h=r(184),_=["className","helperText"],x=function(e){var s=e.className,r=e.helperText,n=(0,m.Z)(e,_),i="".concat(p," ").concat(s||""),t=r||" ";return(0,h.jsx)(u.Z,(0,a.Z)((0,a.Z)({className:i,variant:n.variant||"standard",type:n.type||"text",fullWidth:n.fullWidth||!0},n),{},{helperText:t}))},g=r(9439),j=r(3746),f=r(165),b=r(9009),v=r(3400),w=["value","type"],Z=function(e){var s=e.value,r=(e.type,(0,m.Z)(e,w)),i=(0,n.useState)(!1),t=(0,g.Z)(i,2),o=t[0],l=t[1];return(0,h.jsx)(x,(0,a.Z)({type:o?"text":"password",value:s,InputProps:{endAdornment:(0,h.jsx)(b.Z,{position:"end",children:s&&(0,h.jsx)(v.Z,{"aria-label":"toggle password visibility",onClick:function(){return l(!o)},children:o?(0,h.jsx)(f.Z,{}):(0,h.jsx)(j.Z,{})})})}},r))},y=r(3294),L=r(9911),k=r(9565),N=r(6727),C=N.Z_().email("Enter a valid email").max(50,"Enter a valid email").required("Email is required"),T=N.Z_().min(4,"Password must contain at least 4 characters").max(30,"Password is too long").required("Enter your password"),P=N.O7(),E=N.Ry({email:C,password:T,rememberMe:P}),S=r(3263),F="Login_loginContainer__ie04e",M="Login_loginContent__olL8z",I="Login_loginBlockTitle__dGmAx",A="Login_text__lvckc",q="Login_link__bBrtP",D="Login_credentialsContainer__269yC",G="Login_credentials__yhG4N",K="Login_form__JjlK+",O="Login_checkbox__bgQFp",R="Login_button__uX4Gr",z=function(){var e=(0,L.T)(),s=(0,d.s0)(),r=(0,k.C)((function(e){return e.app.status})),m=(0,k.C)((function(e){return e.isLoggedIn.isLoggedIn})),u=(0,c.TA)({initialValues:{email:"",password:"",rememberMe:!1},validationSchema:E,onSubmit:function(s){"loading"!==r&&e((0,S.gd)(s))}});return(0,n.useEffect)((function(){m&&s(y.m.TODOLISTS)}),[m]),(0,h.jsx)("div",{className:F,children:(0,h.jsxs)("div",{className:M,children:[(0,h.jsxs)("div",{className:I,children:[(0,h.jsxs)("p",{className:A,children:["To log in, get registered\xa0",(0,h.jsx)("a",{className:q,href:"https://social-network.samuraijs.com/",target:"_blank",rel:"noreferrer",children:"here"}),"\xa0or use common test account credentials:"]}),(0,h.jsxs)("p",{className:D,children:[(0,h.jsxs)("span",{children:["Email: ",(0,h.jsx)("span",{className:G,children:"free@samuraijs.com"})]}),(0,h.jsxs)("span",{children:["Password: ",(0,h.jsx)("span",{className:G,children:"free"})]})]})]}),(0,h.jsxs)("form",{className:K,onSubmit:u.handleSubmit,children:[(0,h.jsx)(x,(0,a.Z)({label:"Email",autoComplete:"new-password",error:u.touched.email&&!!u.errors.email,helperText:u.touched.email&&u.errors.email,onKeyDown:function(e){"Enter"===e.key&&u.handleSubmit()}},u.getFieldProps("email"))),(0,h.jsx)(Z,(0,a.Z)({label:"Password",error:u.touched.password&&!!u.errors.password,helperText:u.touched.password&&u.errors.password},u.getFieldProps("password"))),(0,h.jsxs)("label",{className:O,children:[(0,h.jsx)(l.Z,(0,a.Z)({size:"medium",onKeyDown:function(e){"Enter"===e.key&&u.setFieldValue("rememberMe",!u.getFieldProps("rememberMe").value)},style:u.values.rememberMe?{color:"#00ff26 "}:{color:"red "},checked:u.values.rememberMe,icon:(0,h.jsx)(i.Z,{}),checkedIcon:(0,h.jsx)(t.Z,{})},u.getFieldProps("rememberMe"))),"Remember me"]}),(0,h.jsx)(o.Z,{className:R,type:"submit",variant:"contained",children:"Log in"})]})]})})}}}]);
//# sourceMappingURL=271.87b71f47.chunk.js.map