import mongoose from "mongoose";

function validateObjectId(req, res, next) {
  const { id } = req.params;

  console.log(req.originalUrl);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: `Invalid ObjectId param: ${id}` });
  }

  next();
}

export default validateObjectId;
