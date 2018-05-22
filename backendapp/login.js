<<<<<<< HEAD
// <<<<<<< HEAD
// <<<<<<< HEAD
// module.exports=function (Passport,app) {
// 	var Account = require('./model/account');
// 	var mysql= require("mysql");
// 	app.set("view engine","ejs");
// 	app.set("views","../frontend/ejs/");
// 	app.route("/login")
// 		.post(Passport.authenticate("local", {failureRedirect: "/"}));
// =======
// var mysql = require('mysql');


// module.exports = function (mysql,urlencodedParser,app) {
// 	var Account = require('./model/account');
// 	var mysql= require("mysql");
// 	app.set("view engine","ejs");
// 	app.set("views","../frontend/ejs/");
// 	app.route("/login")
// 		.post(urlencodedParser, function(req,res){
// 			console.log(req.body);//req.body chua noi dung tu front
// 			//Viet code o day
// 			if (req.body.email != null || req.body.psw != null) {
// 				var con = mysql.createConnection({
//   					host: "localhost",
//   					user: "root",
//   					password: "linhcoi165",
//   					database: "mydb"
// 				});
// 				var statement = 'select * from account where User = "' + req.body.email + '";';
// 				var resAccount = new Account();
// 				con.connect(function(err) {
// 					if (err) throw err;
// 					con.query(statement, function(err, result){
// 						if (err) throw err;
// 						if (result.length == 0) {
// 							console.log('Email ko ton tai');
// 						} else {
// 							if (req.body.psw != result[0].Pass) {
// 								console.log('Mat khau khong dung!');
// 							} else {
// 								//tao doi tuong response account
// 								resAccount.setInfo(result[0].User, result[0].Pass, result[0].idAccount, result[0].Admin);
// 								console.log('Dang nhap thanh cong.');
// 							}
// 						}
// 					})
// 				})
// 			}			
// 			res.redirect('http://localhost:3000');
// 		});
// >>>>>>> 1820458f8413dcdc658c156f1009559459f911ca
// =======


module.exports = function (urlencodedParser,app) {
	var mysql = require('mysql');
	var Account = require('./model/account');
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/login")
		.post(urlencodedParser, function(req,res){
			console.log(req.body);//req.body chua noi dung tu front
			//Viet code o day
			if (req.body.email != null && req.body.psw != null) {
				var con = mysql.createConnection({
  					host: "localhost",
  					user: "root",
  					password: "15101998",
  					database: "mydb"
				});
				var statement = 'select * from account where User = "' + req.body.email + '";';
				var resAccount = new Account();
				con.connect(function(err) {
					if (err) throw err;
					con.query(statement, function(err, result){
						if (err) throw err;
						if (result.length == 0) {
							console.log('Email ko ton tai');
						} else {
							if (req.body.psw != result[0].Pass) {
								console.log('Mat khau khong dung!');
							} else {
								//tao doi tuong response account
								resAccount.setInfo(result[0].User, result[0].Pass, result[0].idAccount, result[0].Admin);
								console.log('Dang nhap thanh cong.');
							}
						}
					})
				})
			}			
			res.redirect('/');
		});
// >>>>>>> 89b0efa1c97f5b19ff49b84628a09e03612e509e
=======
var mysql = require('mysql');
var Account = require('./model/account');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

module.exports = function (urlencodedParser, Passport, app) {
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.use(urlencodedParser);
	app.use(session({secret: 'mysecret'}));
	app.use(Passport.initialize());
	app.use(Passport.session());
	app.route("/login")
		.post(Passport.authenticate('local', {failureRedirect: '/view/1', successRedirect: '/'}));
	Passport.use(new LocalStrategy(
				(email, psw, done) => {
					console.log('......');
					var con = mysql.createConnection({
  					host: "localhost",
  					user: "Lumeri",
  					password: "linh7b2ltt",
  					database: "mydb"
					});
					var statement = 'select * from account where User = "' + email+ '";';
					
					var resAccount = new Account();
					con.connect(function(err) {
						if (err) throw err;
						con.query(statement, function(err, result){
							if (err) throw err;
							
							if (result.length != 0 && psw == result[0].Pass) {
								return done(null, result[0]);
						} else {
								return done(null, false);
							}
						})
					})
				}
			))
			Passport.serializeUser((user, done) => {
				done(null, user.User);
			})
			Passport.deserializeUser((user, done) => {
				var con = mysql.createConnection({
  					host: "localhost",
  					user: "Lumeri",
  					password: "linh7b2ltt",
  					database: "mydb"
					});
					var statement = 'select * from account where User = "' + user + '";';
					con.connect(statement, function(err, result){
						if (err) throw err;
						if (result.length != 0) 
							return done(null, result[0]);
						else 
							return done(null, false);
					});
			})
	
		/*.post(urlencodedParser, function(req,res){
			console.log(req.body);//req.body chua noi dung tu front
			//Viet code o day
			
				var con = mysql.createConnection({
  					host: "localhost",
  					user: "Lumeri",
  					password: "linh7b2ltt",
  					database: "mydb"
				});
				var statement = 'select * from account where User = "' + req.body.email + '";';
				var resAccount = new Account();
				con.connect(function(err) {
					if (err) throw err;
					con.query(statement, function(err, result){
						if (err) throw err;
						if (result.length == 0) {
							console.log('Email ko ton tai');
						} else {
							if (req.body.psw != result[0].Pass) {
								console.log('Mat khau khong dung!');
							} else {
								//tao doi tuong response account
								resAccount.setInfo(result[0].User, result[0].Pass, result[0].idAccount, result[0].Admin);
								console.log('Dang nhap thanh cong.');
							}
						}
					})
				})
			}			*/
			//res.redirect('http://localhost:3000');
		//});
>>>>>>> ef2b53ac8d898c87ef168bbcd8fd7b0547204ce5
}