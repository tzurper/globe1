import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
//i basiclly took some code for a shpere custom shader and changed the properties to make it fit my style
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, (innerWidth+200)/innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
//made the width bigger then the display because i rtotated the 3js canvas in order to make the globe spin in the right angle, i added more pixels to make it responsive for smaller displays and not have is cut off
renderer.setSize(innerWidth+200,innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

//setting up the shepre with the custom shaders and the uv map of the earth that i made
const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms:{
    EarthTexture:{
      value: new THREE.TextureLoader().load('./img/Earth.png')
    }
  }
}));
scene.add(sphere);

//setting the distance from the center of the canvas (and the sphere)
camera.position.z = 15;

//setting all the parameters for the orbit controls
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

//this function makes the canvas responsive
function onWindowResize(){
    camera.aspect = (window.innerWidth+200) / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( (window.innerWidth+200), window.innerHeight );
}


// I devided the sphere into 4 quarters based on the x and z position of the camera, in eatch quarter it takes the x position of the camera and map it to the matching part of the time zone. the function returns the round number of the timezome.
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

// maps value from the range (a..b) to (c..d)
function mapRange (value, a, b, c, d) {
    value = (value - a) / (b - a);
    return Math.round(c + value * (d - c));
}

// this function checks and validates the time zone it gets from the function above, then writes it to the html card, before i had a problem that the time can get bigger then 24 by simply adding it to the utc timezone, by making a new date from the utc timezone and the globe one it eliminates the problem.
function writeXYZ(){
  var targetTime = new Date();
  var timeZoneFromGlobe = timezone(camera.position.x,camera.position.z); //time zone value from the function above
  //gets the timezone offset
  var tzDifference = timeZoneFromGlobe * 60 + targetTime.getTimezoneOffset();
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
