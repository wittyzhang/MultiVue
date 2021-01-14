// import { WXInit } from '@/api/_common'
import Request from '@/utils/https';
import { Base64 } from 'js-base64';
var Wx = {
  init (href, isHideMenu = false) {
    async function initFn () {
      const wxsq = await Request.post('https://m.miabaobei.com/wx/index/get_js_config', { url: href });
      if (wxsq.code === 0) {
        // 调用微信分享
        var sd = wxsq.data;
        window.wx.config({
          debug: false,// debug: !/^www\.sayabc\.com$/i.test(location.hostname), // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: sd.appId, // 必填，公众号的唯一标识
          timestamp: sd.timestamp, // 必填，生成签名的时间戳
          nonceStr: sd.nonceStr, // 必填，生成签名的随机串
          signature: sd.signature, // 必填，签名，见附录1
          jsApiList: isHideMenu ? ['hideMenuItems'] : [
            // 所有要调用的 API 都要加到这个列表中
            // 'hideMenuItems',
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
          ],
        });
      }
    }
    if (typeof window.WeixinJSBridge === 'undefined') {
      document.addEventListener('WeixinJSBridgeReady', function () {
        initFn()
      }, false)
    } else {
      initFn()
    }
  },
  share: function (opt, isHideMenu = false) {
    opt = opt || {}
    var shareConfig = {
      title: opt.title,
      desc: opt.desc,
      imgUrl:opt.imgUrl,
      link: opt.link || location.href,
      shareSuccess: opt.shareSuccess || function () {}
    }
    if (isHideMenu){
      window.wx.ready(() => {
        window.wx.hideMenuItems({
          menuList: [
            'menuItem:share:appMessage',
            'menuItem:share:timeline',
            'menuItem:share:qq',
            'menuItem:share:weiboApp',
            'menuItem:share:facebook',
            'menuItem:share:QZone',
          ], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
      });
    } else {
      wx.ready(function () {
        // 分享给朋友
        wx.onMenuShareAppMessage({
          title: shareConfig.title, // 分享标题
          desc: shareConfig.desc, // 分享描述
          link: shareConfig.link.replace(/(info_id=\d+&)|(info_id=\d+)/, ''), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: shareConfig.imgUrl, // 分享图标
          success: shareConfig.shareSuccess // 分享朋友成功之后的回调函数
        })
        // 分享朋友圈
        wx.onMenuShareTimeline({
          title: shareConfig.title, // 分享标题
          link: shareConfig.link.replace(/(info_id=\d+&)|(info_id=\d+)/, ''), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: shareConfig.imgUrl, // 分享图标
          // success: function() {
          //     // 用户确认分享后执行的回调函数
          // }
          success: shareConfig.shareSuccess // 分享朋友圈成功之后的回调函数
        })
      })
    }
    
  },
  async wxLogin (href){ // 微信自动登陆
    // 获取微信信息，如果之前没有使用微信登陆过，将进行授权登录
    let res = await Request.post('/wx/index/is_login');
    if (res.code != 0){
      window.location.href = 'https://m.miabaobei.com/wx/index/index?redirect=' + Base64.encode(href)
    }
  },
}

// module.exports = Wx;
export default Wx;
