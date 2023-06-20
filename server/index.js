import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Cintas",
  database: "scoreboard",
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get/:date", (req, res) => {
  const date = req.params.date;

  // Query the database for the data for the specified date
  const sqlSelect = "SELECT * FROM weeklytable WHERE date = ?";
  db.query(sqlSelect, [date], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { date, returnPlanned, returnActual, dispenserPlanned, dispenserActual, upgradePlanned, upgradeActual} = req.body;

  // Insert new row into weeklytable
  const sqlInsert = `INSERT INTO weeklytable (date, returnPlanned, returnActual, dispenserPlanned, dispenserActual, upgradePlanned, upgradeActual) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sqlInsert, [date, returnPlanned, returnActual, dispenserPlanned, dispenserActual, upgradePlanned, upgradeActual], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    
    }
    res.send(result);
  });
});

app.put("/api/update/:date", (req, res) => {
  const { date } = req.params;
  const { returnPlanned, returnActual, dispenserPlanned, dispenserActual, upgradePlanned, upgradeActual } = req.body;
  const sqlUpdate = "UPDATE `scoreboard`.`weeklytable` SET `returnPlanned` = ?, `returnActual` = ?, `dispenserPlanned` = ?, `dispenserActual` = ?, `upgradePlanned` = ?, `upgradeActual` = ? WHERE `date` = ?";
  db.query(sqlUpdate, [returnPlanned, returnActual, dispenserPlanned, dispenserActual, upgradePlanned, upgradeActual, date], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    } 
    res.send(result);
  });
});

  app.get("/api/search", (req, res) => {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ message: "Missing start or end date" });
    }
    const sqlSelect = "SELECT * FROM weeklytable WHERE date BETWEEN ? AND ?";
    db.query(sqlSelect, [start, end], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      res.send(result);
    });
  });

  

  app.post('/signup', (req, res) => {
    const { email, password } = req.body;
  
    // Perform validation and sanitation on username and password
  
    // Insert user data into the database
    const query = `INSERT INTO signlog (email, password) VALUES (?, ?)`;
    db.query(query, [email, password], (err, result) => {
      if (err) {
        console.error('Error executing SQL query: ', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }
      res.json({ message: 'User signed up successfully' });
    });
  });

  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Retrieve user data from the database
    const query = `SELECT * FROM signlog WHERE email = ? AND password = ?`;
    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }
  
      if (results.length === 0) {
        res.status(401).json({ error: 'Invalid username or password' });
      } else {
        res.json({ message: 'User logged in successfully' });
      }
    });
  });




  

app.listen(5001, () => {
    console.log("server is running on port 5001");
});