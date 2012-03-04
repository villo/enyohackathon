enyo.kind({
	name: "body",
	kind: "Control",
	events: {
		onLoggedIn: ""
	},
	
	components: [
		{classes: "container", components: [
			{kind: "Book", name: "Book", components: [
				{kind: "chatPage", name: "chatPage", lazy: false}
			]},
			//This isn't part of our "book" because we want it to show above the content.
			{kind: "loginPage", name: "loginPage", onLoggedIn: "bubbleLogin"},
			
			{kind: "footer"}
		]}
	],
	
	bubbleLogin: function(){
		this.bubble("onLoggedIn");
	},
	
	create: function(){
		this.inherited(arguments);
	}
});