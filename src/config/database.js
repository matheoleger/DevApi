import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/ynovapi")
.then(() => console.log("Successfully connected to database"))
.catch((e) => console.log(`Error during database connection ${e}`))