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
}