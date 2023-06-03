const express = require("express");
const { registerUser, loginUser, createPassword} = require("../controller/userController");
const router = express.Router();



router.post("/register",registerUser);
router.post("/login",loginUser)
router.put("/forget",createPassword)




module.exports=router;