<template>
  <div>
    <h1>Users</h1>
    <div>
      <div></div>
      <div>
        <NuxtLink to="/create" class="button--green">Create</NuxtLink>
      </div>
    </div>
    <br />

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
          <td>
            <NuxtLink :to="'/' + user._id" class="button--green">Edit</NuxtLink>
          </td>
          <td><button @click.prevent="deletePost(user._id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  data() {
    return {
      users: [],
    }
  },
  created() {
    const uri = '//localhost:9000/api'
    axios.get(uri).then((response) => {
      this.users = response.data
    })
  },
  methods: {
    deletePost(id) {
      const uri = `//localhost:9000/api/${id}`
      axios.delete(uri).then(() => {
        const i = this.users.map((x) => x._id).indexOf(id)
        this.users.splice(i, 1)
      })
    },
  },
}
</script>

<style scoped></style>
