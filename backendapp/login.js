var mysql = require('mysql');
var Account = require('./model/account');

module.exports = function (urlencodedParser,app) {
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
  					password: "linhcoi165",
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
			res.redirect('http://localhost:3000');
		});
}