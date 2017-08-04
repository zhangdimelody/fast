import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
// import DeviceOrientationControls from 'three-device-orientation';
// import NTESAntAnalysis from 'ntes-antanalysis';
import ColladaLoader from "./ColladaLoader.js";
// import Animations from "./Animations.js";
// import AnimationHandler from "./AnimationHandler.js";
// import KeyFrameAnimation from "./KeyFrameAnimation.js";
import * as createjs from "createjs-module";
// import "./adjust-screen.js";
import "./twod-animations.js";
import "./share.js";
import Styles from '../css/cover.css';
import {mapping, nameArray} from './data.js'
import {dialogCreateHtml, dialogShowAnimate} from './show-dialog.js'

let container;
let camera;
let scene, renderer;
let geometry, group, cameraWrap;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let controls;
let orientControls;
let animations;
let mixer;
let autoRotate = true;
let qiu163,faguang, clickCounts = 0;
let currentMeshName;
let clocked = false;
let faguangI;
let luckyDogName;

let startAnimate = false;
// let animations,kfAnimationsLength;
 
// dialogShowAnimate();
randomLukyDog();
let randomLukyDog = ()=>{
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  var num = getRandomInt(0,11);
  luckyDogName = nameArray[num]; // 10\9\2\4
  
  dialogCreateHtml(luckyDogName);
}


var particleSystem;
let createStars = () => {
  /*背景星星*/
  var particles = 200; //星星数量
  /*buffer做星星*/
  var bufferGeometry = new THREE.BufferGeometry();

  var positions = new Float32Array(particles * 3);
  var colors = new Float32Array(particles * 3);

  var color = new THREE.Color();

  var gap = 45; // 定义星星的最近出现位置

  for (var i = 0; i < positions.length; i += 3) {

    // positions

    /*-2gap < x < 2gap */
    var x = (Math.random() * gap * 4) * (Math.random() < .5 ? -1 : 1);
    var y = (Math.random() * gap * 4) * (Math.random() < .5 ? -1 : 1);
    var z = (Math.random() * gap * 4) * (Math.random() < .5 ? -1 : 1);

    /*找出x,y,z中绝对值最大的一个数*/
    var biggest = Math.abs(x) > Math.abs(y) ? Math.abs(x) > Math.abs(z) ? 　'x' : 'z' :
      Math.abs(y) > Math.abs(z) ? 'y' : 'z';

    var pos = {
      x: x,
      y: y,
      z: z
    };

    /*如果最大值比n要小（因为要在一个距离之外才出现星星）则赋值为n（-n）*/
    if (Math.abs(pos[biggest]) < gap) pos[biggest] = pos[biggest] < 0 ? -gap : gap;

    x = pos['x'];
    y = pos['y'];
    z = pos['z'];

    positions[i] = x;
    positions[i + 1] = y;
    positions[i + 2] = z;

    // colors
    /*50%星星有颜色*/
    var hasColor = Math.random() > 0.6;
    var vx, vy, vz;

    if (hasColor) {
      vx = (Math.random() + 1) / 2;
      vy = (Math.random() + 1) / 2;
      vz = (Math.random() + 1) / 2;
    } else {
      vx = 1;
      vy = 1;
      vz = 1;
    }

    /*var vx = ( Math.abs(x) / n*2 ) ;
    var vy = ( Math.abs(y) / n*2 ) ;
    var vz = ( Math.abs(z) / n*2 ) ;*/
    color.setRGB(vx, vy, vz);

    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
  }

  bufferGeometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
  bufferGeometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
  bufferGeometry.computeBoundingSphere();

  /*星星的material*/
  var material = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: THREE.VertexColors
  });
  particleSystem = new THREE.Points(bufferGeometry, material);
  particleSystem.name = "starrr"
  scene.add(particleSystem);
}

