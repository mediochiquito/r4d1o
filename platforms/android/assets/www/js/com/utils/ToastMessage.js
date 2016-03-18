function ToastMessage(){
	
	var self = this
	this.main  = document.createElement('div');
	this.main.id = 'ToastMessage'



	this.mostrar = function($msg){
		
		$(self.main).html($msg)
		$(self.main).show();
			Anima.to($(self.main), .5, {opacity:1})

		setTimeout(function(){

			self.ocultar()
		}, 2500)
	}
	
	this.ocultar = function(){
		
		Anima.to($(self.main), .5, {opacity:0}, 0, function (){
			$(self.main).hide()
		})

	}
}