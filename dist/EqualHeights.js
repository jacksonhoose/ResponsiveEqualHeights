/*! Equalheights - v0.1.0 - 2014-02-26
* https://github.com/jacksonhoose/equalheights
* Copyright (c) 2014 Jackson Hoose; Licensed MIT */
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

      self.$parent = $(el);
      self.$children = self.$parent.find(self.options.target);

      self.debounceEnabled = (typeof _ === 'function' && typeof _.debounce === 'function') ? true : false;

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
      var equalHeightsFunction = function() {
        self.makeEqualHeights();
      };

      $(window).on({
        load: equalHeightsFunction,
        resize: self.debounceEnabled === true ? _.debounce(equalHeightsFunction, self.options.debounce) : equalHeightsFunction
      });

    }
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

  $.fn.equalHeights.options = {
    debounce: 150,
    target: ''
  };
  
}(jQuery));