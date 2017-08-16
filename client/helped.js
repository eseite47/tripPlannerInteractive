const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker");

let dataObject;

fetch('/api')
  .then(result => result.json())
  .then(data => {
    dataObject = data;
    console.log('done fetching')
  })

  //create map
mapboxgl.accessToken = "pk.eyJ1IjoiYXByZXNzNCIsImEiOiJjajY4M2ZjdmIwYzB4MzNwbDJmbnFndDN3In0.hNBXlDz4RQ1lcc2Q-_GyqQ";
const map = new mapboxgl.Map({
  container: "map-canvas",
  center: [-74.0, 40.731],
  zoom: 12.5, // starting zoom
  pitch: 35,
  bearing: 20,
  style: "mapbox://styles/mapbox/streets-v10"
});

/*
Below : helper functions to create DOM elements after click is triggered
*/

const state = {
  hotels: [],
  restaurants: [],
  activities: []
}

//find id and location
const findLocation = function(type){
  const select = document.getElementById(type +'-choices')
  const selectedId = select.value;
  const object = dataObject[type].filter(function(element){
    return element.id === parseInt(selectedId);
  })

  let placeId = object[0].placeId;
  let name = object[0].name;
  if(!state[type].includes(name)){
    if((type === 'hotels' && !state.hotels.length) || (type === 'restaurants' && state.restaurants.length < 3) || (type === 'activities')){
      state[type].push(name)
      let coordinates = dataObject.places[parseInt(placeId)-1].location
      return [coordinates, name]
    }
    else {
      alert('Your itinerary is already all set when it comes to ' + type)
      return false
    }
  }
  else{
    alert('You already have this attraction in your itinerary')
    return false
  }
}

//create DOM elements and append
const createDOM = function(type, data){
  const list = document.getElementById(type + '-list')
  const newElement = document.createElement('p');
  const deleteBTN = document.createElement('button')

  deleteBTN.className = "btn btn-danger btn-circle pull-right";
  deleteBTN.id = type + "-delete";
  deleteBTN.innerHTML = 'x';

  newElement.append(deleteBTN);
  newElement.append(data[1])
  list.append(newElement);

  var markeractivity = buildMarker('activities', data[0]);
  markeractivity.addTo(map);

  map.zoomIn({center:data[0]});

  deleteBTN.onclick = function(){
    map.zoomOut({center:data[0]});
    markeractivity.remove()
    newElement.remove();
    var index = state[type].indexOf(data[0])
    state[type].splice(index, 1);
  }
}

module.exports = {
  getData: findLocation,
  createDOM: createDOM,
  map: map,
  dataObject: dataObject
}
