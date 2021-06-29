const http = require('http');
const url = require('url');
// const qs = require('querystring');
const template = require('./lib/template.js');
// const path = require('path');
// const sanitizeHtml = require('sanitize-html');
const db = require('./lib/db.js');
const topic = require('./lib/topic.js');
const author = require('./lib/author.js');

var app = http.createServer(function(request,response){
    var parsedUrl = url.parse(request.url, true);
    var queryData = parsedUrl.query;
    var pathname = parsedUrl.pathname;
    if (pathname === '/'){
      if (queryData.id === undefined){
        topic.home(request, response);
      } else {
        topic.page(request, response);
      }
    } else if (pathname === '/create'){
      topic.create(request, response);
    } else if (pathname === '/create_process'){
      topic.create_process(request, response);
    } else if (pathname === '/update'){
      topic.update(request, response);
    } else if (pathname === '/update_process'){
      topic.update_process(request, response);
    } else if (pathname === '/delete_process'){
      topic.delete_process(request, response);
    } else if (pathname === '/author'){
      author.home(request, response);
    } else if (pathname === '/author/create_process'){
      author.create_process(request, response);
    } else if (pathname === '/author/update'){
      author.update(request, response);
    } else if (pathname === '/author/update_process'){
      author.update_process(request, response);
    } else if (pathname === '/author/delete_process'){
      author.delete_process(request, response);
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
