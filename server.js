const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 5001;
const cors = require("cors"); 

const db = mysql.createConnection({
    host: 'srv1132.hstgr.io',  // Use this instead of '127.0.0.1'
    user: 'u892098652_LOATx',
    password: 'nIZX6aNboN',
    database: 'u892098652_rCn6j'
});

app.use(cors());
app.use(express.json());

// app.get("/api/posts/", (res, req) => {
//     db.query("SELECT * FROM wp_posts WHERE post_status = 'publish'", (err, results) => {
//         if(err){
//             return res.status(500).json({ error: err.message });
//         }
//         res.json(results);
//     });
// });
// ✅ Corrected the order (req, res)
app.get("/api/posts", (req, res) => {
    db.query("SELECT * FROM wp_posts WHERE post_status = 'publish'", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

db.connect((err) => {
    if(err){
        console.error("Database connection failed: ", err);
        return;
    } 
    console.log("Connected to WordPress database!");
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
