const {url, get, post, put, del} = require('../decorators/action.js')
const BaseController = require('../BaseController.js')
const ActivityService = require('../../services/Activity.js')
class Activity extends BaseController{
    constructor(){
        super();
        this.service = new ActivityService();
    }
    @url('/special')
    recentActs(ctx,next){
        ctx.body = "recent acts";
    }
}
module.exports = Activity
