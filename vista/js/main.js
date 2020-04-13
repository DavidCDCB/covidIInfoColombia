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

		dom.getElemento("totales").innerText="1223";
		peticion('https://corona.lmao.ninja/countries/colombia').then(result =>{
			
			console.log(result.cases);
	
		});
	});

	const peticion = async (url) => {
		const response = await fetch(url).then((response)=>{
			return response.json();
		});
		return response;
	}
})(document, window);






