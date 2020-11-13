<!--<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>-->
<template>
  <div id="app">
    <p>\(\ce{H2SO4}\)</p>
    <p>\(\pu{1.02e-23}\)</p>
    <p>\(x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}\)</p>
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
    <p>
      <span>&lbrace; &lbrace;}} {{ country }} </span>
      <span class="mathjax-output">v-html</span><span v-html="country"></span>
    </p>
    <button @click="typeset">TypeSet</button>
    <!--<button @click.prevent="getDishes">Get Dishes</button>-->
  </div>
</template>
<script
  id="MathJax-script"
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
></script>
<script type="text/x-mathjax-config">
MathJax.Hub.Config({ TeX: { extensions: ["mhchem.js"] ,mhchem:{legacy:false}}});
</script>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import gql from "graphql-tag";
const axios = require("axios");
export default {
  name: "App",
  data() {
    return {
      id: null,
      name: "",
      country: "",
      dishes: []
    };
  },
  created() {
    this.getDishes();
  },
  methods: {
    addDish(name, country) {
      console.log(`Create Dish: ${name}`);
      // console.log("("+document.cookie+")")
      // console.log(`${name},${country}`)
      axios
        .post(
          "http://localhost:9000/graphql",
          {
            query: `
            mutation addDishShell($input: DishInput) {
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
          },
          {
            headers: { Authorization: `Bearer ${document.cookie}` }
          }
        )
        .then(result => {
          this.clearForm();
          this.getDishes();
          console.log(JSON.stringify(result.data));
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
      // location.reload();
    },
    updateDish(id, name, country) {
      console.log(`Update contact: # ${id}`);
      axios
        .post(
          "http://localhost:9000/graphql",
          {
            query: `
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
          },
          {
            headers: { Authorization: `Bearer ${document.cookie}` }
          }
        )
        .then(result => {
          this.clearForm();
          this.getDishes();
          console.log(JSON.stringify(result.data));
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
      // location.reload();
    },
    deleteDish(id) {
      console.log(`Delete dish: # ${id}`);
      axios
        .post(
          "http://localhost:9000/graphql",
          {
            query: `
            mutation deleteDish($id: ID!) {
              deleteDish(id: $id) {
                id
              }
            }
          `,
            variables: {
              id: id
            }
          },
          {
            headers: { Authorization: `Bearer ${document.cookie}` }
          }
        )
        .then(result => {
          this.clearForm();
          this.getDishes();
          console.log(JSON.stringify(result.data));
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
      // location.reload();
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
    },
    getDishes() {
      //console.log(`${document.cookie}`)
      axios
        .post(
          "http://localhost:9000/graphql",
          {
            query: `query abcd
            {
              dishes
              {id,name,country}
            }
          `
          },
          {
            headers: { Authorization: `Bearer ${document.cookie}` }
          }
        )
        .then(result => {
          this.$data.dishes = result.data.data.dishes;
          //console.log(result.data.data.dishes);
        });
      this.typeset();
    },
    typeset() {
      MathJax.typeset();
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
