# VS Code with NodeJS
## 安裝 mevn-cli
`npm install -g mevn-cli`
## 用 mevn-cli 建立骨架
* 選定要建立 MEVN 專案的上層父目錄
* 執行 `mevn init <appname>`，選項選取需要`server`，而 `client` 端選取 `nuxt` 架構，產生專案目錄 `<appname>` 內有 `client,server` 兩個子目錄及 `.mevnrc` 檔案。
* 新增終端機，切換到目錄 `<appname>`，執行 `mevn serve`，選項選取 `client` 建立前端應用程式，網址為 `http://localhost:3000/`
* 再新增終端機，切換到目錄 `<appname>`，執行 `mevn serve`，選項選取 `server` 建立後端應用程式，網址為 `http://localhost:9000/api`

## 新增頁面(Page)與連結
執行 `mevn generate`，選項中選client端,
取 `create` 當名字，選取 `Page Component`。這會在 `pages` 子目路錄下產生 `create.vue` 檔案。瀏覽的路徑為 `http://localhost:3000/create`。
注意：
* 開發時，不知道為什麼同時瀏覽 `/` 與 `/create` 會停頓下來。
* `.vue` 檔案的格式要求很嚴，譬如下一層比前一層必須退縮兩個空白，這是eslint.js在作祟，可用 vetur 的模式格式化文件。

依樣畫葫蘆，產生 users/_id_.vue, users/index.vue。

參考[NuxtJS routing](https://nuxtjs.org/guides/get-started/routing)，在 `index.vue` 裡面增加到 create.vue, users/index.vue 的連結。

users.vue 裡面 Edit NuxtLink 善用v-bind 屬性 to 時字串可以是single javascript expression。`:to="'/' + user._id"`，讓 NuxtLink 可以動態連結。

create.vue, _id.vue 利用 `this.$router.push({ name: 'users' })` [this.$router.push](https://github.com/nuxt/nuxt.js/issues/1616)回到 `/users`

完成初步的程式，server端提供服務，讓client端可以完成：閱覽users清單、新增user, 編輯user, 刪除user。

## form
將 create.vue 修改成有 form 以便上傳資料。

## CRUD
執行 `mevn generate`,選取 `CRUD Boilerplate (server)`，提供 `MongoDB URI path(mongodb://localhost:27017)`，建立CRUD的框架。框架中連結的資料庫為userdb，collection為users。

試驗性的，用 `mongo shell`，執行下面指令，
* `use userdb`
* `db.users.insertOne({name:"Yang",age:71})`

在 userdb.users 新增一筆資料，瀏覽到 http://localhost:9000/api 
可查到資料，可見框架有效。

