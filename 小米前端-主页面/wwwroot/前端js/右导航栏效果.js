
var navLeft = document.querySelectorAll('#nav-left li');
var rightNav = document.getElementsByClassName('rightNav');

var index=0;
for(var i=0;i<navLeft.length;i++){
	navLeft[i].addEventListener('mouseover',function(){
		rightNav[index].style.display = 'none';
		navLeft[index].style.backgroundColor = 'gray'
		index = Array.from(navLeft).indexOf(this);
		rightNav[index].style.display = 'block';
		navLeft[index].style.backgroundColor = 'orangered'
	});
	
	$('.rightNav').eq(i).mouseleave(function(){
		rightNav[index].style.display = 'none';
		navLeft[index].style.backgroundColor = 'gray'
	})
}
$('#carousel').mouseleave(function(){
	rightNav[index].style.display = 'none';
	navLeft[index].style.backgroundColor = 'gray'
})