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
		var Post = require('./model/post.js');
		var post = new Post();
		con.connect(function(err){
			if (err) throw err;
			var statement = 'select * from post where idPost = ' + req.params.postID;
			console.log(statement);
			con.query(statement, function(err, result){
				if (err) throw err;
				post.setInfo(result[0].NamePost, result[0].Description, result[0].idPost, result[0].Account_idAccount,
					result[0].Rating, result[0].Like);
					console.log(post);
					console.log(result[0]);
				res.status(200).send('Rating: '+(post.Rating).toString());
			});
		});
	}
		
	this.like = function(req, res){
		var p = req.params.postID;
		var u = req.params.userID;
		var mysql = require('mysql');
			var con = mysql.createConnection({
				host: "localhost",
				user: "Lumeri",
				password: "linh7b2ltt",
				database: "mydb"
			});
		con.connect(function(err){
			if (err) throw err;
			var statement1 = 'insert into likestate (Account_idAccount, Post_idPost) values ('+u+', '+p+')';
			console.log(statement1);
			con.query(statement1, function(err){
				if (err) throw err;
				var statement2 = 'update Post set like = like+1 where idPost = '+p;
				console.log(statement2);
				con.query(statement2, function(err){
					if (err) throw err;
					res.redirect('/view/'+p);
				});
			})
		})
	}
	
	this.rate = function(req, res){
		var u = req.params.userID;
		var p = req.params.postID;
		var s = req.params.score;
		var mysql = require('mysql');
			var con = mysql.createConnection({
				host: "localhost",
				user: "Lumeri",
				password: "linh7b2ltt",
				database: "mydb"
			});
		con.connect(function(err){
			if (err) throw err;
			var statement1 = 'insert into rate (Account_idAccount, Post_idPost, score) values ('+u+', '+p+', '+s+')';
			console.log(statement1);
			con.query(statement1, function(err){
				if (err) throw err;
				var statement2 = 'select (sum(score)/count(*)) avg from rate group by Post_idPost having Post_idPost = '+p;
				console.log(statement2);
				con.query(statement2, function(err, result){
					if (err) throw err;
					var statement3 = 'update post set rating = '+result[0].avg+' where idPost = '+p;
					console.log(statement3);
					con.query(statement3, function(err){
						if (err) throw err;
						res.redirect('/view/'+p);
					});
				});
			});
		});
	}
}

