!function(e){function t(t){for(var i,o,r=t[0],c=t[1],l=t[2],p=0,u=[];p<r.length;p++)o=r[p],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&u.push(a[o][0]),a[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);for(d&&d(t);u.length;)u.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],i=!0,r=1;r<n.length;r++){var c=n[r];0!==a[c]&&(i=!1)}i&&(s.splice(t--,1),e=o(o.s=n[0]))}return e}var i={},a={0:0},s=[];function o(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=i,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/assets/js/";var r=window.webpackJsonp=window.webpackJsonp||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var d=c;s.push([67,1]),n()}({113:function(e,t,n){"use strict";n.r(t);t=n(0);var i=n.n(t),a=(n(68),n(4)),s=n(24),o=n(43),r=(t=n(62),n.n(t)),c=n(63),l={init:function(){var e=this;e.window=i()(window),e.document=i()(document),e.html=i()("html"),e.body=i()("body"),e.browser=Object(c.a)(),e.mobile=e.browser.mobile,e.html.removeClass("no-js").addClass(e.mobile?"mobile":"desktop").addClass(e.browser.name),0!==e.browser.os.indexOf("OS")&&0!==e.browser.os.indexOf("iOS")||e.html.addClass("huapple"),e.mobile||r()()}},d=(t=n(64),n.n(t)),p={init:function(){(p.app=this).document.ready((function(){p.initCounter(),p.initInputLabel(),p.initMask(),p.initPasswordToggler(),p.initPromocode(),p.initSelects(),p.initStars(),p.handleSelects(),p.initUploadAvatar()})),this.document.on(app.resizeEventName,(function(){p.initSelects()}))},initCounter:function(){i()(".js-counter").each((function(){var e=i()(this).find("button"),t=e.filter("._minus"),n=e.filter("._plus"),a=i()(this).find("input"),s=parseInt(a.attr("min"))||0,o=parseInt(a.attr("max"))||999,r=parseInt(a.attr("step"))||1;e.on("click",(function(){var e=i()(this).hasClass("_minus")?-1:1;e=parseInt(a.val())+r*e;s<=e&&e<=o&&(a.val(e),a.trigger("change"))})),a.on("change",(function(){var e=parseInt(a.val());t.toggleClass("_disabled",e<=s),n.toggleClass("_disabled",o<=e)}))}))},initInputLabel:function(){var e=".js-label input, .js-label textarea, .js-label select",t="_label-empty";this.app.document.on("focus",e,(function(){i()(this).siblings("label").removeClass(t)})).on("blur",e,(function(){i()(this).val()||i()(this).siblings("label").addClass(t)})),i()(e).each((function(){i()(this).val()||i()(this).siblings("label").addClass(t)}))},checkInputLabel:function(e){e.siblings("label").toggleClass("_label-empty",!e.val())},initPromocode:function(){app.document.on("click",".js-promocode .js-promocode__toggler",(function(){i()(this).parents(".js-promocode").addClass("_opened").find("input").trigger("focus")}))},initStars:function(){app.document.on("click",".js-stars input",(function(){i()(this).parents(".js-stars").find("label").removeClass("_checked"),i()(this).parent("label").addClass("_checked")}))},initSelects:function(){i()(".js-select select").each((function(){i()(this).val()||i()(this).parents(".js-select").addClass("_empty")})),i()(".js-select:not(.js-select_init) select").each((function(){var e=this,t=i()(this).val(),n=i()('<input readonly value="'.concat(i()(this).find("option:selected").text(),'">'));t||i()(this).siblings("label").toggleClass("_label-empty",!t);var a=i()(this).parents(".js-select");n.prependTo(a),i()(this).addClass("hidden"),i()(this).on("change",(function(){n.val(i()(e).find("option:selected").text());var t=i()(e).val();a.toggleClass("_empty",!t),i()(e).siblings("label").toggleClass("_label-empty",!t)})),a.addClass("js-select_init")}))},handleSelects:function(){app.document.on("click",".js-select input",(function(e){var t;e.preventDefault(),e.stopPropagation(),(e=i()(this).parents(".js-select")).hasClass("_opened")?(e.find(".js-select__inner").remove(),e.removeClass("_opened")):(t=i()('<ul class="select__inner js-select__inner"></ul>'),e.find("select option").each((function(){var e=i()(this).is(":selected")?"_selected":"";t.append('<li class="select__item '.concat(e,'" data-value="').concat(i()(this).val(),'">').concat(i()(this).text(),"</li>"))})),t.appendTo(e),e.addClass("_opened"))})),app.document.on("click",".js-select__inner .select__item",(function(){var e=i()(this).parents(".js-select"),t=i()(this).data("value");e.find("select").val(t).trigger("change"),e.hasClass("js-label")&&t&&e.find("label").removeClass("_label-empty")})),app.document.on("click",(function(){i()(".js-select__inner").remove(),i()(".js-select").removeClass("_opened")}))},initMask:function(){var e=document.querySelectorAll('input[type="tel"]');d()({mask:"+7 (999) 999-99-99",postValidation:function(e,t,n){return 0===t&&-1!==["0","8"].indexOf(n)?{remove:4}:4!==t||"0"!==n},showMaskOnHover:!1,jitMasking:!0}).mask(e)},initPasswordToggler:function(){app.document.on("click",".js-form-password",(function(){var e,t=i()(this).siblings("input"),n=i()(this).find("i");t.length&&t.length&&(e="password"===t.prop("type"),t.prop("type",e?"text":"password"),n.toggleClass("icon-eye-closed",!e),n.toggleClass("icon-eye-opened",e))}))},initUploadAvatar:function(){var e=i()(".js-upload");function t(e,t){var n="multipart/form-data"===e.attr("enctype");i.a.ajax({type:e.attr("method")||"get",url:e.attr("action"),data:n?new FormData(e[0]):e.serialize(),contentType:!n&&"application/x-www-form-urlencoded; charset=UTF-8",processData:!n,beforeSend:function(){t.addClass("_loading")}}).done((function(e){var n;!e.success||(n=t.find(".js-upload__preview")).length&&(e.thumb?(n.attr("src",e.thumb),t.find(".js-upload__input").val(""),t.find(".js-upload__remove button").attr("disabled",!1)):(n.attr("src",n.data("default")),t.find(".js-upload__remove button").attr("disabled",!0))),e.msg&&app.message[!0===e.success?"success":"error"](e.msg)})).always((function(){t.removeClass("_loading")})).fail((function(e,t,n){console.log([e,t,n]),app.message.error(app.msgAjaxError)}))}e.length&&(e.find(".js-upload__input").on("change",(function(){return t(i()(this).parents("form"),e),!1})),e.find(".js-upload__remove").on("submit",(function(){return t(i()(this),e),!1})))}},u=p,f={init:function(){(f.app=this).document.ready((function(){f.initMenu(),f.initMobileMenu(),f.initRMenu(),f.initPopupMenu()}))},initMenu:function(){app.document.on("click",".js-header__menu-toggler",(function(){app.body.toggleClass("menu-open"),i()(".js-header__menu").slideToggle()})),app.document.on(app.resizeEventName,(function(){app.body.removeClass("menu-open"),i()(".js-header__menu").attr("style","")}))},initMobileMenu:function(){var e="mobile-menu-open",t=app.window.scrollTop(),n=i()(".js-header-mobile-menu-toggler"),a=i()(".js-header-mobile-menu-target");app.window.on("scroll",(function(){var i=app.window.scrollTop();200<i&&i<t?app.body.addClass(e):app.body.removeClass(e),t=i,n.removeClass("_active"),a.removeClass("_active")})),n.on("click",(function(){n.toggleClass("_active"),a.toggleClass("_active")})),app.document.on(app.resizeEventName,(function(){app.body.removeClass(e),n.removeClass("_active"),a.removeClass("_active")}))},initRMenu:function(){app.document.on("click",".js-header__r-menu__trigger-slide",(function(){if(app.media<=app.breakpoints.md)return i()(this).toggleClass("_active"),i()(this).siblings(".js-header__r-menu__target").slideToggle(),!1})),app.document.on("click",".js-header__r-menu__trigger-fade",(function(){var e,t=this;return app.media<=app.breakpoints.sm?(i()(this).toggleClass("_active"),i()(this).siblings(".js-header__r-menu__target").slideToggle(),!1):app.media<=app.breakpoints.md?(i()(this).hasClass("_active")?(i()(this).removeClass("_active"),i()(this).siblings(".js-header__r-menu__target").fadeOut()):(e=i()(".js-header__r-menu__trigger-fade._active")).length?(e.removeClass("_active"),i()(".js-header__r-menu__trigger-fade ~ .js-header__r-menu__target").fadeOut((function(){i()(t).addClass("_active"),i()(t).siblings(".js-header__r-menu__target").fadeIn()}))):(i()(this).addClass("_active"),i()(this).siblings(".js-header__r-menu__target").fadeIn()),!1):void 0})),app.document.on(app.resizeEventName,(function(){i()(".js-header__r-menu ._active").removeClass("_active"),i()(".js-header__r-menu__target").attr("style",""),app.body.removeClass("r-menu-opened")})),app.document.on("click",(function(){i()(".js-header__r-menu ._active").removeClass("_active"),i()(".js-header__r-menu__target").attr("style","")})),app.document.on("click",".js-header__r-menu",(function(e){e.stopPropagation()})),app.document.on("click",".js-header__r-menu-toggler",(function(e){app.body.toggleClass("r-menu-opened")}))},initPopupMenu:function(){app.document.on("click",".js-header__popup-menu-toggler[data-target]",(function(e){e.preventDefault(),e.stopPropagation();var t=i()('.js-header__popup-menu-target[data-target="'.concat(i()(this).data("target"),'"]'));t.length&&(i()(this).toggleClass("_active"),i()(this).hasClass("_active")?(i()(".js-header__popup-menu-target").hide(),i()('.js-header__popup-menu-toggler:not([data-target="'.concat(i()(this).data("target"),'"])')).removeClass("_active"),e=i()(this).offset(),t.css({top:e.top+i()(this).outerHeight()+5,left:e.left+i()(this).outerWidth()}).show()):t.hide())})),app.document.on("click ".concat(app.resizeEventName),(function(){i()(".js-header__popup-menu-target").hide(),i()(".js-header__popup-menu-toggler").removeClass("_active")}))}},h=f,m={cnts:[],zoom:15,init:function(){(m.app=this).document.ready((function(){m.cnts=document.querySelectorAll(".js-map"),m.cnts.length&&m.loadYmaps()}))},initMap:function(e){var t,n,a,s,o,r=this,c=e.querySelector(".js-map__cnt");c&&(c.id=app.uniqID(),t=new ymaps.Map(c.id,{center:[55.753215,37.622504],zoom:11,controls:[]},{suppressMapOpenBlock:!0}),n=ymaps.templateLayoutFactory.createClass('<div id="pm_{{ properties.id }}" class="placemark {{ properties.active }}">\n            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="28"><path d="M14 0c-2.054 0-4.107.441-6.01 1.324C4.146 3.11 1.324 6.522.36 10.596A13.47 13.47 0 002.876 22l1.086 1.387c.58.74 1.22 1.432 1.918 2.068l6.486 5.912a2.424 2.424 0 003.266 0l6.486-5.912a16.843 16.843 0 001.918-2.068L25.123 22a13.47 13.47 0 002.518-11.404c-.965-4.074-3.787-7.487-7.631-9.272A14.273 14.273 0 0014 0z" fill="currentColor"/><path d="M14.003 5.471a7.536 7.536 0 00-3.162.694l-.05.024a2.053 1.997 0 00-.002 0c-1.996.922-3.452 2.683-3.95 4.777a6.92 6.92 0 001.432 6.027 7.397 7.397 0 005.685 2.647h.09c2.212 0 4.301-.98 5.686-2.647a6.92 6.92 0 001.432-6.027c-.498-2.094-1.954-3.855-3.95-4.777a2.053 1.997 0 00-.002 0l-.05-.024a7.526 7.526 0 00-3.16-.694z" fill="#fff"/></svg>\n            </div>'),(a=new ymaps.ObjectManager({clusterize:!0,gridSize:128,geoObjectOpenBalloonOnClick:!1})).objects.options.set({iconLayout:n,iconImageSize:[34,48],iconShape:{type:"Rectangle",coordinates:[[-14,-32],[14,0]]}}),a.clusters.options.set({preset:"islands#darkBlueClusterIcons",hasBalloon:!1,hasHint:!1}),s=[],o={type:"FeatureCollection",features:[]},e.querySelectorAll("[data-geo]").forEach((function(e,t){var n=e.dataset.geo;n&&2===(n=n.split(",")).length&&(n[0]=parseFloat(n[0].trim()),n[1]=parseFloat(n[1].trim()),o.features.push({type:"Feature",id:t,geometry:{type:"Point",coordinates:n},properties:{id:"".concat(c.id,"_").concat(t)}}),s.push(e))})),a.add(o),t.geoObjects.events.once("add",(function(e){setTimeout((function(){var e=s.findIndex((function(e){return e.querySelector("input:checked")}));r.selectObject(c,s,e)}),200)})),t.geoObjects.add(a),this.setBounds(t),a.objects.events.add("click",(function(e){return r.selectObject(c,s,e.get("objectId"),!0)})),s.forEach((function(e,n){e.addEventListener("click",(function(){t.setCenter(a.objects.getById(n).geometry.coordinates,r.zoom).then((function(){setTimeout((function(){r.selectObject(c,s,n)}),200)}))}))})),i()(c).is(":visible")||app.document.one(app.tabChangedEventName,(function(e,n){r.setBounds(t),setTimeout((function(){var e=s.findIndex((function(e){return e.querySelector("input:checked")}));r.selectObject(c,s,e)}),200)})))},setBounds:function(e){e.setBounds(e.geoObjects.getBounds(),{checkZoomRange:!0,zoomMargin:30})},selectObject:function(e,t,n,i){i=3<arguments.length&&void 0!==i&&i,e.querySelectorAll(".placemark").forEach((function(e){return e.classList.remove("_active")})),null!==(e=e.querySelector("#pm_".concat(e.id,"_").concat(n)))&&void 0!==e&&e.classList.add("_active"),t[n].querySelector("input").checked=!0,i&&t[n].parentNode.parentNode.parentNode.classList.contains("js-scrollbar")&&(i=t[n].parentNode.parentNode.parentNode).classList.contains("js-scrollbar")&&s.a.get(i).scrollTo(0,t[n].offsetTop,200)},initMaps:function(){m.cnts.forEach((function(e){return m.initMap(e)}))},loadYmaps:function(){var e=this;"undefined"==typeof ymaps?i.a.ajax({url:"//api-maps.yandex.ru/2.1/?apikey=".concat(app.yandexKey,"&lang=ru_RU"),dataType:"script",cache:!0,success:function(){return ymaps.ready(e.initMaps)}}):ymaps.ready(this.initMaps)}},_=m;function g(e){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var v={breakpoints:{sm:320,md:768,lg:1200},media:320,resizeEventName:"app_resize",submitEventName:"app_submit",tabChangedEventName:"app_tab_changed",scrollToOffset:50,scrollToSpeed:500,mainSliderDelay:5e3,yandexKey:"c0d4f878-c19c-42b1-a753-debb74e99023",init:function(){var e=this;"object"===("undefined"==typeof appConfig?"undefined":g(appConfig))&&Object.keys(appConfig).forEach((function(e){Object.prototype.hasOwnProperty.call(v,e)&&(v[e]=appConfig[e])})),v.currentID=0,this.page=l,this.page.init.call(this),v.checkMedia(),v.window.on("resize",v.checkMedia),window.jQuery=i.a,(window.app=v).document.ready((function(){e.initCartService(),e.initClipboard(),e.initCut(),e.initPopups(),e.initSlide(),e.initSliders(),e.initSummary(),e.initScrollbar(),e.initScrollTo(),e.initTabs(),e.initTabsFilter(),Object(o.a)("[data-tippy-content]")})),this.forms=u,this.forms.init.call(this),this.header=h,this.header.init.call(this),this.maps=_,this.maps.init.call(this),this.document.on(v.resizeEventName,(function(){e.initSliders()})),v.body.addClass("_init")},initCartService:function(){this.document.on("click",".js-cart-service__toggler",(function(){return v.media<=v.breakpoints.sm&&i()(this).parents(".js-cart-service").find(".js-cart-service__content").slideToggle(),!1})),i()(".js-cart-service__toggler").each((function(){var e=i()(this).parents(".js-cart-service").find(".js-cart-service__content");e.length&&Object(o.a)(i()(this)[0],{content:e.html(),allowHTML:!0,theme:"hidden-sm"})}))},initClipboard:function(){navigator.clipboard?this.document.on("click",".js-copy-trigger",(function(){var e;navigator.clipboard.writeText(null===(e=i()(this).siblings(".js-copy-content"))||void 0===e?void 0:e.text()),v.message.info("Скопировано")})):i()(".js-copy-trigger").remove()},initCut:function(){var e=this,t="Читать полностью";i()(".js-cut").each((function(){var e=i()('<div class="js-cut__inner"></div>');e.html(i()(this).html());var n=i()('<span class="more _lg _cut js-cut__toggler"></span>');i()('<span class="more__inner"></span>').text(i()(this).data("text-open")||t).appendTo(n),i()(this).empty().append(e).append(n)})),this.document.on("click",".js-cut__toggler",(function(){var e,n,a=i()(this).parents(".js-cut");a.length&&(e=a.data("text-open")||t,n=a.data("text-close")||"Скрыть",a.toggleClass("_active"),i()(this).toggleClass("_active").find(".more__inner").text(i()(this).hasClass("_active")?n:e),a.find(".js-cut__inner").slideToggle())})),(this.media<this.breakpoints.md?i()(".js-cut__inner"):i()(".js-cut__toggler")).hide(),this.document.on(v.resizeEventName,(function(){e.media<e.breakpoints.md?(i()(".js-cut:not(._active) .js-cut__inner").hide(),i()(".js-cut__toggler").show()):(i()(".js-cut__inner").show(),i()(".js-cut__toggler").hide())}))},initPopups:function(){n(112),i()("[data-fancybox]").fancybox({autoFocus:!1,touch:!1,baseClass:"popup-wrapper",backFocus:!1,btnTpl:{smallBtn:'<button data-fancybox-close title="{{CLOSE}}">\n                            <i class="icon icon-close"></a>\n                        </button>'},closeExisting:!0,afterShow:function(e,t){var n=t.$content.find("form"),i=e.$trigger.data("form");if(n.length&&"object"===g(i))for(var a in i){var s=n.find('[name="'.concat(a,'"]'));s.length&&(s.is("[type=checkbox], [type=radio]")?s.prop("checked",i[a]):s.val(i[a]),u.checkInputLabel(s))}},afterClose:function(e,t){t=t.$content.find("form"),e=e.$trigger.data("form"),t.length&&"object"===g(e)&&(t[0].reset(),t.find(".js-label input").each((function(){u.checkInputLabel(i()(this))})))}})},initScrollbar:function(){function e(e){e.find(".js-scrollbar").each((function(){i()(this).toggleClass("scrollbar-disabled",i()(this).find(".js-scrollbar__inner").outerHeight()<=i()(this).outerHeight())}))}s.a.initAll({alwaysShowTracks:!0}),this.window.on("load resize",(function(){return e(v.document)})),this.document.on(v.tabChangedEventName,(function(t,n){return e(n)}))},initScrollTo:function(){v.document.on("click",".js-scrollto",(function(){var e=i()(this).attr("href")||i()(this).data("href");!e||(e=i()(e)).length&&i()("html, body").animate({scrollTop:e.offset().top-v.scrollToOffset},v.scrollToSpeed)}))},initSlide:function(){i()(".js-slide:not(._active)").each((function(){i()(this).find(".js-slide__content").hide()})),this.document.on("click",".js-slide__toggler",(function(){i()(this).parents(".js-slide").toggleClass("_active").find(".js-slide__content").slideToggle()}))},initSliders:function(){new a.a(".js-slider",{slidesPerView:"auto",spaceBetween:30,freeMode:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{768:{slidesPerView:3,freeMode:!1},1200:{slidesPerView:4,freeMode:!1}}}),new a.a(".js-slider-aservice",{slidesPerView:"auto",spaceBetween:30,pagination:{el:".swiper-pagination"},breakpoints:{768:{slidesPerView:2},1200:{slidesPerView:4}}});var e=new a.a(".js-slider-product-nav",{slidesPerView:"auto",spaceBetween:16,watchSlidesVisibility:!0,watchSlidesProgress:!0,breakpoints:{768:{slidesPerView:3,spaceBetween:24},1200:{slidesPerView:4,spaceBetween:24}}});new a.a(".js-slider-product",{spaceBetween:16,breakpoints:{1200:{spaceBetween:64}},thumbs:{swiper:e}});var t,n,s=i()(".js-slider-main");s.length&&(t=!0,1<s.find(".swiper-slide").length&&(s.addClass("_animated"),n=new a.a(s[0],{spaceBetween:15,loop:!0,autoHeight:!0,autoplay:{delay:this.mainSliderDelay,disableOnInteraction:!1},pagination:{el:".swiper-pagination",type:"bullets",clickable:!0,renderBullet:function(e,t){return'<span class="'.concat(t,'"><span class="').concat(t,'__inner"></span></span>')}},on:{paginationUpdate:function(){s.find(".swiper-pagination-bullet__inner").stop().css({width:0}),t&&s.find(".swiper-pagination-bullet-active .swiper-pagination-bullet__inner").animate({width:"100%"},v.mainSliderDelay)}}}),s.on("mouseenter",(function(){n.autoplay.stop(),s.find(".swiper-pagination-bullet__inner").stop().css({width:0}),t=!1,s.removeClass("_animated")})),s.on("mouseleave",(function(){n.autoplay.start(),t=!0,s.addClass("_animated")})))),v.media<v.breakpoints.md?(new a.a(".js-feats-slider",{slidesPerView:"auto",spaceBetween:30,freeMode:!0}),new a.a(".js-cats-slider",{spaceBetween:15,pagination:{el:".swiper-pagination",type:"bullets"}})):document.querySelectorAll("\n                .js-feats-slider.swiper-container-initialized,\n                .js-cats-slider.swiper-container-initialized\n            ").forEach((function(e){e.swiper&&e.swiper.destroy()})),v.media<=v.breakpoints.md?new a.a(".js-slider_md",{slidesPerView:"auto",spaceBetween:30,freeMode:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{768:{slidesPerView:3,freeMode:!1}}}):document.querySelectorAll("\n                .js-slider_md.swiper-container-initialized\n            ").forEach((function(e){e.swiper&&e.swiper.destroy()}))},initSummary:function(){i()("[data-summary]").each((function(){var e,t,n,a="h3",s=[];i()(this).data("summary")&&(a=i()(this).data("summary")),i()(this).find(a).each((function(e){var t=v.uniqID();i()(this).attr("id",t),s.push({id:t,text:i()(this).text()})})),s.length&&(e=i()(".article__aside"),i()(this).data("summary-target")&&(e=i()(i()(this).data("summary-target"))),e.length&&(t=i()('<div class="article-summary"></div>'),n=i()('<div class="article-summary__list"></div>'),a="Содержание статьи:",i()(this).data("summary-title")&&(a=i()(i()(this).data("summary-title"))),t.append('<div class="article-summary__h">'.concat(a,"</div>")),s.forEach((function(e){n.append('<a href="#'.concat(e.id,'") class="more _lg js-scrollto"><span class="more__inner">').concat(e.text,"</span></a>"))})),t.append(n),e.append(t)))}))},initTabs:function(){function e(){document.querySelectorAll(".js-tabs__slider.swiper-container-initialized").forEach((function(e){e.swiper&&e.swiper.destroy()})),v.media>=v.breakpoints.md&&i()(".js-tabs__slider").each((function(){var e=i()(this).find(".swiper-slide");!e.length||(e=e.eq(e.length-1)).position().left+e.outerWidth(!0)>i()(this).outerWidth()&&new a.a(i()(this).get(),{slidesPerView:"auto",spaceBetween:0,freeMode:!0})}))}function t(e){(e=i()('.js-tabs__trigger[data-href="'.concat(e,'"]'))).length&&(e.trigger("click"),(e=e.parents(".js-tabs")).length&&i()("html, body").animate({scrollTop:e.offset().top-v.scrollToOffset},v.scrollToSpeed))}e(),v.document.on(v.resizeEventName,(function(){e()})),i()(".js-tabs").each((function(){var e=i()(this),t=e.find("> .js-tabs__wrapper"),n=e.find("> .js-tabs__slider .js-tabs__trigger[data-href]"),a=e.find("> .js-tabs__select");n.length&&(n.filter("._active").length||n.first().addClass("_active"),n.filter(":not(._active)").each((function(){i()(i()(this).data("href")).hide()})),n.filter("._active").each((function(){i()(i()(this).data("href")).addClass("_active")})),a.find("select").on("change",(function(){n.filter('[data-href="'.concat(i()(this).val(),'"]')).trigger("click")})),n.on("click",(function(){var e,s,o,r;i()(this).hasClass("_active")||(e=i()(this).data("href"),(s=i()(e)).length&&(n.removeClass("_active"),i()(this).addClass("_active"),o=t.find("> .js-tabs__target._active"),t.css("height",o.outerHeight()),o.fadeOut(),s.css({visibility:"hidden",display:"block"}),r=s.outerHeight(),s.css({display:"none",visibility:"visible"}),t.animate({height:r},(function(){s.fadeIn((function(){o.removeClass("_active"),s.addClass("_active"),t.css("height","auto"),v.document.trigger(v.tabChangedEventName,[s])}))})),a.find("select").val(e),a.find("input").val(a.find("option:selected").text())))})))})),location.hash&&t(location.hash),v.document.on("click",".js-tabs__link",(function(){t(i()(this).attr("href"))}))},initTabsFilter:function(){i()(".js-tabs-filter").each((function(){var e=i()(this),t=e.find("> .js-tabs-filter__wrapper"),n=e.find("> .js-tabs__slider .js-tabs-filter__trigger[data-filter]"),a=e.find("> .js-tabs__select");n.length&&(n.filter("._active").length||n.first().addClass("_active"),-1!=n.filter("._active").data("filter")&&n.filter(":not(._active)").each((function(){t.find(".js-tabs-filter__target[data-filter=".concat(i()(this).data("filter"),"]")).hide()})),a.find("select").on("change",(function(){n.filter('[data-filter="'.concat(i()(this).val(),'"]')).trigger("click")})),n.on("click",(function(){var e;i()(this).hasClass("_active")||(t.find(".js-slide._active").removeClass("_active"),t.find(".js-slide__content").hide(),-1!=(e=i()(this).data("filter"))?(t.find(".js-tabs-filter__target[data-filter=".concat(e,"]")).show(),t.find(".js-tabs-filter__target[data-filter!=".concat(e,"]")).hide()):t.find(".js-tabs-filter__target[data-filter]").show(),n.removeClass("_active"),i()(this).addClass("_active"),a.find("select").val(e),a.find("input").val(a.find("option:selected").text()))})))}))},message:{info:function(e){alert(0<arguments.length&&void 0!==e?e:"Info")},error:function(e){alert(0<arguments.length&&void 0!==e?e:"Error")},success:function(e){alert(0<arguments.length&&void 0!==e?e:"Success")}},formatPrice:function(e){return this.formatNumber(e,0,","," ")},formatNumber:function(e,t,n,i){var a,s;return isNaN(t=Math.abs(t))&&(t=2),null==n&&(n=","),null==i&&(i="."),3<(s=(a=parseInt(e=(+e||0).toFixed(t))+"").length)?s%=3:s=0,(s?a.substr(0,s)+i:"")+a.substr(s).replace(/(\d{3})(?=\d)/g,"$1"+i)+(t?n+Math.abs(e-a).toFixed(t).replace(/-/,"0").slice(2):"")},checkMedia:function(){var e,t=v.media;for(e in v.breakpoints)v.window.outerWidth()>=v.breakpoints[e]&&(v.media=v.breakpoints[e]);v.media!=t&&v.document.trigger(v.resizeEventName,{media:v.media})},uniqID:function(){return"app_id_".concat(v.currentID++)},getNumEnding:function(e,t){var n;if(11<=(e%=100)&&e<=19)n=t[2];else switch(e%10){case 1:n=t[0];break;case 2:case 3:case 4:n=t[1];break;default:n=t[2]}return n},getKeyByValue:function(e,t){return Object.keys(e).find((function(n){return e[n]===t}))}};v.init()},67:function(e,t,n){e.exports=n(113)}});