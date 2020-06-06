const express = require("express");
const dotenv = require("dotenv");
dotenv.config({
    path: "./config/env/.env",
});
require("./db/db")();
const app = express();
//Body-Parser
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use((req, res, next) => {
    console.log(req.body);
    next();
});
//Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));