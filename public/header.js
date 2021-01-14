var str = location.href;
var re = /from=([\w_\-\.\\\+\%]*)/i;
var rs = str.match(re);
var curUrl = window.location.href;
var from = curUrl.indexOf('from');
var sugs = {}, sugsArray = [];
var parms = [];
var addons = '';

var origin = curUrl;
if (curUrl.indexOf('?') > 0) {
  if (curUrl.indexOf('#') > 0) {
    sugsArray = curUrl.split('?')[1].split('#')[0].split('&');
    addons = '#' + curUrl.split('#')[1];
  } else {
    sugsArray = curUrl.split('?')[1].split('&');
  }
  for (var i = 0; i < sugsArray.length; i++) {
    if (sugsArray[i].indexOf("=") != -1) {
      var k = sugsArray[i].substr(0, sugsArray[i].indexOf("="));
      var v = sugsArray[i].substr(sugsArray[i].indexOf("=") + 1);
      sugs[k] = v;
    }
  };

  origin = curUrl.split('?')[0];
} else if (curUrl.indexOf('#') > 0) {
  addons = '#' + curUrl.split('#')[1];
  origin = curUrl.split('#')[0];
}
//百度直达号
if (sugs['bd_source_light'] > 0) {
  var date = new Date();
  var expireDays = 14;
  date.setTime(date.setTime(date.getTime() + expireDays * 24 * 3600 * 1000));
  setcookie("sitefrom", "2c0073760004a200403455ffcf05b0524", date.toGMTString());
  if (sugs.bd_from_id !== '' && sugs.bd_ref_id !== '' && sugs.bd_channel_id !== '' && sugs.bd_sub_page !== '') {
    if (typeof (sugs.bd_from_id) != 'undefined' && typeof (sugs.bd_ref_id) != 'undefined' && typeof (sugs.bd_channel_id) != 'undefined' && typeof (sugs.bd_sub_page) != 'undefined') {
      var bd_zdh_tag = sugs.bd_from_id + ',' + sugs.bd_ref_id + ',' + sugs.bd_channel_id + ',' + sugs.bd_sub_page;
      setcookie("bd_zdh_tag", bd_zdh_tag, date.toGMTString());
    }
  }
}
function getPar(par) {
  //获取当前URL
  var local_url = document.location.href;
  //获取要取得的get参数位置
  var get = local_url.indexOf(par + "=");
  if (get == -1) {
    return false;
  }
  //截取字符串
  var get_par = local_url.slice(par.length + get + 1);
  //判断截取后的字符串是否还有其他get参数
  var nextPar = get_par.indexOf("&");
  if (nextPar != -1) {
    get_par = get_par.slice(0, nextPar);
  }
  return get_par;
}

var param_from = getPar('from');

var param_sfrom = getPar('sfrom');
if (param_sfrom) {
  param_from = param_sfrom
  sugs.from = sugs.sfrom
};


