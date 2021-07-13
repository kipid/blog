const express = require('express');
const app = express();
const fs = require('fs');
// const qs = require('querystring');
// const template = require('./lib/template.js');
// const path = require('path');
const compression = require('compression');
const helmet = require('helmet')
// const sanitizeHtml = require('sanitize-html');
const indexRouter = require('./routes/index');
const topicRouter = require('./routes/topic');

app.use(helmet());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});

app.use('/', indexRouter);
app.use('/topic', topicRouter);

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
