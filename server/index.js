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

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM weeklytable";
  db.query(sqlSelect, (err, result) => {
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

app.put("/api/update", (req, res) => {
  const { date, returnPlanned, returnActual, dispenserPlanned, dispenserActual, upgradePlanned, upgradeActual } = req.body;
  const sqlUpdate = "UPDATE `scoreboard`.`weeklytable` SET `returnPlanned` = ?, `returnActual` = ?, `dispenserPlanned` = ?, `dispenserActual` = ?, `upgradePlanned` = ?, `upgradeActual` = ? WHERE `date` = ?";
  db.query(sqlUpdate, [returnPlanned, returnActual, dispenserPlanned, dispenserActual, upgradePlanned, upgradeActual, date], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
      } 
      res.send(result);
    });
  });


  app.get("/api/search/:start/:end", (req, res) => {
    const sqlSelect = "SELECT * FROM weeklytable WHERE date BETWEEN ? AND ?";
    const start = req.params.start;
    const end = req.params.end;
    db.query(sqlSelect, [start, end], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      res.send(result);
    });
  });


app.listen(5001, () => {
    console.log("server is running on port 5001");
});