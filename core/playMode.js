
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
newGame = function () {
	this.savedGameVersion = 1;
	this.initialValues = [];
	this.points = [];
	this.variables = [];
	this.initCode = "";
	this.checkCode = "";
	this.endCode = "";
	this.visitedPoints = 0;
	this.otherSettings = {maxTime: -1, maxPoints: -1};
	this.totalCode = "";
	this.workspace1 = null;
	this.workspace2 = null;
	this.workspace3 = null;
	this.gameOver = false;
	this.fields = [];
	this.myMap = null;
	this.mode = 0;
	this.modeLoaded = {design: false, play: false}
	this.images =[];
	this.dataTable = document.getElementById("datatable")
	this.dataTableHeader = document.getElementById("datatableHeader")
	this.pointsLimit = false;
	this.timeLimit = false;
	this.instructions = "";
	this.playTimes = 0; //the times that the player plays the game again
	this.pointsHistory = []; //the points the player selects during a game

};





newGame.prototype.loadPlayMode = function (playGameSettings) {
var i, point;


	document.getElementById("map").style.visibility = "visible"
	if(usingGoogleMaps)
			 myGame.myMap.mapInstance.addLayer(roads)

	$("#playBoard").show();
	//document.getElementById("openGame").style.visibility = "hidden"
	this.variables = playGameSettings.variables;
	this.initialValues = [];
		for (var i = 0 ; i< playGameSettings.variables.length; i++){
			this.initialValues.push(playGameSettings.variables[i].value)
		}
	this.definitions = this.createDefinitionsCode();

	if (playGameSettings.initCode != null){			//new saved version
		this.savedGameVersion = 1;
		this.initCode = playGameSettings.initCode;
		this.checkCode = playGameSettings.code1;
		this.endCode = playGameSettings.code2;
			correctOlderVersions()
		this.code1 = this.definitions + this.checkCode;
		this.code2 = this.definitions + this.endCode
	}
	else {
		this.savedGameVersion = 0;
		this.initCode = playGameSettings.code1;
		this.checkCode = playGameSettings.code1;
	this.endCode = playGameSettings.code2;
		correctOlderVersions()
	this.code1 = this.checkCode;
	this.code2 =	this.endCode;
}

	this.fields = playGameSettings.fields;
for (i=0; i<playGameSettings.points.length; i ++){
	if(playGameSettings.points[i].layers === undefined){			//old version no layers option
			point = new Point (playGameSettings.points[i].id, "Main")
	}
	else{
	point = new Point (playGameSettings.points[i].id, playGameSettings.points[i].layers)
	}
	point.setAll (playGameSettings.points[i])
	this.points.push(point)
		playStyle();
}
	//console.log(this.points)


	this.mode = 2;
	this.visitedPoints = 0;
	w1.updateWorkspaceXml(playGameSettings.w1)
	w2.updateWorkspaceXml(playGameSettings.w2)
	w3.updateWorkspaceXml(playGameSettings.w3)
	this.otherSettings = playGameSettings.otherSettings;
/*	if (this.otherSettings.maxPoints > -1) {

		$("#maxPoints").val(this.otherSettings.maxPoints)
		$("#pointsLimitCheckBox").prop('checked', true);
		this.pointsLimitToggle ();
	}
	if (this.otherSettings.maxTime > -1) {
		$("#maxTime").val(this.otherSettings.maxTime)
		$("#timeLimit").prop('checked', true);
		this.timeLimitToggle ();
	}*/
	this.displayTable = document.getElementById("displayTable");
	this.overallTable = document.getElementById("overallTable")
	$("#playBoard").show()
	if(launchData==null)
	$("#home").css('visibility', 'visible')
	this.instructions = playGameSettings.inst;
	if(this.instructions=="  ")
		this.instructions = gameInstructionsDefault;
	this.fillGameInstructions(this.instructions );
	$("#gameInstructions").show();
	/*if(playGameSettings.mapSettings.bounds != undefined){
			//var bounds= playGameSettings.mapSettings.bounds
			bounds = L.latLngBounds (playGameSettings.mapSettings.bounds._southWest,playGameSettings.mapSettings.bounds._northEast  )
	}*/
//	else {
	var bounds = findBounds();//}
	var mapSettings = {img: playGameSettings.imgUrl, imgData:playGameSettings.imgData, mode: 2, bounds:bounds }
	this.myMap = new newGame.map (mapSettings);

	if(playGameSettings.layers != null) {
		 loadedLayers = playGameSettings.layers
		for (var k =0; k < loadedLayers.length; k++){
			if(loadedLayers[k].name == ""){
				var tempName = "undefiend" + k
				loadedLayers[k].name = tempName
			}
			this.myMap.addLayer(loadedLayers[k].imgUri, loadedLayers[k].name)
		}

	}

	this.initPlayMap(playGameSettings);

	this.importGameImages();
	this.initDisplayTable ();
	this.initProgressTable ();
		this.initializePoints();
		this.initPlayPoints ();
	this.modeLoaded.play = true;
	this.closePopUp();
	document.getElementById("select").disabled = false;
	this.myMap.layersDiv.style.visibility = 'hidden'
	this.myMap.setToPlayMode();
	this.startGame();
//	this.togglePlayInstructions();
}
function correctOlderVersions  () {
	var newText = 'selectedChoice.name'
	var newText2 = 'selectedChoice.name = null;'
			myGame.initCode= myGame.initCode.replace (/var selectedPoint = ' ';/g, newText2)
	myGame.initCode= myGame.initCode.replace (/selectedPoint/g, newText)
	myGame.checkCode=	myGame.checkCode.replace (/selectedPoint/g, newText)
myGame.endCode=	myGame.endCode.replace (/selectedPoint/g, newText)
if (myGame.savedGameVersion === 1){
	var	definitions = 'selectedChoice = {};selectedChoice.selections = 0;'
	var tempCode = myGame.initCode;
myGame.initCode = definitions;
myGame.initCode += tempCode;
}
if (myGame.savedGameVersion === 0){
var	definitions = 'movescounter = 0;\n'
	definitions += 'selectedChoice = {};'
	definitions += 'selectedChoice.name = null;'
	definitions += "selectedChoice.selections = 0;"
	definitions += "activeLayer = 'Main'"
	definitions += '\n'
	var tempCode = myGame.initCode;
myGame.initCode = definitions;
myGame.initCode += tempCode;
var tempCode = myGame.checkCode;
myGame.checkCode =definitions;
myGame.checkCode += tempCode;
var tempCode = myGame.endCode;
myGame.endCode =definitions;
myGame.endCode += tempCode;
}
}
newGame.prototype.createDefinitionsCode = function () {
	var definitions = "", newCommand = ""
	for (var i=0; i<this.variables.length; i++) {
		newCommand = this.variables[i].name + ' = ' + this.variables[i].value + ';\n'
		definitions += newCommand
	}
	definitions += 'movescounter = 0;\n'
	definitions += 'selectedChoice = {};'
	definitions += 'selectedChoice.name = null;'
	definitions += "selectedChoice.selections = 0;"
	definitions += "activeLayer = 'Main'"
	definitions += '\n'
	return definitions;
}