//if(from != -1){
if (param_from) {
  var date = new Date();
  if (rs && sugs.from != '') {
    var from_type = sugs.from.substr(0, 2);
    if (from_type == "2c") {
      var expireDays = 14;
    } else {
      var expireDays = 1;
    }
    date.setTime(date.getTime() + expireDays * 24 * 3600 * 1000);
    setcookie("sitefrom", sugs.from, date.toGMTString());

    //
    var webunion_stfrom = ['duomai', 'yiqifa', 'cn360', 'linktech', 'chanet', 'chanetwap', 'zhituicps', 'weiyicps', '1c00220000034200131054f19455ceb0a', 'shande', '1c0022310003a4001c94551153736ca04', '547bd910145f3', '3c00228000042a003fbb553daa3592fc2', '2c0012400003ce001cbf5523ab1fcacbe', '3c00236800049a00402c55f135899eeea', '3c00236900049b00402d55f137d296a54', '3c00237000049c00402e55f138c8444c0', '3c00237100049d00402f55f1398a760a5', '2c0024990005290040bb56a8a605df1ca', '2c0028490007c200435458c10ca2264ce'];

    if (sugs.from == '2c0012400003ce001cbf5523ab1fcacbe') {
      sugs.wu_source = 'bdmy';
      sugs.wu_channel = 'cps';
      sugs.wu_cid = '';

      sugs.wu_wi = '';
      if (sugs.baidu_token != '' && typeof (sugs.baidu_token) != 'undefined') {
        sugs.wu_wi = sugs.baidu_token;
      }

      var myreg = /^[a-zA-Z0-9\_\=\^\-\|\%]+$/;//console.log(sugs);
      if (sugs.bd_tk != '' && typeof (sugs.bd_tk) != 'undefined' && myreg.test(sugs.bd_tk)) {
        setcookie("bd_tk", sugs.bd_tk, date.toGMTString());
      }
      if (sugs.bd_st != '' && typeof (sugs.bd_st) != 'undefined' && myreg.test(sugs.bd_st)) {
        setcookie("bd_st", sugs.bd_st, date.toGMTString());
      }
      if (sugs.bd_mb != '' && typeof (sugs.bd_mb) != 'undefined' && myreg.test(sugs.bd_mb)) {
        setcookie("bd_mb", sugs.bd_mb, date.toGMTString());
      }
    }

    if (sugs.from && webunion_stfrom.indexOf(sugs.from) != -1) {
      //广告联盟的 sugs.from 来源, 需要记录跳转信息
      //source 数据来源, channel 推广渠道, cid 活动id, wi 反馈标签
      var date = new Date();
      var expireDays = 1;
      date.setTime(date.setTime(date.getTime() + expireDays * 24 * 3600 * 1000));

      var myreg = /^[a-zA-Z0-9\_\=\^\-\|\%]+$/;//console.log(sugs);
      // wu  ==  web_union

      if (sugs.wu_source != '' && typeof (sugs.wu_source) != 'undefined' && myreg.test(sugs.wu_source)) {
        setcookie("web_union_source", sugs.wu_source, date.toGMTString());
      }

      if (sugs.wu_channel != '' && typeof (sugs.wu_channel) != 'undefined' && myreg.test(sugs.wu_channel)) {
        setcookie("web_union_channel", sugs.wu_channel, date.toGMTString());
      }

      if (sugs.wu_cid != '' && typeof (sugs.wu_cid) != 'undefined' && myreg.test(sugs.wu_cid)) {
        setcookie("web_union_cid", sugs.wu_cid, date.toGMTString());
      }

      if (sugs.wu_wi != '' && typeof (sugs.wu_wi) != 'undefined' && myreg.test(sugs.wu_wi)) {
        setcookie("web_union_wi", sugs.wu_wi, date.toGMTString());
      }

      if (sugs.union_uid != '' && typeof (sugs.union_uid) != 'undefined' && myreg.test(sugs.union_uid)) {
        setcookie("union_uid", sugs.union_uid, date.toGMTString());
      }

      if (sugs.union_planid != '' && typeof (sugs.union_planid) != 'undefined' && myreg.test(sugs.union_planid)) {
        setcookie("union_planid", sugs.union_planid, date.toGMTString());
      }
    }

  }


  var nextUrl = '';
  delete sugs['from'];
  for (i in sugs) {
    nextUrl += '&' + i + '=' + sugs[i];
  }
  if (nextUrl.length > 0) {
    nextUrl = '?' + nextUrl.substr(1);
  } else {
    nextUrl = origin;
  }

  if (addons != '') {
    nextUrl = nextUrl + addons;
  }

  function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }

  //解决微信端二次分享bug by longchan
  if (!isWeiXin) window.location.href = nextUrl;

} else {
  //获取上一个URL.
  var last_url = document.referrer;
  if (last_url != '') {
    var urlReg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
    var url = urlReg.exec(last_url);
    var domain = url[0];
    //获取请求url的请求子串.
    var keyval = last_url.substr(last_url.indexOf('?') + 1, last_url.length);

    //split将字符串根据指定字符串转换成数组.
    var arr = keyval.split('&');

    var miyauuid = getcookie('miyauuid');
    var sitefrom = getcookie('sitefrom');
    var siteforms = ['2c009307000452003fe3557fb8185917d', '2c009309000453003fe4557fbbe1d65f8', '2c009310000454003fe5557fbc3331bb2', '2c009311000455003fe6557fbc8340b5a', '2c009312000456003fe7557fbd2534d53', '2c009313000457003fe8557fbd9b32e30'];
    var domain_names = ['www.baidu.com', 'm.baidu.com', 'www.haosou.com', 'm.haosou.com', 'www.sogou.com', 'm.sogou.com', 'wap.sogou.com', 'cn.bing.com', 'm.bing.com', 'www.bing.com', 'www.google.com', 'm.sm.cn'];

    var dataInfo = [];

    for (var i = 0; i < arr.length; i++) {
      var splitInfo = arr[i].split("=");
      var key = splitInfo[0];
      var val = splitInfo[1]; k
      dataInfo[key] = val;
    }

    if (domain_names.indexOf(domain) != -1) {
      if (siteforms.indexOf(sitefrom) != -1 || sitefrom == '') {
        var searchWord = '';
        var cookieval = '';
        var never = new Date();
        never.setTime(never.getTime() + 3600 * 24 * 14 * 1000);
        switch (domain) {
          case 'www.baidu.com':
            cookieval = '2c009307000452003fe3557fb8185917d';
            searchWord = dataInfo['wd'];
            break;
          case 'm.baidu.com':
            cookieval = '2c009307000452003fe3557fb8185917d';
            searchWord = dataInfo['word'];
            break;
          case 'www.haosou.com':
            cookieval = '2c009309000453003fe4557fbbe1d65f8';
            searchWord = dataInfo['q'];
            break;
          case 'm.haosou.com':
            cookieval = '2c009309000453003fe4557fbbe1d65f8';
            searchWord = dataInfo['q'];
            break;
          case 'www.sogou.com':
            cookieval = '2c009310000454003fe5557fbc3331bb2';
            searchWord = dataInfo['query'];
            break;
          case 'm.sogou.com':
            cookieval = '2c009310000454003fe5557fbc3331bb2';
            searchWord = dataInfo['keyword'];
            break;
          case 'wap.sogou.com':
            cookieval = '2c009310000454003fe5557fbc3331bb2';
            searchWord = dataInfo['keyword'];
            break;
          case 'cn.bing.com':
            cookieval = '2c009311000455003fe6557fbc8340b5a';
            searchWord = dataInfo['q'];
            break;
          case 'www.google.com':
            cookieval = '2c009312000456003fe7557fbd2534d53';
            searchWord = dataInfo['q'];
            break;
          case 'sm.cn':
            cookieval = '2c009313000457003fe8557fbd9b32e30';
            searchWord = dataInfo['q'];
            break;
          default:
            break;
        }

        setcookie('sitefrom', cookieval, never.toGMTString());
      }

    }

  }

}

