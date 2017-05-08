const mongoose  = require('mongoose');

let Schema = mongoose.Schema;

let taskSchema = new Schema({
  title : {
    type : String,
    required : true
  },

  description : {
    type : String,
    required : true
  },

  state : {
    type : String,
    required : true
  },

  user : {
    type : String
  }
});

module.exports = mongoose.model('Task', taskSchema);
