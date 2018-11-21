document.addEventListener("deviceready", deviceIsReady, false);


function deviceIsReady(){
  StatusBar.backgroundColorByHexString("#ff9800");
}


// Dom7
var $$ = Dom7;


// Init App
var app = new Framework7({
  id: 'io.quickbooking',
  root: '#app',
  theme: 'md',
  language: 'en',

  routes: [
  {
    name: 'main',
    path: '/main/',
    url: './main.html'
    },
    {
    name: 'searching',
    path: '/searching/',
    url: './searching.html'
    },
    {
    name: 'results',
    path: '/results/',
    url: './results.html'
    },
    {
    name: 'flightdetails',
    path: '/flightdetails/',
    url: './flightdetails.html'
    },
    {
    name: 'searchpanel',
    path: '/searchpanel/',
    url: './searchpanel.html'
    },
    {
    name: 'searchpanel2',
    path: '/searchpanel2/',
    url: './searchpanel2.html'
    },
    {
    name: 'init',
    path: '/init/',
    url: './init.html'
    }
  
  ],
  panel: {
    swipe: "both"
  }
});

var mainView = app.views.create('.view-main', {
  url : './main.html',
  name : 'main'
});





/* Greenie defined functions */


function showNylon(){

  $$(".nylon").show();

}

function hideNylon(){

  $$(".nylon").hide();

}

function showNylons(){

  $$(".nylons").show();

}

function hideNylons(){

  $$(".nylons").hide();

}


   var pushMyCity = function(theCityCode){

      var splitForSkyScanner = theCityCode.split(" ")[0];
      window.localStorage.setItem("skyscanner_from_terminal", splitForSkyScanner);

        window.localStorage.setItem("from_terminal", theCityCode);
        showNylons();

        setTimeout(function(){
        hideNylons();
        mainView.router.navigate("/init/");
        }, 3000);
    }


  var pushMyCity2 = function(theCityCode){

        var splitForSkyScanner = theCityCode.split(" ")[0];
      window.localStorage.setItem("skyscanner_to_terminal", splitForSkyScanner);

        window.localStorage.setItem("to_terminal", theCityCode);
        showNylons();

        setTimeout(function(){
        mainView.router.navigate("/init/");
        hideNylons();
        }, 3000);
    }











$$(document).on('page:init', '.page[data-name="results"]', function (e) {
showNylon();
  var fromTerminal = localStorage.getItem("from_terminal");
  var toTerminal = localStorage.getItem("to_terminal");


  $$("#search-title-heading").html(fromTerminal.substr(0,4) + " - " + toTerminal.substr(0,4));
  
  
  setTimeout(function(){
    var serverResults = localStorage.getItem("server_deployment_results");
    if(serverResults == "<div class='block accordion-list custom-accordion'></div>" || serverResults == "" || serverResults == " "){
      $$("#download-results").html("<img src='imgs/warning.png' style='margin:30% auto 1%; display:block; max-width: 300px;'><h2>No results found!</h2> <a href='/init/'><button class='col button button-outline button-round color-orange'>Retry Search</button></a>").addClass('text-center');
      hideNylon();
    }
    else{
      $$("#download-results").html(serverResults);
      hideNylon();
    }
    
  }, 8000);
  
  

});








$$(document).on('page:init', '.page[data-name="searchpanel"]', function (e) {
  showNylon();
    
    app.request.post("https://quickbookingng.com/app/assets/fetch_all.php", {}, function(successData){

        hideNylon();
        $$(".searchbar-found").html(successData);
        setTimeout(function(){
          $$(".open-my-searchbar").trigger("click");
        }, 1000);
        

    }, function(failData){

        hideNylon();
        app.dialog.alert("Connection to the server failed.");

    });


});




$$(document).on('page:init', '.page[data-name="searchpanel2"]', function (e) {
  
    showNylon();
    
    app.request.post("https://quickbookingng.com/app/assets/fetch_all2.php", {}, function(successData){

        hideNylon();
        $$(".searchbar-found").html(successData);
        setTimeout(function(){
          $$(".open-my-searchbar").trigger("click");
        }, 1000);

    }, function(failData){

        hideNylon();
        app.dialog.alert("Connection to the server failed.");

    });


});



