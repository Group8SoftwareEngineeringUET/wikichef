module.exports = function(){
	/*this.connectToDB = function() {
		var mysql = require('mysql');
			var con = mysql.createConnection({
				host: "localhost",
				user: "Lumeri",
				password: "linh7b2ltt",
				database: "mydb"
			});
		return con;
	}*/
	this.search = function(req, res, next) {
		if (req.query.search.length > 0) {
			var mysql = require('mysql');
			var con = mysql.createConnection({
				host: "localhost",
				user: "Lumeri",
				password: "linh7b2ltt",
				database: "mydb"
			});
			con.connect(function(err){
				if (err) throw err;
				var key = req.query.search.split(",");
				var statement = 'select * from Post where ';
				for (var i = 0; i < key.length; i++){
					key[i] = key[i].trim();
					statement += (i > 0? "and " : "") + 'idPost in (select Post_idPost from ingredieat where name_ingre like "%' + key[i] + '%") ';
				}
				console.log(statement);
				res.redirect('/');
				con.query(statement, function(err, result){
					if (err) throw err;
					if (result.length > 0){
						var s='';
						for (var i = 0; i < result.length; i++) {
							s += result[i].NamePost + ',';
						}
						res.send(s);
					} else {
						res.send("Not found!");
					}
				})
			})
		}
	}
	
	this.view = function(req, res){
		var mysql = require('mysql');
			var con = mysql.createConnection({
				host: "localhost",
				user: "Lumeri",
				password: "linh7b2ltt",
				database: "mydb"
			});
		var Post = require('../models/post.js');
		var post = new Post();
		con.connect(function(err){
			if (err) throw err;
			var statement = 'select * from post where idPost = ' + req.params.postID;
			console.log(statement);
			con.query(statement, function(err, result){
				if (err) throw err;
				post.setInfo(result[0].NamePost, result[0].Description, result[0].idPost, result[0].Account_idAccount,
					result[0].Rating, result[0].Like);
					console.log(result[0]);
					console.log(post);
					//console.log(post.toString);
				res.send(post.print);
			});
		});
	}
		
	this.like = function(req, res){
		
	}
}