newGame.prototype.generatePlay = function(){ 			//Start playing the designed game
	if(this.myMap.markers.length === 0)			//if the game has no points alert a message
	{
		if(confirm(markersMessage)){
		this.generatePoints ();
		}
		else {return false;}

	}
	else {
	this.generatePoints ();
	}
	if(this.generateEvents()){
	//this.code += this.codeEnd;
	//this.totalCode += this.initCode+this.checkCode + this.endCode;
	myGame.changeToPlay();
}
}
newGame.prototype.changeToPlay= function (){			//change from Design mode to Play Mode i.e. when the user clicks "play" in design mode
	this.mode = 2
	this.definitions = this.createDefinitionsCode();
	this.code1 =  this.definitions  + this.checkCode ;
	this.code2 =  this.definitions  + this.endCode ;

	if (editor1_init){
	tbx1.style.visibility = "hidden"

	}
	if (editor2_init){
		tbx2.style.visibility = "hidden"
	}
	if (editor3_init)
	tbx3.style.visibility = "hidden"

//	$("#gameButtons").css('visibility','hidden');
if(usingGoogleMaps)
		 myGame.myMap.mapInstance.addLayer(roads)

	this.displayTable = document.getElementById("displayTable")
	this.overallTable = document.getElementById("overallTable");
	this.visitedPoints = 0;
//	this.points = myPoints;
	this.chageMapToPlay();
	this.initDisplayTable ();
	this.initProgressTable ();
	this.initPlayPoints ();
	this.modeLoaded.play = true;
	if(launchData==null)
	if (this.myMap.points){
		$("#addPointIcon").css('backgroundColor', '')
		this.myMap.points = false;
		$("#map").css('cursor', 'auto')
	}
	this.closePopUp();
	this.instructions = document.getElementsByClassName("jqte_editor")[0].innerHTML
	if(this.instructions=="  ")
		this.instructions = gameInstructionsDefault
	this.fillGameInstructions(this.instructions );
	$("#gameInstructions").show();
	playStyle();
	document.getElementById("select").disabled = false;
	document.getElementById("popUp").style.backgroundColor = gameStartColor
	//document.getElementById("messageArea").style.backgroundColor = "ccffcc"
	myGame.myMap.setToPlayMode();
	this.startGame();
}
newGame.prototype.initPlayPoints = function(){
	playPoints = [];
 var gamePoints = this.points;
 for (var i =0; i<gamePoints.length; i++){
	 playPoints.push ({id:gamePoints[i].id, description: gamePoints[i].description, timesSelected: 0})
 }
}
newGame.prototype.chageMapToPlay = function () {
	this.myMap.layersDiv.style.visibility = 'hidden'
	for (var i=0; i < this.myMap.markers.length; i++){

		var m = this.myMap.markers[i]
		m.removeEventListener("click")
		m.removeEventListener("contextmenu")
		if(m.dragging!=undefined)
		m.dragging.disable();

		m.options.draggable=false;
	//	m.dragging.disable();
		m.on("click", playClick);
	}
	this.closePopUp();
}
newGame.prototype.initPlayMap = function(playGameSettings) {  		//called when a game is loaded (not created in design mode)
var bounds = findBounds();
var w = bounds[1][1]
var h= bounds[1][0]
var oldBounds = playGameSettings.mapSettings.bounds;
var oldh = Math.abs(oldBounds._southWest.lat) + Math.abs(oldBounds._northEast.lat)
var oldw = Math.abs(oldBounds._southWest.lng) + Math.abs(oldBounds._northEast.lng)
	for (var i =0; i<this.points.length; i++){
		var oldLat = this.points[i].latlng.lat;
		var distH = Math.abs(oldBounds._southWest.lat) + oldLat;
		var newLat = distH/oldh * h;
		var oldLng = this.points[i].latlng.lng;
		var distW = Math.abs(oldBounds._southWest.lng) + oldLng;
		var newLng = distW/oldw * w;
		this.points[i].latlng = {lat: newLat, lng:newLng};
	}
	for (var i =0; i<this.points.length; i++){
		var point = this.points[i]
		var m = L.marker(point.latlng,{icon: defaultIcon,  draggable: false});

		if (point.layers != undefined){			//if it is created by the layers version
			var baseLayer = getLayerByName(point.layers).layer
			if(baseLayer!=null)
			baseLayer.addLayer(m)			//	add point to the related layer
		}
		else {
			m.addTo(this.myMap.mapInstance)
		}
		this.points[i].id = m._leaflet_id;
		m.bindLabel(this.points[i].description, {noHide:true});
		m.showLabel();
		this.myMap.markers.push(m);
		m.on("click", playClick);
		//m.on("contextmenu", );
	}

//console.log (this.points)
}


