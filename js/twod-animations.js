// import * as createjs from "createjs-module";
var createjs = require("createjs-module");
module.exports = function() {
  // createjs.Ticker.setFPS(60);

  const titDom = document.querySelector(".cover-bac .tit");
  const xinhao = document.querySelector(".cover-bac .xinhao");
  const bac = document.querySelector(".cover-bac");
  const chuansuo = document.querySelector(".chuansuo");
  const startBtnDom = document.querySelector(".start-animate");
  const fasheDom = document.querySelector(".xinhao-fashe");
  const part3 = document.querySelector(".part3");
  const titWrapDom = document.querySelector(".tit-wrap");
  const audio3Dom = document.querySelector(".audio3");
  const audio4Dom = document.querySelector(".audio4");
  const audio5Dom = document.querySelector(".audio5");

  const dialogDom = document.querySelector(".dialog-wrap");
  

  setTimeout(function(){
    continueAnimate();
  }, 500);

  function continueAnimate() {
    // title fast 升起来
    createjs.Tween.get({
        opacity: 0,
        y: 2.5
      }, {
        loop: false,
        onChange: renderTit
      })
      .wait(500)
      .to({
        opacity: 1,
        y: 1.8
      }, 400, createjs.Ease.Linear)
    
    function renderTit(event) {
      var data = event.currentTarget.target;
      titDom.style.opacity = data.opacity + "";
      // xinhao.style.opacity = data.opacity + "";
      titDom.style["transform"] = "translateY(" + data.y + "rem)";
      titDom.style["-webkit-transform"] = "translateY(" + data.y + "rem)";
    }
  }


  function execAnimation(curSelector) {
    xinhao.classList.remove("displaynone");

    var curNode = document.querySelector(curSelector);
    curNode.classList.remove("displaynone");
    curNode.classList.add("animate");

    if(curSelector == ".info3"){
      xinhao.classList.add("displaynone");
      part3.classList.remove("displaynone");
      if(musicClasslist.contains("on")){
        setTimeout(function(){
          audio5Dom.play();
        }, 500);
      }
      musicDom.setAttribute("curplay","audio5");
    }

  };

  const coverDom = document.querySelector(".chuansuo");
  const daeDom = document.querySelector(".threed-wrap");

  const musicDom = document.querySelector(".music");
  const musicClasslist = musicDom.classList;
  // const audio1Dom = document.querySelector(".audio1");
  // const audio2Dom = document.querySelector(".audio2");

  document.querySelector(".animate-control").addEventListener("touchstart", function(){
    // startBtnDom.classList.add("displaynone");
    
    animateFunc();
    
  });

  function animateFunc(){
    var curNode = document.querySelector(".animate-control");
    var curAnimate = curNode.getAttribute("cur-animate");
    var st;

    switch(curAnimate){
      case "info0":
      // 点击封面
        document.querySelector(".circle-wrap").classList.add("displaynone");
        document.querySelector(".circle-replace").classList.remove("displaynone");

        titWrapDom.classList.add("displaynone");
        execAnimation(".info1");
        curNode.setAttribute("cur-animate", "info1");
        // st = setTimeout(function(){
        //   animateFunc();
        // }, 6000);
        break;
      case "info1":
        document.querySelector(".info1").classList.add("displaynone");
        execAnimation(".info2");
        curNode.setAttribute("cur-animate", "info2");
        // st = setTimeout(function(){
        //   animateFunc();
        // }, 6000);
        break;
      case "info2":
        document.querySelector(".info2").classList.add("displaynone");
        document.querySelector(".circle-replace").classList.add("displaynone");
        
        execAnimation(".info3");
        curNode.setAttribute("cur-animate", "info3");
        curNode.classList.add("displaynone");
        
        // st = setTimeout(function(){
        //   animateFunc();
        // }, 6000);
        break;
      case "info3":
        break;
    }
  };

  // setTimeout(function(){
  //   animateFunc();
  // }, 6000);

}();



