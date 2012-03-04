enyo.kind({
	name: "body",
	kind: "Control",	
	components: [
		{classes: "container", components: [
			{kind: "Book", name: "Book", components: [
				{kind: "chatPage", name: "chatPage", lazy: false}
			]},
			//This isn't part of our "book" because we want it to show above the content.
			{kind: "loginPage", name: "loginPage"},
			
			{kind: "footer"}
		]}
	],
	
	loggedIn: function(){
		this.$.chatPage.activate();
	},
	
	create: function(){
		this.inherited(arguments);
	}
});