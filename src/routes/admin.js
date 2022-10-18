/** @format */

const { authenticateTokenAdmin } = require("../controllers/auth");

const {
  getAllUsers,
  deleteUserById,
  deleteAllUsers,
} = require("../controllers/admin");

const {
  getAdvertByCategory,
  getAllAdverts,
  addAdvert,
  deleteAllAdverts
} = require("../controllers/advert");

const express = require("express");

const router = express.Router();

//get all users
router.get("/", authenticateTokenAdmin, getAllUsers);

//add adverts
router.post("/add", addAdvert);

//get adverts by category
router.get("/:category", getAdvertByCategory);

//get all adverts
router.get("/adverts/all", getAllAdverts);

//delete user by id
router.delete("/:id", authenticateTokenAdmin, deleteUserById);


//delete all users
router.delete("/api/hammasiniChop", deleteAllUsers);

//delete all adverts
router.delete('/api/hammaAhlatniChop',deleteAllAdverts);

module.exports = router;
