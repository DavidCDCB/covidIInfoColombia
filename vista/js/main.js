'use strict';

import dom from './dom-pruebas.js';//clase estatica

let test=false;

((doc, win) => {
	
	doc.addEventListener('DOMContentLoaded',event => {
		peticion('https://corona.lmao.ninja/countries/colombia').then(result =>{
			persistencia(result);
			//setData("casos",parseInt(result.cases)-parseInt(result.recovered));
			setData("casos",result.cases);
			setData("recuperados",result.recovered);
			setData("criticos",result.critical);
			setData("muertes",result.deaths);
			setData("test",result.tests);
		});

		dom.getElemento("btn").addEventListener('click', event => {
			win.location.href = "https://infogram.com/detallecasos-1h7z2l9yqgdy2ow"; 
		});
		
		//cargar("https://unremoved-sediments.000webhostapp.com/BD.json");
		email();
		alternarPantalla();
	});

	let persistencia=(result)=>{
		if(localStorage.getItem("casos")==null){
			localStorage.setItem("casos", result.cases);
			localStorage.setItem("recuperados", result.recovered);
			localStorage.setItem("criticos", result.critical);
			localStorage.setItem("muertes", result.deaths);
			localStorage.setItem("test", result.tests);
			$('#modal').modal('show');
		}
	}

	let setData=(localDat,extDat)=>{
		let diferencia=0;
		if(localStorage.getItem(localDat)!=extDat){
			diferencia=(parseInt(extDat)-localStorage.getItem(localDat));
			dom.getElemento(localDat).innerText=localStorage.getItem(localDat)+"+"+diferencia+" Nuevos";
			localStorage.setItem(localDat, extDat);
			dom.getElemento(localDat).classList.add("shake");
			dom.getElemento(localDat).classList.add("slow");
		}else{
			dom.getElemento(localDat).innerText=extDat;
		}
	}

	const peticion = async (url) => {
		const response = await fetch(url).then((response)=>{
			return response.json();
		});
		return response;
	}

	const almacenar = async (url) => {
		var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
		fetch(proxyUrl + url).then(data => {
			console.log(data);
			return data;
		}).catch(e => {
			console.log(e);
			return e;
		});
	}


	let email = ()=>{
		if(test==false){
			Email.send({
				SecureToken : "f4f83764-e552-47f2-beb3-3c71d12b19c6",
				To : 'anoncdcb@gmail.com',
				From : "anoncdcb@gmail.com",
				Subject : "Visita",
				Body : "",
			}).then(
			  message =>{console.log("Enviado!",message);}
			);


/* 			var templateParams = {
				name: 'Visita',
				notes: 'Check this out!'
			};
			 
			emailjs.send('gmail', 'template_9zvC6CQN', templateParams)
				.then(function(response) {
				   console.log('SUCCESS!', response.status, response.text);
				}, function(error) {
				   console.log('FAILED...', error);
				}); */
		}
	}

	const cargar = async (url) => {
		let count=0;
		var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
		const response = await fetch(proxyUrl + url).then(blob => blob.json()).then(data => {
			let time = new Date();
			count=parseInt(data.nombre)+1;
			if(test==false){
				almacenar("https://unremoved-sediments.000webhostapp.com/server.php?nombre="+count+
				"&hora="+time.getHours()+":"+time.getMinutes()+"&fecha="+time.getDate()+"-"+time.getMonth()
				+"&almacenarDatos=si");
			}
			console.log(count);
			return data;
		})
		.catch(e => {
			console.log(e);
			return e;
		});
	}

	let alternarPantalla=()=> {
		if ((document.fullScreenElement && document.fullScreenElement !== null) ||    // metodo alternativo
			(!document.mozFullScreen && !document.webkitIsFullScreen)) {               // metodos actuales
			if (document.documentElement.requestFullScreen) {
				document.documentElement.requestFullScreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullScreen) {
				document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		} else {
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
		}
	}
})(document, window);

/* fetch('https://cors-anywhere.herokuapp.com/' + 'https://www.ins.gov.co/Noticias/Paginas/Coronavirus.aspx').then(blob => blob.text()).then(ext => {
	console.log(ext);
});
 
async function funcionAsincrona(){
	let objHtml;
	const response = await fetch('https://cors-anywhere.herokuapp.com/' + 'https://www.ins.gov.co/Noticias/Paginas/Coronavirus.aspx');
	const blob = await response.blob();
	console.log(blob);
	objHtml=URL.createObjectURL(blob)
  }
funcionAsincrona(); */
