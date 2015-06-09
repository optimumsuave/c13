$(document).ready(function(){


	$(window).scroll(function(){
		var top = $(document).scrollTop();
		if(top > 200){
			$(".popout-outer").addClass('out');
		} else {
			$(".popout-outer").removeClass('out');
		}



	});
	function resizeEvent(){
	}
	resizeEvent();
	$(window).resize(function(){
		resizeEvent();
	});

	// var n = ($(".splash .shell").width()-80)/2;
	var n = 64;
	var p = 0;

	for(var i=0;i<n;i++){
		var op = 0.3 * (p+1);
		var block = $("<div class='eq-block'></div>").appendTo($(".eq"));
		block.css({
			opacity: op
		})
		p++;
		if(p == 3){
			p = 0;
		}
	}
	var blocks = $('.eq-block');
	var t = 0;

	function eqshift(){

		blocks.each(function(index, b){


			var h = 32+32*Math.sin(4*(t/100)+(index*2)); // cool 3 waves
			// var h = 64+64*Math.sin(2*(t/100)+(index/19)); // 
			// console.log(h, t);
			// console.log(a,h);
			$(this).css({
				height: h+10
			});
		});
		t++;
	}
	setTimeout(function(){
		setInterval(eqshift, 40);
	}, 7000);

	var properties = ["background", "border", "width", "height", "border-radius", "opacity", "transform", "transition"];

	var pressure = -45;

	function fire(words){
		var pieces = words.split(":");
		var pos = properties.indexOf(pieces[0]);
		if(pos != -1){
			prop = pieces[0];
			value = pieces[1];
			console.log(prop, value);
			setTimeout(function(){
				$(".box").css(prop, value);
			}, 100);
		}

		for(var i=0;i<words.length;i++) {
			var letter = $("<div class='letter'>"+words[i]+"</div>").appendTo($(".piston-right"));
			var rot = Math.round(Math.random()*360);

			letter.css({
				left: $(".piston-tube").offset().left+$(".piston-tube").width(),
				top: $(".piston-tube").offset().top+$(".piston-tube").height()/3,
				transform: 'rotate('+rot+'deg)',
			});
			letter.animate({
				left: $("section.splash .shell").width()+$("section.splash .shell").offset().left,
				marginTop: Math.random()*300-150,
			}, Math.random()*300+100);
			pressure-=5;
		}
	}



	$('.piston-tube input').keypress(function (e) {
		if (e.which == 13) {
			fire($(this).val());
			$(this).val("");
		}
	});

	setInterval(function(){
		if(pressure < 45) {
			pressure++;
		}
		if(pressure < -45) {
			pressure = -45;
		}
		$(".piston-needle").css({transform: 'rotate('+pressure+'deg)'})
	}, 40);


	$(".piston-tube input").focus();

	$(".piston-tube input").val("");

	var tubeval = "";
	var d = 0;
	var k = 0;
	var sample = "background: red";

	function changeInput(){
		if(k<sample.length){
			tubeval+=sample[k];
			$(".piston-tube input").val(tubeval);
			k++;
		} else {
			setTimeout(function(){
				fire($(".piston-tube input").val());
				$(".piston-tube input").val("");
			}, 1500);
		}
	}

	setTimeout(function(){
		for(var j=0;j<sample.length+1;j++){
			setTimeout(changeInput, d);
			d+=Math.round(Math.random()*140);
		}
	}, 6000);


});