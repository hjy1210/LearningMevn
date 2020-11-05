<template>
  <div>
    <h1>Edit Chef: {{ id }} </h1>
    <form @submit.prevent="updatePost">
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
      form:{},
      id:this.$route.params.id
    };
  },
  created: function () {
    // `this` points to the vm instance
    //console.log('a is: ' + this.a)
    this.id=this.$route.params.id;
  },
  apollo: {
    //form: gql(`
    //  query {
    //    form:chef(id:`+"\""+"5fa0022c2903b100d0cc75bb"+"\""+`){id,name,rating}
    //  },
    //`)
    form: {
      query: gql(`
        query PingId($id:String){
          form:chef(id:$id){id,name,rating}
        },
      `),
      variables(){
        return {
          id: "5fa0022c2903b100d0cc75bb"
        }
      }
    }
  },
  methods:{
    checkid: function(){
      alert(this.$data.id)
    }
  }
};
</script>

<style scoped></style>
