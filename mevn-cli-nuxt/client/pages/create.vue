<template>
  <div>
    <h1>Create A Post</h1>
    <form @submit.prevent="addPost">
      <div>
        <div>
          <div>
            <label>Post name:</label>
            <input v-model="form.name" type="text" />
          </div>
          <div>
            <label>Post age:</label>
            <input v-model="form.age" type="number" />
          </div>
        </div>
      </div>
      <!--<div>
        <div>
          <div>
            <label>Post Body:</label>
            <textarea v-model="post.body" rows="5"></textarea>
          </div>
        </div>
      </div>-->
      <br />
      <div>
        <button>Create</button>
      </div>
    </form>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  data() {
    return {
      form: {},
    }
  },
  methods: {
    addPost() {
      const uri = 'http://localhost:9000/api'
      axios.post(uri, this.form).then(() => {
        this.$router.push({ name: 'users' })
      })
    },
  },
}
</script>
<style scoped></style>
