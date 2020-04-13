import { Nodo } from "./Nodo.js"
import { Arista } from "./Arista.js"

export class Grafo{

	constructor () {
		this.nodos=[]
	};

	existe(tag){
		let encontrado=false;
		for(let nodo of this.nodos){
			if(nodo.dato==tag){
				encontrado=true;
				return encontrado;
			}
		}
		return false;
	}

	agregarNodo(dato){
		if(!this.existe(dato)){
			this.nodos.push(new Nodo(dato));
			return this.nodos[this.nodos.length-1];
		}
	}

	agregarArista(inicio,fin,dato){

		for(let nodo of this.nodos){
			if(nodo.dato==inicio){
				nodo.adyacentes.push(new Arista(fin,dato));
				break;
			}
		}

	}

	verAristas(nodo){
		let nodoE=null;
		for(let n of this.nodos){
			if(n.dato==nodo)
				nodoE=n;
		}
		for(let arista of nodoE.adyacentes){
			console.log(arista.destino);
		}
	}

};
