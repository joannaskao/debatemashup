$(document).ready(function(){

	$('.keyboardKey').click(function(e){
		$(this).keypress(function() {
			alert("Handler for .keypress() called.");
		});
		// console.log(e)
		// $(this).css({'background':'pink'})	
	});


});