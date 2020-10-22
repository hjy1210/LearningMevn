# VS Code with NodeJS
## 安裝 mevn-cli
`npm install -g mevn-cli`
## 使用 mevn-cli
* 選定要建立 MEVN 專案的上層父目錄
* 執行 `mevn init <appname>`，選項選取需要`server`，而 `client` 端選取 `nuxt` 架構，產生專案目錄 `<appname>` 內有 `client,server` 兩個子目錄及 `.mevnrc` 檔案。
* 新增終端機，切換到目錄 `<appname>`，執行 `mevn serve`，選項選取 `client` 建立前端應用程式，網址為 `http://localhost:3000/`
* 再新增終端機，切換到目錄 `<appname>`，執行 `mevn serve`，選項選取 `server` 建立後端應用程式，網址為 `http://localhost:9000/api`