let init = () => {
  // createjs.Ticker.setFPS(60);
  container = document.querySelector('.fast-wrapper');
  // camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
  // camera.position.set(0, 0, 0);

  scene = new THREE.Scene();
  group = new THREE.Group();
  group.position.set(0, 5, 0);
  group.rotation.set(0, 0, 0);
  // camera.target = scene.position.clone();
  scene.add(group);

  renderer = new THREE.WebGLRenderer({
    container: container,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x06091b, 1);
  var pixel = (window.devicePixelRatio>2)? 1 : window.devicePixelRatio;
  renderer.setPixelRatio(pixel); 
  container.appendChild(renderer.domElement);



  // orientControls = new DeviceOrientationControls(group);
  // orientControls.alphaOffsetAngle = 0;
  var light = new THREE.AmbientLight(0xfffffff);
  // var light = new THREE.PointLight( 0xff0000, 1, 100 );
  light.intensity = 0.8;
  light.position.set(0, 40, 0);
  // scene.add(light);
  createSkyDAE();
  createStars();
  // createBac();
}

let render = () => {
  if (autoRotate) group.rotation.y -= 0.0008;
  if (objControl) objControl.update();
  if (obj) obj.rotation.y -= 0.0005;
  if (particleSystem) particleSystem.rotation.y -= 0.0009;
  if (controls) controls.update();
  // orientControls.update();
  // createjs.TWEEN.update();
  renderer.render(scene, camera);
}

let animate = () => {
  window.requestAnimationFrame(animate);
  render();
}



var model;

var texture_dict = {
  "tuxing": "tuxing.png"
}
var texturePath = "./images/"
let cameraPosition = {
  x: -39,
  y: 37,
  z: -19
};
let cameraLookAt = {
  x: -95,
  y: -38,
  z: -1
};

const loadingTextDom = document.querySelector(".loading-text span");
const loadingWrapDom = document.querySelector(".loading");
const coverDom = document.querySelector(".big-wrap");
const daeDom = document.querySelector(".threed-wrap");


let createSkyDAE = () => {
  var onProgress = function(xhr) {
    if (xhr) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
      loadingTextDom.innerHTML = Math.round(percentComplete, 2);
    }
  };
  var onError = function(xhr) {};
  let loader = new ColladaLoader();
  loader.options.convertUpAxis = true;
  loader.load('./object/star59.dae', function(collada) {
    loadingTextDom.innerHTML = 100;

    // setTimeout(function(){
    //   loadingWrapDom.classList.add("displaynone");
    // }, 800);
    // setTimeout(function(){
    //   coverDom.classList.remove("displaynone");
    // }, 700);

    console.log(collada);
    model = collada.scene;
    group.add(model);

    // animations = collada.animations;
    // kfAnimationsLength = animations.length;

    // processArray(model.children);

    model.traverse(function(child) {
      if (child instanceof THREE.PerspectiveCamera) {
        // console.log(child.uuid);
        camera = child;
        camera.fov = 80;
        camera.aspect = window.innerWidth / window.innerHeight;
        // camera.castShadow = true;
        camera.near = 0.1;
        camera.far = 500;
        // camera.position.set(-39, 37, -19);
        camera.position.set(-11.14, 49.38, 52.26);
        // camera.position.set(0, 0, 0);
        camera.up = new THREE.Vector3(0, 1, 0);
        camera.lookAt(-0.75, -0.15, -0.14);
        // camera.lookAt(0, 0, -1);
        camera.updateProjectionMatrix();
        scene.add(camera);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 0, -1)
        controls.minDistance = 0.01;
        controls.maxDistance = 100;

        controls.enableDamping = true;
        controls.dampingFactor = 0.35;
        controls.minPolarAngle = 30 * (Math.PI / 180);
        controls.maxPolarAngle = 120 * (Math.PI / 180);
      } else if (child instanceof THREE.PointLight) {
        // child.decay = 0;
        // child.intensity = 1;
        // console.log(child)
      } else if ((child instanceof THREE.Mesh) && (child.parent.name == "_163")) {
        console.log("_163333333999999")
        qiu163 = child.parent;
        qiu163.visible = false;
      } else if ((child instanceof THREE.Mesh) && (child.parent.name == "faguang")) {
        console.log("faguang")
        
        faguang = child.parent;
        faguang.visible = false;
      }

    }, onProgress, onError);

    // animate();
    
    //no use setTimeout(function(){ 
    //   document.querySelector(".xinhaoshowtip").classList.add("hide");
    //   document.querySelector(".guotip").classList.add("hide");
    // }, 3000)
  }, onProgress, onError);

  function processArray(array) {
    var forbiddenNames = ['Light', 'Plane', 'Camera', '灯光.5', '摄像机.1', '摄像机.目标.1', '灯光.4',
      '随机.1', '随机', 'triangolo4', 'freccia', 'bastone', 'bianco.1_alpha'
    ];

    var transparent = [];
    for (var i = 0; i < array.length; i++) {
      var name = array[i].name.toLowerCase();
      if (forbiddenNames.indexOf(name) < 0) {
        var object = model.getObjectByName(name, true);
        if (name.indexOf('group') > -1) {
          processArray(object.children || []);
        } else {
          if (name) {
            loadAlpha(name, object);
          }
        }
      }
      if (transparent.indexOf(name) >= 0) {
        var object = model.getObjectByName(name, true);
        // console.log(object);
        //applyTransparency(name, object);
      }
    }

  }
  var loaderImg = new THREE.ImageLoader();

  function loadAlpha(name, object) {
    var mesh = object.children[0];

    if (mesh instanceof THREE.Mesh) {
      THREE.GeometryUtils.center(mesh.geometry)

      mesh.castShadow = false;
      var material = mesh.material;
      // console.log(material.name);
      var texture_img = texture_dict[material.name || name];
      if (!texture_img) return;
      var file = texturePath + texture_img,
        alpha = new THREE.Texture();
      alpha.wrapS = alpha.wrapT = THREE.RepeatWrapping;
      alpha.offset.set(1, 0);
      alpha.mapping = THREE.ClampToEdgeWrapping;
      alpha.repeat.set(0, 1);
      // uv set reult in color not regular
      //object.renderOrder = 1
      material.map = alpha;
      material.transparent = true;
      material.side = THREE.DoubleSide;

      loaderImg.load(file, function(image) {
        alpha.image = image;
        alpha.needsUpdate = true;
        alpha.minFilter = THREE.LinearFilter;
      });
    }
  }
}


