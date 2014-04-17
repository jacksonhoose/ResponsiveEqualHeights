/*! Equalheights - v0.1.0 - 2014-04-17
* https://github.com/jacksonhoose/equalheights
* Copyright (c) 2014 Jackson Hoose; Licensed MIT */

/*! Equalheights - v0.1.0 - 2014-02-28
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

      this.options = $.extend({}, $.fn.equalHeights.options, options);
      
      this.$parent = $(el);

      this.$children = this.options.target.length > 1 ? this.$parent.find(this.options.target) : this.$parent.children();

      this.debounceEnabled = (typeof window._ === 'function' && typeof window._.debounce === 'function') ? true : false;

      this.makeEqualHeights = this.makeEqualHeights.bind(this);

      this.equalize = this.equalize.bind(this);
      
      this.start();

    },
    
    breakpointParse: {
      '>': function(size) {
        return $(window).width() > size ? true : false;
      },
      '<': function(size) {
        return $(window).width() < size ? true : false;
      },
      '>=': function(size) {
        return $(window).width() >= size ? true : false;
      },
      '<=': function(size) {
        return $(window).width() <= size ? true : false;
      }
    },

    filterTallest: function() {
      var heights = this.$children.map(function() {
        return $(this).outerHeight();
      }).get();

      return Math.max.apply(null, heights);
    },

    checkBreakpoints: function() {
      if(this.options.breakpoints.length) {
        var responses = [];
        for (var i = this.options.breakpoints.length - 1; i >= 0; i--) {
          var query = this.options.breakpoints[i].split(' ');
          if(typeof this.breakpointParse[query[0]] === 'function') {
            responses.push(this.breakpointParse[query[0]](parseInt(query[1], 10)));
          }
        }
        return $.inArray(true, responses) !== -1 ? true : false;
      }
    },

    equalize: function() {
      if(this.checkBreakpoints() === false) {
        this.destoryEqualheights();
        return;
      }
      this.makeEqualHeights();
    },

    destoryEqualheights: function() {
      this.$children.css('height', 'auto');
    },

    makeEqualHeights: function() {
      this.destoryEqualheights();
      if(this.$children.height() !== 0) {
        this.$children.css('height', this.filterTallest());
        if(this.options.afterEqualize && typeof this.options.afterEqualize === 'function') {
          this.options.afterEqualize();
        }
      }
    },

    start: function() {
      $(window).on({
        load: this.equalize,
        resize: this.debounceEnabled === true ? window._.debounce(this.equalize, this.options.debounce) : this.equalize
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
    debounce: 125,
    breakpoints: [],
    afterResize: $.noop
  };
  
}(jQuery));
