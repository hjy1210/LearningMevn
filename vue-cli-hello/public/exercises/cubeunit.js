import * as THREE from './three/build/three.module.js';
function createMaterial2(rgb) {
	const material = new THREE.MeshPhongMaterial({
		color: rgb,
		side: THREE.DoubleSide
	});
	return material;
}
//alert(colorMap.get("red"));
function createCube(lColor, rColor, dColor, uColor, bColor, fColor, scale) {
	const faceD = new THREE.PlaneBufferGeometry();
	const meshD = new THREE.Mesh(faceD, createMaterial2(dColor));
	meshD.rotation.x = Math.PI / 2;
	meshD.position.y = -0.5;

	const faceU = new THREE.PlaneBufferGeometry();
	const meshU = new THREE.Mesh(faceU, createMaterial2(uColor));
	meshU.rotation.x = Math.PI / 2;
	meshU.position.y = 0.5;

	const faceL = new THREE.PlaneBufferGeometry();
	const meshL = new THREE.Mesh(faceL, createMaterial2(lColor));
	meshL.rotation.y = Math.PI / 2;
	meshL.position.x = -0.5;

	const faceR = new THREE.PlaneBufferGeometry();
	const meshR = new THREE.Mesh(faceR, createMaterial2(rColor));
	meshR.rotation.y = Math.PI / 2;
	meshR.position.x = 0.5;

	const faceB = new THREE.PlaneBufferGeometry();
	const meshB = new THREE.Mesh(faceB, createMaterial2(bColor));
	meshB.position.z = -0.5;

	const faceF = new THREE.PlaneBufferGeometry();
	const meshF = new THREE.Mesh(faceF, createMaterial2(fColor));
	meshF.position.z = 0.5;

	const parent = new THREE.Object3D();
	parent.add(meshL);
	parent.add(meshR);
	parent.add(meshD);
	parent.add(meshU);
	parent.add(meshB);
	parent.add(meshF);
	// use applyMatrix4 or object3d.scale.x to scale object3d
	// 用 VSCode 插件 Live Server 當伺服器，好處多多，可以在html/js有異動時及時動態更新網頁
	const m = new THREE.Matrix4();
	m.set(scale, 0, 0, 0, 0, scale, 0, 0, 0, 0, scale, 0, 0, 0, 0, 1);
	parent.applyMatrix4(m);
	/*parent.scale.x=scale;
    parent.scale.y=scale;
	parent.scale.z=scale;*/

	return parent;
}
const loader = new THREE.TextureLoader();
const eightcolors=[
	new THREE.MeshBasicMaterial({color:"black"}),
	new THREE.MeshBasicMaterial({map: loader.load('./resources/red.png')}),
	new THREE.MeshBasicMaterial({map: loader.load('./resources/green.png')}),
	new THREE.MeshBasicMaterial({map: loader.load('./resources/yellow.png')}),
	new THREE.MeshBasicMaterial({map: loader.load('./resources/blue.png')}),
	new THREE.MeshBasicMaterial({map: loader.load('./resources/magenta.png')}),
	new THREE.MeshBasicMaterial({map: loader.load('./resources/cyan.png')}),
	new THREE.MeshBasicMaterial({map: loader.load('./resources/white.png')})
];
function createCube2(colorindexes, scale){
	const g= new THREE.BoxBufferGeometry();
	// 立方體的顏色順序為x+,x-,y+,y-,z+,z-
	const m=new THREE.Mesh(g, [eightcolors[colorindexes[0]], 
		eightcolors[colorindexes[1]],eightcolors[colorindexes[2]],eightcolors[colorindexes[3]],
		eightcolors[colorindexes[4]],eightcolors[colorindexes[5]]]);
	m.scale.set(scale,scale,scale);
	return m;
}
function generateMagicCube(){
	const magicCube=new THREE.Object3D();
	for (let z=-1;z<=1;z++){
		for (let x=-1;x<=1;x++){
			for (let y=-1;y<=1;y++){
				//console.log(x,y,z);
				const cube=createCube2([
					x==1?1:0,
					x==-1?2:0,
					y==1?3:0,
					y==-1?4:0,
					z==1?5:0,
					z==-1?6:0
				],1)
				cube.position.set(x,y,z);
				cube.name=`${x+1}${y+1}${z+1}`;
				magicCube.add(cube);
			}
		}
	}
	return magicCube;
}
/////z2+x2+z2-x2- 四步一組，可將六個中心方體分兩組輪換，其他方體不動。
/////用此招一次，中間加步驟改變中心體的方向，再逆用此招一次，可用來調整中心體的方向。
function rotate(magicCube, axis, level, isAnticlockwise){
	let angle=Math.PI / 2;
	if (!isAnticlockwise){
		angle=-angle;
	}
	const quaternion = new THREE.Quaternion();
	switch (axis) {
		case "x":
			quaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), angle );
			break;
		case "y":
			quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), angle );
			break;
		case "z":
			quaternion.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), angle );
			break;
	}
	
	let objects=[]
	magicCube.children.forEach(c=>{
		switch (axis){
			case "x":
				if (Math.abs(c.position.x-level)<0.01){
					//c.applyQuaternion(quaternion);
					objects.push(c);
				}
				break;
			case "y":
				if (Math.abs(c.position.y-level)<0.01){
					//c.applyQuaternion(quaternion);
					objects.push(c);
				}
				break;
			case "z":
				if (Math.abs(c.position.z-level)<0.01){
					//c.applyQuaternion(quaternion);
					objects.push(c);
				}
				break;
		}
	});
	//alert(objects.length);
	objects.forEach(c=>{
		c.applyQuaternion(quaternion);
		c.position.applyQuaternion(quaternion);
	});
}
function msg(s) {
	alert(s);
}
export { msg, createCube, createCube2, generateMagicCube, rotate };
