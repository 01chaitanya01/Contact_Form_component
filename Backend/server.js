const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({
    credentials:true
}));

const port = process.env.PORT || 5000;

const contactForm =  require('./routes/formRoute')

app.use("/api/form",contactForm);


app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})