const mongoose = require("mongoose");
const connection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB Connected")

    } catch (e) {
        console.log(e)
    }
}
module.exports = connection;