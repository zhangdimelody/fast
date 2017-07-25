// import * as createjs from "createjs-module";
var createjs = require("createjs-module");
module.exports = function() {
  // createjs.Ticker.setFPS(60);
  // setTimeout(function(){
  //   // execAnimation(".info1").then(function() {
  //   //   execAnimation(".info2").then(function() {
  //   //     continueAnimate();
  //   //   })
  //   // })
  //   execAnimation(".info1")
  // }, 3500);
  continueAnimate();

  function continueAnimate() {
    let curInfoDom = document.querySelector(".info-wrap");
    createjs.Tween.get({
        opacity: 1
      }, {
        loop: false,
        onChange: renderInfoWrap
      })
      .to({
        opacity: 0,
        display: 'none'
      }, 500, createjs.Ease.Linear)

    function renderInfoWrap(event) {
      var data = event.currentTarget.target;
      curInfoDom.style.opacity = data.opacity + "";
      curInfoDom.style.display = data.display + "";
    }

    let titDom = document.querySelector(".cover-bac .tit");
    let xinhao = document.querySelector(".cover-bac .xinhao");
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
      .wait(1400)
      .to({
        opacity: 0
      }, 400, createjs.Ease.Linear)
      .call(showStart);

    function renderTit(event) {
      var data = event.currentTarget.target;
      titDom.style.opacity = data.opacity + "";
      xinhao.style.opacity = data.opacity + "";
      titDom.style["transform"] = "translateY(" + data.y + "rem)";
      titDom.style["-webkit-transform"] = "translateY(" + data.y + "rem)";
    }
  }

  function showStart() {
    let part3 = document.querySelector(".part3");
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
        execAnimation(".info3")
      })

    function renderInfoWrap(event) {
      var data = event.currentTarget.target;
      part3.style.opacity = data.opacity + "";
      part3.style.display = data.display + "";
    }
  }

  function execAnimation(curSelector) {
    return new Promise(function(resolve, reject) {
      var bacSize = 100;
      switch (curSelector) {
        case ".info2":
          bacSize = 70;
          break;
        case ".info3":
          bacSize = 70;
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
        }, 400, createjs.Ease.Linear)

      function infoWrapAnimate(event) {
        var data = event.currentTarget.target;
        infoWrapDom.style.transform = "scale(" + data.scale + ")";
        infoWrapDom.style.opacity = data.opacity;
        infoWrapDom.style.display = "inline-block";
        infoWrapDom.style["background-size"] = "100% " + bacSize + "%";
      }
      var curInfoDom = document.querySelector(curSelector);

      if (curSelector == ".info3") {
        createjs.Tween.get({
            opacity: 0,
            display: 'inline-block'
          }, {
            loop: false,
            onChange: render
          })
          .to({
            opacity: 1
          }, 300, createjs.Ease.Linear);
        curInfoDom.style["margin"] = "0 2.22rem";
        curInfoDom.style["line-height"] = "0";
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
          .wait(3000)
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
        }else if(curSelector==".info2"){
          continueAnimate();
        }
      }

    })
  };

  const coverDom = document.querySelector(".chuansuo");
  const daeDom = document.querySelector(".threed-wrap");

  document.querySelector(".start-btn").addEventListener("touchstart", function(){
    const chuansuo = document.querySelector(".chuansuo")
    chuansuo.classList.add("move");
    const bac = document.querySelector(".cover-bac")
    bac.classList.add("move");


    setTimeout(function(){
      daeDom.classList.remove("displaynone");
      coverDom.classList.add("displaynone");
    }, 4300);

  })
}();