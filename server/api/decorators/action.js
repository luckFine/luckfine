 function url(mappingUrl, method) {
   return function (target, name, descriptor) {
     if(!target.constructor._mappingRoutes){
        target.constructor._mappingRoutes = {};
     }
     const route = target.constructor._mappingRoutes;
     route[mappingUrl] = {name:name, type:method||'get'};
   };
}
function get (mappingUrl){
    return url(mappingUrl,'get');
}
function post (mappingUrl){
    return url(mappingUrl,'post')
}
function put (mappingUrl){
    return url(mappingUrl,'put')
}
function del (mappingUrl){
    return url(mappingUrl,'delete')
}
module.exports = {
    url,
    get,
    post,
    put,
    del
}