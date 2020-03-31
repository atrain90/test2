/*!
 * Stock Portfolio Tracker
 * ------------------------------
 * Version 1.0.0, built on Tuesday, May 28, 2019
 * Copyright (c) Financial Apps and Plugins <info@financialplugins.com>. All rights reserved.
 * Demo: https://financialplugins.com/products/stock-portfolio-tracker/
 * Purchase (WordPress plugin): https://codecanyon.net/item/stock-portfolio-tracker-wordpress-plugin/23877899?ref=financialtechnology
 * Purchase (PHP plugin): https://codecanyon.net/item/stock-portfolio-tracker-php-plugin/23877962?ref=financialtechnology
 * Like: https://www.facebook.com/financialplugins/
 * 
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{28:function(t,s,e){"use strict";var i=function(){var t=this,s=t.$createElement;return(t._self._c||s)("button",{class:t.classes,on:{click:function(s){return t.$parent.action(t.action)}}},[t._t("default")],2)};i._withStripped=!0;var a={props:["action","submitted"],computed:{classes:function(){return["spt-button","spt-is-primary",{"spt-is-loading":this.submitted}]}}},n=e(21),o=Object(n.a)(a,i,[],!1,null,null,null);o.options.__file="assets/js/src/components/elements/submit-button.vue";s.a=o.exports},427:function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"spt-columns spt-is-centered spt-mh-100vh spt-is-vcentered"},[e("div",{staticClass:"spt-column spt-is-half spt-has-text-centered"},[e("h2",{staticClass:"spt-title spt-is-2"},[t._v(t._s(t.__("Stock Portfolio Tracker")))]),t._v(" "),e("h3",{staticClass:"spt-subtitle spt-is-3"},[t._v(t._s(t.__("Log in")))]),t._v(" "),e("div",{staticClass:"spt-field"},[e("div",{staticClass:"spt-control"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"spt-input",attrs:{type:"email",placeholder:t.__("Email")},domProps:{value:t.email},on:{input:function(s){s.target.composing||(t.email=s.target.value)}}})])]),t._v(" "),e("div",{staticClass:"spt-field"},[e("div",{staticClass:"spt-control"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"spt-input",attrs:{type:"password",placeholder:t.__("Password")},domProps:{value:t.password},on:{input:function(s){s.target.composing||(t.password=s.target.value)}}})])]),t._v(" "),e("div",{staticClass:"spt-field spt-is-grouped spt-is-grouped-centered spt-m-top-1 spt-m-bottom-1"},[e("div",{staticClass:"spt-control"},[e("submit-button",{attrs:{action:"login",submitted:t.submitted,disabled:!t.email||!t.password}},[t._v(t._s(t.__("Log in")))])],1)]),t._v(" "),e("div",{staticClass:"spt-columns"},[e("div",{staticClass:"spt-column spt-is-one-third spt-has-text-centered spt-has-text-right-tablet"},[e("router-link",{attrs:{to:{name:"auth.register"}}},[t._v(t._s(t.__("Sign up")))])],1),t._v(" "),e("div",{staticClass:"spt-column spt-is-one-third"},[e("router-link",{attrs:{to:{name:"auth.reset-password"}}},[t._v(t._s(t.__("Reset password")))])],1),t._v(" "),e("div",{staticClass:"spt-column spt-is-one-third spt-has-text-centered spt-has-text-left-tablet"},[e("router-link",{attrs:{to:{name:"auth.incognito"}}},[t._v(t._s(t.__("Incognito")))])],1)])])])])};i._withStripped=!0;var a=e(51),n=e.n(a),o=(e(61),e(30)),l=e(37),r=e(28),p={mixins:[o.a,l.a],components:{SubmitButton:r.a},data:function(){return{email:null,password:null}},methods:{login:function(){var t=this;return n.a.auth().signInWithEmailAndPassword(this.email,this.password).then(function(s){t.$router.replace({name:"home"})})}}},c=e(21),u=Object(c.a)(p,i,[],!1,null,null,null);u.options.__file="assets/js/src/components/auth/login.vue";s.default=u.exports}}]);