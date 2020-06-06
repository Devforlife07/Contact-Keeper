const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require("../model/User/user")
const auth = require("../middleware/auth")
const {
    check,
    validationResult
} = require('express-validator');
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.route("/").post([check("email", "Please Include A Valid Email").isEmail(), check("password", "Password Is Required").exists()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            errors: errors.array()
        })
    }
    const {
        email,
        password
    } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).send({
                msg: "Invalid Credentials"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.status(400).send({
                msg: "Invalid Credentials"
            })
        const payload = {
            user: {
                id: user.id
            }
        }
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600
        }, (err, token) => {
            if (err)
                throw err;
            res.send({
                token
            })
        })
    } catch (e) {
        res.send(e)
    }

})

module.exports = router;