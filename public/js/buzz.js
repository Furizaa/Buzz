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
      this.$el = $el;
      this.$el.appendTo(parent);
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
      this.on = false;
      this.$el = $('<div class="item switch switch-off"></div>');
      this.$el.text(desc);
      SwitchController.__super__.constructor.call(this, parent, this.$el);
      this.$el.on('click', function() {
        _this.$el.toggleClass('switch-off');
        return _this.on = !_this.on;
      });
    }

    return SwitchController;

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

    return Container;

  })();

}).call(this);
