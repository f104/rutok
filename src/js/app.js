import $ from 'jquery';
import 'lazysizes';
import Swiper from 'swiper/bundle';
import Scrollbar from 'smooth-scrollbar';
import tippy from 'tippy.js';

import page from 'page';
import forms from 'forms';
import header from 'header';
import maps from 'maps';

let app = {

    // параметры, изменяемые в appConfig

    breakpoints: {
        sm: 320,
        md: 768,
        lg: 1200
    },
    media: 320,
    resizeEventName: 'app_resize',
    submitEventName: 'app_submit',
    tabChangedEventName: 'app_tab_changed',
    scrollToOffset: 50, // оффсет при скролле до элемента
    scrollToSpeed: 500, // скорость скролла
    mainSliderDelay: 5000, // время показа одного слайда в главном сдайдере
    yandexKey: 'c0d4f878-c19c-42b1-a753-debb74e99023', // ключ api яндекс-карт

    init: function () {
        // read config
        if (typeof appConfig === 'object') {
            Object.keys(appConfig).forEach(key => {
                if (Object.prototype.hasOwnProperty.call(app, key)) {
                    app[key] = appConfig[key];
                }
            });
        }

        app.currentID = 0;

        // Init page
        this.page = page;
        this.page.init.call(this);

        app.checkMedia();
        app.window.on('resize', app.checkMedia);
        window.jQuery = $;
        window.app = app;

        app.document.ready(() => {
            this.initCartService();
            this.initCut();
            this.initPopups();
            this.initSlide();
            this.initSliders();
            this.initSummary();
            this.initScrollbar();
            this.initScrollTo();
            this.initTabs();
            this.initTabsFilter();

            tippy('[data-tippy-content]');
        });

        // Init forms
        this.forms = forms;
        this.forms.init.call(this);

        this.header = header;
        this.header.init.call(this);

        this.maps = maps;
        this.maps.init.call(this);

        // app.window.on('load', () => {
        // });

        this.document.on(app.resizeEventName, () => {
            this.initSliders();
        });

    },

    /* связка переключателей и селекта тегов */
    // initTags() {
    //     this.document.on('click', '.js-tags__item', function() {
    //         $('.js-tags__item').removeClass('_active');
    //         $(this).addClass('_active');
    //         let $select = $(this).parents('.js-tag').find('.js-tag__select');
    //         if ($select.length) {

    //         }
    //     });
    // },

    initCartService() {
        this.document.on('click', '.js-cart-service__toggler', function () {
            if (app.media <= app.breakpoints.sm) {
                $(this).parents('.js-cart-service').find('.js-cart-service__content').slideToggle();
            }
            return false;
        });
        $('.js-cart-service__toggler').each(function () {
            console.log($(this));
            const $template = $(this).parents('.js-cart-service').find('.js-cart-service__content');
            if ($template.length) {
                tippy($(this)[0], {
                    content: $template.html(),
                    allowHTML: true,
                    theme: 'hidden-sm',
                });
            }
        })
    },

    initCut() {
        let textOpenDefault = 'Читать полностью', textCloseDefault = 'Скрыть';

        $('.js-cut').each(function () {
            let $inner = $('<div class="js-cut__inner"></div>');
            $inner.html($(this).html());
            let $btn = $('<span class="more _lg _cut js-cut__toggler"></span>');
            let $btnInner = $('<span class="more__inner"></span>');
            $btnInner.text($(this).data('text-open') || textOpenDefault).appendTo($btn);
            $(this).empty().append($inner).append($btn);
        });

        this.document.on('click', '.js-cut__toggler', function () {
            let $parent = $(this).parents('.js-cut');
            if ($parent.length) {
                let textOpen = $parent.data('text-open') || textOpenDefault;
                let textClose = $parent.data('text-close') || textCloseDefault;
                $parent.toggleClass('_active');
                $(this)
                    .toggleClass('_active')
                    .find('.more__inner').text($(this).hasClass('_active') ? textClose : textOpen);
                $parent.find('.js-cut__inner').slideToggle();
            }
        });

        if (this.media < this.breakpoints.md) {
            $('.js-cut__inner').hide();
        } else {
            $('.js-cut__toggler').hide();
        }

        this.document.on(app.resizeEventName, () => {
            if (this.media < this.breakpoints.md) {
                $('.js-cut:not(._active) .js-cut__inner').hide();
                $('.js-cut__toggler').show();
            } else {
                $('.js-cut__inner').show();
                $('.js-cut__toggler').hide();
            }
        });
    },

    initPopups() {
        require('@fancyapps/fancybox');
        $('[data-fancybox]').fancybox({
            autoFocus: false,
            touch: false,
            baseClass: 'popup-wrapper',
            backFocus: false,
            btnTpl: {
                smallBtn: `<button data-fancybox-close title="{{CLOSE}}">
                            <i class="icon icon-close"></a>
                        </button>`,
            },
            afterShow: function (instance, slide) {
                // fill form
                let $form = slide.$content.find('form');
                let formData = instance.$trigger.data('form');
                if ($form.length && typeof formData === 'object') {
                    // console.log(formData);
                    for (const k in formData) {
                        let $f = $form.find(`[name="${k}"]`);
                        if ($f.length) {
                            if ($f.is('[type=checkbox], [type=radio]')) {
                                $f.prop('checked', formData[k]);
                            } else {
                                $f.val(formData[k]);
                            }
                            forms.checkInputLabel($f);
                        }
                    }
                }
            },
            afterClose: function (instance, slide) {
                // reset form
                let $form = slide.$content.find('form');
                let formData = instance.$trigger.data('form');
                if ($form.length && typeof formData === 'object') {
                    $form[0].reset();
                    $form.find('.js-label input').each(function() {
                        forms.checkInputLabel($(this));
                    });
                }
            },
        });
    },

    initScrollbar() {
        Scrollbar.initAll({
            alwaysShowTracks: true,
        });
        function fixScrollbars($wrapper) {
            $wrapper.find('.js-scrollbar').each(function () {
                // $(this).find('.scrollbar-track-y').show();
                $(this).toggleClass('scrollbar-disabled', $(this).find('.js-scrollbar__inner').outerHeight() <= $(this).outerHeight());
            });
        }
        this.window.on('load resize', () => fixScrollbars(app.document));
        this.document.on(app.tabChangedEventName, (e, $tab) => fixScrollbars($tab));
    },

    initScrollTo() {
        app.document.on('click', '.js-scrollto', function () {
            let target = $(this).attr('href') || $(this).data('href');
            if (target) {
                let $target = $(target);
                if ($target.length) {
                    $('html, body').animate({
                        scrollTop: $target.offset().top - app.scrollToOffset
                    }, app.scrollToSpeed);
                }
            }
        });
    },

    /* collapsible content */
    initSlide() {
        $('.js-slide:not(._active)').each(function () {
            $(this).find('.js-slide__content').hide();
        });
        this.document.on('click', '.js-slide__toggler', function () {
            $(this).parents('.js-slide')
                .toggleClass('_active')
                .find('.js-slide__content').slideToggle();
        });
    },

    initSliders() {
        new Swiper('.js-slider', {
            slidesPerView: 'auto',
            spaceBetween: 30,
            freeMode: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    freeMode: false,
                },
                1200: {
                    slidesPerView: 4,
                    freeMode: false,
                }
            }
        });

        new Swiper('.js-slider-aservice', {
            slidesPerView: 'auto',
            spaceBetween: 30,
            // freeMode: true,
            pagination: {
                el: '.swiper-pagination',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    // freeMode: false,
                },
                1200: {
                    slidesPerView: 4,
                    // freeMode: false,
                }
            }
        });

        let productNavSlider = new Swiper('.js-slider-product-nav', {
            slidesPerView: 'auto',
            spaceBetween: 16,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                }
            }
        });
        new Swiper('.js-slider-product', {
            spaceBetween: 16,
            breakpoints: {
                1200: {
                    spaceBetween: 64,
                }
            },
            thumbs: {
                swiper: productNavSlider
            }
        });

        let $cnt = $('.js-slider-main');
        if ($cnt.length) {
            let animated = true;
            if ($cnt.find('.swiper-slide').length > 1) {
                $cnt.addClass('_animated');
                let mainSwiper = new Swiper($cnt[0], {
                    spaceBetween: 15,
                    loop: true,
                    autoHeight: true,
                    autoplay: {
                        delay: this.mainSliderDelay,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true,
                        renderBullet: function (index, className) {
                            return `<span class="${className}"><span class="${className}__inner"></span></span>`;
                        },
                    },
                    on: {
                        paginationUpdate: function () {
                            $cnt.find('.swiper-pagination-bullet__inner').stop().css({ width: 0 });
                            if (animated) {
                                $cnt.find('.swiper-pagination-bullet-active .swiper-pagination-bullet__inner').animate({
                                    width: '100%',
                                }, app.mainSliderDelay);
                            }
                        },
                    },
                });
                $cnt.on('mouseenter', () => {
                    mainSwiper.autoplay.stop();
                    $cnt.find('.swiper-pagination-bullet__inner').stop().css({ width: 0 });
                    animated = false;
                    $cnt.removeClass('_animated');
                });
                $cnt.on('mouseleave', () => {
                    mainSwiper.autoplay.start();
                    animated = true;
                    $cnt.addClass('_animated');
                });
            }
        }

        // only sm
        if (app.media < app.breakpoints.md) {
            new Swiper('.js-feats-slider', {
                slidesPerView: 'auto',
                spaceBetween: 30,
                freeMode: true,
            });
            new Swiper('.js-cats-slider', {
                spaceBetween: 15,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                },
            });

        } else {
            document.querySelectorAll(`
                .js-feats-slider.swiper-container-initialized,
                .js-cats-slider.swiper-container-initialized
            `).forEach(el => {
                if (el.swiper) {
                    el.swiper.destroy();
                }
            });
        }
        // down md
        if (app.media <= app.breakpoints.md) {
            new Swiper('.js-slider_md', {
                slidesPerView: 'auto',
                spaceBetween: 30,
                freeMode: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 3,
                        freeMode: false,
                    },
                }
            });
        } else {
            document.querySelectorAll(`
                .js-slider_md.swiper-container-initialized
            `).forEach(el => {
                if (el.swiper) {
                    el.swiper.destroy();
                }
            });
        }
    },

    initSummary() {
        $('[data-summary]').each(function () {
            let anchors = 'h3', items = [];
            if ($(this).data('summary')) {
                anchors = $(this).data('summary');
            }
            $(this).find(anchors).each(function ($anchor) {
                let id = app.uniqID();
                $(this).attr('id', id);
                items.push({
                    id: id,
                    text: $(this).text(),
                });
            });
            if (items.length) {
                let $target = $('.article__aside');
                if ($(this).data('summary-target')) {
                    $target = $($(this).data('summary-target'));
                }
                if ($target.length) {
                    let $summary = $('<div class="article-summary"></div>');
                    let $list = $('<div class="article-summary__list"></div>');
                    let title = 'Содержание статьи:';
                    if ($(this).data('summary-title')) {
                        title = $($(this).data('summary-title'));
                    }
                    $summary.append(`<div class="article-summary__h">${title}</div>`);
                    items.forEach(item => {
                        $list.append(`<a href="#${item.id}") class="more _lg js-scrollto"><span class="more__inner">${item.text}</span></a>`);
                    });
                    $summary.append($list);
                    $target.append($summary);
                }
            }
            // console.log(items);
        });
    },

    initTabs() {
        function initSliders() {
            document.querySelectorAll('.js-tabs__slider.swiper-container-initialized').forEach(el => {
                if (el.swiper) {
                    el.swiper.destroy();
                }
            });
            if (app.media >= app.breakpoints.md) {
                $('.js-tabs__slider').each(function () {
                    let $slides = $(this).find('.swiper-slide');
                    if ($slides.length) {
                        let $lastSlide = $slides.eq($slides.length - 1);
                        if ($lastSlide.position().left + $lastSlide.outerWidth(true) > $(this).outerWidth()) {
                            new Swiper($(this).get(), {
                                slidesPerView: 'auto',
                                spaceBetween: 0,
                                freeMode: true,
                            });
                        }
                    }
                });
            }
        }
        initSliders();
        app.document.on(app.resizeEventName, () => {
            initSliders();
        });


        $('.js-tabs').each(function () {
            let $wrapper = $(this);
            let $targetWrapper = $wrapper.find('> .js-tabs__wrapper');
            let $triggers = $wrapper.find('> .js-tabs__slider .js-tabs__trigger[data-href]');
            let $select = $wrapper.find('> .js-tabs__select');
            if (!$triggers.length) {
                return;
            }
            if (!$triggers.filter('._active').length) {
                $triggers.first().addClass('_active');
            }
            $triggers.filter(':not(._active)').each(function () {
                $($(this).data('href')).hide();
            });
            $triggers.filter('._active').each(function () {
                $($(this).data('href')).addClass('_active');
            });
            $select.find('select').on('change', function () {
                $triggers.filter(`[data-href="${$(this).val()}"]`).trigger('click');
            });
            $triggers.on('click', function () {
                if ($(this).hasClass('_active')) {
                    return;
                }
                let href = $(this).data('href');
                let $target = $(href);
                if (!$target.length) {
                    return;
                }
                $triggers.removeClass('_active');
                $(this).addClass('_active');
                // let $parent = $(this).parent();
                // $parent.animate({
                //     scrollLeft: $parent.scrollLeft() + $(this).position().left - parseInt($parent.css('padding-left')),
                // });
                let $current = $targetWrapper.find('> .js-tabs__target._active');
                $targetWrapper.css('height', $current.outerHeight());
                $current.fadeOut();
                $target.css({
                    visibility: 'hidden',
                    display: 'block'
                });
                let targetHeight = $target.outerHeight();
                $target.css({
                    display: 'none',
                    visibility: 'visible'
                });
                $targetWrapper.animate({ height: targetHeight }, () => {
                    $target.fadeIn(() => {
                        $current.removeClass('_active');
                        $target.addClass('_active');
                        $targetWrapper.css('height', 'auto');
                        app.document.trigger(app.tabChangedEventName, [$target]);
                    });
                });
                $select.find('select').val(href);
                $select.find('input').val($select.find('option:selected').text());
            });

        });

        function openTab(selector) {
            let $trigger = $(`.js-tabs__trigger[data-href="${selector}"]`);
            if ($trigger.length) {
                $trigger.trigger('click');
                let $target = $trigger.parents('.js-tabs');
                if ($target.length) {
                    $('html, body').animate({
                        scrollTop: $target.offset().top - app.scrollToOffset
                    }, app.scrollToSpeed);
                }
            }
        }

        if (location.hash) {
            openTab(location.hash);
        }

        app.document.on('click', '.js-tabs__link', function () {
            openTab($(this).attr('href'));
        });
    },

    initTabsFilter() {
        $('.js-tabs-filter').each(function () {
            let $wrapper = $(this);
            let $targetWrapper = $wrapper.find('> .js-tabs-filter__wrapper');
            let $triggers = $wrapper.find('> .js-tabs__slider .js-tabs-filter__trigger[data-filter]');
            let $select = $wrapper.find('> .js-tabs__select');
            if (!$triggers.length) {
                return;
            }
            if (!$triggers.filter('._active').length) {
                $triggers.first().addClass('_active');
            }
            let filter = $triggers.filter('._active').data('filter');
            if (filter != -1) {
                $triggers.filter(':not(._active)').each(function () {
                    $targetWrapper.find(`.js-tabs-filter__target[data-filter=${$(this).data('filter')}]`).hide();
                });
            }
            $select.find('select').on('change', function () {
                $triggers.filter(`[data-filter="${$(this).val()}"]`).trigger('click');
            });
            $triggers.on('click', function () {
                if ($(this).hasClass('_active')) {
                    return;
                }
                $targetWrapper.find('.js-slide._active').removeClass('_active');
                $targetWrapper.find('.js-slide__content').hide();
                let filter = $(this).data('filter');
                if (filter != -1) {
                    $targetWrapper.find(`.js-tabs-filter__target[data-filter=${filter}]`).show();
                    $targetWrapper.find(`.js-tabs-filter__target[data-filter!=${filter}]`).hide();
                } else {
                    $targetWrapper.find(`.js-tabs-filter__target[data-filter]`).show();
                }
                $triggers.removeClass('_active');
                $(this).addClass('_active');
                $select.find('select').val(filter);
                $select.find('input').val($select.find('option:selected').text());
            });

        });

    },

    message: {
        info(msg = 'Info', sticky = false) {
            alert(msg);
        },
        error(msg = 'Error', sticky = false) {
            alert(msg);
        },
        success(msg = 'Success', sticky = false) {
            alert(msg);
        }
    },

    formatPrice(price) {
        return this.formatNumber(price, 0, ',', ' ');
    },

    formatNumber(number, decimals, dec_point, thousands_sep) {
        // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfix by: Michael White (http://crestidg.com)
        let i, j, kw, kd, km;

        // input sanitation & defaults
        if (isNaN(decimals = Math.abs(decimals))) {
            decimals = 2;
        }
        if (dec_point == undefined) {
            dec_point = ',';
        }
        if (thousands_sep == undefined) {
            thousands_sep = '.';
        }

        i = parseInt(number = (+number || 0).toFixed(decimals)) + '';

        if ((j = i.length) > 3) {
            j = j % 3;
        } else {
            j = 0;
        }

        km = j
            ? i.substr(0, j) + thousands_sep
            : '';
        kw = i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands_sep);
        kd = (decimals
            ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, '0').slice(2)
            : '');

        return km + kw + kd;
    },

    /**
     * Проверяет размер окна и пишет его в app.media
     * @returns void
     */
    checkMedia() {
        let current = app.media;
        for (let key in app.breakpoints) {
            if (app.window.outerWidth() >= app.breakpoints[key]) {
                app.media = app.breakpoints[key];
            }
            //            console.log(app.media);
        }
        if (app.media != current) {
            app.document.trigger(app.resizeEventName, { media: app.media });
        }
    },

    uniqID() {
        return `app_id_${app.currentID++}`;
    },

    /**
     * Функция возвращает окончание для множественного числа слова на основании числа и массива окончаний
     * param  iNumber Integer Число на основе которого нужно сформировать окончание
     * param  aEndings Array Массив слов или окончаний для чисел (1, 4, 5),
     *         например ['яблоко', 'яблока', 'яблок']
     * return String
     *
     * https://habrahabr.ru/post/105428/
     */
    getNumEnding(iNumber, aEndings) {
        let sEnding, i;
        iNumber = iNumber % 100;
        if (iNumber >= 11 && iNumber <= 19) {
            sEnding = aEndings[2];
        } else {
            i = iNumber % 10;
            switch (i) {
                case (1):
                    sEnding = aEndings[0];
                    break;
                case (2):
                case (3):
                case (4):
                    sEnding = aEndings[1];
                    break;
                default:
                    sEnding = aEndings[2];
            }
        }
        return sEnding;
    },

    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

};
app.init();
