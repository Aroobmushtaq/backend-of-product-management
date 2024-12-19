// const express = require("express")
// const mongoose = require("mongoose")
// const cors=require("cors")
// const mongooseUrl = "mongodb://127.0.0.1:27017/practice"
// const userRoutes=require("./routes/userRoutes")
// const app = express()
// app.use(cors({}))
// app.use(express.json())
// app.use("/uploads", express.static("uploads")); 
// app.use("/api/array",userRoutes)
// const port = 3000
// mongoose.connect(mongooseUrl).then(() => {
//     console.log("mongobd is connected")
// }).catch((err) => {
//     console.log("mongodb is not connected")
// })
// app.listen(port, () => {
//     console.log(`server is running on port no ${port}`)
// })
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); 
app.use("/api/array", userRoutes);

const port = 3001;
const mongooseUrl = "mongodb://127.0.0.1:27017/practice";

mongoose.connect(mongooseUrl).then(() => {
    console.log("MongoDB is connected");
}).catch((err) => {
    console.log("MongoDB is not connected");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
