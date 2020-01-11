const LocalStrategy = require("passport-local").Strategy;

const mysql = require("mysql");
const bcrypt = require("bcrypt-nodejs");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mis"
});

connection.connect(function(error) {
    if (!!error) {
        console.log(error);
    } else {

    }
});

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.e_id)
    });

    passport.deserializeUser(function(e_id, done) {
        connection.query("SELECT * FROM emplyee WHERE id = ? ", [id], function(err, rows) {
            done(err, rows[0]);
        });
    });

    passport.use("local-signup", new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },

        function(req, username, password, done) {
            connection.query("SELECT * FROM employee WHERE username = ? ", [username], function(err, rows) {
                if (err)
                    return done(err)
                if (rows.length) {
                    return done(null, false, req.flash("signupMessage", "That is already taken"));
                } else {
                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null)
                    };

                    var insertQuery = "INSERT INTO employee (username, password) values(?,?)";

                    connection.query(insertQuery, [newUserMysql.username, newUserMysql.password],
                        function(err, rows) {
                            newUserMysql.id = rows.insertId;

                            return done(null, newUserMysql);
                        })


                }

            });
        }));

    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            function(req, username, password, done) {
                connection.query("SELECT * FROM employee WHERE username = ? ", [username],
                    function(err, rows) {
                        if (err)
                            return done(err);
                        if (!rows.length) {
                            return done(null, false, req.flash('loginMessage', 'No User Found'));
                        }
                        if (!bcrypt.compareSync(password, rows[0].password))
                            return done(null, false, req.flash('loginMessage', 'Wrong Password'));

                        return done(null, rows[0]);
                    });
            })
    );
}