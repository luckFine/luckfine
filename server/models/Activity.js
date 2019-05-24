const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const activitySchema = new Schema({
    creator:String,
    createTime:Date,
    status:String,
    wholePage:Object,
    systemData:Object,
    content:Array
});
module.exports = mongoose.model('Activity',activitySchema,'activity');