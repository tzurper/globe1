
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

console.log(vertexShader);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, (innerWidth+200)/innerHeight, 0.1, 1000);
console.log(innerWidth+200);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

// console.log(scene);
// console.log(camera);
// console.log(renderer);

renderer.setSize(innerWidth+200,innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms:{
    EarthTexture:{
      value: new THREE.TextureLoader().load('./img/Earth.png')
    }
  }
}));
// console.log(sphere);

scene.add(sphere);

const group = new THREE.Group();
group.add(sphere);
scene.add(group);

camera.position.z = 15;

var controls = new OrbitControls(camera, renderer.domElement);

controls.enableZoom = false;
controls.minPolarAngle =  Math.PI/2;
controls.maxPolarAngle =  Math.PI/2;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.2;
controls.enableDamping = true;
controls.dampingFactor = 0.04;



window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = (window.innerWidth+200) / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( (window.innerWidth+200), window.innerHeight );

}


//i devided the sphere into 4 quarters based on the x and x position of the camera, in eatch quarter i take the x position of the camera and map it to the matching part of the time zone. the finction returns the round number of the timezome.
function timezone(x, z){
  if((x<0)&&(z<0)){
    return "+" + mapRange(x,-15,0,12,7);
  }else if ((x>0)&&(z<0)) {
    return "+" + mapRange(x,0,15,7,1.2);
  }else if ((x>0)&&(z>0)) {
    return mapRange(x,15,0,0,-6);
  }else if ((x<0)&&(z>0)) {
    return mapRange(x,0,-15,-6,-12);;
  }else{
    return "oops";
  }
}

// linearly maps value from the range (a..b) to (c..d)
function mapRange (value, a, b, c, d) {
    // first map value from (a..b) to (0..1)
    value = (value - a) / (b - a);
    // then map it from (0..1) to (c..d) and return it
    return Math.round(c + value * (d - c));
}

function writeXYZ(){
  var targetTime = new Date();
  var timeZoneFromDB = timezone(camera.position.x,camera.position.z); //time zone value from database
  //get the timezone offset from local time in minutes
  var tzDifference = timeZoneFromDB * 60 + targetTime.getTimezoneOffset();
  //convert the offset to milliseconds, add to targetTime, and make a new Date
  var offsetTime = new Date(targetTime.getTime() + tzDifference * 60 * 1000);
  document.getElementById('time').innerHTML = offsetTime.getHours() + ":" + offsetTime.getUTCMinutes() + ":" + offsetTime.getUTCSeconds();
  document.getElementById('timezone').innerHTML = timezone(camera.position.x,camera.position.z) + " GMT";
}

function animate(){
  controls.update();
  writeXYZ();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
