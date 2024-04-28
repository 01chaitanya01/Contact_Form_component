const express = require("express");
const router = express.Router();

const {
    sendMail
} = require("../controllers/formController");

router.post('/contactform/:receiveremail',sendMail)

module.exports = router;