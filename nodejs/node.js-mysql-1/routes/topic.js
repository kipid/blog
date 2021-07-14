const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');
const db = require('../lib/db.js');
const url = require('url');
const sanitizeHtml = require('sanitize-html');
const qs = require('querystring');

router.get('/create', (request, response) => {
  var title = 'WEB - Create';
  var description = `<form action="/topic/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p><textarea name="description" placeholder="description"></textarea></p>
      <p>${template.authorSelect(request.authors, 1)}</p>
      <p><input type="submit"></p>
    </form>`;
  var list = template.list(request.topics);
  var html = template.HTML(title, list,
    `<h2>${title}</h2>${description}`,
    ``, template.statusUI(request, response)
  );
  response.send(html);
});

router.post("/create_process", (request, response) => {
  var post = request.body;
  db.query(
    `INSERT INTO topic (title, description, created, author_id)
      VALUES(?, ?, NOW(), ?)`,
    [post.title, post.description, post.author], (err, result) => {
    if (err){ throw err; }
    response.redirect(`/topic/${result.insertId}`);
  });
});

router.get("/update/:topicId", (request, response) => {
  var parsedUrl = url.parse(request.url, true);
  var id = request.params.topicId;
  var title = 'WEB - Update';
  if (id){
    db.query(`SELECT * FROM topic WHERE id=?;`, [id], (err, topic) => {
      if (err){ throw err; }
      var description = `<form action="/topic/update_process" method="post">
          <input type="hidden" name="id" value="${id}">
          <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
          <p><textarea name="description" placeholder="description">${topic[0].description}</textarea></p>
          <p>${template.authorSelect(request.authors, topic[0].author_id)}</p>
          <p><input type="submit"></p>
        </form>`;
      var list = template.list(request.topics);
      var html = template.HTML(title, list,
        `<h2>${title}</h2>${description}`,
        `<a href="/topic/create">Create</a> <a href="/topic/update/${id}">Update</a>`,
        template.statusUI(request, response)
      );
      response.send(html);
    });
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});

router.post("/update_process", (request, response) => {
  var post = request.body;
  db.query('UPDATE topic SET title=?, description=?, author_id=? WHERE id=?',
    [post.title, post.description, post.author, post.id],
    (err, result) => {
      if (err){ throw err; }
      response.redirect(`/topic/${post.id}`);
  });
});

router.post("/delete_process", (request, response) => {
  var post = request.body;
  db.query(`DELETE FROM topic WHERE id=?;`, [post.id], (err, result) => {
    if (err){ throw err; }
    response.redirect('/');
  });
});

router.get("/:topicId", (request, response) => {
	var parsedUrl = url.parse(request.url, true);
  var id = request.params.topicId;
  db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?;`, [id], (err, topic) => {
    if (err){ throw err; }
    var title = sanitizeHtml(topic[0].title);
    var description = sanitizeHtml(topic[0].description, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'iframe' ]),
        allowedAttributes: {
          'iframe': ["src", "width", "height"],
        }
      });
    var list = template.list(request.topics);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}
      <p>by ${topic[0].name}</p>`,
      `<a href="/topic/create">Create</a>
      <a href="/topic/update/${id}">Update</a>
      <form action="/topic/delete_process" method="post">
        <input type="hidden" name="id" value="${id}">
        <input type="submit" value="delete">
      </form>`,
      template.statusUI(request, response)
    );
    response.send(html);
  });
});

module.exports = router;