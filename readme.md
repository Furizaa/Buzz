# Buzz
Ugly Gui Library for BowShock HTML5 Game Framework. I've wrote that in like a day so the code can probably be smelled in Simbabwe and beyond. Because dat.gui was not powerfull enough.
![Screenshot](https://raw.github.com/Furizaa/Buzz/master/screen.png)

```coffeescript
buzz = new Buzz "body"

    layer = buzz.addContainer "Container"

    button = layer.addController( "Button", "Button" ).onClick ( value ) ->
        console.log "Button Pressed"

    aswitch = layer.addController( "Switch", "Switch" ).onChange ( value ) ->
        console.log "Switch Flipped", value

    radio1 = layer.addController( "Radio", "Radio 1" ).onChange ( value ) ->
        console.log "Selected Radio 1", value

    radio2 = layer.addController( "Radio", "Radio 2" ).onChange ( value ) ->
        console.log "Selected Radio 2", value

    folder = layer.addController( "Container", "FormStuff" )

    text = folder.addController( "Text", "Text" ).setValue( "Hi" ).onChange ( value ) ->
        console.log value

    bar = folder.addController( "Bar", "Bar" ).min( -500 ).max( 500 ).setValue(250).onChange ( value ) ->
        console.log value

    num = folder.addController( "Number", "Number" ).min( -500 ).max( 500 ).setValue(250).onChange ( value ) ->
        console.log value

    sel = folder.addController( "Select", "Select").options( ["Option 1", "Option 2"] ).onChange ( value ) ->
        console.log value
```