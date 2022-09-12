
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
$("#language").on({
	'click' : function () {
		if ($("#language").attr('src') == "media/imgs/english.png"){
			changeLanguage ("Eng");

		}
		else {

			changeLanguage ("Gr");
		}
	}

});
refreshLanguage = function () {
	introText = language.introText
	introSubText = language.introSubText

	$("#designMode").attr("src", language.designButtonSrc)
	$("#playMode").attr("src", language.playButtonSrc)
	$("#openYourFile").html(language.openYourFile)
	$("#onlineExamples").html(language.onlineExamples)
	$("#tab1").html(language.tab1)
	$("#tab2").html(language.tab2)
	$("#tab3").html(language.tab3)
	$("#tab4").html(language.tab4)
	$("#uploadImg").attr("title", language.uploadImgDisc)
	$("#addPoint").attr("title", language.addPointDisc)
	$("#addInstructions").attr("title", language.addInstructionsDisc)
	$("#deleteIco").attr("title", language.deleteIcoDisc)
	$("#settingsIco").attr("title", language.settingsIcoDisc)
	$("#addAttribute").attr("title", language.addAttributeDisc)
	$("#home").attr("title", language.homeDisc)
	$("#pointsLimit").html(language.pointsLimitTxt)
	 $("#valuesText").html(language.gameValues);
		 $("#valuesText").html(language.gameValues);
	$("#manual").html(language.manualDisc)
	$("#manual").attr("href", language.manualUrl)
	$("#contact").html(language.contactDisc)
	$("#deletePoint").html(language.deletePointText)
	$("#typeLabel").html(language.typeLabel)
	$("#visibilityLabel").html(language.visibilityLabel)
	$("#pointInfo").html(language.pointInfoText)
	$("#select").html(language.selectButton)
	$("#gameStatus").html(language.gameStatusText)
generalErrorMessage = language.generalErrorMessage;
 designModeText = language.designModeText;
 playModeText = language.playModeText;
 tab1Message = language.tab1Message;
 tab3Message = language.tab3Message;
 markersMessage = language.markersMessage;
 homeMessage = language.homeMessage;
 popUpMessage = language.popUpMessage;
 layersRemoveMessage = language.layersRemoveMessage;
 gameInstructionsDefault = language.gameInstructionsDefault;
 $("#badiText").html(language.badiText)
 $("#mpText").html(language.mpText)
 //$("#pcText").html(language.pcText)
 $("#composteText").html(language.composteText)
 $("#supermarketText").html(language.supermarketText)
 $("#ethicsText").html(language.ethicsText)
 $("#eatingText").html(language.eatingText)
 $("#eatingTextHB").html(language.eatingTextHB)
 $("#chefText").html(language.chefText)
 $("#envyText").html(language.envyText)
 $("#covidText").html(language.covidText)
 $("#perfectVilleText").html(language.perfectVilleText)
 $("#perfectVilleGame").attr("onclick", language.perfectVilleGame);
$("#shoppingGame").attr("onclick", language.shoppingGame);
 $("#chefGame").attr("onclick",language.chefGame);
   $("#eatingOutGame").attr("onclick",language.eatingOutGame);
   $("#eatingOutHBGame").attr("onclick",language.eatingOutHBGame);
   $("#envyCityGame").attr("onclick",language.envyGame);
   $("#covidGame").attr("onclick",language.covidGame);
 if (language.name === "English") {
$("#nayplioGame").hide()	 																				//hide games that are only availiable in Greek
$("#ancientGreek").hide()
$("#badi").hide()
$("#ethics").hide()
$("#detective").hide()
$("#smartJacket").show()
$("#sustTextiles").show()
$("#school").show()
$("#europe").show()
$("#escapePlan").hide()

 }
 if (language.name === "Greek") {
$("#nayplioGame").show()	 																				//show games that are only availiable in Greek
$("#escapePlan").show()	 																				//show games that are only availiable in Greek
$("#ancientGreek").show()
$("#badi").show()
$("#ethics").show()
$("#detective").show()
$("#electrician").show()
$("#smartJacket").hide()
$("#sustTextiles").hide()
$("#school").hide()
$("#europe").hide()

 }


 //PLAYMODE
 pointsVisitedText = language.pointsVisited;
var pVisit = $("#pointsVisited");
if (pVisit.length>0){
 pVisit.html(pointsVisitedText)
}
$('#selectBox option[value=text]').text(language.selBoxText);
$('#selectBox option[value=number]').text(language.selBoxNum);
$('#selectBox option[value=url]').text(language.selBoxUrl);
$('#selectBox option[value=date]').text(language.selBoxDate);
$('#selectBox option[value=file]').text(language.selBoxImage);
$('#visibilityBox option[value=visible]').text(language.visBoxVisible);
$('#visibilityBox option[value=hidden]').text(language.visBoxHidden);
		gameStartedText = language.gameStartedText;
 if(myGame.mode === 1 ){
	 $("#introT").html(designModeText);
 }
 else if (myGame.mode === 2)
	 $("#introT").html(playModeText);
else{
	 $("#introT").html(introText);
	 if(	$("#introST").html() != "")
	 $("#introST").html(introSubText);
}

}
changeLanguage = function (lang){
	 if (lang === "Eng"){
		  $("#language").attr("src", "media/imgs/greek.png")
		language = english;


	 }
	 else if (lang === "Gr"){
		 	  $("#language").attr("src", "media/imgs/english.png")
		 	 language = greek;

 }
 refreshLanguage();
}
