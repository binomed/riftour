var riftourControl = riftourControl || function(){


    var socket = null;
    var voyage = {
        origin : "Epitech, Nantes",
        dest : "Les machines, Nantes"
    }

    function pageLoad(){


        $("#mapChoice").hide();

        $("#optionsRadios1").on("click",function(){
            $("#predefChoice").show();
            $("#mapChoice").hide();
        });
        $("#optionsRadios2").on("click",function(){
            $("#predefChoice").hide();
            $("#mapChoice").show();
        });

        $("#go").on("click", function(){
            socket.send(JSON.stringify({
                "type" : "road",
                "origin" : voyage.origin,
                "dest" : voyage.dest
            }));
        });

        $("#search").on("click", function(){
            voyage.origin = $("#origin").val();
            voyage.dest = $("#dest").val();
            
        });

        $("#choiceSelect").change(function(){
            var valSelect = $("#choiceSelect option:selected").val();
            if (valSelect === "croisette"){
                //voyage.origin = 
            }else if (valSelect === "champs"){
                voyage.origin = "Place de la concorde, Paris";
                voyage.dest = "Place de l'étoile, Paris";
            }else if (valSelect === "anglais"){
                voyage.origin = "Epitech, Nantes";
                voyage.dest = "Les machines, Nantes";
            }
        });

         

        connect();

    }

    function connect(){


        socket = new WebSocket('ws://localhost:8080');
        socket.onmessage =  function(event){
            
        }
        socket.onopen =  function () {
            console.log("Connect to socket from client")
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

riftourControl.init();
