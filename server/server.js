const express=require("express");
const env=require("dotenv");

const connectWithDb = require("./config/dbConfig");
const cors = require('cors')
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser')



// default options


const app=express();



app.use(fileUpload(
    {
        useTempFiles: true,

    }
));
app.use(cookieParser());

app.use(cors());
//middleware to understand response
app.use(express.json());


//mount all routes 
// app.use("/",routes)
app.use("/user",require("./routes/userRoute"))


env.config();
app.listen(process.env.PORT,()=>{
    console.log("this is ready to go")
})
connectWithDb();


app.get("/",(request,response)=>{
    response.send('this is homepage')
})
