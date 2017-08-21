

$(function(){
	
	$('main img').css('opacity','0');
	function waitLoad(){
		setTimeout(function(){
			$('main img').each(function(index){
				if($(window).height() + $(document).scrollTop() >= $(this).offset().top){
					$(this).animate({
						'opacity':1
					},800)
				}
			})
		},500)
	}
	
	$(document).on('scroll',waitLoad);
	$(window).on('resize',waitLoad);
})

