var CONFIG = {
	_prop: {
		"search_url": "http://dseye.ru/addon-api/search.html?term=[search-term]",
		"stat_url": "http://dseye.ru/addon-api/stat-add.html",
		"about_url": "http://dseye.ru/services/addon.html",
		"game_domains": ['*://*.dsga.me/*', '*://*.destinysphere.ru/*', '*://*.dseye.ru/*', '*://*.ds-game.ru/*', '*://*.ds-game.su/*', '*://*.destinysphere.de/*'],
		"history_quota_count": 100
	},

	get: function(name)
	{
		if( typeof this._prop[name] !== 'undefined' )
			return this._prop[name];
		else
			return false;
	}

};