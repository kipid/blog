var template = (title, lis, description, link) => {
  return `<!doctype html>
<html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${lis}
    <a href="/create">Create</a> ${link}
    <h2>${title}</h2>
    ${description}
  </body>
</html>`;
};

var templateList = (filelist) => {
  var lis = `<ul>`;
  for (var i in filelist){
    lis += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
  }
  lis += `</ul>`;
  return lis;
};

module.exports = {
  template,
  templateList
}