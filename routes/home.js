module.exports = function (app, urlencodedParser, db) {

    app.get('/', async (req, res) => {
        res.render('index', { layout: 'home', title: 'Home' });
    });

}