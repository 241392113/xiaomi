
	var isTrue = false;
	function star(){
		isTrue = !isTrue;
		if(isTrue){
			$('.star').eq(1).fadeOut(1000);
			$('.star').eq(0).fadeIn(1000);
		}
		else{
			$('.star').eq(0).fadeOut(1000)
			$('.star').eq(1).fadeIn(1000);
		}
	}

	var s = setInterval(star,3000)
	
	$('#starProduct').hover(function(){
		clearInterval(s);
	},function(){
		s=setInterval(star,3000)
	})
	

	

