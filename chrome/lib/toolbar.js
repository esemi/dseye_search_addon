//require config.js

var TOOLBAR = function(){};

TOOLBAR.prototype.clickCallback = function()
{
	console.log('toolbar click callback fire');
	chrome.tabs.create({
		"url": CONFIG.get('about_url'),
		"active": true
	});
};

TOOLBAR.prototype.initListeners = function()
{
	var self = this;

	//click callback
	chrome.browserAction.onClicked.addListener(function(tab) {
		self.clickCallback();
	});
};