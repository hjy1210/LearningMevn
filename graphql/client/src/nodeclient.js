const axios = require("axios");
axios({
  url: "http://localhost:9000/graphql",
  method: "post",
  data: {
    query: `query abcd
    {
        form:chef(id:"5fa206adf618a8299c97dc41")
        {id,name,rating,dishes{id,name}}
    }
    `
  }
}).then(result => {
  console.log(result.data);
});
