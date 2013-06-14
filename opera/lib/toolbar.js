var TOOLBAR = function(){
	this._button =  null;
};

TOOLBAR.prototype.createButton = function()
{
	console.log('widget create call');

	this._button = opera.contexts.toolbar.createItem({
		"title": widget.name,
		"icon": 'i/18.png',
		"onclick": function() {
			opera.extension.tabs.create({
				"url": widget.preferences.getItem('about_url'),
				"focused": true
			});
		}
	});

	opera.contexts.toolbar.addItem(this._button);
};