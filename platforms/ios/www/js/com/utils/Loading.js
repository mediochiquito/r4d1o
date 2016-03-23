// JavaScript Document

function Loading(){
	var self = this;
	this.main = document.createElement('div');
	this.main.id = "loading";

	var loading_gif = document.createElement('div');
	loading_gif.id = "loading_gif";
	$(this.main).append(loading_gif);



	$(this.main).css({'display':'none','opacity':0});
	
	
	this.mostrar = function(){
	
		$(self.main).css('display','block');
		$(self.main).animate({'opacity':1},500);
	}
	
	this.ocultar = function(){
		$(self.main).animate({'opacity':0},500, function(){
			$(self.main).css('display','none');	
		});
	}
}