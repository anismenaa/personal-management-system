const router = require("express").Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

// signin
router.post("/login", async (req, res) => {
    const {username, password} = req.body
    // check if the email is in the database
    const usernameExists = await Admin.findOne({username: username})
    if (!usernameExists) {
        return res.status(401).json({
            message: "Failed: username incorrect"
        })
    }
    console.log(usernameExists)
    const adminPassword = usernameExists.password
    // check for matching
    if (adminPassword !== password) {
        return res.status(401).json({
            message: "Failed: username or password incorrect"
        })
    }

    // if everything is okey, create a token and put it in a cookie
    const token = jwt.sign({
        username: username,
        email: usernameExists.email
    }, "naniKey")

    res.cookie("token", token)
    res.status(200).json({
        message: "Successfully logged in"
    })
})

// signout

module.exports = router