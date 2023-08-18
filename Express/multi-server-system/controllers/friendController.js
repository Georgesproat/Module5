const friends = [
  { id: 1, name: "Phoebe", gender: "female" },
  { id: 2, name: "Joey", gender: "male" },
  { id: 3, name: "Chandler", gender: "male" },
  { id: 4, name: "Monica", gender: "female" },
  { id: 5, name: "Ross", gender: "male" },
  { id: 6, name: "Rachel", gender: "female" }
];

function getAllFriends(req, res) {
  const allFriends = friends;
  res.json(allFriends);
}

function filterFriendsByGender(req, res) {
  const filterGender = req.query.gender;

  if (!filterGender) {
    return res.status(400).json({ error: "Gender is required." });
  }

  const filteredFriends = friends.filter(
    (friend) => friend.gender === filterGender
  );

  if (filteredFriends.length === 0) {
    return res
      .status(404)
      .json({ error: "No friends with the specified gender found." });
  }

  res.status(200).json(filteredFriends);
}

function filterFriendsByLetter(req, res) {
  const startsWithLetter = req.query.letter;

  if (!startsWithLetter) {
    return res.status(400).json({ error: "A letter is required." });
  }

  const filteredFriends = friends.filter((friend) =>
    friend.name.startsWith(startsWithLetter)
  );

  if (filteredFriends.length === 0) {
    return res.status(404).json({
      error: "No friends with names starting with the specified letter found."
    });
  }

  res.status(200).json(filteredFriends);
}

function getRequestInfo(req, res) {
  const info = {
    "User-Agent": req.headers["user-agent"],
    "Content-Type": req.headers["content-type"],
    Host: req.headers["host"]
  };

  res.json(info);
}

function getFriendById(req, res) {
  const friendId = req.params.id;
  const matchedFriend = friends.find(
    (friend) => friend.id === parseInt(friendId)
  );

  if (matchedFriend) {
    res.status(200).json(matchedFriend);
  } else {
    res
      .status(404)
      .json({ error: "Friend with id " + friendId + " does not exist" });
  }
}

function createNewFriend(req, res) {
  try {
    const newFriend = req.body;
    if (!newFriend.name || !newFriend.gender) {
      throw new Error("Friend object must contain a name and gender");
    }

    newFriend.id = friends.length + 1;
    friends.push(newFriend);

    res.status(201).json(newFriend);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

function updateFriend(req, res) {
  const friendId = parseInt(req.params.id);
  const updatedFriendData = req.body;

  const friendIndex = friends.findIndex((friend) => friend.id === friendId);

  if (friendIndex === -1) {
    return res.status(404).json({ error: "Friend not found" });
  }

  const updatedFriend = {
    ...friends[friendIndex],
    ...updatedFriendData,
    id: friendId
  };

  friends[friendIndex] = updatedFriend;

  res.status(200).json(updatedFriend);
}

module.exports = {
  getAllFriends,
  filterFriendsByGender,
  filterFriendsByLetter,
  getRequestInfo,
  getFriendById,
  createNewFriend,
  updateFriend
};
