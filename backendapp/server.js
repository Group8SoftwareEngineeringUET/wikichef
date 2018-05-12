var express = require("express");
var mysql= require("mysql");
var bodyParser = require('body-parser');


var app = express();
app.listen(3000);

app.set("view engine","ejs");
app.set('views', __dirname + '../frontend/ejs/')
app.use(express.static('../frontend/'))
app.get("/", function(req,res){
	res.render("TrangChu");
});	
//var search= require("./search.js");
var bodyParser = require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});

/*app.post("/wikichef/search", urlencodedParser, function(req,res){
	
	res.render("PostsList.ejs");

});*/

var search=require('./search.js');
search(urlencodedParser,app);

var login=require('./login.js');
login(urlencodedParser,app);
// signup(urlencodedParser,app);
// logout(urlencodedParser,app);
// createPost(urlencodedParser,app);





