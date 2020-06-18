const router = require("express").Router();
const {
    check,
    validationResult
} = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../model/User/user");
const Contact = require("../model/Contatcts/contact");

router
    .route("/")
    .get(auth, async (req, res) => {
        try {
            const contacts = await Contact.find({
                user: req.user.id,
            });
            return res.send(contacts);
        } catch (e) {
            res.status(500).send("Server Error");
        }
    })
    .post(
        [auth, [check("email", "Email Is Required").not().isEmpty()]],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({
                    errors: errors.array(),
                });
            console.log(req.body);
            const {
                name,
                email,
                phone,
                types
            } = req.body;
            try {
                const newContact = new Contact({
                    name,
                    email,
                    phone,
                    types,
                    user: req.user.id,
                });
                console.log(newContact);
                const contact = await newContact.save();
                return res.send(contact);
            } catch (error) {
                console.log(error);
                res.status(500).send("Server Error");
            }
        }
    );
router.route("/:id").delete(auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact)
            return res.status(404).send({
                msg: "Contact Not Found",
            });
        if (contact.user.toString() !== req.user.id)
            return res.status(401).send({
                msg: "Not Authorized"
            })
        await Contact.findByIdAndRemove(req.params.id);
        res.status(200).send({
            msg: "Contact Removed"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}).put(auth, async (req, res) => {
    console.log("Yeah")
    const {
        name,
        email,
        phone,
        types
    } = req.body;
    let newContact = {};
    if (name) newContact.name = name;
    if (email) newContact.email = email;
    if (phone) newContact.phone = phone;
    if (types) newContact.types = types;
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).send({
            msg: "Contact Not Found"
        })
        if (contact.user.toString() != req.user.id)
            return res.status(401).send({
                msg: "Not Authorized"
            })
        contact = await Contact.findByIdAndUpdate(req.params.id, {
            $set: newContact
        }, {
            new: true
        })
        res.send({
            contact
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")

    }
})
module.exports = router;