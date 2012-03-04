enyo.kind({
	name: "chatPage",
	kind: "Page",
	rooms: ["general", "developers", "user"],
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
				{classes: "well", components: [
					{kind: "chatMessage"},
					{kind: "chatMessage"},
					{kind: "chatMessage"},
					{kind: "chatMessage"},
					{kind: "chatMessage"}
				]},
				{tag: "input"}
			]},
		]},
	],
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
		username: "",
		content: ""
	},
	components: [
		{classes: "pull-left", components: [
			{classes: "thumbnail", style: "height: 32px; width: 32px; margin-right: 10px;"},
		]},
		{classes: "", components: [
			{tag: "span", classes: "label", content: "Kesne"},
			{content: "How is everybody doing today?"}
		]},
		//Line break to keep things from breaking
		{content: "<br />"}
	]
})
