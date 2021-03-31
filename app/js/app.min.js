$(window).on("load" , function () {

    var telInput = $("#phone"),
        errorMsg = $("#error-msg"),
        validMsg = $("#valid-msg");

// initialise plugin
    telInput.intlTelInput({

        allowExtensions: true,
        formatOnDisplay: true,
        autoFormat: true,
        autoHideDialCode: true,
        autoPlaceholder: true,
        defaultCountry: "auto",
        ipinfoToken: "yolo",

        nationalMode: false,
        numberType: "MOBILE",
        //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
        preferredCountries: ['sa', 'ae', 'qa','om','bh','kw','ma'],
        preventInvalidNumbers: true,
        separateDialCode: true,
        initialCountry: "auto",
        geoIpLookup: function(callback) {
            $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
                var countryCode = (resp && resp.country) ? resp.country : "";
                callback(countryCode);
            });
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js"
    });

    var reset = function() {
        telInput.removeClass("error");
        errorMsg.addClass("hide");
        validMsg.addClass("hide");
    };

// on blur: validate
    telInput.blur(function() {
        reset();
        if ($.trim(telInput.val())) {
            if (telInput.intlTelInput("isValidNumber")) {
                validMsg.removeClass("hide");
            } else {
                telInput.addClass("error");
                errorMsg.removeClass("hide");
            }
        }
    });

// on keyup / change flag: reset
    telInput.on("keyup change", reset);

    $('.connect-submit').on('click', () => {
        if (telInput.hasClass('error')) {
            $('.connect__phone').css({'border':'1px solid red'})
        } else if (telInput.val()) {
            let code = $('.selected-dial-code').text()
            let number = telInput.val().replace(/\s/g, '')
            let countryCode = $('.country.active').attr("data-country-code")
            console.log(telInput.val())
            console.log('Telephone number: ' + code + number)
            console.log('Country Code: ' + countryCode)
            $('.connect__phone').css({'border':'1px solid green'})
        }
        if (!telInput.val()) {
            $('.connect__phone').css({'border':'1px solid red'})
        }
    })
//storeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    let bannerChanges = $('.banner__changes')
    $('.banner_change').each(function (index) {
        $(this).on('click', () => {
            bannerChanges.not(bannerChanges.eq(index)).removeClass('open')
            bannerChanges.eq(index).toggleClass('open')
        })
    })
    $('.banner-action_item').each(function () {
        $(this).on('click', () => {
            let textItem = $(this).text()
            let dataItem = $(this).attr('data-action')
            $('.banner-action_chosen').attr('data-action', dataItem).text(textItem)
        })
    })

    $('.banner-type_item').each(function () {
        $(this).on('click', () => {
            let textItem = $(this).text()
            let dataItem = $(this).attr('data-type')
            $('.banner-type_chosen').attr('data-type', dataItem).text(textItem)
        })
    })
    $('.banner-sort_item').each(function () {
        $(this).on('click', () => {
            let textItem = $(this).text()
            let dataItem = $(this).attr('data-sort')
            $('.banner-sort_chosen').attr('data-sort', dataItem).text(textItem)
        })
    })
    $('.banner-color_item').each(function () {
        $(this).on('click', () => {
            let textItem = $(this).text()
            let dataItem = $(this).attr('data-color')
            $('.banner-color_chosen').attr('data-color', dataItem).text(textItem)
        })
    })
    let ourProduct = $('.our__product')
    let actionChosen = $('.banner-action_chosen')
    let typeChosen = $('.banner-type_chosen')
    let colorChosen = $('.banner-color_chosen')
    let bannerText = $('.banner-text')
    $('.banner__submit').on('click', (e) => {
        e.preventDefault()
        ourProduct.each(function () {
            $(this).removeClass('our__product-active')
        })
        ourProduct.each(function (index) {
            let fCount = 0
            if ($(this).attr('data-action') !== actionChosen.attr('data-action') && actionChosen.attr('data-action') !== 'none') {
                fCount = fCount + 1
            }
            if ($(this).attr('data-type') !== typeChosen.attr('data-type') && typeChosen.attr('data-type') !== 'none') {
                fCount = fCount + 1
            }
            if ($(this).attr('data-color') !== colorChosen.attr('data-color') && colorChosen.attr('data-color') !== 'none') {
                fCount = fCount + 1
            }
            if (bannerText.val() !== $('.our-name').eq(index).text() && bannerText.val() !== '') {
                fCount = fCount + 1
            }
            if (fCount > 0) {
                $(this).removeClass('our__product-active')
            } else {
                $(this).addClass('our__product-active')
            }
        })
        let arr = $('.our__product-active')
        let sortChosen = $('.banner-sort_chosen')
        if (sortChosen.attr('data-sort') === 'low-high') {
            arr.sort(function (a, b) {
                return a.dataset.price - b.dataset.price
            })
            arr.each(function () {
                $('.our__products').append($(this))
            })
        }
        if (sortChosen.attr('data-sort') === 'high-low') {
            arr.sort(function (a, b) {
                return b.dataset.price - a.dataset.price
            })
            arr.each(function () {
                $('.our__products').append($(this))
            })
        }
        if (arr.length < 1) {
            $('.our__error').css({'display':'flex'})
        } else {
            $('.our__error').css({'display':'none'})
        }
    })

    let burger = $('.header__burger')
    let headerMenu = $('.header__menu')
    const menuHeight = document.querySelector('.header__menu').scrollHeight + 'px'
    burger.on('click', () => {
        burger.toggleClass('header__burger_active')
        if (burger.hasClass('header__burger_active')) {
            headerMenu.css({'max-height':menuHeight})
        } else {
            headerMenu.css({'max-height':'0px'})
        }
    })



})
