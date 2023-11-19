const { default: mongoose } = require("mongoose");


const mongoDBUri = 'mongodb://mongo:27017/poll_db';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoDBUri);
        console.log("Succesfully connected to the DB");
    } catch (e) {
        console.error("There was an error connecting to the DB");
        console.error(e);
    }
}

connectDB();

