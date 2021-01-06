import $ from 'jquery';

let header = {

    init: function () {
        header.app = this;

        this.document.ready(() => {
            header.initMenu();
            header.initRMenu();
            header.initPopupMenu();
        });

    },

    initMenu() {
        app.document.on('click', '.js-header__menu-toggler', () => {
            app.body.toggleClass('menu-open');
            $('.js-header__menu').slideToggle();
        });
        app.document.on(app.resizeEventName, () => {
            app.body.removeClass('menu-open');
            $('.js-header__menu').attr('style', '');
        });
    },

    initRMenu() {
        app.document.on('click', '.js-header__r-menu__trigger-slide', function () {
            if (app.media <= app.breakpoints.md) {
                $(this).toggleClass('_active');
                $(this).siblings('.js-header__r-menu__target').slideToggle();
                return false;
            }
        });
        app.document.on('click', '.js-header__r-menu__trigger-fade', function () {
            if (app.media <= app.breakpoints.sm) {
                $(this).toggleClass('_active');
                $(this).siblings('.js-header__r-menu__target').slideToggle();
                return false;
            } else if (app.media <= app.breakpoints.md) {
                if ($(this).hasClass('_active')) {
                    $(this).removeClass('_active');
                    $(this).siblings('.js-header__r-menu__target').fadeOut();
                } else {
                    let $active = $('.js-header__r-menu__trigger-fade._active');
                    if ($active.length) {
                        $active.removeClass('_active');
                        $('.js-header__r-menu__trigger-fade ~ .js-header__r-menu__target').fadeOut(() => {
                            $(this).addClass('_active');
                            $(this).siblings('.js-header__r-menu__target').fadeIn();
                        });
                    } else {
                        $(this).addClass('_active');
                        $(this).siblings('.js-header__r-menu__target').fadeIn();
                    }
                }
                return false;
            }
        });
        app.document.on(app.resizeEventName, () => {
            $('.js-header__r-menu ._active').removeClass('_active');
            $('.js-header__r-menu__target').attr('style', '');
            app.body.removeClass('r-menu-opened');
        });
        app.document.on('click', () => {
            $('.js-header__r-menu ._active').removeClass('_active');
            $('.js-header__r-menu__target').attr('style', '');
        });
        app.document.on('click', '.js-header__r-menu', (e) => {
            e.stopPropagation();
        });
        app.document.on('click', '.js-header__r-menu-toggler', (e) => {
            app.body.toggleClass('r-menu-opened');
        });
    },

    initPopupMenu() {
        app.document.on('click', '.js-header__popup-menu-toggler[data-target]', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const $target = $(`.js-header__popup-menu-target[data-target="${$(this).data('target')}"]`);
            if ($target.length) {
                $(this).toggleClass('_active');
                if ($(this).hasClass('_active')) {
                    $('.js-header__popup-menu-target').hide();
                    $(`.js-header__popup-menu-toggler:not([data-target="${$(this).data('target')}"])`).removeClass('_active');
                    let offset = $(this).offset();
                    $target.css({
                        top: offset.top + $(this).outerHeight() + 5,
                        left: offset.left + $(this).outerWidth(),
                    }).show();
                } else {
                    $target.hide();
                }
            }
        });
        app.document.on(`click ${app.resizeEventName}`, function () {
            $('.js-header__popup-menu-target').hide();
            $('.js-header__popup-menu-toggler').removeClass('_active');
        });
    },


};

export default header;
