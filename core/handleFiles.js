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
function Point (id,layer) {
  this.id = id;
  this.description = "";
  this.values = {};
  this.imguri = "";
  this.layers = layer;
  this.isDummy = false;
  this.latlng = {};

  this.updateLayer = function (layer) {
    this.layers = layer;
  }
  this.pushValue = function (name, value) {
    this.values[name] = value;
  }
  this.clearValues = function (name, value) {
    this.values = {};
  }
  this.setImguri = function (uri) {
    this.imguri = uri;
  }
  this.setDescription = function (descr) {
    this.description = descr;
  }
  this.setDummy = function (dummy) {
    this.isDummy = dummy;
  }
  this.setPosition = function (latlng){
      this.latlng = latlng;
  }
  this.setAll = function (settings) {
    this.description = settings.description;
    this.imguri = settings.imguri;
    this.isDummy = settings.isDummy
    this.latlng = settings.latlng;
    if (settings.values.constructor == Array){      //oldest versions in which values is an array
      for (var i =1; i<myGame.fields.length; i ++) {                //for all fields starting from 1 because 0 is the description
        if(myGame.fields[i].type!="file")                //apart from images
        this.values[myGame.fields[i].name] = settings.values[i-1]         //create the property for this field and assign the value
      }
    }
    else {            //latest version
      this.values = settings.values;
      }
    }

}
document.getElementById('uploadImage').addEventListener('change', openImage, false)
document.getElementById('loadGame').addEventListener('change', readZipFile, false);
document.getElementById('addLayer').addEventListener('change', addNewImageLayer, false);
 function readZipFile(evt, handleLoaded) {

    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        handleFile(f);
    }


  }
