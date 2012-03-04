enyo.Scroller.forceTouchScrolling = !enyo.Scroller.hasTouchScrolling();

enyo.kind({
	name: "chatPage",
	kind: "Page",
	rooms: ["general", "developers", "user"],
	room: "general",
	components: [
		{classes: "row", components: [
			{classes: "span4", components: [
				{classes: "well", style: "padding: 8px 0;", components: [
					{tag: "ul", classes: "nav nav-list", components: [
						{tag: "li", classes: "nav-header", content: "Hackathon Rooms"},
						{kind: "roomListItem", name: "general", content: "General Chat", active: true, onRoomChange: "roomChange"},
						{kind: "roomListItem", name: "developers", content: "Developers", active: false, onRoomChange: "roomChange"},
						{kind: "roomListItem", name: "user", content: "User Chat", active: false, onRoomChange: "roomChange"},
					]},
				]}
			]},
			{classes: "span8", components: [
				{classes: "well", name: "messages", style: "height: 400px; overflow: auto;", components: [
				]},
				{tag: "input", name: "theInput", classes: "span8", attributes: {"placeholder": "Type your message and press enter to send..."}, onkeypress: "checkEnter"},
				{classes: "pull-right", components: [
					{classes: "btn btn-primary", content: "Send", onclick: "sendMessage"}
				]}
			]},
		]},
	],
	activate: function(){
		//Join the room that is already defined:
		villo.chat.join({
			room: this.room,
			callback: enyo.bind(this, this.gotMessage)
		});
		
		villo.chat.history({
			room: this.room,
			limit: 5,
			callback: enyo.bind(this, this.gotHistory)
		})
	},
	gotHistory: function(inSender){
		for(var x in inSender){
			if(inSender.hasOwnProperty(x)){
				this.gotMessage(inSender[x]);
			}
		}
	},
	gotMessage: function(inSender){
		this.$.messages.createComponent({kind: "chatMessage", username: inSender.username, content: inSender.message});
		this.$.messages.render();
	},
	checkEnter: function(inSender, inEvent){
		if(inEvent.keyCode === 13){
			this.sendMessage();
		}
	},
	sendMessage: function(){
		//Set up dom access.
		this.$.theInput.hasNode();
		//Get the value:
		var inputValue = this.$.theInput.node.value;
		//Check to make sure it's not empty or spaces:
		if(inputValue !== "" && inputValue.replace(/ /gi, "") !== ""){
			//Get rid of content in the textbox:
			this.$.theInput.node.value = "";
			//Send message via Villo:
			villo.chat.send({
				room: this.room,
				message: inputValue
			});
		}
	},
	roomChange: function(inSender){
		//This performs the visual effect of changing rooms:
		for(x in this.rooms){
			if(this.rooms.hasOwnProperty(x)){
				if(inSender.name !== this.rooms[x]){
					this.$[this.rooms[x]].setActive(false);
				}
			}
		}
	}
});

enyo.kind({
	name: "roomListItem",
	kind: "Control",
	tag: "li",
	events: {
		onRoomChange: ""
	},
	handlers: {
		onclick: "changeActiveAndBubble"
	},
	published: {
		content: "",
		active: false
	},
	components: [
		{tag: "a", name: "theLink"}
	],
	create: function(){
		this.inherited(arguments);
		this.$.theLink.setContent(this.content);
		if(this.active === true){
			this.addClass("active");
		}
	},
	changeActiveAndBubble: function(){
		this.addClass("active");
		this.bubble("onRoomChange");
	},
	setActive: function(inSender){
		if(inSender === true){
			this.addClass("active");
		}else{
			this.removeClass("active");
		}
	}
});

enyo.kind({
	name: "chatMessage",
	kind: "Control",
	published: {
		username: "Guest",
		content: "Hello!"
	},
	components: [
		{classes: "pull-left", components: [
			{classes: "thumbnail", style: "height: 32px; width: 32px; margin-right: 10px;"},
		]},
		{classes: "", components: [
			{tag: "span", name: "username", classes: "label", content: "Kesne"},
			{content: "How is everybody doing today?", name: "message"}
		]},
		//Line break to keep things from breaking
		{content: "<br />"}
	],
	create: function(){
		this.inherited(arguments);
		//Update fields:
		this.$.username.setContent(this.username);
		if(this.username.toLowerCase() === villo.user.getUsername().toLowerCase()){
			this.$.username.addClass("label-info");
		}
		this.$.message.setContent(this.content);
	}
})
