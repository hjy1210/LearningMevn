<template>
  <div>
    <p>
      請先在 threejsfundamentals 的根目錄執行 servez 或 http-server
      啟動網頁伺服器，再用瀏覽器瀏覽到 localhost:8080/exercises/mcn.html。
    </p>
    <p>撰寫網頁時，必須嚴格遵守Tag正確配對的規矩。</p>
    <canvas
      id="c"
      tabindex="0"
      ref="mycanvas"
      @mousedown="this.onMouseClick"
      @mouseup="this.onMouseClick"
      @keydown="this.onKeyDown"
    ></canvas
    ><!-- tabindex="0" 讓canvas可以接受鍵盤的輸入-->
    <h2>選定階數</h2>
    <label for="size">選定階數:</label>
    <select
      id="size"
      name="size"
      size="3"
      :value="size"
      width="40"
      style="font-size: 20pt"
    >
      <option value="2">2</option>
      <option value="3" selected>3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <button id="play" @click="this.play" :disabled="playDisable">開始玩</button>
    <h2>操作方法</h2>
    <p>
      有兩種模式，當滑鼠為單十字時可轉動單層方塊，當滑鼠為附箭頭十字時可轉動整個塊魔術方塊。
      當畫布聚焦時，用 s 鍵在兩種模式間進行切換。
    </p>
    <p>
      要轉動單層方塊，在該層的起始面(法向量與轉動向量垂直)按下滑鼠，拖曳至同層終點面(法向量與轉動向量垂直)後鬆開滑鼠。
    </p>
    <p>
      當畫布聚焦時，按 u 鍵復原一轉，按 r 鍵重作一轉。淨走
      <span ref = "do"></span> 步，退回 <span ref= "undo"></span> 步。
    </p>
    <h2>魔術方塊轉動符號</h2>
    <p>
      F、B、R、L、U、B
      代表前、後、右、左、上、下層順時針轉90度，f、b、r、l、u、b
      代表前、後、右、左、上、下層逆時針轉90度。
    </p>
    <p>
      \(F_k、B_k、R_k、L_k、U_k、B_k\)
      代表前、後、右、左、上、下起第k層順時針轉90度，\(f_k、b_k、r_k、l_k、u_k、b_k\)
      代表前、後、右、左、上、下起第k層逆時針轉90度。
    </p>
    <p>所謂的順逆時針，都是面對該面時的角度。</p>
    <h2>在三階方塊中，將上層的左前、左後、右後角塊輪調</h2>
    <p>\(FrfLFRfl\)</p>
    <h2>在三階方塊中，將上層的前、後、右邊塊輪調。</h2>
    <p>\(Frfr_2FRfR_2\)</p>
    <h2>在三階方塊中，將上、前、右的中塊輪調，同時將下、後、左的中塊輪調。</h2>
    <p>\(f_2R_2F_2r_2\)</p>
    <h2>在三階方塊中，將上層的前面兩角方對調。</h2>
    <a href="https://www.youtube.com/watch?v=QyLzSnA8odc"
      >Swap Adjacent Corners</a
    >
    <p>\((rDDRUU)(rDDRu)(rDDRu)(rDDRu) \)</p>
    <h2>在三階方塊中，將上層的前面兩角方各自旋轉。</h2>
    <p>\((fDFLDl)(U)(LdlfdF)(u)\)</p>
    <h2>在三階方塊中，將上層的左前兩邊方翻轉。</h2>
    <p>\((Lu_2L^2U^2_2L)(U)(lu^2_2l^2U_2l)(u)\)</p>

    <p>
      下面參考<a href="https://math.berkeley.edu/~hutching/rubik.pdf"
        >hutching的講義</a
      >，關於commutator很有意思，前面三個方法都屬於commutator。
    </p>
    <h2>To rotate the top front left and top front right corners:</h2>
    <p>
      \(X=F^{−1}DFLDL^{−1}\) rotates the top front left corner clockwise without
      disturbing the rest of the top layer. The lower two layers of the cube are
      messed up.
    </p>
    <p>
      \(Y=U\) moves the top front right corner into the top front left position,
      and does not affect the lower two layers of the cube.
    </p>
    <p>
      \(X^{−1}=LD^{−1}L^{−1}F^{−1}D^{−1}F\) rotates the top front left
      corner(formerly the top front right corner) counterclockwise and
      repairsthe damage to the lower two layers.
    </p>
    <p>\(Y^{−1}=U^{−1}\) restores the top layer to its original position.</p>
    <p>
      So the commutator \(XYX^{−1}Y^{−1}=
      (F^{−1}DFLDL^{−1})U(LD^{−1}L^{−1}F^{−1}D^{−1}F)U^{−1}\) rotates the top
      front left corner clockwise and the top front right corner
      counterclockwise without disturbing the rest of the cube.
    </p>
  </div>
</template>
<script>
import * as THREE from "three";
//const THREE = require("three.module");
import { OrbitControls } from "./OrbitControls.js";
//const { OrbitControls } = require("OrbitControls")
import { generateMagicCube, rotateMagicCube } from "./utilsn.js";
//const { createCube, generateMagicCube, rotateMagicCube } =require('./utilsn')
let camera;
let scene;
let magicCube;
let controls;
let canvas;
// let playButton;
let renderer;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let dragging = false;
let startn = new THREE.Vector3();
let endn = new THREE.Vector3();
let startp = new THREE.Vector3();
let endp = new THREE.Vector3();
let startnCendn = new THREE.Vector3();
let enabled = false;
let dos = [];
let undos = [];
let doElement 
let undoElement
let turning = false;

