const { Contact } = require("../../models");

const asyncHandler = require("express-async-handler");

const { HttpError } = require("../../helpers");

const getAllContacts = asyncHandler(async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite) {
    const result = await Contact.find({ owner, favorite }, "", {
      skip,
      limit,
    }).populate("owner", "email");
    res.status(200).json({
      code: 200,
      message: "success",
      data: result,
      qty: result.length,
    });
  }

  const result = await Contact.find({ owner }, "", {
    skip,
    limit,
  }).populate("owner", "email");

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    code: 200,
    message: "success",
    data: result,
    qty: result.length,
  });
});

module.exports = getAllContacts;
