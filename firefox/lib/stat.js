var self = require("sdk/self");

var REQUEST = require("sdk/request");

var myConfig = require("./config.js").config;
var myHistory = require("./history.js");

exports.send = sendAddonStat;

function sendAddonStat(reason)
{
	console.log('stat send message', reason);
	REQUEST.Request({
		url: myConfig['stat_url'],
		content: {
			action: reason,
			counter: myHistory.getAll().length
		}
	}).post();


}