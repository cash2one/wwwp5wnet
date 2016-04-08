function setTab(name,cursel,n){ 
for(i=1;i<=n;i++){ 
var menu=document.getElementById(name+i); 
var con=document.getElementById("con_"+name+"_"+i); 
menu.className=i==cursel?"hover":""; 
con.style.display=i==cursel?"block":"none"; 
} 
} 

$(document).ready(function() {	
	$(".mag-content").jCarouselLite({
		auto: 3500,
		speed: 800,
		visible: 7,
		scroll: 3,
		btnNext: "#mag-arrow-next",
        btnPrev: "#mag-arrow-prev"
	});
});