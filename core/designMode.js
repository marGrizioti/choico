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
selectedRec = 0;
selectedRow = null;
rightClick = false;
var imgData = null;

newGame.prototype.loadDesignMode = function (designGameSettings){ 			//it is called when 'design game' is selected by the main screen
var bounds = findBounds();
var mapSettings = {img: designGameSettings.imgUrl, mode: 1, bounds: bounds}

this.myMap = new newGame.map (mapSettings);
this.myMap.setDesignMode();
this.fields = designGameSettings.fields
this.idCounter = 0;
this.fieldsCounter = 4;
this.checkId = -1;
this.mode = 1;
this.modeLoaded.design = true;
this.myMap.imgData = getBase64Image(designGameSettings.imgUrl)
for (var i = 0; i<designGameSettings.variables.length; i++){
	this.initialValues.push(designGameSettings.variables[i].value)

}
designStyle();
}
newGame.prototype.openLayersSettings = function(){
	  document.getElementById("mapLayersSettings").style.visibility = 'visible';
}
newGame.prototype.hideLayersSettings = function(){
	  document.getElementById("mapLayersSettings").style.visibility = 'hidden';
		document.getElementById("remove").style.visibility = "hidden";
		document.getElementById("rename").style.visibility = "hidden";
}
newGame.prototype.pointSettings = function() {

  for (var i=0; i<this.points.length; i++){
      if (this.points[i].id==selectedPoint.target._leaflet_id){
				this.currentPoint = this.points[i];
        document.getElementById("pointName").innerHTML = this.points[i].description;
				layersList2.value = this.points[i].layers
				if (this.currentPoint.isDummy){
					document.getElementById("dummy").checked = true
				}
				else {
					document.getElementById("dummy").checked = false
				}
        document.getElementById("pointSettings").style.visibility = "visible"

        break;
      }
    }
  $("#rclick").css('visibility','hidden');
  rightClick = false;

}
newGame.prototype.savePointSettings = function () {
		var oldLayer = getLayerByName (this.currentPoint.layers).layer
		var newLayer = getLayerByName (layersList2.value).layer
		oldLayer.removeLayer(selectedPoint.target)
	this.currentPoint.layers = layersList2.value;
	newLayer.addLayer(selectedPoint.target)
	if (document.getElementById("dummy").checked) {
		this.currentPoint.isDummy = true;
	}
	else {
		this.currentPoint.isDummy = false;
	}
	document.getElementById("pointSettings").style.visibility = "hidden"
}
newGame.prototype.changeToDesign = function (){     //Go from play mode to design mode.

	this.mode = 1
	if(!this.modeLoaded.design){
		this.myMap.imgData = getBase64Image(this.myMap.imgUrl)
		this.dataTable = document.getElementById("datatable");
		this.modeLoaded.design = true;
		this.idCounter = 0;
		this.fieldsCounter = this.fields.length;
		this.checkId = -1;
		this.importVariables ();
		$("#instructionsEditor").jqteVal (this.instructions)
		//$("#header >p").html(designModeText);

	}
	this.myMap.setToEditMode();
	this.myMap.setDesignMode();
	this.myMap.setActiveLayer("Main")
			this.myMap.showAllMarkers();
	designStyle ();
	

}


 newGame.prototype.addInstructions = function(){
	 $("#designInstructions").show();
 }



function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function showJavascript (ws){ //TODO}
var jsCode = Blockly.JavaScript.workspaceToCode(ws);
alert(jsCode)
}
function showPython (ws){ //TODO}
var pythonCode = Blockly.Python.workspaceToCode(ws);
alert(pythonCode)
}
function showInfo (){ //TODO}
}
function showLayerOptions() {

	if(layersElement.value != "Main"){
	document.getElementById("rename").style.visibility = "visible";
		document.getElementById("remove").style.visibility = "visible";
}
else {
	document.getElementById("rename").style.visibility = "hidden";
		document.getElementById("remove").style.visibility = "hidden";
}
}
function openRenameDialogue() {
	var selectedLayer = layersElement.value;
	if (selectedLayer == "Main") {
		alert ("You can not rename the Main Layer")
		return 0;
	}
	var message = "New name for layer: " +selectedLayer
	var newName = prompt(message, "");
	console.log (newName)
	if (newName == ""){
		alert ("You didn't game a name!")
		return;
	}
	var id = layersElement.selectedIndex;
	var points =  myGame.points
	for (var i = 0; i <points.length; i++){
		if (points[i].layers == selectedLayer){
			points[i].layers = newName
		}
	}
	myGame.myMap.layers[id].name = newName;
	layersElement.options[id].text = newName;
	var radioButton = document.getElementById(selectedLayer)
	radioButton.innerHTML = newName
	radioButton.id = newName
	var newNameForControl = "<span id='" +newName + "'>"+ newName+"</span>"
	myGame.myMap.layersControl._layers[id].name = newNameForControl
}
