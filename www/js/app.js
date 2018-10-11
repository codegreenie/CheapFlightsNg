document.addEventListener("deviceready", deviceIsReady, false);


function deviceIsReady(){
  StatusBar.backgroundColorByHexString("#ff9800");
}


// Dom7
var $$ = Dom7;


// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
  theme: 'md',
  language: 'en',

  routes: [
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
    }
  
  ],
  panel: {
    swipe: "both"
  }
});

var view = app.views.create('.view-main', {});
var router = view.router;



$$(document).on('page:init', '.page[data-name="searching"]', function (e) {
  
      setTimeout(function(){
        
        $$('.results-btn').css({'display' : 'block'});
        $$('.searching-block').css({'display' : 'none'});
        
      }, 8000);
})












