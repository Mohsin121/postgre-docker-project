const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const pool = require("./config/db");
const routes = require("./routes");
const { createUserTable } = require("./data/createUserTable");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


//Routes
app.use("/api/users", routes.userRoutes);



//Error handling
app.use(errorHandler);

//create user table if not exists
createUserTable().catch(console.error);

// app test
app.get("/", async(req, res) => {
     res.send(`Welcome | App Working Fine`);
 });

//pool testing
app.get("/pool", async(req, res) => {
   console.log("Pool testing started");
    const result = await pool.query("SELECT current_database()");
    console.log(result);
    res.send(`Pool testing completed ${result.rows[0].current_database}`);
});

//postgres connection


//server 
app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});