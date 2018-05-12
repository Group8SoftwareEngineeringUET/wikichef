module.exports=function (urlencodedParser,app) {
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/createPost/process")
		.post(urlencodedParser, function(req,res){
			
			
			
			res.redirect("/view/IDpost");
		});
}