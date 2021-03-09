
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
$(document).ready(function () {


	 mediaPlayer = new MediaElementPlayer('videoPlayer', {

			success: function(mediaElement, originalNode, instance) {
				t = mediaElement;
			}
		});


	loadXml ('xmls/workspace1.xml').then (function(workspaceXml) {
		loadXml ( 'xmls/toolbox1.xml').then (function (toolboxXml){
				w1 = new codingWorkspace (workspaceXml, toolboxXml, document.getElementById('blocklyDiv'));
		})

});


loadXml ('xmls/workspace2.xml').then (function(workspaceXml) {
	loadXml ( 'xmls/toolbox2.xml').then (function (toolboxXml){
			w2 = new codingWorkspace (workspaceXml, toolboxXml, document.getElementById('blocklyDiv2'));
	})

});
loadXml ('xmls/workspace3.xml').then (function(workspaceXml) {
	loadXml ( 'xmls/toolbox3.xml').then (function (toolboxXml){
			w3 = new codingWorkspace (workspaceXml, toolboxXml, document.getElementById('blocklyDiv3'));
			initialize();
		//videoPlayer = new MediaElementPlayer('#videoPlayer');
		$("#messageArea").hide();
		changeLanguage ("Eng")
		$("#designInstructions").toggle();
		if(this.instructions != "")
		$("#gameInstructions").toggle();
		checkUrl ()
	})


});
	usingGoogleMaps = false;


});
function checkUrl() {
	var filename = window.location.href.split( '?' );
if (filename.length>1){
lang = filename[1].split ('_');
fromFileOpen = true;
if (lang[1]=="Gr")
changeLanguage();
playIntroStyle ();
myGame.openInstance(filename[1]);


}
}
function initialize () {

	 mapOnPlaySettings = {left: '15%', width: '80%', top: '7%'}
	 mapOnDesignSettings = {left: '6%',width: '52%', top: '3%'}
	docWidth = $(document).width();
	docHeight =  $(document).height();
	previousPoint = null;
	previousLayer = "Main"
	myPoint = null;
	editor1_reloaded = true;
	editor2_reloaded = true;
	editor3_reloaded = true;
	//myGame.gameOver = false;
	if (docWidth > docHeight){
		wideScreen = true
	}
	else wideScreen = false;
	$('#datatable> tbody').height($('#data').height()*0.8)
	$('#container').height(docHeight -  docHeight*0.1)
	$('#designBoard').height(docHeight - docHeight*0.1)
	$('.b-content').height(docHeight - docHeight*0.1)
	designSettings = initialDesignSettings
	playSettings = initialPlaySettings;

	myGame = new newGame ();
	activeTab = 0
	fromFileOpen = false;
	if (launchData!= null)  {				//Open throught DME or other platform
		 var playGameSettings = {imgUrl : launchImage, points: launchPoints, variables: launchVariables, code: launchCode, w1: launchXml1, w2: launchXml2, otherSettings: launchSettings, fields: launchFields}
		myGame.loadPlayMode(playGameSettings);
	  	$("#introT").html("Play Mode");
		$("#introST").html("");

		fromFileOpen = true;
		$("#home").css('visibility','hidden');

	}

	editor1_init = false;
	tbx1=null;
	tbx2=null;
	tbx3=null;
	editor2_init = false;
	editor3_init = false;
//hideFormulaOptions();

}

function newDesignMode (){
	myGame.loadDesignMode (designSettings);
}






newGame.prototype.initEditor1 = function (){

	if(!editor1_init){
		generateBlocks();
		var blocklyArea = document.getElementById('editor1');
  var blocklyDiv = document.getElementById('blocklyDiv');
		w1.initializeWorkspace();
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
	tbxs = document.getElementsByClassName("blocklyToolboxDiv")
	tbx1 = 	tbxs[tbxs.length-1]
	editor1_init = true;
	}
	else {
		if ((!editor1_reloaded)&&(fromFileOpen)){
			w1.redrawFromXml();
			editor1_reloaded = true;
		}
		else {

			w1.redrawWorkspace();
		}
		updateBlocks();

		tbx1.style.visibility = "visible";
		tbx1.style.left = "72.98px";
		tbx1.style.top = "98.316px";
		tbx1.height = "400px";




	}
		myGame.myMap.hideAllMarkers();
			this.myMap.layersDiv.style.visibility = 'hidden'
	if(editor2_init)
		tbx2.style.visibility = "hidden";
	if(editor3_init)
		tbx2.style.visibility = "hidden";

}



newGame.prototype.initEditor2 = function () {

	if (editor2_init){
		if ((!editor2_reloaded )&&(fromFileOpen)){
			w2.redrawFromXml()
			editor2_reloaded = true;
		}
		else{

			w2.redrawWorkspace();
		}
		updateBlocks();

		tbx2.style.visibility = "visible";
		tbx2.style.left = "72.98px";
		tbx2.style.top = "98.316px";
		tbx2.style.height = "400px";


	}
	else {
		generateBlocks();
		 var blocklyDiv = document.getElementById('blocklyDiv2');
		w2.initializeWorkspace();
		var blocklyArea = document.getElementById('editor2');
		blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
		blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
		tbxs = document.getElementsByClassName("blocklyToolboxDiv")
		tbx2 = 	tbxs[tbxs.length-1]
		editor2_init =true;

	}
	myGame.myMap.hideAllMarkers();
	this.myMap.layersDiv.style.visibility = 'hidden'
		if (editor3_init)
		tbx3.style.visibility = "hidden";

		if (editor1_init)
		tbx1.style.visibility = "hidden";

		}


newGame.prototype.initEditor3 = function () {
	if (editor3_init){
		if ((!editor3_reloaded)&&(fromFileOpen)){
		w3.redrawFromXml();
			editor3_reloaded = true;
		}
		else{
	w3.redrawWorkspace();
		updateBlocks();
		tbx3.style.visibility = "visible";
		tbx3.style.left = "72.98px";
		tbx3.style.top = "98.316px";
		tbx3.height = "400px";

	}
}
	else {
		generateBlocks();
		 var blocklyDiv = document.getElementById('blocklyDiv3');
	w3.initializeWorkspace();
		var blocklyArea = document.getElementById('editor3');
		blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
		blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';

		tbxs = document.getElementsByClassName("blocklyToolboxDiv")
		tbx3 = 	tbxs[tbxs.length-1]
		editor3_init = true;

	}
	myGame.myMap.hideAllMarkers();
	this.myMap.layersDiv.style.visibility = 'hidden'
	if (activeTab == 2)
		tbx2.style.visibility = "hidden"
	if (activeTab == 1)
		tbx1.style.visibility = "hidden"

}

function getBase64Image(url) {
	var img = document.createElement("img")
	img.width = $("#map").width();
	img.height = $("#map").height();
	img.src = url;
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = $("#map").width();
    canvas.height = $("#map").height();

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, $("#map").width(), $("#map").height());

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}



window.onbeforeunload = function (e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Are you sure you want to exit? All your data will be lost!';
    }

    // For Safari
    return 'Are you sure you want to exit? All your data will be lost!?';
};