newGame.prototype.initDisplayTable = function(){				//creates the Table with the Point Info
	var body = this.displayTable.tBodies[0]
	if(this.modeLoaded.play){
		var rowsNumber = body.rows.length
		for (var i =rowsNumber-1; i>=0; i--){
			body.deleteRow (i)
			//console.log (i)
		}
		//console.log (i)
	}
	var count = 0;
	for(var i=0; i< this.fields.length; i++){
		if((this.fields[i].visibility==null)   || (this.fields[i].visibility=="visible")){
		if(this.fields[i].type != "file"){
		var row = body.insertRow (count);
		var cel = row.insertCell(0);
		cel.innerHTML = this.fields[i].name;
		cel= row.insertCell(1);
		count ++;
		}
		else

		$("#pointImage").show();
		}

	}

}
newGame.prototype.initProgressTable = function (){				//creates the score Table
var row1 = this.overallTable.rows[0];
var row2 = this.overallTable.rows[1];

if(this.modeLoaded.play){
	this.clearOverallTable ();

	}
	var count = 0;
	this.initialValues = [];											//set game initial values to the table and to the array initialValues
	for(var i=0; i< this.variables.length; i++){
		myGame.initialValues.push(this.variables[i].value);
		var cel1 =row1.insertCell(count);
		cel1.innerHTML = this.variables[i].name;
		var cel2 = row2.insertCell(count);
		cel2.innerHTML = this.variables[i].value;
		var im = document.createElement("img");
		im.setAttribute("height", "20");
		im.setAttribute("width", "20");
		im.setAttribute("visibility", "visible");
		im.src = "media/imgs/stable.png"
		cel1.appendChild (im);
		count ++;

	}
		var cel = row1.insertCell(count);
		cel.innerHTML = pointsVisitedText;
		cel.id = "pointsVisited"
		cel.style.backgroundColor ="#115c3c"
		cel.style.borderRight ="3px solid gray";
		cel= row2.insertCell(count);
		cel.style.backgroundColor ="#bfff80"
		cel.style.borderRight ="3px solid gray";
		cel.innerHTML = "0";


}

