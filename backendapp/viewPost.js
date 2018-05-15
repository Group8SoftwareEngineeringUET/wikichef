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
					var sql1 = "SELECT * FROM post where idPost = ? ";
					conn.query(sql1,[req.params.id], function (err,result) {
						if (err) throw err;
					//	console.log("truy xuat thanh cong");
					//	console.log(result);
						/*post.idPost=result.idPost;
						post.NamePost=result.NamePost;
						post.Description=result.Description;
						post.Rating=result.Rating;
						post.Account_idAccount=result.Account_idAccount;
						post.Like=result.Like;*/
						post.setInfo1(result[0].NamePost, result[0].Description, result[0].idPost, result[0].idAccount, result[0].Rating, result[0].Like);
	
						
					});
					//console.log(post);
					var sql2="SELECT * from Account where idAccount=?"
					/*conn.query(sql2,[post.Account_idAccount], function (err,result) {
						if (err) throw err;
						post.Account=result.User;
					});*/
					var sql3="SELECT * from ingredient where Post_idPost=?"
					conn.query(sql3,[post.idPost], function (err,result) {
						if (err) throw err;
						for (var i = 0; i < result.length; i++) {
							post.ingre[i]=result[i].Name_Ingre;
							post.amt[i]=result[i].Amount;
						}
						
						
					});
					var sql4="SELECT content from step where Post_idPost=?"
					conn.query(sql4,[post.idPost], function (err,result) {
						console.log(result);
						if (err) throw err;
						for (var i = 0; i < result.length; i++) {
							post.step[i]=result[i].Content;
						}
					});
					console.log(post);
					res.render("PostDetail",{data:post});
				});
			
			});
}