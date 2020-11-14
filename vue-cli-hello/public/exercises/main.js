import * as THREE from './three/build/three.module.js';
import {OrbitControls} from './three/examples/jsm/controls/OrbitControls.js';
import {msg, createCube, createCube2, generateMagicCube, rotate} from './cubeunit.js';
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
function onMouseClick( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    const convas= document.querySelector('#c');
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children[0].children );
	if ( intersects.length > 0 ) {
		var index = Math.floor( intersects[0].faceIndex / 2 );
        //console.log(index);
        //console.log(intersects[0].face.normal);
        console.log(intersects[0].object.localToWorld(intersects[0].face.normal));
        //console.log(intersects[0].face)
        //console.log(intersects[0].object.name);
	}

}
let camera;
let scene;
let cube;
function main() {
  const canvas = document.querySelector('#c');
  canvas.addEventListener('mousedown',onMouseClick, false);
  canvas.addEventListener('mouseup',onMouseClick, false);
  //canvas.onmousedown=onMouseClick;
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 40;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 1000;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(40,40,40);
  camera.lookAt(new THREE.Vector3(0,0,0));

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.maxPolarAngle = 0.7 * Math.PI;
  controls.update();
  controls.enabled=false;
  //controls.enabled=true;
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xAAAAAA);

  const objects = [];
  const spread = 15;

  function addObject(x, y, obj) {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
  }
  {
    cube= generateMagicCube();
    //rotate(cube,"y",1,true);
    //rotate(cube,"x",0,false);
    //rotate(cube,"x",0,true);
    //rotate(cube,"z",-1,false);
    cube.scale.set(4,4,4);
    addObject(0,0,cube);
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    /*objects.forEach((obj, ndx) => {
      const speed = .1 + ndx * .05;
      const rot = time * speed;
      obj.rotation.x = rot;
      obj.rotation.y = rot;
    });*/

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

}
document.getElementById("RotateX1").addEventListener("click", function(){rotate(cube,"x","-1",true);});
document.getElementById("RotateX2").addEventListener("click", function(){rotate(cube,"x","0",true);});
document.getElementById("RotateX3").addEventListener("click", function(){rotate(cube,"x","1",true);});
document.getElementById("RotateY1").addEventListener("click", function(){rotate(cube,"y","-1",true);});
document.getElementById("RotateY2").addEventListener("click", function(){rotate(cube,"y","0",true);});
document.getElementById("RotateY3").addEventListener("click", function(){rotate(cube,"y","1",true);});
document.getElementById("RotateZ1").addEventListener("click", function(){rotate(cube,"z","-1",true);});
document.getElementById("RotateZ2").addEventListener("click", function(){rotate(cube,"z","0",true);});
document.getElementById("RotateZ3").addEventListener("click", function(){rotate(cube,"z","1",true);});

document.getElementById("RotateX-1").addEventListener("click", function(){rotate(cube,"x","-1",false);});
document.getElementById("RotateX-2").addEventListener("click", function(){rotate(cube,"x","0",false);});
document.getElementById("RotateX-3").addEventListener("click", function(){rotate(cube,"x","1",false);});
document.getElementById("RotateY-1").addEventListener("click", function(){rotate(cube,"y","-1",false);});
document.getElementById("RotateY-2").addEventListener("click", function(){rotate(cube,"y","0",false);});
document.getElementById("RotateY-3").addEventListener("click", function(){rotate(cube,"y","1",false);});
document.getElementById("RotateZ-1").addEventListener("click", function(){rotate(cube,"z","-1",false);});
document.getElementById("RotateZ-2").addEventListener("click", function(){rotate(cube,"z","0",false);});
document.getElementById("RotateZ-3").addEventListener("click", function(){rotate(cube,"z","1",false);});

main();