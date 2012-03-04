enyo.kind({
	name: "Alert",
	kind: "Control",
	published: {
		//Supports info, error, and success.
		type: "",
		//If you don't define components, it will try to render and content you pass it.
		content: "",
		//Set the title of the alert
		title: "",
		//Remove the alert when you close it.
		clearOnClose: false
	},
	events: {
		onClose: ""
	},
	components: [
		{classes: "alert fade in", name: "theAlert", components: [
			{tag: "a", classes: "close", content: "&times;", attributes: {"data-dismiss": "alert"}},
			{tag: "h4", name: "header", classes: "alert-heading", content: ""},
			{name: "client"},
		]}
	],
	create: function(){
		this.inherited(arguments);
		
		if(this.$.client.children.length <= 0){
			this.$.client.setContent(this.content);
		}
		
		this.$.header.setContent(this.title);
		
		if(this.type !== ""){
			this.$.theAlert.addClass("alert-" + this.type);
		}
	},
	rendered: function(){
		this.inherited(arguments);
		$("#" + this.$.theAlert.id).bind('closed', enyo.bind(this, function () {
			if(this.clearOnClose === true){
				this.destroy();
			}
		}));
	},
	//We strap on an "x" to close them, but they can call this to manually close it.
	close: function(){
		$("#" + this.$.theAlert.id).alert("close");
	}
})
