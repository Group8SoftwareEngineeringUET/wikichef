module.exports=function (urlencodedParser,app) {
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/wikichef/logout")
		.post(urlencodedParser, function(req,res){
			console.log(req.body);//req.body chua noi dung tu front
			//Viet code o day


			
			res.render("TrangChu");
		});
}