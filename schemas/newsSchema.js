import mongoose from "mongoose";
import { type } from "os";

const reqString = {
  type: String,
  required: true,
};

const newsSchema = mongoose.Schema({
  title: reqString,
  description: reqString,
  image: { type: String },
  content: { type: String },
  category: {
    type: String,
  },
  author: reqString,
  mediaType: { type: String },
  mediaUrl: { type: String },
  breakingNews: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
});

const News = mongoose.model("news", newsSchema);

export default News;
