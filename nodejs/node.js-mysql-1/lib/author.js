const db = require('./db.js');
const url = require('url');
const template = require('./template.js');
const qs = require('querystring');

exports.home = function(request, response){
    db.query(`SELECT * FROM topic`, function(error,topics){
        if (error){ throw error; }
        db.query(`SELECT * FROM author`, function(error2,authors){
            if (error2){ throw error2; }
            var title = 'author';
            var list = template.list(topics);
            var html = template.HTML(title, list,
            `${template.authorTable(authors)}
            <style>
                table{
                    border-collapse: collapse;
                }
                td{
                    border:1px solid black;
                }
            </style>
            <form action="/author/create_process" method="post">
                <p>
                    <input type="text" name="name" placeholder="name">
                </p>
                <p>
                    <textarea name="profile" placeholder="description"></textarea>
                </p>
                <p>
                    <input type="submit" value="Create">
                </p>
            </form>`,
            ``
            );
            response.writeHead(200);
            response.end(html);
        });
    });
};

exports.create_process = (request, response) => {
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        db.query(
          `INSERT INTO author (name, profile)
            VALUES(?, ?);`,
          [post.name, post.profile], (err, result) => {
          if (err){ throw err; }
          response.writeHead(302, {Location: `/author`});
          response.end();
        });
    });
};

exports.update = (request, response) => {
    var parsedUrl = url.parse(request.url, true);
    var queryData = parsedUrl.query;
    db.query(`SELECT * FROM topic`, function(error,topics){
        if (error){ throw error; }
        db.query(`SELECT * FROM author`, function(error2,authors){
            if (error2){ throw error2; }
            db.query(`SELECT * FROM author WHERE id=?`, [queryData.id], (error3, author) => {
                var title = 'author';
                var list = template.list(topics);
                var html = template.HTML(title, list,
                `${template.authorTable(authors)}
                <style>
                    table{
                        border-collapse: collapse;
                    }
                    td{
                        border:1px solid black;
                    }
                </style>
                <form action="/author/update_process" method="post">
                    <input type="hidden" name="id" value="${queryData.id}">
                    <p>
                        <input type="text" name="name" placeholder="name" value="${author[0].name}">
                    </p>
                    <p>
                        <textarea name="profile" placeholder="description">${author[0].profile}</textarea>
                    </p>
                    <p>
                        <input type="submit" value="Update">
                    </p>
                </form>`,
                ``
                );
                response.writeHead(200);
                response.end(html);
            });
        });
    });
};

exports.update_process = (request, response) => {
    var body = '';
    request.on('data', function(data){
      body = body + data;
    });
    request.on('end', function(){
      var post = qs.parse(body);
      db.query(
        `UPDATE author SET name=?, profile=? WHERE id=?;`,
        [post.name, post.profile, post.id], (err, result) => {
        if (err){ throw err; }
        response.writeHead(302, {Location: `/author`});
        response.end();
      });
    });
};

exports.delete_process = (request, response) => {
    var body = '';
    request.on('data', function(data){
      body = body + data;
    });
    request.on('end', function(){
      var post = qs.parse(body);
      db.query(`DELETE FROM topic WHERE author_id=?`, [post.id], (err0, result0) => {
        if (err0){ throw err0; }
        db.query(
            `DELETE FROM author WHERE id=?;`,
            [post.id], (err, result) => {
            if (err){ throw err; }
            response.writeHead(302, {Location: `/author`});
            response.end();
        });
      });
    });
};
