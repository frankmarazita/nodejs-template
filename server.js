require('dotenv').config({ path: __dirname + '/vars.env' });

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const handlebars_express = require('express-handlebars');

// Initialise Express

const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET,
    key: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        // domain: 'example.com'
    }
}));
// const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(express.static('public'));
const port = parseInt(process.env.PORT);

// Initialise Handlebars

const handlebars = handlebars_express.create({
    // defaultLayout: 'default',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    extname: 'hbs',
    helpers: require('./handlers/handlebars_helpers.js')
});

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine);

// Routes
require('./routes/home')(app, urlencodedParser);
// Add additional routes here...

const error = require('./controllers/error');

// Default Route
app.use(function (req, res) {
    error.render(req, res, 404);
});

app.listen(port, () => console.log(`App listening to port ${port}`));