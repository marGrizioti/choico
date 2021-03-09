function designStyle () {
	  closeVideo();
    $("#map").css('visibility', 'visible')
	$("#back").css('visibility', 'hidden')
	$("#logButton").css('visibility', 'hidden');
	$("#gameInfos").css('visibility', 'hidden');
	$("#again").css('visibility', 'hidden')
	$("#play").css('visibility', 'visible')
	$("#save").css('visibility', 'visible')
	//$("#helpMenu").css('visibility', 'visible')
  $("#designBoard").show();
  $("#designMode").hide();
  $("#playMode").hide();
  $("#introT").html(designModeText);
  $("#introT").css('margin-top','0px');
  $("#introT").css('margin-left','40%');
  $("#introT").css('font-size','4vh');
  $("#introST").hide();
  $("#home").css('visibility', 'visible')
	loadMapStyle (1);
}

function playStyle () {
  closeVideo();
  	$("#introT").html(playModeText);
  	$("#designBoard").hide();
  	  document.getElementById("map").style.visibility = "visible"
  	$("#playBoard").show();
  	$("#home").css('visibility', 'visible')
	$("#back").css('visibility', 'visible');
	$("#logButton").css('visibility', 'visible');
	$("#gameInfos").css('visibility', 'visible');
	$("#again").css('visibility', 'visible');
	$("#play").css('visibility', 'hidden');
	$("#save").css('visibility', 'hidden');
	//$("#helpMenu").css('visibility', 'visible')
			$("#playModeIntro").hide();
	loadMapStyle (2);

}
function introStyle() {

	if(confirm (homeMessage)){

	if (myGame.mode == 2) {   //playMode
		$("#playModeIntro").hide();
		$("#playBoard").hide();
		$("#back").css('visibility','hidden');
		$("#logButton").css('visibility', 'hidden');
		$("#gameInfos").css('visibility', 'hidden');
		$("#again").css('visibility','hidden');
		$("#pointImage").hide();
	}
	if (myGame.mode == 1) {   //designMode
		$("#map").css('visibility','hidden');
		$("#designBoard").hide();
		$("#play").css('visibility','hidden');
		$("#save").css('visibility','hidden');
		$("#fS").css('visibility','hidden');
		$("#deleteIco").css('visibility','hidden');
		$("#settingsIco").css('visibility', 'hidden');
		$("#rclick").css('visibility','hidden');

	}	if(myGame.mode ==0){			//playMode
  		$("#playModeIntro").hide();

  	}
  	//$("#help").css('visibility','hidden');
  	$("#home").css('visibility','hidden');
  	$("#introT").html(introText);
  		$("#introT").css('margin-top','10px');
  	$("#introT").css('margin-left','35%');
		$("#introT").css('font-size','4vh');
  	$("#introST").html(introSubText);
  	$("#introST").show()
  	$("#designMode").show();
  	$("#playMode").show();
  	myGame.resetAll ();
  	}
  }
		$("#map").on('map-container-resize', function () {
	   map.invalidateSize(); // doesn't seem to do anything
	});
function loadMapStyle (s) {
	var map = myGame.myMap;
	if (s===1){			//design MODE
		$("#map").css('width',mapDesignStyle.width)
		mapTop = $(".b-tab-nav_link").outerHeight() + $(".header").outerHeight();
		$("#map").css('top',mapTop);
		$("#map").css('left',mapDesignStyleShort.left)
//		$("#map").css('height',mapOnDesignSettings.height)
/*if(window.innerHeight < 580) {
	$("#map").css('top',mapDesignStyleShort.top)
$("#map").css('left',mapDesignStyleShort.left)
}
else{
		$("#map").css('top',mapDesignStyle.top)
		$("#map").css('left',mapDesignStyle.left)
	}*/
		map.bounds = findBounds();
		fitImageDimensions(map.imgUrl, map.bounds, map.mapInstance)

}
	else if (s===2)		{ 	//play mode
		$("#map").css('width',mapPlayStyle.width)
//$("#map").css('height',mapOnPlaySettings.height)
 	//map.mapInstance.flyToBounds (mapBounds)
	if((myGame.modeLoaded.play ) || (myGame.modeLoaded.design )){
		map.bounds = findBounds();
			fitImageDimensions(map.imgUrl, map.bounds, map.mapInstance)
	}
	mapTop = $(".scoreDiv").outerHeight() + $(".header").outerHeight();
	$("#map").css('top',mapTop);
		$("#map").css('left',mapPlayStyle.left);
/*if(window.innerHeight < 580) {
	$("#map").css('top',mapPlayStyleShort.top)
$("#map").css('left',mapPlayStyleShort.left)
}
else{
	$("#map").css('top',mapPlayStyle.top)
	$("#map").css('left',mapPlayStyle.left)
}
}*/

}

}

  function playIntroStyle (){

  	$("#introT").html(playModeText);
  		$("#introT").css('margin-top','10px');
  		$("#introT").css('margin-left','35%');
  		$("#introT").css('font-size','3vh');
  	$("#introST").hide();
  	$("#examplesTable").hide();
  	if ($('#designBoard').is(':visible')){
  		//$("#gameButtons").css('visibility','hidden');
  	$('#designBoard').hide();
  		if(tbx1!= null)
  		tbx1.style.visibility = "hidden"
  			if(tbx2= null)
  		tbx2.style.visibility = "hidden"
  			if(tbx3!= null)
  		tbx3.style.visibility = "hidden"
  	}
  	$("#designMode").hide();
  $("#playMode").hide();
  $("#home").css ('visibility', 'visible');
  $("#playModeIntro").show();
  $("#openGame").css('visibility','visible');
  }

function mapResize (map){

//	map.bounds = findBounds();
	fitImageDimensions(map.imgUrl, map.bounds, map.mapInstance)
	loadMapStyle (myGame.mode)
}

function showTabOne () {
	goToTab(0);
}

function initializeStyles (){
	$("#instructionsEditor").jqte({placeholder: "You can write some instructions here for the player", format: false});

/*$("#help").click(function(e)  {
	  e.stopPropagation();
	$("#myDropdown").toggle();
})
	$(document).click(function(){
  $("#myDropdown").hide();
});
$("#myDropdown").click(function(e){
  e.stopPropagation();
});*/

	$("#designInstructions").hide();
	$("#playBoard").hide();
		$("#designBoard").hide();
	  $("#playModeIntro").hide();
}
function showAboutText() {
	alert ("current version: " + version)
}
