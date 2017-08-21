
$('#back').click(function(){
	location.href = 'login.html'
})

$('form').submit(function(event){
	event.preventDefault();
	
	var passwords = $('input[type=password]').map(function(){
		return $(this).val();
	})
	if(passwords[0] != passwords[1]){
		$('.modal-body').text('输入的密码不一致,请重新输入..');
		$('#myModal').modal('show');
		return;
	}
	
	var data = $(this).serialize();
	
	$.post('/register',data,function(resData){
		$('.modal-body').text(resData.message);
		$('#myModal').modal('show').on('hide.bs.modal',function(){
			if(resData.code == 3){
				location.href = 'login.html';
			}
		})
	})
	
})








