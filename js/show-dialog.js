import {mapping, nameArray} from './data.js'



const dialogPopWrap = document.querySelector(".dialog-pop-wrap");
const othersDom = document.querySelector(".dialog-pop-wrap .others")


function dialogCreateHtml(name){
  // getRandomInt(0,11)
  let dialog = mapping[name].dialog;
  let dialoghtml = "";
  for(let i in dialog){

    if(!(i%2)){
      //0 如果是偶数
      var nobac = "";
      var imgAlone = dialog[i].match(/^<.*>$/g);
      if(imgAlone){
        nobac = "nobac"
      }
      let animateOrNot = "";
      if(i==0){ 
        animateOrNot = "animation";
      }
      dialoghtml += `<li class="wxr ${animateOrNot}" order="${i}" >
        <span class="head"></span>
        <span class="kuang ${nobac}">${dialog[i]}</span>
      </li>`;
    
    }else{
      // 如果是奇数
      dialoghtml += `<li class="fast" order="${i}" >
          <span class="kuang " realtext="${dialog[i]}"><i>点击继续</i></span>
          <span class="head"></span>
      </li>`
    }
  }
  // console.log(dialoghtml);
  document.querySelector(".speak-wrap").innerHTML = dialoghtml;
  dialogPopWrap.classList.add(mapping[name].classname);

  // title 图片
  let clist = document.querySelector(".dialog-pop-wrap .img").classList;
  for (var i = 0; i < clist.length; i++) {
    if (clist[i] != "img") {
      clist.remove(clist[i]);
    }
  }
  clist.add(mapping[name].pic);
  
}



var wrapHtml = document.querySelector("html").getAttribute("style");
var baseREM = wrapHtml.split(":")
var rem = parseFloat(baseREM[1])



function dialogShowAnimate() {
  // create html


  var liLength = document.querySelectorAll(".speak-wrap li").length;
  var scrollWrapDom = document.querySelector(".speak-wrap");

  dialogPopWrap.classList.remove("hide");

  // console.log(liLength);


  startAnimation();
  // animation start
  function startAnimation() {
    talkShow(1);

    function talkShow(order) {
      setTimeout(function() {
        document.querySelector('[order="' + order + '"]').classList.add("animation");
      }, 1000);
    };

    scrollWrapDom.addEventListener("touchstart", function() {
      event.stopPropagation();
      event.preventDefault();
      var curNode = event.target;
      var parentNode;
      if (curNode.tagName != "I" && !curNode.hasAttribute("realtext")) return;
      
      if (curNode.hasAttribute("realtext")){ 
        // cick span
        parentNode = curNode; // parentNode = <span>
      }else{
        // click I
        parentNode = curNode.parentElement;
      }
      var curOrder = parentNode.parentElement.getAttribute("order");
      var nextOrder = parseInt(curOrder) + 1;
      var thirdOrder = nextOrder + 1;
      
      // 填充文字
      var imgAlone = parentNode.getAttribute("realtext").match(/^<.*>$/g);
      if(imgAlone){
        parentNode.classList.add("nobac");
      }
      parentNode.innerHTML = parentNode.getAttribute("realtext");
      // 最后一个 要显示分享页
      ifLastShow(curOrder);
      // 判断有无“点击继续”的下一个
      if (nextOrder < liLength) {
        setTimeout(function() {
          document.querySelector('[order="' + nextOrder + '"]').classList.add("animation");
          // 最后一个 要显示分享页
          ifLastShow(nextOrder);
          // 超过3个滚动外边框
          if (nextOrder > 2) {
            scrollToEdge(nextOrder);
          }
          // 判断有无“点击继续”的下一个 的下一个“点击继续”
          ifHasNext(thirdOrder);
        }, 1000);
      }

      function ifLastShow(order){
        var lastClick = document.querySelector('[order="'+order+'"]').innerHTML.indexOf("点击继续")
        if(order == liLength-1 && lastClick == -1){
          setTimeout(function(){
            showShareView();
          }, 3000)
        }
      }
      function ifHasNext(order){
        if (order < liLength) {
          setTimeout(function() {
            document.querySelector('[order="' + order + '"]').classList.add("animation");
            // 最后一个 要显示分享页
            ifLastShow(order);
            // 超过3个的 要开始滚动
            if (order > 2) {
              scrollToEdge(order);
            }
          }, 1000);

        }
      }
    });
    
    function showShareView(){
      othersDom.classList.add("hide");
      document.querySelector(".end-wrap").classList.remove("hide");
      document.querySelector(".end-wrap .tips").classList.remove("hide");
      setTimeout(function(){
        document.querySelector(".last-page").classList.remove("hide");
      }, 1500);

    }

    function scrollToEdge(order) {
      var base = 95;
      if((document.querySelector(".dialog-pop-wrap").classList+"").indexOf("shinv") != -1){
        base = 150;
      }
      if((document.querySelector(".dialog-pop-wrap").classList+"").indexOf("huoxing") != -1){
        base = 190;
      }
      var scrollToH = (order - 2) * document.querySelector('[order="' + order + '"]').clientHeight + base;
      
      var scrollRem = scrollToH/100 * rem;

      scrollTo(scrollWrapDom, scrollToH, 200);
    }

    function scrollTo(element, to, duration) {
      if (duration <= 0) return;
      var difference = to - element.scrollTop;
      var perTick = difference / duration * 10;

      setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop == to) return;
        scrollTo(element, to, duration - 10);
      }, 10);
    }
  }

};

module.exports = { dialogCreateHtml, dialogShowAnimate };
