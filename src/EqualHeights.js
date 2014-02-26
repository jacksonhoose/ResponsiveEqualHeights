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
      var self = this;

      self.options = $.extend({}, $.fn.equalHeights.options, options);
      self.userOptions = options;

      self.$parent = el;
      self.$children = self.$parent.find(options.target);

      self.debounceEnabled = (typeof _.debounce === 'function') ? true : false;

      self.start();

    },
    filterTallest: function() {
      var self = this;
      
      var heights = self.$children.map(function() {
        return $(this).outerHeight();
      }).get();

      return Math.max.apply(null, heights);
    },
    makeEqualHeights: function() {
      var self = this;
      
      self.$children.css('height', 'auto');
      self.$children.css('height', self.filterTallest());
    },
    start: function() {
      var self = this;

      $(window).on({
        load: self.resize,
        resize: self.debounceEnabled === true ? _.debounce(self.makeEqualHeights, self.options.debounce) : self.makeEqualHeights
      });

    }
  };

  $.fn.equalHeights.options = {
    debounce: 150,
    target: ''
  };

  // Collection method.
  $.fn.equalHeights = function(options) {
    return this.each(function() {
      
      if(options.target.length < 1) {
        return;
      }

      var equalHeights = Object.create(EqualHeights);
      equalHeights.init(options, this);

    });
  };
  
}(jQuery));
