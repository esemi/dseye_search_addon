'use strict';

/*
 * const replaced to var for netbeans 7.3 parser (https://netbeans.org/bugzilla/show_bug.cgi?id=226477)
 */
var self = require("sdk/self");

var myContextMenu = require("./context-menu.js");
var myWidet = require("./widget.js");
var myStat = require("./stat.js");
var myPrefs = require("sdk/simple-prefs").prefs;

//main function
exports.main = function(options, callbacks)
{
	myWidet.create();
	myContextMenu.create();

	if(myPrefs['allowStatSend']){
		myStat.send(options.loadReason);
	}
};

//@FIXME stat not sended with status 0 (it not allowed ??)
exports.onUnload = function (reason) {
	if(myPrefs['allowStatSend']){
		myStat.send(reason);
	}
};