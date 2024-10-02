import mongoose from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const mediaSchema = mongoose.Schema({
  mediaType: { type: String, enum: ["VIDEO", "LIVE STREAM", "ARTICLE"] },
  mediaUrl: { type: String },
});
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
      "JOKES",
      "CINEMA",
    ],
  },
  author: reqString,
  media: mediaSchema,
});

const News = mongoose.model("news",newsSchema);

export default News;