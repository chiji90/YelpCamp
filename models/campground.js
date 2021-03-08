const mongoose = require('mongoose');
const Schema = mongoose.Schema; //Shortcute. So no need to type mongoose.schema all the time

//Model For Each CampGround
const CampgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
});

//Export Model
module.exports = mongoose.model('Campground', CampgroundSchema);