function handleFile(f) {
      filesArray = []
      JSZip.loadAsync(f)
      .then(function(zip) {
        zip.forEach(function (relativePath, zipEntry) {
				filesArray.push(zipEntry)
        });
		handleLoaded(filesArray)

	}, function (e) {
        console.log( "Error reading " + f.name + " : " + e.message);

      });
    }

  function handleLoaded (filesAr){
    var initCode=null;
	 fromFileOpen = true;

		filesAr[0].async("base64")
	.then(function success(content) {
    imgUriLoaded = content.toString();
    // console.log (imgUriLoaded)
     imgUriLoaded = "data:image/gif;base64," + imgUriLoaded
  filesAr[1].async("string")
	.then(function success(content) {
  pointsLoaded = JSON.parse(content)
  //console.log (pointsLoaded)
		filesAr[2].async("string")
	.then(function success(content) {
   variablesLoaded =  JSON.parse(content)
  // console.log (variablesLoaded)
   filesAr[3].async("string")
	.then(function success(content) {
   code1Loaded =  content;
    filesAr[4].async("string")
   .then(function success(content) {
   code2Loaded =  content;
	   filesAr[5].async("string")
	.then(function success(content) {
   workspaceXml1 =  content;
     filesAr[6].async("string")
	.then(function success(content) {
   workspaceXml2 =  content;
     filesAr[7].async("string")
	 .then(function success(content) {
   workspaceXml3 =  content;
  // console.log (workspaceXml3);
     filesAr[8].async("string")
	.then(function success(content) {
   otherSet =  JSON.parse(content);
    filesAr[9].async("string")
	.then(function success(content) {
     fieldsLoaded =  JSON.parse(content)
	 filesAr[10].async("string")
	.then(function success(content) {
     instructions =  content;
     if(filesAr.length > 11){
   filesAr[11].async("string")
   .then(function success(content) {
       mapsettings =  JSON.parse(content);
       if (filesAr.length > 12){
  filesAr[12].async("string")
   .then(function success(content) {
        initCode =  content;
      if(filesAr.length > 13){
        filesAr[13].async("string")
         .then(function success(content) {
          var  layers =  JSON.parse(content)
        var playGameSettings = {imgUrl : imgUriLoaded,  points: pointsLoaded, variables: variablesLoaded, initCode:initCode, code1: code1Loaded, code2:code2Loaded, w1: workspaceXml1, w2: workspaceXml2, w3: workspaceXml3,otherSettings: otherSet, fields: fieldsLoaded, inst: instructions, layers:layers, mapSettings: mapsettings}
       myGame.loadPlayMode(playGameSettings);
       //console.log ('zip loaded')

     },
      function error(e) {
       console.log ("Error: Failed to load layers")
     });
    }
    else {
      var playGameSettings = {imgUrl : imgUriLoaded, points: pointsLoaded, variables: variablesLoaded, initCode:initCode, code1: code1Loaded, code2:code2Loaded, w1: workspaceXml1, w2: workspaceXml2, w3: workspaceXml3,otherSettings: otherSet, fields: fieldsLoaded, inst: instructions, mapSettings: mapsettings}
     myGame.loadPlayMode(playGameSettings);

    }
  },
     function error(e) {
      // handle the error
    });
   }
    else {
      var playGameSettings = {imgUrl : imgUriLoaded, points: pointsLoaded, variables: variablesLoaded, initCode:initCode, code1: code1Loaded, code2:code2Loaded, w1: workspaceXml1, w2: workspaceXml2, w3: workspaceXml3,otherSettings: otherSet, fields: fieldsLoaded, inst: instructions,  mapSettings: mapsettings}
     myGame.loadPlayMode(playGameSettings);
    }
  },
   function error(e) {
    // handle the error
  });
 }
    else{
   var playGameSettings = {imgUrl : imgUriLoaded, points: pointsLoaded, variables: variablesLoaded, initCode:initCode, code1: code1Loaded, code2:code2Loaded, w1: workspaceXml1, w2: workspaceXml2, w3: workspaceXml3,otherSettings: otherSet, fields: fieldsLoaded, inst: instructions,  mapSettings: mapsettings}
		//console.log (pointsLoaded);
		//console.log(playGameSettings.points)
	myGame.loadPlayMode(playGameSettings);
}
	$("body").css("cursor", "default");

	}, function error(e) {
    console.log ("error reading instructions file ")
	});


	}, function error(e) {
    console.log ("error reading fields file ")
	});

	}, function error(e) {
    console.log ("error reading other settings")
	});
	}, function error(e) {
    console.log ("error reading workspace3 ")
	});
	}, function error(e) {
    console.log ("error reading workspace2 ")
	});
	}, function error(e) {
    console.log ("error reading workspace1 ")
	});
	}, function error(e) {
    // handle the error
	});

	}, function error(e) {
    // handle the error
	});
	},
	 function error(e) {
    // handle the error
	});
	},
	function error(e) {
  // handle the error
});
}, function error(e) {
  // handle the error
});
  }

	newGame.prototype.generatePoints = function (){
	var i, id, tableRows, type, k, field, cel, j, point, uri, ftype, from, to, formula, latlng, img;
  tableRows = document.getElementById("datatable").rows;
	for (i=0; i<tableRows.length; i ++){             //for each row of the dataTable
        id = parseInt(tableRows[i].cells[0].textContent) ;     // get the id (1st column) and make it Integer
        point = myGame.points.find(x=>x.id === id);           // get the Point object with this id from the myGame.points array
        if(point!= undefined){
             point.clearValues ();
        point.setDescription (tableRows[i].cells[1].childNodes[0].value)  //set the description of the point object to the value of column 2
	for (j=1; j<this.fields.length; j++){              //for every field - rest of the rows
     field = this.fields[j]
     cel = tableRows[i].cells[j+1]

		if(field.type === "file"){                //if its an image type field
      img = myGame.images.find(x=>x.id === id);      //get the uri of the img with the id of this Point
      if (img!= undefined){
          point.setImguri(img.imguri)                //set the uri of the point object
      }

		}
    else if (field.type === "formula") {         //if its a formula type field
      var ftype = cel.getElementsByTagName("select")[0].value;        //get the type of the formula
      if(ftype === "random"){
         from = cel.getElementsByTagName('input')[0].value;      //from input
         to = cel.getElementsByTagName('input')[1].value;     //to input
         formula = {type: "rand", from: from, to: to}
      }
      else {
          var num = cel.getElementsByTagName('input')[0].value;
          var formula = {type: ftype, num: num}
      }
      point.pushValue (field.name, formula)
    }
    else{                 //its a number,url,text type field
		  point.pushValue (field.name, cel.childNodes[0].value)         //push the value to point's values
  }
	}
  latlng = this.myMap.markers.find(x=>x._leaflet_id === id )._latlng       //find the latlng of this point in markers[]
  point.setPosition (latlng);              //set latlng of this point object
  }
	}
  console.log (myGame.points)
}


