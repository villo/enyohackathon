/*
 * TODO: Add in x-button published prop
 * Idea for settings: 
 * 		Use the left-hand side icon-driven navigation
 */

enyo.kind({
	name: "ModalHeader",
	kind: "Control",
	published: {
		content: "",
		closeButton: false
	},
	components: [
		{classes: "modal-header", name: "theHeader", components: [
			{tag: "a", name: "closeButton", classes: "close", attributes: {"data-dismiss": "modal"}, content: "&times;", showing: false},
			{name: "client"},
		]},
	],
	create: function(){
		this.inherited(arguments);
		this.$.closeButton.setShowing(this.closeButton);
		if(this.$.client.children.length <= 0){
			this.$.theHeader.createComponent({
				tag: "h3", 
				content: this.content
			});
		}
	}
});

enyo.kind({
	name: "ModalFooter",
	kind: "Control",
	published: {
		content: ""
	},
	components: [
		{classes: "modal-footer", name: "theFooter", components: [
			{name: "client"},
		]},
	],
	create: function(){
		this.inherited(arguments);
		if(this.$.client.children.length <= 0){
			this.$.client.setContent(this.content);
		}
	}
});

enyo.kind({
	name: "ModalBody",
	kind: "Control",
	published: {
		content: ""
	},
	components: [
		{classes: "modal-body", name: "theBody", components: [
			{name: "client"},
		]},
	],
	create: function(){
		this.inherited(arguments);
		if(this.$.client.children.length <= 0){
			this.$.client.setContent(this.content);
		}
	}
});

enyo.kind({
	name: "Modal",
	kind: "Control",
	published: {
		//Allow the escape key to close the dialog.
		keyboard: false,
		//Clicking the background dismisses the modal.
		background: true
	},
	components: [
		{name: "theModal", classes: "modal fade", components: [
			{name: "client"}
		]}
	],
	
	create: function(){
		this.inherited(arguments);
	},
	
	initComponents: function(){
		//If they don't have a header or footer, wrap it all in body styling.
		var usesOtherKinds = false;
		for(x in this.components){
			if(this.components.hasOwnProperty(x)){
				if(this.components[x].kind && this.components[x].kind === "ModalHeader" || this.components[x].kind === "ModalFooter"){
					usesOtherKinds = true;
				}else{
				}
			}
		}
		this.inherited(arguments);
		if(usesOtherKinds === false){
			this.$.client.addClass("modal-body")
		}
	},
	
	show: function(){
		if(this.background === false){
			var background = "static";
		}else if(this.background === "hide"){
			var background = false;
		}else{
			var background = true;
		}
		$('#' + this.$.theModal.id).modal({
			keyboard: this.keyboard,
			backdrop: background
		});
		$('#' + this.$.theModal.id).modal('show');
	},
	
	hide: function(){
		$('#' + this.$.theModal.id).modal('hide');
	},
});

