!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r=function(){return{options:["👻","snap","Snap","snapchat","Snapchat","sc:","Sc:","SNAP","SNAPCHAT"],snapchats:[],likeCounter:0,dislikeCounter:0,message_counter:0,GeneralInterval:null,text:"",botStatus:!1,startTimerValue:[],deletedMessages:0,initCounter:0,updateCalendarCounter:0,like_button:document.querySelector(".profile-action--yes"),people_to_message:[],message_bot_interval:null,deleting_message_bot_interval:null,last_message:""}},o=function(e,t){chrome.runtime.onMessage.addListener(function(n){n.greeting==e&&t(n)})},i=function(e,t){e.click(),t.likeCounter++},l=null,a={interval:null},c=setInterval(function(){document.querySelector(".profile-action--yes")&&(l=r(),clearInterval(c))},1e3);o("start_liking",function(){var e=parseInt(localStorage.getItem("bot_like_speed"));switch(e){case 25:e=1e3;break;case 50:e=500;break;case 100:e=200}a.interval=setInterval(function(){i(document.querySelector(".profile-action--yes"),l)},e)}),o("stop_liking",function(){clearInterval(a.interval)}),o("set_like_speed",function(e){localStorage.setItem("bot_like_speed",e.value)});var s=function(){return!!document.querySelector(".js-messenger-wrap")};function u(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var m=function(){var e=localStorage.getItem("user_name");return u(document.querySelectorAll(".contact-card__message")).map(function(t){if("You matched"===t.innerText.substring(0,11)||t.innerText.substring(0,11)==="Hey ".concat(e," ! "))return t.parentElement.parentElement}).filter(function(e){return void 0!==e})},f=function(e){chrome.storage.sync.get([e],function(t){localStorage.setItem(e,JSON.stringify(t))})},g=function(e,t){f("last_message"),e[t]&&e[t].click()},_=function(){document.querySelector(".messenger-tools__input")&&null===document.querySelector(".message__content")&&(document.querySelector(".messenger-tools__input").innerText=JSON.parse(localStorage.getItem("last_message")).last_message)},d=function(){document.querySelector(".messenger-tools__btn")&&document.querySelector(".messenger-tools__btn").click()},p=function(e){var t=0;r.message_bot_interval=setInterval(function(){setTimeout(function(){_()},200),null!==document.querySelector(".message__content")&&t++,setTimeout(function(){d()},500),setTimeout(function(){g(e,t)},800),e.length<=t&&clearInterval(r.message_bot_interval)},1e3)},S=function(){!0===s()&&(clearInterval(r.message_bot_interval),document.querySelector(".messenger-ovl__close").click())};function y(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var v,b=function(){var e=localStorage.getItem("user_name");return y(document.querySelectorAll(".contact-card__message")).map(function(t){if("You matched"!==t.innerText.substring(0,11)&&!t.parentElement.parentElement.children[2].classList.contains("is-active")&&t.innerText.substring(0,11)!=="Hey ".concat(e," ! "))return t.parentElement.parentElement}).filter(function(e){return void 0!==e})},I=function(){r.deleting_message_bot_interval=setInterval(function(){b()[0]&&document.querySelector(".js-im-contact-remove")&&(b()[0].click(),setTimeout(function(){document.querySelector(".js-im-contact-remove").click()},300)),setTimeout(function(){document.querySelector(".js-im-confirm-delete")&&document.querySelector(".js-im-confirm-delete").click()},700),b().length<1&&clearInterval(r.deleting_message_bot_interval)},1200)},h=function(){null===localStorage.getItem("user_name")&&localStorage.setItem("user_name",document.querySelector(".sidebar-info__name").innerText)},k=function(){o("start_messaging",function(){h(),!1===s()&&(document.querySelector('.sidebar-menu__item[href="/messenger/open"]').click(),setTimeout(function(){v=m(),p(v)},2e3))}),o("stop_messaging",function(){S()}),o("start_delete_all_old_messages",function(){I()}),o("stop_delete_all_old_messages",function(){clearInterval(r.deleting_message_bot_interval)})},q=function(){if(null===localStorage.getItem("bot_statistics")){var e=JSON.stringify({likes:0,messages:0,delete_messages:0,matches:0});localStorage.setItem("bot_statistics",e)}},j=function(){q()},O=function(){return localStorage.getItem("signin_login")};(function(){var e=O(),t=null!==JSON.parse(localStorage.getItem("first_login"))?JSON.parse(localStorage.getItem("first_login")):[];!function(){if(0===t.length)localStorage.setItem("first_login",JSON.stringify([e])),localStorage.setItem("first_login_status",!0);else for(var n=0;n<t.length;n++)if(!t.includes(e))return t.push(e),localStorage.setItem("first_login",JSON.stringify(t)),void localStorage.setItem("first_login_status",!0)}()})(),k(),j()}]);
//# sourceMappingURL=main.bundle.js.map