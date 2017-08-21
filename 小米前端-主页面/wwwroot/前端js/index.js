
var username = $.cookie('username')
console.log(username)
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
		message += '<p style="color:white">' + msg.content + '</p>'
	}
	$('#shop').html(message);
})



$('#top_3').mouseover(function(){
	$('#shop').slideDown();
});
$('#top_3').mouseleave(function(){
	$('#shop').slideUp();
})
	

var availableTags = [
    "小米Note2","红米Note 4","红米Note 4X","红米手机4","小米5s","小米5s plus","小米Max","小米MIX","小米手机5","小米车载净化器"
]


$("#Scontent").autocomplete({
      source: availableTags
});


$('#ss').click(function(){
	if($('#Scontent').val() == "小米Note2"){
		$(this).attr('href','小米note-2/' + $('#Scontent').val() + '-概述.html')
	}
	else if($('#Scontent').val() == "小米车载净化器"){
		$(this).attr('href','小米车载净化器/' + $('#Scontent').val() + '.html')
	}
})





