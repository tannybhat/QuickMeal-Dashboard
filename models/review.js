var mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    restaurant:{
        type: String,
        required: true
      },
    text:{
        type: String,
        required: true
      }
});

const Review = module.exports = mongoose.model('Review', reviewSchema);