function setcookie(key, value, expire) {
  if (key == 'sitefrom') {
    if (value == 'timeline' || value == 'groupmessage' || value == 'singlemessage') {
      return false;
    };
  };
  var host = window.location.host;
  host = host.replace('https://', '');
  host = host.replace('www', '');
  if (!host) host = '.miyabaobei.com';
  if (host.indexOf('miyabaobei.com') != -1) {
    host = '.miyabaobei.com';
  } else if (host.indexOf('miyabaobei.hk') != -1) {
    host = '.miyabaobei.hk';
  } else if (host.indexOf('mia.com') != -1) {
    host = '.mia.com';
  } else {
    host = '.miabaobei.com';
  }
  document.cookie = key + "=" + value + ";path=/;domain=" + host + ";expires=" + expire + ";";
}

function getcookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) {
    return unescape(arr[2]);
  } else {
    return '';
  }
}

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}
var userstatus = 0;  //登录状态
var suserid = getQueryString("userid");
var ssessionid = getQueryString("sessionid");
if (suserid != null && ssessionid != null) {
  userstatus = 1;
  var date = new Date();
  date.setTime(date.getTime() + 15 * 24 * 3600 * 1000);
  setcookie("_userid", suserid, date.toGMTString());
  setcookie("_sessionid", ssessionid, date.toGMTString());
}
else {
  if (getcookie("_userid") != '' && getcookie("_sessionid")) {

    userstatus = 1;
    var date = new Date();
    suserid = getcookie("_userid");
    ssessionid = getcookie("_sessionid");
    date.setTime(date.getTime() + 15 * 24 * 3600 * 1000);
    setcookie("_userid", suserid, date.toGMTString());
    setcookie("_sessionid", ssessionid, date.toGMTString());
  }


}
var sdvc_id = getQueryString("dvc_id");
if (sdvc_id != null) {
  var date = new Date();
  date.setTime(date.getTime() + 15 * 24 * 3600 * 1000);
  setcookie("_dvc_id", sdvc_id, date.toGMTString());
}
else {
  if (getcookie("_dvc_id") != '') {

    var date = new Date();
    sdvc_id = getcookie("_dvc_id");
    date.setTime(date.getTime() + 15 * 24 * 3600 * 1000);
    setcookie("_dvc_id", sdvc_id, date.toGMTString());
  }


}
var mia_plus_sign = getQueryString("sign");
var new_mia_plus_sign = getQueryString("open_groupon_uid");
if (new_mia_plus_sign) {
  mia_plus_sign = new_mia_plus_sign;
}

