const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 5001;
const cors = require("cors"); 

const db = mysql.createPool({
    connectionLimit: 10, // Handle multiple requests
    host: 'srv1132.hstgr.io',
    user: 'u892098652_LOATx',
    password: 'nIZX6aNboN',
    database: 'u892098652_rCn6j'
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Failed to connect:", err);
    } else {
        console.log("✅ Connected to MySQL database!");
        connection.release();
    }
});


app.use(cors());
app.use(express.json());

app.get("/api/posts", (req, res) => {
    db.query("SELECT * FROM wp_posts WHERE post_status = 'publish'", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});
app.get("/", (req, res) => {
    res.send("welcome to node js apis with wp DB");
});

// db.connect((err) => {
//     if(err){
//         console.error("Database connection failed: ", err);
//         return;
//     } 
//     console.log("Connected to WordPress database!");
// });
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
