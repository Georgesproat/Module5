const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friendController");

// default endpoint, gets all friends
router.get("/", (req, res) => {
  const allFriends = friendController.getFriends();
  res.json(allFriends);
});

// filter endpoint, gets friends matching the gender from 'gender' query parameter ie. /friends/filter?gender=male
router.get("/filter", (req, res) => {
  let filterGender = req.query.gender;

  if (!filterGender) {
    return res.status(400).json({ error: "Gender parameter is required." });
  }

  const filteredFriends = friendController.filterFriendsByGender(filterGender);

  if (filteredFriends.length === 0) {
    return res
      .status(404)
      .json({ error: "No friends with the specified gender found." });
  }

  res.status(200).json(filteredFriends);
});

// startsWith endpoint - complete this to get friends whose name starts with a given 'letter' from a query parameter
router.get("/startsWith", (req, res) => {
  let startsWithLetter = req.query.letter;

  if (!startsWithLetter) {
    return res.status(400).json({ error: "Letter parameter is required." });
  }

  const filteredFriends =
    friendController.filterFriendsByLetter(startsWithLetter);

  if (filteredFriends.length === 0) {
    return res.status(404).json({
      error: "No friends with names starting with the specified letter found."
    });
  }

  res.status(200).json(filteredFriends);
});

// gets information about this request from the headers
router.get("/info", (req, res) => {
  const info = {
    "User-Agent": req.headers["user-agent"],
    "Content-Type": req.headers["content-type"],
    Host: req.headers["host"]
  };

  res.json(info);
});

// dynamic request param endpoint - get the friend matching the specific ID ie. /friends/3
router.get("/:id", (req, res) => {
  let friendId = req.params.id;
  let matchedFriend = friendController.findFriendById(friendId);

  if (matchedFriend) {
    res.status(200).json(matchedFriend);
  } else {
    res
      .status(404)
      .json({ error: "Friend with id " + friendId + " does not exist" });
  }
});

// a POST request with data sent in the body of the request, representing a new friend to add to our list
router.post("/", (req, res) => {
  try {
    const newFriend = friendController.addFriend(req.body);
    res.status(201).json(newFriend);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// a PUT request which will update data for an existing friend

router.put("/:id", (req, res) => {
  let friendId = parseInt(req.params.id);
  let updatedFriendData = req.body;

  const updatedFriend = friendController.updateFriendById(
    friendId,
    updatedFriendData
  );

  if (!updatedFriend) {
    return res.status(404).json({ error: "Friend not found" });
  }

  res.status(200).json(updatedFriend);
});

// Catch-all route for undefined endpoints
router.get("*", (req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
});

module.exports = router;
