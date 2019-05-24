const {url,post,put,del} = require('./decorators/action.js')

class BaseController{
    static _mappingRoutes = {}
    service;
    constructor(){
        this.service = null;
    }
    @url('/list')
    async list(ctx, next){
        const data = {
            errCode:0,
            msg:'success'
        }
        try{
            const result = await this.service.findAll();
            data.result = result;
        }catch(e){
            data.errCode = 1;
            data.msg = 'failed';
        }
        ctx.body = data;
        next();
    }
    @url('/detail/:id')
    async detail(ctx, next){
        const data = {
            errCode:0,
            msg:'success'
        }
        try{
            const id = ctx.params.id;
            const result = await this.service.findById(id);
            data.result = result;
        }catch(e){
            data.errCode = 1;
            data.msg = 'failed';
        }
        ctx.body = data;
    }
    @post('/create')
    async create(ctx,next){
        const data = {
            errCode:0,
            msg:'success'
        }
        try{
            let entity = ctx.request.body;
            const result = await this.service.create(entity);
            console.log(result);
            data.result = result;
        }catch(e){
            data.errCode = 1;
            data.msg = 'failed';
        }
        ctx.body = data;
    }
    @post('/update')
    async update(ctx,next){
        const data = {
            errCode:0,
            msg:'success'
        }
        try{
            let entity = ctx.request.body;
            const result = await this.service.save(entity);
            console.log(result);
            data.result = result;
        }catch(e){
            data.errCode = 1;
            data.msg = 'failed';
        }
        ctx.body = data;
    }
    @post('/save')
    async save(ctx,next){
        const data = {
            errCode:0,
            msg:'success'
        }
        try{
            let entity = ctx.request.body;
            const result = await this.service.save(entity);
            console.log(result);
            data.result = result;
        }catch(e){
            data.errCode = 1;
            data.msg = 'failed';
        }
        ctx.body = data;
    }
    @del('/remove/:id')
    async del(ctx,next){
        const data = {
            errCode:0,
            msg:'success'
        }
        try{
            let id = ctx.params.id
            if(id){
                await this.service.removeById(entity);
            }else{
                let ids = ctx.query.ids;
                ids = ids.split(',');
                await this.service.remove(ids);
            } 
        }catch(e){
            data.errCode = 1;
            data.msg = 'failed';
        }
        ctx.body = data;
    }
}
module.exports = BaseController