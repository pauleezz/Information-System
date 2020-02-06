# 熊媽媽產銷系統
## 一、	前言

熊媽媽買菜網為線上蔬果批發網，販賣內容物主要為蔬菜、水果、肉品、海鮮、南北貨、米麵等等。其特色為可以指定送到的時間，讓忙碌的上班族不用到生鮮市場或傳統市場採買，下班之後可以在家等待訂的貨品宅配到府。我們以這樣的線上蔬果批發網站為模型，打造可供員工使用、管理庫存、做出行銷決策的產銷系統。

## 二、	系統功能
* 作業管理
    1.	新增/修改/刪除/查詢商品資料
    2.	新增/修改/刪除/查詢庫存資料
    3.	新增/修改/刪除/查詢訂單資料
    4.	再訂購點的提醒：使用移動平均法預測需求，並在到達再訂購點時提醒管理者該訂購商品。
    ［公式：再訂購點：平均需求＊前置時間 + 安全存量
		安全存量 = Z值＊標準差＊√(前置時間)
		Z值：90%：1.3 （表示有90%的機率不會缺料）〕
    5.	保存日期監控：顯示出保存日期小於3天的產品，可用於促銷。

* 行銷管理
    1.	月銷量及月成長量之折線圖：讓管理者可以輕鬆看出每個月之間的變化量。
    2.	銷售類別分析：讓管理者看出每種產品類別的銷售佔比，以調整行銷決策。
    3.	優惠券：
        I.	分析出90天以上未購物之顧客，並寄送折價優惠券
        II.	寄送生日優惠券給當月生日之顧客
        III.	週年慶時寄送優惠券給所有顧客

* 顧客管理分析
    1.	新增/修改/刪除/查詢顧客基本資料
    2.	RFM分析顧客群：透過RFM分析找出最具價值的顧客，並針對該群顧客做行銷推廣。

## 三、	系統分析設計

* DFD Diagram
    1.	作業管理
         ![](https://i.imgur.com/yck3052.png)
    2.	行銷管理
        level 0
         ![](https://i.imgur.com/YN4XtjG.png)
        level 1
         ![](https://i.imgur.com/8bZw9rY.png)
         ![](https://i.imgur.com/kcbQ4gA.png)
        ![](https://i.imgur.com/uej6SOR.png) 
    3.	顧客管理
         ![](https://i.imgur.com/Y62biA0.png)

* ER圖
    ![](https://i.imgur.com/IxSyHPw.png)

* PERT Chart
![](https://i.imgur.com/AQdHyKS.png)

* Gantt Chart
![](https://i.imgur.com/KDQaOW1.png)

* 系統開發工具
    前端：HTML, CSS, JavaScript, Express
    後端：Node.js
    資料庫：MySQL (PHPMyAdmin)

## 四、	使用說明：
* 網址
    http://140.119.19.41:3000
* Index
    ![](https://i.imgur.com/WJ0VgPl.png)
    RFM Analysis:依照顧客RFM分組排序，排序越前，越有行銷價值
    ![](https://i.imgur.com/f3h7vRL.png)
    Sales Performance:各月份銷售額與銷售成長率
    ![](https://i.imgur.com/PHxVgTV.png)
    Sales Category Analysis:各類別占總銷售額的比例
    ![](https://i.imgur.com/3f39lls.png)
    Coupon Analysis:自動篩選90天以上未登入的顧客，並選擇優惠券種類寄到顧客信箱
    ![](https://i.imgur.com/xgXN15p.png)
    Re-order Point:提醒管理者需要再訂購的產品
    ![](https://i.imgur.com/P5ZY1YY.png)
    Expiration Sales: 找出三天內即將過期的產品做出清
    ![](https://i.imgur.com/RQvRHzh.png)

* Product
    Product Inex Page：
    ![](https://i.imgur.com/DWur7W0.png)
    New Product：
    ![](https://i.imgur.com/w3V49NR.png)
    ＊New Product後，會自動產生其product ID
    可在 SHOW ALL PRODUCT內查看。

    More info：
    ![](https://i.imgur.com/NAHBb5g.png)

* Order
    Order Index Page
    ![](https://i.imgur.com/xIcABD0.png)
    New Order：
    
    ＊注意：New Order內填寫的Customer ID 必須為Customer列表存在的顧客Product ID必須為存在於Product 列表的產品。
    ![](https://i.imgur.com/lmbwLdW.png)
    ＊新增完一筆新訂單後，會自動產生其Order ID，可在Show All Order查看此筆訂單詳細資料及加總金額。

* Inventory
    Inventory Index Page
    ![](https://i.imgur.com/0Ippv5c.png)
    New Inventory
    ＊注意：New Inventory內填寫的Product ID必須為存在於Product 列表的產品。

    ![](https://i.imgur.com/i24pZqZ.png)

* Customer
    ![](https://i.imgur.com/0Piu3zL.png)
    Customer Index Page

    New Customer
    ![](https://i.imgur.com/F77HfdQ.png)
    ＊New Customer後，會自動產生其Customer ID可在 Show All Customer內查看

More info
![](https://i.imgur.com/jNpD39W.png)




