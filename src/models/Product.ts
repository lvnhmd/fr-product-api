import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  vintage: string;
  name: string;
  producerId: mongoose.Schema.Types.ObjectId;
}

const ProductSchema: Schema = new Schema({
  vintage: { type: String, required: true },
  name: { type: String, required: true },
  producerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producer",
    required: true
  }
});

export default mongoose.model<IProduct>("Product", ProductSchema);
