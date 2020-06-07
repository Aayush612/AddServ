  var map = L.map('map').setView([23.35, 85.08], 2);
//https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
  L.tileLayer('',
    {
      attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
      maxZoom: 12,
      minZoom: 1
    }).addTo(map);
	
	let mapping_obj={"Level_one":{"Parent":null,"child":"A_B_C_D"},"Level_two":{"Parent":"A","child":"A1_A2_A3_A4"}, "Level_three":{"Parent":"A3","child":"A31_A32_A33_A34"}}
	
	let level_one,  level_two, level_three, exec_over=0;
	async function setData(){
		await $.getJSON("https://raw.githubusercontent.com/Aayush612/AddServ/master/countries.geojson", data =>{
		level_one=L.geoJson(data, {
		style:  function(feature){
					var colp=feature.properties.value1*4;
					return({
						weight: 1, 
						color: "blue", 
						opacity: 0.2,
						fillColor: "white", 
						fillOpacity:  0.7
					})
						
					}
		}
		)
	}
	
	)
	await $.getJSON("https://raw.githubusercontent.com/Aayush612/AddServ/master/india_states.geojson", data =>{
		level_two=L.geoJson(data, {
		style:  function(feature){
					var colp=feature.properties.value1*4;
					return({
						weight: 2, 
						color: "lightred", 
						opacity: 0.8,
						fillColor: "white", 
						fillOpacity:  0.7
					})
						
					},
		onEachFeature: function (feature, layer) {
        layer.on('click', function (e) {
            this.setStyle(highlight);
            e.target.feature.properties.highlight = true;
            // hideLayers(feature,layer);
			console.log(layer)
        });
        map.on('click', function (e) {
            //having trouble with resetStyle, so just change it back
            layer.setStyle({
             'color': 'blue',
             'weight': 1,
             'opacity': 0.8
           });
          // showLayers();
        });
    }
		}
		)
	}
	)
	 await $.getJSON("https://raw.githubusercontent.com/geohacker/india/master/district/india_district.geojson", data =>{
		level_three=L.geoJson(data, {
		style:  function(feature){
					var colp=feature.properties.value1*4;
					return({
						weight: 1, 
						color: "darkgrey", 
						opacity: 0.5,
						fillColor: "beige", 
						fillOpacity:  0.7
					})
						
					},
		
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
		
		

	}
	
	map.on('zoomend', function(e) {
		console.log(e)
		if (map.getZoom() <1){
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
		level_two.bringToFront()
		

		}
		});
		
	map.on('mouseover', function(e){
		console.log(map.getBounds())
	
	})
	
	function hideLayers (){
  this.layer.eachLayer(function(layer){
    if(!layer.feature.properties.highlight){
      map.removeLayer(layer);
    }
  });
}

function showLayers (){
  this.layer.eachLayer(function(layer){
    layer.feature.properties.highlight = false;
    map.addLayer(layer);
  });
}

 var highlight = {
       'weight': 2,
       'opacity': 0.8,
	   'fillColor':'lightgreen',
	   'fillOpacity':0.4
   };
   
  