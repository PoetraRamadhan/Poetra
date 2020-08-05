const mongoose = require("mongoose");

module.exports = async () => {
    await mongoose.connect("mongodb+srv://Poetra:PoetraDB@poetradb.fjne5.mongodb.net/Data", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return mongoose;
};