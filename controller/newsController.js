import News from "../schemas/newsSchema.js";
import cron from "node-cron";
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
      mediaType,
      mediaUrl,
      breakingNews,
    } = req.body;

    const newsDoc = await News.create({
      title,
      description,
      image,
      content,
      category,
      author,
      mediaType,
      mediaUrl,
      breakingNews,
    });

    if (!newsDoc) {
      console.log("Error adding news");
      return res.status(404).json({ success: false, msg: "Error adding news" });
    }
    console.log(newsDoc);
    return res.status(200).json({ success: true, newsDoc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
});

export const updateNews = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      description,
      image,
      content,
      category,
      author,
      mediaType,
      mediaUrl,
      breakingNews,
    } = req.body;

    const newsDoc = await News.findOneAndUpdate(
      { _id: id },
      {
        title,
        description,
        image,
        content,
        category,
        author,
        mediaType,
        mediaUrl,
        breakingNews,
      }
    );
    newsDoc.save();
    if (!newsDoc) {
      console.log("Invalid news id");
      return res.status(404).json({ success: false, msg: "Invalid news id" });
    }

    console.log("News details updated successfully");
    return res
      .status(200)
      .json({ success: true, msg: "News details updated successfully" });
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
    return res
      .status(500)
      .json({ error: "Failed to fetch news", success: false });
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

export const getNewsById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const newsDoc = await News.findById(id);
    if (!newsDoc) {
      console.log("Invalid news Id");
      return res.status(404).json({ success: false, msg: "Invalid news Id" });
    }

    console.log(newsDoc);
    return res.status(200).json({ success: true, newsDoc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
});

export const getNewsByCategory = asyncHandler(async (req, res) => {
  try {
    const category = req.params.category;

    const newsDoc = await News.find({ category: category });
    if (newsDoc.length === 0) {
      console.log("No news right now on this category ", category);
      return res.status(404).json({
        success: false,
        msg: "No news right now on this category ",
        category,
      });
    }

    console.log(newsDoc);
    return res.status(200).json({ success: true, newsDoc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
});

export const deleteNewsById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const newsDoc = await News.findByIdAndDelete(id);
    if (!newsDoc) {
      console.log("Invalid news id");
      return res.status(404).json({ success: false, msg: "Invalid news id" });
    }

    return res
      .status(200)
      .json({ success: true, msg: "News deleted successfully", newsDoc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
});

export const getNewsByMediaType = asyncHandler(async (req, res) => {
  try {
    const mediaType = req.params.mediaType;

    const newsDoc = await News.find({ mediaType: mediaType });
    if (newsDoc.length === 0) {
      console.log("No news in this media type for now");
      return res
        .status(404)
        .json({ success: false, msg: "No news in this media type for now" });
    }

    console.log(newsDoc);
    return res.status(200).json({ success: true, newsDoc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
});

export const getBreakingNews = asyncHandler(async (req, res) => {
  try {
    //const brekingNews;

    const newsDoc = await News.find({ breakingNews: true });
    if (newsDoc.length === 0) {
      console.log("No breaking news available");
      return res
        .status(404)
        .json({ success: false, msg: "No breaking news available" });
    }

    console.log(newsDoc);
    return res.status(200).json({ success: true, newsDoc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
});
