var express = require("express");
var mysql= require("mysql");
var bodyParser = require('body-parser');
var session= require('express-session');
var passport=require('passport');
var localStrategy=require('passport-local').Strategy;

var app = express();
app.listen(3000);

app.set("view engine","ejs");
app.set('views', __dirname + '../frontend/ejs/')
app.use(express.static('../frontend/'));

// app.use(passport,initialize());
// app.use(passport.session());

//var search= require("./search.js");
var bodyParser = require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});

/*app.post("/wikichef/search", urlencodedParser, function(req,res){
	
	res.render("PostsList.ejs");

});*/

// passport.use(new localStrategy(
// 	(email,psw,done)=>{
		
// 	}
// ))
var goHome = require('./goHome.js');
goHome(urlencodedParser, app);

 var search=require('./search.js');
 search(urlencodedParser,app);

var login=require('./login.js');
login(urlencodedParser,app);

var signup=require('./signup.js');
signup(urlencodedParser,app);
// // logout(urlencodedParser,app);
var createPost=require('./crtPost.js');
createPost(urlencodedParser,app);

var createPostProcess=require('./crtPostProcess.js');
createPostProcess(urlencodedParser,app);

var viewMyPosts=require('./viewMyPosts.js');
viewMyPosts(urlencodedParser,app);

var deletePost=require('./delPost.js');
deletePost(urlencodedParser,app);

var editPost=require('./edtPost.js');
editPost(urlencodedParser,app);

var search=require('./search.js');
search(urlencodedParser,app);

var viewPost=require('./viewPost.js');
viewPost(urlencodedParser,app);