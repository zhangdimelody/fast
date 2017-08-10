/*http://qzonestyle.gtimg.cn/qzone/qzact/common/share/share.js*/
(function(){function g(a,b){var c=document,d=c.head||c.getElementsByTagName("head")[0]||c.documentElement,c=c.createElement("script");c.onload=b;c.onerror=function(){};c.async=!0;c.src=a[0];d.appendChild(c)}function h(a){a.WXconfig&&e([k],function(b){b.config||(b=window.wx);var c=a.WXconfig;b.config({debug:!1,appId:c.appId,timestamp:c.timestamp,nonceStr:c.nonceStr,signature:c.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareQZone"]});b.error(function(a){});
b.ready(function(){var d={title:a.title,desc:a.summary,link:a.url,imgUrl:a.pic,type:"",dataUrl:"",success:function(){},cancel:function(){}};b.onMenuShareAppMessage(d);b.onMenuShareQQ(d);b.onMenuShareQZone(d);if(c.swapTitleInWX)b.onMenuShareTimeline({title:a.summary,desc:a.title,link:a.url,imgUrl:a.pic,type:"",dataUrl:"",success:function(){},cancel:function(){}});else b.onMenuShareTimeline(d)})})}function l(a){var b={title:a.title,desc:a.summary,share_url:a.url,image_url:a.pic};e([m],function(){try{window.mqq.data.setShareInfo(b)}catch(a){}})}
function n(a){e([p],function(){if(QZAppExternal&&QZAppExternal.setShare){for(var b=[],c=[],d=[],e=[],f=0;5>f;f++)b.push(a.pic),c.push(a.title),d.push(a.summary),e.push(a.url);QZAppExternal.setShare(function(a){},{type:"share",image:b,title:c,summary:d,shareURL:e})}})}function f(a){var b=navigator.userAgent,c=b.match(/MicroMessenger\/([\d\.]+)/),d=b.match(/QQ\/([\d\.]+)/),b=-1!==b.indexOf("Qzone/");c&&h(a);d&&l(a);b&&n(a)}var k="http://img5.cache.netease.com/utf8/3g/share/jweixin-1.0.0.js",m="http://img5.cache.netease.com/utf8/3g/share/qqapi.js",
p="http://img5.cache.netease.com/utf8/3g/share/qzonejsbridge.js",e;"function"===typeof define&&(define.cmd||define.amd)?(define.cmd?e=seajs.use:define.amd&&(e=window.require),define(function(){return f})):(e=g,window.setShareInfo=f)})();

//(
module.exports = function() {
    // console.log("dd3share")

    var shareUrl;



    var data = {
      "title": "FAST：寻找ET",
      "body": "我（输入名字、读取微信名字）用FAST找到了一只超级ET！",
      "imgurl": "http://img1.cache.netease.com/utf8/3g/fast/fast-share1.jpg"
    };
      data.body = data.body.replace(/<.*?>/g, "").replace(/(^\s*)/g, "").substr(0, 30) || data.title;
    
    // window.setShareData = function(title, body, imgurl) {
    //   window.setShareData = null;
    //   data.title = title;
    //   body = body || title;
    //   data.body = body.replace(/<.*?>/g, "").replace(/(^\s*)/g, "").substr(0, 30) || data.title;
    //   data.imgurl = imgurl;
    // };
    
      // var data = {
      //   "title": "网易VR故事|“不要惊慌，没有辐射！”",
      //   "body": "VR还原切尔诺贝利核事故瞬间。",
      //   "imgurl": "http://img1.cache.netease.com/utf8/3g/fast/fast-share.jpg"
      // };
      // var imgurl, shareUrl;
      shareUrl =  NTESAntAnalysis.getShareLink();
      // console.log(shareUrl);

      document.addEventListener('WeixinJSBridgeReady', function() {
            document.querySelector(".audio1").play();
            document.querySelector(".audio1").pause();

            document.querySelector(".audio2").play();
            document.querySelector(".audio2").pause();

            document.querySelector(".audio3").play();
            // document.querySelector(".audio3").pause();
            
            document.querySelector(".audio4").play();
            document.querySelector(".audio4").pause();

            document.querySelector(".audio5").play();
            document.querySelector(".audio5").pause();

            document.querySelector(".audio6").play();
            document.querySelector(".audio6").pause();
        // });

        window.WeixinJSBridge.on('menu:share:appmessage', function(argv) {
          var bodyText;
          if(!window.shareInfoObj || !window.shareInfoObj.counts || !window.shareInfoObj.name){
            data.title = `不要回复！不要回复！不要回复!`
            bodyText = `这里有一封来自外星人的短消息`
          }else{
            data.title = `我用${window.shareInfoObj.counts}次，就在${window.shareInfoObj.name}找到了一只超级ET！`
            // `我用${window.shareInfoObj.counts}次邂逅了一只超级ET，快来看看你要找几次？`
            bodyText = `你也来试试吧！`
            // `看，他在${window.shareInfoObj.name}上！` 
          }
          return window.WeixinJSBridge.invoke('sendAppMessage', {
            "img_url": data.imgurl || imgurl,
            "link": shareUrl,
            "desc": bodyText,
            "title": data.title
          }, function() {
            
            if(res.err_msg != "send_app_msg:confirm") return; 

            NTESAntAnalysis.sendData({
              projectid: "NTM-Z6VEYMWN-1",  // 项目id 必填项 在传播信息统计平台上生成
              val_nm: "share",       // 当前行为时间大类名称 【click/share/download/open/pageview etc】
              val_act: "share:appmessage",      // 子类用户行为名称 【open_smartBar】
              info: {                   //  扩展字段
                modelid: "fast"
              }          //  对应modelid 的项目名称 一般推荐用 document.title
            });

          });
        });
        return window.WeixinJSBridge.on('menu:share:timeline', function(argv) {
          var bodyText;
          if(!window.shareInfoObj || !window.shareInfoObj.counts || !window.shareInfoObj.name){
            data.title = `不要回复！不要回复！不要回复!`
            bodyText = `这里有一封来自外星人的短消息`
          }else{
            data.title = `我用${window.shareInfoObj.counts}次，就在${window.shareInfoObj.name}找到了一只超级ET！`
            // `我用${window.shareInfoObj.counts}次邂逅了一只超级ET，快来看看你要找几次？`
            bodyText = `你也来试试吧！`
            // `看，他在${window.shareInfoObj.name}上！` 
          }
          return window.WeixinJSBridge.invoke('shareTimeline', {
            "img_url": data.imgurl || imgurl,
            "img_width": "200",
            "img_height": "200",
            "link": shareUrl,
            "desc": bodyText,
            "title": data.title
          }, function() {

            if(res.err_msg != "share_timeline:ok") return;

            NTESAntAnalysis.sendData({
              projectid: "NTM-Z6VEYMWN-1",  // 项目id 必填项 在传播信息统计平台上生成
              val_nm: "share",       // 当前行为时间大类名称 【click/share/download/open/pageview etc】
              val_act: "share:timeline",      // 子类用户行为名称 【open_smartBar】
              info: {                   //  扩展字段
                modelid: "fast"
              }          //  对应modelid 的项目名称 一般推荐用 document.title
            });

          });
        });

      });
      
  }()
  //)();