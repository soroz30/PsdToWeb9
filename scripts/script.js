$(function() {
    const largerDevice = window.matchMedia('screen and (min-width: 768px)');
    const scroll = new SmoothScroll('a[href*="#"]');

    $('.mockup-slides').slick({
        autoplay: true,
        prevArrow: $('.phone-slides-left'),
        nextArrow: $('.phone-slides-right'),
        swipe: true
    });
    
    $('.mockup-slides').on('beforeChange', (e, slick, currentSlide, nextSlide) => {
            $('.slides-counter').text(`0${nextSlide + 1}/05`);
        }
    );
    
    $('.community-slides').slick({
        prevArrow: $('.community-arrows__left'),
        nextArrow: $('.community-arrows__right')
    });
    
    const setActiveRange = (clientWidth) => {
        const oneThirdOfWindow = window.innerHeight * 0.33;
        const footerHeight = 145;
        const downloadSectionCheck = document.body.scrollHeight - window.innerHeight - 145
        if (window.pageYOffset > downloadSectionCheck) {
            return window.innerHeight * 0.7
        } else {
            return oneThirdOfWindow 
        }
    }
    
    const showFixedNavbar = () => {
        const nav = $('nav');
        nav.removeClass().addClass('nav-general fixed-nav-visible');
        nav.css('visibility', 'visible');
        const clientWidth = document.documentElement.clientWidth;
        const ActiveRange = setActiveRange(clientWidth);
        const active = $(document.elementFromPoint(clientWidth / 2, ActiveRange))
                       .closest('article:not(.community), section:not(.subscribe), div#community')[0];
        if (active) {
            nav.find('.active').removeClass('active');
            nav.find('[href=#' + active.id + ']').addClass('active');
        }
    }
    
    const setScrollListener = () => {
        const yOffset = window.pageYOffset;
        if (yOffset < 95) {
            $('nav').removeClass().addClass('nav-general top-nav').css('visibility', 'visible');
        }
        else if (yOffset > 95 && yOffset < 500) {
            $('nav').removeClass().addClass('nav-general fixed-nav-hidden')
            setTimeout(() => {
                const stillHidden = window.pageYOffset > 95 && window.pageYOffset < 500;
                stillHidden && $('nav').css('visibility', 'hidden');
            }, 500)
        }
        else if (yOffset > 500) {
            showFixedNavbar();
        } 
    }
    
    // $(window).scroll() nie dziala
    const forceScroll = () => {
        $(window).scrollTop(window.pageYOffset - 1);
        $(window).scrollTop(window.pageYOffset + 1);
    }
    
    const topStickyNavbar = () => {
        window.addEventListener('scroll', setScrollListener);
        forceScroll();
    }
    
    const setMobileClasses = () => {
        $('nav').removeClass().addClass('nav-general burger-nav').css('visibility', 'visible');
        $('.burger-icon').removeClass('burger-open');       
    }
    
    const setMobileEvents = () => {
        $('nav a').click(() => {
            $('nav').removeClass('open');
            $('.burger-icon').removeClass('burger-open');
        });
    }
    
    $('.burger-icon').click(() => {
        $('nav').toggleClass('open');
        $('.burger-icon').toggleClass('burger-open');
    });
    
    const setBurgerNavbar = () => {
        setMobileClasses();
        window.removeEventListener('scroll', setScrollListener);
        forceScroll();
        setMobileEvents();
    }
    
    // problem przy odswiezeniu z burger menu
    largerDevice.matches && topStickyNavbar();
    !largerDevice.matches && setBurgerNavbar();
    largerDevice.addListener(mq => {
        $('nav').addClass('nav-general')
        if (mq.matches) {
            topStickyNavbar();
        } else {
            setBurgerNavbar();
        }
    });
});