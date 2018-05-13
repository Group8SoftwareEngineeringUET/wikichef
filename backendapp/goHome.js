module.exports=function (urlencodedParser,app) {
	var process= require('./process.js');
	app.set("view engine","ejs");
	app.set("views","../frontend/ejs/");
	app.route("/user/:id")
		.post(urlencodedParser, function(req,res){
			
			
			res.render("TrangChu");
		});
	app.route("/")
		.get(function(req,res){
			
			
			res.render("TrangChu");
		});
}