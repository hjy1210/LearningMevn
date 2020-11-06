<template>
  <div>
    <h1>Edit Chef: {{ id }}</h1>
    <form @submit.prevent="updateChef">
      <div>
        <div>
          <div>
            <label>Chef name:</label>
            <input v-model="form.name" type="text" />
          </div>
          <div>
            <label>Chef Rating:</label>
            <input v-model="form.rating" type="text" />
          </div>
        </div>
      </div>
      <br />
      <div>
        <button>Update</button>
      </div>
    </form>
    <button v-on:click="checkid">checkid</button>
    <!--<center>
      <br />
      <h1>This is the Chefedit component {{ this.$route.params.id }}</h1>
    </center>-->
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      form: {}
    };
  },
  props: ["id"],
  created: function(){
    console.log(this.id)
    this.getChef(this.id)
  },
  methods: {
    checkid: function() {
      alert(this.$props.id);
    },
    getChef: async function(id){
      console.log(`Get Chef: ${id}`);
      let q= await this.$apollo.query({
        query: gql`
          query form($id:ID!) {
            form: chef(id: $id) {
              id,
              name,
              rating,
            }
          }
        `,
        variables: {
          id : id
        },
      })
      console.log(q)
      this.form=q.data.form
    },
    updateChef: async function(){
      let m = await this.$apollo.mutate({
        mutation: gql`
          mutation updateChef($id: ID!, $input:ChefInput) {
            msg:updateChef(id: $id, input: $input) {
              id
            }
          }
        `,
        variables: {
          id: this.id,
          input: {name:this.form.name, rating:parseFloat(this.form.rating)}
        }
      });
      console.log(m.data.msg)
    }
  }
};
</script>

<style scoped></style>
