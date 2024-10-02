import mongoose from "mongoose";

const reqString = {
  type: String,
  required: true,
};



const newsSchema = mongoose.Schema({
  title: reqString,
  description: reqString,
  image: { type: String },
  content: reqString,
  category: {
    type: String,
    enum: [
      "CRIME",
      "SPORTS",
      "POLITICAL",
      "WATER POWER",
      "AGRICULTURE",
      "HEALTH",
      "EDUCATION",
      "CINEMA",
      "INTERNATIONAL",
      "COMEDY",
    ],
  },
  author: reqString,
  mediaType: { type: String},
  mediaUrl: { type: String },
});

const News = mongoose.model("news",newsSchema);

export default News;