let obj;

let createBac = () => {
  let map = new THREE.TextureLoader().load('./images/bac10.png');
  let material = new THREE.MeshLambertMaterial({
    map: map,
    side: THREE.DoubleSide,
    // bumpMap: map,
    // bumpScale: 2,
    transparent: true
  });
  obj = new THREE.Mesh(new THREE.SphereGeometry(80, 50, 50), material);
  obj.position.set(0, 0, 0);
  scene.add(obj);
}
init();
document.querySelector(".guo").addEventListener("touchstart", function() {
  console.log("ccc33");
  event.stopPropagation();
  if (event.target.className == "guo") {
    const curNode = event.target;
    curNode.classList.add("guozoom");
    const guotip = document.querySelector(".guotip")
    guotip.classList.remove("hide");
    setTimeout(function() {
      guotip.classList.add("hide");
      curNode.classList.remove("guozoom");
    }, 2000);
    return;
  }
});

document.querySelector(".fast-wrapper").addEventListener("click", function() {
  console.log(333999999);
  if(clocked) return;
  clickScreen(event)
}, false);

document.querySelector(".info-page").addEventListener("click", function(){
  clickScreen(event)
}, false);



let clickScreen = (event)=>{
  event.stopPropagation();
  event.preventDefault();
  console.log("d33");
  if (currentMeshName == "_163" ) return;

  if (event.target.className == "guo") {
    const curNode = event.target;
    curNode.classList.add("guozoom");
    const guotip = document.querySelector(".guotip")
    guotip.classList.remove("hide");
    setTimeout(function() {
      guotip.classList.add("hide");
      curNode.classList.remove("guozoom");
    }, 2000);
    return;
  }
  // showInfoPage();
  tweenCameraToMesh(event);

}
let objControl;
let handleRotate = (obj) => {
  objControl = new OrbitControls(obj);
  objControl.target.set(obj.position);
};

