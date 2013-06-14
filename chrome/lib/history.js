//require config.js
//require settings.js

var HISTORY = {
	"_key": "history",

	"add": function(term){
		console.log('history add call');
		var current = SETTINGS.get(this._key);

		if( current.length > CONFIG.get('history_quota_count') ){
			this.clearHistoryToQuota();
		}

		current.push({ 'date': new Date(), 'term': term });

		try{
			SETTINGS.set(this._key, current);
		}catch(e){
			this.clearHistoryToQuota();
		}
	},

	"getAll": function(){
		console.log('history getAll call');
		return SETTINGS.get(this._key);
	},

	"clearHistoryToQuota": function(){
		console.log('history clear call');
		var current = SETTINGS.get(this._key);
		if( current.length > CONFIG.get('history_quota_count') )
		{
			console.log('clear many history rows ' + current.length);
			var newCurrent = current.slice(-CONFIG.get('history_quota_count'));
			SETTINGS.set(this._key, newCurrent);
		}else{
			console.log('clear all history ');
			SETTINGS.set(this._key, []);
		}
	}
};