import mongoose, { model, models } from "mongoose";
const cartSchema = new mongoose.Schema({
 
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
});
const Cart = models.Cart || model("Cart", cartSchema);
export default Cart;
