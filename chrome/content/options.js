//require settings.js

function save_option() {
	//work only with checkbox
	if(this.type === "checkbox"){
		SETTINGS.set(this.name, this.checked);

		chrome[runtimeOrExtension].sendMessage({
			event: "optionsChanged"
		});

		printMessage('Сохранено');
	}
}

function restore_options() {
	var props = document.getElementsByTagName('input');
	for(var i=0; i<props.length; i++)
	{
		//work only with checkbox
		if(props[i].type === "checkbox"){
			props[i].checked = SETTINGS.get(props[i].name);
		}
	}
}

function printMessage(text)
{
	var status = document.getElementById('status');
	status.innerHTML = text;
	setTimeout(function() {
		status.innerHTML = "";
	}, 750);

}

//first reset options from storage
document.addEventListener('DOMContentLoaded', restore_options);

//change option events
var options = document.querySelectorAll('input');
for(var i=0; i<options.length; i++)
{
	options[i].addEventListener('change', save_option);
}