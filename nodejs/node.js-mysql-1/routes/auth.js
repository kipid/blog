const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');
const bcrypt = require('bcrypt');
const db = require('../lib/db.js');

module.exports = (passport) => {
	router.get('/login', (request, response) => {
	  var fmsg = request.flash();
	  var feedback = '';
	  if(fmsg.error){
	    feedback = fmsg.error[0];
	  }
	  var title = 'WEB - Log-in';
	  var description = `<form action="/auth/login_process" method="post">
	      <p><input type="text" name="name" placeholder="name"></p>
	      <p><input type="password" name="pwd" placeholder="password"></p>
	      <p><input type="submit" value="Log-in"></p>
	    </form>`;
	  var list = template.list(request.topics);
	  var html = template.HTML(title, list,
	    `<div style="color:red">${feedback}</div>
	    <h2>${title}</h2>${description}`,
	    ``
	  );
	  response.send(html);
	});

	router.post('/login_process',
	  passport.authenticate('local', {
	    successRedirect: '/',
	    failureRedirect: '/auth/login',
	    successFlash: true,
	    failureFlash: true
	  }));

	/*
	router.post("/login_process", (request, response) => {
	  var post = request.body;
	  db.query(
	    `SELECT * FROM author WHERE name=?`,
	    [post.name], (err, author) => {
	    if (err){ throw err; }
	    if (author){
	    	bcrypt.compare(post.pwd, author[0].pwd, function(err, result) {
	    		if (result === true){
	    			request.session.isLogined = true;
	    			request.session.name = post.name;
	    			request.session.save((err) => {
		    			response.redirect(`/`);
	    			})
	    		} else {
	    			response.send("Wrong password!");
	    		}
	    	});
	  	} else {
	  		response.send("Who?");
	  	}
	  });
	});
	*/

	router.get('/loginWithGoogle',
  		passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));

	router.get('/google/callback', 
	  passport.authenticate('google', { failureRedirect: '/auth/login' }),
	  function(req, res) {
	    res.redirect('/');
	  });

	router.get("/logout", (request, response) => {
		request.logout();
		request.session.destroy((err) => {
			if (err){ throw err; }
			response.redirect('/');
		})
	});

	router.get('/loginWithFacebook', passport.authenticate('facebook'));

	router.get('/facebook/callback',
	  passport.authenticate('facebook',
	  { successRedirect: '/',
        failureRedirect: '/auth/login' }));

	return router;
}
