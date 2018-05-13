module.exports=function (urlencodedParser,app) {
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/createPostProcess")
		.post(urlencodedParser, function(req,res){
			console.log(req.body);
			
			
			res.redirect("/view/:IDpost");
		});
}