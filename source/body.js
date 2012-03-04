enyo.kind({
	name: "body",
	kind: "Control",
	events: {
		onLoggedIn: ""
	},
	
	components: [
		{classes: "container", components: [
			//{kind: "Book", name: "Book", components: [
				//{kind: "welcomePage", name: "welcomePage"},
				//{kind: "homePage", name: "homePage", lazy: true},
				//{kind: "profilePage", name: "profilePage", lazy: true},
				//{kind: "friendsPage", name: "friendsPage", lazy: true, onFriendClicked: "handleFriendClick"},
				//{kind: "appsPage", name: "appsPage", lazy: true},
			//]},
			//This isn't part of our "book" because we want it to show above the content.
			{kind: "loginPage", name: "loginPage", onLoggedIn: "bubbleLogin"},
			
			{kind: "footer"}
		]}
	],
	
	bubbleLogin: function(){
		this.bubble("onLoggedIn");
	},
	
	pageChange: function(inSender){
		if(inSender){
			/*
			 * We allow this to be called with data or without. We could do this with some easier statements, but I'm okay with being verbose. 
			 */
			if(inSender.page){
				this.$.Book.pageName(inSender.page + "Page");
				//Because it's lazy, we have to call methods through the book.
				if(this.$.Book.$[inSender.page + "Page"].activate && typeof(this.$.Book.$[inSender.page + "Page"].activate) === "function"){
					this.$.Book.$[inSender.page + "Page"].activate(inSender);
				}
				//Ensure that the header is showing the right tab active:
				this.parent.$.header.deactiveActive(inSender.page);
			}else{
				this.$.Book.pageName(inSender + "Page");
				//Because it's lazy, we have to call methods through the book.
				if(this.$.Book.$[inSender + "Page"].activate && typeof(this.$.Book.$[inSender + "Page"].activate) === "function"){
					this.$.Book.$[inSender + "Page"].activate();
				}
				this.parent.$.header.deactiveActive(inSender);
			}
		}else{
			return false;
		}
	},
	
	handleFriendClick: function(inSender, inData){
		this.pageChange({page: "profile", data: {username: inData}});
	},
	
	create: function(){
		this.inherited(arguments);
	}
});