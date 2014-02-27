/*
 * EqualHeights
 * https://github.com/jacksonhoose/equalheights
 *
 * Copyright (c) 2014 Jackson Hoose
 * Licensed under the MIT license.
 */

if (typeof Object.create !== 'function') {
  Object.create = function (obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}

(function($) {

  var EqualHeights = {
    init: function(options, el) {

      this.options = $.extend({}, $.fn.equalHeights.options, options);
      
      this.userOptions = options;

      this.$parent = $(el);

      this.$children = this.options.target.length > 1 ? this.$parent.find(this.options.target) : this.$parent.children();

      this.debounceEnabled = (typeof _ === 'function' && typeof _.debounce === 'function') ? true : false;

      this.makeEqualHeights = this.makeEqualHeights.bind(this);

      this.start();

    },
    filterTallest: function() {
      var heights = this.$children.map(function() {
        return $(this).outerHeight();
      }).get();

      return Math.max.apply(null, heights);
    },
    makeEqualHeights: function() {
      this.$children.css('height', 'auto');
      this.$children.css('height', this.filterTallest());
    },
    start: function() {
      $(window).on({
        load: this.makeEqualHeights,
        resize: this.debounceEnabled === true ? _.debounce(this.makeEqualHeights, this.options.debounce) : this.makeEqualHeights
      });

    }
  };

  // Collection method.
  $.fn.equalHeights = function(options) {
    return this.each(function() {
      var equalHeights = Object.create(EqualHeights);
     
      equalHeights.init(options, this);

    });
  };

  $.fn.equalHeights.options = {
    debounce: 150,
    target: ''
  };
  
}(jQuery));