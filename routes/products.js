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


//PRODUCTS SHOW
router.get("/product", (req, res) => {
    connection.query("SELECT * FROM products", (err, rows, fields) => {
        if (!err) {
            // console.log(rows);
            res.render("product/index", { rows: rows });
        } else {
            console.log(err)
        }
    });

});

//PRODUCT NEW
router.get("/product/new", (req, res) => {
    res.render("product/new");
});

router.post("/product", urlencodedParser, (req, res) => {
    let newprod_name = req.body.prod_name;
    let newcategory = req.body.category;
    let newstock_quantity = req.body.stock_quantity;
    let newprice = req.body.price;
    let newrequire_time = req.body.require_time;
    let newdescription = req.body.description;
    let newprod_photo = req.body.prod_photo;
    let sql = `INSERT INTO products SET prod_name = '${newprod_name}', category = '${newcategory}', stock_quantity = ${newstock_quantity}, price = ${newprice}, require_time = ${newrequire_time}, description = '${newdescription}', prod_photo = '${newprod_photo}'`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.redirect("/product")
    });
});
//PRODUCT SHOW
router.get("/product/:id", (req, res) => {
    let newid = req.params.id
    connection.query(`SELECT *,DATE_FORMAT(expiration_date,'%Y/%m/%d') as expiration_date FROM products LEFT JOIN inventory ON products.prod_id = inventory.prod_id WHERE products.prod_id =${newid} ORDER BY inventory.expiration_date DESC LIMIT 1`,  (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.render("product/show", { rows: rows[0] });
        } else {
            console.log(err);
        }
    });

});
//PRODUCT EDIT 
router.get("/product/:id/edit", (req, res) => {
    connection.query("SELECT * FROM products WHERE prod_id = ? ", [req.params.id], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.render("product/edit", { rows: rows[0] });
        } else {
            console.log(err);
        }
    });
});

router.put("/product/:id", urlencodedParser, (req, res) => {
    let newprod_name = req.body.prod_name;
    let newcategory = req.body.category;
    let newstock_quantity = req.body.stock_quantity;
    let newprice = req.body.price;
    let newrequire_time = req.body.require_time;
    let newdescription = req.body.description;
    let newprod_photo = req.body.prod_photo;
    let newprod_id = req.params.id;
    let sql = `UPDATE products SET prod_name = "${newprod_name}", category = "${newcategory}", stock_quantity = ${newstock_quantity}, price = ${newprice}, require_time = ${newrequire_time}, description = "${newdescription}", prod_photo = "${newprod_photo}" WHERE prod_id = ${newprod_id} `;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect("/product");
    });
});
//PRODUCT DESTROY
router.delete("/product/:id", urlencodedParser, (req, res) => {
    let sql = `DELETE FROM products WHERE prod_id = ${req.params.id}`;
    connection.query(sql, (err, rows, fields) => {
        if (!err) {
            // console.log(rows);
            res.redirect("/product")
        } else {
            console.log(err);
        }

    })
});

module.exports = router;