var mia_cps_shopid = getQueryString("shopid");
if (mia_plus_sign != null) {
  var date = new Date();
  if (mia_cps_shopid != null && mia_cps_shopid) {
    date.setTime(date.getTime() + 3600 * 1000);
    setcookie("_sign", mia_plus_sign, date.toGMTString());
    setcookie("_shopid", mia_cps_shopid, date.toGMTString());
  } else {
    //修改cookie时间
    date.setTime(date.getTime() + 1 * 24 * 3600 * 1000);
    setcookie("_sign", mia_plus_sign, date.toGMTString());
    date.setTime(date.getTime() - 1);
    setcookie("_shopid", '', date.toGMTString());
  }
}
else {
  if (getcookie("_sign") != '') {
    //修改cookie时间
    var date = new Date();
    mia_plus_sign = getcookie("_sign");
    date.setTime(date.getTime() + 1 * 24 * 3600 * 1000);
    setcookie("_sign", mia_plus_sign, date.toGMTString());
  }


}
// $(document).ready(function(){
//每次打开这个页面时判断是否是老客
if (typeof (is_dutyfree) != 'undefined') {
  //如果是老客跳到首页
  // getuserinfo();
}

// })


//app 调用些方法
function miababay_syn_login(userid,uidsession) {
  //登录判断
  //alert('回调登录成功');
  //alert("userid:"+userid);
  //alert("uidsession:"+uidsession);
  suserid=userid;
  ssessionid=uidsession;

  userstatus = suserid > 0 ? 1 : 0;
  if(userstatus)
  {
    var date = new Date();
    date.setTime(date.getTime()+15*24*3600*1000);
    setcookie("_userid",suserid,date.toGMTString());
    setcookie("_sessionid",ssessionid,date.toGMTString());
    if(typeof (receive_page_flag) != 'undefined' ) {
      if(receive_page_flag) {
        window.location = '/febsale/main/index';
      }
    }
    if(typeof (succ_page_flag) != 'undefined' ) {
      if(succ_page_flag) {
        window.location.reload();
      }
    }
    //签到
    if(typeof (sign_w_midou) != 'undefined' ) {
      if(sign_w_midou) {
        window.location.reload();
      }
    }
    if(typeof (chat800_direct_page) != 'undefined' ) {
      if(chat800_direct_page) {
        window.location = chat800_direct_page;
      }
    }

    //新手专区
    if(typeof (is_dutyfree) != 'undefined'){
      //如果是老客跳到首页
      //  getuserinfo();
    }
    //我的拼团
    if(typeof (grouponHome) != 'undefined'){
      window.location.reload();
    }
    //十月大促活动
    if(typeof (october_activity) != 'undefined'){
      window.location.reload(); 
    }
    
    //老带新
    if(typeof (gift_event_flag) != 'undefined'){
      window.location.reload(); 
    }
    
    // 拼团签到
    if(typeof (groupon_sign) != 'undefined'){
      window.location.reload(); 
    }

    // 会员plus
    if(typeof (buy_plus_page_flag) != 'undefined'){
      window.location.reload();
    }
    // 我的导师
    if(typeof (getMyTeacher_page_flag) != 'undefined'){
      window.location.reload();
    }
    // 0元包年
    if (typeof (pack_years_page_flag) != 'undefined') {
      window.location.reload();
    }

    if (typeof (activity_question_flag) != 'undefined') {
      window.location.reload();
    }

    // 518 大促  
    if (typeof (activity_518redbag_flag) != 'undefined') {
      window.location.reload();
    }

    // 618 大促  
    if (typeof (activity_618redbag_flag) != 'undefined') {
      window.location.reload();
    }

    //新人专区
    if (typeof (new_born_zone) != 'undefined') {
      window.location.reload();
    }

    // 十月 大促  
    if (typeof (activity_1018redbag_flag) != 'undefined') {
      window.location.reload();
    }
    // 生活服务
    if (typeof (life_service_detail) != 'undefined') {
      window.location.reload();
    }
    // 生活服务
    if (typeof (life_service_spread) != 'undefined') {
      window.location.reload();
    }
    
    // 帮助中心
    if (typeof (help_reload_flag) != 'undefined') {
      window.location.reload();
    }
    // 免费领
    if (typeof (free_gets) != 'undefined') {
      window.location.reload();
    }
    //口红机v1.0
    if(typeof (kouhongji_sign) != 'undefined'){
      window.location.reload();
    }
    //口红机v2.0
    if(typeof (window.kouhongji2_sign) != 'undefined'){
      window.location.reload();
    }
    //口红机v2.0 任务页面
    if(typeof (window.khj_tasklist) != 'undefined'){
      window.location.reload();
    }
  } else {
    var date = new Date();
    date.setTime(date.getTime()-1);
    setcookie("_userid",suserid,date.toGMTString());
    setcookie("_sessionid",ssessionid,date.toGMTString());
    setcookie("_sessionid",ssessionid,date.toGMTString());
  }
  _is_app = true;
}
//获取用户身份(新手老手)
// async function getuserinfo(){
//     const res = await https.get('/instant/item/islogin');
//     //老客
//     if(res.isnewer != 1 && res.isnewer != -1){
//         //跳到首页
//         window.location.href='miyabaobei://home?focus=0';
//     }
// }
if (typeof (_sign_direct_url) != 'undefined') {
  if (_sign_direct_url) {
    window.location.href = _sign_direct_url;
  }
}

