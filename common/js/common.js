/* ===================================================================
 common.js
======================================================================*/
(function(window, undefined) {

  var app = {
    global: {},
    fn: {},
    ui: {},
    utils: {},
    views: {}
  };
  window.App = app;

})(window);
(function(app, window, decument, undefined) {

/*----------------------------------------------------------
 global
------------------------------------------------------------*/
  app.global = {

    breakpoint: 767 // ブレイクポイント

  };

/*----------------------------------------------------------
 fn
------------------------------------------------------------*/
  app.fn = {

    /**
     * スマホ判定
     */
    isMediaSp: function() {
      return ($(window).width() > app.global.breakpoint) ? false : true;
    }

  };

/*----------------------------------------------------------
 ui
------------------------------------------------------------*/
  app.ui = {

  };

/*----------------------------------------------------------
 utils
------------------------------------------------------------*/
  app.utils = {

  };

/*----------------------------------------------------------
 views
------------------------------------------------------------*/

  /**
   * モーダル
   */
  app.views.ModalView = (function() {
    var constructor = function() {
      this.$el = {};
      this.$main = {};
      this.$triggerClose = {};
      this.$triggerOpen = {};
      this.$page = {};
      this.offsetTopOpened = 0;
      return this;
    };
    var proto = constructor.prototype;
    proto.init = function(args) {
      this.setEl(args.el);
      this.setStyle();
      this.setEvents();
      return this;
    };
    proto.setEl = function(el) {
      this.$el = $(el);
      this.$main = this.$el.find('.m_modal-window');
      this.$triggerClose = this.$el.find('.m_modal__btnClose');
      this.$triggerOpen = $('a[href="#' + this.$el.attr('id') + '"]');
      this.$page = $('#PageView');
      return this;
    };
    proto.setStyle = function() {
      this.$el.hide();
      return this;
    };
    proto.setEvents = function() {
      var that = this;
      this.$triggerOpen.on('click', function(e) {
        e.preventDefault();
        that.openModal();
      });
      this.$triggerClose.on('click', function() {
        that.closeModal();
      });
      this.$el.on('click', function() {
        that.closeModal();
      });
      this.$main.on('click', function(e) {
        e.stopPropagation();
      });
      return this;
    };
    proto.openModal = function() {
      this.offsetTopOpened = $(window).scrollTop();
      this.$page.css({
        position: 'fixed',
        top: -this.offsetTopOpened,
        width: '100%'
      });
      this.$el.fadeIn();
      return this;
    };
    proto.closeModal = function() {
      this.$page.css({
        position: 'static',
        top: 'auto',
        width: 'auto'
      });
      $(window).scrollTop(this.offsetTopOpened);
      this.$el.fadeOut();
      return this;
    };
    return constructor;
  })();

})(App, window, document);
/*----------------------------------------------------------
 共通処理
------------------------------------------------------------*/
$(function() {

  /**
   * 初期処理
   */
  var pageInit = function() {

    /* スムーススクロール */
    smoothScroll();

    /* ページトップボタン */
    var btnPagetop = new triggerPagetop();
    btnPagetop.init({ el: '.js_btnPagetop' });

    /* モーダル */
    if($('.js_modal').length > 0) {
      $('.js_modal').each(function() {
        if($(this).attr('id') !== '') {
          var modalView = new App.views.ModalView();
          modalView.init({ el: this });
        }
      });
    }

  };

  /**
   * スムーススクロール
   */
  var smoothScroll = function() {
    var $el = $('a[href^="#"]');
    var init = function() {
      setEvents();
      return this;
    };
    var setEvents = function() {
      $el.on('click', function(e) {
        e.preventDefault();
        animateScroll($(this).attr('href'));
      });
      return this;
    };
    var animateScroll = function(href) {
      var $target = $(href === '#' || href === '' ? 'html' : href);
      if($target.length > 0) {
        var position = $target.offset().top;
        $('html, body').animate({
          scrollTop: position
        }, 500, 'swing');
      }
    };
    init();
  };

  /**
   * ページトップボタン
   */
  var triggerPagetop = function() {
    var $el = {};
    var init = function(args) {
      setEl(args.el);
      setStyle();
      setEvents();
      return this;
    };
    var setEl = function(el) {
      $el = $(el);
      return this;
    };
    var setStyle = function() {
      $el.hide();
      return this;
    };
    var setEvents = function() {
      $(window).on('scroll', function() {
        animateToggle($(window).scrollTop());
      });
      return this;
    };
    var animateToggle = function(scrollTop) {
      if(scrollTop > $(window).outerHeight()) {
        $el.fadeIn();
      } else {
        $el.fadeOut();
      }
    };
    return { init: init };
  };

  /* 初期処理 */
  pageInit();

});