import $ from 'jquery';

let header = {

    init: function () {
        header.app = this;

        this.document.ready(() => {
            header.initMenu();
            header.initCity();
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

    initCity() {
        let $cnt = $('.js-header__city');
        if (!$cnt.length) {
            return;
        }
        app.document.on('click', '.js-header__city-toggler', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).toggleClass('_active');
            if ($(this).hasClass('_active')) {
                let offset = $(this).offset();
                $cnt.css({
                    top: offset.top + $(this).outerHeight() + 5,
                    left: offset.left + $(this).outerWidth(),
                }).show();
            } else {
                $cnt.hide();
            }
        });
        app.document.on(`click ${app.resizeEventName}`, function () {
            $cnt.hide();
            $('.js-header__city-toggler').removeClass('_active');
        });
    },


};

export default header;
