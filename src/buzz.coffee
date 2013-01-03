window.Buzz = class Buzz

	constructor: ( @droot ) ->
		@$root = $ '<div/>'
		@$root.appendTo( $ @droot ).attr id: 'buzz'
		@

	addContainer: ( desc ) ->
		new Buzz.Container @$root, desc


class Buzz.Controller

	constructor: ( parent, @$el ) ->
		@$el.appendTo parent

	remove: () ->
		@onRemove.call @ if @onRemove
		@$el.off()
		@$el.remove()

class Buzz.ButtonController extends Buzz.Controller

	constructor: ( parent, desc ) ->
		@$el = $ '<div class="item btn"></div>'
		@$el.text desc
		super parent, @$el

class Buzz.SwitchController extends Buzz.Controller

	constructor: ( parent, desc ) ->
		@on = false
		@$el = $ '<div class="item switch switch-off"></div>'
		@$el.text desc
		super parent, @$el
		@$el.on 'click', =>
			@$el.toggleClass 'switch-off'
			@on = not @on

class Buzz.Container

	constructor: ( @$parent, @desc ) ->
		$el = $ '<div class="container"><div class="item"><h3/></div></div>'
		$el.appendTo @$parent
		$el.find( 'h3' ).text @desc
		@$root = @$parent.find( '.container' )
		@

	addButton: ( desc, onClick, params = [] ) ->
		con = new Buzz.ButtonController @$root, desc
		con.$el.on 'click', =>
			onClick.call( con, params )
		con

	addSwitch: ( desc, onChange, params = [] ) ->
		con = new Buzz.SwitchController @$root, desc
		con.$el.on 'click', =>
			onChange.call( con, params )
		con


