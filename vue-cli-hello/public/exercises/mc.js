import * as THREE from './three/build/three.module.js';
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js';
import { createCube, generateMagicCube, rotateMagicCube } from './utils.js';

let camera;
let scene;
let magicCube;
let controls;
let canvas;
let renderer;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
let dragging = false;
let startn = new THREE.Vector3();
let endn = new THREE.Vector3();
let startp = new THREE.Vector3();
let endp = new THREE.Vector3();
let startnCendn = new THREE.Vector3();
let enabled = false;
let dos = [];
let undos = [];
let doElement = document.querySelector('#dos');
let undoElement = document.querySelector('#undos');
let turning = false;
function saveDoUndo() {
	doElement.innerHTML = '' + dos.length;
	undoElement.innerHTML = '' + undos.length;
}
///// https://threejsfundamentals.org/threejs/lessons/threejs-picking.html
function getCanvasRelativePosition(event) {
	const rect = canvas.getBoundingClientRect();
	return {
		x: (event.clientX - rect.left) * canvas.width / rect.width,
		y: (event.clientY - rect.top) * canvas.height / rect.height
	};
}

async function onMouseClick(event) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	if (enabled || turning) return; // 控制camara角度時，不應該可以轉動玩具
	//mouse.x = event.clientX / window.innerWidth * 2 - 1;      ///// 這樣的話，canvas必須寬度占滿整個視窗才行
	//mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	let pos = getCanvasRelativePosition(event);
	mouse.x = pos.x / canvas.width * 2 - 1;
	mouse.y = pos.y / canvas.height * -2 + 1; // note we flip Y

	//const convas= document.querySelector('#c');
	raycaster.setFromCamera(mouse, camera);

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects(scene.children[0].children);
	if (!dragging) {
		startn = new THREE.Vector3();
		startnCendn = new THREE.Vector3();
	} else {
		endn = new THREE.Vector3();
		startnCendn = new THREE.Vector3();
	}
	if (intersects.length > 0) {
		let p = intersects[0].object.position.clone().round();
		///// Object3D.localToWorld 的引數是 position，是數學上的點而非向量，所以轉換時要旋轉加上平移。
		///// 比較奇怪的是：它的引數也會變成轉換值。
		///// https://threejs.org/docs/#api/en/core/Object3D
		///// .localToWorld ( vector : Vector3 ) : Vector3
		/////     vector - A vector representing a position in local (object) space.
		/////     Converts the vector from local space to world space.
		///// 下一行執行後，intersects[0].face.normal 會變得跟 n 一樣，localToWorld 的引數會改變
		///// let n = intersects[0].object.localToWorld(intersects[0].face.normal);
		let n = intersects[0].object.localToWorld(intersects[0].face.normal.clone());
		n.sub(p).round();
		//let n = intersects[0].face.normal.clone().applyQuaternion(intersects[0].object.quaternion); // 為什麼不對？
		if (!dragging) {
			startn.copy(n);
			startp.copy(p);
		} else {
			endn.copy(n);
			endp.copy(p);
			console.log(startp, startn, endp, endn);
			startnCendn.copy(startn).cross(endn);
			let axislevel = getLevel(startnCendn, startp, endp);
			if (axislevel.length == 3) {
				turning = true;
				await rotateMagicCube(render, magicCube, axislevel[0], axislevel[1], axislevel[2]);
				turning = false;
				dos.push(axislevel);
				undos = [];
				saveDoUndo();
				console.log(axislevel);
			}
		}
		//console.log(n);
		//console.log(p);

		//console.log(intersects[0].face)
		//console.log(intersects[0].object.name);
	}
	dragging = !dragging;
}

function getLevel(n, startp, endp) {
	for (let i = 0; i < 3; i++) {
		if (n.getComponent(i) != 0 && startp.getComponent(i) == endp.getComponent(i)) {
			return [ i, startp.getComponent(i), n.getComponent(i) > 0 ];
		}
	}
	return [ -1 ];
}

function initCamera() {
	const fov = 20;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 30;
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(10, 10, 10);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	canvas = document.querySelector('#c');
	canvas.addEventListener('mousedown', onMouseClick, false);
	canvas.addEventListener('mouseup', onMouseClick, false);

	renderer = new THREE.WebGLRenderer({ canvas });

	controls = new OrbitControls(camera, canvas);
	controls.target.set(0, 0, 0);
	//controls.maxPolarAngle = 0.7 * Math.PI;
	controls.update();
	controls.enabled = false;
	//controls.enabled=true;
}
function render(time) {
	time *= 0.001;

	if (resizeRendererToDisplaySize(renderer)) {
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

initCamera();

function main() {
	saveDoUndo();
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xaaaaaa);

	magicCube = generateMagicCube(); //3*3*3
	scene.add(magicCube);

	requestAnimationFrame(render);
}

function switchEnabled() {
	enabled = !enabled;
	controls.enabled = enabled;
	canvas.style.cursor = enabled ? 'all-scroll' : 'crosshair';
}
// https://threejsfundamentals.org/threejs/lessons/threejs-tips.html#tabindex 介紹如何讓canvas可以接受鍵盤的輸入。
canvas.addEventListener('keydown', async (e) => {
	switch (e.keyCode) {
		case 83: // s : switch
			switchEnabled();
			break;
		case 82: //r : redo
			if (undos.length > 0 && !turning) {
				let onestep = undos.pop();
				turning = true;
				await rotateMagicCube(render, magicCube, onestep[0], onestep[1], onestep[2]);
				turning = false;
				dos.push(onestep);
				saveDoUndo();
			}
			break;
		case 85: // u undo
			if (dos.length > 0 && !turning) {
				let onestep = dos.pop();
				turning = true;
				await rotateMagicCube(render, magicCube, onestep[0], onestep[1], !onestep[2]);
				turning = false;
				undos.push(onestep);
				saveDoUndo();
			}
			break;
	}
});
main();
