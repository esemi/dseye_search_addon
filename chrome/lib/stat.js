//require config.js
//require history.js

var STAT = {
	"send": function(reason){
		if( SETTINGS.get("allowStatSend") === true ){
			console.log('stat send message', reason);
			var params = 'action=' + encodeURIComponent(reason) + '&counter=' + encodeURIComponent(HISTORY.getAll().length);

			var xhr = new XMLHttpRequest();
			xhr.open("POST", CONFIG.get('stat_url'), true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send(params);
		}
	}
};