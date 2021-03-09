
/*
    This file is part of "ChoiCo" a web application for designing digital games, written by Marianthi Grizioti for the National and Kapodistrian University of Athens (Educational Technology Lab).
    Copyright (C) 2017-2018.
    ChoiCo is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChoiCo is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
*/
layersElement = document.getElementById("layersList");
layersList2  = document.getElementById("pointLayerList");
//var corner1 = L.latLng(-175, -225), corner2 = L.latLng(175, 225), maxcor1 = L.latLng(-180, -250), maxcor2 = L.latLng(180, 250)
//var corner1 = L.latLng(-200, -400), corner2 = L.latLng(200, 400), maxcor1 = L.latLng(-200, -430), maxcor2 = L.latLng(200, 430)




newGame.map = function (mapSettings){
	this.imgUrl = mapSettings.img;
	this.mode = mapSettings.mode;
	this.imgData =  getBase64Image (mapSettings.img);
	this.markers = [];
	this.addPoints = false;
	this.background = null;
  this.useGoogleMaps = mapSettings.googleMaps
  this.initialZoom = mapSettings.zoom;
	this.bounds = mapSettings.bounds;
	this.mapInstance = this.newMap(mapSettings.img);
	this.prevSelected = null;
  this.mapImages = [];
  this.popup = L.popup();
	this.mapInstance .on ('resize', function () {
		myGame.myMap.mapInstance.invalidateSize();
	mapResize(myGame.myMap.mapInstance);
		console.log ('resize')
	});
}

function fitImageDimensions(url, bounds, map){

    var img = new Image();
    img.onload = function(){
			 var dim = {width:this.width, height: this.height }
			// var minzoomlevel =calculateZoom(dim,bounds);
			// map.setMinZoom (minzoomlevel)
				if (Array.isArray(bounds)){
	if (dim.width > bounds[1][1]){
			if(dim.height > bounds[1][0])
			{
				var maxBounds = [[0,0], [dim.height, dim.width] ]
			}
			else
				var maxBounds = [[0,0], [bounds[1][0], dim.width] ]
		}
		else if (dim.height > bounds[1][0]){
			var maxBounds = [[0,0], [dim.height,bounds[1][1]]]
		}
		else {
			var maxBounds  = bounds
		}
	 	// map.setMaxBounds (maxBounds)
	}
	else {
		var mapHeight = $('#map').height();
	 var mapWidth = $('#map').width()
		 //map.setMaxBounds  (bounds)
		map.setMinZoom(1)
	//	map.mapInstance.setZoom(1)
		if ((mapHeight/2 < bounds.getNorth()) || (mapWidth/2 <bounds.getEast())){
			map.setMinZoom(0.4)
		//	map.mapInstance.setZoom(0.4)
		}
		else if ((mapHeight/2 > bounds.getNorth()) || (mapWidth/2 > bounds.getEast())){
			map.setMinZoom(0.75)
		//	map.mapInstance.setZoom(1)
		}
	}
    };
    img.src = url;

}

