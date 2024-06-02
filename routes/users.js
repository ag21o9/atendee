var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/Atendee';
mongoose.connect(mongoDB);

const date = new Date();
const data = date.toDateString();

const schema  = mongoose.Schema({
  username : String,
  roll : Number
})

module.exports = mongoose.model(data,schema);