var self = require("sdk/self");

var TABS = require("sdk/tabs");
var CONTEXT_MENU = require("sdk/context-menu");
var SIMPLE_PREFS = require("sdk/simple-prefs");

var myPrefs = SIMPLE_PREFS.prefs;
var myConfig = require("./config.js").config;
var myHistory = require("./history.js");

exports.create = makeContextMenu;
exports.reset = resetContextMenu;

var menu = null;

function makeContextMenu()
{
	console.log('create menu call');
	menu = CONTEXT_MENU.Item({
		label: 'Искать на DSeye.ru',
		context: [ CONTEXT_MENU.SelectionContext() ],
		image: self.data.url("i/16.png"),
		contentScriptFile: self.data.url('context-menu-actions.js'),
		onMessage: function(text) {
			TABS.open(myConfig.search_url.replace('[search-term]', require("sdk/querystring").escape(text)));
			if(myPrefs['enableSearchHistory']){
				myHistory.add(text);
			}
		}
	});

	if(myPrefs['onlyGameDomains'])
	{
		console.log('game urls context add');
		menu.context.add( CONTEXT_MENU.URLContext(myConfig.game_domains) );
	}
};

function resetContextMenu()
{
	console.log('reset menu call');
	if( menu !== null )
		menu.destroy();
	makeContextMenu();
}

SIMPLE_PREFS.on("onlyGameDomains", resetContextMenu);