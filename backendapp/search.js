module.exports=function (urlencodedParser,app) {
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/wikichef/search")
		.post(urlencodedParser, function(req,res){
			var result=[];
			var key=req.body;
			console.log(req.body);//req.body chua noi dung search
			// can phai search trong database
			//Viet code o day


			
			res.render("PostsList",{result});
		});
}