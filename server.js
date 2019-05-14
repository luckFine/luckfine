const Koa = require('koa');
const body = require('koa-body');
const serve = require('koa-static');
const {initDB} = require('./server/db');
const {initRouter} = require('./server/router');
const server = new Koa();
server.use(body());
const init = () =>{
    return new Promise((resolve,reject) => {
        Promise.all([
            initRouter().then((router) => {
                server.use(router.routes())
                      .use(router.allowedMethods());  
            }),
            initDB()
        ]).then(() => {
            resolve();
        }).catch((e) => {
            console.log(e)
        })
    })
}
init().then(() => {
    server.listen(4008,() => {
        console.log('server started');
    })
}).catch((e) => {
    console.log(e);
})