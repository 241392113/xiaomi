var sec2 = document.querySelectorAll('#ambitus section');
var as2 = document.querySelectorAll('.ambitusNav a');


var index2=0;
for(var i=0;i<as2.length;i++){
	as2[i].addEventListener('mouseover',function(){
		as2[index2].className = '';
		this.className = 'matchNavA';
		sec2[index2].style.display = 'none';
		index2 = Array.from(as2).indexOf(this);
		sec2[index2].style.display = 'block';
	});
}