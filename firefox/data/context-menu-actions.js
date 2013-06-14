self.on("context", function(){
	var text = prepareTermForSearch(window.getSelection().toString());
	if( text.length > 15 )
		text = text.substr(0, 10) + '..';

	return 'Искать «' + text + '» на DSeye.ru';
});

self.on("click", function(){
	var text = prepareTermForSearch(window.getSelection().toString());
	console.log('test', text.length);
	self.postMessage(text);
});

function prepareTermForSearch(term)
{
	return term.replace(/^\s+|\s+$/g, '').substr(0,50);
}