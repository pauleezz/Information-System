const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const passport = require("passport");
var async = require('async');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pms",
    multipleStatements:true
});

connection.connect(function(error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log("DB Connected");
    }
});

router.get("/", (req, res) => {

    // async.parallel([
    //     function(callback) {
    //         var queryData = "SELECT customer.c_id, customer.c_name, customer.email, CONCAT( '{', NTILE(2) OVER(ORDER BY max(orders.order_date)), ', ', NTILE(2) OVER(ORDER BY COUNT(*)), ', ', NTILE(2) OVER(ORDER BY AVG(orders.total_price)), '}') as rfm FROM orders JOIN customer ON orders.c_id = customer.c_id GROUP BY c_id ORDER BY rfm DESC";
    //         connection.query(queryData, function (err, rows1) {
    //             if (err) {
    //                 return callback(err);
    //             }
    //             return callback(null, rows1);
    //         });
    //     },
    //     function(callback) {
    //         connection.query("SELECT thisMonth.MonthOnly, SUM(thisMonth.sales) AS ThisMonthSales, CONCAT((SUM(thisMonth.sales) / SUM(lastMonth.sales) - 1) * 100,' %') AS Growth FROM ( SELECT DATE_FORMAT(order_date, '%Y %m') AS MonthOnly, SUM(total_price) AS sales FROM orders GROUP BY DATE_FORMAT(order_date, '%Y %m') ) thisMonth LEFT OUTER JOIN ( SELECT DATE_FORMAT(DATE_ADD(order_ustomer.c_id, customer.c_name, customer.email, CONCAT( '{', NTILE(2) OVER(ORDER BY max(orders.order_date)), ', ', NTILE(2) OVER(ORDER BY COUNT(*)), ', ', NTILE(2) OVER(ORDER BY AVG(orders.total_price)), '}') as rfm FROM orders JOIN customer ON orders.c_id = customer.c_id GROUP BY c_id ORDER BY rfm DESC", function (err, rows2) {
    //             if (err) {
    //                 return callback(err);
    //             }
    //             return callback(null, rows2);
    //         });
    //     }
    // ], function(error, callbackResults) {
    //     if (error) {
    //         //handle error
    //         console.log(error);
    //     } else {
    //         console.log(callbackResults[0]); // rows1
    //         console.log(callbackResults[1]); // rows2
    //         // use this data to send back to client etc.
    //     }
    // });

    // connection.query("SELECT customer.c_id, customer.c_name, customer.email, CONCAT( '{', NTILE(2) OVER(ORDER BY max(orders.order_date)), ', ', NTILE(2) OVER(ORDER BY COUNT(*)), ', ', NTILE(2) OVER(ORDER BY AVG(orders.total_price)), '}') as rfm FROM orders JOIN customer ON orders.c_id = customer.c_id GROUP BY c_id ORDER BY rfm DESC" ,(err, rows, fields) => {
    //     if (!err) {
    //         // console.log(rows);
    //         res.render("index", { rows:rows });
    //     } else {
    //         console.log(err)
    //     }
    // });

    connection.query("SELECT customer.c_id, customer.c_name, customer.email, CONCAT( '{', NTILE(2) OVER(ORDER BY max(orders.order_date)), ', ', NTILE(2) OVER(ORDER BY COUNT(*)), ', ', NTILE(2) OVER(ORDER BY AVG(orders.total_price)), '}') as rfm FROM orders JOIN customer ON orders.c_id = customer.c_id GROUP BY c_id ORDER BY rfm DESC" ,(err, rows1) => {
        if (!err) {
            // console.log(rows);
            // res.render("index", { rows:rows });
            connection.query("SELECT thisMonth.MonthOnly, SUM(thisMonth.sales) AS ThisMonthSales, CONCAT((SUM(thisMonth.sales) / SUM(lastMonth.sales) - 1) * 100,' %') AS Growth FROM ( SELECT DATE_FORMAT(order_date, '%Y %m') AS MonthOnly, SUM(total_price) AS sales FROM orders GROUP BY DATE_FORMAT(order_date, '%Y %m') ) thisMonth LEFT OUTER JOIN ( SELECT DATE_FORMAT(DATE_ADD(order_date, INTERVAL 1 MONTH), '%Y %m ') AS MonthOnly, SUM(total_price) AS sales FROM orders GROUP BY DATE_FORMAT(order_date, '%Y%m') ) lastMonth ON thisMonth.MonthOnly = lastMonth.MonthOnly GROUP BY thisMonth.MonthOnly ORDER BY MonthOnly" ,(err, rows2) => {
        
                if (!err) {
                    // console.log(rows)
                    connection.query("SELECT products.category, SUM(quantity) FROM items JOIN products ON items.prod_id = products.prod_id JOIN orders ON items.order_num = orders.order_num GROUP BY category" ,(err, rows3) => {
        
                        if (!err) {
                            connection.query("SELECT customer.c_id, c_name, email, DATE_FORMAT(MAX(order_date),'%Y/%m/%d') as last_order_date, DATEDIFF(NOW(), MAX(orders.order_date)) as last_days FROM customer JOIN orders ON customer.c_id = orders.c_id GROUP BY orders.c_id HAVING DATEDIFF(NOW(), MAX(orders.order_date)) >90" ,(err, rows4) => {
                                if (!err) {
                                    connection.query("SELECT items.prod_id, products.prod_name, SUM(quantity)/COUNT(*) as predict , products.stock_quantity, SUM(quantity)/COUNT(*)*products.require_time/7 + SUM(quantity)/COUNT(*) AS reorder FROM items JOIN products ON items.prod_id = products.prod_id JOIN orders ON items.order_num = orders.order_num GROUP BY prod_id HAVING products.stock_quantity < reorder" ,(err, rows5) => {
                                        if (!err) {
                                            connection.query("SELECT products.prod_id, products.prod_name, DATE_FORMAT(MAX(inventory.expiration_date),'%Y/%m/%d') as date FROM products JOIN inventory ON products.prod_id = inventory.prod_id GROUP BY products.prod_id HAVING DATEDIFF(date, NOW()) BETWEEN 0 AND 3" ,(err, rows6) => {
                                                if (!err) {
                                                    res.render("index", {rows1 : rows1, rows2 :  JSON.stringify(rows2),rows3 :  JSON.stringify(rows3), rows4 : rows4, rows5 : rows5, rows6 : rows6});
                                                } else {
                                                    console.log(err)
                                                }
                                            });
                                        } else {
                                            console.log(err)
                                        }
                                    });
                                } else {
                                    console.log(err)
                                }
                            });
                            
                        } else {
                            console.log(err)
                        }
                    });
                    // res.render("index", {rows1:rows1, rows2 :  JSON.stringify(rows2)});
                } else {
                    console.log(err)
                }
            });
        } else {
            console.log(err)
        }
    });
    

    // connection.query("SELECT thisMonth.MonthOnly, SUM(thisMonth.sales) AS ThisMonthSales, CONCAT((SUM(thisMonth.sales) / SUM(lastMonth.sales) - 1) * 100,' %') AS Growth FROM ( SELECT DATE_FORMAT(order_date, '%Y %m') AS MonthOnly, SUM(total_price) AS sales FROM orders GROUP BY DATE_FORMAT(order_date, '%Y %m') ) thisMonth LEFT OUTER JOIN ( SELECT DATE_FORMAT(DATE_ADD(order_date, INTERVAL 1 MONTH), '%Y %m ') AS MonthOnly, SUM(total_price) AS sales FROM orders GROUP BY DATE_FORMAT(order_date, '%Y%m') ) lastMonth ON thisMonth.MonthOnly = lastMonth.MonthOnly GROUP BY thisMonth.MonthOnly ORDER BY MonthOnly" ,(err, rows, fields) => {
        
    //     if (!err) {
    //         // console.log(rows)
    //         res.render("index", { rows :  JSON.stringify(rows)});
    //     } else {
    //         console.log(err)
    //     }
    // });
    
     //console.log(chartData[city]); res.render('index', { db_data: chartData }); });
    
})

//LOGIN SHOW
router.get("/login", (req, res) => {
    res.render("login");
});

//LOGIN POST
router.post("/login", (req,res)=> {
    res.redirect('/');
});
//LOGOUT
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
module.exports = router;