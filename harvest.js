var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/original', express.static(path.join(__dirname, 'pipeline/images/original/select')));
app.use('/ndvi-hsv', express.static(path.join(__dirname, 'pipeline/images/processed-ndvi-hsv')));

app.get('/', function(req, res) {
  serveFile('index.html', res);
});

app.get('/contact', function(req, res) {
  serveFile('public/contact.html', res);
});

app.get('/dashboard', function(req, res) {
  serveFile('public/dashboard/summary.html', res);
});

app.get('/dashboard/hotspots', function(req, res) {
  serveFile('public/dashboard/hotspots.html', res);
});

app.get('/dashboard/landsat', function(req, res) {
  serveFile('public/dashboard/landsat.html', res);
});

function serveFile(path, res) {
  fs.readFile(path, function(err, data) {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': data.length
    });
    res.write(data);
    res.end();
  });
}

var server = app.listen(process.env.PORT || 5000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
