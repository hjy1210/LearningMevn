# vue-cli-hello

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 練習 Vue
`vue create vue-cli-hello` 之後，新增public/hello-vue.html，
用 hello-vue.html 進行 [vue-guide Introduction](https://vuejs.org/v2/guide/) 的學習。

## 練習 THREEJS/WebGL
`public/exercises/index.html` 利用 Three.js 實作魔術方塊，可用來玩魔術方塊。

`src/components/MagicCube.vue` 是個 Vue component，可用來玩魔術方塊。


## 練習 D3
[async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) 說明如何利用 async funtion 使用 promise

d3.json 回傳 promise，`public/d3/index-d3.html` 示範如何活用 d3.json 得到資料。

# Magic Cube

## Magic Cube Algorithm
* [Group Theory and the Rubic's Cube](http://people.math.harvard.edu/~jjchen/docs/Group%20Theory%20and%20the%20Rubik's%20Cube.pdf)
* [Swap Adjacent Corners](https://www.youtube.com/watch?v=QyLzSnA8odc)
## ThreeJS and WebGL
* [ThreeJS](https://threejs.org/)
* [threejsfundamentals](https://threejsfundamentals.org/)
* [threejs/lessons](https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html)
## http-server and Chrome cache
* WebGL application must be hosted by server.
* http-server is a simple web server based on NodeJS
* Chrome cache may cause confusion in debug. [這裡](https://support.google.com/accounts/answer/32050?co=GENIE.Platform%3DDesktop&hl=en) 有清除 chrome cache 的方法。