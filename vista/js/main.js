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
			fetch('https://cors-anywhere.herokuapp.com/' + 'http://unremoved-sediments.000webhostapp.com/BD.json').then(blob => blob.json()).then(ext => {
				if(ext.nombre==result.cases){
					dom.getElemento("totales").innerText=result.cases;
					dom.getElemento("recuperados").innerText=result.recovered;
					dom.getElemento("muertes").innerText=result.deaths;
				}else{

					almacenar("https://unremoved-sediments.000webhostapp.com/server.php?nombre="+result.cases+"&almacenarDatos=si");
				}
			});
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






