const express = require('express');
const db = require('./lib/db.js');
const compression = require('compression');
const helmet = require('helmet');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

const sessionStore = new MySQLStore({}, db);
const app = express();

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: true
}));

app.use(helmet());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(flash());

const passport = require('./lib/passport.js')(app);

app.get('*', (request, response, next) => {
  db.query(`SELECT * FROM topic;`, (err, topics) => {
    if (err){ throw err; }
    request.topics = topics;
    db.query(`SELECT * FROM author;`, (err2, authors) => {
      if (err2){ throw err2; }
      request.authors = authors;
      next();
    });
  });
});

const indexRouter = require('./routes/index');
const topicRouter = require('./routes/topic');
const authorRouter = require('./routes/author');
const authRouter = require('./routes/auth')(passport);

app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/author', authorRouter);
app.use('/auth', authRouter);

app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./config/key.pem'),
  cert: fs.readFileSync('./config/cert.pem')
};

https.createServer(options, app).listen(3000,
  () => console.log('Example app listening on port 3000!'));
