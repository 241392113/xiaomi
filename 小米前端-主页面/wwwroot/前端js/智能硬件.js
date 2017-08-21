

$('#intelligentHardware span a').hover(function(){
	var index = Array.from($('#intelligentHardware span a')).indexOf(this) - 2;
	$('.pj').eq(index).stop().animate({
		'bottom':'-10px'
	})
},function(){
	var index = Array.from($('#intelligentHardware span a')).indexOf(this) - 2;
	$('.pj').eq(index).stop().animate({
		'bottom':'-110px'
	})
})

