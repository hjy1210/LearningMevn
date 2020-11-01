<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/mevn.jpg" />
    <HelloWorld :msg="message" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

import gql from "graphql-tag";

export default {
  data() {
    return {
      message: "abcd"
    };
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    message: gql`
      query {
        message
      }
    `
  },
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
