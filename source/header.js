enyo.kind({
	name: "header",
	kind: "Control",
	components: [
		{classes: "navbar navbar-fixed-top", components: [
			{classes: "navbar-inner", components: [
				{classes: "container", components: [
					{tag: "a", classes: "btn btn-navbar", attributes: {"data-toggle": "collapse", "data-target": ".nav-collapse"}, components: [
						{tag: "span", classes: "icon-bar"},
						{tag: "span", classes: "icon-bar"},
						{tag: "span", classes: "icon-bar"}
					]},
					{tag: "a", page: "home", classes: "brand", content: "Villo Hackathon"},
					{classes: "nav-collapse", components: [
						{tag: "ul", name: "nav", classes: "nav", components: [
							{tag: "li", classes: "active", components: [
								{tag: "a", name: "home", content: "Chat"},
							]}
						]},						
						
						{tag: "ul", classes: "nav pull-right", components: [
							{tag: "li", classes: "dropdown", components: [
								{tag: "a", classes: "dropdown-toggle", attributes: {"href": "#", "data-toggle": "dropdown"}, components: [
									{tag: "span", name: "headerUsername", content: ""},
									{tag: "b", classes: "caret"}
								]},
								{tag: "ul", classes: "dropdown-menu", components:[
									{tag: "li", components: [
										{tag: "a", attributes: {"href": "#"}, content: "Logout", action: "logout", onclick: "logout"}
									]},
								]}
							]},
							
						]}
					]}
				]}
			]}
		]}
	],
	
	//This function is called when the user if finally logged in, or when it's confirmed that they are.
	loggedIn: function(){
		this.$.headerUsername.setContent(villo.user.username);
	},
	
	logout: function(){
		if(villo.user.logout() === true){
			window.location = window.location;
		}else{
			//What happened?!
			window.location = window.location;
		}
	},
	
	rendered: function(){
		this.inherited(arguments);
	}
});