const User = require("../models/user");

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const cloudinary = require("cloudinary");

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phoneNumber, description, role } = req.body;
  console.log({ description });
  let user;

  if (req.body.avatar) {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    user = await User.create({
      name,
      email,
      phoneNumber,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      description,
      role,
    });
  } else {
    user = await User.create({
      name,
      email,
      phoneNumber,
      description,
      role,
    });
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// Get currently logged in user details  => /api/v1/message
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("User not found.", 403));
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("User not found.", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Admin Routes

// Get all users => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Get user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User is not found with this id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});
// Update user profile => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    description: req.body.description,
    role: req.body.role,
  };

  // Update avatar
  if (req.body.avatar !== "") {
    const user = await User.findById(req.params.id);
    if (user.avatar.public_id) {
      const image_id = user.avatar.public_id;
      const res = await cloudinary.v2.uploader.destroy(image_id);
    }
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get user details => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User is not found with this id: ${req.params.id}`, 400)
    );
  }
  if (!!user.avatar.public_id) {
    // Remove avatar from cloudinary
    const image_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id);
  }

  await user.remove();

  res.status(200).json({
    success: true,
  });
});

// Update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    description: req.body.description,
    role: req.body.role,
  };

  // Update avatar
  if (req.body.avatar !== "") {
    const user = await User.findById(req.params.id);
    if (user.avatar.public_id) {
      const image_id = user.avatar.public_id;
      const res = await cloudinary.v2.uploader.destroy(image_id);
    }
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});
