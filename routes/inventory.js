const express = require("express");
const router = express.Router();
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

//INVENTORY SHOW
router.get("/inventory", (req, res) => {
    connection.query("SELECT *,DATE_FORMAT(i_date,'%Y %M %D') as i_date,DATE_FORMAT(expiration_date,'%Y %M %D') as expiration_date FROM inventory ", (err, rows, fields) => {
        if (!err) {
            res.render("inventory/index", { rows: rows });
        } else {
            console.log(err)
        }
    });
});
//INVENTORY NEW
router.get("/inventory/new", (req, res) => {
    res.render("inventory/new");
});
router.post("/inventory", urlencodedParser, (req, res) => {
    let newprod_id = req.body.prod_id;
    let newi_quantity = req.body.i_quantity;
    let newi_price = req.body.i_price;
    let newi_date = req.body.i_date;
    let newexpiration_date = req.body.expiration_date;
    let sql = `INSERT INTO inventory SET prod_id = ${newprod_id}, i_quantity = ${newi_quantity}, i_price = ${newi_price}, i_date ='${newi_date}', expiration_date = '${newexpiration_date}' `;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.redirect("/inventory")
    });
});
//INVENTORY EDIT 
router.get("/inventory/:id/edit", (req, res) => {
    connection.query("SELECT * FROM inventory WHERE i_id = ? ", [req.params.id], (err, rows, fields) => {
        if (!err) {
            console.log(rows)
            res.render("inventory/edit", { rows: rows[0] });
        } else {
            console.log(err)
        }
    });
    //res.render("inventory/edit");
})
router.put("/inventory/:id", urlencodedParser, (req, res) => {
    let newprod_id = 4;
    let newi_quantity = 50;
    let newi_price = 2000;
    let newi_date = '2019-12-25';
    let newexpiration_date = '2019-12-27';
    let sql = `UPDATE inventory SET prod_id = ${newprod_id}, i_quantity = ${newi_quantity}, i_price = ${newi_price}, i_date ='${newi_date}', expiration_date = '${newexpiration_date}' WHERE i_id = ?`;
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("done.");
    });
});
//INVENTORY DESTROY
router.delete("/inventory/:id", urlencodedParser, (req, res) => {
    let sql = `DELETE FROM inventory WHERE i_id = ${req.params.id}`;
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