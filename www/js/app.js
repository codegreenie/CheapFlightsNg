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

   var pushMyCity = function(theCityCode){

        window.localStorage.setItem("from_terminal", theCityCode);
        app.preloader.show();

        setTimeout(function(){
        mainView.router.navigate("/init/");
        app.preloader.hide();
        }, 500);
    }


  var pushMyCity2 = function(theCityCode){

        window.localStorage.setItem("to_terminal", theCityCode);
        app.preloader.show();

        setTimeout(function(){
        mainView.router.navigate("/init/");
        app.preloader.hide();
        }, 500);
    }






$$(document).on('page:init', '.page[data-name="searching"]', function (e) {

  var fromTerminal = localStorage.getItem("from_terminal");
  var toTerminal = localStorage.getItem("to_terminal");


  $$("#search-title").html(fromTerminal.substr(0,4) + " - " + toTerminal.substr(0,4));
  
      setTimeout(function(){
        
        mainView.router.navigate('/results/');
        
      }, 5000);


      $$("#from-terminal-location").html(fromTerminal);
      $$("#to-terminal-location").html(toTerminal);
});






$$(document).on('page:init', '.page[data-name="results"]', function (e) {

  var fromTerminal = localStorage.getItem("from_terminal");
  var toTerminal = localStorage.getItem("to_terminal");


  $$("#search-title-heading").html(fromTerminal.substr(0,4) + " - " + toTerminal.substr(0,4));
  
  

/*
      $$("#from-terminal-location").html(fromTerminal);
      $$("#to-terminal-location").html(toTerminal);
*/

});








$$(document).on('page:init', '.page[data-name="searchpanel"]', function (e) {
  
    app.preloader.show();
    
    app.request.post("https://quickbookingng.com/app/assets/fetch_all.php", {}, function(successData){

        app.preloader.hide();
        $$(".searchbar-found").html(successData);

    }, function(failData){

        app.preloader.hide();
        app.dialog.alert("Connection to the server failed.");

    });


});




$$(document).on('page:init', '.page[data-name="searchpanel2"]', function (e) {
  
    app.preloader.show();
    
    app.request.post("https://quickbookingng.com/app/assets/fetch_all2.php", {}, function(successData){

        app.preloader.hide();
        $$(".searchbar-found").html(successData);

    }, function(failData){

        app.preloader.hide();
        app.dialog.alert("Connection to the server failed.");

    });


});



$$(document).on('page:init', '.page[data-name="init"]', function (e) {
  
        $$("#from-city-text").html(localStorage.getItem("from_terminal"));
        $$("#to-city-text").html(localStorage.getItem("to_terminal"));



              var departureDate = app.calendar.create({

              inputEl : "#departure-date",
              openIn: 'customModal',
              header: true,
              footer: true,
              dateFormat: 'dd MM yyyy',
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
                
                }
              }

            });



             var arrivalDate = app.calendar.create({

              inputEl : "#arrival-date",
              openIn: 'customModal',
              header: true,
              footer: true,
              dateFormat: 'dd MM yyyy',
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

            localStorage.setItem("flight_class", "Economy");

              $$("#economy-btn").css({
                "border" : "solid 2px #fff"
              });

              $$("#business-btn").css({
                "border" : "none"
              });

          });




           $$("#business-btn").on("click", function(){

            localStorage.setItem("flight_class", "Business");

              $$("#business-btn").css({
                "border" : "solid 2px #fff"
              });

              $$("#economy-btn").css({
                "border" : "none"
              });

          });


$$("#search-flight-btn").on("click", function(){
        app.request.post("https://quickbookingng.com/skyscanner/live_flight_search.php", {}, function(successData){

        console.log(successData);

    }, function(failData){

        app.preloader.hide();
        app.dialog.alert("Connection to the server failed.");

    });
})

       

});













