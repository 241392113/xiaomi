$('#logo').hover(function(){
		
		$('#logo img').eq(0).stop().animate({
			'left':'56px'
		},400)
		$('#logo img').eq(1).stop().animate({
			'left':0
		},400)
	},function(){
		$('#logo img').eq(0).stop().animate({
			'left':0
		},400)
		$('#logo img').eq(1).stop().animate({
			'left':'-56px'
		},400)
	})
	
	$('#logo img').eq(1).click(function(){
		location.href = '../小米前端-主页面/前端界面.html'
	})