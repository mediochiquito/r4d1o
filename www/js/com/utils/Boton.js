
function Boton($element, $callback, $callback_over, $callback_out){

	if(typeof($callback_over) == 'undefined') $callback_over = function(){};
	if(typeof($callback_out) == 'undefined')  $callback_out = function(){};

	var self = this;
	var habil = true;
	this.main = $($element);
	$(this.main).css("cursor", "pointer");

	if($(this.main).attr('data-btn-fx') == 'txt')
		$(this.main).addClass("BotonTxt");

	if($(this.main).attr('data-btn-fx') == 'ripple')
		$($element).prepend("<div class='btn-ripple'></div>");

	$(this.main).bind("touchend", do_mouseout);
	$(this.main).bind("touchstart", do_mouseover);
	$(this.main).bind("touchstart", do_click);

	function do_click(evt){

		try{
			navigator.vibrate(250);
		}catch(e){}

		if(habil) {
			$callback(evt);
		}
	}

	function do_mouseover(){

		if(habil){

			if($(self.main).attr('data-btn-fx') == 'ripple'){
				$($element).find('.btn-ripple').addClass('btn-ripple-hover');
				$($element).addClass('black');
			}

			if($(self.main).attr('data-btn-fx') == 'txt')
				$($element).addClass('BotonTxt-over');

			if($(self.main).attr('data-btn-fx') == 'zoom')	
				$($element).addClass('btn-zoom-hover');

			$callback_over();

		}

	}
	
	function do_mouseout(){
		
		if(habil){

			$($element).find('.btn-ripple').removeClass('btn-ripple-hover');
			$($element).find('.btn-ripple-artista').removeClass('btn-ripple-hover');
			$($element).removeClass('BotonTxt-over');
			$($element).removeClass('btn-zoom-hover');
			$($element).removeClass('black');

			$callback_out();
		}

	}


}