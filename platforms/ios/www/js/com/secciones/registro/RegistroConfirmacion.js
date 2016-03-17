
function RegistroConfirmacion(){
	var self = this;
	this.main = document.getElementById('confirmacion');

 $(this.main).css({'display':'none','opacity':0})

	var cerrar_btn = new BotonImg('#confirmacion_cerrar_btn', onClickCerrarBtn);
	var enviar_btn = new BotonImg('#confirmacion_btn-confirmacion-arma', goArma);
	new BotonImg('#confirmacion_btn-close', onClickCerrarBtn);

	function goArma() {
		app.secciones.go(app.secciones._SeccionArma);
		Anima.to(self.main,0.5,{'opacity':0},0,function(){
			$(self.main).css('display','none');
		});
	}


	this.mostrar = function(){

		$(self.main).css({'display':'block','opacity':1});
		$(self.main).css('display','block');
		Anima.to(self.main,0.5,{'opacity':1});

	}

	function onClickCerrarBtn(){


		app.secciones.go(app.secciones._SeccionHome, .3);
		Anima.to(self.main,0.5,{'opacity':0},0,function(){
			$(self.main).css('display','none');	
		});
	}

}