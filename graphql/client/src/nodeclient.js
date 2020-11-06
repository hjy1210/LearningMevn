const axios = require("axios");
axios({
  url: "http://localhost:9000/graphql",
  method: "post",
  data: {
    query: `query abcd
    {
        form:chef(id:"5fa0022c2903b100d0cc75bb")
        {id,name,rating,dishes{id,name}}
    }
    `
  }
}).then(result => {
  console.log(result.data);
});
