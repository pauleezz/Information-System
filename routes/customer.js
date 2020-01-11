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

//USERS SHOW
router.get("/customer", (req, res) => {
    connection.query("SELECT *,DATE_FORMAT(birthday,'%Y %M %D') as birthday FROM customer", (err, rows, fields) => {
        if (!err) {
            // console.log(rows);
            res.render("customer/index", { rows: rows });
        } else {
            console.log(err)
        }
        // res.send('ok');

    });
});

//CUSTOMER NEW
router.get("/customer/new", (req, res) => {
    res.render("customer/new");
})


router.post("/customer", urlencodedParser, (req, res) => {
    let newc_name = req.body.c_name;
    let newc_password = req.body.c_password;
    let newbirthday = req.body.birthday;
    let newgender = req.body.gender;
    let newphone = req.body.phone;
    let newemail = req.body.email;
    let newaddress = req.body.address;
    let sql = `INSERT INTO customer SET c_name = '${newc_name}', c_password = "${newc_password}", birthday = "${newbirthday}", gender = "${newgender}", phone = "${newphone}", email = "${newemail}", address = "${newaddress}"`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.redirect("/customer");
    });
});

//CUSTOMER SHOW
router.get("/customer/:id", (req, res) => {
    connection.query("SELECT * ,DATE_FORMAT(birthday,'%Y-%m-%d') as birthday FROM customer WHERE c_id = ? ", [req.params.id], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.render("customer/show", { rows: rows[0] });
        } else {
            console.log(err);
        }
    });
});

//USER EDIT
router.get("/customer/:id/edit", (req, res) => {
    connection.query("SELECT * ,DATE_FORMAT(birthday,'%Y-%m/-d') as birthday FROM customer WHERE c_id = ? ", [req.params.id], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.render("customer/edit", { rows: rows[0] });
        } else {
            console.log(err);
        }
    });

})
router.put("/customer/:id", urlencodedParser, (req, res) => {
    let newc_name = req.body.c_name;
    let newc_password = req.body.c_password;
    let newbirthday = req.body.birthday;
    let newgender = req.body.gender;
    let newphone = req.body.phone;
    let newemail = req.body.email;
    let newaddress = req.body.address;
    let sql = `UPDATE customer SET c_name = '${newc_name}', c_password = "${newc_password}", birthday = "${newbirthday}", gender = "${newgender}", phone = "${newphone}", email = "${newemail}", address = "${newaddress}" WHERE c_id = ?`;
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect("/customer");
    });

});

//USER DESTROY
router.delete("/customer/:id", urlencodedParser, (req, res) => {
    let sql = `DELETE FROM customer WHERE c_id = ${req.params.id}`;
    connection.query(sql, (err, rows, fields) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(err);
        }
        res.redirect("/customer");
    });
});

module.exports = router;