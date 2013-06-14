var self = require("sdk/self");
var TABS = require("sdk/tabs");
var WIDGET = require("sdk/widget");

var myConfig = require("./config.js").config;

exports.create = makeMainWidget;

function makeMainWidget()
{
	console.log('create widget call');
	WIDGET.Widget({
		id: "dseyeWidget",
		label: "DSeye",
		contentURL: self.data.url("i/16.png"),
		onClick: function() {
			TABS.open(myConfig.about_url);
		}
	});
}

