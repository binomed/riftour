var riftourChrome = riftourChrome || function(){

	
	
	function pageLoad(){


		connect();
		initArduino();
	}



	/****************************
	*****************************
	WebSocket Part ! 
	
	*/

	var socket = null;
	function connect(){


        socket = new WebSocket('ws://localhost:8080');
        socket.onmessage = function(json){
        	
        };
        socket.onopen = function () {
            console.log("Connect to socket from client")
        };

        socket.onerror = function(e){
            console.log("Error : "+e);

        }

        socket.onclose = function(){

            console.log("WS Close");
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
		chrome.serial.connect("COM7", onOpenArduino);
    	/*chrome.serial.getPorts(function(ports) {
		});*/
    }

    function onOpenArduino(openInfo){
    	connectionId = openInfo.connectionId;
		console.log("connectionId: " + connectionId);
		if (connectionId == -1) {
			console.log('Could not open');
			return;
		}
		console.log('Connected');
		//setPositionArduino(0);
		chrome.serial.onReceive.addListener(onReadArduino);
		//chrome.serial.read(connectionId, 1, onReadArduino);
    }

    function convertArrayBufferToString(buf) {
	  return String.fromCharCode.apply(null, new Uint8Array(buf));
	}    

    function setPositionArduino(position) {
		var buffer = new ArrayBuffer(1);
		var uint8View = new Uint8Array(buffer);
		uint8View[0] = position;
		chrome.serial.write(connectionId, buffer, function() {});
	}

	function onReadArduino(readInfo) {
		 if (info.connectionId == connectionId && info.data) {
	      	var str = convertArrayBufferToString(info.data);
	      	var value = "";
	      	if (str.charAt(str.length-1) === '\n') {
		        value += str.substring(0, str.length-1);
		        traitementDonnees(value);
		        value = '';
		    } else {
		        value += str;
		    }
			//var uint8View = new Uint8Array(readInfo.data);
			//var value = String.fromCharCode(uint8View[0]);

			if (value == "1") // Light on and off
			{
				var curentTime = new Date().getTime();
				if (curentTime - lastArduinoTime > delay){
					lastArduinoTime = curentTime;
					console.log("Aimant ! ");
					compt++;
					if (compt > 10){
						socket.send(JSON.stringify({
							"type" : "nextStep"
						}))
						//nextStep();
						compt = 0;
					}
				}
			}
		
		// Keep on reading.
		//chrome.serial.read(connectionId, 1, onReadArduino);
		}
	}

	//API
	function init(){
		 window.addEventListener('load', pageLoad);
	}

	return  {
		init : init
	}
}();

riftourChrome.init();

