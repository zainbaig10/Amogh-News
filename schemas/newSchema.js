import mongoose from "mongoose";

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
      "STOCK MARKET",
    ],
  },
  author: reqString,
  mediaType: { type: String},
  mediaUrl: { type: String },
  breakingNews: {type:Boolean,default:false},
  dateCreated:{type:Date, default:Date.now}
});

const News = mongoose.model("news",newsSchema);

export default News;