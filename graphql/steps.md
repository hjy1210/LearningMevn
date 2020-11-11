# MEVN GraphQL

## 安裝 mevn-cli
`npm install -g mevn-cli`
## 用 mevn-cli 建立骨架
選定要建立 MEVN 專案的上層父目錄，執行

`mevn init graphql`

* template 選項在 Default, PWA(Progressive Web App), GraphQL, Nuxt 之間選擇 GraphQL。

* 選擇需要 server side template(Express.js)

產生專案目錄 `graphql`，內有 `.mevnrc` 檔案與 `client,server` 兩子目錄。

執行
```
cd graphql
mevn serve
```
選項選 client 進行安裝客戶端，安裝完後，可瀏覽到客戶端： `http://localhost:3002/`

另啟一cmd視窗，切換到graphql專案目錄
```
mevn serve
```
選項選 server，進行安裝伺服端，安裝完後，可瀏覽到伺服端：`localhost:9000/graphql`。
	
此時 `.mevnrc` 的內容:
```
{
  "name": "graphql",
  "template": "GraphQL",
  "isConfigured": {
    "client": true,
    "server": true
  }
}
```
可以看出本專案使用 GraphQL 樣板，且已安裝客戶端與伺服端。


現在，瀏覽到 `localhost:9000/graphql`，可以在GraphiQL視窗中可以測試 GraphQL 的檢索。

GraphiQL 視窗分左右兩邊，左邊用來輸入檢索指令，右邊輸出檢索結果。左側有 `Query Variables` 按鈕，用來伸縮變數視窗。右上角有 `Doc` 按鈕，用來查看伺服端的說明文件。

在檢索視窗中輸入
```
query {
   message
}
```
再按執行按紐(往右三角形)，右邊視窗出現檢索結果：
```
{
  "data": {
    "message": "Root resolver"
  }
}
```
代表伺服端操作正常。在 `server/graphql/schema.js` 可以看到伺服端如何提供 `message` 的檢索，了解為什麼可以現在只可檢索 `message`，不能檢索其它。

