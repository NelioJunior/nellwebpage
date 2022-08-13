var flagVideoVisible = false;

window.addEventListener('load', (event) => {

	function openWindowWithPost(url, data) {
		var form = document.createElement("form");
		form.target = "_parent";
		form.method = "POST";
		form.action = url;
		form.style.display = "none";

		var input = document.createElement("input");
		input.type = "hidden";
		input.name = "pathUrl";
		input.value = data;
		form.appendChild(input);

		document.body.appendChild(form);
		form.submit();
		document.body.removeChild(form);
	}

    redimencionarVideo()
    window.addEventListener("resize",redimencionarVideo)	

	function redimencionarVideo() {
		document.querySelector(".video").style.zIndex = 0;		
		document.querySelector("#logo").style.zIndex = 1;		
		document.querySelector(".navbar").style.zIndex = 2;
		document.querySelector("#logo").style.top = "20px"; 		
	}	

    window.addEventListener("scroll", parallax, false);

    function parallax(){
        logo.style.top = -(window.pageYOffset / 4)+'px'; 
        quemSao.style.top = -(window.pageYOffset / 2)+'px'; 
        slides.style.top = -(window.pageYOffset / 4)+'px';
        quemSomos.style.top = -(window.pageYOffset / 4)+'px';	
    }

	var myIndexA = 0;				
	var myIndexB = 0;				


	setTimeout(function(){
		$("#slides, #oquefazemos").show();
		carouselInicio();
		carouselNossosClientes();
		setInterval(function(){
			carouselInicio();
			carouselNossosClientes()
		},10000);				
	},1000);							
	
	
	function carouselInicio(){	
		$(".slideImgA").hide();
		$(".slideImgA")[myIndexA].style.display = "block";
		myIndexA += 1;
		if (myIndexA >= $(".slideImgA").length) {myIndexA = 0}				
	}	
	
	function carouselNossosClientes(){	
		$(".slideImgB").hide();
		$(".slideImgB")[myIndexB].style.display = "block";
		myIndexB += 1;
		if (myIndexB >= $(".slideImgB").length) {myIndexB = 0}	

		switch (myIndexB) {
			case 1: 
				nossosClientes.innerText = "Contabilidades";
				break;
			case 2: 
				nossosClientes.innerText = "Clinicas";
				break;
			case 3: 
				nossosClientes.innerText = "Pet Shops";
				break;				
			case 4: 
				nossosClientes.innerText = "Saloes de Beleza";
				break;				
			case 5: 
				nossosClientes.innerText = "Dentistas";
				break;				
			case 6: 
				nossosClientes.innerText = "Academias";
				break;				
			case 7: 
				nossosClientes.innerText = "Pizzarias";
				break;				
			default:
				nossosClientes.innerText = "Escolas";
		}
	}	

	$(".navbar a").on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 2000, function(){
					window.location.hash = hash;
			});
		} 
	})


	$('.js-gotop').on('click', function(event){

		event.preventDefault();

		$('html, body').animate({
			scrollTop: $('html').offset().top
		}, 1000, 'easeInOutExpo');

		return false;
	});

	$(window).scroll(function(){

		var $win = $(window);
		if ($win.scrollTop() > 200) {
			$('.js-top').addClass('active');
		} else {
			$('.js-top').removeClass('active');
		}

	});

    
	$("#btnLogin").click(function(){

	    $.ajax({
	        method: "GET",
	        data: { nellUsuario: $("#usrname").val(), nellSenha: $("#psw").val() },
	        url: "https://nellsite.herokuapp.com/dummy.php", 			

			error: function(result){
				alert("erro no acesso do componente de segurança.")
			},		
			success: function(data){
				if (data == ""){
					alert("usuário ou senha inválida");					
				} else {				
					openWindowWithPost("https://nellsite.herokuapp.com/redirect.php", data.location);					
				}	
	        },
	        dataType: "jsonp",
	    });
		
	})	

	$("#FrmContato").submit(function( event ){
		event.preventDefault();
		$("#FrmContato #wait").show();
		$("#FrmContato #resposta").hide();
		$.ajax({
			type: 'POST',
			url: 'sendLocal.php',
			error: function(result){
				$("#FrmContato #wait").hide(); 
				$("#FrmContato #resposta").show();
				$("#FrmContato #resposta").slideDown();
				$("#FrmContato #resposta").html(result);
			},
			crossDomain: true, 
			data: $(this).serialize(),
			success: function(data){
				$("#FrmContato #wait").hide(); 
				$("#FrmContato #resposta").show();
				$("#FrmContato #resposta").slideDown();
				$("#FrmContato #resposta").html(data);
			}
		})
	})


    // storytellerVideo.muted = true;

})

document.addEventListener('DOMContentLoaded', function(){

	/* 
         Comentado em Jul/22  - Nell Júnior 

		var vd = document.getElementById('storytellerVideo');
		var canvas = document.getElementById('storytellerCanvas');
		var context = canvas.getContext('2d');   
		var back = document.createElement('canvas');
		var backcontext = back.getContext('2d');
	 
		var cw,ch;
	 
		vd.addEventListener('play', function(){
			cw = vd.clientWidth;
			ch = vd.clientHeight;
			canvas.width = cw;
			canvas.height = ch;
			back.width = cw;
			back.height = ch;
			draw(vd,context,backcontext,cw,ch);
		},false);

	*/
},false);

 
function draw(v,c,bc,w,h) {
	if(v.paused || v.ended)	return false;
	// First, draw it into the backing canvas	
	bc.drawImage(v,0,0,w,h);
	// Grab the pixel data from the backing canvas
	var idata = bc.getImageData(0,0,w,h);
	var data = idata.data;	
	var offset = 800;    //Permite deslocar o pixel usado p/comparação. É bom para o caso do video ter bordas - Nell Junior - Jul/16  
	var tolerance = 50;
	for(var i = 0, n = data.length; i < n; i += 4) {
		//btw  Math.abs retona o numero sem  sinal (logo é positivo) 
		var diff = Math.abs(data[i] - data[0+4*offset]) + Math.abs(data[i+1] - data[1+4*offset]) + Math.abs(data[i+2] - data[2+4*offset]);
		
		//alpha (transparencia) - Nell Junior Jul/16
		data[i + 3] = (diff*diff)/tolerance;
	}	
	
	idata.data = data;
	// Draw the pixels onto the visible canvas
	c.putImageData(idata,0,0);
	// Start over!
	
	setTimeout(draw,50,v,c,bc,w,h);
}