
var username = $.cookie('username')

if(username){
	$('#user').text(username);
	$('#logout').css('display','inline-block');
	$('#register').css('display','none');
}else{
	$('#user').text('登录');
}

$('#logout').click(function(){
	$.get('/logout',function(resData){
		location.reload();
	})
})


$.get('/join',function(data){
	var arr = JSON.parse(data)
	
	var message = '';
	for(var i=0;i<arr.length;i++){
		var msg = arr[i];
		message += '<p>' + msg.content + '<span class="del">X</span></p>'
	}
	$('#shop').html(message);
	
	$('.del').click(function(){
		$(this).parent().hide();
	})
})



$('#top_3').mouseover(function(){
	$('#shop').slideDown();
});
$('#shop').mouseleave(function(){
	$('#shop').slideUp();
})
	







