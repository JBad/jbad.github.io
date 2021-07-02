////<script src='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js'></script>
//<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
//<script id="choque" type="text/javascript" src="/map/res/choque.geojson"></script>
//<link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
function load() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamJhZGFzaCIsImEiOiJja3ExM3oxczAwMXNwMm9sYTNsbXZqdTBnIn0.5Kvwf2lG7rxYvJ9K63bcsA';
    var map = new mapboxgl.Map({
	container: 'map',
	zoom: 1,
	style: 'mapbox://styles/mapbox/streets-v11'});
    var mydata = choque
    map.on('load', function () {
	map.addSource('route', {
	    'type': 'geojson',
	    'data': mydata
	});
	map.addLayer({
	    'id': 'route',
	    'type': 'line',
	    'source': 'route',
	    'layout': {
		'line-join': 'round',
		'line-cap': 'round'
	    },
	    'paint': {
		'line-color': '#888',
		'line-width': 8
	    }
	});
	// When a click event occurs on a feature in the places layer, open a popup at the
	// location of the feature, with description HTML from its properties.
	map.on('click', 'route', function (e) {
	    var coordinates = e.features[0].geometry.coordinates.slice();
	    var description = e.features[0].properties.description + '<a href="https://jbad.github.io/map/2018/02/05/choque"> link</a>';
	    
	    // Ensure that if the map is zoomed out such that multiple
	    // copies of the feature are visible, the popup appears
	    // over the copy being pointed to.
	    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
		coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
	    }	    
	    new mapboxgl.Popup()
		.setLngLat(coordinates[0])
		.setHTML(description)
		.addTo(map);
	});
    });
}