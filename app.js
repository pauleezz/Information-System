const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const port = process.env.PORT || 3000;

// const session = require("express-session");
// const cookieParser = require("cookie-parser");
// const morgan = require("morgan");
// const passport = require("passport");
// const flash = require("connect-flash");

// require("./config/passport")(passport);
// app.use(morgan("dev"));
// app.use(cookieParser);
// app.use(session({
//     secret: "justasecret",
//     resave: true,
//     saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

const indexRoutes = require("./routes/index");
const customerRoutes = require("./routes/customer");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/order");
const inventoryRoutes = require("./routes/inventory");
const methodOverride = require("method-override");

app.use(methodOverride('_method'));
app.use(indexRoutes);
app.use(customerRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(inventoryRoutes);
app.use(express.static(__dirname + "/public"));


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

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.listen(port, () => {
    console.log("Server is listening at " + port + "...");
});


// users
// administrator
// inventory
// products
// order