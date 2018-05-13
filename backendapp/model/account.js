module.exports = function() {
	this.idAccount = -1;
	this.User = '';
	this.Pass = '';
	this.Admin = 0;
	
	this.setInfo = function(User, Pass, idAccount, Admin){
		this.User = User;
		this.Pass = Pass;
		if (typeof idAccount != 'undefined')
			this.idAccount = idAccount;
		if (typeof Admin != 'undefined')
			this.Admin = Admin;
	};
	
	this.isAdmin = function() {
		return (Admin == 1);
	}
	
	return this;
}