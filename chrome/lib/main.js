function initStatEvents()
{
	chrome.runtime.onStartup.addListener(function(){ STAT.send('startup'); });
	chrome.runtime.onInstalled.addListener(function(details){ STAT.send(details.reason); });
	chrome.runtime.onSuspend.addListener(function(){ STAT.send('suspend'); });
};

//main function
(function()
{
	console.log('main function call');
	var cm = new CONTEXT_MENU();
	cm.createSearchItem();
	cm.initListeners();

	var toolbar = new TOOLBAR();
	toolbar.initListeners();

	initStatEvents();
})();