function calculateZoom (dimensions, bounds) {
	var zoomLevel
	if (dimensions.width > bounds[1][1]) {
		zoomLevel = bounds[1][1]/dimensions.width
	}
	else if (dimensions.height > bounds[1][0]){
		zoomLevel =  bounds[1][0]/dimensions.height
	}
	else zoomLevel = 0;
	return zoomLevel
}
newGame.map.prototype.newMap =function(im){

	var newM = L.map('map', {zoomSnap: 0.25, minZoom:0, zoomDelta: 0.25, crs: L.CRS.Simple, trackResize: true, keyboard: true, scrollWheelZoom: 'center', scaler: window.devicePixelRatio}).setView([0,0],0);
  if(usingGoogleMaps){
    myGame.myMap.mapInstance.options.crs = L.CRS.EPSG3857
    roads = L.gridLayer.googleMutant({
    type: 'roadmap' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
})
roads.addTo(newM)
newM.setView([-128,128],2);
newM.setMaxBounds([-256,-256],[256,256])
//newM.fitBounds([-256,-256],[256,256]);

}
  else{

		 newM.fitBounds (this.bounds)
		this.background = L.imageOverlay(im, this.bounds)

		this.currentBaseLayer = L.featureGroup([this.background ]).addTo(newM);
			this.layers = [];
			var newLayer = {name: 'Main', layer: this.currentBaseLayer , img:this.imgUrl ,  imageId: this.background._leaflet_id, initial_background: this.background  };
		this.layers.push (newLayer);
		addOption ("Main")
		 baseMaps = {'Main':this.currentBaseLayer };
		this.layersControl = L.control.layers(baseMaps).addTo(newM);
		this.activeLayer = newLayer;
		this.layersDiv = document.getElementsByClassName("leaflet-control-layers leaflet-control")[0];

	fitImageDimensions (im,this.bounds,newM);

  }

   document.getElementById("map").style.visibility = "visible"
   selectedIcon = L.icon({
    iconUrl: 'media/imgs/marker_select.png',
	 iconSize: [30, 30],
	 iconAnchor: [20, 40],
	 labelAnchor: [-8,-25]
});
defaultIcon = L.icon({
    iconUrl: 'media/imgs/marker.png',
	 iconSize: [30, 30],
	  iconAnchor: [20, 40],
	  labelAnchor: [-8,-25]
});
   return newM;
}

function findBounds  (){
  var mapHeight = $('#map').height();
 var mapWidth = $('#map').width();
//  this.bounds =L.latLngBounds([-mapHeight/4,-mapWidth/4], [mapHeight/4,mapWidth/4]);
var bounds  = [[0,0],[mapHeight, mapWidth]]
return bounds;

}
function findSaveBounds  (){
	$("#map").css('width',mapPlayStyle.width)
  var mapHeight = $('#map').height();
 var mapWidth =  $('#map').width();
//  this.bounds =L.latLngBounds([-mapHeight/4,-mapWidth/4], [mapHeight/4,mapWidth/4]);
var bounds  =  L.latLngBounds([[0,0],[mapHeight, mapWidth]])
	$("#map").css('width',mapDesignStyle.width)
return bounds;

}
newGame.map.prototype.selectMarker = function (id) {
	if (this.prevSelected != null){
		this.prevSelected.setIcon(defaultIcon)
	}
	for (var i =0 ; i<this.markers.length; i++){
		if(this.markers[i]._leaflet_id == id) {
			this.markers[i].setIcon(selectedIcon)
			this.prevSelected = this.markers[i];
		}

	}

}
newGame.map.prototype.unselectMarker = function (id) {

	for (var i =0 ; i<this.markers.length; i++){
		if(this.markers[i]._leaflet_id == id) {
			this.markers[i].setIcon(defaultIcon)
			this.prevSelected = null;
		}

	}

}

