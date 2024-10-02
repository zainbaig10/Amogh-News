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

export const getAllNews = asyncHandler(async (req, res) => {
  try {
    const news = await News.find({}).exec(); 
    return res.status(200).json({ news, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch news", success: false });
  }
});

export const getAllNewsWithPagination = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const pageSize = parseInt(req.query.pageSize) || 10; // Default pageSize is 10
    const sortField = req.query.sortField || "dateCreated"; // Default sort field
    const sortOrder = req.query.sortOrder || "desc"; // Default sort order
    const sort = {};
    sort[sortField] = sortOrder === "asc" ? 1 : -1; // Ascending or Descending
    const startIndex = (page - 1) * pageSize;

    // Get total count of news documents
    const totalDocuments = await News.countDocuments();
    const totalPages = Math.ceil(totalDocuments / pageSize);

    // Fetch paginated news articles
    const news = await News.find({})
      .sort(sort)
      .skip(startIndex)
      .limit(pageSize)
      .exec();

    // Response
    return res.status(200).json({
      news,
      pagination: {
        page,
        pageSize,
        totalPages,
        totalDocuments,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message, success: false });
  }
});