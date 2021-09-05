const Feedback = require("../models/feedback");

//add a feedback to a product
exports.addFeedback = async (req, res) => {
  const { userId, productId, feedback, rating } = req.body;

  const feedbackObj = {
    userId,
    productId,
    feedback,
    rating: Number(rating),
  };

  const feed = new Feedback(feedbackObj);
  await feed.save((err, feedback) => {
    if (err) {
      return res.status(202).json({ error: err });
    }
    if (feedback) {
      return res
        .status(201)
        .json({ feedback, msg: "Feedback added successfully!" });
    }
  });
};

//get feedbacks of products
exports.getFeedback = async (req, res) => {
  await Feedback.find({ productId: req.params.id })
    .populate({ path: "userId", select: "_id firstName lastName" })
    .exec((err, feedback) => {
      if (err) {
        return res.status(400).json({ err });
      }
      if (feedback) {
        return res.status(200).json({ feedback });
      }
    });
};
