import News from "../schemas/newSchema.js";
import asyncHandler from "express-async-handler";

export const addNews = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      content,
      category,
      author,
      views,
      latestNews,
      media,
    } = req.body;

    const newsDoc = await News.create({
      title,
      description,
      image,
      content,
      category,
      author,
      views,
      latestNews, 
      media,})

      return res.status(200).json({success:true,newsDoc});

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
});
