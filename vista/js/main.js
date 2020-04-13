'use strict';
//cd /opt/lampp/htdocs/automatas;clear;sudo su;
//chmod 777 -R /opt/lampp/htdocs/
//git add .;git commit -m "actual";
//git fetch;git difftool --tool=diffuse master origin/master
//git merge --verify
//git pull --rebase;
//git add .;git rebase --continue
//git push -f origin --all

import { Grafo } from "./Grafo.js";
import dom from './dom-pruebas.js';//clase estatica



((doc, win) => {
	
	doc.addEventListener('DOMContentLoaded',event => {
		
		peticion('https://corona.lmao.ninja/countries/colombia').then(result =>{
			let diferencia=0;
			if(localStorage.getItem("casos")==null){
				localStorage.setItem("casos", result.cases);
				localStorage.setItem("recuperados", result.recovered);
				localStorage.setItem("muertes", result.deaths);
			}

			if(localStorage.getItem("casos")!=result.cases){
				diferencia=(parseInt(result.cases)-localStorage.getItem("casos"));
				dom.getElemento("totales").innerText=localStorage.getItem("casos")+"("+diferencia+" Nuevos)";
				localStorage.setItem("casos", result.cases);
			}else{
				dom.getElemento("totales").innerText=result.cases;
			}

			if(localStorage.getItem("recuperados")!=result.recovered){
				diferencia=(parseInt(result.recovered)-localStorage.getItem("recuperados"));
				dom.getElemento("recuperados").innerText=localStorage.getItem("recuperados")+"("+diferencia+" Nuevos)";
				localStorage.setItem("recuperados", result.recovered);
			}else{
				dom.getElemento("recuperados").innerText=result.recovered;
			}

			if(localStorage.getItem("muertes")!=result.deaths){
				diferencia=(parseInt(result.deaths)-localStorage.getItem("muertes"));
				dom.getElemento("muertes").innerText=localStorage.getItem("muertes")+"("+diferencia+" Nuevos)";
				localStorage.setItem("muertes", result.deaths);
			}else{
				dom.getElemento("muertes").innerText=result.deaths;
			}


		});
	});

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
		});
	}

	const cargar = async (url) => {
		var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
		const response = await fetch(proxyUrl + url).then(blob => blob.json()).then(data => {
			//console.table(data);
			casosT=data.nombre;
			return data;
		})
		.catch(e => {
			console.log(e);
			return e;
		});
		console.log(casosT);
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
