const sanitizeHtml = require('sanitize-html');

module.exports = {
  HTML:function(title, list, body, control,
    statusUI = `<a href="/auth/login">Log-in</a> |
      <a href="/auth/register">Register</a> |
      <a href="/auth/loginWithGoogle">Log-in with google</a> |
      <a href="/auth/loginWithFacebook">Log-in with facebook</a>`){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      ${statusUI}
      <h1><a href="/">WEB</a></h1>
      <p><a href="/author">Authors</a></p>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },list:function(topics){
    var list = '<ul>';
    var i = 0;
    while(i < topics.length){
      list = list + `<li><a href="/topic/${topics[i].id}">${sanitizeHtml(topics[i].title)}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  },authorSelect:function(authors, author_id){
    var tag = '';
    var i = 0;
    while(i < authors.length){
      var selected='';
      if (authors[i].id === author_id) {
        selected=' selected';
      }
      tag += `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`;
      i++;
    }
    return `<select name="author">
        ${tag}
      </select>`;
  },authorTable:(authors) => {
    var tag = '<table>';
    var i = 0;
    while(i < authors.length){
        tag += `
            <tr>
                <td>${authors[i].name}</td>
                <td>${authors[i].profile}</td>
                <td><a href="/author/update/${authors[i].id}">update</a></td>
                <td><form action="/author/delete_process" method="post">
                  <input type="hidden" name="id" value="${authors[i].id}">
                  <input type="submit" value="Delete">
                </form></td>
            </tr>
            `
        i++;
    }
    tag += '</table>';
    return tag;
  },statusUI:(request, response) => {
    var statusUI = `<a href="/auth/login">Log-in</a> |
      <a href="/auth/register">Register</a> |
      <a href="/auth/loginWithGoogle">Log-in with google</a> |
      <a href="/auth/loginWithFacebook">Log-in with facebook</a>`;
    if (request.user) {
      statusUI = `${request.user.name} |
      <a href="/auth/logout">Log-out</a>`
    }
    return statusUI;
  }
}
