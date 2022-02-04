///////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [40, -3],
		zoom: 6,
		minZoom: 3,
		maxZoom: 20,
		maxBounds: [
			[20, -50],
			[50, 50]
			],
	});




///////////Funcionalidades estructura del visor///////////
//Layers on top
map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';
//Barra de interacción de capas	tantaas sildebar como grupos de capas
var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador
var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultMarkGeocode: false
	}).addTo(map);


///////////Diseño caracteriticas basicas del visor///////////
//Título
var title2 = L.control({position: 'topright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info2');
	 div.innerHTML +=
	 'VISOR CARTOGRÁFICO<h2>Crecimiento de población de <br> mayores a escala provincial';
	 return div;
	};
	title2.addTo(map);
//Logo Matrix	
var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info1');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/matrix.png" width="75%" ></img></a>';
	 return div;
	};
	title1.addTo(map);


		//Logo demos
var title4 = L.control({position: 'bottomright'});
	title4.onAdd = function (map) {
var div = L.DomUtil.create('div','info4');
	 div.innerHTML +=
	 '<a><img src="images/DEMOS.png" width="90px" height="63px" ></img></a>';
	 return div;
	};
	title4.addTo(map); 
	
//Logo mayorsig
var title3 = L.control({position: 'bottomright'});
	title3.onAdd = function (map) {
var div = L.DomUtil.create('div','info3');
	 div.innerHTML +=
	 '<a><img src="images/MAYORSIG.jpg" width="90px" height="63px" ></img></a>';
	 return div;
	};
	title3.addTo(map);  




///////////Cartografía de referencia///////////
var Mapa_fondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2019 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	}).addTo(map);		
//			var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB'
//			}).addTo(map);
//			var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB',
//			pane: 'labels'
//			}).addTo(map);
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy'
	});
var osm1 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	opacity: 0,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});
var osm3 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2019 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	});
//Límites
var comunidades = L.geoJson(comunidades, {
	color: "#17202A", 
	weight: 1.3,
	opacity: 0.5,
	fillOpacity: 0,
	pane: 'límites', // layer goes on top.
	attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	}).addTo(map);

//rasters overlay

var map_rast_1 = L.imageOverlay('images/Modelo_CAT.png',
  imageBounds = [
    [42.924, 0.157],
    [40.468, 3.332]
  ]);

var map_rast_2 = L.imageOverlay('images/espana.png',
  imageBounds = [
    [27.097, -18.83],
    [44.75660, 5.0]
  ]);



///////////Otras funcionalidades
//minimapa	
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, position:"bottomright", width:100,height:100,}).addTo(map); 					
//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[40, -5], zoomHomeTitle:'Posición inicial'}).addTo(map);
//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////











    



//estilo y popups de tasas


function getColor1(a) {
	
	return a > 3.0 ? '#d7191c' :
    a > 2.5 ? '#ea643f' :
	a > 2.0 ? '#fdae61' :
	a > 1.5 ? '#fed791' :
	a > 1.0 ? '#ffffc0' :
	a > 0.5 ? '#d3ec95' :
	a > 0.0? '#a6d96a' : 
	a > -0.5? '#60b856' : 
	a > -1.0? '#1a9641':
	
	'#C2523C';
};


