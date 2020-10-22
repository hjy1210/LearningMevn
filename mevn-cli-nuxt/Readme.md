# VS Code with NodeJS
## 安裝 mevn-cli
`npm install -g mevn-cli`
## 用 mevn-cli 建立骨架
* 選定要建立 MEVN 專案的上層父目錄
* 執行 `mevn init <appname>`，選項選取需要`server`，而 `client` 端選取 `nuxt` 架構，產生專案目錄 `<appname>` 內有 `client,server` 兩個子目錄及 `.mevnrc` 檔案。
* 新增終端機，切換到目錄 `<appname>`，執行 `mevn serve`，選項選取 `client` 建立前端應用程式，網址為 `http://localhost:3000/`
* 再新增終端機，切換到目錄 `<appname>`，執行 `mevn serve`，選項選取 `server` 建立後端應用程式，網址為 `http://localhost:9000/api`

## 新增頁面(Page)
執行 `mevn generate`，選項中選Page，取適當的名字，例如 `Home`。這會在pages字幕錄下產生 `Home.vue` 檔案。瀏覽的路徑為 `http://localhost:3000/home`。
注意：
* 開發時，不知道為什麼同時瀏覽 `/` 與 `/home` 會停頓下來。
* `.vue` 檔案的格式要求很嚴，譬如下一層比前一層必須退縮兩個空白。
