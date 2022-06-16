const express = require('express')
const mysql = require('mysql');
const app = express()
const port = 3000

var conn = mysql.createConnection({
    host: "db",
    user: "root",
    password: "9632",
    database: "nodedb"
});

conn.connect((err) => {
    if (err) throw err;
    
    const create = "CREATE TABLE IF NOT EXISTS `users` (`id` int NOT NULL auto_increment, `name` varchar(255) NOT NULL default '', PRIMARY KEY (`id`))"
    conn.query(create, (err, res) => {
        if (err) throw err;

        const insert = "INSERT INTO `users` (name) SELECT * FROM (SELECT 'Alan') AS Tmp WHERE NOT EXISTS (SELECT `name` FROM `users` WHERE name = 'Alan')"
        conn.query(insert, (err, res) => {
            if (err) throw err;
        })
    });    
});

app.get('/', (req, res) => {
    var msg = "<div style='font-family:sans-serif;'><h1>Fullcycle</h1>";

    conn.query("SELECT name FROM `users` WHERE `id` = 1", (err, result) => {
        msg += "<p>" + result[0].name + "</p></div>";
        console.log(result);
        res.send(msg);
    })
});

app.listen(port, () => {
    console.log("Rodando na porta " + port);
});