import $ from 'jquery';

var navbarScroll = (function() {

    //cache DOM
    const $navbar = $('.navbar'),
        $navBrand = $('.navbar__brand'),
        $navLinks = $('.navbar__links'),
        $navToggle = $('.navbar__toggle');
    const $subnav = $('.subnav');
    const $window = $(window);

    //init
    const navbarHeight = $navbar.outerHeight();
    const subnavHeight = $subnav.outerHeight();
    const maxHeight = $window.outerHeight() - navbarHeight;
    const initialSubnavMargin = navbarHeight;
    let previousScroll = $window.scrollTop();


    //bind events
    $window.on('scroll', toggleNavbar);
    //window.on('scrollup', showNavbar);

    function toggleNavbar() {
        //scrolling down
        if($window.scrollTop() > previousScroll) {
            $navbar.css({"height": "0"});
            $navBrand.css({"visibility": "hidden"});
            $navLinks.css({"visibility": "hidden"});
            $navToggle.css({"visibility": "hidden"});
            $subnav.css({"margin-top": "0"});
        } else { //scrolling up
            $navbar.css({"height": navbarHeight});
            $navBrand.css({"visibility": "visible"});
            $navLinks.css({"visibility": "visible"});
            $navToggle.css({"visibility": "visible"});
            $subnav.css({"margin-top": navbarHeight});
        }
        previousScroll = $window.scrollTop();

        //passed end of hero
        //if($window.scrollTop() > maxHeight) {
        //    $navbar.css({"background-color": "black"});
        //    $subnav.css({"background-color": "black"});
        //}
    }

    function hideNavbar() {
        console.log("scrolling down");
        $navbar.css({"height": "0"});
        if(window.scrollY() > maxHeight) {
            $navbar.css({"background-color": "black"});
        }
    }

    function showNavbar() {
        console.log("scrolling up");
        $navbar.css({"height": navbarHeight});
        if(window.scrollY < maxHeight) {
            $navbar.css({"background-color": "transparent"});
        }
    }

})();

module.exports = navbarScroll;
