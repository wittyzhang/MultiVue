// import axios from 'axios'
import qs from 'qs'
import vjsonp from './jsonp.js'
import md5 from 'js-md5';
import JsEncrypt from 'jsencrypt';

// 实例化一个JSEncrypt对象
let jse = new JsEncrypt()
const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCiwJbb2EeK9ZB4Chyj5/mIVPRE
od0pJrv3LM2UVtkod+2mPVjV9Xi1E06gUaoexX/ebfRXm1eBwu3LtYbklh5Ji5oF
ycoUCFhwzhmm8ZtjdkCIicFfxUU4I5NunL6+37+hy43EgCrao5tFgHtnkeR/vNyG
faxdxevPbVEtWlJz6wIDAQAB
-----END PUBLIC KEY-----`;
jse.setPublicKey(PUBLIC_KEY);

   


/* 通用设置 */
axios.defaults.timeout = 1000 * 100; //请求超时设置，10秒超时
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //设置数据格式//application/x-www-form-urlencoded
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //设置数据格式//application/x-www-form-urlencoded
axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL ='/api';   //api接口前缀
//请求拦截器
axios.interceptors.request.use(function (param) {
    //(此处可以放公共加载状态提示)
    //param.headers.Authorization ='xxxx';//设置token(需要配合vuex使用)
    return param
}, function (error) {
    // 请求错误
    return Promise.reject(error);
});
 
// 添加响应拦截器
axios.interceptors.response.use( 
    response => {
        if(response.status === 200){
            const hostname = location.hostname;
            let res  = response.data
             if(hostname.indexOf('miabaobei.com') > -1){
                 res = JSON.parse(JSON.stringify(res).replace(/mia.com/g, "miabaobei.com"));
             }
            return Promise.resolve({ data: res});
        }else{
            //这个地方可以由后台编辑状态码区分不同情况，做不同的逻辑处理
            return Promise.reject(response);
        }
    },
    error => {
        return Promise.reject(error);  
    });

// 封装axios--------------------------------------------------------------------------------------
function commonRequest(url, params) {
    let httpDefault = {
        method: "POST",
        url: url,
        data: qs.stringify(params),
        //data: params,
    }
    return new Promise((resolve, reject) => {
        // console.log(httpDefault)
        axios(httpDefault)
            // 此处的.then属于axios
            .then((res) => {
                resolve(res.data);
            }).catch((response) => {
                reject(response)
            });
    });
};

// 封装jsonp--------------------------------------------------------------------------------------
function commonjsonpRequest(url, params) {
    params= params || {callbackName: 'success_jsonpCallback'};
    return new Promise((resolve, reject) => {
        vjsonp(url, params)
        .then(json => {
            resolve(json) // Success.
        }).catch(err => {
            reject(err); // Failed.
        })
    });
};

/**
* post请求
* @param {String} url 请求的url地址
* @param {Object} params 请求提交的参数
* @param {Object} config axios headers 配置信息
*/
function api_post_form(url, { data = {}, options = {}} = {}, config = {}) {
    let string_params = JSON.stringify(data || {});
    let encrypted_params = '';
    let _length = 39;
    let frequency = Math.ceil(string_params.length / _length);
    if (frequency > 1) {
        for (let i = 0; i < frequency; i++) {
            encrypted_params += jse.encrypt(string_params.substring(i * _length, (i + 1) * _length));
        }
    } else {
        encrypted_params = jse.encrypt(string_params);
    }
    
    let _default_params = Object.assign({
        timestamp: parseInt(new Date().getTime() / 1000),  //整型时间戳(秒级时间戳)，与服务器时间误差10分钟以内
        version: 'm_1_0',  //	应用版本，格式为操作系统_版本号。例如：iphone_1_0_1 ，m、小程序也需要按照此规则传输
        user_plus_type: 0, // 用户类型
        session: '123',    // session
        app_id: 'm_app_id',  //	分配的ID号
        params: encrypted_params, // 具体接口中所指定的业务参数json字符串
    }, options);
    let str_params = '';
    let sort = Object.keys(_default_params).sort();
    sort.forEach((item)=>{ str_params += `${item}${_default_params[item]}` });
    _default_params.sign = md5(str_params + 'MiaBaoBei@0!30308');
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: url,
            headers: Object.assign({ 'Content-Type': 'application/x-www-form-urlencoded' }, config),
            data: qs.stringify(_default_params),
        }).then((res) => {
             resolve(res.data);
         }).catch((response) => {
             reject(response)
         });
    });
 };
 function hex2b64(h) {
    var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var b64padchar = "=";
    var i;
    var c;
    var ret = "";
    for (i = 0; i + 3 <= h.length; i += 3) {
        c = parseInt(h.substring(i, i + 3), 16);
        ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
    }
    return ret
    }
export default {
    api_post_form,
     /**
     * get请求
     * @param {String} url 请求的url地址
     * @param {Object} params 请求提交的参数
     */
    get(url, params, config) {
        return new Promise((resolve, reject) => {
            config = config || {};
            config.params = params;
            axios.get(url, config).then(
                res => {
                    resolve(res.data);
                },
                err => {
                    reject(err);
                }
            );
        });
    },
    /**
     * post请求
     * @param {String} url 请求的url地址
     * @param {Object} params 请求提交的参数
     */
    post(url, params, config) {
        return commonRequest(url, params, 'post', config);
    },
    /**
     * put请求
     * @param {String} url 请求的url地址
     * @param {Object} params 请求提交的参数
     */
    put(url, params, config) {
        return commonRequest(url, params, 'put', config);
    },
    /**
     * post请求
     * @param {String} url 请求的url地址
     * @param {Object} params 请求提交的参数
     */
    upload(url, params, config) {
        // let config = {
        //     headers: {
        //     'Content-Type': 'multipart/form-data'
        //     }
        // }
        // return commonRequest(url, params, 'post', config);
        return new Promise((resolve, reject) => {
            // console.log(httpDefault)
            axios({
                method: "POST",
                url: url,
                data: params,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                // 此处的.then属于axios
                .then((res) => {
                    resolve(res.data)
                }).catch((response) => {
                    reject(response)
                });
        });
    },
    /**
     * delete请求
     * @param {String} url 请求的url地址
     * @param {Object} params 请求提交的参数
     */
    delete(url, params, config) {
        return new Promise((resolve, reject) => {
            config = config || {};
            config.params = params;
            axios.delete(url, config).then(
                res => {
                    resolve(res.data);
                },
                err => {
                    reject(err);
                }
            );
        });
    },
   
    /**
     * patch请求
     * @param {String} url 请求的url地址
     * @param {Object} params 请求提交的参数
     */
    patch(url, params, config) {
        return commonRequest(url, params, 'patch', config);
    },

     /**
     * jsonp请求
     * @param {String} url 请求的url地址
     * @param {Object} params 请求提交的参数
     */
    jsonp(url, params) {
       return commonjsonpRequest(url,params)
    },
};
