const User = require("../models/userSchema")
const mongoose=require("mongoose")
const fs=require("fs")
const createUser = async (req, res) => {
    try {
        const { name, color, price, description } = req.body;
        const imagePath = req.file ? req.file.path : null;

        const user = new User({
            name,
            color,
            price,
            description: description,
            image: imagePath
        });
        await user.save()
        res.status(201).json({
            message: "user is created",
            user: user
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            err: "failed to create user",
            detail: err.message
        })
    }

}
const getUser = async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json({
            message: "user data",
            user: user
        })
    }
    catch (err) {
        res.status(500).json({
            message: "failed to get user ",
            detail: err.message
        })
    }
}
const deleteUsre = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the user before deletion to get the image path
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Delete the image file if it exists
        if (user.image) {
            fs.unlink(user.image, (err) => {
                if (err) {
                    console.error("Failed to delete image:", err.message);
                }
            });
        }

        // Delete the user document from MongoDB
        await User.findByIdAndDelete(userId);

        res.status(200).json({
            message: "User is deleted and image removed",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to delete user",
            detail: err.message,
        });
    }
};
// const updateUser = async (req, res) => {
//     try {
//       const id = req.params.id;
//       const { name, color, price, description } = req.body;
//       const imagePath = req.file ? req.file.path : null; // Check for new image
  
//       // Find the user by ID to ensure it exists
//       const user = await User.findById(id);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       // Prepare the update fields only for the ones provided
//       let updateFields = {};
//       if (name) updateFields.name = name;
//       if (color) updateFields.color = color;
//       if (price) updateFields.price = price;
//       if (description) updateFields.description = description;
//       if (imagePath) updateFields.image = imagePath;
  
//       // If a new image is provided, delete the old image
//       if (imagePath && user.image) {
//         fs.unlink(user.image, (err) => {
//           if (err) {
//             console.error("Failed to delete old image:", err.message);
//           }
//         });
//       }
  
//       // Perform the update using findByIdAndUpdate with { new: true }
//       const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });
  
//       // Return the updated user object in the response
//       res.status(200).json({
//         message: "User updated successfully",
//         user: updatedUser,
//       });
//     } catch (err) {
//       console.error("Error updating user:", err);
//       res.status(500).json({
//         message: "Failed to update user",
//         detail: err.message,
//       });
//     }
//   };
const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      if (req.file) {
        updates.image = req.file.path; // Assign new image path
  
        // Delete old image if it exists
        const existingUser = await User.findById(id);
        if (existingUser && existingUser.image) {
          const fs = require("fs");
          fs.unlink(existingUser.image, (err) => {
            if (err) console.error("Failed to delete old image:", err.message);
          });
        }
      }
  
      const updatedUser = await User.findByIdAndUpdate(id, updates, {
        new: true,
      });
  
      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (err) {
      console.error("Error updating user:", err.message);
      res.status(500).json({
        message: "Failed to update user",
        detail: err.message,
      });
    }
  };
module.exports = { createUser, getUser, deleteUsre, updateUser }
