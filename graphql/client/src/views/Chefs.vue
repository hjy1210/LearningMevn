<template>
  <div>
    <h1>This is a page about {{ message }}</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="chef in chefs" :key="chef.id">
          <td>{{ chef.id }}</td>
          <td>{{ chef.name }}</td>
          <td>{{ chef.rating }}</td>
          <td>
            <router-link :to="'/chef/edit/' + chef.id" class="button--green"
              >Edit</router-link
            >
          </td>
          <td><button @click.prevent="deleteChef(chef.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      message: "abcd",
      chefs: [
        { id: 1, name: "Yang", rating: 3.14 },
        { id: 2, name: "Huang", rating: 2.71 }
      ]
    };
  },
  methods:{
    deleteChef(id) {
      console.log(`Delete chef: # ${id}`);
      this.$apollo.mutate({
        mutation: gql`
          mutation deleteChef($id: ID!) {
            deleteChef(id: $id){
              id
            }
          }
        `,
        variables: {
          id: id,
        },
      });
      location.reload();
    },

  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    message: gql`
      query {
        message
      }
    `,
    chefs: gql`
      query {
        chefs {
          id
          name
          rating
        }
      }
    `
  }
};
</script>
