(function(e){function t(t){for(var n,a,i=t[0],c=t[1],u=t[2],l=0,d=[];l<i.length;l++)a=i[l],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&d.push(s[a][0]),s[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);p&&p(t);while(d.length)d.shift()();return o.push.apply(o,u||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,a=1;a<r.length;a++){var i=r[a];0!==s[i]&&(n=!1)}n&&(o.splice(t--,1),e=c(c.s=r[0]))}return e}var n={},a={app:0},s={app:0},o=[];function i(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-46ec7306":"5ebc2165"}[e]+".js"}function c(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.e=function(e){var t=[],r={"chunk-46ec7306":1};a[e]?t.push(a[e]):0!==a[e]&&r[e]&&t.push(a[e]=new Promise((function(t,r){for(var n="css/"+({}[e]||e)+"."+{"chunk-46ec7306":"b3fe0379"}[e]+".css",s=c.p+n,o=document.getElementsByTagName("link"),i=0;i<o.length;i++){var u=o[i],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===n||l===s))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){u=d[i],l=u.getAttribute("data-href");if(l===n||l===s)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var n=t&&t.target&&t.target.src||s,o=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=n,delete a[e],p.parentNode.removeChild(p),r(o)},p.href=s;var h=document.getElementsByTagName("head")[0];h.appendChild(p)})).then((function(){a[e]=0})));var n=s[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,r){n=s[e]=[t,r]}));t.push(n[2]=o);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=i(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(p);var r=s[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+n+": "+a+")",d.name="ChunkLoadError",d.type=n,d.request=a,r[1](d)}s[e]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=n,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(r,n,function(t){return e[t]}.bind(null,n));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var p=l;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";var n=r("85ec"),a=r.n(n);a.a},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[e._m(0),r("router-view"),r("div",{staticClass:"alert"})],1)},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"header"},[n("div",{staticClass:"header-inner"},[n("div",[e._v("Лукьяненко, Киселев, Р3210")]),n("a",{staticClass:"header-logo",attrs:{href:"https://se.ifmo.ru/courses/web"}},[n("img",{attrs:{crossorigin:"anonymous",src:r("be75"),alt:"itmo logo"}})]),n("div",[e._v("Вариант 82183")])])])}],o={name:"App"},i=o,c=(r("034f"),r("2877")),u=Object(c["a"])(i,a,s,!1,null,null,null),l=u.exports,d=(r("45fc"),r("d3b7"),r("8c4f")),p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"form-wrapper"},[r("form",{on:{submit:function(t){return t.preventDefault(),e.checkForm(t)}}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.action,expression:"action"}],attrs:{checked:"",id:"signin",name:"action",type:"radio",value:"login"},domProps:{checked:e._q(e.action,"login")},on:{change:function(t){e.action="login"}}}),r("label",{attrs:{for:"signin"}},[e._v("Вход")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.action,expression:"action"}],attrs:{id:"signup",name:"action",type:"radio",value:"register"},domProps:{checked:e._q(e.action,"register")},on:{change:function(t){e.action="register"}}}),r("label",{attrs:{for:"signup"}},[e._v("Регистрация")]),r("div",{attrs:{id:"wrapper"}},[r("div",{attrs:{id:"arrow"}}),r("div",{staticClass:"warning",class:{invalid:!e.nameValid}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{minlength:"3",maxlength:"25",id:"name",placeholder:"Имя",type:"text"},domProps:{value:e.name},on:{change:e.validateInput,input:function(t){t.target.composing||(e.name=t.target.value)}}}),r("span",{attrs:{"data-validate":e.errors.name}})]),r("div",{staticClass:"warning",class:{invalid:!e.passwordValid}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{minlength:"3",maxlength:"25",id:"password",placeholder:"Пароль",type:"password"},domProps:{value:e.password},on:{change:e.validateInput,input:function(t){t.target.composing||(e.password=t.target.value)}}}),r("span",{attrs:{"data-validate":e.errors.password}})]),r("div",{staticClass:"warning",class:{invalid:!e.confirmValid}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.passwordConfirm,expression:"passwordConfirm"}],attrs:{minlength:"3",maxlength:"25",id:"confirm",placeholder:"Повторите пароль",type:"password"},domProps:{value:e.passwordConfirm},on:{change:e.validateInput,input:function(t){t.target.composing||(e.passwordConfirm=t.target.value)}}}),r("span",{attrs:{"data-validate":e.errors.passwordConfirm}})])]),e._m(0),e.errors.length?r("div",{staticClass:"login-error"},e._l(e.errors,(function(t){return r("p",{key:t,staticClass:"red"},[e._v(e._s(t))])})),0):r("div",{staticClass:"login-error"},[r("p",{staticClass:"green"},[e._v(e._s(e.success))])])])])},h=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("button",{attrs:{type:"submit"}},[r("span",[e._v(" Забыл пароль "),r("br"),e._v(" Войти "),r("br"),e._v(" Создать аккаунт ")])])}],m=(r("b0c0"),r("ac1f"),r("466d"),{name:"Home",data:function(){return{response:null,action:"login",errors:{name:"",password:"",passwordConfirm:""},success:"",name:null,password:null,passwordConfirm:null,nameValid:!0,passwordValid:!0,confirmValid:!0}},watch:{action:function(){this.nameValid=!0,this.passwordValid=!0,this.confirmValid=!0}},methods:{registerRequest:function(){var e=this;this.$axios({method:"post",url:this.$BaseURL+this.action,headers:{Content_type:"application/json"},data:{username:this.name,password:this.password}}).then((function(){return e.success="Аккаунт успешно создан!",!0})).catch((function(t){return 409===t.response.status?e.errors.push("Имя пользователя занято"):e.errors.push("Ошибка регистрации"),!1}))},loginRequest:function(){var e=this,t="Basic "+btoa(this.name+":"+this.password);this.$axios({method:"post",url:this.$BaseURL+this.action,headers:{Content_type:"application/json",Authorization:t}}).then((function(r){return e.response=r,localStorage.setItem("currentUser",t),e.$router.push("/main"),!0})).catch((function(t){return 401===t.response.status?e.errors.push("Неверный логин или пароль"):e.errors.push("Ошибка авторизации"),!1}))},checkForm:function(){this.nameValid&&this.passwordValid&&this.confirmValid&&("register"===this.action?this.registerRequest()&&this.loginRequest():"login"===this.action&&this.loginRequest())},validateInput:function(e){switch(e.target.id){case"name":this.name?this.name.match(/^[A-Za-z0-9]*$/)?this.nameValid=!0:(this.nameValid=!1,this.errors.name="Только латинские буквы и цифры"):(this.nameValid=!1,this.errors.name="Укажите имя");break;case"password":this.password?this.password.match(/^[A-Za-z0-9]*$/)?(this.passwordValid=!0,this.passwordConfirm&&(this.password!==this.passwordConfirm?(this.confirmValid=!1,this.errors.passwordConfirm="Пароли не совпадают"):this.confirmValid=!0)):(this.passwordValid=!1,this.errors.password="Только латинские буквы и цифры"):(this.passwordValid=!1,this.errors.password="Укажите пароль");break;case"confirm":this.passwordConfirm?this.password!==this.passwordConfirm?(this.confirmValid=!1,this.errors.passwordConfirm="Пароли не совпадают"):this.confirmValid=!0:(this.confirmValid=!1,this.errors.passwordConfirm="Укажите пароль еще раз");break}}}}),f=m,v=(r("b250"),Object(c["a"])(f,p,h,!1,null,"4b246f4e",null)),g=v.exports;n["a"].use(d["a"]);var w="/",b=new d["a"]({mode:"history",routes:[{path:w,component:g,beforeEnter:function(e,t,r){localStorage.getItem("currentUser")?r({path:"/main"}):r()}},{path:"/main",component:function(){return r.e("chunk-46ec7306").then(r.bind(null,"cd56"))},meta:{requiresAuth:!0}},{path:"*",redirect:w},{path:"/*",redirect:w}]});b.beforeEach((function(e,t,r){e.matched.some((function(e){return e.meta.requiresAuth}))?localStorage.getItem("currentUser")?r():r({path:function(){b.go(-1)}}):r()}));var y=b,_=r("bc3a"),C=r.n(_),V=r("8203"),x=r.n(V);n["a"].use(x.a),n["a"].config.productionTip=!1,n["a"].prototype.$BaseURL="http://localhost:13083/",n["a"].prototype.$axios=C.a,new n["a"]({router:y,render:function(e){return e(l)}}).$mount("#app")},"7e8e":function(e,t,r){},"85ec":function(e,t,r){},b250:function(e,t,r){"use strict";var n=r("7e8e"),a=r.n(n);a.a},be75:function(e,t,r){e.exports=r.p+"img/itmo_logo.874476fa.png"}});
//# sourceMappingURL=app.d2eba40c.js.map