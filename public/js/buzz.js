(function() {
  var Buzz,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Buzz = Buzz = (function() {

    function Buzz(droot) {
      this.droot = droot;
      this.$root = $('<div/>');
      this.$root.appendTo($(this.droot)).attr({
        id: 'buzz'
      });
      this;

    }

    Buzz.prototype.addContainer = function(desc) {
      return new Buzz.Container(this.$root, desc);
    };

    return Buzz;

  })();

  Buzz.Controller = (function() {

    function Controller(parent, $el) {
      this.parent = parent;
      this.$el = $el;
      this.$el.appendTo(parent);
      this.$el.data('controller', this);
    }

    Controller.prototype.remove = function() {
      if (this.onRemove) {
        this.onRemove.call(this);
      }
      this.$el.off();
      return this.$el.remove();
    };

    return Controller;

  })();

  Buzz.ButtonController = (function(_super) {

    __extends(ButtonController, _super);

    function ButtonController(parent, desc) {
      this.$el = $('<div class="item btn"></div>');
      this.$el.text(desc);
      ButtonController.__super__.constructor.call(this, parent, this.$el);
    }

    return ButtonController;

  })(Buzz.Controller);

  Buzz.SwitchController = (function(_super) {

    __extends(SwitchController, _super);

    function SwitchController(parent, desc) {
      var _this = this;
      this.value = false;
      this.$el = $('<div class="item switch"></div>');
      this.$el.text(desc);
      SwitchController.__super__.constructor.call(this, parent, this.$el);
      this.$el.on('click', function() {
        _this.$el.toggleClass('switch-off');
        return _this.value = !_this.value;
      });
    }

    return SwitchController;

  })(Buzz.Controller);

  Buzz.RadioController = (function(_super) {

    __extends(RadioController, _super);

    function RadioController(parent, desc) {
      var _this = this;
      this.value = false;
      this.$el = $('<div class="item radio switch-off"></div>');
      this.$el.text(desc);
      RadioController.__super__.constructor.call(this, parent, this.$el);
      this.$el.on('click', function() {
        if (_this.value === true) {
          return;
        }
        _this.$el.toggleClass('switch-off');
        _this.buffer = !_this.value;
        if (_this.buffer) {
          $.each(_this.parent.children('div.radio'), function() {
            return $(this).data('controller')._switchOff();
          });
          return _this.value = _this.buffer;
        }
      });
      this;

    }

    RadioController.prototype._switchOff = function() {
      if (this.value === false) {
        return;
      }
      this.$el.addClass('switch-off');
      return this.value = false;
    };

    return RadioController;

  })(Buzz.Controller);

  Buzz.TextController = (function(_super) {

    __extends(TextController, _super);

    function TextController(parent, desc) {
      var $text,
        _this = this;
      this.value = "";
      this.$el = $('<div class="item text"><span></span><input type="text" /></div>');
      this.$el.children('span').text(desc);
      TextController.__super__.constructor.call(this, parent, this.$el);
      $text = this.$el.children('input');
      $text.on('change', function() {
        return _this.value = $text.attr('value');
      });
    }

    return TextController;

  })(Buzz.Controller);

  Buzz.BarController = (function(_super) {

    __extends(BarController, _super);

    function BarController(parent, desc, min, max, step) {
      var $bar, $clickX, $fill, $text,
        _this = this;
      this.value = 0;
      this.$el = $('<div class="item bar"><span></span><input type="text" /><div class="bar"><div /></ div></div>');
      this.$el.children('span').text(desc);
      BarController.__super__.constructor.call(this, parent, this.$el);
      console.log($bar);
      $bar = this.$el.children('div');
      $fill = $bar.children('div');
      $text = this.$el.children('input');
      $clickX = 0;
      $bar.on('mousedown', function(event) {
        $clickX = event.screenX;
        $(window).on('mouseup', function(event) {
          return $(window).off('mouseup mousemove');
        });
        return $(window).on('mousemove', function(event) {
          var offset;
          event.preventDefault();
          offset = event.screenX - $clickX;
          $clickX = event.screenX;
          _this.value = Math.max(min, Math.min(max, _this.value + offset * step));
          $text.attr('value', _this.value);
          return $fill.css({
            width: (100 / (max - min) * (_this.value - min)) + "%"
          });
        });
      });
    }

    return BarController;

  })(Buzz.Controller);

  Buzz.Container = (function() {

    function Container($parent, desc) {
      var $el;
      this.$parent = $parent;
      this.desc = desc;
      $el = $('<div class="container"><div class="item"><h3/></div></div>');
      $el.appendTo(this.$parent);
      $el.find('h3').text(this.desc);
      this.$root = this.$parent.find('.container');
      this.$root.data('controller', this);
      this;

    }

    Container.prototype.addButton = function(desc, onClick, params) {
      var con,
        _this = this;
      if (params == null) {
        params = [];
      }
      con = new Buzz.ButtonController(this.$root, desc);
      con.$el.on('click', function() {
        return onClick.call(con, params);
      });
      return con;
    };

    Container.prototype.addSwitch = function(desc, onChange, params) {
      var con,
        _this = this;
      if (params == null) {
        params = [];
      }
      con = new Buzz.SwitchController(this.$root, desc);
      con.$el.on('click', function() {
        return onChange.call(con, params);
      });
      return con;
    };

    Container.prototype.addRadio = function(desc, onClick, params) {
      var con,
        _this = this;
      if (params == null) {
        params = [];
      }
      con = new Buzz.RadioController(this.$root, desc);
      con.$el.on('click', function() {
        return onClick.call(con, params);
      });
      return con;
    };

    Container.prototype.addText = function(desc, onChange, params) {
      var $text, con,
        _this = this;
      if (params == null) {
        params = [];
      }
      con = new Buzz.TextController(this.$root, desc);
      $text = con.$el.children('input');
      $text.on('blur', function() {
        return onChange.call(con, params);
      });
      return $text.on('keyup', function(event) {
        if (event.keyCode === 13) {
          return $text.trigger('blur');
        }
      });
    };

    Container.prototype.addBar = function(desc, min, max, step, onChange, params) {
      var con;
      if (params == null) {
        params = [];
      }
      return con = new Buzz.BarController(this.$root, desc, min, max, step);
    };

    Container.prototype.addNumber = function(desc, onChange, params) {
      if (params == null) {
        params = [];
      }
    };

    return Container;

  })();

}).call(this);
