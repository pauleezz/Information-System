const express = require("express");
const router = express.Router({ mergeParams: true });
const mysql = require("mysql");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pms"
});

connection.connect(function(error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log("DB Connected");
    }
});

//ORDERS SHOW
router.get("/order", (req, res) => {
    connection.query("SELECT * ,DATE_FORMAT(order_date,'%Y %M %D') as order_date FROM orders", (err, rows, fields) => {
        if (!err) {
            res.render("order/index", { rows, rows });
        } else {
            console.log(err)
        }
    });
});


//ORDER NEW
router.get("/order/new", (req, res) => {
    res.render("order/new");
});
router.post("/order", urlencodedParser, (req, res) => {
    let newc_id = req.body.c_id; //要已存在的c_id
    let newd_id = req.body.d_id; //要已存在的d_id
    // let newtotal_price = req.body.total_price
    let neworder_date = req.body.order_date;
    let newprod_id = req.body.prod_id;
    let newquantity = req.body.quantity;
    r = req.body;
    delete r.c_id;
    delete r.d_id;
    delete r.order_date;
    
    var sendSQL = []
    for (key in r ){
        temp = [];
        temp.push(parseInt( r[key][0], 10));
        temp.push(parseInt( r[key][1], 10));
        sendSQL.push(temp);
    }

//     let sql1 =  `INSERT INTO orders SET c_id=${newc_id}, d_id = ${newd_id}, order_date = "${neworder_date}", total_price=0`;
//     connection.query(sql1, (err, result) => {
//     if (err) throw err;
//     let sql2 = `INSERT INTO items SET prod_id = ${newprod_id}, quantity =  ${newquantity}, order_num = (SELECT LAST_INSERT_ID());`;
//     connection.query(sql2, (err, result) => {
//         if (err) throw err;
//         res.redirect("/order");
//     });
// });

let sql1 =  `INSERT INTO orders SET c_id=${newc_id}, d_id = ${newd_id}, order_date = "${neworder_date}", total_price=0`;
    connection.query(sql1, (err, result) => {
    if (err) throw err;
        let sql2 = "SELECT LAST_INSERT_ID()"
        connection.query(sql2, (err, result2) => {
        if (err) throw err;
        var ordernum = Object.values(result2[0])[0]
        
        sendSQL.forEach(element=>{
            element.push(ordernum);
        })
        sendSQL.push()
            let sql3 = "INSERT INTO items (prod_id, quantity, order_num) VALUES?";
            var values = sendSQL;
            connection.query(sql3,[values], (err, result3) => {
            if (err) throw err;
            res.redirect("/order");
    });
    });
});


});

//ORDER SHOW
router.get("/order/:id", (req, res) => {
    connection.query("SELECT orders.order_num, customer.c_id, customer.c_name, items.prod_id, products.prod_name, items.quantity, products.price,orders.total_price, items.quantity*products.price AS SUM FROM items JOIN orders ON items.order_num = orders.order_num JOIN products ON items.prod_id = products.prod_id JOIN customer ON orders.c_id = customer.c_id WHERE orders.order_num = ?", [req.params.id], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            console.log(typeof rows)
            res.render("order/show", { rows: rows });
        } else {
            console.log(err)
        }
    });
});

//ORDER EDIT
router.get("/order/:id/edit", (req, res) => {
    connection.query("SELECT * FROM orders WHERE order_num = ? ", [req.params.id], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.render("product/" + req.params.id + "/edit", { rows: rows[0] });
        } else {
            console.log(err)
        }
    });
});
router.put("/order/:id", urlencodedParser, (req, res) => {
    let newc_id = 1; //要已存在的c_id
    let newd_id = 1; //要已存在的d_id
    let neworder_date = '2019/12/24';
    let newtotal_price = 5000;
    let sql = `UPDATE orders SET c_id = '${newc_id}', d_id = ${newd_id},order_date =${neworder_date}, total_price = ${newtotal_price} WHERE order_num = ?`;
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("done.")
    });

});
//ORDER DESTROY
router.delete("/order/:id", urlencodedParser, (req, res) => {
    let sql = `DELETE FROM orders WHERE order_num = ${req.params.id}`;
    connection.query(sql, (err, rows, fields) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(err);
        }
        res.send('done');

    });
});

module.exports = router;