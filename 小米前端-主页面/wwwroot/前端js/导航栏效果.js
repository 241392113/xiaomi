

var index=0;

for(var i=0;i<$('a[name]').length;i++){
	$('a[name]').eq(i).mouseover(function(){
		$('.xmPhone').eq(index).css('display','none')
		index = Array.from($('a[name]')).indexOf(this);
		$('.xmPhone').eq(index).stop().slideDown(300,function(){
			display:'block'
		})
	})
	
	$('.xmPhone').eq(i).mouseleave(function(){
		$('.xmPhone').eq(index).stop().slideUp(100,function(){
			display:'none'
		})
	})
	
}

console.log(($(window).width() - 1226)/2 +200)
$(document).mousemove(function(e){
	if(e.clientY < 80){
		$('.xmPhone').eq(index).stop().slideUp(100,function(){
			display:'none'
		})
	}
	if(e.clientX < ($(window).width() - 1226)/2 +257 && e.clientY < 100){
		$('.xmPhone').eq(index).stop().slideUp(100,function(){
			display:'none'
		})
	}
	if(e.clientX > ($(window).width() - 1226)/2 +760 && e.clientY < 100){
		$('.xmPhone').eq(index).stop().slideUp(100,function(){
			display:'none'
		})
	}
});

$(document).scroll(function(){
	$('.xmPhone').eq(index).css('display','none')
});