newGame.map.prototype.hideMarker = function (name){

  for (var i=0; i<this.markers.length; i ++ ){
  //console.log(name)
      //console.log(this.markers[i].label)

    if ((this.markers[i].label._content === name)&&(this.markers[i]._icon!=null)) { 		//chech _icon and not isVisible because older versions don't have is Visible
			this.markers[i].isVisible = false
      this.markers[i]._icon.style.visibility = "hidden"
      this.markers[i].label._container.style.visibility = "hidden"
    }
  }
}

  newGame.map.prototype.showMarker = function (name){
    for (var i=0; i<this.markers.length; i ++ ){
      if (this.markers[i].label._content === name) {
				this.markers[i].isVisible = true
        this.markers[i]._icon.style.visibility = "visible"
        this.markers[i].label._container.style.visibility = "visible"
      }
    }

}
newGame.map.prototype.setActiveLayer = function (name){
	if(myGame.mode==2)
	myGame.clearDisplayTable();
  var layer = getLayerByName(name);
  this.hideAllLayers();
  this.mapInstance.addLayer(layer.layer);
this.activeLayer = layer;
this.checkMarkersVisibility ();
}
newGame.map.prototype.setToPlayMode = function (){


if (this.activeLayer.name!="Main") {
	previousLayer = "Main"
  var mainLayer = getLayerByName('Main');
  this.hideAllLayers();
  this.mapInstance.addLayer(mainLayer.layer);
  this.activeLayer = mainLayer;
}

this.showAllMarkers();
}
newGame.map.prototype.checkMarkersVisibility = function () {
	var allMarkers = this.markers
  for (var i=0; i<allMarkers.length; i ++ ){
    if ((allMarkers[i]._icon!=null)&&(allMarkers[i].isVisible!=undefined)){
			if (!allMarkers[i].isVisible){
      allMarkers[i]._icon.style.visibility = "hidden"
      allMarkers[i].label._container.style.visibility = "hidden"
		}
		else {
			  allMarkers[i]._icon.style.visibility = "visible"
				  allMarkers[i].label._container.style.visibility = "visible"
		}
    }
  }
}
newGame.map.prototype.showAllMarkers = function (){
  var allMarkers = this.markers
  for (var i=0; i<allMarkers.length; i ++ ){
    if ((allMarkers[i]._icon!=null)){
      allMarkers[i]._icon.style.visibility = "visible"
      allMarkers[i].label._container.style.visibility = "visible"
			allMarkers[i].label.updateZIndex(200)
    }
  }
}
newGame.map.prototype.setToEditMode = function (){
this.hideAllLayers()
for (var i=this.layers.length-1; i>=0; i--){
	  this.mapInstance.addLayer(this.layers[i].layer)
}
mapResize (this.mapInstance)
this.showAllMarkers();

}
newGame.map.prototype.hideAllMarkers = function (){
    var allMarkers = this.markers
    for (var i=0; i<allMarkers.length; i ++ ){
      if (allMarkers[i]._icon!=null){
        allMarkers[i]._icon.style.visibility = "hidden"
        allMarkers[i].label._container.style.visibility = "hidden"
      }
    }
}
newGame.prototype.addPoints = function(){
	if(!this.myMap.points){
	$("#addPointIcon").css('backgroundColor', '#75890c')
	$("#map").css('cursor', 'crosshair')
	this.myMap.points = true;
	}
	else {
		$("#addPointIcon").css('backgroundColor', '')
		this.myMap.points = false;
		$("#map").css('cursor', 'auto')
	}
}

function getLayerById (id){
  var layers = myGame.myMap.layers
    for (var i=0; i<layers.length; i++){
      if (layers[i].layer._leaflet_id == id)
      return layers[i];
    }
}
function getLayerByName (name){
  var layers = myGame.myMap.layers
    for (var i=0; i<layers.length; i++){
      if (layers[i].name == name)
      return layers[i];
    }
}
newGame.map.prototype.setDesignMode = function () {
	 this.mapInstance.addEventListener('click',function(e){ 			//ADD NEW POINT ON MAP
		 if(myGame.myMap.points){
		var table = document.getElementById("datatable").tBodies[0];
		var marker = L.marker(e.latlng, {icon: defaultIcon,  draggable: true});
    myGame.myMap.currentBaseLayer.addLayer(marker);
    if((myGame.myMap.activeLayer === undefined) || (myGame.myMap.activeLayer.name === undefined)){
      myGame.myMap.activeLayer= getLayerById(  myGame.myMap.currentBaseLayer._leaflet_id)
    }
	//	if (!marker.dragging.enabled())
	//	marker.dragging.enable();
	//marker.dragging.enable();
		marker.isVisible = true;
		myGame.myMap.markers.push(marker);
		var newPoint = new Point (marker._leaflet_id, myGame.myMap.activeLayer.name )
    myGame.points.push(newPoint);
		myGame.newEntry (myGame.idCounter, marker, marker._leaflet_id)
		marker.bindLabel('', {noHide:true});
		marker.showLabel();
		marker.on("click", clickOnPoint)
		marker.on("contextmenu",rightClickOnPoint)

	}

	 })
  this.mapInstance.on('baselayerchange', function(e) {
   myGame.myMap.activeLayer =  getLayerById(e.layer._leaflet_id)
   myGame.myMap.currentBaseLayer = e.layer;
})
	if ((myGame.modeLoaded.play)&&(myGame.points!=null)) {

		for (var i =0; i< this.markers.length; i++){
	//	if(!this.markers[i].dragging.enabled())
		//	this.markers[i].dragging.enable();
		if(	this.markers[i].dragging !=undefined)
		this.markers[i].dragging.enable()
		this.markers[i].options.draggable = true;
			this.markers[i].on("click", clickOnPoint)
		this.markers[i].on("contextmenu",rightClickOnPoint)
		}
	}
	if (this.mapImages.length>0) {
		this.removeBackgrounds();
	}
}

