const db = require('./db.js');
const bcrypt = require('bcrypt');

module.exports = (app) => {
  const passport = require('passport')
      , LocalStrategy = require('passport-local').Strategy
      , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
      , FacebookStrategy = require('passport-facebook').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    console.log('serializeUser', user);
    done(null, user.name);
  });

  passport.deserializeUser(function(name, done) {
    console.log('deserializeUser', name);
    db.query(`SELECT * FROM author WHERE name=?`,
        [name], (err, author) => {
          done(err, author[0]);
        })
  });

  passport.use(new LocalStrategy(
    {
      usernameField: 'name',
      passwordField: 'pwd'
    },
    function (username, password, done) {
      console.log('LocalStrategy', username, password);
      db.query(
        `SELECT * FROM author WHERE name=?`,
        [username], (err, author) => {
        if (err){ throw err; }
        if (author[0]){
          bcrypt.compare(password, author[0].pwd, function(err, result) {
            if (result === true){
              return done(null, author[0], {message: 'Welcome.'});
            } else {
              return done(null, false, {
                message: 'Incorrect password.'
              });
            }
          });
        } else {
          return done(null, false, {
            message: 'Incorrect username.'
          });
        }
      });
    }));

  var client = require('../config/google-login.json');
  passport.use(new GoogleStrategy({
    clientID: client.web.client_id,
    clientSecret: client.web.client_secret,
    callbackURL: "https://localhost:3000/auth/google/callback"
  }, function(accessToken, refreshToken, profile, done) {
      var email = profile.emails[0].value;
      db.query(`SELECT * FROM author WHERE email=?`, [email],
        (err, author) => {
          if (author[0]) {
            return done(null, author[0], {message: 'Welcome.'});
          } else {
            db.query(`INSERT INTO author (name, email) VALUES (?, ?);`,
              [profile.displayName, email], (err, result) => {
                db.query(`SELECT * FROM author WHERE email=?`, [email],
                  (err, author) => {
                    if (author[0]) {
                      done(null, author[0]);
                    } else {
                      done(null, false);
                    }
                  });
              });
          }
        });
    }
  ));

  passport.use(new FacebookStrategy({
    clientID: "517200306214058",
    clientSecret: "7d7f3f8d5c7ac1a9c13a00c38c6b7c1a",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
    function(accessToken, refreshToken, profile, done) {
      console.log(accessToken, refreshToken, profile, done);
      
      // User.findOrCreate(..., function(err, user) {
      //   if (err) { return done(err); }
      //   done(null, user);
      // });
    }
  ));

  return passport;
}
