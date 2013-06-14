//crunch for chrome 26/20-25 compability http://stackoverflow.com/questions/15718066/chrome-runtime-sendmessage-not-working-as-expected
var runtimeOrExtension = (chrome.runtime && chrome.runtime.sendMessage) ? 'runtime' : 'extension';

var SETTINGS = {
	"_default": {
		"onlyGameDomains": false,
		"enableSearchHistory": true,
		"allowStatSend": true,
		"history": []
	},

	"get": function(key){
		if( typeof localStorage[key] !== "undefined" ){
			return JSON.parse(localStorage[key]);
		}

		if( typeof this._default[key] !== "undefined" ){
			this.set(key, this._default);
			return this._default[key];
		}

		return ;
	},

	"set": function(key, val){
		localStorage[key] = JSON.stringify(val);
	}
};