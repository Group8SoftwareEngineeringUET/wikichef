module.exports=function (urlencodedParser,app) {

	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/createPostProcess")
		.post(urlencodedParser, function(req,res){
			
				
					
					console.log(req.file);
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
						console.log("Ket noi insert thanh cong thi in");
						var Rat = 0;
						var like = 0;
						var ACC = 3;
						var sql = 'insert into post (NamePost,Rating,NumOfLike,Account_idAccount,Description,Image) values (?,?,?,?,?,?)';
						var arr = [req.body.tma, Rat,like,ACC,req.body.mtc,req.body.uploadfile];
						conn.query(sql,arr, function (err,result) {
							if (err) throw err;
						//	console.log(req.body);
							//console.log(sql);
							res.redirect("./PostsList");
						});

						var p = new Post();
						p.setInfo(req.body.tma, req.body.mtc, req.body.nl, req.body.sl, req.body.buoc);
						console.log(p);
						var findIdPost = 'select Max(idPost) as idLast from post';
						conn.query(findIdPost, function (err,result) {
							if (err) throw err;
							console.log("kq id tim duoc");
							console.log(result[0]);
							var lastId =result[0].idLast;
							var nl = 'insert into ingredient (Name_Ingre, amount, Post_idPost) values (?, ?, ?)';
							for (var i = 0; i < p.ingre.length; i++)  {
								var arr = [p.ingre[i], p.amt[i], lastId];
								conn.query(nl, arr, function(err){
									if (err) throw err;
								})
							}

							var insertStep = 'insert in to step (Post_idPost,Step,content) values(?,?,?)';
							for(var i =0; i <p.step.length;i++){
								var arrStep = [lastId,i+1,p.step[i]];
								conn.query(nl, arrStep, function(err){
									if (err) throw err;
								})
							}

						});



					});
					
					
				
					
		});
}