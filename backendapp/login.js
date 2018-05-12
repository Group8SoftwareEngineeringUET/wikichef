module.exports=function (urlencodedParser,app) {
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/login")
		.post(urlencodedParser, function(req,res){
			console.log(req.body);//req.body chua noi dung tu front
			//Viet code o day
			console.log(111111111111111111111111);

			res.render('TrangChu');
			
			//res.redirect('http://localhost:3000/');
		});
}