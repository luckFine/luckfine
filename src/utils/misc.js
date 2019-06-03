import $ from 'jquery'

var Misc = {
    isWechat: function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i).toString() === 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    getQueryString: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    },
    getCookie: function(name) {
        var arr;
        var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
        if (document.cookie.match(reg)) {
            arr = document.cookie.match(reg)
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    setCookie: function(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 30);
        document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
    },
    getClientInfo() {
        var promise = new Promise((resolve, reject) => {
            let fnName = 'cb' + Date.now()

            window[fnName] = function(data) {

                delete window[fnName]
                if (typeof data === 'string') {
                    data = JSON.parse(data)
                }

                if (data.retCode === 0) {
                    resolve(data.data)
                }
            }
            var timer = setInterval(function() {
                if (typeof jrj !== 'undefined') {
                    window.clearInterval(timer)
                    window.jrj.jsCallNative('130', JSON.stringify({
                        method: 'get',
                        url: 'http://itougu.jrj.com.cn/act/getClientInfo',
                        params: {
                            timeStamp: new Date().getTime()
                        },
                        callback: fnName
                    }))
                }
            }, 100)
        })
        return promise
    },
    // 获取用户信息
    getBasicUserInfo() {
        const promise = new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.addEventListener('load', function() {
                resolve(window.basicUserInfo)
                document.getElementsByTagName('head')[0].removeChild(script)
                    // resolve()
            })
            script.addEventListener('error', function() {
                document.getElementsByTagName('head')[0].removeChild(script)
                resolve()
            })
            script.src = '//itougu.jrj.com.cn/account/getBasicUserInfo2.jspa?' + (new Date()).getTime()
            document.getElementsByTagName('head')[0].appendChild(script)
        })
        return promise
    }
}
export default Misc