// $(function () {
//     function isWeiXin() {
//         var ua = window.navigator.userAgent.toLowerCase();
//         if (ua.match(/MicroMessenger/i) == 'micromessenger') {
//             return true;
//         } else {
//             return false;
//         }
//     }

//     if (!isWeiXin()) {
//         $('header .h_home').css('display', 'block')
//     } else {
//         $('header .h_home').css('display', 'none')
//     }
// })


var xcxuserid = getQueryString("user_id");
var xcxsessionid = getQueryString("auth_session");
if (xcxuserid != null && xcxsessionid != null) {
  var date = new Date();
  date.setTime(date.getTime() + 15 * 24 * 3600 * 1000);
  setcookie("_xcxuserid", xcxuserid, date.toGMTString());
  setcookie("_xcxsessionid", xcxsessionid, date.toGMTString());

}
else {
  if (getcookie("_xcxuserid") != '' && getcookie("_xcxsessionid")) {

    var date = new Date();
    suserid = getcookie("_xcxuserid");
    ssessionid = getcookie("_xcxsessionid");
    date.setTime(date.getTime() + 15 * 24 * 3600 * 1000);
    setcookie("_xcxuserid", suserid, date.toGMTString());
    setcookie("_xcxsessionid", ssessionid, date.toGMTString());
  }


}

window.onload = function() {
  
  var html = document.getElementsByTagName('html')[0];
  var realFs = parseFloat(window.getComputedStyle(html).fontSize);
  var cur = parseInt(realFs * 10 - window.innerWidth);
  console.log(cur, realFs * 10 - window.innerWidth, 'header');
  if (cur >= 15) {
    var html = document.getElementsByTagName('html')[0];
    var docEl = document.documentElement,
    recalc = function () {
      var clientWidth = docEl.clientWidth - cur;
      if (!clientWidth) return;
      html.setAttribute('style', 'font-size:' + clientWidth / 10 + 'px!important');
    };
    recalc();
  }
}