function style1(feature) {
	return {
		fillColor: getColor1(feature.properties.TCR65T),
		weight: 0.9,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.8
	};

};
function popup1(feature, layer) {

	if (feature.properties && feature.properties.NAMEUNIT_1) {
		layer.bindTooltip("<strong>Tasa: </strong>"+  
			feature.properties.TCR65T.toFixed(1).toString().replace(".", ",")+
			"%<br><strong>Provincia: </strong>"+
			feature.properties.NAMEUNIT_1,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson1 = L.geoJson(TCR, {
	style: style1,
	onEachFeature: popup1
});

//estilo mapa Cambio
function getColor2(a) {
	
	return a > 3.0 ? '#d7191c' :
    a > 2.5 ? '#ea643f' :
	a > 2.0 ? '#fdae61' :
	a > 1.5 ? '#fed791' :
	a > 1.0 ? '#ffffc0' :
	a > 0.5 ? '#d3ec95' :
	a > 0.0? '#a6d96a' : 
	a > -0.5? '#60b856' : 
	a > -1.0? '#1a9641':
	
	'#C2523C';
};


function style2(feature) {
	return {
		fillColor: getColor2(feature.properties.TCR65H),
		weight: 0.9,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.8
	};

};
function popup2(feature, layer) {

	if (feature.properties && feature.properties.NAMEUNIT_1) {
		layer.bindTooltip("<strong>Tasa: </strong>"+  
			feature.properties.TCR65H.toFixed(1).toString().replace(".", ",")+
			"%<br><strong>Provincia: </strong>"+
			feature.properties.NAMEUNIT_1,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson2 = L.geoJson(TCR, {
	style: style2,
	onEachFeature: popup2
});




//estilo y popups de situación detallada
function getColor3(a) {
	
	return a > 3.0 ? '#d7191c' :
    a > 2.5 ? '#ea643f' :
	a > 2.0 ? '#fdae61' :
	a > 1.5 ? '#fed791' :
	a > 1.0 ? '#ffffc0' :
	a > 0.5 ? '#d3ec95' :
	a > 0.0? '#a6d96a' : 
	a > -0.5? '#60b856' : 
	a > -1.0? '#1a9641':
	
	'#C2523C';
};


function style3(feature) {
	return {
		fillColor: getColor3(feature.properties.TCR65M),
		weight: 0.9,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.8
	};

};
function popup3(feature, layer) {

	if (feature.properties && feature.properties.NAMEUNIT_1) {
		layer.bindTooltip("<strong>Tasa: </strong>"+  
			feature.properties.TCR65M.toFixed(1).toString().replace(".", ",")+
			"%<br><strong>Provincia: </strong>"+
			feature.properties.NAMEUNIT_1,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson3 = L.geoJson(TCR, {
	style: style3,
	onEachFeature: popup3
});


//estilo y popups de tasas


function getColor4(a) {
	
	return a > 5.0 ? '#d7191c' :
    a > 4.5 ? '#ea643f' :
	a > 4.0 ? '#fdae61' :
	a > 3.5 ? '#fed791' :
	a > 3.0 ? '#ffffc0' :
	a > 2.5 ? '#d3ec95' :
	a > 2.0? '#a6d96a' : 
	a > 1.5? '#60b856' : 
	a > 1.0? '#1a9641':
	
	'#b3cd8e';
};


function style4(feature) {
	return {
		fillColor: getColor4(feature.properties.TCR80T),
		weight: 0.9,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.8
	};

};
function popup4(feature, layer) {

	if (feature.properties && feature.properties.NAMEUNIT_1) {
		layer.bindTooltip("<strong>Tasa: </strong>"+  
			feature.properties.TCR80T.toFixed(1).toString().replace(".", ",")+
			"%<br><strong>Provincia: </strong>"+
			feature.properties.NAMEUNIT_1,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson4 = L.geoJson(TCR, {
	style: style4,
	onEachFeature: popup4
});

//estilo mapa Cambio
function getColor5(a) {
	
	return a > 5.0 ? '#d7191c' :
    a > 4.5 ? '#ea643f' :
	a > 4.0 ? '#fdae61' :
	a > 3.5 ? '#fed791' :
	a > 3.0 ? '#ffffc0' :
	a > 2.5 ? '#d3ec95' :
	a > 2.0? '#a6d96a' : 
	a > 1.5? '#60b856' : 
	a > 1.0? '#1a9641':
	
	
	'#b3cd8e';
};


function style5(feature) {
	return {
		fillColor: getColor5(feature.properties.TCR80H),
		weight: 0.9,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.8
	};

};
function popup5(feature, layer) {

	if (feature.properties && feature.properties.NAMEUNIT_1) {
		layer.bindTooltip("<strong>Tasa: </strong>"+  
			feature.properties.TCR80H.toFixed(1).toString().replace(".", ",")+
			"%<br><strong>Provincia: </strong>"+
			feature.properties.NAMEUNIT_1,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson5 = L.geoJson(TCR, {
	style: style5,
	onEachFeature: popup5
});




//estilo y popups de situación detallada
function getColor6(a) {
	
return a > 5.0 ? '#d7191c' :
    a > 4.5 ? '#ea643f' :
	a > 4.0 ? '#fdae61' :
	a > 3.5 ? '#fed791' :
	a > 3.0 ? '#ffffc0' :
	a > 2.5 ? '#d3ec95' :
	a > 2.0? '#a6d96a' : 
	a > 1.5? '#60b856' : 
	a > 1.0? '#1a9641':
	
	'#b3cd8e';
};


function style6(feature) {
	return {
		fillColor: getColor6(feature.properties.TCR80M),
		weight: 0.9,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.8
	};

};
function popup6(feature, layer) {

	if (feature.properties && feature.properties.NAMEUNIT_1) {
		layer.bindTooltip("<strong>Tasa: </strong>"+  
			feature.properties.TCR80M.toFixed(1).toString().replace(".", ",")+
			"%<br><strong>Provincia: </strong>"+
			feature.properties.NAMEUNIT_1,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson6 = L.geoJson(TCR, {
	style: style6,
	onEachFeature: popup6
});



var mapa1 = L.layerGroup([geojson1]).addTo(map);
var mapa2 = L.layerGroup([geojson2]);
var mapa3 = L.layerGroup([geojson3]);
var mapa4 = L.layerGroup([geojson4]);
var mapa5 = L.layerGroup([geojson5]);
var mapa6 = L.layerGroup([geojson6]);






var baseTree = [
	{ label: "<strong>Limpiar mapa", layer: osm3 },
	{
	label: '<strong>Mapas de tasas anuales de crecimiento ',
	children: [
	
	    { label: "Tasa de crecimiento de personas mayores",layer: mapa1},
		{ label: "Tasa de crecimiento de hombres mayores",layer: mapa2},
	    { label: "Tasa de crecimiento de mujeres mayores",layer: mapa3},
		{ label: "Tasa de crecimiento de personas mayores de edad avanzada",layer: mapa4},
		{ label: "Tasa de crecimiento de hombres mayores de edad avanzada",layer: mapa5},
	    { label: "Tasa de crecimiento de mujeres mayores de edad avanzada",layer: mapa6},
		
		 ]
	},
	];
	
	
var overlayTree = {
	label: 'Mapas de referencia',
	children: [
	
		//{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
		{ label: "OpenStreetMap", layer: osm},

	]
};	

//leyenda modelo espacial violencia de genero

var htmlLegend1 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Crecimiento de la población de mayores. Periodo 2007-2018'+"<\h3>",
		image:'<img src="images/LOGO_GEN.png"',
			style: style1,
			layer: geojson1,
			elements: [{
/*return a > 3.0 ? '#d7191c' :
    a > 2.5 ? '#ea643f' :
	a > 2.0 ? '#fdae61' :
	a > 1.5 ? '#fed791' :
	a > 1.0 ? '#ffffc0' :
	a > 0.5 ? '#d3ec95' :
	a > 0.0? '#a6d96a' : 
	a > -0.5? '#60b856' : 
	a > -1.0? '#1a9641':*/
				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Tasa anual de crecimiento (TC<sub>65</sub>) de población de personas mayores (≥ 65 años) provincial promedio.<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:'<br><img src="images/tc65.jpg",></img><br>',
				IMG:"<h3>"+  'Unidades: ‰'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h3>"+'<br>Unidades: %<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				//label:"<h4>"+  ' ≤-1,5'+"<\h4>",html: '',style: {'background-color': '#FAE278','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '-1,1 - -0.5'+"<\h4>",html: '',style: {'background-color': '#1a9641','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '-0,4 - 0,0'+"<\h4>",html: '',style: {'background-color': '#60b856','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  ' 0,1 - 0,5'+"<\h4>",html: '',style: {'background-color': '#a6d96a','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  ' 0,6 - 1,0'+"<\h4>",html: '',style: {'background-color': '#d3ec95','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  ' 1,1 - 1,5'+"<\h4>",html: '',style: {'background-color': '#ffffc0','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  ' 1,6 - 2,0'+"<\h4>",html: '',style: {'background-color': '#fed791','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  ' 2,1 - 2,5'+"<\h4>",html: '',style: {'background-color': '#fdae61','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  ' 2,6 - 3,0'+"<\h4>",html: '',style: {'background-color': '#ea643f','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  ' 3,1 - 3,5'+"<\h4>",html: '',style: {'background-color': '#d7191c','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos del Instituto Nacional de Estadística (2019).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]

		}],
		collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend1);


	//H 65


	var htmlLegend2 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Crecimiento de la población de hombres mayores.<br>Periodo 2007-2018'+"<\h3>",
		image:'<img src="images/LOGO_GEN.png"',
			style: style2,
			layer: geojson2,
			elements: [{
/*return  a > 1.5 ? '#e01600' :
	a > 1.0 ? '#fe6703' :
	a > 0.5 ? '#fdb419' :
	a > 0 ? '#ffd780' :
	a > -0.5 ? '#fbfd76' : 
	a > -1.0? '#e9f498' : 
	a > -2.0? '#b3cd8e':*/
				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Tasa anual de crecimiento (TC<sub>65</sub>) de población  de hombres mayores (≥ 65 años) provincial promedio.<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:'<br><img src="images/tc65.jpg",></img><br>',
				IMG:"<h3>"+  'Unidades: ‰'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h3>"+'<br>Unidades: %<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				//label:"<h4>"+  ' ≤-1,5'+"<\h4>",html: '',style: {'background-color': '#FAE278','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '-1,1 - -0.5'+"<\h4>",html: '',style: {'background-color': '#1a9641','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '-0,4 - 0,0'+"<\h4>",html: '',style: {'background-color': '#60b856','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  ' 0,1 - 0,5'+"<\h4>",html: '',style: {'background-color': '#a6d96a','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  ' 0,6 - 1,0'+"<\h4>",html: '',style: {'background-color': '#d3ec95','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  ' 1,1 - 1,5'+"<\h4>",html: '',style: {'background-color': '#ffffc0','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  ' 1,6 - 2,0'+"<\h4>",html: '',style: {'background-color': '#fed791','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  ' 2,1 - 2,5'+"<\h4>",html: '',style: {'background-color': '#fdae61','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  ' 2,6 - 3,0'+"<\h4>",html: '',style: {'background-color': '#ea643f','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  ' 3,1 - 3,5'+"<\h4>",html: '',style: {'background-color': '#d7191c','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos del Instituto Nacional de Estadística (2019).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]

		}],
		collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend2);

	// M 65


		var htmlLegend3 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Crecimiento de la población de mujeres mayores.<br>Periodo 2007-2018'+"<\h3>",
		image:'<img src="images/LOGO_GEN.png"',
			style: style3,
			layer: geojson3,
			elements: [{
/*return  a > 1.5 ? '#e01600' :
	a > 1.0 ? '#fe6703' :
	a > 0.5 ? '#fdb419' :
	a > 0 ? '#ffd780' :
	a > -0.5 ? '#fbfd76' : 
	a > -1.0? '#e9f498' : 
	a > -2.0? '#b3cd8e':*/
				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Tasa anual de crecimiento (TC<sub>65</sub>) de población de mujeres mayores (≥ 65 años) provincial promedio.<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:'<br><img src="images/tc65.jpg",></img><br>',
				IMG:"<h3>"+  'Unidades: ‰'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h3>"+'<br>Unidades: %<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				//label:"<h4>"+  ' ≤-1,5'+"<\h4>",html: '',style: {'background-color': '#FAE278','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '-1,1 - -0.5'+"<\h4>",html: '',style: {'background-color': '#1a9641','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '-0,4 - 0,0'+"<\h4>",html: '',style: {'background-color': '#60b856','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  ' 0,1 - 0,5'+"<\h4>",html: '',style: {'background-color': '#a6d96a','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  ' 0,6 - 1,0'+"<\h4>",html: '',style: {'background-color': '#d3ec95','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  ' 1,1 - 1,5'+"<\h4>",html: '',style: {'background-color': '#ffffc0','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  ' 1,6 - 2,0'+"<\h4>",html: '',style: {'background-color': '#fed791','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  ' 2,1 - 2,5'+"<\h4>",html: '',style: {'background-color': '#fdae61','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  ' 2,6 - 3,0'+"<\h4>",html: '',style: {'background-color': '#ea643f','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  ' 3,1 - 3,5'+"<\h4>",html: '',style: {'background-color': '#d7191c','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos del Instituto Nacional de Estadística (2019).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]

		}],
		collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend3);




	// T 80

		var htmlLegend4 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			label:+'<br>',
			name: "<h3>"+ 'Crecimiento de la población de mayores de edad avanzada. Periodo 2007-2018<br>'+"<\h3>",
	/*return  a > 3.5 ? '#8d1f0e' :
	a > 3.0 ? '#e01e00' :
	a > 2.5 ? '#fe5602' :
	a > 2.0 ? '#ff9100' :
	a > 1.5 ? '#ffd782' :
	a > 1 ? '#ebfc6d' :
	a > 0.5 ? '#f1f888' : 
	a > 0.0? '#dfec9e' : 
	a > -0.5? '#b3cd8e':
	*/

			style: style4,
			layer: geojson4,
			elements: [{
                label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Tasa anual de crecimiento (TC<sub>80</sub>) de población de personas mayores de edad avanzada <br>(≥ 80 años) provincial promedio.<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:'<br><img src="images/tc80.jpg",></img><br>',
				IMG:"<h3>"+  'Unidades: ‰'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h3>"+'<br>Unidades: %<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				//label:"<h4>"+  ' ≤-1,5'+"<\h4>",html: '',style: {'background-color': '#FAE278','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '1,1 - 1,5'+"<\h4>",html: '',style: {'background-color': '#1a9641','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '1,6 - 2,0'+"<\h4>",html: '',style: {'background-color': '#60b856','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '2,1 - 2,5'+"<\h4>",html: '',style: {'background-color': '#a6d96a','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '2,6 - 3,0'+"<\h4>",html: '',style: {'background-color': '#d3ec95','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '3,1 - 3,5'+"<\h4>",html: '',style: {'background-color': '#ffffc0','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '3,6 - 4,0'+"<\h4>",html: '',style: {'background-color': '#fed791','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '4,1 - 4,5'+"<\h4>",html: '',style: {'background-color': '#fdae61','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '4,6 - 5,0'+"<\h4>",html: '',style: {'background-color': '#ea643f','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '5,1 - 5,5'+"<\h4>",html: '',style: {'background-color': '#d7191c','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos del Instituto Nacional de Estadística (2019).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]

		}],

		
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend4);

	// H 80

		var htmlLegend5 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			label:+'<br>',
			name: "<h3>"+ 'Crecimiento de la población de hombres mayores de edad avanzada. Periodo 2007-2018<br>'+"<\h3>",
	/*return  a > 3.5 ? '#8d1f0e' :
	a > 3.0 ? '#e01e00' :
	a > 2.5 ? '#fe5602' :
	a > 2.0 ? '#ff9100' :
	a > 1.5 ? '#ffd782' :
	a > 1 ? '#ebfc6d' :
	a > 0.5 ? '#f1f888' : 
	a > 0.0? '#dfec9e' : 
	a > -0.5? '#b3cd8e':
	*/

			style: style5,
			layer: geojson5,
			elements: [{
                 label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Tasa anual de crecimiento (TC<sub>80</sub>) de población de hombres mayores de edad avanzada (≥ 80 años) provincial promedio.<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:'<br><img src="images/tc80.jpg",></img><br>',
				IMG:"<h3>"+  'Unidades: ‰'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h3>"+'<br>Unidades: % <br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				//label:"<h4>"+  ' ≤-1,5'+"<\h4>",html: '',style: {'background-color': '#FAE278','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '1,1 - 1,5'+"<\h4>",html: '',style: {'background-color': '#1a9641','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '1,6 - 2,0'+"<\h4>",html: '',style: {'background-color': '#60b856','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '2,1 - 2,5'+"<\h4>",html: '',style: {'background-color': '#a6d96a','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '2,6 - 3,0'+"<\h4>",html: '',style: {'background-color': '#d3ec95','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '3,1 - 3,5'+"<\h4>",html: '',style: {'background-color': '#ffffc0','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '3,6 - 4,0'+"<\h4>",html: '',style: {'background-color': '#fed791','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '4,1 - 4,5'+"<\h4>",html: '',style: {'background-color': '#fdae61','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '4,6 - 5,0'+"<\h4>",html: '',style: {'background-color': '#ea643f','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '5,1 - 5,5'+"<\h4>",html: '',style: {'background-color': '#d7191c','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos del Instituto Nacional de Estadística (2019).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]

		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend5);


	// M 80

		var htmlLegend6 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			label:+'<br>',
			name: "<h3>"+ 'Crecimiento de la población de mujeres mayores de edad avanzada. Periodo 2007-2018<br>'+"<\h3>",
	/*return  a > 3.5 ? '#8d1f0e' :
	a > 3.0 ? '#e01e00' :
	a > 2.5 ? '#fe5602' :
	a > 2.0 ? '#ff9100' :
	a > 1.5 ? '#ffd782' :
	a > 1 ? '#ebfc6d' :
	a > 0.5 ? '#f1f888' : 
	a > 0.0? '#dfec9e' : 
	a > -0.5? '#b3cd8e':
	*/

			style: style6,
			layer: geojson6,
			elements: [{
                label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Tasa anual de crecimiento (TC<sub>80</sub>) de población de mujeres mayores de edad avanzada (≥ 80 años) provincial promedio.<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:'<br><img src="images/tc80.jpg",></img><br>',
				IMG:"<h3>"+  'Unidades: % año<sup>-1</sup'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h3>"+'<br>Unidades: %<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {		
				label:"<h4>"+  '1,1 - 1,5'+"<\h4>",html: '',style: {'background-color': '#1a9641','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '1,6 - 2,0'+"<\h4>",html: '',style: {'background-color': '#60b856','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '2,1 - 2,5'+"<\h4>",html: '',style: {'background-color': '#a6d96a','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '2,6 - 3,0'+"<\h4>",html: '',style: {'background-color': '#d3ec95','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '3,1 - 3,5'+"<\h4>",html: '',style: {'background-color': '#ffffc0','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '3,6 - 4,0'+"<\h4>",html: '',style: {'background-color': '#fed791','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '4,1 - 4,5'+"<\h4>",html: '',style: {'background-color': '#fdae61','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '4,6 - 5,0'+"<\h4>",html: '',style: {'background-color': '#ea643f','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '5,1 - 5,5'+"<\h4>",html: '',style: {'background-color': '#d7191c','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos del Instituto Nacional de Estadística (2019).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]

		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend6);



//Visualizar capas
// L.control.layers(baseLayers, overlays,{collapsed:true, position: 'topright',}).addTo(map);
L.control.layers.tree(baseTree, overlayTree).addTo(map);

//boton de informacion 
var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});