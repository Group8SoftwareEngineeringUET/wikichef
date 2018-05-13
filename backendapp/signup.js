

module.exports=function (urlencodedParser,app) {
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/signup")
		.post(urlencodedParser, function(req,res){
			var mysql = require('mysql');
			var Account = require('./model/account');
			console.log(req.body.email);//req.body chua noi dung tu front
			//Viet code o day
			if (!req.body.email || !req.body.psw || !req.body.rpsw) {
				console.log('All fields required. Please enter again!');
			} else if (req.body.psw != req.body.rpsw) {
				console.log('Password not match!');
			} else {
				var con = mysql.createConnection({
  					host: "localhost",
  					user: "root",
  					password: "15101998",
  					database: "mydb"
				});
				var newAccount = new Account();
				var query = 'select * from Account where User = "' + req.body.email +'";';
				con.connect(function(err) {
					if (err) throw err;
					//kiểm tra email đã được đăng kí chưa
					con.query(query, function (err, result) {
						if (err) throw err;
						//kết quả tìm được != 0 -> đã tồn tại email
						if (result.length != 0) {
							console.log('Email existed!');
						} else {
							//tạo đối tượng
							newAccount.setInfo(req.body.email, req.body.psw);
							var statement = 'insert into Account (User, Pass, Admin) values ("' + req.body.email + '", "' + req.body.psw + '", "' +  newAccount.Admin + '");';
							//thêm vào CSDL
							con.query(statement, function (err, result) {
								if (err) throw err;
								//kiểm tra lại xem tài khoản đã đc thêm vào CSDL hay chưa
								con.query(query, function (err, result) {
									if (err) throw err;
									if (result.length != 0) {
										console.log('Them tai khoan thanh cong');
										newAccount.setIdAccount(result[0].idAccount);										
									} else console.log('Tai khoan chua dc them');
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