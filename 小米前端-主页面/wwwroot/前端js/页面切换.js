var sec = document.querySelectorAll('#match section');
var as = document.querySelectorAll('.matchNav a');


var index=0;
for(var i=0;i<as.length;i++){
	as[i].addEventListener('mouseover',function(){
		as[index].className = '';
		this.className = 'matchNavA';
		sec[index].style.display = 'none';
		index = Array.from(as).indexOf(this);
		sec[index].style.display = 'block';
	});
}