newGame.prototype.selectPoint = function() {				//What happens when player selects a point
	var popupEl = document.getElementById("popUp");
	var type, name;
	$("#popUp_text").html("");
	var cells1 = this.overallTable.rows[0].cells;
	var cells2 = this.overallTable.rows[1].cells;
	var counter = 0;
	var messageValues = "";
	var marker = this.myMap.markers.find(x=>x._leaflet_id===myPoint.id)
	if (marker._icon.style.visibility==="visible"){
		//var gamevalues = this.variables
	for(var i=1; i< this.fields.length; i++){
		type = this.fields[i].type;
		name = this.fields[i].name;
		if((type == "formula")||(type== "number")){
		var old = this.variables[counter].name + " = " + this.variables[counter].value.toString() ;
		var oldValue = this.variables[counter].value;

		if (type === "formula") {
				var formulaType = myPoint.values[name].type;
			switch (formulaType) {
				case "rand":
					var result = getRandomIntInclusive (myPoint.values[name].from, myPoint.values[name].to)
					this.variables[counter].value += result
					break;
				case "plus":
				this.variables[counter].value += Math.round((parseFloat(myPoint.values[name].num)+Number.EPSILON)*100)/100
				break;
				case "minus":
				this.variables[counter].value -=  Math.round((parseFloat(myPoint.values[name].num)+Number.EPSILON)*100)/100
				break
				case "dev":
					this.variables[counter].value /= Math.round((parseFloat(myPoint.values[name].num)+Number.EPSILON)*100)/100
				break;
				case "mul":
				this.variables[counter].value *= Math.round((parseFloat(myPoint.values[name].num)+Number.EPSILON)*100)/100
				break;

			}
		}
		if (this.fields[i].type == "number"){

		test = 	parseFloat(myPoint.values[name]) + this.variables[counter].value;
		this.variables[counter].value = Math.round(( test +Number.EPSILON)*100)/100
		}
		var newValue = Math.round((parseFloat(this.variables[counter].value )+Number.EPSILON)*100)/100
		cells2[counter].textContent = newValue;

		if (newValue > oldValue){
			cells1[counter].childNodes[1].src="media/imgs/up.png"
		}
		else if (newValue < oldValue){
			cells1[counter].childNodes[1].src="media/imgs/down.png"
		}
		else
			cells1[counter].childNodes[1].src="media/imgs/stable.png"
		var newv = this.variables[counter].name + " = " + newValue.toString();
		this.code1 = this.code1.replace (old, newv);
		this.code2 = this.code2.replace (old, newv);
			messageValues +=  newv +" | "
		counter ++;

		}
	}
	if(!myPoint.isDummy){
	old = 'movescounter = ' + this.visitedPoints;
	this.visitedPoints ++;
	newv = 'movescounter = ' + this.visitedPoints;
	this.code1 = this.code1.replace (old, newv);
	this.code2 = this.code2.replace (old, newv);}



	if(previousPoint!=null){
		var playPrevPoint = playPoints.find(x=>x.id === previousPoint.id);
	var old = 'selectedChoice.name = "' + previousPoint.description+'"';
	var old2 = 'selectedChoice.selections = ' + playPrevPoint.timesSelected;
}
	else{
	var old = 'selectedChoice.name = null' ;
	var old2 = 'selectedChoice.selections = 0';
	}
	previousPoint = Object.assign ({}, myPoint)
	var playPoint = playPoints.find(x=>x.id === myPoint.id);
	playPoint.timesSelected++;
	var newv = 'selectedChoice.name = "' + previousPoint.description+'"';
		var newv2 = 'selectedChoice.selections = ' + playPoint.timesSelected;
	this.code1 = this.code1.replace (old, newv);
	this.code2 = this.code2.replace (old, newv);
	this.code1 = this.code1.replace (old2, newv2);
	this.code2 = this.code2.replace (old2, newv2);
	old = "activeLayer = '" + previousLayer+"'";
	previousLayer = getLayerById(  this.myMap.currentBaseLayer._leaflet_id).name;
	newv = "activeLayer = '" + previousLayer+"'";
	this.code1 = this.code1.replace (old, newv);
	this.code2 = this.code2.replace (old, newv);


/*if (this.visitedPoints === this.otherSettings.maxPoints) {
		var  prevMes = 	$("#messageArea").html();
	$("#messageArea").html(popUpMessage+ prevMes);
	$("#popUp_text").html(popUpMessage)
//		document.getElementById("messageArea").style.backgroundColor= gameOverColor
		popupEl.style.backgroundColor= gameOverColor
		this.showPopUp();
		this.gameIsOver();
	}*/


		this.myInterpreter = new Interpreter(this.code1, initApi);
		try {
			this.myInterpreter.run();
}
	catch(err) {
		alert (generalErrorMessage + err )
	}
		this.myInterpreter = new Interpreter(this.code2, initApi);
		try {
  		this.myInterpreter.run();
	}
	catch(err) {
  	alert (generalErrorMessage + err )

	}

	 	var  prevMes = document.getElementById("messageArea").innerHTML
		var newMes = "<b> Choice "+ this.visitedPoints +": " + myPoint.description + "<br>Game Values: </b>" + messageValues + "<hr>" +prevMes;

		document.getElementById("messageArea").innerHTML =  newMes;
				updateScoreBoard(messageValues);
		}
		if(!this.gameOver){
				cells2[counter].textContent = this.visitedPoints;
		}
	}


