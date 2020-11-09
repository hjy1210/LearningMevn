<template>
  <center>
    <br />
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label>Username</label>
      <input type="text" name="username" v-model="form.username" />
      <br />

      <label>Password</label>
      <input type="text" name="password" v-model="form.password" />
      <br />

      <button>Create</button>
    </form>
      <button @click="getCookie">Get Cookie </button>
  </center>
</template>

<script>
const axios = require('axios')
export default {
  data() {
    return {
      form:{}
    };
  },
  methods: {
    login() {
      const uri = 'http://localhost:9000/login'
      axios.post(uri, this.form, {withCredentials: true}).then((res) => {
        //  /// https://nuxtjs.org/examples/custom-page-loading
        //  /// https://router.vuejs.org/guide/essentials/navigation.html
        //this.$router.push({ name: 'users' })
        console.log(`res=${JSON.stringify(res)}`)
        console.log(res.headers)
        console.log(res.data)
        document.cookie = "jwt="+res.data;
      })
    },
    getCookie(){
      console.log("("+document.cookie+")")
    }
  },

};
</script>

<style scoped></style>
