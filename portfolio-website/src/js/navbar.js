import $ from 'jquery';

var navbar = (function() {

    //cache DOM
    const $navbarCollapse = $('.js-navbar-collapse');
    const $navbarLinks = $('.js-navbar-links');
    const $navbarToggle = $('.js-navbar-toggle');

    //initialization
    let isNavHidden = true;

    //bind events
    $navbarCollapse.on('click', hideNav);
    $navbarToggle.on('click', showNav);

    //methods
    function hideNav() {
        $navbarLinks.addClass('collapsed-side');
        $navbarCollapse.css({ 'display': 'none' });
    }
    function showNav() {
        $navbarLinks.removeClass('collapsed-side');
        $navbarCollapse.css({ 'display': 'initial' });
    }

    ////cache DOM
    //const $navLinks = $('.navbar__links');
    //const $navToggle = $('.js-navbar-toggle');
    //const $navCollapse = $('.js-navbar-collapse');
    //const $window = $(window);

    ////initialze
    //let isNavHidden = true;

    ////bind events
    //$navToggle.on("click", toggleNav);
    //$navCollapse.on("click", toggleNav);
    ////$window.on("scroll", );

    ////helper methods
    //function toggleNav() {
    //    if(isNavHidden) {
    //        showNav();
    //    } else {
    //        hideNav();
    //        //$navLinks.css({"width": "0"});
    //        //$navCollapse.css({"visibility": "hidden"});
    //    }
    //    //isNavHidden = !isNavHidden;
    //}

    //function hideNav() {
    //    isNavHidden = true;
    //    $navLinks.css({"width": "0"});
    //    $navCollapse.css({"visibility": "hidden"});
    //}
    //function showNav() {
    //    $navLinks.css({"width": "250px"});
    //    $navCollapse.css({"visibility": "visible"});
    //    isNavHidden = false;
    //}


})();

module.exports = navbar;
