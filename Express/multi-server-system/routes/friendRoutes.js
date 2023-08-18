const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friendController");

router.get("/", friendController.getAllFriends);

router.get("/filter", friendController.filterFriendsByGender);

router.get("/startsWith", friendController.filterFriendsByLetter);

router.get("/info", friendController.getRequestInfo);

router.get("/:id", friendController.getFriendById);

router.post("/", friendController.createNewFriend);

router.put("/:id", friendController.updateFriend);

router.get("*", (req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
});

module.exports = router;
