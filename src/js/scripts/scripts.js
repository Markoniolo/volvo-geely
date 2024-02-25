$(() => {
    svg4everybody()

    $('.about__slider').slick({
        infinite: false,
        variableWidth: true,
        slidesToShow: 2,
        prevArrow: $('.about__nav-btn_left'),
        nextArrow: $('.about__nav-btn_right'),
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                },
            },
        ]
    })

    $('.reviews__slider').slick({
        infinite: false,
        variableWidth: true,
        prevArrow: $('.reviews__nav-btn_left'),
        nextArrow: $('.reviews__nav-btn_right'),
    })

    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });
})
