const router = require("express").Router();
const {
    check,
    validationResult
} = require("express-validator")
const auth = require("../middleware/auth")
const User = require("../model/User/user")
const Contact = require("../model/Contatcts/contact")

router.route("/").get(auth, async (req, res) => {
    try {
        const contacts = await Contact.find({
            user: req.user.id
        })
        return res.send(contacts)
    } catch (e) {
        res.status(500).send("Server Error")
    }
}).post([auth, [check("email", "Email Is Required").not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({
            errors: errors.array()
        })
    const {
        name,
        email,
        phone,
        type
    } = req.body
    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })
        console.log(newContact)
        const contact = await newContact.save()
        return res.send(contact)
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
})


module.exports = router;