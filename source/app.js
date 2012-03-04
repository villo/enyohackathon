enyo.kind({
	name: "App",
	kind: "Control",
	components: [
		{kind: "header"},
		{kind: "body", name: "Body", onLoggedIn: "bubbleLogin"}
	],
	
	pageChange: function(inSender, inEvent){
		this.$.Body.pageChange(inEvent);
	},
	
	rendered: function(){
		this.inherited(arguments);
		if(villo.user.isLoggedIn() !== true){
			//Show the login page.
			this.$.Body.$.loginPage.showLoginModal();
		}else{
			this.loggedIn();
		}
	},
	
	bubbleLogin: function(){
		this.loggedIn();
	},
	
	loggedIn: function(){
		this.$.header.loggedIn();
		this.$.Body.loggedIn();
	}
});