newGame.map.prototype.setMainBackground = function(newImage){
			var mapHeight = $('#map').height();
			var mapWidth = $('#map').width()
			var mapLayer;
  myGame.myMap.mapInstance.options.crs = L.CRS.Simple
  if(usingGoogleMaps){
    this.mapInstance.removeLayer(roads)
      usingGoogleMaps= false;
  }
  if(this.background!=null){
    var mapLayers = this.layers;
		var oldBackground = null;
		var layerToChange = null;
		var newBackground = null;
		var layerId = myGame.myMap.activeLayer._leaflet_id;
		if ( layerId === undefined){
			layerId = myGame.myMap.activeLayer.layer._leaflet_id;
		}
		mapLayer=	mapLayers.find(x=>x.layer._leaflet_id ===  layerId)
		layerToChange = mapLayer.layer
		oldBackground = layerToChange.getLayer(mapLayer.imageId)
    this.mapInstance.removeLayer(oldBackground);			//remove old background
		layerToChange.removeLayer(oldBackground)
		newBackground =L.imageOverlay(newImage, this.bounds);
			fitImageDimensions (newImage,this.bounds,  this.mapInstance);
		if (myGame.myMap.activeLayer.name == "Main"){
			this.background = newBackground
			this.imgData= newImage.split (',')[1]
			this.imgUrl = newImage;
		}
		if (myGame.mode === 1){											//if in design mode
			mapLayer.initial_background = newBackground;
		}
	 layerToChange.addLayer (newBackground)
	  mapLayer.img = newImage;
	  mapLayer.imageId = newBackground._leaflet_id;
		//	var message = "Background of Layer: "+ myGame.myMap.activeLayer.name + " has changed!"
			//console.log(message);

				if (myGame.mode === 2) {					//if in play mode push the temporary background to mapImages array
			this.mapImages.push({tempimg: newImage, tempId: newBackground._leaflet_id})
		}
		this.showAllMarkers();
  }
  }


