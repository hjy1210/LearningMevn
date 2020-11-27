<!--<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>-->
<template>
  <div id="app">
    <p>請上載由cml轉成的json檔</p>
    <input id="jsonfile" type="file" @change.prevent="loadfile">
    <mathjaxcomp :content="content"></mathjaxcomp>
    <mathjaxcomp></mathjaxcomp>

    <table border="1" width="100%" style="border-collapse: collapse">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>rating</th>
        <th>Actions</th>
      </tr>

      <tr v-for="chef in chefs" :key="chef.id">
        <td>{{ chef.id }}</td>
        <td>{{ chef.name }}</td>
        <td>{{ chef.rating }}</td>
        <td>
          <input type="button" @click="selectChef(chef)" value="Select" />
          <input type="button" @click="deleteChef(chef.id)" value="Delete" />
        </td>
      </tr>
    </table>

    <form>
      <label>Name</label>
      <input type="text" name="name" v-model="name" />
      <br />

      <label>rating</label>
      <input type="text" name="rating" v-model="rating" />
      <br />

      <input
        v-if="!id"
        type="button"
        @click="addChef(name, rating)"
        value="Add"
      />
      <input
        v-if="id"
        type="button"
        @click="updateChef(id, name, rating)"
        value="Update"
      />
      <input type="button" @click="clearForm()" value="Clear" />
    </form>
    <!--<button @click.prevent="getDishes">Get Dishes</button>-->
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import mathjaxcomp from "../components/mathjaxcomp";
// import gql from "graphql-tag";
const axios = require("axios");

export default {
  name: "Chefs",
  data() {
    return {
      id: null,
      name: "",
      rating: "",
      chefs: [],
      content:"\\(x^{14}\\)"
    };
  },
  created() {
    this.getChefs();
  },
  components: {
    mathjaxcomp,
  },
  methods: {
    addChef(name, rating) {
      console.log(`Create Chef: ${name}`);
      // console.log("("+document.cookie+")")
      // console.log(`${name},${country}`)
      axios
        .post(
          "http://localhost:9000/graphql",
          {
            query: `
            mutation addChefShell($input: ChefInput) {
              addChef(input: $input) {
                id
                name
                rating
              }
            }
          `,
            variables: {
              input: { name: name, rating: parseFloat(rating) },
            },
          },
          {
            headers: { Authorization: `Bearer ${document.cookie}` },
          }
        )
        .then((result) => {
          console.log(JSON.stringify(result.data));
          this.clearForm();
          this.getChefs();
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
      // location.reload();
    },
    updateChef(id, name, rating) {
      console.log(`Update Chef: # ${id}`);
      axios
        .post(
          "http://localhost:9000/graphql",
          {
            query: `
          mutation updateChef($id: ID!, $input: ChefInput) {
            updateChef(id: $id, input: $input) {
              id
              name
              rating
            }
          }
          `,
            variables: {
              id: id,
              input: { name: name, rating: parseFloat(rating) },
            },
          },
          {
            headers: { Authorization: `Bearer ${document.cookie}` },
          }
        )
        .then((result) => {
          console.log(JSON.stringify(result.data));
          this.clearForm();
          this.getChefs();
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
      //location.reload();
    },
    deleteChef(id) {
      console.log(`Delete chef: # ${id}`);
      axios
        .post(
          "http://localhost:9000/graphql",
          {
            query: `
            mutation deleteChefShell($id: ID!) {
              deleteChef(id: $id) {
                id
              }
            }
          `,
            variables: {
              id: id,
            },
          },
          {
            headers: { Authorization: `Bearer ${document.cookie}` },
          }
        )
        .then((result) => {
          console.log(JSON.stringify(result.data));
          this.clearForm();
          this.getChefs();
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
      //location.reload();
    },
    selectChef(chef) {
      this.id = chef.id;
      this.name = chef.name;
      this.rating = chef.rating;
    },
    clearForm() {
      this.id = null;
      this.name = "";
      this.rating = "";
    },
    getChefs() {
      //console.log(`${document.cookie}`)
      axios
        .post(
          "http://localhost:9000/graphql",
          {
            query: `query abcd
            {
              chefs
              {id,name,rating}
            }
          `,
          },
          {
            headers: { Authorization: `Bearer ${document.cookie}` },
          }
        )
        .then((result) => {
          this.$data.chefs = result.data.data.chefs;
          //console.log(result.data.data.dishes);
        });
    },
    loadfile: async function(){
      const file=document.getElementById("jsonfile").files[0]
      const text = await file.text()
      const jsondata = JSON.parse(text)
      this.content=jsondata.html
    }
  },
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
