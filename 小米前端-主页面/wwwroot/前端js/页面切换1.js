var sec1 = document.querySelectorAll('#accessories section');
var as1 = document.querySelectorAll('.accessoriesNav a');


var index1=0;
for(var i=0;i<as1.length;i++){
	as1[i].addEventListener('mouseover',function(){
		as1[index1].className = '';
		this.className = 'matchNavA';
		sec1[index1].style.display = 'none';
		index1 = Array.from(as1).indexOf(this);
		sec1[index1].style.display = 'block';
	});
}