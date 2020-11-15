<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <MagicCube />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import MagicCube from './components/MagicCube.vue'
export default {
  name: 'App',
  components: {
    //HelloWorld
    MagicCube
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
