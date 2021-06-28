const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const {template, templateList} = require('./lib/template.js');

var app = http.createServer((request,response) => {
    var _url = request.url;
    var parsedUrl = url.parse(_url, true);
    var queryData = parsedUrl.query;
    var pathname = parsedUrl.pathname;
    var title = queryData.id;
    var description = '';
    if (pathname === '/'){
      fs.readdir("./data/", (err, filelist) => {
        if (err){ throw err; }
        var lis = templateList(filelist);
        if (title){
          var filteredTitle = path.parse(title).base;
          fs.readFile(`./data/${filteredTitle}`, `utf8`, (err, description) => {
            response.writeHead(200);
            response.end(template(sanitizeHtml(filteredTitle), lis, sanitizeHtml(description, {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
                allowedAttributes: {img:['src', 'width']}
              }), `<a href="/update?id=${filteredTitle}">Update</a>
              <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${filteredTitle}">
                <input type="submit" value="delete">
              </form>`));
          });
        } else {
          title = 'Welcome';
          description = `The World Wide Web (abbreviated WWW or the Web) is an information space where documents and other web resources are identified by Uniform Resource Locators (URLs), interlinked by hypertext links, and can be accessed via the Internet.[1] English scientist Tim Berners-Lee invented the World Wide Web in 1989. He wrote the first web browser computer program in 1990 while employed at CERN in Switzerland.[2][3] The Web browser was released outside of CERN in 1991, first to other research institutions starting in January 1991 and to the general public on the Internet in August 1991.`;
          response.writeHead(200);
          response.end(template(title, lis, description, ``));
        }
      });
    } else if (pathname === '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    } else if (pathname.substring(0,5) === '/img/'){
      response.writeHead(200);
      response.end(fs.readFileSync(`.${pathname}`));
    } else if (pathname === '/create'){
      title = `Create`;
      description = `<form action="/process_create" method="post">
  <p><input type="text" name="title" placeholder="title"></p>
  <p><textarea name="description" placeholder="description"></textarea></p>
  <p><input type="submit"></p>
</form>`;
      fs.readdir("./data/", (err, filelist) => {
        if (err){ throw err; }
        var lis = templateList(filelist);
        response.writeHead(200);
        response.end(template(title, lis, description, ``));
      });
    } else if (pathname === '/process_create'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var filteredTitle = path.parse(title).base;
        var description = post.description;
        fs.writeFile(`./data/${filteredTitle}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${encodeURI(filteredTitle)}`});
          response.end();
        });
      });
    } else if (pathname === '/update'){
      fs.readdir("./data/", (err, filelist) => {
        if (err){ throw err; }
        var lis = templateList(filelist);
        if (title){
          var filteredTitle = path.parse(title).base;
          fs.readFile(`./data/${filteredTitle}`, `utf8`, (err, description) => {
            response.writeHead(200);
            response.end(template(filteredTitle, lis, `<form action="/update_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p><textarea name="description" placeholder="description">${description}</textarea></p>
              <p><input type="submit"></p>
            </form>`, `<a href="/update?id=${title}">Update</a>`));
          });
        }
      });
    } else if (pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var filteredId = path.parse(id).base;
        var title = post.title;
        var filteredTitle = path.parse(title).base;
        var description = post.description;
        fs.rename(`data/${filteredId}`, `data/${filteredTitle}`, function(error){
          fs.writeFile(`data/${filteredTitle}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${encodeURI(filteredTitle)}`}); 
            response.end();
          })
        });
      });
    } else if (pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          var filteredId = path.parse(id).base;
          fs.unlink(`data/${filteredId}`, function(error){
            response.writeHead(302, {Location: `/`});
            response.end();
          })
      });
    } else {
      response.writeHead(404);
      response.end("Not found");
    }
});
app.listen(3000);
