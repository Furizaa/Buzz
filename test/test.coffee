$ () ->
    console.log "READY"
    buzz = new Buzz "body"

    layer = buzz.addContainer "Layer"

    button = layer.addButton "Button", ->
        console.log "Button Pressed"
        @.remove()

    aswitch = layer.addSwitch "Switch", ->
        console.log "Switch Flipped", @value

    radio1 = layer.addRadio "Radio 1", ->
        console.log "Selected Radio 1", @value

    radio2 = layer.addRadio "Radio 2", ->
        console.log "Selected Radio 2", @value

    text = layer.addText "Text", ->
        console.log @value

    number = layer.addNumber "Number", ->
        console.log @value

    bar = layer.addBar "Bar", -500, 500, 1, ->