var equipment = {
    // 获取用户ip和浏览器类型
    getCityIp: function(name) {
        return {
            city:returnCitySN['cname'],
            ip:returnCitySN['cip']
        }
    },
    getBrowserInfo: function () { 
        var agent = navigator.userAgent.toLowerCase() ;
        console.log(agent);
        var browser = {};
        // var system = agent.split(' ')[1].split(' ')[0].split('(')[1];
        // browser['browser_system']=system;
        var regStr_edge = /edge\/[\d.]+/gi;
        var regStr_ie = /trident\/[\d.]+/gi ;
        var regStr_ff = /firefox\/[\d.]+/gi;
        var regStr_chrome = /chrome\/[\d.]+/gi ;
        var regStr_saf = /safari\/[\d.]+/gi ;
        var regStr_opera = /opr\/[\d.]+/gi;
        //IE
        if(agent.indexOf("trident") > 0){
            browser['browser_agent'] = agent.match(regStr_ie)[0].split('/')[0]
            // browser['browser_version'] = agent.match(regStr_ie)[0].split('/')[1]
            return browser;
        }
        //Edge
        if(agent.indexOf('edge') > 0){
            browser['browser_agent'] = agent.match(regStr_edge)[0].split('/')[0];
            // browser['browser_version'] = agent.match(regStr_edge)[0].split('/')[1];
            return browser;
        }
        //firefox
        if(agent.indexOf("firefox") > 0){
            browser['browser_agent'] = agent.match(regStr_ff)[0].split('/')[0]
            // browser['browser_version'] = agent.match(regStr_ff)[0].split('/')[1];
            return browser;
        }
        //Opera
        if(agent.indexOf("opr")>0){
            browser['browser_agent'] = agent.match(regStr_opera)[0].split('/')[0]
            // browser['browser_version'] = agent.match(regStr_opera)[0].split('/')[1];
            return browser;
        }
        //Safari
        if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0){
            browser['browser_agent'] = agent.match(regStr_saf)[0].split('/')[0]
            // browser['browser_version'] = agent.match(regStr_saf)[0].split('/')[1];
            return browser;
        }
        //Chrome
        if(agent.indexOf("chrome") > 0){
            browser['browser_agent'] = agent.match(regStr_chrome)[0].split('/')[0]
            // browser['browser_version'] = agent.match(regStr_chrome)[0].split('/')[1];
            return browser;
        }else{
            // browser['browser_version'] = '其他'
            return browser;
        }
    }
}

module.exports = equipment;