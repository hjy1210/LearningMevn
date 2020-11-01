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