const router = require("express").Router();
const User = require("../model/User/user")
const bcrypt = require("bcryptjs")
const {
    check,
    validationResult
} = require('express-validator');
const jwt = require("jsonwebtoken")
router.route("/").post([check("name", "Please Include Name").not().isEmpty(), check("email", "Please Include A Valid Email").isEmail(), check("password", "Please Enter a password With 6 or more than 6 characters").isLength({
    min: 6
})], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({
            errors: errors.array()
        })
    const {
        email,
        password,
        name
    } = req.body;
    try {
        let user = await User.findOne({
            email
        })
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }
        user = new User({
            name,
            email,
            password
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        let saved = await user.save();
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