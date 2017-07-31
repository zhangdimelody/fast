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
  

  setTimeout(function(){
    // document.querySelector(".info-wrap").classList.remove("displaynone");
    continueAnimate();
    // execAnimation(".info1").then(function() {
    //   execAnimation(".info2").then(function() {
    //     // continueAnimate();
    //   })
    // })
  }, 500);
  // continueAnimate();

  function continueAnimate() {
    // let curInfoDom = document.querySelector(".info-wrap");
    // createjs.Tween.get({
    //     opacity: 1
    //   }, {
    //     loop: false,
    //     onChange: renderInfoWrap
    //   })
    //   .to({
    //     opacity: 0,
    //     display: 'none'
    //   }, 500, createjs.Ease.Linear)

    // function renderInfoWrap(event) {
    //   var data = event.currentTarget.target;
    //   curInfoDom.style.opacity = data.opacity + "";
    //   curInfoDom.style.display = data.display + "";
    // }

    
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
      // .wait(1400)
      // .to({
      //   opacity: 0
      // }, 400, createjs.Ease.Linear)
      // .call(function(){
        // execAnimation(".info1").then(function() {
        //   execAnimation(".info2").then(function() {
        //     // continueAnimate();
        //   })
        // });
      // });

    function renderTit(event) {
      var data = event.currentTarget.target;
      titDom.style.opacity = data.opacity + "";
      // xinhao.style.opacity = data.opacity + "";
      titDom.style["transform"] = "translateY(" + data.y + "rem)";
      titDom.style["-webkit-transform"] = "translateY(" + data.y + "rem)";
    }

  }

  function showStart() {
    createjs.Tween.get({
        opacity: 0
      }, {
        loop: false,
        onChange: renderInfoWrap
      })
      .to({
        opacity: 1
      }, 500, createjs.Ease.Linear)
      .call(function() {
        // execAnimation(".info3")
        

      })

    function renderInfoWrap(event) {
      var data = event.currentTarget.target;
      part3.style.opacity = data.opacity + "";
      part3.style.display = data.display + "";
    }
  }

  function execAnimation(curSelector) {
    xinhao.classList.remove("displaynone");
    return new Promise(function(resolve, reject) {
      var bacSize = 100;
      var musicStop = 6000;
      switch (curSelector) {
        case ".info2":
          bacSize = 70;
          musicStop = 3000;
          break;
        case ".info3":
          bacSize = 70;
          musicStop = 1000;
          break;
      }
      var infoWrapDom = document.querySelector(".info-wrap");
      createjs.Tween.get({
          scale: 0,
          bacSize: 0,
          opacity: 0.4
        }, {
          loop: false,
          onChange: infoWrapAnimate
        })
        .to({
          scale: 1,
          bacSize: bacSize,
          opacity: 1
        }, 300, createjs.Ease.Linear);

      function infoWrapAnimate(event) {
        var data = event.currentTarget.target;
        infoWrapDom.style.transform = "scale(" + data.scale + ")";
        infoWrapDom.style.opacity = data.opacity;
        infoWrapDom.style.display = "inline-block";
        infoWrapDom.style["background-size"] = "100% " + bacSize + "%";

        if(musicClasslist.contains("on")){
          audio3Dom.play();
          setTimeout(function(){
            audio3Dom.pause();
          }, musicStop)
        }

      }
      var curInfoDom = document.querySelector(curSelector);

      if (curSelector == ".info3") {
        xinhao.classList.add("displaynone");
        part3.classList.remove("displaynone");
        // showStart();
        createjs.Tween.get({
            opacity: 0,
            display: 'inline-block'
          }, {
            loop: false,
            onChange: render
          })
          .to({
            opacity: 1
          }, 300, createjs.Ease.Linear)
          .wait(5000)
          .call(function(){
            // xinhao.style.opacity = "0";
            // showStart();
              
          });
        
      } else {
          createjs.Tween.get({
            opacity: 0,
            display: 'inline-block'
          }, {
            loop: false,
            onChange: render
          })
          .to({
            opacity: 1
          }, 300, createjs.Ease.Linear)
          .wait(6000)
          .to({
            opacity: 0
          }, 300, createjs.Ease.Linear)
          .to({
            display: 'none'
          })
          .call(handlecomplete)
      }

      function render(event) {
        var data = event.currentTarget.target;
        curInfoDom.style.opacity = data.opacity + "";
        curInfoDom.style.display = data.display + "";
        
      }

      function handlecomplete() {
        if(curSelector==".info1"){
          execAnimation(".info2")
        }
        if(curSelector==".info2"){
          execAnimation(".info3")
        }
      }

    })
  };

  const coverDom = document.querySelector(".chuansuo");
  const daeDom = document.querySelector(".threed-wrap");

  const musicDom = document.querySelector(".music");
  const musicClasslist = musicDom.classList;
  // const audio1Dom = document.querySelector(".audio1");
  // const audio2Dom = document.querySelector(".audio2");

  document.querySelector(".start-animate").addEventListener("touchstart", function(){
    startBtnDom.classList.add("displaynone");
    titWrapDom.classList.add("displaynone");
    
    // createjs.Tween.get({
    //     opacity: 1
    //   }, {
    //     loop: false,
    //     onChange: hideTitle
    //   })
    // .to({
    //     opacity: 0
    //   }, 400, createjs.Ease.Linear)
    // function hideTitle(event) {
    //   var data = event.currentTarget.target;
    //   titDom.style.opacity = data.opacity + "";
    //   titDom.style["transform"] = "translateY(" + 1.8 + "rem)";
    //   titDom.style["-webkit-transform"] = "translateY(" + 1.8 + "rem)";
    // }



    execAnimation(".info1")
    // .then(function() {
      // execAnimation(".info2").then(function() {
        

      // })
    // });

  })



  // document.querySelector(".start-chuansuo").addEventListener("click", function(e){
  //   audio3Dom.pause();
  //   audio4Dom.play();

  //   bac.classList.add("move");
  //   chuansuo.classList.add("move");
  //   // continueAnimate();
  //   setTimeout(function(){
  //     audio4Dom.pause();

  //     daeDom.classList.remove("displaynone");
  //     coverDom.classList.add("displaynone");
  //     musicDom.classList.remove("cur-audio1");
  //     musicDom.classList.add("cur-audio2");

  //     setTimeout(function(){
  //       document.querySelector(".find-xinhaoshowtip").classList.add("hide");
  //     }, 4000);
  //   }, 3380);

  // });

}();