newGame.map.prototype.addNewImage = function (newImage){
  myGame.myMap.mapInstance.options.crs = L.CRS.Simple
//  var bounds = this.background.getBounds();
  var newImg = L.imageOverlay(newImage, this.bounds).addTo(this.mapInstance);
  this.mapImages.push(newImg)
}
newGame.map.prototype.addLayer = function (uri,name){
//  var bounds = this.background.getBounds();
  var newImg = L.imageOverlay(uri, this.bounds)
  var baseLayerGroup=L.featureGroup ([newImg]);
//  baseLayerGroup.setZIndex(0)
var label = "<span id='" + name + "'>" + name + "</span>"
  var newLayer = {name: name, layer: baseLayerGroup , img: uri, imageId: newImg._leaflet_id , initial_background: newImg};
  this.layers.push (newLayer);
    this.layersControl.addBaseLayer(baseLayerGroup,label)
     addOption (name);
}
newGame.map.prototype.removeBackgrounds = function (){
	var layerEntry, newBackground;
  for (var i=0; i <this.mapImages.length; i++){
  this.mapInstance.removeLayer(this.mapImages[i])
	layerEntry = this.layers.find (x=>x.imageId === this.mapImages[i].tempId)
	if (layerEntry!=undefined) {							//retrieve the initial_background of the layer
		layerEntry.layer.removeLayer (this.mapImages[i].tempId)
		layerEntry.layer.addLayer (layerEntry.initial_background)
		layerEntry.img = layerEntry.initial_background._image.src;
		layerEntry.imageId = layerEntry.initial_background._leaflet_id;
	}
}
  this.mapImages = [];
  if (usingGoogleMaps)
  myGame.myMap.mapInstance.options.crs = L.CRS.EPSG3857
}
newGame.map.prototype.hideAllLayers = function (){
  var allLayers = this.layers
  for (var i=0; i <allLayers.length; i++){
    removeOption (allLayers[i].name)
    this.mapInstance.removeLayer(allLayers[i].layer)

  }

}
newGame.map.prototype.getLayersToSave = function (){
  var allLayers = this.layers
  var layersInfo = []
  var instance = {}
  for (var i=1; i <allLayers.length; i++){
    instance = {name: allLayers[i].name, imgUri: allLayers[i].img}
    layersInfo.push(instance);
  }
  return (layersInfo)

}
newGame.map.prototype.deletePoint = function (leaflet_ID){
		//var table = document.getElementById("datatable");
		for (var i=0; i<this.markers.length; i++){

				if (this.markers[i]._leaflet_id==leaflet_ID){
				if(myGame.points[i].layers === undefined)
					myGame.points[i].layers = "Main"
				var layerName = myGame.points[i].layers
				var layer = getLayerByName(layerName).layer;
				layer.removeLayer(this.markers[i])
				this.mapInstance.removeLayer (this.markers[i])
				this.markers.splice(i,1)
				myGame.points.splice(i,1)
				$("#rclick").css('visibility','hidden');
				rightClick = false;

			}

			}
		for (var i =0; i<myGame.dataTable.rows.length; i ++){
			var pointID = myGame.dataTable.rows[i].cells[0].textContent;
			if(leaflet_ID.toString() === pointID){
				myGame.dataTable.deleteRow (i);
					if (selectedRec === i)
					selectedRec = 0;
				myGame.idCounter --;
				myGame.deleteImage(pointID);
			}

		}


}

