const jwt = require("jsonwebtoken")
module.exports = async (req, res, next) => {
    const token = req.header("x-auth-token")
    if (!token)
        return res.status(401).send({
            message: "Authorization Denied"
        })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        req.user = decoded.user
        next()
    } catch (e) {
        res.status(401).send({
            msg: "Token Not Verified"
        })
    }
}