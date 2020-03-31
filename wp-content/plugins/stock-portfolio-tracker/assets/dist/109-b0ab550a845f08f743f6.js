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
(window.webpackJsonp=window.webpackJsonp||[]).push([[109],{30:function(t,e,a){"use strict";var s=a(39),n=a(0),o=a(132);function r(t){return function(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{},s=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(a).filter(function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable}))),s.forEach(function(e){l(t,e,a[e])})}return t}function l(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var c={computed:i({},Object(o.c)(n.a.code,["user","portfolios","transactions","marketData","display","error"]),{code:function(){return n.a.code}}),methods:i({},Object(o.b)(n.a.code,["getLiveMarketData","getHistoricalMarketData","getPortfolio","getPortfolios","createPortfolio","editPortfolio","deletePortfolio","sharePortfolio","unsharePortfolio","getTransactions","createTransaction","editTransaction","closeTransaction","deleteTransaction","loading","done","clearData","processError","clearError"]),{__:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=n.a.text[t]||t;return e?s.c.apply(void 0,[a].concat(r(e))):a}})},u=a(21),p=Object(u.a)(c,void 0,void 0,!1,null,null,null);p.options.__file="assets/js/src/components/_mixins/helper.vue";e.a=p.exports},37:function(t,e,a){"use strict";var s={data:function(){return{submitted:!1}},methods:{action:function(t){var e=this;"function"==typeof this[t]&&(this.submitted=!0,this[t]().catch(function(t){e.submitted=!1,e.processError(t)}))}},created:function(){"function"==typeof this.whenCreated?this.whenCreated():this.done()},beforeRouteLeave:function(t,e,a){this.loading(),a()}},n=a(21),o=Object(n.a)(s,void 0,void 0,!1,null,null,null);o.options.__file="assets/js/src/components/_mixins/view.vue";e.a=o.exports},39:function(t,e,a){"use strict";function s(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(){var t=arguments;return t[0].replace(/{(\d+)}/g,function(e,a){var s=parseInt(a,10);return void 0!==t[s+1]?t[s+1]:e})}function r(t){return"object"==n(t)&&(void 0!==Array.isArray?Array.isArray(t):"[object Array]"===Object.prototype.toString.call(t))}function i(t,e){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return e.split(".").reduce(function(t,e){return t&&t[e]?t[e]:a},t)}function l(t,e){for(var a=[],s=t;s<=e;s.setUTCDate(s.getUTCDate()+1))a.push(new Date(s));return a}function c(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"_id";return t?Object.keys(t).map(function(a){return function(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{},n=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(a).filter(function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable}))),n.forEach(function(e){s(t,e,a[e])})}return t}({},t[a],s({},e,a))}):[]}function u(t){t.select();try{document.execCommand("copy")}catch(t){}document.getSelection().removeAllRanges(),document.activeElement.blur()}a.d(e,"c",function(){return o}),a.d(e,"e",function(){return r}),a.d(e,"d",function(){return i}),a.d(e,"b",function(){return l}),a.d(e,"f",function(){return c}),a.d(e,"a",function(){return u})},59:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"spt-level spt-is-mobile"},[a("div",{staticClass:"spt-level-left"},[a("div",{staticClass:"spt-dropdown spt-is-left spt-is-hoverable",attrs:{id:"spt-menu"}},[a("div",{staticClass:"spt-dropdown-trigger"},[a("button",{staticClass:"spt-button",attrs:{"aria-haspopup":"true","aria-controls":"dropdown-menu"}},[t._m(0),t._v(" "),a("span",[t._v(t._s(t.__("Menu")))])])]),t._v(" "),a("div",{staticClass:"spt-dropdown-menu",attrs:{id:"dropdown-menu",role:"menu"}},[a("div",{staticClass:"spt-dropdown-content"},[a("router-link",{class:["spt-dropdown-item",{"spt-is-active":"home"==t.$route.name}],attrs:{to:{name:"home"}}},[a("i",{staticClass:"spt-fas spt-fa-briefcase"}),t._v("\n                        "+t._s(t.__("Portfolios"))+"\n                    ")]),t._v(" "),t.authEnabled?a("a",{staticClass:"spt-dropdown-item",on:{click:function(e){return e.preventDefault(),t.logout(e)}}},[a("i",{staticClass:"spt-fas spt-fa-sign-out-alt"}),t._v("\n                        "+t._s(t.__("Log out"))+"\n                    ")]):t._e()],1)])])]),t._v(" "),a("div",{staticClass:"spt-level-right"},[t._t("default")],2)])};s._withStripped=!0;var n=a(0),o=a(30),r=a(51),i=a.n(r),l=(a(61),{mixins:[o.a],computed:{authEnabled:function(){return n.a.firebase.auth}},methods:{logout:function(){var t=this;i.a.auth().signOut().then(function(){t.clearData(),t.$router.replace({name:"auth.login"})})}}}),c=a(21),u=Object(c.a)(l,s,[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"spt-icon spt-is-small"},[e("i",{staticClass:"spt-fas spt-fa-bars",attrs:{"aria-hidden":"true"}})])}],!1,null,null,null);u.options.__file="assets/js/src/components/elements/top-nav.vue";e.a=u.exports},7:function(t,e,a){"use strict";a.r(e);var s=a(0),n=a(39),o=a(148),r=a(132),i=a(260),l=a.n(i),c=function(){function t(t){var e={url:s.a.ajaxUrl,method:s.a.ajaxMethod};if("post"==e.method){var a=new FormData;Object.keys(t).forEach(function(e){Object(n.e)(t[e])?t[e].forEach(function(t){a.append(e+"[]",t)}):a.append(e,t[e])}),e.data=a}else e.params=t;return e}return{getLiveQuotes:function(e){var a=e.symbols,n=(e.currency,{action:s.a.code+"GetMarketData",nonce:s.a.ajaxNonce,type:"quotes",assets:a});return new Promise(function(e,a){l()(t(n)).then(function(t){200==t.status&&t.data.success&&t.data.data.length?e(t.data.data):a()})})},getHistoricalQuotes:function(e){var a=e.symbol,n=e.startDate,o=(e.currency,{action:s.a.code+"GetMarketData",nonce:s.a.ajaxNonce,type:"history",assets:[a],range:(r=n,i=(new Date).getTime()/1e3-r,i<2592e3?"1mo":i<7776e3?"3mo":i<15552e3?"6mo":i<31536e3?"1y":i<63072e3?"2y":"5y"),interval:"1d"});var r,i;return new Promise(function(e,a){l()(t(o)).then(function(t){if(200==t.status&&t.data.success&&t.data.data.length){var s=t.data.data[0],n={};s.date.forEach(function(t,e){n[t]=s.close[e]||0}),e(n)}else a()})})}}},u=a(51),p=a.n(u);a(254);function d(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function f(t){return function(t){if(Array.isArray(t))return t}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}o.a.use(r.a);var m={namespaced:!0,state:{user:null,portfolios:null,transactions:null,marketData:null,sources:null,promises:null,display:!1,error:null},mutations:{update:function(t,e){!function t(e,a,s){var n=f(a.split(".")),r=n[0],i=n.slice(1);null!==e[r]&&void 0!==e[r]||o.a.set(e,r,{}),i.length?t(e[r],i.join("."),s):e[r]=s}(t,e.name,e.value)}},actions:{init:function(t,e){var a=t.commit;e&&a("update",{name:"user",value:{uid:e.uid,email:e.email}}),a("update",{name:"sources",value:{rest:new c}})},getHistoricalMarketData:function(t,e){var a=t.state,s=t.commit,n=e.symbols,o=e.currency,r=[];return Object.keys(n).forEach(function(t){var e=new Promise(function(e,r){a.sources.rest.getHistoricalQuotes({symbol:t,startDate:n[t],currency:o}).then(function(a){s("update",{name:"marketData.history."+t,value:a}),e()}).catch(function(t){r(t.message)})});r.push(e)}),Promise.all(r)},getLiveMarketData:function(t,e){var a=t.state,s=t.commit,n=e.symbols,o=e.currency;return n.length?new Promise(function(t,e){a.sources.rest.getLiveQuotes({symbols:n,currency:o}).then(function(e){e.forEach(function(t){s("update",{name:"marketData.live."+t.symbol,value:t})}),t()}).catch(function(t){e(t.message)})}):Promise.resolve()},getPortfolios:function(t){var e=t.state,a=t.commit,s=Object(n.d)(e,"promises.portfolios");return s||(s=new Promise(function(t,s){p.a.database().ref("users/"+e.user.uid+"/portfolios").on("value",function(e){a("update",{name:"portfolios",value:e.val()}),t()})}),a("update",{name:"promises.portfolios",value:s})),s},getPortfolio:function(t,e){var a=t.state,s=t.commit,o=e.pid,r=e.shared,i=void 0!==r&&r,l=Object(n.d)(a,"promises.portfolio."+o);return l||(l=new Promise(function(t,e){new Promise(function(t,e){i?p.a.database().ref("shared-portfolios/"+o).once("value",function(a){var s=a.val();s?t(s):e(new Error("No such shared portfolio found."))}):t(a.user.uid)}).then(function(t){return new Promise(function(e,n){a.portfolios&&a.portfolios[o]?e():p.a.database().ref("users/"+t+"/portfolios/"+o).once("value",function(a){var r=a.val();if(r){var l=i?function(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{},s=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(a).filter(function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable}))),s.forEach(function(e){d(t,e,a[e])})}return t}({},r,{uid:t}):r;s("update",{name:"portfolios",value:d({},o,l)}),e()}else n(new Error("Portfolio not found."))})})}).catch(function(t){e(t)}).then(function(){t()})}),s("update",{name:"promises.portfolio."+o,value:l})),l},createPortfolio:function(t,e){var a=t.state,s=e.title,n=e.description,o=e.currency;return p.a.database().ref("users/"+a.user.uid+"/portfolios").push({title:s,desc:n,ccy:o})},editPortfolio:function(t,e){var a=t.state,s=e.pid,n=e.title,o=e.description,r=e.currency;return p.a.database().ref("users/"+a.user.uid+"/portfolios/"+s).update({title:n,desc:o,ccy:r})},sharePortfolio:function(t,e){var a,s=t.state;return p.a.database().ref().update((d(a={},"users/"+s.user.uid+"/portfolios/"+e+"/shared",!0),d(a,"shared-portfolios/"+e,s.user.uid),a))},unsharePortfolio:function(t,e){var a,s=t.state;return p.a.database().ref().update((d(a={},"users/"+s.user.uid+"/portfolios/"+e+"/shared",null),d(a,"shared-portfolios/"+e,null),a))},deletePortfolio:function(t,e){var a,s=t.state,n=(d(a={},"users/"+s.user.uid+"/portfolios/"+e,null),d(a,"users/"+s.user.uid+"/transactions/"+e,null),a);return s.portfolios[e].shared&&(n["shared-portfolios/"+e]=null),p.a.database().ref().update(n)},getTransactions:function(t,e){var a=t.state,s=t.commit,o=Object(n.d)(a,"promises.transactions."+e);return o||(o=new Promise(function(t,o){var r=Object(n.d)(a,"portfolios."+e+".uid",a.user?a.user.uid:null);r?p.a.database().ref("users/"+r+"/transactions/"+e).on("value",function(a){var n=a.val();s("update",{name:"transactions."+e,value:n}),t()}):o(new Error("No transactions found."))}),s("update",{name:"promises.transactions."+e,value:o})),o},createTransaction:function(t,e){var a=t.state,s=e.pid,n=e.symbol,o=e.quantity,r=e.purchasePrice,i=e.purchaseDate;return p.a.database().ref("users/"+a.user.uid+"/transactions/"+s).push({sym:n,qty:o,p_price:r,p_date:i})},editTransaction:function(t,e){var a=t.state,s=e.pid,n=e.tid,o=e.symbol,r=e.quantity,i=e.purchasePrice,l=e.sellPrice,c=e.purchaseDate,u=e.sellDate;return p.a.database().ref("users/"+a.user.uid+"/transactions/"+s+"/"+n).update({sym:o,qty:r,p_price:i,s_price:l,p_date:c,s_date:u})},closeTransaction:function(t,e){var a=t.state,s=e.pid,n=e.tid,o=e.quantity,r=e.sellPrice,i=e.sellDate,l=a.transactions[s][n],c=p.a.database().ref("users/"+a.user.uid+"/transactions/"+s),u=c.push().key,d={};return d[n]=l.qty==o?null:{sym:l.sym,qty:l.qty-o,p_price:l.p_price,p_date:l.p_date},d[u]={sym:l.sym,qty:o,p_price:l.p_price,s_price:r,p_date:l.p_date,s_date:i},c.update(d)},deleteTransaction:function(t,e){var a=t.state,s=e.pid,n=e.tid;return p.a.database().ref("users/"+a.user.uid+"/transactions/"+s+"/"+n).remove()},loading:function(t){(0,t.commit)("update",{name:"display",value:!1})},done:function(t){(0,t.commit)("update",{name:"display",value:!0})},clearData:function(t){var e=t.commit;e("update",{name:"user",value:null}),e("update",{name:"portfolios",value:null}),e("update",{name:"transactions",value:null}),e("update",{name:"marketData",value:null}),e("update",{name:"promises",value:null})},processError:function(t,e){(0,t.commit)("update",{name:"error",value:e})},clearError:function(t){var e=t.state,a=t.commit;e.error&&a("update",{name:"error",value:null})}}},v=new r.a.Store;v.registerModule(s.a.code,m);var h=v,b=(a(61),a(353)),_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.user?a("div",[a("top-nav",[a("router-link",{staticClass:"spt-button spt-is-primary",attrs:{to:{name:"portfolio.create"}}},[t._v(t._s(t.__("Create portfolio")))])],1),t._v(" "),t.portfolios?a("div",[a("div",{staticClass:"spt-columns spt-is-multiline spt-is-centered"},t._l(t.portfolios,function(e,s){return a("div",{staticClass:"spt-column spt-is-one-third"},[a("div",{staticClass:"spt-card"},[a("header",{staticClass:"spt-card-header"},[a("span",{staticClass:"spt-card-header-title"},[t._v("\n                                "+t._s(e.title)+"\n                            ")]),t._v(" "),a("span",{staticClass:"spt-card-header-icon"},[a("span",{staticClass:"spt-tag spt-is-primary"},[t._v(t._s(e.ccy))])])]),t._v(" "),a("div",{staticClass:"spt-card-content"},[a("div",{staticClass:"spt-content"},[t._v("\n                                "+t._s(e.desc)+"\n                            ")])]),t._v(" "),a("footer",{staticClass:"spt-card-footer"},[a("router-link",{staticClass:"spt-card-footer-item",attrs:{to:{name:"portfolio.view",params:{pid:s}}}},[a("span",{attrs:{"data-balloon":t.__("View"),"data-balloon-pos":"down"}},[a("i",{staticClass:"spt-fas spt-fa-eye"})])]),t._v(" "),a("router-link",{staticClass:"spt-card-footer-item",attrs:{to:{name:"portfolio.edit",params:{pid:s}}}},[a("span",{attrs:{"data-balloon":t.__("Edit"),"data-balloon-pos":"down"}},[a("i",{staticClass:"spt-fas spt-fa-edit"})])]),t._v(" "),a("a",{staticClass:"spt-card-footer-item",on:{click:function(e){e.preventDefault(),t.activePortfolioShareModal=s}}},[a("span",{attrs:{"data-balloon":t.__("Share"),"data-balloon-pos":"down"}},[a("i",{staticClass:"spt-fas spt-fa-share-alt"})])]),t._v(" "),a("router-link",{staticClass:"spt-card-footer-item",attrs:{to:{name:"portfolio.delete",params:{pid:s}}}},[a("span",{attrs:{"data-balloon":t.__("Delete"),"data-balloon-pos":"down"}},[a("i",{staticClass:"spt-fas spt-fa-trash-alt"})])])],1)]),t._v(" "),a("div",{class:["spt-modal","spt-is-clipped",{"spt-is-active":t.activePortfolioShareModal==s}]},[a("div",{staticClass:"spt-modal-background"}),t._v(" "),a("div",{staticClass:"spt-modal-card"},[a("div",{staticClass:"spt-modal-card-head"},[a("div",{staticClass:"spt-modal-card-title"},[t._v(t._s(t.__("Portfolio sharing")))]),t._v(" "),a("button",{staticClass:"spt-delete",attrs:{"aria-label":"close"},on:{click:function(e){t.activePortfolioShareModal=null}}})]),t._v(" "),a("div",{staticClass:"spt-modal-card-body"},[a("div",{staticClass:"spt-columns"},[a("div",{staticClass:"spt-column spt-has-text-centered"},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.shared,expression:"portfolio.shared"}]},[a("h6",{staticClass:"spt-subtitle spt-is-6"},[t._v(t._s(t.__("Other people will be able to view your portfolio using the link below.")))]),t._v(" "),a("div",{staticClass:"spt-field mb-4"},[a("div",{staticClass:"spt-field spt-has-addons"},[a("div",{staticClass:"spt-control spt-is-expanded"},[a("input",{ref:"link-"+s,refInFor:!0,staticClass:"spt-input spt-readonly-input",attrs:{type:"text",readonly:""},domProps:{value:t.getPortfolioShareableLink(s)}})]),t._v(" "),a("div",{staticClass:"spt-control"},[a("button",{staticClass:"spt-button spt-is-primary",on:{click:function(e){return t.copyPortfolioShareableLink(s)}}},[t._v("\n                                                            "+t._s(t.__("Copy"))+"\n                                                        ")])])])]),t._v(" "),a("button",{staticClass:"spt-button spt-is-primary",on:{click:function(e){return t.unsharePortfolio(s)}}},[t._v(t._s(t.__("Disable sharing")))])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.shared,expression:"!portfolio.shared"}]},[a("h6",{staticClass:"spt-subtitle spt-is-6"},[t._v(t._s(t.__("This portfolio is private.")))]),t._v(" "),a("button",{staticClass:"spt-button spt-is-primary",on:{click:function(e){return t.sharePortfolio(s)}}},[t._v(t._s(t.__("Get shareable link")))])])])])])])])])}),0)]):a("div",[a("div",{staticClass:"spt-columns spt-mh-100vh spt-is-vcentered"},[a("div",{staticClass:"spt-column spt-is-full spt-has-text-centered"},[a("h2",{staticClass:"spt-title spt-is-2"},[t._v(t._s(t.__("No portfolios")))]),t._v(" "),a("h3",{staticClass:"spt-subtitle spt-is-3"},[t._v(t._s(t.__("Start by creating one")))])])])])],1):a("div",[a("div",{staticClass:"spt-columns spt-is-centered spt-mh-100vh spt-is-vcentered spt-is-mobile"},[a("div",{staticClass:"spt-column spt-is-full spt-has-text-centered"},[a("h2",{staticClass:"spt-title spt-is-2"},[t._v(t._s(t.__("Stock Portfolio Tracker")))]),t._v(" "),a("h3",{staticClass:"spt-subtitle spt-is-3"},[t._v(t._s(t.__("Real-time valuation and analytics")))]),t._v(" "),a("div",{staticClass:"spt-m-bottom-1"},[a("router-link",{staticClass:"spt-button spt-is-primary spt-is-outlined",attrs:{to:{name:"auth.login"}}},[t._v(t._s(t.__("Log in")))])],1),t._v(" "),a("div",{staticClass:"spt-m-bottom-1"},[a("router-link",{staticClass:"spt-button spt-is-primary",attrs:{to:{name:"auth.register"}}},[t._v(t._s(t.__("Sign up")))])],1),t._v(" "),a("div",[a("router-link",{staticClass:"spt-button spt-is-light",attrs:{to:{name:"auth.incognito"}}},[t._v(t._s(t.__("Incognito")))])],1)])])])])};_._withStripped=!0;var y=a(30),g=a(37),w=a(59),C={mixins:[y.a,g.a],components:{TopNav:w.a},data:function(){return{activePortfolioShareModal:null}},methods:{getPortfolioShareableLink:function(t){var e=window.location.href;return e+("/"!=e.charAt(e.length-1)?"/":"")+"shared/"+t},copyPortfolioShareableLink:function(t){Object(n.a)(this.$refs["link-"+t][0])},whenCreated:function(){var t=this;this.user?this.getPortfolios().then(function(){return t.done()}):this.done()}}},P=a(21),j=Object(P.a)(C,_,[],!1,null,null,null);j.options.__file="assets/js/src/components/home.vue";var O=j.exports,k=function(){return Promise.all([a.e(126),a.e(1),a.e(114)]).then(a.bind(null,421))};o.a.use(b.a);var S=new b.a({routes:[{path:"/",name:"home",component:O},{path:"/login",name:"auth.login",component:function(){return a.e(44).then(a.bind(null,427))}},{path:"/register",name:"auth.register",component:function(){return a.e(45).then(a.bind(null,424))}},{path:"/incognito",name:"auth.incognito",component:function(){return a.e(43).then(a.bind(null,431))}},{path:"/reset-password",name:"auth.reset-password",component:function(){return a.e(46).then(a.bind(null,428))}},{path:"/portfolios/create",name:"portfolio.create",component:function(){return Promise.all([a.e(0),a.e(111)]).then(a.bind(null,432))}},{path:"/portfolios/:pid/view",name:"portfolio.view",component:k,props:!0},{path:"/shared/:pid",name:"portfolio.view-only",component:k,props:!0},{path:"/portfolios/:pid/edit",name:"portfolio.edit",component:function(){return Promise.all([a.e(0),a.e(113)]).then(a.bind(null,433))},props:!0},{path:"/portfolios/:pid/delete",name:"portfolio.delete",component:function(){return a.e(112).then(a.bind(null,430))},props:!0},{path:"/portfolios/:pid/transactions/create",name:"transaction.create",component:function(){return Promise.all([a.e(0),a.e(2),a.e(1),a.e(118)]).then(a.bind(null,429))},props:!0},{path:"/portfolios/:pid/transactions/:tid/edit",name:"transaction.edit",component:function(){return Promise.all([a.e(0),a.e(2),a.e(1),a.e(120)]).then(a.bind(null,426))},props:!0},{path:"/portfolios/:pid/transactions/:tid/close",name:"transaction.close",component:function(){return Promise.all([a.e(2),a.e(117)]).then(a.bind(null,422))},props:!0},{path:"/portfolios/:pid/transactions/:tid/delete",name:"transaction.delete",component:function(){return a.e(119).then(a.bind(null,423))},props:!0},{path:"*",name:"error.404",component:function(){return a.e(50).then(a.bind(null,425))}}],scrollBehavior:function(t,e,a){return a||{selector:"#"+s.a.code+"-container"}}});S.beforeEach(function(t,e,a){S.app.$store.dispatch(s.a.code+"/clearError"),p.a.auth().onAuthStateChanged(function(e){s.a.firebase.auth||e||-1!==["auth.incognito","portfolio.view-only"].indexOf(t.name)?e&&["auth.login","auth.register","auth.incognito","auth.reset-password"].indexOf(t.name)>-1?a({name:"home",replace:!0}):e||-1!==["auth.login","auth.register","auth.incognito","auth.reset-password","home","portfolio.view-only"].indexOf(t.name)?a():a({name:"home",replace:!0}):a({name:"auth.incognito",replace:!0})})});var E=S,D=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"spt-container"}},[e("error"),this._v(" "),e("router-view",{directives:[{name:"show",rawName:"v-show",value:this.display,expression:"display"}],class:this.classes}),this._v(" "),e("loader",{directives:[{name:"show",rawName:"v-show",value:!this.display&&!this.error,expression:"!display && !error"}]})],1)};D._withStripped=!0;var x=function(){var t=this.$createElement;this._self._c;return this._m(0)};x._withStripped=!0;var A=Object(P.a)({},x,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"spt-loader"}},[e("div",{staticClass:"spt-columns spt-is-centered"},[e("div",{staticClass:"spt-column spt-is-half"},[e("progress",{staticClass:"spt-progress spt-is-primary",attrs:{max:"100"}})])])])}],!1,null,null,null);A.options.__file="assets/js/src/components/elements/loader.vue";var T=A.exports,$=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{name:"spt-fade-transition"}},[t.error?a("div",{staticClass:"spt-columns spt-is-centered"},[a("div",{staticClass:"spt-column spt-is-half"},[a("div",{staticClass:"spt-message spt-is-danger"},[a("div",{staticClass:"spt-message-header"},[a("span",[t._v(t._s(t.__("Error")))]),t._v(" "),a("button",{staticClass:"spt-delete",on:{click:t.clearError}})]),t._v(" "),a("div",{staticClass:"spt-message-body"},[t._v("\n                    "+t._s(t.error.message)+"\n                ")])])])]):t._e()])};$._withStripped=!0;var L={mixins:[y.a]},M=Object(P.a)(L,$,[],!1,null,null,null);M.options.__file="assets/js/src/components/elements/error.vue";var I=M.exports,q={mixins:[y.a],components:{Loader:T,Error:I},computed:{classes:function(){return this.$route.name?"view-"+this.$route.name.replace(".","-"):""}}},N=Object(P.a)(q,D,[],!1,null,null,null);N.options.__file="assets/js/src/components/app.vue";var H=N.exports;e.default=function(){p.a.initializeApp({apiKey:Object(n.d)(s.a,"firebase.apiKey"),authDomain:Object(n.d)(s.a,"firebase.appId")+".firebaseapp.com",databaseURL:"https://"+Object(n.d)(s.a,"firebase.appId")+".firebaseio.com",projectId:Object(n.d)(s.a,"firebase.appId"),storageBucket:Object(n.d)(s.a,"firebase.appId")+".appspot.com",messagingSenderId:Object(n.d)(s.a,"firebase.senderId")});new o.a({beforeCreate:function(){var t=this;p.a.auth().onAuthStateChanged(function(e){t.$store.dispatch(s.a.code+"/init",e)})},store:h,router:E,render:function(t){return t(H)}}).$mount("#"+s.a.id)}}}]);