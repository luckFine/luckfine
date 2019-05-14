const BaseService  = require('./BaseService');
const ActivityModel = require('../models/Activity')
module.exports = class Activity extends BaseService{
    constructor(){
        super();
        this.Model = ActivityModel;
    }
}