export default {
  name: "MagicCube",
  data() {
    return {
      message: "Hello",
      playDisable: false,
      size: 3,
    };
  },
  mounted() {
    canvas = this.$refs.mycanvas
    doElement = this.$refs.do
    undoElement = this.$refs.undo
    this.initCamera();
  },
  methods: {
    play: function () {
      // playButton.disabled = true;
      this.playDisable = true;
      this.main();
    },

    saveDoUndo: function () {
      doElement.innerHTML = "" + dos.length;
      undoElement.innerHTML = "" + undos.length;
    },
    initData: function () {
      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();
      dragging = false;
      startn = new THREE.Vector3();
      endn = new THREE.Vector3();
      startp = new THREE.Vector3();
      endp = new THREE.Vector3();
      startnCendn = new THREE.Vector3();
      enabled = false;
      dos = [];
      undos = [];
      //doElement = document.querySelector("#dos");
      //undoElement = document.querySelector("#undos");
      turning = false;
    },
    ///// https://threejsfundamentals.org/threejs/lessons/threejs-picking.html
    getCanvasRelativePosition: function (event) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: ((event.clientX - rect.left) * canvas.width) / rect.width,
        y: ((event.clientY - rect.top) * canvas.height) / rect.height,
      };
    },

    onMouseClick: async function (event) {
      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components
      if (enabled || turning) return; // 控制camara角度時，不應該可以轉動玩具
      //mouse.x = event.clientX / window.innerWidth * 2 - 1;      ///// 這樣的話，canvas必須寬度占滿整個視窗才行
      //mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      let pos = this.getCanvasRelativePosition(event);
      mouse.x = (pos.x / canvas.width) * 2 - 1;
      mouse.y = (pos.y / canvas.height) * -2 + 1; // note we flip Y

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
        let p = intersects[0].object.position.clone(); //.round()
        ///// Object3D.localToWorld 的引數是 position，是數學上的點而非向量，所以轉換時要旋轉加上平移。
        ///// 比較奇怪的是：它的引數也會變成轉換值。
        ///// https://threejs.org/docs/#api/en/core/Object3D
        ///// .localToWorld ( vector : Vector3 ) : Vector3
        /////     vector - A vector representing a position in local (object) space.
        /////     Converts the vector from local space to world space.
        ///// 下一行執行後，intersects[0].face.normal 會變得跟 n 一樣，localToWorld 的引數會改變
        ///// let n = intersects[0].object.localToWorld(intersects[0].face.normal);
        let n = intersects[0].object.localToWorld(
          intersects[0].face.normal.clone()
        );
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
          let axislevel = this.getLevel(startnCendn, startp, endp);
          if (axislevel.length == 3) {
            turning = true;
            await rotateMagicCube(
              this.render,
              magicCube,
              axislevel[0],
              axislevel[1],
              axislevel[2]
            );
            turning = false;
            dos.push(axislevel);
            undos = [];
            this.saveDoUndo();
            console.log(axislevel);
          }
        }
      }
      dragging = !dragging;
    },

    onKeyDown: async function(e) {
      switch (e.keyCode) {
		case 83: // s : switch
			this.switchEnabled();
			break;
		case 82: //r : redo
			if (undos.length > 0 && !turning) {
				let onestep = undos.pop();
				turning = true;
				await rotateMagicCube(this.render, magicCube, onestep[0], onestep[1], onestep[2]);
				turning = false;
				dos.push(onestep);
				this.saveDoUndo();
			}
			break;
		case 85: // u undo
			if (dos.length > 0 && !turning) {
				let onestep = dos.pop();
				turning = true;
				await rotateMagicCube(this.render, magicCube, onestep[0], onestep[1], !onestep[2]);
				turning = false;
				undos.push(onestep);
				this.saveDoUndo();
			}
			break;
	}
    },


    getLevel: function (n, startp, endp) {
      for (let i = 0; i < 3; i++) {
        if (
          n.getComponent(i) != 0 &&
          Math.abs(startp.getComponent(i) - endp.getComponent(i)) < 0.01
        ) {
          return [i, startp.getComponent(i), n.getComponent(i) > 0];
        }
      }
      return [-1];
    },

    initCamera: function () {
      const fov = 20;
      const aspect = 2; // the canvas default
      const near = 0.1;
      const far = 30;
      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(10, 10, 10);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      //canvas = document.querySelector('#c');
      //canvas = this.$el.getElementsByTagName("canvas")[0];
      //canvas.addEventListener('mousedown', this.onMouseClick, false);
      //canvas.addEventListener('mouseup', this.onMouseClick, false);

      renderer = new THREE.WebGLRenderer({ canvas });

      controls = new OrbitControls(camera, canvas);
      controls.target.set(0, 0, 0);
      //controls.maxPolarAngle = 0.7 * Math.PI;
      controls.update();
      controls.enabled = false;
      //controls.enabled=true;
    },
    render: function () {
      // time *= 0.001;

      if (this.resizeRendererToDisplaySize(renderer)) {
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

      requestAnimationFrame(this.render);
    },
    resizeRendererToDisplaySize: function (renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    },
    main: function () {
      this.initData();
      this.saveDoUndo();
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xaaaaaa);

      magicCube = generateMagicCube(this.size); //3*3*3
      scene.add(magicCube);

      requestAnimationFrame(this.render);
    },

    switchEnabled: function () {
      enabled = !enabled;
      controls.enabled = enabled;
      canvas.style.cursor = enabled ? "all-scroll" : "crosshair";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
body {
  font-size: 20pt;
  margin: 0;
}
button {
  margin: 5;
  font-size: 20pt;
}
#c {
  float: left;
  width: 50vw;
  height: 90vh;
  cursor: crosshair;
}
#c:focus {
  outline: none;
}
</style>