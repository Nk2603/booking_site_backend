import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/bookingsite ');

const conn = mongoose.connection;
conn.on('open',()=>{
    console.log("successful connection");
})

const formSchema = new mongoose.Schema({
     
        hotelname: String,
        hotelcontact: String,
        hotelemail: String,
        hotellocation: String,
        hotelprice: String, 
        hotelimage: String 
})

const Form = mongoose.model('Form',formSchema)

export {Form}