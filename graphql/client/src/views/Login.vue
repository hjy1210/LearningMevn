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
      <p> {{msg}} </p>
  </center>
</template>

<script>
const axios = require('axios')
export default {
  data() {
    return {
      form:{},
      msg:'Answer'
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
      // https://medium.com/acmvit/handling-cookies-with-axios-872790241a9b
      // https://github.com/axios/axios
      axios.post(
        "http://localhost:9000/graphql",
        {
          query: `query abcd
            {
              dishes
              {id,name,country}
            }
          `
        },{
          headers: {Authorization: `Bearer ${document.cookie}`}
        }
      ).then(result => {
        this.$data.msg=result.data
        //alert(JSON.stringify(result.data));
      })
    }
  },

};
</script>

<style scoped></style>
