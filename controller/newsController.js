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
      mediaType,
      mediaUrl,
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
      mediaType,
      mediaUrl
    })

    if(!newsDoc){
      console.log("Error adding news");
      return res.status(404).json({success:false,msg:"Error adding news"})
    }
    console.log(newsDoc);
    return res.status(200).json({success:true,newsDoc});

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
});
