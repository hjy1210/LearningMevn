<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/mevn.jpg" />
    <HelloWorld :msg="message" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

const axios = require('axios')

export default {
  data() {
    return {
      message: "abcd"
    };
  },
  created(){
    axios.post(
        "http://localhost:9000/graphql",
        {
          query: `
            {
              message
            }
          `
        },
        {
          headers: {Authorization: `Bearer ${document.cookie}`}
        }
    ).then(result=>{
      console.log(result.data.data.message)
      this.$data.message=result.data.data.message
    }).catch(err=>{
      console.log(err)
    })
  },
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
