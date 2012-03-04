enyo.kind({
	name: "loginPage",
	kind: "Control",
	events: {
		onLoggedIn: ""
	},
	components: [
		{name: "loginModal", classes: "modal fade", components: [
			{classes: "modal-header", components: [
				{tag: "a", classes: "btn pull-right", content: "Create an Account", onclick: "switchToRegister"},
				{tag: "h3", content: "Login to Villo"},
			]},
			{classes: "modal-body", components: [
				{classes: "form-horizontal", components: [
					{classes: "control-group", name: "loginControlGroup1", components: [
						{tag: "label", classes: "control-label", content: "Username"},
						{classes: "controls", components:[
							{name: "loginUsername", tag: "input", classes: "input", attributes: {"type": "text"}}
						]},
					]},
					{classes: "control-group", name: "loginControlGroup2", components: [
						{tag: "label", classes: "control-label", content: "Password"},
						{classes: "controls", components:[
							{name: "loginPassword", tag: "input", classes: "input", attributes: {"type": "password"}, onkeypress: "checkLoginFormSubmit"}
						]},
					]}
				]}
			]},
			{classes: "modal-footer", components: [
				{tag: "a", classes: "btn btn-primary", name: "loginButton", content: "Login", onclick: "handleLogin", attributes: {"data-loading-text": "Logging in..."}}
			]}
		]},
		{name: "registerModal", classes: "modal fade", components: [
			{classes: "modal-header", components: [
				{tag: "a", classes: "btn pull-right", content: "Log in", onclick: "switchToLogin"},
				{tag: "h3", content: "Create a new Villo Account"},
			]},
			{classes: "modal-body", components: [
				{classes: "form-horizontal", components: [
					{classes: "control-group", name: "registerControlGroup1", components: [
						{tag: "label", classes: "control-label", content: "Username"},
						{classes: "controls", components:[
							{tag: "input", name: "registerUsername", classes: "input", attributes: {"type": "text"}}
						]},
					]},
					{classes: "control-group", name: "registerControlGroup2", components: [
						{tag: "label", classes: "control-label", content: "Email"},
						{classes: "controls", components:[
							{tag: "input", name: "registerEmail", classes: "input", attributes: {"type": "email"}}
						]},
					]},
					{classes: "control-group", name: "registerControlGroup3", components: [
						{tag: "label", classes: "control-label", content: "Password"},
						{classes: "controls", components:[
							{tag: "input", name: "registerPassword", classes: "input", attributes: {"type": "password"}}
						]},
					]},
					{classes: "control-group", name: "registerControlGroup4", components: [
						{tag: "label", classes: "control-label", content: "Confirm Password"},
						{classes: "controls", components:[
							{tag: "input", name: "registerConfirmPassword", classes: "input", attributes: {"type": "password"}, onkeypress: "checkRegisterFormSubmit"}
						]},
					]}
				]}
			]},
			{classes: "modal-footer", components: [
				{tag: "a", name: "registerButton", classes: "btn btn-primary", content: "Register", onclick: "handleRegister", attributes: {"data-loading-text": "Creating account..."}}
			]}
		]},
	],
	
	create: function(){
		this.inherited(arguments);
	},
	
	
	checkLoginFormSubmit: function(inSender, inResponse){
		if(inResponse.keyCode === 13){
			this.handleLogin();
		}
	},
	
	checkRegisterFormSubmit: function(inSender, inResponse){
		if(inResponse.keyCode === 13){
			this.handleRegister();
		}
	},
	
	handleLogin: function(){
		$("#" + this.$.loginButton.id).button("loading");
		this.$.loginControlGroup1.removeClass("error");
		this.$.loginControlGroup2.removeClass("error");
		this.$.loginUsername.hasNode();
		this.$.loginPassword.hasNode();
		console.log(this.$.loginUsername)
		villo.user.login({
			username: this.$.loginUsername.node.value,
			password: this.$.loginPassword.node.value,
		}, enyo.bind(this, function(inSender){
			$("#" + this.$.loginButton.id).button("reset");
			if(inSender === true){
				this.hideLoginModal();
				this.hideRegisterModal();
				this.loggedIn();
			}else{
				//No dice
				this.$.loginControlGroup1.addClass("error");
				this.$.loginControlGroup2.addClass("error");
			}
		}))
	},
	
	handleRegister: function(){
		$("#" + this.$.registerButton.id).button("loading");
		
		this.$.registerControlGroup1.removeClass("error");
		this.$.registerControlGroup2.removeClass("error");
		this.$.registerControlGroup3.removeClass("error");
		this.$.registerControlGroup4.removeClass("error");
		
		this.$.registerUsername.hasNode();
		this.$.registerEmail.hasNode();
		this.$.registerPassword.hasNode();
		this.$.registerConfirmPassword.hasNode();
		
		console.log(this.$.loginUsername)
		villo.user.register({
			username: this.$.registerUsername.node.value,
			password: this.$.registerPassword.node.value,
			password_confirm: this.$.registerConfirmPassword.node.value,
			email: this.$.registerEmail.node.value
		}, enyo.bind(this, function(inSender){
			$("#" + this.$.registerButton.id).button("reset");
			if(inSender === true){
				this.hideLoginModal();
				this.hideRegisterModal();
				this.loggedIn();
			}else{
				//No dice
				this.$.registerControlGroup1.addClass("error");
				this.$.registerControlGroup2.addClass("error");
				this.$.registerControlGroup3.addClass("error");
				this.$.registerControlGroup4.addClass("error");
			}
		}))
	},
	
	loggedIn: function(){
		this.bubble("onLoggedIn");
	},
	
	showLoginModal: function(){
		$('#' + this.$.loginModal.id).modal({
			keyboard: false,
			backdrop: "static"
		});
		$('#' + this.$.loginModal.id).modal('show');
	},
	
	hideLoginModal: function(){
		$('#' + this.$.loginModal.id).modal('hide');
	},
	
	showRegisterModal: function(){
		$('#' + this.$.registerModal.id).modal({
			keyboard: false,
			backdrop: "static"
		});
		$('#' + this.$.registerModal.id).modal('show');
	},
	
	hideRegisterModal: function(){
		$('#' + this.$.registerModal.id).modal('hide');
	},
	
	switchToRegister: function(){
		this.hideLoginModal();
		this.showRegisterModal();
	},
	
	switchToLogin: function(){
		this.hideRegisterModal();
		this.showLoginModal();
	}
});

