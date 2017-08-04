import {mapping, nameArray} from './data.js'






function dialogCreateHtml(name){
  // getRandomInt(0,11)
  let dialog = mapping[name].dialog;
  let dialoghtml = "";
  for(let i in dialog){
    if(!(i%2)){
      //0 如果是偶数
      let animateOrNot = "";
      if(i==0){ 
        animateOrNot = "animation";
      }
      dialoghtml += `<li class="wxr ${animateOrNot}" order="${i}" >
        <span class="head"></span>
        <span class="kuang">${dialog[i]}</span>
      </li>`;
    
    }else{
      // 如果是奇数
      dialoghtml += `<li class="fast" order="${i}" >
        <span class="kuang" realtext="${dialog[i]}"><i>点击继续</i></span>
        <span class="head"></span>
      </li>`
    }
  }
  console.log(dialoghtml);
  document.querySelector(".speak-wrap").innerHTML = dialoghtml;
}






function dialogShowAnimate() {
  // create html





  var liLength = document.querySelectorAll(".speak-wrap li").length;
  var scrollWrapDom = document.querySelector(".speak-wrap");

  document.querySelector(".dialog-pop-wrap").classList.remove("displaynone");

  console.log(liLength);


  startAnimation();
  // animation start
  function startAnimation() {
    talkShow(1);

    function talkShow(order) {
      setTimeout(function() {
        document.querySelector('[order="' + order + '"]').classList.add("animation");
      }, 1000);
    };

    scrollWrapDom.addEventListener("click", function() {
      event.stopPropagation();
      event.preventDefault();
      var curNode = event.target;
      if (curNode.tagName != "I" && !curNode.hasAttribute("realtext")) return;
      // click I
      var parentNode = curNode.parentElement;
      if (curNode.hasAttribute("realtext")){ 
        // cick span
        parentNode = curNode;
      }
      var curOrder = parentNode.parentElement.getAttribute("order");
      var nextOrder = parseInt(curOrder) + 1;
      var thirdOrder = nextOrder + 1;
      // 填充文字
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
        if(order == liLength-1){
          setTimeout(function(){
            showShareView();
          }, 1500)
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
      document.querySelector(".end-wrap").classList.remove("hide");
      document.querySelector(".dialog-pop-wrap").classList.add("hide");
    }

    function scrollToEdge(order) {
      // scrollWrapDom.scrollTop 
      var scrollToH = (order - 2) * document.querySelector(".speak-wrap li").clientHeight;
      scrollTo(scrollWrapDom, scrollToH, 300);
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
