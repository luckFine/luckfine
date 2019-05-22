const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

function dispatch(action,Controller){
    // const Controller = action.controllerClass;
    const name = action.name;
    const controller = new Controller();
    return async (ctx,next) => {
        // console.log('handler request',ctx);
        // 必须await
        await controller[name](ctx,next);
    }
}
exports.initRouter = () => {
    const router = new Router({
        prefix:'/actconf/api'
    });
    return new Promise((resolve,reject) => {
        console.log('begin to init router...');
        const startTime = new Date().getTime();
        const dir = path.resolve(__dirname,'../api/controllers');
        try{
            const files = fs.readdirSync(dir);
            if(files && files.length){
                for(file of files){
                    const filepath = path.join(dir,file);
                        const stats = fs.statSync(filepath);
                        if(stats.isFile()){
                            if(path.extname(file)!=='.js'){
                                continue;
                            }
                            const Controller = require(filepath);
                            for(route in Controller._mappingRoutes){
                                const action = Controller._mappingRoutes[route];
                                const type = (action.type || 'get').toLocaleLowerCase();
                                const controllerName = Controller.name;
                                const _url = `/${controllerName[0].toLocaleLowerCase()+controllerName.substring(1)+route}`
                                console.log(`init route:[${type}]${_url}`)
                                switch(type){
                                    case "get":
                                        router.get(_url,dispatch(action,Controller));
                                        break
                                    case "post":
                                        router.post(_url,dispatch(action,Controller));
                                        break;
                                    case "put":
                                        router.put(_url,dispatch(action,Controller));
                                        break;
                                    case "delete":
                                        router.delete(_url,dispatch(action,Controller));
                                        break;
                                    default: 
                                        router.all(_url,dispatch(action,Controller));
                                        break;
                                }
                            }
                        }
                }
            }
            console.log('end...')
            console.log(`it takes ${new Date().getTime() - startTime} ms`);
            resolve(router);
        }catch(e){
            console.log(e);
            reject(e);
        }
    }) 
}