newGame.prototype.backToEdit = function () {					//go to design mode from play mode

	var gameOverModal = document.getElementById("gameEnds");
		var i;
		this.gameOver = false;
		this.savedGameVersion = 1;
		this.myMap.layersDiv.style.visibility = 'visible'
	//myGame.myMap.setToEditMode();
	//myGame.myMap.setActiveLayer("Main")
	if(activeTab == 1){
		if(usingGoogleMaps)
				 myGame.myMap.mapInstance.removeLayer(roads)
		document.getElementById("map").style.visibility = "hidden"
		if (tbx2!= null){
		tbx2.style.visibility = "hidden"
		}
		if (tbx3 != null){
			tbx3.style.visibility = "hidden"
		}
		tbx1.style.visibility = "visible"

	}
	else if (activeTab == 2){
		if(usingGoogleMaps)
				 myGame.myMap.mapInstance.removeLayer(roads)
		  document.getElementById("map").style.visibility = "hidden"
		if (tbx1!= null){
		tbx1.style.visibility = "hidden"
		}
		if (tbx3 != null){
			tbx3.style.visibility = "hidden"
		}
		tbx2.style.visibility = "visible"
	myGame.myMap.hideAllMarkers();
	}
	else if (activeTab == 3){
		if(usingGoogleMaps)
				 myGame.myMap.mapInstance.removeLayer(roads)
		  document.getElementById("map").style.visibility = "hidden"
		if (tbx1!= null){
		tbx1.style.visibility = "hidden"
		}
		if (tbx2 != null){
			tbx2.style.visibility = "hidden"
		}
		tbx3.style.visibility = "visible"
		myGame.myMap.hideAllMarkers();
	}

	$("#designBoard").show()
	$("#playBoard").hide()
	$("#pointImage").hide();

//	document.getElementById("messageArea").innerHTML = gameStartedText + "\n";
	this.changeToDesign ();
	for ( i =0; i<this.variables.length; i++){
		this.variables[i].value = this.initialValues[i]
	}
	this.initializePoints();
	if (gameOverModal.style.display === "block") {
		gameOverModal.style.display = "none"
	}

}




  newGame.prototype.gameIsOver = function() {
	this.gameOver = true;
	document.getElementById("select").disabled = true;
	$("#again").css('visibility','visible');
 }
 newGame.prototype.clearDisplayTable = function (){
	var body = this.displayTable.tBodies[0]
	var length = body.rows.length;
	 for (i=0; i<length; i++){
	 body.rows[i].cells[1].innerHTML="";
 }
}
newGame.prototype.initializePoints = function (){

	this.clearDisplayTable();
	var markLength = this.myMap.markers.length;
	var marks =  this.myMap.markers
for (var i=0; i < markLength; i++){
	marks[i].isVisible = true;
}
if(myPoint!=null)
this.myMap.unselectMarker (myPoint.id)
	previousPoint = null;
	myPoint = null;
	this.visitedPoints = 0;
	previousLayer = "Main"
}
  newGame.prototype.playAgain = function() {
		var gameOverModal = document.getElementById("gameEnds");
		var i, rows,length, messages;
		messages = 	document.getElementById("messageArea");
		messages.innerHTML = gameStartedText + "\n";
		document.getElementById("select").disabled = false;
		document.getElementById("popUp").style.backgroundColor = gameStartColor;
		$("#popUp_text").html("");
		this.initializePoints();
		this.closePopUp();
		cells1 = this.overallTable.rows[0].cells;
		cells2 = this.overallTable.rows[1].cells;
		this.gameOver = false;
		length = this.variables.length;
		for( i=0; i< length; i++){
		this.variables[i].value = this.initialValues[i];
		cells2[i].textContent =  this.initialValues[i];
		cells1[i].childNodes[1].src="media/imgs/stable.png";
		this.playTimes ++;
		myGame.myMap.setToPlayMode();
	}
	this.pointsHistory = [];
	cells2[i].textContent = 0
	if (this.myMap.mapImages.length > 0) {
		this.myMap.removeBackgrounds()
	}
	for (var i =0; i<playPoints.length; i ++){
		playPoints[i].timesSelected = 0;
	}
	this.startGame();
	if (this.savedGameVersion == 1){
	this.code1 = this.definitions + this.checkCode;
	this.code2 = this.definitions + this.endCode;
	}
	else{
		this.code1 = this.initCode;
		this.code2 = this.endCode;
	}
if (gameOverModal.style.display === "block") {
	gameOverModal.style.display = "none"
}
 }


