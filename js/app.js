var riftour = riftour || function(){


	function pageLoad(){
		/*var streetviewPlayer = new google.maps.StreetViewPlayer({
		    origin: "Phoenix, AZ",
		    destination: "Tempe, AZ",
		    travelMode: google.maps.TravelMode.DRIVING,
		    movieCanvas: document.getElementById("movie-canvas"),
		    mapCanvas: document.getElementById("map-canvas"),
		    onLoading: function() {
		        //do something while loading
		    },
		    onPlay: function() {
		        //do something when playing
		    },
		    onProgress: function(progress) {
		        //do something with progress
		    }
		});*/

		$("#clickMe").on('click', function(){
			BaseRotationEuler.set(
		        angleRangeRad(BaseRotationEuler.x + /*(event.clientY - lastClientY)*/ 0 * MOUSE_SPEED),
		        angleRangeRad(BaseRotationEuler.y + /*(event.clientX - lastClientX)*/window.innerWidth * MOUSE_SPEED),
		        0.0
		      );
		      //lastClientX = event.clientX;lastClientY =event.clientY;
		      BaseRotation.setFromEuler(BaseRotationEuler, 'YZX');

			//BaseRotationEuler.set(0.0, angleRangeRad(THREE.Math.degToRad(180)) , 0.0 );
			updateCameraRotation();
		});

		var savedHeading = 0;		
		var lastBaseRotation = new THREE.Vector3();
		lastBaseRotation.x = HMDRotation.x;
		lastBaseRotation.y = HMDRotation.y;
		lastBaseRotation.z = HMDRotation.z;
		BaseRotation.set(
		      HMDRotation.x,
		      HMDRotation.y,
		      HMDRotation.z,
		      HMDRotation.w);
		updateCameraRotation();

		$("#clickMe2").on('click', function(){
			//savedHeading = currHeading;
			//console.log("moveToNextPlace");
			//console.log("Previous HMDRotation : "+HMDRotation.y + " <-> "+BaseRotation.y+" BaseRotation <-> lastBaseRotation :"+lastBaseRotation.y  );
			/*BaseRotation.set(
			      HMDRotation.x,
			      HMDRotation.y,
			      HMDRotation.z,
			      HMDRotation.w);
			updateCameraRotation();*/
			moveToNextPlace(function(){

				BaseRotation.set(
			      HMDRotation.x,
			      HMDRotation.y,
			      HMDRotation.z,
			      HMDRotation.w);

				updateCameraRotation();

				//console.log("After Callback HMDRotation : "+HMDRotation.y + " <-> "+BaseRotation.y+" BaseRotation <-> lastBaseRotation :"+lastBaseRotation.y );
				/*BaseRotation.set(
			      BaseRotation.x + (HMDRotation.x - BaseRotation.x),
			      BaseRotation.y + (HMDRotation.y - BaseRotation.y),//HMDRotation.y,
			      BaseRotation.z + (HMDRotation.z - BaseRotation.z),//HMDRotation.z,
			      HMDRotation.w);
				console.log("updateCameraRotation");
				updateCameraRotation();*/
				lastBaseRotation.x = HMDRotation.x;
				lastBaseRotation.y = HMDRotation.y;
				lastBaseRotation.z = HMDRotation.z;
				//console.log("UpdateCamera HMDRotation : "+HMDRotation.y + " <-> "+BaseRotation.y+" BaseRotation <-> lastBaseRotation :"+lastBaseRotation.y );
			});
			//HMDRotation.set(BaseRotationEuler.x,BaseRotationEuler.y,BaseRotationEuler.y,BaseRotation.w);
		});
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



/* EXEMPLE StreetView Player : 
http://www.brianfolts.com/driver/#origin=google%20plex&destination=google%20montain%20view

var streetviewPlayer = null;

$(function() {

	$("#progress").mousedown(function(e) {
		var jProgress = $("#progress");
		var iFrame = Math.floor(streetviewPlayer.getTotalFrames() * ((e.pageX-jProgress.offset().left)/jProgress.width()))
		streetviewPlayer.setProgress(iFrame);
	});

	var sQuery = window.location.hash;
	if(sQuery && sQuery.length) {
		if(sQuery.indexOf("origin=")!=-1) {
			var sStart = sQuery.substring(sQuery.indexOf("=")+1,sQuery.indexOf("&"));
			var sEnd = sQuery.substring(sQuery.lastIndexOf("=")+1);

			document.getElementById("origin").value = unescape(sStart);
			document.getElementById("destination").value = unescape(sEnd);

			initMovie()
		}
	}
})

function pauseMovie(btn) {
	if(streetviewPlayer.getPaused()===false) {
		streetviewPlayer.setPaused(true);
		btn.value = "Play";
	} else {
		streetviewPlayer.setPaused(false);
		btn.value = "Pause";
	}
}

function initMovie() {
	streetviewPlayer = new google.maps.StreetViewPlayer({
		origin: document.getElementById("origin").value,
		destination: document.getElementById("destination").value,
		travelMode: google.maps.TravelMode.DRIVING,
		movieCanvas: document.getElementById("draw"),
		mapCanvas: document.getElementById("map"),
		onLoading: function() {
			document.getElementById("draw").className = "loading"
			document.getElementById("controls").style.visibility = "hidden";
		},
		onPlay: function() {
			document.getElementById("draw").className = "";
			document.getElementById("controls").style.visibility = "visible";
		},
		onProgress: function(progress) {
			document.getElementById("progressbar").style.width = progress + "%"
		}
	})
}

function speedUpMovie() {
	streetviewPlayer.setPlaySpeed(streetviewPlayer.getPlaySpeed()-100);
}

function slowDownMovie() {
	streetviewPlayer.setPlaySpeed(streetviewPlayer.getPlaySpeed()+100);
}

function buildMovie() {
	var data = streetviewPlayer.getPlayerData();
	var f = document.createElement("form");
	f.method="POST";
	f.action="/projects/driver/index.php";
	f.target="_blank";
	var i = document.createElement("input");
	i.type="hidden";
	i.name="DATA";
	i.value=$.toJSON(data.frames);
	f.appendChild(i);
	document.body.appendChild(f);
	f.submit();
	document.body.removeChild(f);
}

function buildLink() {
	window.location = "#origin="+escape(document.getElementById("origin").value)+"&destination="+escape(document.getElementById("destination").value);
}

*/