newGame.prototype.downloadScore = function(){
var currentScore = document.getElementById ("current-score").textContent;
var history = document.getElementById ("messageArea").textContent;
var doc = new jsPDF("landscape")
var d = new Date();
var datetime = "Last Sync: " + d.getDate() + "/"
                +(d.getMonth()+1)  + "/"
                + d.getFullYear() + " @ "
                + d.getHours() + ":"
                + d.getMinutes() + ":"
                + d.getSeconds();
doc.setFont('LiberationSerif-Regular');
doc.setFontSize(22);
doc.setTextColor (255, 153, 51)
message = "ChoiCo Game"
doc.text(20, 20,message);
doc.setFontSize(12);
doc.setTextColor (0, 0, 0)
message=  "Your Progress on " + datetime;
doc.text(20, 30, message);
doc.setLineWidth(1);
doc.line(20, 40, 220, 40);
doc.setFontSize(14);
message = "Your score: " + currentScore
message = doc.splitTextToSize(message, 180)
doc.text(20, 60, message);
message = "Times you played the game (so far): " + myGame.playTimes;
doc.text(20, 90, message,);
message = "Choices history (reversed oreder): "
doc.text(20, 100, message);
message = history
message = doc.splitTextToSize(message, 260)
doc.text(20, 110, message);
doc.save('ChoiCo_game_score.pdf');
}
newGame.prototype.saveGame = function(){


	this.generatePoints ();
	if(this.generateEvents()){
	//this.totalCode += this.initCode+this.checkCode + this.endCode;
	this.createZipFile ( this.points);
	this.saveBlob ();}
}

newGame.prototype.createZipFile = function(myPoints) {
	  zip = new JSZip();

	  if(!editor1_init){

		 var xml_text1 = w1.workspaceXml;
	  }
	  else {

	     var xml1 = w1.getWorkspace();
	   var xml_text1 = Blockly.Xml.domToText(xml1);
	  }
	  if (!editor2_init) {

		   var xml_text2 = w2.workspaceXml;

	  }
	  else {
		  var xml2 = w2.getWorkspace();
	 var xml_text2 = Blockly.Xml.domToText(xml2);
	  }
	  if (!editor3_init) {

		 var xml_text3 = w3.workspaceXml;


	  }
	 else {

	var xml3 = w3.getWorkspace();
	 var xml_text3 = Blockly.Xml.domToText(xml3);
 }
	// imgUrl = uri.replace("image/png", "image/octet-stream");
	if (this.myMap.imgUrl == "examples/city.jpg") {
		this.myMap.imgData = getBase64Image (this.myMap.imgUrl)
	}

	var instructions = document.getElementsByClassName("jqte_editor")[0].innerHTML
 if(usingGoogleMaps){
    var mapSets = {zoom: this.myMap.mapInstance.getZoom(),bounds: findSaveBounds(), googleMaps : true}

  }
  else{
  var mapSets = {zoom: this.myMap.mapInstance.getZoom(),bounds:findSaveBounds(), googleMaps : false}
}

	zip.file("background.png", this.myMap.imgData, {base64 :true});
	 var pointsString = JSON.stringify (this.points);
   var layerString = JSON.stringify (this.myMap.getLayersToSave());
	 var variablesString = JSON.stringify (this.variables);
	 var allvariablesString = JSON.stringify (this.fields);
   var initialCode = this.initCode;
	var code1  = this.checkCode;
	var code2  = this.endCode;
	 var otherSet = JSON.stringify (this.otherSettings);
   var mSet = JSON.stringify (mapSets);
	 zip.file ("poitnsDB.json", pointsString );
	zip.file ("variables.json", variablesString );
	zip.file ("code1.txt", code1 );
	zip.file ("code2.txt", code2 );
	zip.file("workspace1.xml", xml_text1);
	zip.file ("workspace2.xml", xml_text2)
	zip.file ("workspace3.xml", xml_text3)
	zip.file ("otherSettings.json", otherSet );
zip.file ("fields.json", allvariablesString );
zip.file ("instructions.txt", instructions );
zip.file ("mapSettings.json", mSet)
  zip.file ("initialCode.txt", initialCode)
  zip.file ("layers.json", layerString);
 }

newGame.prototype.saveBlob = function () {
	 zip.generateAsync({type:"blob"})
.then(function (blob) {
	  link = document.createElement('a');
	  var fileName = prompt("Filename", "");
	  link.download = fileName+".zip";

		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		link.href = window.URL.createObjectURL(blob);
		link.onclick = destroyClickedElement;
		link.style.display = "none";
		document.body.appendChild(link);
	  link.click();

});
 }
 newGame.prototype.generateEvents = function (){  	//gets the code from workspaces and the database from datatable

if(!this.checkIntialForBugs ()){
  return false;}
else {
if (!editor2_init){
	if(!fromFileOpen)
		this.checkCode = "";
}
else
	this.checkCode = w2.getJavascriptCode();
if (!editor3_init){
	if(!fromFileOpen){
	if(confirm (tab3Message)){
		this.endCode = "";
	}
	else return false;
	}
}
else
	this.endCode = w3.getJavascriptCode();

 /*if(this.pointsLimit)
this.otherSettings.maxPoints = parseFloat($("#maxPoints").val())
if (this.timeLimit)
this.otherSettings.maxTime = parseFloat($("#maxTime").val());*/
return true;
}

}
newGame.prototype.checkBlocklyVar = function (varName) {
  var found = this.variables.find (x => x.name === varName);
  if (found === undefined) {

    return false;
  }
  return true;
}

