import $ from 'jquery';
import Inputmask from 'inputmask';
import noUiSlider from 'nouislider';

let forms = {

    init: function () {
        forms.app = this;

        this.document.ready(() => {
            forms.initCounter();
            forms.initInputLabel();
            forms.initMask();
            forms.initPasswordToggler();
            forms.initPromocode();
            forms.initRange();
            forms.initSelects();
            forms.initSorts();
            forms.initStars();
            forms.handleSelects();
            forms.handleSorts();
            forms.initUploadAvatar();
        });

        this.document.on(app.resizeEventName, () => {
            forms.initSelects();
            forms.initSorts();
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

    checkInputLabel($input) {
        $input.siblings('label').toggleClass('_label-empty', !$input.val());
    },

    initPromocode() {
        app.document.on('click', '.js-promocode .js-promocode__toggler', function () {
            $(this).parents('.js-promocode')
                .addClass('_opened')
                .find('input').trigger('focus');
        });
    },

    initRange() {
        document.querySelectorAll('.js-range').forEach((elem) => {
            let slider = elem.querySelector('.js-range__target'),
                inputs = elem.querySelectorAll('input'),
                from = inputs[0],
                to = inputs[1];
            if (slider && from && to) {
                let min = parseInt(from.value) || 0,
                    max = parseInt(to.value) || 0;
                noUiSlider.create(slider, {
                    start: [
                        min,
                        max
                    ],
                    connect: true,
                    range: {
                        'min': min,
                        'max': max
                    }
                });
                let snapValues = [from, to];
                slider.noUiSlider.on('update', (values, handle) => {
                    snapValues[handle].value = app.formatPrice(Math.round(values[handle]));
                });
                from.addEventListener('change', function () {
                    slider.noUiSlider.set([this.value, null]);
                    console.log(1)
                });
                to.addEventListener('change', function () {
                    slider.noUiSlider.set([null, this.value]);
                });
                let form = $(slider).parents('form')[0];
                if (form) {
                    form.addEventListener('reset', function () {
                        slider.noUiSlider.set([min, max]);
                    });
                }
            }
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
                $('.js-select__inner').remove();
                $('.js-select, .js-sort').removeClass('_opened');
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
            let $parent = $(this).parents('.js-select, .js-sort'), value = $(this).data('value');
            $parent.find('select').val(value).trigger('change');
            if ($parent.hasClass('js-label') && value) {
                $parent.find('label').removeClass('_label-empty');
            }
        });
        app.document.on('click', function () {
            $('.js-select__inner').remove();
            $('.js-select, .js-sort').removeClass('_opened');
        });
    },

    initSorts() {
        $('.js-sort:not(.js-sort_init) select').each(function () {
            let val = $(this).val();
            let $input = $(`<span class="sort__input">${$(this).find('option:selected').text()}</span>`);
            let $parent = $(this).parents('.js-sort');
            $input.appendTo($parent);
            $(this).addClass('hidden');
            $(this).on('change', () => {
                $input.text($(this).find('option:selected').text());
            });
            $parent.addClass('js-sort_init');
        });
    },

    handleSorts() {
        app.document.on('click', '.js-sort', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if ($(this).hasClass('_opened')) {
                $(this).find('.js-select__inner').remove();
                $(this).removeClass('_opened');
            } else {
                $('.js-select__inner').remove();
                $('.js-select, .js-sort').removeClass('_opened');
                let $dropdown = $('<ul class="select__inner js-select__inner"></ul>');
                $(this).find('select option').each(function () {
                    let selected = $(this).is(':selected') ? '_selected' : '';
                    $dropdown.append(`<li class="select__item ${selected}" data-value="${$(this).val()}">${$(this).text()}</li>`);
                });
                $dropdown.appendTo($(this));
                $(this).addClass('_opened');
            }
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

    initPasswordToggler() {
        app.document.on('click', '.js-form-password', function () {
            let $input = $(this).siblings('input'), $icon = $(this).find('i');
            if ($input.length && $input.length) {
                const isPass = $input.prop('type') === 'password';
                $input.prop('type', isPass ? 'text' : 'password');
                $icon.toggleClass('icon-eye-closed', !isPass);
                $icon.toggleClass('icon-eye-opened', isPass);
            }
        });
    },

    initUploadAvatar() {
        let $cnt = $('.js-upload');
        if (!$cnt.length) {
            return;
        }

        $cnt.find('.js-upload__input').on('change', function () {
            sendForm($(this).parents('form'), $cnt);
            return false;
        });

        $cnt.find('.js-upload__remove').on('submit', function () {
            sendForm($(this), $cnt);
            return false;
        });

        function sendForm($form, $cnt) {
            let formdata = $form.attr('enctype') === 'multipart/form-data';
            //        console.log(formdata);
            $.ajax({
                type: $form.attr('method') || 'get',
                url: $form.attr('action'),
                data: formdata ? new FormData($form[0]) : $form.serialize(),
                contentType: formdata ? false : 'application/x-www-form-urlencoded; charset=UTF-8',
                processData: !formdata,
                beforeSend: function () {
                    $cnt.addClass('_loading');
                }
            }).done(function (resp) {
                if (resp.success) {
                    let $prev = $cnt.find('.js-upload__preview');
                    if ($prev.length) {
                        if (resp.thumb) {
                            // upload
                            $prev.attr('src', resp.thumb);
                            $cnt.find('.js-upload__input').val('');
                            $cnt.find('.js-upload__remove button').attr('disabled', false);
                        } else {
                            $prev.attr('src', $prev.data('default'));
                            $cnt.find('.js-upload__remove button').attr('disabled', true);
                        }
                    }
                }
                if (resp.msg) {
                    app.message[resp.success === true ? 'success' : 'error'](resp.msg);
                }
            }).always(function () {
                $cnt.removeClass('_loading');
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log([jqXHR, textStatus, errorThrown]);
                app.message.error(app.msgAjaxError);
            });
        }
    },

};

export default forms;
