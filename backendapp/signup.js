var mysql = require('mysql');
var Account = require('./model/account');

module.exports=function (urlencodedParser,app) {
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/signup")
		.post(urlencodedParser, function(req,res){
			
			console.log(req.body);//req.body chua noi dung tu front
			//Viet code o day
			if (!req.body.email || !req.body.pwd || !req.body.rpwd) {
				console.log('All fields required, please try again!');
			} else if (req.body.pwd != req.body.rpwd) {
				console.log('Password not match!');
			} else {
				var con = mysql.createConnection({
  					host: "localhost",
  					user: "root",
  					password: "linhcoi165",
  					database: "mydb"
				});
				var newAccount = new Account();
				var query = 'select * from Account where User = "' + req.body.email +'";';
				con.connect(function(err) {
					if (err) throw err;
					con.query(query, function (err, result) {
						if (err) throw err;
						if (result.length != 0) {
							console.log('Email existed!');
						} else {
							var statement = 'insert into Account (User, Pass) values (' + req.body.email + ', ' + req.body.pwd + ');';
							con.query(statement, function (err, result) {
								if (err) throw err;
								con.query(query, function (err, result) {
									if (err) throw err;
									if (result.length != 0) {
										console.log('Them tai khoan thanh cong');
										//tao doi tuong Account vua dang ki
										newAccount.setInfo(result[0].User, result[0].Pass, result[0].idAccount);
									}
									else console.log('Tai khoan chua dc them');
								})
								//console.log('them tai khoan thanh cong');
							})
						}
					})
				})
			}			
			res.redirect("/");
		});
}