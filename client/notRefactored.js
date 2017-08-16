const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker");
// const Sequelize = require("sequelize");
// const models = require('../server/models')
// var Place = require('../server/models').Place;
// var Hotel = require('../server/models').Hotel;
// var Restaurant = require('../server/models').Restaurant;
// var Activity = require('../server/models').Activity;

/*
  * Instantiate the Map
  */

mapboxgl.accessToken = "pk.eyJ1IjoiYXByZXNzNCIsImEiOiJjajY4M2ZjdmIwYzB4MzNwbDJmbnFndDN3In0.hNBXlDz4RQ1lcc2Q-_GyqQ";
const map = new mapboxgl.Map({
  container: "map-canvas",
  center: [-74.0, 40.731],
  zoom: 12.5, // starting zoom
  pitch: 35,
  bearing: 20,
  style: "mapbox://styles/mapbox/streets-v10"
});

let dataObject;

fetch('/api')
  .then(result => result.json())
  .then(data => {
    dataObject = data;
    const hotelArr = data.hotels
    hotelArr.forEach(function(element){
      //console.log(element)
      const parentH = document.getElementById('hotels-choices')
      const hotelOption = document.createElement('option');
      hotelOption.value = element.id;
      hotelOption.append(element.name)
      parentH.append(hotelOption)
    })

    const restaurantArr = data.restaurants
    restaurantArr.forEach(function(element){
      //console.log(element)
      const parentR = document.getElementById('restaurants-choices')
      const restaurantsOption = document.createElement('option');
      restaurantsOption.value = element.id;
      restaurantsOption.append(element.name)
      parentR.append(restaurantsOption)
    })

    const activitiesArr = data.activities
    activitiesArr.forEach(function(element){
      //console.log(element)
      const parentA = document.getElementById('activities-choices')
      const activitiesOption = document.createElement('option');
      activitiesOption.value = element.id;
      activitiesOption.append(element.name)
      parentA.append(activitiesOption)
    })
  })

document.getElementById('hotels-add').addEventListener('click', function(){
  const select = document.getElementById('hotels-choices')

  const selectedId = select.value;
  const hotelObject = dataObject.hotels.filter(function(hotel){
    return hotel.id === parseInt(selectedId);
  })
  let placeId = hotelObject[0].placeId;
  let name = hotelObject[0].name;
  let coordinates = dataObject.places[parseInt(placeId) + 1].location
  const hotelsList = document.getElementById('hotels-list')
  const newHotel = document.createElement('p');
  const deleteBTN = document.createElement('button')
  deleteBTN.className = "btn btn-danger btn-circle pull-right";
  deleteBTN.id = "hotel-delete";
  deleteBTN.innerHTML = 'x';
  newHotel.append(deleteBTN);
  newHotel.append(name)
  hotelsList.append(newHotel);
  var markerHotel = buildMarker('hotels', coordinates)
  markerHotel.addTo(map);
  map.zoomIn({center:coordinates});
  deleteBTN.onclick = function(){
    map.zoomOut({center:coordinates});
    markerHotel.remove()
    newHotel.remove();
  }
})

document.getElementById('restaurants-add').addEventListener('click', function(){
  const select = document.getElementById('restaurants-choices')

   const selectedId = select.value;
  const restaurantObject = dataObject.restaurants.filter(function(resto){
    return resto.id === parseInt(selectedId);
  })
  let placeId = restaurantObject[0].placeId;
  let name = restaurantObject[0].name;
  let coordinates = dataObject.places[parseInt(placeId) + 1].location
  const restaurantsList = document.getElementById('restaurants-list')
  const newRestaurant = document.createElement('p');
  const deleteBTN = document.createElement('button')
  deleteBTN.className = "btn btn-danger btn-circle pull-right";
  deleteBTN.id = "restaurant-delete"
  deleteBTN.innerHTML = 'x';
  newRestaurant.append(deleteBTN);
  newRestaurant.append(name)
  restaurantsList.append(newRestaurant);
  var restoMarker = buildMarker('restaurants', coordinates)
  restoMarker.addTo(map);
  map.zoomIn({center:coordinates});
  deleteBTN.onclick = function(){
    map.zoomOut({center:coordinates});
    restoMarker.remove()
    newRestaurant.remove();
  }
  //const selectedId = select.value;

})

document.getElementById('activities-add').addEventListener('click', function(){
  const select = document.getElementById('activities-choices')
  const selectedId = select.value;
  const activityObject = dataObject.activities.filter(function(activity){
    return activity.id === parseInt(selectedId);
  })

  let placeId = activityObject[0].placeId;
  let name = activityObject[0].name;
  let coordinates = dataObject.places[parseInt(placeId)-1].location

  const activitiesList = document.getElementById('activities-list')
  const newActivity = document.createElement('p');
  const deleteBTN = document.createElement('button')

  deleteBTN.className = "btn btn-danger btn-circle pull-right";
  deleteBTN.id = "activities-delete"
  deleteBTN.innerHTML = 'x';

  newActivity.append(deleteBTN);
  newActivity.append(name)
  activitiesList.append(newActivity);

  var markeractivity = buildMarker('activities', coordinates)
  markeractivity.addTo(map);

  map.zoomIn({center:coordinates});

  deleteBTN.onclick = function(){
    map.zoomOut({center:coordinates});
    markeractivity.remove()
    newActivity.remove();
  }
})

// document.getElementById('hotels-list').childNodes[0].childNodes[0].addEventListener('click', function(){
//   const hotelDelete = document.getElementById('hotel-delete').parentElement;
//   hotelDelete.remove();

// })
