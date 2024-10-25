import mongoose, {  model, models } from "mongoose";
const productSchema = new  mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
   
    image:{
        type: String,
        default:''
    },
   
    brand:{
        type: String,
        default:''
    },
    price:{
        type: Number,
        default:0
    },
    category:{
        type:String,
        required: true,
        default:''
    },
  
   
    dateCreated:{
        type: Date,
        default: Date.now
    }
})

const Product = models.Product || model("Product",productSchema)
export default Product