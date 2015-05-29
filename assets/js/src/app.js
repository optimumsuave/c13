$(document).ready(function(){
	$(window).scroll(function(){
		var top = $(document).scrollTop();
		if(top > 200){
			$(".popout-outer").addClass('out');
		} else {
			$(".popout-outer").removeClass('out');
		}
	});
});