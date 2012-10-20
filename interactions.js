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
			$("#key"+keymapper[e.keyCode].toUpperCase()).css({    
				'float': 'left',
			    'margin': '4.5px',
			    'width': '90px',
			    'height': '90px',
			    'background-color': '#ccd1db',
			    'border-color': '#60769c',
			    'border-radius': '6.3px',
			    '-moz-border-radius': '6.3px',
			    '-webkit-border-radius': '6.3px',
			    'border-style': 'solid',
			    'border-width': '1pt',
			 });

      var isObama = true;
      if (isObama) {
        $('#facediv').css({"color": '#00FF00'});
      } else {
        $('#facediv').css({"color": '#00FFFF'});
      }
;
      $('#facediv').css({opacity: '1.0'});
      $('#facediv').animate({opacity: '0.0'});
      

		}
	});

}
