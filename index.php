<?php 
		$parameter =$_REQUEST["user_id"];
		if($parameter == null) $parameter = "guest";
		$learner_id = $parameter;
$parameter = $_REQUEST["custom_launch_data"];

		$value = json_decode($parameter);
		$launchData = $parameter;
	
	
		$parameter = $_REQUEST["custom_context"];
		$custom_context = json_decode($parameter);
		$logOption = $custom_context->logOption;
	
		if($parameter == null) $parameter = '{\"assessmentMode\": 0}';
	$context = $parameter;
		$parameter = $_REQUEST["custom_subscriptions"];
		if($parameter == null) $parameter = "{}";
		$subscriptions = $parameter;
	$parameter = $_REQUEST["resource_link_id"];

		if($parameter == null) $parameter = "12345678";

		$xwid = $parameter;
		

		$parameter = $_REQUEST["launch_presentation_locale"];

		if($parameter == null) $parameter = "nl";

		$locale = str_replace ('-','_',$parameter);
		


        ?>
 <script src="scripts/OpenAjaxManagedHub-all.js"></script>

<script> 

		dme = false;
		launchCode = null;
		launchVariables= "";
		launchPoints = "";
		launchFields = "";
		launchSettings = "";
		launchImage = "";
		launchXml1 = "";
		launchXml2 = "";
		launchRun = false;
		logCamera = false;
		logSliders = false;
		charactersTyped = 0;
		keywords = [];
		logCodeModification = false;
		logOption = <?php echo json_encode($logOption);?>;
		cbookContext = <?php echo json_encode($context);?>;

 		launchData = JSON.parse(<?php echo json_encode($launchData);?>);
		console.log (launchData);
		 subscirptions = "<?php echo $subscriptions;?>";
		 xwid = "<?php echo $xwid;?>";
		 console.log(launchData);
		 console.log ("Log option:")
		 console.log (logOption);
		 if(launchData!=null){
		launchCode = launchData.code;
		launchVariables= JSON.parse(launchData.variables);
		launchPoints  = JSON.parse(launchData.points);
	//	console.log (launchPoints);
		launchFields = JSON.parse(launchData.fields);
		launchSettings = JSON.parse(launchData.otherSettings);
		launchImage = "examples/city.jpg"
		launchXml1 = launchData.xml1;
		launchXml2 = launchData.xml2;
		//initialize();
		//alert(launchAvatar +" "+launchColor)
		}
		if (logOption == true){
			logProcedure = launchData.procName;
			minParameters = launchData.minParams;
			maxParameters = launchData.maxParams;
			logCodeModification = launchData.codeModification;
			if (logCodeModification){
				
				charThreshlod = launchData.charactersThreshold;
			dmeKeywords = (launchData.keywords.split(","))
			if (dmeKeywords[0]!="")
			keywords = launchData.keywords.split(",")
			console.log (keywords);
			}
			logSliders = launchData.sliderLog;
			logCamera = launchData.cameraLog;
			}
		
 		 eventManager = new function(s, u) {

 				this.subscriptions = s;

 				this.xwid = u;
				
 				this.fire = function(cmd, msg, map) {

 					var p = this.xwid + "."+ cmd

 					console.log("publish " + p + " with " + msg + " and " + JSON.stringify(map));

 					hubClient.publish(p,{ message: msg, parameters: map, source: this.xwid } );

 				}
					this.fireLogging = function(map) {
 
   					 if ( logOption ) {
       				 var topic = this.xwid + ".logOption"
       				 var message = { parameters: map , source : this.xwid  }
      				 hubClient.publish( topic, message )
  					 }
			}

 		 				this.setEventListener = function(l, cmd) {

 					console.log("subscribing to " + cmd);

  					var listener = l

 					if("check" == cmd) {

 						hubClient.subscribe(cmd, function(topic) {

 							listener(topic, null, null)

 						})

 						return

 					}
 					var command = cmd

 					if ( cmd in this.subscriptions ) {

 						var list = this.subscriptions[cmd];

						list.map(function(p) {

 				        	console.log("topic is " + p)

 				         	hubClient.subscribe(p, function(topic, publisherData, subscriberData)

 				        		 {

 				        	 		console.log("received " + topic  + "=" + command + " data=" + JSON.stringify(publisherData));

 				        	 		var message = publisherData.message;

 				        	 		var parameters = publisherData.parameters;

 				        	 		listener(command, message, parameters)

 				        		 }		        		 

 				        	)

 				       })

 					}

 				}

 				

 				this.widget = null;

 				this.state  = null;


 				this.bootstrap = function() {
						//document.getElementById("hub").innerHTML += "bootstrap";
						console.log ("bootstrap")
					hubClient.subscribe(this.xwid +".setState", function(topic, data)

	 						{
								//document.getElementById("hub").innerHTML+=xwid;
								
								console.log (data);
								
								this.state = data;
								console.log (this.widget);
								if(this.widget != null)

									this.widget.setState(data)
							
							
							}, this	)

	 				hubClient.publish("boot", this.xwid);
					console.log (this.xwid);
					

					hubClient.subscribe("reset", function(topic, data) {

							this.state = {}

							if(this.widget != null)

							{

								this.widget.reset()

							}

						

					}, this)

					

					hubClient.subscribe("stop", function(topic, data) {
							hubClient.publish(this.xwid + ".getState", { parameters: this.widget.getState(), source : this.xwid  })
						// unsubscribe all.
							console.log (topic);
							//this.widget.stop()

						

					}, this )

					

					

					

 				}
				
 				this.setWidgetInstance = function(widget) {

 					this.widget = widget;

 					mode = this.context.assessmentMode || 0; 
					
 					//widget.setAssessmentMode(mode)

 					if(this.state != null)

 					{
						console.log (this.state)
 						widget.setState(this.state)

 					}

 				}

 				

 		}(subscirptions,xwid)

 		eventManager.context = cbookContext;

 	    function client2SecurityAlertHandler(source, alertType) {

 	       // Handle security alerts

 	     }

 	     

 	     /* Callback that is invoked upon successful connection to the Managed Hub */

 	     function connectCompleted ( hubClient, success, error ) {

    
 if (success) {
	
			dme = true;
			console.log ("MALT IS IN DME" + dme);
 	         /* Call hubClient.publish(...) to publish messages  */
 	         /* Call hubClient.subscribe(...) to subscribe to message topics */
			console.log ("connect");
		
 				eventManager.bootstrap();

 	       

 	       }

 	     }

 	     /* Application initializes in response to document load event */

 	     function loadEventHandler() {

 	       hubClient = new OpenAjax.hub.IframeHubClient({

 	         HubClient: {

 	           onSecurityAlert: client2SecurityAlertHandler

 	         }

 	       });

 	       // Connect to the ManagedHub

 	       hubClient.connect( connectCompleted );
		   // document.getElementById("hub").innerHTML += ;

 				 
 	     }

