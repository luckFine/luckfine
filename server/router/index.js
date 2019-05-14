const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
// const activity = require('../api/activity');
// router.get('/actConf/act/list',activity.list);
// router.get('/actConf/act/:id',activity.detail);
// router.put('/actConf/act',activity.create);
// router.post('/actConf/act',activity.update);
// router.delete('/actConf/act',activity.remove);

exports.initRouter = () => {
    const router = new Router();
    return new Promise((resolve,reject) => {
        const dir = path.resolve(__dirname,'../api');
        fs.readdir(dir,(err,files)=>{
            if(err){
                reject(err);
            }else{
                for(file of files){
                    const filepath = path.join(dir,file);
                    const stats = fs.statSync(filepath);
                    if(stats.isFile()){
                        const controller = require(filepath);
                        const basename = path.basename(filepath,'.js');
                        console.log(basename);
                        router.get(`/${basename}/list`,controller.list);
                        router.get(`/${basename}/:id`,controller.detail);
                        router.put(`/${basename}`,controller.create);
                        router.post(`/${basename}`,controller.update);
                        router.delete(`/${basename}`,controller.remove);
                    }
                };
                resolve(router);
            }
        });
    }) 
}