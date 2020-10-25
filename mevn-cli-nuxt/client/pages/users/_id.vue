<template>
  <div>
    <h1>Edit User</h1>
    <form @submit.prevent="updatePost">
      <div>
        <div>
          <div>
            <label>User name:</label>
            <input v-model="form.name" type="text" />
          </div>
          <div>
            <label>User Age:</label>
            <input v-model="form.age" type="text" />
          </div>
        </div>
      </div>
      <br />
      <div>
        <button>Update</button>
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
      id: this.$route.params.id,
    }
  },
  created() {
    const uri = `http://localhost:9000/api/${this.id}`
    axios.put(uri).then((response) => {
      this.form = response.data
    })
  },
  methods: {
    updatePost() {
      const uri = `http://localhost:9000/api/${this.id}`
      axios.put(uri, this.form).then(() => {
        this.$router.push({ name: 'users' })
      })
    },
  },
}
</script>
<style scoped></style>
