module.exports=function (urlencodedParser,app) {
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/login")
		.get(function(req,res){
			var i={id:1, ten: thang, mk: 1234};
			console.log(req.body);//req.body chua noi dung tu front
			//Viet code o day
			console.log(111111111111111111111111);
			//res.render('TrangChu');
			
			res.render("temp",{i});
		});
}