
!(function(w){
  w.getXNObj = function(){
    // 性能
    // 重定向耗时：redirectEnd - redirectStart
    // DNS查询耗时 ：domainLookupEnd - domainLookupStart
    // TCP链接耗时 ：connectEnd - connectStart
    // HTTP请求耗时 ：responseEnd - responseStart
    // 解析dom树耗时 ： domComplete - domInteractive
    // 白屏时间 ：responseStart - navigationStart
    // DOMready时间 ：domContentLoadedEventEnd - navigationStart
    // onload时间：loadEventEnd - navigationStart，也即是onload回调函数执行的时间
    // 格式化日期，如月、日、时、分、秒保证为2位数
    var _obj={};
    var performance = w.performance || 
      w.msPerformance || 
      w.webkitPerformance;
    if (performance) {
      var _timing = performance.timing;
      // console.log(_timing)
      // var _timeOrigin = performance.timeOrigin || performance.now()
        _obj = {
          white_screen: (_timing.responseStart - _timing.navigationStart), // 白屏时间
          redirect: (_timing.redirectEnd - _timing.redirectStart), // 重定向耗时
          domain_lookup: (_timing.domainLookupEnd - _timing.domainLookupStart), //DNS查询耗时
          tcp_connect: (_timing.connectEnd - _timing.connectStart), // TCP链接耗时
          http_request: (_timing.responseEnd - _timing.responseStart), // HTTP请求耗时/内容加载耗时
          parse_dom: (_timing.domComplete - _timing.domInteractive), // 解析dom树耗时
          dom_ready: (_timing.domContentLoadedEventEnd - _timing.navigationStart), //DOM准备时间
          onload: (_timing.loadEventEnd - _timing.navigationStart), // onload时间
          current_page_host: w.location.hostname, // 当前页面的域名
          current_page_uri: w.location.pathname, // 当前页面的uri
          current_page_query_string: w.location.search.substring(1), // 当前页面的GET参数
        }
    }
    return _obj;
  }
  
  function jsonp(options){
    options = options || {};
    if( !options.url || !options.callback ) {
        throw new Error( "参数不合法" );
    }

    //创建 script 标签并加入到页面中
    let callbackName = ( "jsonp_" + Math.random() ).replace( ".", "" );
    let oHead = document.getElementsByTagName("head")[0];
    options.data[options.callback] = callbackName;
    let params = formatParams( options.data );
    let oS = document.createElement( "script" );
    oHead.appendChild( oS );

    //创建jsonp回调函数
    w[callbackName] = function( res ) {
        oHead.removeChild( oS );
        clearTimeout( oS.timer );
        w[callbackName] = null;
        options.success && options.success( res );
    };

    //发送请求
    oS.src = options.url + "?" + params;

    //超时处理
    if( options.time ) {
        oS.timer = setTimeout(function() {
            w[callbackName] = null;
            oHead.removeChild( oS );
            options.fail && options.fail({ message: "超时" });
        }, options.time );
    }
  }
  //格式化参数
  function formatParams( data ) {
    let arr = [];
    for( let name in data ) {
        arr.push( encodeURIComponent(name) + "=" + encodeURIComponent(data[name]) );
    }
    arr.push( ("t=" + Math.random()).replace( ".", "" ) );
    return arr.join( "&" );
  }


  var js_error = null; // 收集的错误数据

  w.addEventListener('error', function (event) {
    // console.log(event)
      if (event) {
          var target = event.target || event.srcElement;
          var isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement;
          var ignoError = false;
          if (!isElementTarget){ // js error
            if(event.message && (event.message.indexOf("getMiaWebViewNavigationBarInfo") != -1 || event.message.indexOf("canDragBack") != -1 || event.message.indexOf("isNeedPriceDrawing") != -1 || event.message.indexOf("getMiaShareInfo") != -1 || event.message.indexOf("getZXWebViewRightButtonInfo") != -1 )){
              ignoError = true;
            }
            if (!ignoError){
              js_error = {
                category: 'js',
                level: 'error',
                userAgent: event.target.navigator.userAgent,
                url: event.target.location.href,
                filename: event.filename,
                message: event.message,
                rowNum: event.lineno,
                colNum: event.colno,
                current_page_host: event.target.location.hostname, // 当前页面的域名
                current_page_uri: event.target.location.pathname, // 当前页面的uri
                current_page_query_string: event.target.location.search.substring(1), // 当前页面的GET参数
              }
            }
            
          } 
      }
  }, true);

  w.addEventListener("load", function(){
    if(Math.ceil(Math.random()*10)>3){
      //占比=7
      console.log('7');
    }else{
      //占比=3
      console.log(3);
      setTimeout(function(){
        _monitor();
      },1000)
    }
  })

  function _monitor(){
    var performance_url = "https://apm.miabaobei.com/performance";
    var error_url = "https://apm.miabaobei.com/js_error";
    var xnobj = w.getXNObj();
    // console.log(xnobj)
    // console.log(js_error);
    try {
      jsonp({
        url: performance_url,
        data: xnobj,
        callback:'performance',      
        success: function (obj) {
            // 此处放成功后执行的代码
        },
        fail: function (status) {
            // 此处放失败后执行的代码
        }
      });
      if (!!js_error) {
        jsonp({
          url: error_url,
          data: js_error,
          callback:'js_error',      
          success: function (obj) {
              // 此处放成功后执行的代码
          },
          fail: function (status) {
              // 此处放失败后执行的代码
          }
        });
      }
    } catch (e) {
      var img = document.createElement('img');
      const params_performance = [];
      Object.keys(xnobj).forEach(function(key){
        params_performance.push(`${key}=${encodeURIComponent(xnobj[key])}`);
      });
      img.onload = function() {img_error = null};
      img.src = `${performance_url}?${params_performance.join('&')}`;

      if (!!js_error) {
        var img_error = document.createElement('img');
        const params_error = [];
        Object.keys(js_error).forEach(function(key){
          params_error.push(`${key}=${encodeURIComponent(js_error[key])}`);
        });
        img_error.onload = function() {img_error = null};
        img_error.src = `${error_url}?${params_error.join('&')}`;
      }
    }
  }
})(window)