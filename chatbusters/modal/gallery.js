import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "Please provide url"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;
