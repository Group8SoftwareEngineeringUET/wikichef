module.exports=function (urlencodedParser,app) {
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/delete/:id")
		.get(urlencodedParser, function(req,res){
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
				console.log("Ket noi XOA  thanh cong thi in");
							
				var sql = "delete FROM post where idPost ="+req.params.id;
				conn.query(sql, function (err,result) {
					if (err) throw err;
					console.log("Xoa thanh cong");
				//	console.log(result);
					res.redirect("../PostsList");
				});
			});		
	});
}