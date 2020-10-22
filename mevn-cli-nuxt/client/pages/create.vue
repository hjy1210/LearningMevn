<template>
  <div>
    <h1>Create A Post</h1>
    <form @submit.prevent="addPost">
      <div>
        <div>
          <div>
            <label>Post Title:</label>
            <input v-model="post.title" type="text" />
          </div>
        </div>
      </div>
      <div>
        <div>
          <div>
            <label>Post Body:</label>
            <textarea v-model="post.body" rows="5"></textarea>
          </div>
        </div>
      </div>
      <br />
      <div>
        <button>Create</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {},
    }
  },
  methods: {
    addPost() {
      console.log(this.post)
    },
  },
}
</script>
<style scoped></style>
