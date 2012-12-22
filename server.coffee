# Author: Andreas Hoffmann <furizaa@gmail.com>

http    = require 'http'
express = require 'express'
app     = express()

app.configure () ->
    app.use express.static __dirname + '/public'
    app.set 'views', __dirname + '/views'
    app.set 'view engine', 'jade'

app.get '*', (req, res) ->
    res.render 'index'

port = process.env.PORT || 3000
http.createServer(app).listen(port)

console.log 'And the monkeys are listening on ' + port