</script>


<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html;" charset="utf-8" />
<meta charset="ISO-8859-1">
<title>webSuSx</title>
<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.5/leaflet.css" />
<link rel="stylesheet" href="map.css" />
<link rel="stylesheet" href="designMode.css" />
<link rel="stylesheet" href="playMode.css" />
<link rel="stylesheet" href="data_table.css" />
<link rel="stylesheet" href="displayTable.css" />
<link rel="stylesheet" href="Leaflet.label-master/dist/leaflet.label.css" />
 <link rel="stylesheet" href="jquery-ui-1.11.4.custom/jquery-ui.css" type="text/css" charset="utf-8">   
 <link rel="stylesheet" type="text/css" href="DataTables/datatables.min.css"/>
<script src="http://cdn.leafletjs.com/leaflet-0.7.5/leaflet.js"></script>
<script src="jquery/jquery-1.11.3.min.js" type="text/javascript"></script>
<script src="jquery-ui-1.11.4.custom/jquery-ui.js" type="text/javascript" charset="utf-8"></script>	
<script src="Stuk-jszip-4cbaf0e/dist/jszip.min.js" type="text/javascript" charset="utf-8"></script>	
<script type="text/javascript" src="DataTables/datatables.min.js"></script>

 <script src="google-blockly-7faafe0/blockly_compressed.js"></script>
 <script src="google-blockly-7faafe0/blocks_compressed.js"></script>
  <script src="google-blockly-7faafe0/msg/js/en.js"></script>
  <script src="google-blockly-7faafe0/javascript_compressed.js"></script>
  <script src="NeilFraser-JS-Interpreter-162ef40/acorn_interpreter.js"></script>
  
    	<script src="Leaflet.label-master/src/Label.js"></script>
	<script src="Leaflet.label-master/src/BaseMarkerMethods.js"></script>
	<script src="Leaflet.label-master/src/Marker.Label.js"></script>
	<script src="Leaflet.label-master/src/CircleMarker.Label.js"></script>
	<script src="Leaflet.label-master/src/Path.Label.js"></script>
	<script src="Leaflet.label-master/src/Map.Label.js"></script>
	<script src="Leaflet.label-master/src/FeatureGroup.Label.js"></script>
	<script src="moment/moment.js"></script>
	<script type="text/javascript" src="jszip-utils-master/dist/jszip-utils.js"></script>
