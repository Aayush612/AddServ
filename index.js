  var map = L.map('map').setView([23.35, 85.08], 4);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
      maxZoom: 12,
      minZoom: 1
    }).addTo(map);
	
	let mapping_obj={"Level_one":{"Parent":null,"child":"A_B_C_D"},"Level_two":{"Parent":"A","child":"A1_A2_A3_A4"}, "Level_three":{"Parent":"A3","child":"A31_A32_A33_A34"}}
	
	let level_one,  level_two, level_three, exec_over=0;
	async function setData(){
		await $.getJSON("https://raw.githubusercontent.com/Aayush612/AddServ/master/Level_one.geojson", data =>{
		level_one=L.geoJson(data, {
		style:  function(feature){
					var colp=feature.properties.value1*4;
					return({
						weight: 1, 
						color: "blue", 
						opacity: 0.2,
						fillColor: "hsl("+colp+",30%,50%)", 
						fillOpacity:  0.7
					})
						
					}
		}
		)
	}
	
	)
	await $.getJSON("https://raw.githubusercontent.com/Aayush612/AddServ/master/Level_two.geojson", data =>{
		level_two=L.geoJson(data, {
		style:  function(feature){
					var colp=feature.properties.value1*4;
					return({
						weight: 1, 
						color: "blue", 
						opacity: 0.2,
						fillColor: "hsl("+colp*colp+",30%,50%)", 
						fillOpacity:  0.7
					})
						
					}
		}
		)
	}
	)
	 await $.getJSON("https://raw.githubusercontent.com/Aayush612/AddServ/master/Level_three.geojson", data =>{
		level_three=L.geoJson(data, {
		style:  function(feature){
					var colp=feature.properties.value1*4;
					return({
						weight: 1, 
						color: "blue", 
						opacity: 0.2,
						fillColor: "hsl("+colp+",30%,50%)", 
						fillOpacity:  0.7
					})
						
					},
		 onEachFeature: function(feature, layern) {
			var centroid=feature.properties.centroid.split('_')
			var circ=L.circle(centroid,{radius: 160},{fillColor:"red", fill:true }) //feature.properties.value1*10
			layern= null;
			// layern=null;
			}
		}
		)
	}
	)
	exec_over=1
	afterExec()
	}
	
	setData();
	function afterExec(){
		console.log("-----")
		level_one.addTo(map)
		// level_two.addTo(map)
		// level_three.addTo(map)
				
		

	}
	
	map.on('zoomend', function(e) {
		console.log(e)
		if (map.getZoom() <4){
		map.removeLayer(level_one);//1st geoJSON layer
		}else{
		map.addLayer(level_one);
		}
		if (map.getZoom() <5){
		map.removeLayer(level_two); //2nd geoJSON layer
		}else{
		map.addLayer(level_two);
		map.removeLayer(level_one)
		}
		if (map.getZoom() <6){
		map.removeLayer(level_three); //3rd geoJSON layer
		}else{
		map.addLayer(level_three);
		map.removeLayer(level_one);
		map.removeLayer(level_two);

		}
		});
		
	map.on('mouseover', function(e){
		console.log(map.getBounds())
	
	})