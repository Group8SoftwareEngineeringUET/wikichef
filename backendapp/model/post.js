module.exports = function(){
	this.idPost = -1;
	this.NamePost = '';
	this.Description = '';
	this.Account_idAccount = -1;
	this.Rating = 0.0;
	this.Like = 0;
	this.ingre;
	this.amt;
	this.step;
	
	this.setInfo = function(NamePost, Description, idPost, Account_idAccount, Rating, Like, ingre, amt, step){
		this.NamePost = NamePost;
		this.Description = Description;
		if (typeof idPost != 'undefined')
			this.idPost = idPost;
		if (typeof Account_idAccount != 'undefined')
			this.Account_idAccount = Account_idAccount;
		if (typeof Rating != 'undefined')
			this.Rating = Rating;
		if (typeof Like != 'undefined')
			this.Like = Like;
		if (typeof ingre != 'undefined')
			this.ingre = ingre;
		if (typeof amt != 'undefined')
			this.amt = amt;
		if (typeof step != 'undefined')
			this.step = step;
	}
	this.print = function(){
		var s = this.idPost+" "+this.NamePost+" "+this.Description+" "+this.Account_idAccount+" "+this.Rating+" "+this.Like;
		console.log(s);
		return '...';
	}
	return this;
}