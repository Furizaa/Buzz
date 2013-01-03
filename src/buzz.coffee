window.Buzz = class Buzz

    constructor: ( @droot ) ->
        @$root = $ '<div/>'
        @$root.appendTo( $ @droot ).attr id: 'buzz'
        @

    addContainer: ( desc ) ->
        new Buzz.Container @$root, desc


class Buzz.Controller

    constructor: ( @parent, @$el ) ->
        @$el.appendTo parent
        @$el.data 'controller', @

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
        @value = false
        @$el = $ '<div class="item switch"></div>'
        @$el.text desc
        super parent, @$el
        @$el.on 'click', =>
            @$el.toggleClass 'switch-off'
            @value = not @value

class Buzz.RadioController extends Buzz.Controller

    constructor: ( parent, desc ) ->
        @value = false
        @$el = $ '<div class="item radio switch-off"></div>'
        @$el.text desc
        super parent, @$el
        @$el.on 'click', =>
            if @value is true then return
            @$el.toggleClass 'switch-off'
            @buffer = not @value
            if @buffer
                $.each @parent.children('div.radio'), -> $( @ ).data('controller')._switchOff()
                @value = @buffer
        @

    _switchOff: () ->
        if @value is false then return
        @$el.addClass 'switch-off'
        @value = false

class Buzz.TextController extends Buzz.Controller

    constructor: ( parent, desc ) ->
        @value = ""
        @$el = $ '<div class="item text"><span></span><input type="text" /></div>'
        @$el.children('span').text desc
        super parent, @$el
        $text = @$el.children( 'input' )
        $text.on 'change', =>
            @value = $text.attr('value')

#class Buzz.NumberController extends Buzz.TextController

class Buzz.BarController extends Buzz.Controller

    constructor: ( parent, desc, min, max, step ) ->
        @value = 0
        @$el   = $ '<div class="item bar"><span></span><input type="text" /><div class="bar"><div /></ div></div>'
        @$el.children('span').text desc
        super parent, @$el
        console.log $bar
        $bar    = @$el.children('div')
        $fill   = $bar.children('div')
        $text   = @$el.children('input')
        $clickX = 0
        $bar.on 'mousedown', (event) =>
            $clickX = event.screenX
            $(window).on 'mouseup', (event) =>
                $(window).off 'mouseup mousemove'
            $(window).on 'mousemove', (event) =>
                event.preventDefault()
                offset  = event.screenX - $clickX
                $clickX = event.screenX
                @value  = Math.max( min, Math.min( max, @value + offset * step ) )
                $text.attr 'value', @value
                $fill.css width: ((100 / (max-min) * (@value-min)) + "%")



class Buzz.Container

    constructor: ( @$parent, @desc ) ->
        $el = $ '<div class="container"><div class="item"><h3/></div></div>'
        $el.appendTo @$parent
        $el.find( 'h3' ).text @desc
        @$root = @$parent.find( '.container' )
        @$root.data 'controller', @
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

    addRadio: ( desc, onClick, params = [] ) ->
        con = new Buzz.RadioController @$root, desc
        con.$el.on 'click', =>
            onClick.call( con, params )
        con

    addText: ( desc, onChange, params = [] ) ->
        con = new Buzz.TextController @$root, desc
        $text = con.$el.children( 'input' )
        $text.on 'blur', =>
            onChange.call( con, params )
        $text.on 'keyup', (event) =>
            if event.keyCode == 13 then $text.trigger('blur')

    addBar: ( desc, min, max, step, onChange, params = [] ) ->
        con = new Buzz.BarController @$root, desc, min, max, step

    addNumber: ( desc, onChange, params = [] ) ->
        #@addText( desc, onChange, params = [] )




