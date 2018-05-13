module.exports=function (urlencodedParser,app) {
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/createPost")
		.get(function(req,res){
			res.render("CreatePost");			
		});
}