newGame.prototype.startGame = function () {
	if(this.savedGameVersion == 1){
	this. myInterpreter = new Interpreter(this.initCode, initApi);
	this.myInterpreter.run();
}
	var now = moment();
}

newGame.prototype.initWorkspaces = function ()
{
	if(editor1_init){
		w1.redrawWorkspace();
		tbx1.style.visibility = "hidden"
		//editor1_init = false;
	}
	if(editor2_init){
		w2.redrawWorkspace();
		tbx2.style.visibility = "hidden"
	//	editor2_init = false;

	}
	if(editor3_init){
	w3.redrawWorkspace();
		tbx3.style.visibility = "hidden"
	//	editor3_init = false;
	}

}
newGame.prototype.resetAll = function() {
	editor1_reloaded = false;
	editor2_reloaded = false;
	editor3_reloaded= false;
	fromFileOpen = false;
	if((this.modeLoaded.design)||(this.modeLoaded.play)){
		$("#gameInstructions").hide();

	this.myMap.mapInstance.remove();    //remove map background
	initializeLayersList();
	this.myMap.markers = [];
}

	if(this.modeLoaded.design){
	myTabs.goToTab(0);
	$("#map").css('visibility','hidden');
		var dt = document.getElementById ("datatable");
	var headerTable = document.getElementById ("datatableHeader");
	var tableRows = dt.rows.length;
	for (var i=tableRows-1; i>=0; i--){
		dt.deleteRow(i)
	}
	var tableCells = headerTable.rows[0].cells.length;
	for (var i = tableCells-1; i>3; i--){
		headerTable.rows[0].deleteCell(i)
	}
	headerTable.rows[0].cells[1].childNodes[0].value = "Description"
	headerTable.rows[0].cells[2].childNodes[0].value = "Field1"
	headerTable.rows[0].cells[3].childNodes[0].value = "Field2"
	this.initWorkspaces();
	this.modeLoaded.design = false;
	}
	if(this.modeLoaded.play ){
		this.savedGameVersion = null;
		this.initCode = null;
		this.code1 = null;
		this.code2 = null;
		body = this.displayTable.tBodies[0]
		var rowsNumber = body.rows.length
		for (var i =rowsNumber-1; i>=0; i--){
			body.deleteRow (i)
			//var rowsNumber = this.overallTable.rows.length
		}
	this.clearOverallTable ();
	//	document.getElementById("messageArea").innerHTML = gameStartedText +"\n";
	//	document.getElementById("messageArea").style.backgroundColor = "#ccffcc";
	//	document.getElementById("popUp").style.backgroundColor = gameStartColor;
		this.fillGameInstructions ("Game Instruction: -----------------------------")
		$("#map").css('visibility','hidden');
		this.modeLoaded.play =false;
		this.myMap.hideAllLayers();
	}

	previousPoint = null;
	previousLayer = "Main"
	myPoint = null;
	designSettings = defaultDesignSettings;
	playSettings = initialPlaySettings;
	for (var i =layersElement.length; i >=0  ; i--){
	layersElement.remove(i);
  layersList2.remove(i);
}
	this.initialValues = [];
	this.points = [];
	this.variables = [];
	this.initCode = "";
	this.checkCode = "";
	this.endCode = "";
	this.visitedPoints = 0;
	this.otherSettings = {maxTime: -1, maxPoints: -1};
	this.totalCode = "";
	this.gameOver = false;
	this.fields = [];
	this.myMap = null;
	this.mode = 0;
	this.modeLoaded = {design: false, play: false}
	this.images =[];
	this.dataTable = document.getElementById("datatable")
	this.dataTableHeader = document.getElementById("datatableHeader")
	this.pointsLimit = false;
	this.timeLimit = false;
	this.instructions = "";

	//activeTab = 0

}

