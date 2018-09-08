const express = require('express');
const path = require('path');
const webpack = require('webpack');
const jsonServer = require('json-server');
const config = require('./webpack.config.dev');

const compiler = webpack(config);

const app = express();

app.use(require('webpack-dev-middleware')(compiler, { noInfo: true }));
app.use(require('webpack-hot-middleware')(compiler));

app.use(jsonServer.rewriter('./data/routes.json'));
app.use('/api', jsonServer.router('./data/localdb.json'));

function sendGraphqlDataFile(req, res) {
    var query = '';
    req.on('data', data => {
        query += data;
        query = query.replace(/\\n/g, '').replace(/\\/g, '');
    });
    req.on('end', () => {
        operationName = query.substring(query.indexOf(' '), query.indexOf('{', 2)).trim();
        res.sendFile(path.join(__dirname, `../data/${operationName}.json`));
    });
}

app.post('*', function (req, res) {
    sendGraphqlDataFile(req, res);
});

app.get('**/sprites.svg', function (req, res) {
    res.sendFile(path.join(__dirname, '../node_modules/platform-common-assets/dist/sprites.svg'));
});

app.get('/platform-common-ui.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../node_modules/platform-common-ui/dist/platform-common-ui.css'));
});

app.get('/platform-common-vendor.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../node_modules/platform-common-vendor/dist/platform-common-vendor.css'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(3000, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:3000');
});
