
$('#register').click(function(){
	location.href = 'register.html'
})

$('form').submit(function(event){
	event.preventDefault();
	var data = $(this).serialize()
	$.post('/login',data,function(resData){
		$('.modal-body').text(resData.message);
		$('#myModal').modal('show').on('hide.bs.modal',function(){
			if(resData.code == 3){
				location.href = 'index.html';
			}
		})
	})
})

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
		location.href = 'index.html'
	})

