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
                voyage.origin = "124 boulevard de la croisette, Cannes";
                voyage.dest = "1 Boulevard de la croisette, Cannes";
            }else if (valSelect === "champs"){
                voyage.origin = "10 Avenue des champs Elysées, Paris";
                voyage.dest = "Place Charles de Gaulle, Paris";
            }else if (valSelect === "anglais"){
                voyage.origin = "267 Promenade des anglais, Nice";
                voyage.dest = "1 Promenade des anglais, Nice";
            }else if (valSelect === "broadway"){
                voyage.origin = "1452 Broadway, New York";
                voyage.dest = "1740 Broadway, New York";
            }else if (valSelect === "verdon"){
                voyage.origin = "Route de Castellane, 04360 Moustiers-Saint-Marie";
                voyage.dest = "Roue de Moustiers, 04120 La Palud-sur-Verdon";
            }else if (valSelect === "mercantour"){
                voyage.origin = "Parc national du Mercantour, 04850 Jausiers";
                voyage.dest = "Jausiers";
            }else if (valSelect === "vence"){
                voyage.origin = "col de Vence";
                voyage.dest = "Vence";
            }else if (valSelect === "tokyo"){
                voyage.origin = "Chuo Dori, Tokyo, Japon";
                voyage.dest = "Vence";
            }else if (valSelect === "disney"){
                voyage.origin =  "Boulevard du Grand Fossé, 77700 Chessy, France";
                voyage.dest = "Place des Passagers du Vent, 77700 Chessy, France";
                voyage.type = "foot";
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
