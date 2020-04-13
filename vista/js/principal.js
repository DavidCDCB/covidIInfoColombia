
export default class Graficador{

	constructor () {
		this.myDiagram;
		this.graficado;
		this.listaNV;
	};

	static graficar(nodos,aristas){
		var $ = go.GraphObject.make;
		if(!this.graficado){
			this.myDiagram = $(go.Diagram,
				"myDiagramDiv",
				{
					initialAutoScale: go.Diagram.Uniform,
					//layout: $(go.ForceDirectedLayout,{defaultSpringLength:1000,defaultGravitationalMass:1000 }
					layout: $(go.CircularLayout, { spacing: 200 })
				});
		}
		this.graficado=true;
		
		this.myDiagram.nodeTemplate =
			$(go.Node, "Auto",
				$(go.Shape,
					"Circle",
					new go.Binding("fill", "color"),
					new go.Binding("stroke", "stroke"),
					new go.Binding("strokeWidth", "strokeWidth"),
					new go.Binding("location", "loc")),
				$(go.TextBlock,
					{ margin: 0, font: '20px Monospace' },
					new go.Binding("text", "key"))
			);

			this.myDiagram.linkTemplate =
			$(go.Link,
				{ curve: go.Link.Bezier, curviness: 100, },  // Bezier curve
				new go.Binding("curviness"),

				$(go.Shape, { strokeWidth: 3 }),
				$(go.Shape, { toArrow: "Standard", scale: 2 }),
				$(go.Panel, "Auto",  // this whole Panel is a link label
					$(go.Shape, "Ellipse",
						{ fill: "white", stroke: "gray" },
						new go.Binding("fill", "color")),
					$(go.TextBlock,
						{ margin: 0, font: '18px serif' },
						new go.Binding("text", "text"))
				),

			);

		let ubicacion = new go.Point(20, 0);

		this.myDiagram.model = new go.GraphLinksModel(nodos, aristas);


		/* 			[ // EJEMPLO DE CONEXIONES
					  { from: "Alpha", to: "Beta",text:"h"},
					  { from: "Beta", to: "Alpha" },
					  { from: "Alpha", to: "Gamma" },
					  { from: "Beta", to: "Beta" },
					  { from: "Gamma", to: "Delta" },
					  { from: "Delta", to: "Alpha" }
		]); */

	}

	static pintarCamino(estadoIni,estadosFin,lista){
		for (const iterator of lista) {
			if(!estadosFin.includes(iterator.toString())&&iterator.toString()!=estadoIni)
			this.setColor(iterator.toString(),"yellow");
		}
	}
	
	
	static setColor(myDiagram,nodo,color){
		var node = this.myDiagram.findNodeForKey(nodo);
		this.myDiagram.model.commit(function (m) {
			m.set(node.data, "color", color);
			m.set(node.data, "stroke", "black");
		}, "change color");
	}

};
