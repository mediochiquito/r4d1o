
function RegistroInput(input,$palabra, $max_caracteres){

	var self = this;
	var palabra = $palabra || "";
	this.main = input;
	var max_caracteres = $max_caracteres || 200;

	input.value = palabra;

	input.maxLength = max_caracteres;

	$(input).bind("focusout", onFocusOut);
	$(input).bind("focusin", onFocusIn);

	var color_vacio = '#BEC3C6';
	var color_lleno = '#fff';

	var es_fecha = false;
	var es_fecha_compra = false;


	this.esNumerico = function(){
		$(input).numeric();
	}

	this.esFecha = function(){
		input.removeAttribute('maxlength');
		$(input).mask('99/99/9999',{placeholder:'DD/MM/AAAA'});
		es_fecha = true;
	}

	this.esFechaCompra = function(){
		input.removeAttribute('maxlength');
		$(input).mask('99/99/9999',{placeholder:'DD/MM/AAAA'});
		es_fecha = true;
		es_fecha_compra = true;
	}

	this.esTelefono = function(){
		input.removeAttribute('maxlength');
		$(input).mask('(999) 999-9999',{placeholder:'(XXX) XXX-XXXX'});

	}


	this.esMonto = function(){
		$(input).autoNumeric('init',{aSign:'$',wEmpty:'sign'});
	}

	/******* BOOLEAN ******/

	this.esVacio = function(){
		if(input.value.toUpperCase() == palabra.toUpperCase()){
			return true;
		}else{
			return input.value.replace(/(^\s*)|(\s*$)|[ ]/g, "").length == 0;
		}
	}

	this.esMailValido = function(){
		return  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(input.value);
	}

	this.setValor = function(txt){
		$(input).val(txt);
		$(input).css('color',color_lleno);
	}

	this.bloquear = function(valor){
		input.disabled = valor;
	}

	this.getValor = function(){
		if(es_fecha){
			var arr_fecha = $(input).val().split('/');
			arr_fecha[0] = completarCero(arr_fecha[0]);
			arr_fecha[1] = completarCero(arr_fecha[1]);

			return arr_fecha[2]+'-'+arr_fecha[1]+'-'+arr_fecha[0];

		}else{
			return $(input).val();
		}
	}

	this.getInput = function(){
		return input;
	}

	this.vaciar = function(){
		input.value = palabra;
		if(!es_fecha){
			$(input).css('color',color_vacio);
		}

	}

	this.hayError=function(){
		$(input).addClass('participa_input_error');
	}

	this.estaBien=function(){
		$(input).removeClass('participa_input_error');
	}

	this.esFechaValida = function(){
		var arr_fecha = $(input).val().split('/');

		var date = new Date();

		if(arr_fecha.length != 3){
			return false;
		}else if(parseInt(arr_fecha[0],10) > 31){
			return false;
		}else if(parseInt(arr_fecha[1],10) > 12){
			return false;
		}else if(parseInt(arr_fecha[2],10) > date.getFullYear() || parseInt(arr_fecha[2],10) < 1900){
			return false;
		}else{
			return true;
		}
	}

	this.esFechaCompraValida = function(){
		var arr_fecha = $(input).val().split('/');
		return arr_fecha[2]+'-'+completarCero(arr_fecha[1])+'-'+completarCero(arr_fecha[0]) >= '2015-11-01';
	}


	function onFocusOut(e){
		if(self.esVacio()){
			$(input).css('color',color_vacio);
			input.value = palabra;
		}
	}

	function onFocusIn(e){
		if(input.value.toUpperCase() == palabra.toUpperCase()){
			$(input).css('color',color_lleno);
			input.value = "";
		}
	}

	function completarCero(valor){
		if(parseInt(valor,10) < 10 && valor.length == 1){
			return '0'+valor;
		}else{
			return valor;
		}
	}

}