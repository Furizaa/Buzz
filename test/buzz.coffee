$ () ->
	console.log "READY" 
	buzz = new Buzz "body"

	layer = buzz.addContainer "Layer"
	
	button = layer.addButton "Button", ->
		console.log "Button Pressed"
		@.remove()

	aswitch = layer.addSwitch "Switch", ->
		console.log "Switch Flipped", @on
