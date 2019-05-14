const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const activitySchema = new Schema({
    title:String,
    creator:String,
    createTime:Date,
    content:Array
});
module.exports = mongoose.model('Activity',activitySchema,'activity');