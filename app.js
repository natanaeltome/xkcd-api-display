const express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')

const app = express()
const port = 5000

// Static Files
app.use(express.static('public'))

// Templating Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

// Routes
const comicsRouter = require('./src/routes/comic')

// Storing view data temporarily
app.use(session({
    secret: 'stratus 360',
    resave: false,
    saveUninitialized: true
}))

app.use(function (req, res, next) {
    if (!req.session.views) {
        req.session.views = {}
    }

    // get the url pathname
    var pathname = parseurl(req).pathname

    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

    next()
})

app.use('/', comicsRouter)

// Listen on port 5000
app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`))