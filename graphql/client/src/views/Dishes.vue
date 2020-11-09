<!--<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>-->
<template>
  <div id="app">
    <table border="1" width="100%" style="border-collapse: collapse">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Country</th>
        <th>Actions</th>
      </tr>

      <tr v-for="dish in dishes" :key="dish.id">
        <td>{{ dish.id }}</td>
        <td>{{ dish.name }}</td>
        <td>{{ dish.country }}</td>
        <td>
          <input type="button" @click="selectDish(dish)" value="Select" />
          <input type="button" @click="deleteDish(dish.id)" value="Delete" />
        </td>
      </tr>
    </table>

    <form>
      <label>Name</label>
      <input type="text" name="name" v-model="name" />
      <br />

      <label>country</label>
      <input type="text" name="country" v-model="country" />
      <br />

      <input
        v-if="!id"
        type="button"
        @click="addDish(name, country)"
        value="Add"
      />
      <input
        v-if="id"
        type="button"
        @click="updateDish(id, name, country)"
        value="Update"
      />
      <input type="button" @click="clearForm()" value="Clear" />
    </form>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import gql from "graphql-tag";

export default {
  name: "App",
  data() {
    return {
      id: null,
      name: "",
      country: ""
    };
  },
  apollo: {
    dishes: gql`
      query {
        dishes {
          id
          name
          country
        }
      }
    `
  },
  methods: {
    addDish(name, country) {
      console.log(`Create Dish: ${name}`);
      this.$apollo.mutate({
        mutation: gql`
          mutation addDish($input: DishInput) {
            addDish(input: $input) {
              id
              name
              country
            }
          }
        `,
        variables: {
          input: { name: name, country: country }
        }
      });
      location.reload();
    },
    updateDish(id, name, country) {
      console.log(`Update contact: # ${id}`);
      this.$apollo.mutate({
        mutation: gql`
          mutation updateDish($id: ID!, $input: DishInput) {
            updateDish(id: $id, input: $input) {
              id
              name
              country
            }
          }
        `,
        variables: {
          id: id,
          input: { name: name, country: country }
        }
      });
      location.reload();
    },
    deleteDish(id) {
      console.log(`Delete dish: # ${id}`);
      this.$apollo.mutate({
        mutation: gql`
          mutation deleteDish($id: ID!) {
            deleteDish(id: $id) {
              id
            }
          }
        `,
        variables: {
          id: id
        }
      });
      location.reload();
    },
    selectDish(dish) {
      this.id = dish.id;
      this.name = dish.name;
      this.country = dish.country;
    },
    clearForm() {
      this.id = null;
      this.name = "";
      this.country = "";
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped></style>