$$(document).on('page:init', '.page[data-name="init"]', function (e) {

  hideNylon();

  setTimeout(function(){

        $$("#from-city-text").html(localStorage.getItem("from_terminal"));
        $$("#to-city-text").html(localStorage.getItem("to_terminal"));


        $$("#departure-date").text(window.localStorage.getItem("departure_date_string"));
        $$("#arrival-date").text(window.localStorage.getItem("arrival_date_string"));

        

        if($$("#hidden-departure-date").val() == "" || $$("#hidden-arrival-date").val() == ""){

            $$("#hidden-departure-date").val(localStorage.getItem("hidden_departure_date"));
            $$("#hidden-arrival-date").val(localStorage.getItem("hidden_arrival_date"));
        }

        if(localStorage.getItem("flight_class") == "economy"){
          $$("#economy-btn").addClass("cabin-class-style");
        }
        else{
          $$("#business-btn").addClass("cabin-class-style");
        }


        $$("#adult-passenger-count").val(localStorage.getItem("adult_passenger_count"));
        $$("#children-passenger-count").val(localStorage.getItem("children_passenger_count"));
        $$("#infant-passenger-count").val(localStorage.getItem("infant_passenger_count"));
    }, 500);    

        $$("input[name='trip_type']").on("change", function(){
          var tripType = $$("input[name='trip_type']:checked").val();
          
          if(tripType == "one_way"){
            $$("#return-date-pack").hide();
            $$("#hidden-arrival-date").val("");
          }
          else{
            $$("#return-date-pack").show();
            setTimeout(function(){
            var miniMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                var psp = $$("#arrival-date").text();
                splitpsp = psp.split(" ");
                var monthIndex;

                 for (var i = 0; i < miniMonths.length; i++) {
                   if(miniMonths[i] == splitpsp[1]){
                      monthIndex = i + 1;
                      break;
                   }
              }
                var joinDate = splitpsp[3] + "-" + monthIndex + "-" + splitpsp[2];
                $$("#hidden-arrival-date").val(joinDate);
            },1000);

            
          }
            
        });
       


       var now = new Date();


          var arrivalDate = app.calendar.create({

              inputEl : "#arrival-date, #hidden-arrival-date",
              openIn: 'customModal',
              header: true,
              headerPlaceholder : 'Arrival Date',
              closeOnSelect : true,
              footer: false,
              dateFormat: 'yyyy-mm-dd',
                disabled: {
                  from: new Date(1950, 1, 1),
                  to: new Date(now.getFullYear(), now.getMonth(), now.getDate())
              },
               on: {
                close: function(){
                  var selectedArrivalDate = arrivalDate.getValue();
                  const parseToArray = Object.values(selectedArrivalDate);
                  for (const passd of parseToArray) {
                      console.log(passd);
                      $$("#arrival-date").text(passd);
                 }

                  var newString =  $$("#arrival-date").text();
                  var cutString = newString.substr(0, 16);
                  $$("#arrival-date").text(cutString);

                  //store custring in localStorage for future reference
                  window.localStorage.setItem("arrival_date_string", cutString);
                
                }
              }

            });
     

              var departureDate = app.calendar.create({

              inputEl : "#departure-date, #hidden-departure-date",
              openIn: 'customModal',
              header: true,
              headerPlaceholder : 'Departure Date',
              closeOnSelect : true,
              footer: false,
              dateFormat: 'yyyy-mm-dd',
               disabled: {
                  from: new Date(1950, 1, 1),
                  to: new Date(now.getFullYear(), now.getMonth(), now.getDate())
              },
              on: {
                close: function(){
                  var selectedArrivalDate = departureDate.getValue();
                  const parseToArray = Object.values(selectedArrivalDate);
                  for (const passd of parseToArray) {
                      
                      console.log(passd);
                      $$("#departure-date").text(passd);
                 }

                  var newString =  $$("#departure-date").text();
                  var cutString = newString.substr(0, 16);
                  $$("#departure-date").text(cutString);

                  //store custring in localStorage for future reference
                  window.localStorage.setItem("departure_date_string", cutString);

                  var tripType = $$("input[name='trip_type']:checked").val();
                  if(tripType == "round_trip"){
                    arrivalDate.open();
                  }
                  
                
                }
              }

            });


             
              
           


            $$("#dec-adult-passenger, #inc-adult-passenger").on("click", function(){

                setTimeout(function(){
                  localStorage.setItem("adult_passenger_count", $$("#adult-passenger-count").val());
                }, 500);

            });



            $$("#dec-children-passenger, #inc-children-passenger").on("click", function(){

                setTimeout(function(){
                  localStorage.setItem("children_passenger_count", $$("#children-passenger-count").val());
                }, 500);
                
            });


            $$("#dec-infant-passenger, #inc-infant-passenger").on("click", function(){

                setTimeout(function(){
                  localStorage.setItem("infant_passenger_count", $$("#infant-passenger-count").val());
                }, 500);
                
            });



          $$("#economy-btn").on("click", function(){

            localStorage.setItem("flight_class", "economy");
              $$("#economy-btn").addClass("cabin-class-style");
              $$("#business-btn").removeClass("cabin-class-style");

          });




           $$("#business-btn").on("click", function(){

            localStorage.setItem("flight_class", "business");
            $$("#economy-btn").removeClass("cabin-class-style");
            $$("#business-btn").addClass("cabin-class-style");

          });



$$("#search-flight-btn").on("click", function(){

  showNylon();

  
        app.request.post("https://quickbookingng.com/skyscanner/live_flight_search.php", 
          {
            origin_place : window.localStorage.getItem("skyscanner_from_terminal"),
            destination_place : window.localStorage.getItem("skyscanner_to_terminal"),
            outbound_date : $$("#hidden-departure-date").val(),
            inbound_date : $$("#hidden-arrival-date").val(),
            adults : localStorage.getItem("adult_passenger_count"),
            children : localStorage.getItem("children_passenger_count"),
            infants : localStorage.getItem("infant_passenger_count"),
            cabin_class : localStorage.getItem("flight_class")
          },
           function(successData){

        console.log(successData);

        var splitLocationURL = successData.split("/");
        console.log(splitLocationURL[7]);

        setTimeout(pushPolls(splitLocationURL[7]), 1000);

        function pushPolls(theSessionKey){



            app.request.post("https://quickbookingng.com/skyscanner/poll_results.php", {
              "my_session_key" : theSessionKey
            }, function(receivedData){

              console.log(receivedData);
              window.localStorage.setItem("server_deployment_results", receivedData);
              setTimeout(function(){
                hideNylon();
                mainView.router.navigate("/results/");
                
              }, 4000);

                
            }, function(xhr, status){
                  hideNylon();
                  app.dialog.alert("error in comms");
            });

        }

    }, function(failData){

        hideNylon();
        app.dialog.alert("Connection to the server failed.");

    });
})

       

});













