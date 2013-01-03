(function() {

  $(function() {
    var aswitch, button, buzz, layer;
    console.log("READY");
    buzz = new Buzz("body");
    layer = buzz.addContainer("Layer");
    button = layer.addButton("Button", function() {
      console.log("Button Pressed");
      return this.remove();
    });
    return aswitch = layer.addSwitch("Switch", function() {
      return console.log("Switch Flipped", this.on);
    });
  });

}).call(this);
