module.exports=function (urlencodedParser,app) {
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/view/:id")
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
					var Post=require('./model/post.js');
					var post=new Post();
					var sql = "SELECT * FROM post where idPost = ? ";
					conn.query(sql,[req.param.id], function (err,result) {
						if (err) throw err;
					//	console.log("truy xuat thanh cong");
					//	console.log(result);
						post.idPost=result.idPost;
						post.NamePost=result.NamePost;
						post.Description=result.Description;
						post.Rating=result.Rating;
						post.Account_idAccount=result.Account_idAccount;
						post.Like=result.Like;
						
					});
					sql="SELECT * from Account where idAccount=?"
					conn.query(sql,[post.Account_idAccount], function (err,result) {
						if (err) throw err;
						post.Account=result.User;
					});
					sql="SELECT * from ingredient where idPost=?"
					conn.query(sql,[req.param.id], function (err,result) {
						if (err) throw err;
						post.ingre=result.Name_Ingre;
						post.amt=result.Amount;
					});
					sql="SELECT * from step where idPort=?"
					conn.query(sql,[req.param.id], function (err,result) {
						if (err) throw err;
						post.step=result.Step;
					});
					res.render("PostDetail",{data:post});
				});
			
			});
}