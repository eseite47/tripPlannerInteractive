const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker");
const getData = require('./helped').getData;
const createDOM = require('./helped').createDOM;
const map = require('./helped').map;
const dataObject = require('./helped').dataObject;


const attractions = ['hotels', 'activities', 'restaurants']

fetch('/api')
  .then(result => result.json())
  .then(data => {

    //creating lists on the side panel
    attractions.forEach(function(type){
      console.log(data);
      var arr = data[type];
      arr.forEach(function(element){
        const parent = document.getElementById(type + '-choices')
        const option = document.createElement('option');
        option.value = element.id;
        option.append(element.name)
        parent.append(option)
      })
    })

    //On Click events
    attractions.forEach(function(type){
    document.getElementById(type + '-add').addEventListener('click', function(){
      var data = getData(type)
      // console.log(location)
      if (data){
        createDOM(type, data);
      }
    })
  })
})
