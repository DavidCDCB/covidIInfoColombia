var app = new Vue({
	el: '#app',
	mounted() {
		fechas = [];
		datos = [];
		this.downData2().then(res => {
			this.fullData = true;
			res.data.forEach(item => {
				this.rawProm = "Fecha,Cantidad\n"
				for (const iterator of item) {
					if(item.indexOf(iterator) > 0) {
						fechas.push(iterator[0]);
						datos.push(parseInt(iterator[1]));
						this.rawProm += iterator[0].replace("\n","")+","+iterator[1]+"\n";
					}
				}
			});

			this.fechaActual = fechas[fechas.length-1];
			this.cantidadActual = datos[datos.length-1];

			const dataset = {
				labels: fechas,
				datasets: [{
					label: `Activos`,
					data: datos,
					borderColor:"red",
					borderWidth: 2,
					pointRadius: 1,
				}]
			};
	
			const configNew = {
				type: 'line',
				data: dataset,
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: 'bottom',
						}
					}
				},
			};
	
			var myChartNew = new Chart(
				document.getElementById('casos'),
				configNew
			);
		});


	},
	data: {
		fullData: false,
		cantidadActual: 0,
		fechaActual: ""
	},
	methods: {
		downloadData(filename, textInput){
			var element = document.createElement('a');
			element.setAttribute('href','data:text/csv;charset=utf-8, ' + encodeURIComponent(textInput));
			element.setAttribute('download', filename);
			document.body.appendChild(element);
			element.click();
		},
		async downData2() {
			return await axios.get('https://protoapiflask.herokuapp.com/covidData');
		},
	}
});
