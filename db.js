var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({
    name        : String,
    stock       : Number,
    part_number : String,
    description : String,
    location    : String,
    datasheet   : String,
    vendor      : String,
    updated_at  : Date

});

mongoose.model('Item', Item);

mongoose.connect('mongodb://127.0.0.1/Iventory');