let fclock;
let tweenCameraToMesh = () => {
  clearInterval(fclock);

  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;
  // 转换为3d坐标
  let mouse = {};
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

  //屏幕和场景转换工具根据照相机，把这个向量从屏幕转化为场景中的向量
  // var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 ).unproject( camera ); 

  let raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  let hotObjects = group.children[0].children;
  let intersects = raycaster.intersectObjects(hotObjects, true);

  if (intersects.length > 0) {
    // document.querySelector(".s-guangyun").classList.add("hide");
    document.querySelector(".s-tips").classList.add("displaynone");
    clickCounts++;
    autoRotate = false;

    var selectedObject = intersects[0].object;
    var focusObj = selectedObject.parent;
    if(currentMeshName == focusObj.name) return;
    currentMeshName = focusObj.name;
    console.log("selectedObject.parent.name", currentMeshName);
    // debugger
    if (!mapping[focusObj.name]) return;
    
    tweenToMesh(focusObj);

  } else {
    tweenToOrigin();
  }

}
let tweenToMesh = (focusObj)=>{

  var vecPos = focusObj.getWorldPosition();
  var tweenPos = {
      x: vecPos.x,
      y: vecPos.y,
      z: vecPos.z
        // y: vecPos.y - 5,
        // z: vecPos.z - 20
    };
    var tweenRotation = "y";
    var stopTime = 800;
    switch (focusObj.name) {
      case "daxiongxian.15":
        tweenPos.y -= 2;
        stopTime = 650
        break;
      case "kai":
        tweenPos.y += 4;
        stopTime = 1050;
        break;
      case "tuxing2":
        tweenPos.y += 4;
        stopTime = 800;
        break;
      case "tuxing.1":
        tweenPos.y += 4;
        stopTime = 800;
        break;
      case "shizi.1":
        tweenPos.y -= 6;
        stopTime = 800;
        tweenRotation = "y";
        break;
      case "qiu2.1":
        tweenPos.y += 2;
        stopTime = 750;
        break;
      case "nanshizi.1":
        tweenPos.y -= 6;
        stopTime = 400;
        tweenRotation = "y";
        break;
      case "heijianbian.1":
        tweenPos.y += 4;
        stopTime = 1000;
        break;
      case "xinxin.1":
        tweenPos.y += 3;
        stopTime = 900;
        break;
      case "_163":
        tweenPos.y += 10;
        stopTime = 900;
        break;
      case "shinv.2":
        tweenPos.y -= 4;
        break;
      default:
        break;
    }
    // handleRotate(focusObj);

    // createjs.Tween.get(group.rotation.y)
    // .to({ y : -1 * Math.PI }, 300,createjs.Ease.linear)
    // .to({ y : 1 * Math.PI }, 300,createjs.Ease.linear);


    var t1;
    setTimeout(function() {
      t1.setPaused(true);
      // last page show
      if (focusObj.name == "_163") {
        document.querySelector(".end-wrap").classList.remove("hide");
        document.querySelector(".guo").classList.add("hide");
        // document.querySelector(".guangyun").classList.remove("hide");

        const wxren = document.querySelector(".waixingren");
        wxren.classList.add("wxr-animation1");
        setTimeout(function(){
          wxren.classList.remove("wxr-animation1");
          wxren.classList.add("wxr-animation2");
          
        }, 0.59 * 1000)
      } else {
        showInfoPage(focusObj.name);
      }
    }, stopTime);

    t1 = createjs.Tween.get(camera.position)
      // .to({ x:-2.5, y:50, z:85.5 }, 600,createjs.Ease.linear)
      .to({
        x: 0,
        y: 0,
        z: 0
      }, 600, createjs.Ease.linear)
      .to({
        x: tweenPos.x,
        y: tweenPos.y - 9,
        z: tweenPos.z
      }, 600, createjs.Ease.linear);


    createjs.Tween.get(controls.target)
      .to({
        x: tweenPos.x,
        y: tweenPos.y - 9,
        z: tweenPos.z + 0.001
      }, 600, createjs.Ease.linear);

    controls.enabled = false;
    // orientControls.enabled = false;

    if (focusObj.name != "_163") {
      fclock = setInterval(function() {
        focusObj.rotation[tweenRotation] -= 0.01;
      }, 100);
    }
}

