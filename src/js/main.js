$(document).ready(function() {
  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);
  var easingSwing = [0.02, 0.01, 0.47, 1]; // default jQuery easing for anime.js
  var lastClickEl;

  ////////////
  // READY - triggered when PJAX DONE
  ////////////

  // single time initialization
  _window.on("resize", debounce(setBreakpoint, 200));

  function pageReady() {
    initSlider();
    initSelectric();
  }

  // this is a master function which should have all functionality
  pageReady();

  //////////
  // COMMON
  //////////

  // Prevent # behavior
  _document.on("click", '[href="#"]', function(e) {
    e.preventDefault();
  });

  // HAMBURGER TOGGLER
  _document.on("click", "[js-hamburger]", function() {
    $(this).toggleClass("is-active");
    $(this)
      .parent()
      .toggleClass("is-active");
  });

  // MAP TOGGLER OPEN/CLOSE

  _document.on("click", "[js-map-button]", function() {
    $(".map").toggleClass("closed");
  });

  var menuItems = [].slice.call(document.querySelectorAll(".nav__item"));
  var timer = 0;
  menuItems.forEach(function(menuItem) {
    menuItem.addEventListener("mouseover", function(e) {
      [].slice
        .call(document.querySelectorAll(".nav__item--hover"))
        .forEach(function(item) {
          item.classList.remove("nav__item--hover");
        });
      clearTimeout(timer);
      if (menuItem.classList.contains("nav-dropdown") != -1) {
        menuItem.classList.add("nav__item--hover");
      }
    });
    menuItem.addEventListener("mouseout", function(e) {
      timer = setTimeout(function() {
        menuItem.classList.remove("nav__item--hover");
      }, 500);
    });
  });
  var domVerticalMenuButton = document.querySelector(".header__button");
  var domWrpMenu = document.querySelector(".header__block-wrp");
  var domVerticalMenuOverlay = document.querySelector(".v-nav-overlay");
  var domVerticalMenu = document.querySelector(".v-nav");
  domVerticalMenuButton.addEventListener("click", function(e) {
    domVerticalMenuButton.classList.toggle("header__button--open");
    domVerticalMenuOverlay.classList.toggle("v-nav-overlay--visible");
    domVerticalMenu.classList.toggle("v-nav--visible");
    $(".header").toggleClass("is-fixed");
    domWrpMenu.classList.toggle("header__block-wrp--close-menu");
  });
  domVerticalMenuOverlay.addEventListener("click", function(e) {
    if (e.target == domVerticalMenuOverlay) {
      domVerticalMenuButton.classList.toggle("header__button--open");
      domVerticalMenuOverlay.classList.toggle("v-nav-overlay--visible");
      domVerticalMenu.classList.toggle("v-nav--visible");
      domWrpMenu.classList.toggle("header__block-wrp--close-menu");
    }
  });

  ////////////////////
  // SHOW PASSWORD TOGGLE
  ////////////////////

  ////////////////////
  // SLIDERS
  ////////////////////

  function initSlider() {
    $("[js-slider]").slick({
      dots: false,
      arrows: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: false,
      pauseOnFocus: false,
      centerMode: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      speed: 500,
      responsive: [
        {
          breakpoint: 1068,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 788,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            centerMode: false
          }
        }
      ]
      // fade: true,
      // cssEase: "linear"
    });

    $("[js-slider-team]").slick({
      dots: false,
      arrows: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      pauseOnFocus: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500,
      fade: true,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 788,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            autoplay: false,
            arrows: false,
            fade: false
          }
        }
      ]
      // fade: true,
      // cssEase: "linear"
    });
  }

  function personalInfoSliderInit() {
    if ($(document).width() > 768) {
      if ($("[js-mobile-slider]").hasClass("slick-initialized"))
        $("[js-mobile-slider]").slick("unslick");
    } else {
      if (!$("[js-mobile-slider]").hasClass("slick-initialized")) {
        $("[js-mobile-slider]").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true
        });
      }
    }
  }

  personalInfoSliderInit();

  $(window).resize(function() {
    personalInfoSliderInit();
  });

  // selectric
  function initSelectric() {
    $("select").selectric({
      maxHeight: 300,
      disableOnMobile: false,
      nativeOnMobile: false
    });
  }

  $(function() {
    var clicked_footer_menu = Array();
    $(".footer__link.footer__link--open-text").on("click", function() {
      var block_text = $(this).siblings();
      //console.log($(block_text).css('max-height'));
      if ($(block_text).css("max-height") == "300px") {
        $(block_text).removeAttr("style");
        $(block_text).css("max-height", "auto");
        $(this).html("Скрыть");
      } else {
        $(block_text).removeAttr("style");
        $(block_text).css("max-height", "300px");
        $(this).html("Показать еще");
      }
    });
  });

  //////////
  // DEVELOPMENT HELPER
  //////////
  function setBreakpoint() {
    var wHost = window.location.host.toLowerCase();
    var displayCondition =
      wHost.indexOf("localhost") >= 0 || wHost.indexOf("surge") >= 0;
    if (displayCondition) {
      var wWidth = _window.width();

      var content = "<div class='dev-bp-debug'>" + wWidth + "</div>";

      $(".page").append(content);
      setTimeout(function() {
        $(".dev-bp-debug").fadeOut();
      }, 1000);
      setTimeout(function() {
        $(".dev-bp-debug").remove();
      }, 1500);
    }
  }
});