</head>

<body >
<div id="container">
<div id = "header"> <p> Welcome to web SuSx </p></div>
 <input id="home" type = "image" src = "imgs/home.png" onclick="backToIntro()" style="visibility:hidden" title="Back to homepage"> 
  <div class="gameButtons" id = "gameButtons">
	  <!-- <button type="button" id="generate" onclick= "generateEvents()"class = "designButtons"/> Check </button> -->
  <button type="button" id="play" onclick= "myGame.generatePlay()" class = "designButtons"/> Play </button>
    <button type="button" id="save" onclick= "myGame.saveGame()" class = "designButtons"/> Save all </button>
	</div>
<button type="button" id="designMode" onclick="newDesignMode();" class="introButton"/> Create New Game </button>
<button type="button" id="playMode" onclick= "newPlayMode();" class="introButton"/> Play Mode </button>
<div id = "playModeIntro"  class = "playModeIntro" style="visibility: hidden" >
<p style="float: left"> Open your file </p>
<div id="openFile">
<input type="file" id="loadGame"  /> 
</div>
<div id="examples">
<p>Online Examples:</p>
<ul class="exampleList">
  <li onclick ="myGame.openInstance('EnvyCity')"> Envy City </li>
  <li onclick="myGame.openInstance('PerffectVille')">Perfect Ville</li>
  <li onclick="myGame.openInstance('badi')">Ba-Di(Balance Diet)</li>
  <li onclick="myGame.openInstance('orient')">Orient Express</li>
 <!-- <li>Ballance Food</li> -->
</ul>
</div>
</div>
<div id="map"></div>
		