newGame.prototype.clearOverallTable = function () {
	var colNumber = this.overallTable.rows[0].cells.length
		for (var i =colNumber-1; i>=0;  i--){
			this.overallTable.rows[0].deleteCell(i)
			this.overallTable.rows[1].deleteCell(i)
			//console.log (i)
		}
}
/*newGame.prototype.pointsLimitToggle = function() {
	if (this.pointsLimit){
		this.otherSettings.maxPoints = -1;
		this.pointsLimit = false;
		$("#settingsA").css('color', '#8c8c8c')
		$( "#maxPoints" ).prop( "disabled", true );

	}
	else
	{
		this.pointsLimit = true;
		$("#settingsA").css('color', 'black')
		$( "#maxPoints" ).prop( "disabled", false );

	}
}*/

newGame.prototype.timeLimitToggle = function() {
	if (this.timeLimit){
		this.timeLimit = false;
		$("#settingsB").css('color', '#8c8c8c')
		$( "#maxTime" ).prop( "disabled", true );

	}
	else
	{
		this.timeLimit = true;
		$("#settingsB").css('color', 'black')
		$( "#maxTime" ).prop( "disabled", false );

	}
}

newGame.prototype.deleteImage = function (imgId) {

	for (var j=0; j< this.images.length; j++){
		if (this.images[j].id == imgId)
			this.images.splice (j, 1);

	}

}

