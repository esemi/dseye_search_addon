//require config.js
//require settings.js
//require history.js

var CONTEXT_MENU = function(){
	this._searchMenuId = null;
};

CONTEXT_MENU.prototype.prepareTerm = function(term){
	return term.replace(/^\s+|\s+$/g, '').substr(0,50);
};

CONTEXT_MENU.prototype.createSearchItem = function()
{
	console.log('create menu call');
	this._searchMenuId = chrome.contextMenus.create({
		"title": "Искать «%s» на DSeye.ru",
		"contexts": ['selection']}
	);

	//add optionaly game urls context
	if( SETTINGS.get("onlyGameDomains") === true )
	{
		chrome.contextMenus.update(this._searchMenuId, {
			"documentUrlPatterns": CONFIG.get('game_domains')
		});
	}
};

CONTEXT_MENU.prototype.resetSearchItem = function()
{
	console.log('reset menu call', this._searchMenuId);
	if( this._searchMenuId !== null )
		chrome.contextMenus.remove(this._searchMenuId);
	this.createSearchItem();
};

CONTEXT_MENU.prototype.searchCallback = function(text)
{
	console.log('search callback fire');
	var term = this.prepareTerm(text);
	chrome.tabs.create({
		"url": CONFIG.get('search_url').replace('[search-term]', encodeURIComponent(term)),
		"active": true
	});

	//add history if enabled
	if( SETTINGS.get("enableSearchHistory") === true ){
		HISTORY.add(term);
	}
};

//callback options change
CONTEXT_MENU.prototype.optionsChangedCallback = function()
{
	console.log('options change callback fire');
	this.resetSearchItem();
};

CONTEXT_MENU.prototype.initListeners = function()
{
	var self = this;

	//search callback
	chrome.contextMenus.onClicked.addListener(function(info, tab){
		self.searchCallback(info.selectionText);
	});

	//reset menu if options changed
	chrome[runtimeOrExtension].onMessage.addListener(function(request, sender, sendResponse){
		if (request.event === "optionsChanged"){
			self.optionsChangedCallback();
		}
	});
};