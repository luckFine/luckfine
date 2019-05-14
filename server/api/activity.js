const ActivityService = require('../services/Activity');
exports.list = async function(ctx, next){
    const data = {
        errCode:0,
        msg:'success'
    }
    try{
        const article = new ActivityService();
        const result = await article.findAll();
        data.result = result;
    }catch(e){
        data.errCode = 1;
        data.msg = 'failed';
    }
    ctx.body = data;
}
exports.detail = async function(ctx, next){
    const data = {
        errCode:0,
        msg:'success'
    }
    try{
        const article = new ActivityService();
        const result = await article.findAll();
        data.result = result;
    }catch(e){
        data.errCode = 1;
        data.msg = 'failed';
    }
    ctx.body = data;
}
exports.create = async function(ctx, next){
    const data = {
        errCode:0,
        msg:'success'
    }
    try{
        const article = new ActivityService();
        let entity = ctx.request.body;
        const result = await article.create(entity);
        console.log(result);
        data.result = result;
    }catch(e){
        data.errCode = 1;
        data.msg = 'failed';
    }
    ctx.body = data;
}
exports.update = async function(ctx, next){
    const data = {
        errCode:0,
        msg:'success'
    }
    try{
        const article = new ActivityService();
        const result = await article.findAll();
        data.result = result;
    }catch(e){
        data.errCode = 1;
        data.msg = 'failed';
    }
    ctx.body = data;
}
exports.remove = async function(ctx, next){
    const data = {
        errCode:0,
        msg:'success'
    }
    try{
        const article = new ActivityService();
        const result = await article.findAll();
        data.result = result;
    }catch(e){
        data.errCode = 1;
        data.msg = 'failed';
    }
    ctx.body = data;
}