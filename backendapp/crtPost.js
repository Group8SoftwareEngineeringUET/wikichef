module.exports=function (urlencodedParser,app) {
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/wikichef/createpost")
		.post(urlencodedParser, function(req,res){
			res.render("CreatePost");
			console.log(req.body);//req.body chua noi dung tu front gui den
			
		});
}