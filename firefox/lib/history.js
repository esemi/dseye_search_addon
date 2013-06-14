var SIMPLE_STORAGE = require("sdk/simple-storage");

var myConfig = require("./config.js").config;

exports.add = addToHistory;
exports.getAll = getHistory;

//initiated empty storage for search history
if( typeof(SIMPLE_STORAGE.storage.historySearch) === "undefined" )
{
	console.log('history array not found and initiated now');
	SIMPLE_STORAGE.storage.historySearch = [];
}
var searchHistory = SIMPLE_STORAGE.storage.historySearch;

function addToHistory(term)
{
	console.log('add term to search history');
	searchHistory.push({
		'date': new Date(),
		'term': term});
}

function getHistory()
{
	return searchHistory;
}

function clearHistoryToQuota()
{
	console.log('history quota cleaner call');
	console.log('current quota', SIMPLE_STORAGE.quotaUsage, 'factor', myConfig.history_quota_percent);
	while(SIMPLE_STORAGE.quotaUsage > myConfig.history_quota_percent && searchHistory.length > 0)
	{
		searchHistory.shift();
	}
	console.log('history quota cleaner success', 'now quota is', SIMPLE_STORAGE.quotaUsage);
}

SIMPLE_STORAGE.on("OverQuota", function(){
	clearHistoryToQuota();
});
