# 支出紀錄

本網站程式可以記錄每一筆支出，並依照登入者分開紀錄

## 開發作業系統

- macOS Sierra 10.12.6

## 使用軟體及套件

- bcryptjs: ^2.4.3,

- body-parser: ^1.19.0,

- connect-flash: ^0.1.1,

- dotenv: ^8.0.0,

- express: ^4.17.1,

- express-handlebars: ^3.1.0,

- express-session: ^1.16.2,

- express-validator: ^6.1.1,

- method-override: ^3.0.0,

- mongoose: ^5.6.2,

- passport: ^0.4.0,

- passport-facebook: ^3.0.0,

- passport-google-oauth: ^2.0.0,

- passport-local: ^1.0.0

- [MongoDB](https://www.mongodb.com/download-center/community) 4.0.10

## 安裝

- 安裝 MongoDB

至 MongoDB 下載完成後可以在下子資料夾找到`mongodb-osx-ssl-x86_64-4.0.5.tgz`資料夾，更名為`mongodb`後移至專案資料夾目錄，並於同一層建立`mongodb-data`資料夾。
接著開啟終端機並輸入

```
$ cd 專案資料夾位址/mongodb/bin
$ ./mongod --dbpath /Users/[使用者名稱]/專案資料夾位址/mongodb-data
```

如此資料庫已經開始運作，此終端機請務必保持開啟

可以下載安裝[Robo 3T](https://robomongo.org/download)操作資料庫

> 也可以另外開一個新的終端機，一樣移動到/mondodb/bin 路徑並輸入`./mongo`來操作資料庫，Robo 3T 為圖形介面較為人性化

接著開啟新的終端機輸入

```
cd 資料夾名稱 // 移動到指定資料夾
```

或輸入

```
mkdir 資料夾名稱 // 創建新資料夾
```

並在此資料夾中依序輸入

```
git clone https://github.com/F-Kibatodos/tally-book.git  // 將此專案下載到資料夾
cd tally-book                                            // 移動到專案資料夾
npm install                                              // 下載相關npm套件
npm run seeder                                           // 執行種子檔案
npm run dev                                              // 執行專案
```

接著就可以在網頁輸入http://localhost:3000見到頁面

## 環境變數設定

請於專案資料夾根目錄下，新增一`.env`檔案
並且寫入

```
FACEBOOK_ID='個人的facebook開發專案id'
FACEBOOK_SECRET='個人的facebook開發專案secret'
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
GOOGLE_ID='個人用戶端的google開發專案id'
GOOGLE_SECRET='個人用戶端的google開發專案密碼'
GOOGLE_CALLBACK=http://localhost:3000/auth/google/callback
```

## Heroku

本程式已在 Heroku[部署](https://boiling-ridge-88039.herokuapp.com/)

- 信箱: hiroshi@nohara.com
- 密碼 Aa12345678

## 功能說明

- 新增、修改、刪除一筆支出
- 顯示支出總額
- 隨金額便大會有不同顏色
- 可按月份或類別作出篩選
- 可依照日期、花費做排序
- 使用者須註冊並登入才可以使用，也可以使用 Facebook 或 Google 登入
- 使用者可以更改自己的名稱和密碼
- 可以用種子檔案作成的兩位使用者先登入，依序為
  - email: hiroshi@nohara.com 密碼: 12345678
  - email: misae@nohara.com 密碼: 12345678
- 密碼經過雜湊成為亂數，使用者請務必記得
- 註冊時檢查使用者名稱及密碼格式

## 使用情形

- 首頁
  ![](https://i.imgur.com/wued5Tx.png)

- 登入
  ![](https://github.com/F-Kibatodos/tally-book/blob/master/%E6%94%AF%E5%87%BA/%E7%99%BB%E5%85%A5.gif)

- 新增
  ![](https://github.com/F-Kibatodos/tally-book/blob/master/%E6%94%AF%E5%87%BA/%E6%96%B0%E5%A2%9E.gif)

- 修改、刪除
  ![](https://github.com/F-Kibatodos/tally-book/blob/master/%E6%94%AF%E5%87%BA/%E4%BF%AE%E6%94%B9%E5%88%AA%E9%99%A4.gif)

- 篩選、排序
  ![](https://github.com/F-Kibatodos/tally-book/blob/master/%E6%94%AF%E5%87%BA/%E7%AF%A9%E9%81%B8%E6%8E%92%E5%BA%8F.gif)

### 作者

[F-Kibatodos](https://github.com/F-Kibatodos)