newGame.prototype.checkIntialForBugs = function () {
   var numberVariables, xml, fieldName, curBlock,  value, v, found, name, w1Blocks, i;
   var curentValues = [];
   var currentVars = [];
   var blocklyVars = [];
  if (!editor1_init){
   alert (tab1Message);
   return false;
	}
   this.variables = [];
  	for (var i = 0; i < this.fields.length; i ++){
  		if (this.fields[i].type == "number"){
  			this.variables.push({name: this.fields[i].name, type: this.fields[i].type})
  		}
    	if (this.fields[i].type == "formula"){
      			this.variables.push({name: this.fields[i].name, type: this.fields[i].type})
      		}
  	}
  xml = w1.getWorkspace();
  w1Blocks = w1.getBlocks();
  found=false;
  for (i =0; i < w1Blocks.length; i ++){
    curBlock = w1Blocks[i];
  	if (curBlock.type== "initialValue" ){
       fieldName = curBlock.getField('varName').value_;
       if (curBlock.getChildren()[0].type != 'math_number'){
       alert ("Ooops: You have to insert a number for the attribute "+fieldName+ " at the Inital Settings blocks (tab1)");
       return false;
     }
     value = curBlock.getChildren()[0].getFieldValue('NUM')
     v = {name: fieldName, value: parseFloat(value)} ;
     blocklyVars.push(v) ;
  	}
  }
  for (i=0; i < this.variables.length; i++){
    found = false;
     name = this.variables[i].name.replace (' ', '_');
    for (j=0; j<blocklyVars.length; j++){
    if( name == blocklyVars[j].name){
      this.variables[i].value = blocklyVars[j].value;
      found = true;
    }
  }
    if (!found){
    alert ("Ooops: You have not set the initial value of attribute "+this.variables[i].name + " at the Inital Settings tab (tab1)");
    return false;}
  }
  this.initCode = w1.getJavascriptCode();
  this.initCode += "var selectedPoint = ' '; \n var movescounter = 0;\n"
  this.definitions = this.createDefinitionsCode ();
  return true;
  }
function openImage(evt) {     //when user uploads an image to change the background in design mode
    var f = evt.target.files[0];
  if (!f) {
        alert("Failed to load file");
    }
	 else {

      var r = new FileReader();
      r.onload = function(e) {

	     uri = e.target.result;
		 myGame.myMap.setMainBackground (uri);

      }
     r.readAsDataURL(f);
    }
  }

  newGame.prototype.openInstance = function (fileName, source){
    var fpath;
        $("body").css("cursor", "wait");
        if (source!=3){
          fpath = 'examples/' +fileName +'.zip'
        }
        else    //digitalSchoolInstance
        fpath =  "loadgameinstantly/game.zip"
	  JSZipUtils.getBinaryContent(fpath, function(err, data) {
  if(err) {
      if (source!=3)
    alert ("Ooops! I couldn't open the game with the name: " + fileName)
      $("body").css("cursor", "default");
    return 0;
  }
  if (source ===3){
    changeLanguage("Gr");
    document.getElementById("dSchoolInfo").style.visibility = 'visible';
  }
  if(source == 2)     //from external link
    playIntroStyle();
 handleFile(data)
});

}

function uploadIcon (evt) {
  var f = evt.target.files[0];
  if (!f) {
        alert("Failed to load file");
    }
	 else {
      var r = new FileReader();
      r.onload = function(e) {
	     var uri = e.target.result;
       $("#iconThumb").attr("src",uri);
      }
     r.readAsDataURL(f);
    }
  }
		$("#uploadIcon").on('change', uploadIcon)
  function loadImgFile(evt) {

    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];
	var rowNumber = this.parentNode.parentNode.rowIndex;
	var thumb = this.nextElementSibling;

//	console.log (f.type);
  if (!f) {
        alert("Failed to load file");
    }
	 else {

      var r = new FileReader();
      r.onload = function(e) {

	     var uri = e.target.result;
       var id =   parseInt(myGame.dataTable.rows[rowNumber].cells[0].innerHTML)
		 var newImg = {id: id, imguri: uri}
     var img = myGame.images.find(x=>x.id === id)
     if (img!= undefined)  //image already uploaded for this
      img.imguri = uri;
      else
		 myGame.images.push(newImg);
		 thumb.src = uri



      }
     r.readAsDataURL(f);
    }
  }
