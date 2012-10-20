function init_interactions(){

	$(document).keydown(function(e){
		if (e.keyCode in keymapper){
			console.log(keymapper[e.keyCode])
			$("#key"+keymapper[e.keyCode].toUpperCase()).css({'background': 'pink'})
		}
	});

	$(document).keyup(function(e){
		if (e.keyCode in keymapper){
			console.log(keymapper[e.keyCode])
			$("#key"+keymapper[e.keyCode].toUpperCase()).css({'background': 'blue'})
		}
	});

}