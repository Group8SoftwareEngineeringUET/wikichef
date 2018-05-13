module.exports=function (urlencodedParser,app) {
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/edit/:id")
		.get(function(req,res){
		var id = req.params.id;
	
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
				var sql = "select * from post where idPost ="+id;
				conn.query(sql, function (err,result) {
					if (err) throw err;
					console.log("edit thanh cong");
					console.log(result);
					res.render("EditPost",{data:id});
				});
			});
	
		})
		.post(urlencodedParser, function(req,res){
			var id = req.params.id;
			
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
						var sql = "UPDATE post set  Description = ?, NamePost = ? WHERE idPost = ?";
							arrEdit=[req.body.mtc,req.body.tma,id];
						conn.query(sql,arrEdit, function (err,result) {
							if (err) throw err;
						
							res.redirect("../PostsList");
						});
						
					});
				});
}