newGame.prototype.importGameImages = function (){
	for (var i =0; i<this.points.length; i++){
	if ((this.points[i].imguri!=="")&& (typeof this.points[i].imguri !== "undefined")){
		var newImg = {id: this.points[i].id, imguri: this.points[i].imguri}
		 this.images.push(newImg);
	}
	}
	if (this.images.length > 0){
		$("#pointImage").show();

	}
	else
		$("#pointImage").hide();
}

newGame.prototype.closePopUp = function () {
	$("#popUp").hide();
	if(!this.gameOver)
	document.getElementById("select").disabled = false;

}
newGame.prototype.showPopUp = function () {
	$("#popUp").show();
	document.getElementById("select").disabled = true;

}



newGame.prototype.fillGameInstructions = function (val) {
	$("#instructions").html(val);

}
newGame.prototype.togglePlayInstructions = function () {
	$("#gameInstructions").toggle();

}
newGame.prototype.useGoogleMaps = function(){
	alert ("Attention: Google Maps is still in trial mode.")
  myGame.myMap.mapInstance.options.crs = L.CRS.EPSG3857
	this.myMap.mapInstance.removeLayer(this.myMap.background);
	roads = L.gridLayer.googleMutant({
    type: 'roadmap' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
})
		// myGame.myMap.mapInstance.setMaxBounds();
		roads.addTo(myGame.myMap.mapInstance)

//myGame.myMap.mapInstance.setMaxBounds(null);
	myGame.myMap.mapInstance.setView([-128,128],2);
	myGame.myMap.mapInstance.setMaxBounds([-256,-256],[256,256])
	//myGame.myMap.mapInstance.fitBounds([-256,-256],[256,256]);
	usingGoogleMaps=true;
}
function showExamplesTable(){
	$("#examplesTable").toggle("blind", 1000);
}
function closeVideo (){
	$("#videoPlayerWindow").hide()
}
function showVideo (){
	$("#videoPlayerWindow").show()
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
function updateScoreBoard(values) {
		var scoreBoard = document.getElementById("current-score");
		scoreBoard.innerHTML = values;
}
