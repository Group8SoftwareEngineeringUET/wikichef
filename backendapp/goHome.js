module.exports=function (urlencodedParser,app) {
	var process= require('./process.js');
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/user/:id")
		.post(urlencodedParser, function(req,res){
			
			
			res.render("TrangChu");
		});
	app.route("/")
		.get(function(req,res){
			var mysql = require('mysql');
			var con = mysql.createConnection({
				host: "localhost",
				user: "root",
				password: "15101998",
				database: "mydb"
			});
			var Post = require('./model/post.js');
			var post = new Post();
			con.connect(function(err){
				if (err) throw err;
				var statement = 'select * from post order by Rating desc';
				console.log(statement);
				con.query(statement, function(err, result){
					if (err) throw err;
					console.log(result);
					res.render("TrangChu",{data: result});
				});
			});

			
		});
}