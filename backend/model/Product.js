import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  UserId: {
    type:String,
    required: true,
  }
},
{ timestamps: true}
);

export default mongoose.model("Product",ProductSchema);
