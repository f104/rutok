import $ from 'jquery';
import Inputmask from 'inputmask';

let forms = {

    init: function () {
        forms.app = this;

        this.document.ready(() => {
            forms.initCounter();
            forms.initInputLabel();
            forms.initMask();
            forms.initPromocode();
            forms.initSelects();
            forms.initStars();
            forms.handleSelects();
        });

        this.document.on(app.resizeEventName, () => {
            forms.initSelects();
        });
    },

    /**
     * plus/minus input
     */
    initCounter() {
        $('.js-counter').each(function () {
            let $btn = $(this).find('button'),
                $minus = $btn.filter('._minus'),
                $plus = $btn.filter('._plus'),
                $input = $(this).find('input'),
                min = parseInt($input.attr('min')) || 0, max = parseInt($input.attr('max')) || 999,
                step = parseInt($input.attr('step')) || 1;
            $btn.on('click', function () {
                let dir = $(this).hasClass('_minus') ? -1 : 1;
                let newVal = parseInt($input.val()) + step * dir;
                if (newVal >= min && newVal <= max) {
                    $input.val(newVal);
                    $input.trigger('change');
                }
            });
            $input.on('change', function () {
                let val = parseInt($input.val());
                $minus.toggleClass('_disabled', val <= min);
                $plus.toggleClass('_disabled', val >= max);
            });
        });
    },

    initInputLabel() {
        let sel = '.js-label input, .js-label textarea, .js-label select';
        let className = '_label-empty';
        this.app.document
            .on('focus', sel, function () {
                $(this).siblings('label').removeClass(className);
            })
            .on('blur', sel, function () {
                if (!$(this).val()) {
                    $(this).siblings('label').addClass(className);
                }
            });
        $(sel).each(function () {
            if (!$(this).val()) {
                $(this).siblings('label').addClass(className);
            }
        });
    },

    initPromocode() {
        app.document.on('click', '.js-promocode .js-promocode__toggler', function () {
            $(this).parents('.js-promocode')
                .addClass('_opened')
                .find('input').trigger('focus');
        });
    },

    initStars() {
        app.document.on('click', '.js-stars input', function () {
            $(this).parents('.js-stars').find('label').removeClass('_checked');
            $(this).parent('label').addClass('_checked');
        });
    },

    initSelects() {
        $('.js-select select').each(function () {
            if (!$(this).val()) {
                $(this).parents('.js-select').addClass('_empty');
            }
        });
        $('.js-select:not(.js-select_init) select').each(function () {
            let val = $(this).val();
            let $input = $(`<input readonly value="${$(this).find('option:selected').text()}">`);
            if (!val) {
                $(this).siblings('label').toggleClass('_label-empty', !val);
            }
            let $parent = $(this).parents('.js-select');
            $input.prependTo($parent);
            $(this).addClass('hidden');
            $(this).on('change', () => {
                $input.val($(this).find('option:selected').text());
                let val = $(this).val();
                $parent.toggleClass('_empty', !val);
                $(this).siblings('label').toggleClass('_label-empty', !val);
            });
            $parent.addClass('js-select_init');
        });
    },

    handleSelects() {
        app.document.on('click', '.js-select input', function (e) {
            e.preventDefault();
            e.stopPropagation();
            let $parent = $(this).parents('.js-select');
            if ($parent.hasClass('_opened')) {
                $parent.find('.js-select__inner').remove();
                $parent.removeClass('_opened');
            } else {
                let $dropdown = $('<ul class="select__inner js-select__inner"></ul>');
                $parent.find('select option').each(function () {
                    let selected = $(this).is(':selected') ? '_selected' : '';
                    $dropdown.append(`<li class="select__item ${selected}" data-value="${$(this).val()}">${$(this).text()}</li>`);
                });
                $dropdown.appendTo($parent);
                $parent.addClass('_opened');
            }
        });
        app.document.on('click', '.js-select__inner .select__item', function () {
            let $parent = $(this).parents('.js-select'), value = $(this).data('value');
            $parent.find('select').val(value).trigger('change');
            if ($parent.hasClass('js-label') && value) {
                $parent.find('label').removeClass('_label-empty');
            }
        });
        app.document.on('click', function () {
            $('.js-select__inner').remove();
            $('.js-select').removeClass('_opened');
        });
    },

    initMask() {
        const selector = document.querySelectorAll('input[type="tel"]');
        // простой вариант
        // Inputmask({
        //     mask: '+7 (999) 999 99 99',
        //     showMaskOnHover: false,
        // }).mask(selector);
        // подмена восьмерки, подстановка +7, городские номера
        Inputmask({
            mask: '+7 (999) 999-99-99',
            postValidation: function (buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval) {
                // console.log(pos, c)
                if (pos === 0 && ['0', '8'].indexOf(c) !== -1) {
                    return {
                        remove: 4
                    };
                }
                if (pos === 4 && c === '0') {
                    return false;
                }
                return true;
            },
            showMaskOnHover: false,
            jitMasking: true,
        }).mask(selector);
    },

};

export default forms;