<!--<button type="button" id="openGame" onclick= "openOnline()" style="visibility: hidden"/> open an existing online game</button> -->
<div id = "designBoard" >

	<div id = "b-tab-nav"> </div>
	 <a href="#" class="b-tab-nav_link is-active">   <span>My map</span></a>
    <a href="#" class="b-tab-nav_link"><span>Initial/Check conditions</span></a>
	<a href="#" class="b-tab-nav_link"><span>End conditions</span></a>
	<div class="b-tab is-active">
	<div class="b-content"> 
	
	<div id="sidebar">
	<ul>
		<li>
		<div id="upload">
		<input style ="cursor: pointer;" type="file" title = "Change Backgroud" id="uploadImage"/> 
		</div>
		</li>
		<li>
			<input id="addPointIcon" type = "image" src="imgs/addPoint.png" title = "Add point" onclick = "myGame.addPoints(this)";/>
		</li>
	</ul>
	 </div>
		
	
		 <div id= "data" class = "data_table">
		 <div id="data_bar" class= "data_bar"> 
		 <input type="image" src="imgs/delete.png"  onclick="myGame.deleteField()" id="deleteIco" title="Διαγραφή Επιλεγμένου Πεδίου"/> 
		 <input type="image" src="imgs/settings.png"  onclick="myGame.settingsField()" id="settingsIco" title="Ρυθμίσεις Επιλεγμένου Πεδίου"/> 
		 <input type="image" src="imgs/add.png" width="20px" height="20px" style="float:right" onclick="myGame.addField()"/> 
		 </div>
		 <div id = "tableContainer" style="overflow-x:auto;">
	   <table id="datatable" class="datatable">
		<thead>
		  <tr>
			<th>ID</th>
			<th><input type="text" class="tableField" value="Description"/> 
			</th>
			<th><input type="text" class="tableField" value="FieldA" onchange = "myGame.updateField(this);"/> 	<input type = "checkbox" id = "1_check" onclick ="myGame.selectField (this)"/></th>
			<th><input type="text" class="tableField" value="FieldB" onchange = "myGame.updateField(this);"/> 	<input type = "checkbox" id = "2_check"onclick ="myGame.selectField (this)"/></th>
		  </tr>
		</thead>
		<tbody>
		</tbody>
		</table>
		</div>
	  </div>
	 
	  </div>
	 
	</div>
	<div class="b-tab">
		<div class="b-content">			<!-- second tab-->
		<div id="editor1" class = "editor"> 
		
		 
  
		 <div id="blocklyDiv" style="height: 400px; width: 800px; display:block; position:absolute;"></div>
	
 
  </div>

		</div>
	</div>
	<div class="b-tab">
		<div class="b-content">  	<!-- third tab-->
			<div id="editor2" class="editor"> 
		 <xml id="toolbox2" style="display: none" >
		 
 <category name="Conditions">
    <block type="controls_if"></block>
	 <block type="logic_compare"></block>
	 <block type="logic_operation"></block>
	 <block type="logic_boolean"></block>
	   <block type="logic_negate" > </block>
  </category>
 <category name="Variables">
	<block type="variables_get" id="j(t*#,6Pav0zlSFwEqdU" x="13" y="38">
    <field name="VAR">variable</field>
  </block>
   <block type="variables_set" id="6wMe;`ULAp(~=Su*iWh=" x="63" y="-12">
    <field name="VAR">variable</field>
    <value name="VALUE">
      <block type="math_number" id="+s9Tn=(yh%eYvg0.7V_4">
        <field name="NUM">0</field>
      </block>
    </value>
  </block>
  </category>
 <category name="Maths">
	<block type="math_number"></block>
    <block type="math_arithmetic"></block>
  </category> 
  <category name="Text">
  <block type="text"></block>
    <block type="text_print"></block>

  <block type="text_print" id="DPWMna3+q{*XS!?WQNcM" x="-13" y="88">
    <value name="TEXT">
      <shadow type="text" id="oCHj.d.H/qtW44UR5@lU">
        <field name="TEXT">abc</field>
      </shadow>
      <block type="text_join" id="Nz8/|JeJM{u_57Ci8toy">
        <mutation items="2"></mutation>
      </block>
	  
    </value>
  </block>
  </category> 
  </xml>
			 <div id="blocklyDiv2" style="height: 400px; width: 800px; position:absolute; display:block;"></div>
		
		
 
			</div>
			<div id="otherSettings">
		<div id = "settingsA"> <input type="checkbox" id="pointsLimit" name="pointsLimit" value="Yes" onclick = "myGame.pointsLimitToggle(this);">   Max No of Visited Points: <input id="maxPoints" type="number" name="quantity" min="1" value="10" style="width: 50px;" disabled>  </div>
		<br></br>
		<div id = "settingsB"> <input type="checkbox" id="timeLimit"  name="timeLimit" value="Yes" onclick = "myGame.timeLimitToggle(this);"> Time limit: <input id="maxTime" type="number" name="quantity" min="3"  style="width: 50px;" value="10" disabled> Minutes
		</div>
		</div>
		</div>
	</div>
</div>
<div id = "playBoard"> 

<div id="leftSideTop" class = "leftSideTop">
<!--<div id="dataDisplay" class = "dataDisplay">-->
<table id = "displayTable"  class = "displayTable"/> 
<thead>
<tr>
<th colspan="2"> Point Information </th>
</tr>
</thead>
<tbody>
 <tr>
			<td>Description</td>
			<td> </td>
</tr>
</tbody>	
</table>
 <!--</div> -->
<img id="pointImage"> </img>
<button type="button" id="select" class="selectButton"onclick= "myGame.selectPoint()"/> Select Point </button>

