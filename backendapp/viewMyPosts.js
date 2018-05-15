module.exports=function (urlencodedParser,app) {
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/PostsList")
		.get(function(req,res){
			var mysql = require('mysql');

			var conn = mysql.createConnection({
				host    : 'localhost',
				user    : 'root',
				password: '15101998',
				database: 'mydb',
			});
			

			conn.connect(function (err){
					//nếu có nỗi thì in ra
					if (err) throw err.stack;
					console.log("ket noi  thanh cong thi in");
								
					var sql = "SELECT * FROM post where Account_idAccount ";
					conn.query(sql, function (err,result) {
						if (err) throw err;
					//	console.log("truy xuat thanh cong");
						console.log(result+"ddddddddddddddddd");
						res.render("PostsList",{data:result});
					});
				});
			});
}