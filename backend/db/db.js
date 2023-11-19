const { default: mongoose } = require("mongoose");


const mongoDBUri = 'mongodb://mongo:27017';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoDBUri);
        console.log("sucess");
    } catch (e) {
        console.log(e);
    }
}

connectDB();

