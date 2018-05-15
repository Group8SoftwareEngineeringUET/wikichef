module.exports=function (urlencodedParser,app) {
	var process=require('./process.js');
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/search")
		.get(function(req,res){
			//var myResult=[];
				if (req.query.search.length > 0) {
					var mysql = require('mysql');
					var con = mysql.createConnection({
						host: "localhost",
						user: "root",
						password: "15101998",
						database: "mydb"
					});
					con.connect(function(err){
						if (err) throw err;
						var key = req.query.search.split(",");
						console.log(key);
						var statement = 'select * from Post where ';
						for (var i = 0; i < key.length; i++){
							key[i] = key[i].trim();
							statement += (i > 0? "and " : "") + 'idPost in (select Post_idPost from ingredient where name_ingre like "%' + key[i] + '%") ';
						}
						//console.log(statement);
						con.query(statement, function(err, result){
							if (err) throw err;
							if (result.length > 0){
								var s='';
								for (var i = 0; i < result.length; i++) {
									s += result[i].NamePost + ',';
								}
								//res.send(s);
								res.render("PostsList",{data: result});
								//console.log(myResult);
							} else {
								//res.send("Not found!");
								res.render("PostsList",{data: []});
							}
						})
					})
				}
			
		});
}