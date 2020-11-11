const fs = require("fs");
module.exports = {
    configureWebpack: {
      devtool: 'source-map'
    },
    devServer: {
      https: {
        key: fs.readFileSync("./certs/localhost-key.pem"),
        cert: fs.readFileSync("./certs/localhost.pem")
      }
    }
  
  }