let tweenToOrigin = () => {
  // document.querySelector(".guangyun").classList.add("hide");
  document.querySelector(".s-guangyun").classList.add("hide");
  document.querySelector(".guo").classList.remove("hide");

  // clearInterval(faguangI);
  // faguang.visible = false;

  currentMeshName = "";


  autoRotate = true;

  createjs.Tween.get(camera.position)
    .to({
      x: -11.14,
      y: 49.38,
      z: 52.26
    }, 600, createjs.Ease.linear); //circInOut
  // .to({ x:-2.5, y:50, z:85.5 }, 600,createjs.Ease.circInOut);

  // camera.position.set(-39, 37, -19);
  // camera.up = new THREE.Vector3(0, 1, 0);
  // camera.lookAt(0, 0, -1);
  // camera.updateProjectionMatrix();
  // camera.position.set(-11.14, 49.38, 52.26);
  // // camera.position.set(0, 0, 0);
  // camera.up = new THREE.Vector3(0, 1, 0);
  // camera.lookAt(-0.75, -0.15, -0.14);
  createjs.Tween.get(controls.target)
    .to({
      x: -0.75,
      y: -0.15,
      z: -0.14
    }, 800, createjs.Ease.linear);

  controls.enabled = true;
  // orientControls.enabled = true;


  let infoDom = document.querySelector(".info-page");
  if (infoDom.style.bottom != "0rem") return;
  createjs.Tween.get({
      bottom: 0
    }, {
      loop: false,
      onChange: changeInfoPos
    })
    .to({
      bottom: -7
    }, 500, createjs.Ease.Linear)
  function changeInfoPos(event) {
    var data = event.currentTarget.target;
    infoDom.style.bottom = data.bottom + "rem";
  }

  let guoDom = document.querySelector(".guo");
  // if (guoDom.style.bottom != "-2rem") return;
  createjs.Tween.get({
      bottom: -2
    }, {
      loop: false,
      onChange: changeGuoPos
    })
    .to({
      bottom: 0
    }, 500, createjs.Ease.Linear)
  function changeGuoPos(event) {
    var data = event.currentTarget.target;
    guoDom.style.bottom = data.bottom + "rem";
  }
  
  
  
  switch(clickCounts){
    case 1:
      showTipFunc("不是这个星球发出的信号！")
      break;
    case 4:
      showTipFunc("也不是这个哦~")
      break;
    case 5:
      clocked = true;
      if(musicClasslist.contains("on")){
        audio1.pause();
        audio2.play();
      }
      musicDom.setAttribute("curplay","audio2");

      setTimeout(function(){
        console.log("33222");
        show163Animate();
      }, 1000);
      // faguangI = setInterval(function(){
      //   faguang.visible = !faguang.visible;
      // }, 2000);
      break;
  }
}
  
let showTipFunc = (text)=>{
  const xinhaotip = document.querySelector(".xinhaoshowtip")
  xinhaotip.innerHTML = text;
  xinhaotip.classList.remove("hide");
  setTimeout(function() {
    xinhaotip.classList.add("hide")
  }, 4000);
}

let show163Animate = ()=>{
  
  showTipFunc("信号又出现了！！！")
  qiu163.visible = true;
  

  var qiutweenPos = qiu163.getWorldPosition();
  var t2;
  setTimeout(function() {
    t2.setPaused(true);
    controls.enabled = false;
    autoRotate = false;
    clocked = false;

    // document.querySelector(".s-guangyun").classList.remove("hide");
  }, 50);

  t2 = createjs.Tween.get(camera.position)
  .to({
    x: 0,
    y: 0,
    z: 0
  }, 600, createjs.Ease.linear)
  .to({
    x: qiutweenPos.x,
    y: qiutweenPos.y ,
    z: qiutweenPos.z
  }, 600, createjs.Ease.linear);

  createjs.Tween.get(controls.target)
    .to({
      x: qiutweenPos.x ,
      y: qiutweenPos.y - 1 - 20,
      z: qiutweenPos.z + 0.001
    }, 600, createjs.Ease.linear);
}
let showInfoPage = (name) => {

  let clist = document.querySelector(".info-page .img").classList;

  for (var i = 0; i < clist.length; i++) {
    if (clist[i] != "img") {
      clist.remove(clist[i]);
    }
  }
  clist.add(mapping[name].pic);

  document.querySelector(".info-page .text").innerHTML = mapping[name].text;
  let infoDom = document.querySelector(".info-page");
  createjs.Tween.get({
      bottom: -7
    }, {
      loop: false,
      onChange: changeInfoPos
    })
    .to({
      bottom: 0
    }, 500, createjs.Ease.Linear)
  function changeInfoPos(event) {
    var data = event.currentTarget.target;
    infoDom.style.bottom = data.bottom + "rem";
  }

  let guoDom = document.querySelector(".guo");
  // if (guoDom.style.bottom != "0rem") return;
  createjs.Tween.get({
      bottom: 0
    }, {
      loop: false,
      onChange: changeGuoPos
    })
    .to({
      bottom: -2
    }, 500, createjs.Ease.Linear)
  function changeGuoPos(event) {
    var data = event.currentTarget.target;
    guoDom.style.bottom = data.bottom + "rem";
  }
}


