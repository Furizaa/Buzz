(function() {

  $(function() {
    var aswitch, bar, button, buzz, layer, number, radio1, radio2, text;
    console.log("READY");
    buzz = new Buzz("body");
    layer = buzz.addContainer("Layer");
    button = layer.addButton("Button", function() {
      console.log("Button Pressed");
      return this.remove();
    });
    aswitch = layer.addSwitch("Switch", function() {
      return console.log("Switch Flipped", this.value);
    });
    radio1 = layer.addRadio("Radio 1", function() {
      return console.log("Selected Radio 1", this.value);
    });
    radio2 = layer.addRadio("Radio 2", function() {
      return console.log("Selected Radio 2", this.value);
    });
    text = layer.addText("Text", function() {
      return console.log(this.value);
    });
    number = layer.addNumber("Number", function() {
      return console.log(this.value);
    });
    return bar = layer.addBar("Bar", -500, 500, 1, function() {});
  });

}).call(this);
