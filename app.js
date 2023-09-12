const express = require('express');
const mysql = require('mysql');
const app = express();
const ejs = require('ejs'); 
const path = require('path');


app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'worldline'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

app.post('/submit', (req, res) => {
    const { name, age, course, dept, gender } = req.body;
    const sql = 'INSERT INTO students (name, age, course, dept, gender) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, age, course, dept, gender], (err, result) => {
        if (err) throw err;
        console.log('Student data inserted');
        res.redirect('/students');
    });
});

app.get('/students', (req, res) => {
    const sql = 'SELECT * FROM students';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('students', { students: results }); 
    });
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
