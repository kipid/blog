const express = require('express');
const router = express.Router();
const db = require('../lib/db.js');
const url = require('url');
const template = require('../lib/template.js');
const qs = require('querystring');

router.get("/", function(request, response){
  var title = 'author';
  var list = template.list(request.topics);
  var html = template.HTML(title, list,
  `${template.authorTable(request.authors)}
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
  ``,
  template.statusUI(request, response)
  );
  response.send(html);
});

router.post("/create_process", (request, response) => {
  var post = request.body;
  db.query(
    `INSERT INTO author (name, profile)
      VALUES(?, ?);`,
    [post.name, post.profile], (err, result) => {
    if (err){ throw err; }
    response.redirect(`/author`);
  });
});

router.get("/update/:topicId", (request, response) => {
  var parsedUrl = url.parse(request.url, true);
  var id = request.params.topicId;
  db.query(`SELECT * FROM author WHERE id=?`, [id], (error3, author) => {
    var title = 'author';
    var list = template.list(request.topics);
    var html = template.HTML(title, list,
    `${template.authorTable(request.authors)}
    <style>
        table{
            border-collapse: collapse;
        }
        td{
            border:1px solid black;
        }
    </style>
    <form action="/author/update_process" method="post">
        <input type="hidden" name="id" value="${id}">
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
    ``,
    template.statusUI(request, response)
    );
    response.send(html);
  });
});

router.post("/update_process", (request, response) => {
  var post = request.body;
  db.query(
    `UPDATE author SET name=?, profile=? WHERE id=?;`,
    [post.name, post.profile, post.id], (err, result) => {
    if (err){ throw err; }
    response.writeHead(302, {Location: `/author`});
    response.end();
  });
});

router.post("/delete_process", (request, response) => {
  var post = request.body;
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

module.exports = router;