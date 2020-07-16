const express = require('express');
const nunjucks = require('nunjucks');

var app = express();

nunjucks.configure('.', {
    autoescape: true,
    express: app
});

app.get('/*', function(req, res) {
    res.render('index.html');
});

app.listen(3000);