var riftour = riftour || function(){

	// Les points du parcours
	var m_aVertices = null;
	var m_Pano = [];
	var m_iSensitivity = 50;
	var m_iVerticesBack = 0;

	var m_sPanoClient = new google.maps.StreetViewService();
	var longLatHeading = 0;


	var ReferenceHMDRotation = new THREE.Quaternion();
	var ReferenceAngle = 0;
	var oldLocation = null;

	
	function pageLoad(){

		$("#end").hide();

/*

		$("#clickMe").on('click', function(){
			BaseRotationEuler.set(
		        angleRangeRad(BaseRotationEuler.x +  0 * MOUSE_SPEED),
		        angleRangeRad(BaseRotationEuler.y + window.innerWidth * MOUSE_SPEED),
		        0.0
		      );
		      //lastClientX = event.clientX;lastClientY =event.clientY;
		      BaseRotation.setFromEuler(BaseRotationEuler, 'YZX');

			//BaseRotationEuler.set(0.0, angleRangeRad(THREE.Math.degToRad(180)) , 0.0 );
			updateCameraRotation();
		});*/
/*

		$("#clickMe3").on('click', function(){
			
			(new google.maps.DirectionsService()).route({
				 origin:"Epitech, Nantes",
				 destination:"Carousel, Nantes",
				 travelMode:google.maps.TravelMode.DRIVING
					}, 
				function(result, status) {
					if(status == google.maps.DirectionsStatus.OK) {
						m_bPaused = true;
						m_aVertices = result.routes[0].overview_path;
						m_Pano = [];
						//m_aFrames = [];
						m_iTotalFrames = m_aVertices.length;
						m_iCurrentFrame = 0;
						m_iVerticesBack = 0;
						getPanoramaDataForVertex(m_aVertices[m_iCurrentFrame]);						
						/*
						if(m_dDirectionsMap===null) {
							m_dDirectionsMap = new google.maps.Map(self.config.mapCanvas,{
								zoom:14,
								center : m_aVertices[0],
								mapTypeId: google.maps.MapTypeId.ROADMAP
							});

							m_mMarker = new google.maps.Marker({
								map: m_dDirectionsMap,
								location:m_aVertices[0],
								visible:true
							})
						}
						
						if(m_dDirectionsDisplay===null) {
							m_dDirectionsDisplay = new google.maps.DirectionsRenderer();
							m_dDirectionsDisplay.setMap(m_dDirectionsMap);
						}
						m_dDirectionsDisplay.setDirections(result);
						self.setPaused(false);*/
					/*} else {
						alert("Error pulling directions for movie, please try again.");
					}
				})

		});*/

		var savedHeading = 0;		/*
		BaseRotation.set(
		      HMDRotation.x,
		      HMDRotation.y,
		      HMDRotation.z,
		      HMDRotation.w);
		updateCameraRotation();*/

		$("#clickMe2").on('click', function(){				
			nextStep();						
			

			//savedHeading = currHeading;
			//console.log("moveToNextPlace");
			//console.log("Previous HMDRotation : "+HMDRotation.y + " <-> "+BaseRotation.y+" BaseRotation <-> lastBaseRotation :"+lastBaseRotation.y  );
			/*BaseRotation.set(
			      HMDRotation.x,
			      HMDRotation.y,
			      HMDRotation.z,
			      HMDRotation.w);
			updateCameraRotation();*/
			
			/*moveToNextPlace(function(){

				BaseRotation.set(
			      HMDRotation.x,
			      HMDRotation.y,
			      HMDRotation.z,
			      HMDRotation.w);

				updateCameraRotation();*/

				//console.log("After Callback HMDRotation : "+HMDRotation.y + " <-> "+BaseRotation.y+" BaseRotation <-> lastBaseRotation :"+lastBaseRotation.y );
				/*BaseRotation.set(
			      BaseRotation.x + (HMDRotation.x - BaseRotation.x),
			      BaseRotation.y + (HMDRotation.y - BaseRotation.y),//HMDRotation.y,
			      BaseRotation.z + (HMDRotation.z - BaseRotation.z),//HMDRotation.z,
			      HMDRotation.w);
				console.log("updateCameraRotation");
				updateCameraRotation();*/
				//console.log("UpdateCamera HMDRotation : "+HMDRotation.y + " <-> "+BaseRotation.y+" BaseRotation <-> lastBaseRotation :"+lastBaseRotation.y );
			//});
			//HMDRotation.set(BaseRotationEuler.x,BaseRotationEuler.y,BaseRotationEuler.y,BaseRotation.w);
			
		});

		connect();
		//initArduino();
	}

	/****************************
	*****************************
	Maps function
	*/	

	function getPanoramaDataForVertex(vertex, callback) {
		m_sPanoClient.getPanoramaByLocation(vertex, m_iSensitivity, function(panoData,status) {
			if(status==="OK" && panoLoader) {
				//longLatHeading = panoData.tiles.centerHeading;
				console.log("Pano : centerHeading : "+panoData.tiles.centerHeading+" | originHeading : "+panoData.tiles.originHeading+" | y : "+projSphere.quaternion.setFromEuler(new THREE.Vector3(0,THREE.Math.degToRad(90-panoData.tiles.centerHeading),0),'YZX').y);
				panoLoader.load(panoData.location, oldLocation, true,callback);
				oldLocation = panoData.location;
				m_iCurrentFrame++;
				
			} 
		})
	}

	function callBackRotation(){
		var longLatHeading = panoLoader.heading;
		var yLongLat = projSphere.quaternion.setFromEuler(new THREE.Vector3(0,THREE.Math.degToRad(90-longLatHeading),0),'YZX').y;
		var yHMD = projSphere.quaternion.setFromEuler(new THREE.Vector3(0,THREE.Math.degToRad(90-currHeading),0),'YZX').y;		


		var angleDelta = longLatHeading - ReferenceAngle;
		var quartRot = new THREE.Quaternion(0,Math.sin(THREE.Math.degToRad(angleDelta)/2),0,Math.cos(THREE.Math.degToRad(angleDelta)/2));
		BaseRotation.multiplyQuaternions(quartRot, HMDRotation);	

		var baseVector = new THREE.Vector3();
		baseVector.setEulerFromQuaternion(BaseRotation, 'YZX');
  		var baseHeading = angleRangeDeg(THREE.Math.radToDeg(-baseVector.y));

		//BaseRotation.multiply(new THREE.Quaternion(0,Math.sin(THREE.Math.degToRad(180)/2),0,Math.cos(THREE.Math.degToRad(180)/2)));	

		//console.log("CallBack : Base.y : "+BaseRotation.y+" | HMD.y : "+HMDRotation.y+" | yLongLat : "+yLongLat+" | yHMD : "+yHMD+" | longLatHeading : "+longLatHeading+" : currHeading : "+currHeading);
		console.log("CallBack : longLatHeading : "+longLatHeading+" : currHeading : "+currHeading+" | angleDelta : "+angleDelta+" | ReferenceAngle : "+ReferenceAngle+" | BaseRotation : "+baseHeading);

		//BaseRotation.copy(ReferenceHMDRotation);
		updateCameraRotation();
/*
		BaseRotation.set(
	      HMDRotation.x,
	      HMDRotation.y, //yLongLat, //HMDRotation.y,
	      HMDRotation.z,
	      HMDRotation.w);

		updateCameraRotation();*/
	}


	function nextStep(){
		getPanoramaDataForVertex(m_aVertices[m_iCurrentFrame],callBackRotation);
		if (m_iCurrentFrame >= m_iTotalFrames){
			$("#end").show();
		}
	}


	/****************************
	*****************************
	WebSocket Part ! 
	
	*/

	var socket = null;
	function connect(){


        socket = new WebSocket('ws://localhost:8080');
        socket.onmessage =  function(event){
        	var json = JSON.parse(event.data);
            if (json.type === "nextStep"){         
            console.log("Next Step ! ");               
               nextStep();
                // Or window.location = url;
                //$("revealPrezLink").attr("href","http://"+window.location.hostname+":8080/index.html");
                //$("revealPrezLink").click();
            }else if (json.type === "road"){
            	$("#end").hide();
            	ReferenceHMDRotation.copy(HMDRotation);
            	var vectorAngle = new THREE.Vector3();
            	vectorAngle.setEulerFromQuaternion(ReferenceHMDRotation, 'YZX');
  				ReferenceAngle = angleRangeDeg(THREE.Math.radToDeg(-vectorAngle.y));
            	(new google.maps.DirectionsService()).route({
				 origin:json.origin,
				 destination:json.dest,
				 travelMode:google.maps.TravelMode.DRIVING
					}, 
				function(result, status) {
					if(status == google.maps.DirectionsStatus.OK) {
						m_bPaused = true;
						m_aVertices = result.routes[0].overview_path;
						m_Pano = [];
						//m_aFrames = [];
						m_iTotalFrames = m_aVertices.length;
						m_iCurrentFrame = 0;
						m_iVerticesBack = 0;
						getPanoramaDataForVertex(m_aVertices[m_iCurrentFrame],callBackRotation);								
					} else {
						alert("Error pulling directions for movie, please try again.");
					}
				})
            }
        }
        socket.onopen =  function () {
            console.log("Connect to socket from client")
        }
    }


    /**************************
    ***************************
		Arduino Part
    */

    var connectionId = -1;
    var lastArduinoTime = new Date().getTime();
    var delay = 100;
    var compt = 0;

    function initArduino(){
    	chrome.serial.getPorts(function(ports) {
			chrome.serial.open("COM7", onOpenArduino);
		});
    }

    function onOpenArduino(openInfo){
    	connectionId = openInfo.connectionId;
		console.log("connectionId: " + connectionId);
		if (connectionId == -1) {
			console.log('Could not open');
			return;
		}
		console.log('Connected');
		setPositionArduino(0);
		chrome.serial.read(connectionId, 1, onReadArduino);
    }

    function setPositionArduino(position) {
		var buffer = new ArrayBuffer(1);
		var uint8View = new Uint8Array(buffer);
		uint8View[0] = position;
		chrome.serial.write(connectionId, buffer, function() {});
	}

	function onReadArduino(readInfo) {
		var uint8View = new Uint8Array(readInfo.data);
		var value = String.fromCharCode(uint8View[0]);

		if (value == "1") // Light on and off
		{
			var curentTime = new Date().getTime();
			if (curentTime - lastArduinoTime > delay){
				lastArduinoTime = curentTime;
				console.log("Aimant ! ");
				compt++;
				if (compt > 10){
					//nextStep();
					compt = 0;
				}
			}
		}
		
		// Keep on reading.
		chrome.serial.read(connectionId, 1, onReadArduino);
	}

	//API
	function init(){
		 window.addEventListener('load', pageLoad);
	}

	return  {
		init : init
	}
}();

riftour.init();

