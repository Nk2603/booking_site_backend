import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import multer from "multer";
import {Form} from "./mongoose_connections.js"

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

app.get("/",async(req,res)=>{    //async is used to where we have to wait   // only get type hit will proceed or hit on chrome 
    try{
        res.json({data:"hello"})
    }catch(err){
        console.log(err)

    }
}) 

app.post("/signup",async(req,res)=>{     //post type api doesn't get hit on chrome
    try {
       console.log(req.body)
        const {username,phone,email,password,Password} =req.body;
        const passwordB = await bcrypt.hash(password , 10)
        console.log("password",password);     
       console.log("passwordB",passwordB);         
      
       res.json({data:"hello post"})
    } catch (err) {
        console.log(err)
    }
})

app.post("/signin",async(req,res)=>{   
    try {
       console.log(req.body) 
       res.json({data:"nk thakran"})
    } catch (err) {
        console.log(err)
    }
})

app.post("/bookingform", upload.fields([{ name: 'hotelimage', maxCount: 1 }]), async(req,res)=>{   
    try {
        // const obj ={
        //     hotelname: "string",
        //     hotelcontact: "string",
        //     hotelemail: "string",
        //     hotellocation: "string",
        //     hotelprice: "string", 
        //     hotelimage: "string"
        // }
        const newForm = new Form(req.body)
        const formData = await newForm.save()
        // console.log(req.body); 
        // console.log(req.files);
        console.log(formData)
       res.json({data:"thakran jaat"})
    } catch (err) {
        console.log(err)
    }
})  

app.listen(2024)
