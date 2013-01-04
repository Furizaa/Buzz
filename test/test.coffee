$ () ->
    console.log "READY"
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

    text = layer.addController( "Text", "Text" ).setValue( "Hi" ).onChange ( value ) ->
        console.log value

    bar = layer.addController( "Bar", "Bar" ).min( -500 ).max( 500 ).setValue(250).onChange ( value ) ->
        console.log value

    num = layer.addController( "Number", "Number" ).min( -500 ).max( 500 ).setValue(250).onChange ( value ) ->
        console.log value

    sel = layer.addController( "Select", "Select").options( ["Option 1", "Option 2"] ).onChange ( value ) ->
        console.log value

