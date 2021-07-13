const express = require('express');
const router = express.Router();
const db = require('../lib/db.js');
const template = require('../lib/template.js');

router.get('/', (request, response) => {
  var fmsg = request.flash();
  var feedback = '';
  if(fmsg.success){
    feedback = fmsg.success[0];
  }
  var title = 'Welcome';
  var description = 'Hello, Node.js <img src="/images/hello.jpg" style="display:block; margin-top:10px">';
  var list = template.list(request.topics);
  var html = template.HTML(title, list,
    `<div style="color:blue">${feedback}</div>
    <h2>${title}</h2>${description}`,
    `<a href="/topic/create">Create</a>`
    , template.statusUI(request,response)
  );
  response.send(html);
});

module.exports = router;