const mongoose = require('mongoose');
const initData = async () => {

}
exports.initDB = function(){
    return new Promise((resolve,reject) => {
        const db = mongoose.connection;
        db.once('open',() => {
            console.log('db connected');
            resolve();
        });
        db.on('error',() => {
            console.log('connect failed');
            reject();
        })
        const connOpts = {
            dbName:'jrj-act-conf',
            user:'admin',
            pass:'password',
            useNewUrlParser:true
        }
        console.log('connecting db...');
        mongoose.connect('mongodb://172.16.20.68:27059/jrj-act-conf',connOpts);
    })
}
