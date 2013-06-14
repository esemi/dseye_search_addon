var HISTORY = {
	"_key": "history",

	"getContainer": function(){
		var container = JSON.parse(window.localStorage.getItem(this._key));
		if( container === null )
			container = [];
		return container;
	},

	"setContainer": function(cont){
		window.localStorage.setItem(this._key, JSON.stringify(cont));
	},

	"add": function(term){
		console.log('history add call', term);

		var current = this.getContainer();
		if( current.length > widget.preferences.getItem('history_quota_count') ){
			this.clearToQuota();
		}

		current.push({ 'date': new Date(), 'term': term });

		try{
			this.setContainer(current);
		}catch(e){
			this.clearToQuota();
		}
	},

	"clearToQuota": function(){
		console.log('history clear call');
		var current = this.getContainer();
		if( current.length > widget.preferences.getItem('history_quota_count') )
		{
			console.log('clear many history rows ' + current.length);
			var newCurrent = current.slice(-widget.preferences.getItem('history_quota_count'));
			this.setContainer(newCurrent);
		}else{
			console.log('clear all history ');
			this.setContainer([]);
		}
	}
};