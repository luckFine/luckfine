const {url, get, post, put, del} = require('../decorators/action.js')
const BaseController = require('../BaseController.js')
const ActivityService = require('../../services/Activity.js')
class Activity extends BaseController{
    constructor(){
        super();
        this.service = new ActivityService();
    }
    @post('/publish')
    async publish(ctx,next){
        const data = {
            errCode:0,
            msg:'success'
        }
        const _id = ctx.request.body._id;
        const status = ctx.request.body.status?"online":""
        const entity = {
            _id,
            status
        }
        try{
            data.result = await this.service.update(entity);
            ctx.body = data;
        }catch(e){
            data.msg = "failed";
            ctx.body = data;
        }
    }
}
module.exports = Activity
