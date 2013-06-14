
var CONTEXT_MENU = function(){
	this._searchMenuItem = null;
};

CONTEXT_MENU.prototype.prepareTerm = function(term){
	return term.replace(/^\s+|\s+$/g, '').substr(0,50);
};

CONTEXT_MENU.prototype.createSearchItem = function()
{
	console.log('create menu call');

	var prop = {
		"title": "Искать на DSeye.ru", //@TODO replace selection (?)
		"contexts": ['selection'],
		"icon": 'i/16.png'
	};

	//add optionaly game urls context
	if( widget.preferences.getItem('onlyGameDomains') === 'true' )
	{
		console.log('use game domains limit');
		prop["documentUrlPatterns"] = widget.preferences.getItem('game_domains').split('|');//@FIXME limit domain not working
	}

	this._searchMenuItem = opera.contexts.menu.createItem(prop);
	opera.contexts.menu.addItem(this._searchMenuItem);

	//search callback
	var self = this;
	this._searchMenuItem.onclick = function(info, tab){
		console.log('click menu event fire');
		self.searchCallback(info.selectionText);
	};
};

CONTEXT_MENU.prototype.initListeners = function()
{
	console.log('init menu listeners call');

	var self = this;
	//options changed callback
	window.addEventListener('storage', function(e){
		console.log('storage event fire');
		if( e.key ===  'onlyGameDomains' ){
			self.resetSearchItem();
		}
	}, false);
};

CONTEXT_MENU.prototype.resetSearchItem = function()
{
	console.log('reset menu call');
	if( this._searchMenuItem !== null )
		opera.contexts.menu.removeItem(0);
	this.createSearchItem();
};

CONTEXT_MENU.prototype.searchCallback = function(text)
{
	console.log('search callback call');
	var term = this.prepareTerm(text);
	opera.extension.tabs.create({
		"url": widget.preferences.getItem('search_url').replace('[search-term]', encodeURIComponent(term)),
		"focused": true
	});

	//add history if enabled
	if( widget.preferences.getItem("enableSearchHistory") === 'true' ){
		HISTORY.add(term);
	}
};