function clickOnPoint (e) {							//Click on point on Design Mode
	myGame.myMap.selectMarker(e.target._leaflet_id)
	var tableRows = myGame.dataTable.rows;
			for (var i=0; i<tableRows.length; i++){
				if (tableRows[i].cells[0].textContent==e.target._leaflet_id){
				tableRows[i].style.backgroundColor = "rgba(0,255,255,0.5)"

				if(selectedRec!=i)
					tableRows[selectedRec].style.backgroundColor = "#f2f2f2"
				selectedRec = i;
			}

			}
}
function playClick (e) {					//Click on point on Play Mode
	var imageSkips, tableRows, j, cel, type, pointValue, rowCount;
		myGame.myMap.selectMarker(e.target._leaflet_id)
			 imageSkips=0;
			myPoint =  myGame.points.find(x=>x.id === e.target._leaflet_id)

			 tableRows = myGame.displayTable.rows;
			tableRows[1].cells[1].textContent = myPoint.description;
			 rowCount = 2;
			for ( j=1; j<myGame.fields.length; j++){
				if((myGame.fields[j].visibility == null)||(myGame.fields[j].visibility == "visible")){
			//for (var j=2; j<tableRows.length; j++){
				 type = myGame.fields[j].type
				 cel = tableRows[rowCount-imageSkips].cells[1]
				 pointValue = myPoint.values[myGame.fields[j].name]
				switch (type) {
					case "file":
					imageSkips++
						break;
					case "url":
					 cel.innerHTML = "<a href='"+pointValue+"' target='_blank'>"+	pointValue +"</a>"
					break;
					case "formula":
						var formulaType = pointValue.type;
						if (formulaType=== "rand")
						{	cel.innerHTML = "Random number from: " + pointValue.from + " to: " +pointValue.to}
						else if (formulaType === "plus"){
							cel.innerHTML =  pointValue.num}
						else if (formulaType === "minus"){
								cel.innerHTML =  "-" + pointValue.num}
						else if (formulaType === "dev"){
								cel.innerHTML =  "/" + pointValue.num}
						else if (formulaType === "mul"){
								cel.innerHTML =  "*" +pointValue.num}
					break;
					default:
						cel.innerHTML= pointValue;

				}
				rowCount ++;
				}

			}

    /*  myGame.myMap.popup
       .setLatLng(e.latlng)
       .setContent(myGame.displayTable)
       .openOn(myGame.myMap.mapInstance);*/
			if (myGame.images.length > 0) {
				document.getElementById("pointImage").src =  myPoint.imguri;
			}

							e.target.label.updateZIndex(200)

}
function rightClickOnPoint (e){
		event = e.originalEvent;
			selectedPoint = e;
			//console.log(e.originalEvent.preventDefault())
			if(!rightClick){
			$("#rclick").css( {position:"absolute", "visibility":"visible", top:event.pageY, left: event.pageX});
			rightClick = true;
			}
			else {
				$("#rclick").css({"visibility":"hidden"});
				rightClick = false;
			}

}

function addNewImageLayer(evt) {
  var f = evt.target.files[0];
  console.log(f)
if (!f) {
      alert("Failed to load file");
  }
 else {
    var r = new FileReader();
    r.onload = function(e) {
  var   uri = e.target.result;
		 if(f.name==""){
			 f.name = myGame.myMap.layers.length+1
		 }
     myGame.myMap.addLayer(uri, f.name)

    }
   r.readAsDataURL(f);
  }
}

function addOption (name) {
  var option = document.createElement("option");
  var pointOption = document.createElement("option");
  option.text = name;
  pointOption.text = name;
//  console.log (option)
  layersElement.add(option);
  layersList2.add(pointOption);
}
function removeOption (name) {
//  console.log (option)
$("#layersList option[value='"+name+"']").remove();
//  layersElement.remove(option);
//  layersList2.add(pointOption);
}
function initializeLayersList (){
  var length = layersElement.options.length;
for (i = length; i <= 0 ; i--) {
  layersElement.remove(i)
  layersList2.remove(i)
}
}
function removeMapLayer(){
	  var layerName = layersElement.value;
	if (layerName === "Main") {
		alert ("You can not delete the Main Layer")
		return 0;
	}
	if(confirm(layersRemoveMessage)){

		var pos = 0;
  var layerName = layersElement.value;
  var layer = null;
  var allLayers = myGame.myMap.layers
  for (var i = 0; i<allLayers.length; i++){
    if (allLayers[i].name === layerName){
			pos = i;
      layer = allLayers[i].layer;
      break;
    }
  }
	var allPoints = myGame.points
	for (var i =allPoints.length-1;  i>=0; i--){
		if(allPoints[i].layers == layerName){
			myGame.myMap.deletePoint(allPoints[i].id)
		}
	}
  myGame.myMap.layersControl.removeLayer(layer)
  layersElement.remove(layersElement.selectedIndex);
  layersList2.remove(layersElement.selectedIndex);
  myGame.myMap.mapInstance.removeLayer(layer);
	allLayers.splice(pos, 1)
  document.getElementById("remove").style.visibility = "hidden";
}
}