## 充實 GraphQL Schema
參考 [evolution-of-writing-graphql-schema](https://medium.com/@dilipkumar/evolution-of-writing-graphql-schema-for-server-side-879907d8c698)， [running-an-express-graphql-server](https://graphql.org/graphql-js/running-an-express-graphql-server/)，[graphql-tools](https://github.com/ardatan/graphql-tools)，用較新方式提供可執行的GraphQL Schema。

用
```
npm install graphql-tools --save
```
安裝 `graphql-tools`。

利用 `graphql-tools` 裡面的 `makeExecutableSchema` 將代表schema的字串`typeDefs` 與實作的 `resolvers` 合併起來。

Note: 程式編譯時出現下列錯誤，
```
listen EADDRINUSE: address already in use :::9000 
```
可在編譯一次來解決。

安裝 `graphql-import`。

利用 `graphql-import` 裡面的 `importSchema` 將schemaDefs的內容放到外部檔案以便後續進一步的分割檔案。

## 由客戶端呼叫
參考 [apollo](https://apollo.vuejs.org/guide/installation.html#vue-cli-plugin)，建立框架時已安裝了apollo相關的組件，但
main.js 裡面 httpLink 的port要由 5000 改成 9000，如下
```
const httpLink = new HttpLink({
  // URL to graphql server, you should use an absolute URL here
  uri: "http://localhost:9000/graphql"
});
```
仔細看 [Queries](https://apollo.vuejs.org/guide/apollo/queries.html#simple-query) 這節，
特別小心命名匹配(Name matching)問題，用 Home.vue 示範如何呼叫伺服端。

## 伺服端呼叫 MongoDb 資料庫 : modelSchema
參考 [Building a GraphQL API with Node and MongoDB](https://levelup.gitconnected.com/building-your-graphql-api-with-node-and-mongodb-799a2b9ae0b4) 利用 mongoose 加以實作。

GraphQL Schema 的製作全面用javascript方式。

## 伺服端呼叫 MongoDb 資料庫 : executableSchema 
GraphQL Schema 的製作分成 `typeDefs, resolvers` 兩部分，前者為文字檔，後者為`.js`檔，再用 `grapgql-tools` 的`makeExecutableSchema` 合併之。

**初步已經可以用chefid合併Chef與Dish的資料**。關鍵碼如下：
### Mongoose Model part
```
file: dish.js
...
const dishSchema = new Schema({
    name: String,
    country: String,
    tasty: Boolean,
    chefid: String
});
...
```
### GraphQL Schema part
```
file: index.graphql
 type Dish {
     id:ID,
     name: String,
     country: String,
     tasty: Boolean,
     chefid: String
 }
 type Chef {
     id:ID,
     name: String,
     rating: Float,
     dishes: [Dish]
 }
  type Query {
    message: String,
    dishes:[Dish],
    chefs:[Chef],
    chef(id:ID):Chef,
    dish(id:ID):Dish,
    getDishes(chefid:String):[Dish]
  }
  schema {
    query: Query
  }
  ```
### GraphQL Resolver part
```
file schema.js
...
var resolvers = {
  Query: {
    ...
        getDishes:async (parent, args)=>{
            return await Dish.find({chefid:args.chefid})
        },
    ...
  },
  Chef:{
    dishes:async(parent,args)=>{
      return await Dish.find({chefid:parent.id})
    }
  }
}
...
```
### Query Panel in GraphiQL
```
{
  message,
  getDishes(chefid:"5fa002472903b100d0cc75bc"){id,name}
  dishes {
   id,
    name,
    chefid
  },
  chefs {
    id,
    name,
    dishes{name}
  },
  chef(id:"5fa002472903b100d0cc75bc"){id,name},
  d1:dish(id:"5f9fe1410d16b52c789d4631"){id,name},
  d2:dish(id:"5f9fe1050d16b52c789d4630"){id,name}
}
```
### Result panel in GRapgiQL
```
{
  "data": {
    "message": "Yang say Hello world!",
    "getDishes": [
      {
        "id": "5f9fe1410d16b52c789d4631",
        "name": "ugly"
      }
    ],
    "dishes": [
      {
        "id": "5f9fe1050d16b52c789d4630",
        "name": "beauty",
        "chefid": null
      },
      {
        "id": "5f9fe1410d16b52c789d4631",
        "name": "ugly",
        "chefid": "5fa002472903b100d0cc75bc"
      }
    ],
    "chefs": [
      {
        "id": "5fa0022c2903b100d0cc75bb",
        "name": "Yang",
        "dishes": []
      },
      {
        "id": "5fa002472903b100d0cc75bc",
        "name": "Huang",
        "dishes": [
          {
            "name": "ugly"
          }
        ]
      }
    ],
    "chef": {
      "id": "5fa002472903b100d0cc75bc",
      "name": "Huang"
    },
    "d1": {
      "id": "5f9fe1410d16b52c789d4631",
      "name": "ugly"
    },
    "d2": {
      "id": "5f9fe1050d16b52c789d4630",
      "name": "beauty"
    }
  }
}
```

## Mongoose Concepts

[這裡](https://masteringjs.io/tutorials/mongoose/promise) 說明 `.save(), .find().exec()` 的結果都是 Promise(除非用了 callback)。
Mongoose queries are thenables not promises。雖然，.find() 也是 thenable，但[Mongoose Docs](https://mongoosejs.com/docs/promises.html)說明了`.find().exec()`與`.find(`)的差別在於前者的 `error.stack` 較為清楚。

所以根據[MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)，可以 await 它們。

## 客戶端呼叫 GraphQL API
呼叫時有兩部分組成，第一部分使用 GpapgQl SDF 語言，透過gql轉譯，第二部分為javascript,提供第一部分所需的參數。

參考 [apollo.vuejs Docs](https://apollo.vuejs.org/guide/)，[building-a-crud-app-with-vue-and-graphql](https://blog.jscrambler.com/building-a-crud-app-with-vue-and-graphql/)，
Dishes.vue 實作了CRUD。

考量Vue Component 裡面程式片段的執行順序有先有後，須注意$apollo 使用 vue 的資料時可能當時還不存在，所以可以利用 created 事件處理函數來完成。

## Authenticate with jwt
* [A Brief Introduction to Securing Applications with JWT](https://livecodestream.dev/post/2020-07-31-a-brief-introduction-to-securing-applications-with-jwt/)
* [A Practical Guide to JWT Authentication with NodeJS](https://livecodestream.dev/post/2020-08-11-a-practical-guide-to-jwt-authentication-with-nodejs/)
* [express-jwt(example)](https://harshitpant.com/blog/using-json-web-token-for-authentication)
* [express-jwt(github)](https://github.com/auth0/express-jwt)

因為不知 apollo client 如何傳遞 token，改用 axios 來呼叫 GraphQL API。 