document.querySelector(".continue").addEventListener("click", function() {
  document.querySelector(".end-wrap").classList.add("hide");
  tweenToOrigin();
  if(musicClasslist.contains("on")){
    audio2.pause();
    audio1.play();
  }
  musicDom.setAttribute("curplay","audio1");
});
document.querySelector(".share").addEventListener("click", function(){
  document.querySelector(".share-w").classList.remove("displaynone");
});
document.querySelector(".share-w").addEventListener("click", function(){
  document.querySelector(".share-w").classList.add("displaynone");
});
document.querySelector(".s-guangyun").addEventListener("click", function() {
  tweenToMesh(qiu163)
});

var audio1 = document.querySelector(".audio1");
var audio2 = document.querySelector(".audio2");
var audio6 = document.querySelector(".audio6");




document.querySelector(".music").addEventListener("click", function(){
  var audioclass = event.target.classList;
  var curAudio = event.target.getAttribute("curplay");

  var curDom = document.querySelector("."+ curAudio +"");
  if(audioclass.contains("on")){
    audioclass.remove("on")
    curDom.pause();
    if(curAudio == "audio5"){
      audio1.pause();
    }
  }else{
    audioclass.add("on")
    curDom.play();
    if(curAudio == "audio5"){
      audio1.play();
    }
  }
})
// document.querySelector(".music").click();
// document.querySelector(".music").click();

 

// const wxren = document.querySelector(".waixingren");
// document.querySelector(".waixingren").addEventListener("click", function(){
//   // setTimeout(function(){
//     wxren.classList.remove("wxr-animation2");
//     wxren.classList.add("wxr-animation3");
//     setTimeout(function(){
//       wxren.classList.remove("wxr-animation3");
//       wxren.classList.add("wxr-animation4");

//       setTimeout(function(){
//         document.querySelector(".end-wrap .tips").classList.remove("hide");
//         setTimeout(function(){
//           document.querySelector(".last-page").classList.remove("displaynone");
//         }, 800);
//       }, 2000);

//     }, 0.47*1000)
// });

window.addEventListener('resize', onWindowResize, false);

let onWindowResize = () => {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

var innerWidthTmp = window.innerWidth;
//横竖屏事件监听方法
function screenOrientationListener() {
  try {
    var iw = window.innerWidth;
    var orientation;
    //屏幕方向改变处理
    if (iw != innerWidthTmp) {
      if (iw > window.innerHeight) orientation = 90;
      else orientation = 0;
      //调用转屏事件
      onWindowResize();
      innerWidthTmp = iw;
    }
  } catch (e) {
    console.log(e);
  };
  //间隔固定事件检查是否转屏，默认300毫秒
  setTimeout(screenOrientationListener, 300);
}
//启动横竖屏事件监听
screenOrientationListener();

const audio3 = document.querySelector(".audio3");
const audio4 = document.querySelector(".audio4");
const audio5 = document.querySelector(".audio5");
const musicDom = document.querySelector(".music");
const musicClasslist = musicDom.classList;
const bac = document.querySelector(".cover-bac");
const chuansuo = document.querySelector(".chuansuo");
// const daeDom = document.querySelector(".threed-wrap");
// const coverDom = document.querySelector(".chuansuo");


document.querySelector(".start-chuansuo").addEventListener("touchstart", function(e){
  
  if(musicClasslist.contains("on")){
    // 开始穿梭
    audio5.pause();
    audio1.pause();
    audio6.play();
    audio4.play();
  }
  musicDom.setAttribute("curplay","audio4");

  bac.classList.add("move");
  chuansuo.classList.add("move");
  // continueAnimate();
  setTimeout(function(){
    // 穿梭完了 显示场景
    if(musicClasslist.contains("on")){
      audio4.pause();
      audio1.play();
    }
    musicDom.setAttribute("curplay","audio1");
    
    daeDom.classList.remove("displaynone");
    coverDom.classList.add("displaynone");
    

    animate();


    setTimeout(function(){
      document.querySelector(".find-xinhaoshowtip").classList.add("hide");
      document.querySelector(".s-tips").classList.remove("displaynone");

    }, 4000);


  }, 2640);

});



    animate();

