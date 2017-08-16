const express = require('express')
const router = express.Router();
const models = require('../models')
var Place = require("../models").Place;
var Hotel = require("../models").Hotel;
var Restaurant = require("../models").Restaurant;
var Activity = require("../models").Activity;

var allAttractions = {};

router.get('/', function(req, res, next){
  Hotel.findAll()
  .then(function(hotels) {
    allAttractions.hotels = hotels;
    return Restaurant.findAll();
  })
  .then(function(restaurants) {
    allAttractions.restaurants = restaurants;
    return Activity.findAll();
  })
  .then(function(activities) {
    allAttractions.activities = activities;
    return Place.findAll();
  })
  .then(function(places){
    allAttractions.places = places;
    res.json(allAttractions)
  })
  .catch(next);
})

module.exports = {
  allAttractions: allAttractions,
  router: router
};