</div>
<div id="leftSideBottom" class="leftSideBottom">
<table id = "overallTable"  class = "progress"/> 
<tr>
<th colspan="2"> Overall Values</th>
</tr>
<tbody> </tbody>
</table>




<div id= "messageArea" >
The game has started !
</div>
</div>
<div id = "playButtons" >
 <button type="button" id="back" onclick= "myGame.backToEdit();" class = "designButtons" /> Edit Game </button>
 <!-- <button type="button" id="start" onclick= "myGame.startGame()" class = "designButtons" /> START GAME </button> -->
  <button type="button" id="again" onclick= "myGame.playAgain();" style="visibility: hidden" class = "designButtons" /> Play Again </button>
  </div>
</div>
<div id = "fS" class="fieldSettings" > 

<div id="bar" class = "bar"> <input type="image" src="imgs/close.png"  onclick="myGame.closeSettings()" title="Κλείσιμο" style="float: right"/>
 </div>
  <span> Field type: </span> 
  <select onchange ="myGame.changeType(this.value)" id="selectBox">
  <option value="text">text</option>
  <option value="number">number</option>
 <!-- <option value="boolean">boolean</option> -->
  <option value="url">url</option> 
  <option value="date">Date</option>
  <option value="file">Image</option>
</select>
</div>
<div id="rclick" class = "rClickBox" > <span style="cursor : pointer" onclick = "myGame.myMap.deletePoint()" >
<input type="image" src="imgs/delete.png" title="Διαγραφή" style="float: left"/>Delete point </span> </div>
</div>
   <script src="playMode.js"></script>
   <script src="map.js"></script>
     <script src="designMode.js"></script>
     <script src="datatable.js"></script>
   <script src="blocks.js"></script>
   <script src="createXmls.js"></script>

<script src="tabs.js"></script>
<script>
 myTabs = tabs({
    el: '#designBoard',
    tabNavigationLinks: '.b-tab-nav_link',
    tabContentContainers: '.b-tab'
  });
  myTabs.init();
</script>

<script src="test.js"></script>
<script src="designMode.js"></script>	

<script src="handleFiles.js"></script>
<xml id="toolbox1" style="display: none" >
		 
 <category name="Conditions">
    <block type="controls_if"></block>
	 <block type="logic_compare"> 
		<field name="OP">EQ</field>
		<value name="A">
			<block type="singleVar">
			</block>
		</value>
		<value name="B">
		<block type="math_number">
		<field name="NUM">0</field>
		</block>
		</value>
		</block>
	 <block type="logic_operation">
	 <field name="OP">AND</field>
		<value name="A">
		<block type="logic_compare">
		<field name="OP">EQ</field>
		<value name="A">
		<block  type="singleVar">
		</value>
		<value name="B">
		<block  type="math_number">
		</value>
		</block>
		</value>
		<value name="B">
		<block type="logic_compare">
		<field name="OP">EQ</field>
		<value name="A">
		<block  type="singleVar">
		</block>
		</value>
		<value name="B">
		<block  type="math_number">
		<field name="NUM">0</field>
		</block>
		</value>
		</block>
		</value>
	 
	 </block>
	 <block type="logic_boolean"></block>
	   <block type="logic_negate" > </block>
  </category>
 <category name="Variables">
	
  <block type="initialValue"> <value name="varVal">
<block id="var2" type="math_number">
<field name="NUM">0</field>
</block>
</value></block>
  <block type="singleVar"> </block>
  </category>
 <category name="Maths">
	<block type="math_number"></block>
    <block type="math_arithmetic"></block>
  </category> 
  <category name="Text">
  <block type="text"></block>
    <block type="text_print"></block>

  <block type="text_print" id="DPWMna3+q{*XS!?WQNcM" x="-13" y="88">
    <value name="TEXT">
      <shadow type="text" id="oCHj.d.H/qtW44UR5@lU">
        <field name="TEXT">abc</field>
      </shadow>
      <block type="text_join" id="Nz8/|JeJM{u_57Ci8toy">
        <mutation items="2"></mutation>
      </block>
	  
    </value>
  </block>
  </category> 
  </xml>
</body>


</html>