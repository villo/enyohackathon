/*
 * Enyo 2.0 Book
 * 
 * Contains "Pages", which can be viewed on demand.
 */

enyo.kind({
	name: "Book",
	kind: "Control",
	published: {
		
	},
	create: function(){
		this.setOwner = this.owner;
		this.pane = null;
		this.lazy = [];
		//OP
		this.history = [];
		this.historyPane = null;
		this.inherited(arguments);
		
		/*
		 * Make all of the Pages invisible to start out with.
		 */
		for(x in this.getControls()){
			if(this.getControls().hasOwnProperty(x)){
				this.getControls()[x].hide();
			}
		}
		this._showPane(0);
	},
	initComponents: function(){
		var c = [];
		for(x in this.components){
			if(this.components.hasOwnProperty(x)){
				/*
				 * Check for lazy pages. If it's lazy, push it to a var. If it's not, then k
				 */
				if(this.components[x].lazy && this.components[x].lazy == true){
					this.lazy.push(this.components[x]);
				}else{
					c.push(this.components[x]);
				}
			}
		}
		this.components = c;
		this.inherited(arguments);
	},
	pageNumber: function(number){
		this._hidePane(this.pane);
		this._showPane(number);
	},
	pageName: function(name){
		/*
		 * Check for lazy pages.
		 */
		if(this._paneIsLazy(name)){
			//Check for already rendered lazy views
			this._hidePane(this.pane);
			this.createComponent(this._getLazyPane(name));
			this.$[name].owner = this.owner;
			this.$[name].render();
			this._showPane(this._getPageNumber(name));
			this._deleteLazyPane(name);
		}else{
			this._hidePane(this.pane);
			this._showPane(this._getPageNumber(name));
		}
	},
	
	back: function(){
		this._hidePane(this.pane);
		this._showPane(this.history[this.historyPane-1], true, this.historyPane-1);
	},
	next: function(){
		this._hidePane(this.pane);
		this._showPane(this.history[this.historyPane+1], true, this.historyPane+1);
	},
	
	_paneIsLazy: function(name){
		var lazy = false;
		for(x in this.lazy){
			if(this.lazy.hasOwnProperty(x)){
				if(this.lazy[x].name === name){
					lazy = true;
				}
			}
		}
		return lazy;
	},
	_getLazyPane: function(name){
		var lazy = [];
		for(x in this.lazy){
			if(this.lazy.hasOwnProperty(x)){
				if(this.lazy[x].name === name){
					lazy = this.lazy[x];
				}
			}
		}
		return lazy;
	},
	_deleteLazyPane: function(name){
		for(x in this.lazy){
			if(this.lazy.hasOwnProperty(x)){
				if(this.lazy[x].name === name){
					delete this.lazy[x];
				}
			}
		}
		return true;
	},
	_getPageNumber: function(name){
		var number = null;
		for(x in this.getControls()){
			if(this.getControls().hasOwnProperty(x)){
				if(this.getControls()[x].name === name){
					number = x;
				}
			}
		}
		return number;
	},
	_showPane: function(number, history, index){
		this.getControls()[number].show();
		this.pane = number;
		if(history !== true){
			this.history.push(this.pane);
			this.historyPane = this.history.length-1;
		}else{
			this.historyPane = index;
		}
	},
	_hidePane: function(number){
		this.getControls()[number].hide();
	}
});




/*
 * 
 * =======================================
 * 		This is a demo of Enyo Books
 * =======================================
 * 
 */
/*
enyo.kind({
	name: "BookTest",
	kind: "Control",
	components: [
		{tag: "button", onclick: "changeView", content: "1", view: 1},
		{tag: "button", onclick: "changeView", content: "2", view: 2},
		{tag: "button", onclick: "changeView", content: "3", view: 3},
		{tag: "button", onclick: "changeView", content: "4", view: 4},
		{tag: "button", onclick: "back", content: "Back"},
		{tag: "button", onclick: "next", content: "Next"},
		{tag: "button", onclick: "lazyView", content: "Lazy"},
		{kind: "Book", name: "Book", components: [
			{name: "view1", tag: "h1", content: "sorta works 1"},
			{name: "view2", tag: "h1", content: "sorta works 2"},
			{name: "view3", tag: "h1", content: "sorta works 3"},
			{name: "view4", tag: "h1", content: "sorta works 4"},
			//Lazy pages must be called by name:
			{kind: "testPage", name: "theLazyOne", lazy: true}
		]},
	],
	
	changeView: function(inSender){
		this.$.Book.pageName("view" + inSender.view);
	},
	
	back: function(){
		this.$.Book.back();
	},
	
	next: function(){
		this.$.Book.next();
	},
	
	lazyView: function(){
		this.$.Book.pageName("theLazyOne");
	}
});

enyo.kind({
	name: "testPage",
	kind: "Control",
	components: [
		{tag: "h1", content: "Hello there! This was loaded lazely."}
	],
	create: function(){
		this.inherited(arguments);
		console.log("Loaded the lazy page.");
	}
});
*/
