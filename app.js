const express= require ('express');
const connectDB= require("./src/config/database");

const cors = require ("cors");

const morgan = require ("morgan");


require("dotenv").config();


const app = express();

connectDB();


app.use(express.json());
app.use(cors());

app.use(morgan('dev'));

app.use("/api/auth", require("./src/routes/auth"));

app.use("/api/blood", require("./src/routes/blood"));
app.use("/api/medicine", require("./src/routes/medicinee"));


app.use ("/api/cart", require("./src/routes/cart"));


module.exports= app
