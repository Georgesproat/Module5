const friends = [
  { id: 1, name: "Phoebe", gender: "female" },
  { id: 2, name: "Joey", gender: "male" },
  { id: 3, name: "Chandler", gender: "male" },
  { id: 4, name: "Monica", gender: "female" },
  { id: 5, name: "Ross", gender: "male" },
  { id: 6, name: "Rachel", gender: "female" }
];

function getFriends() {
  return friends;
}

function filterFriendsByGender(gender) {
  return friends.filter((friend) => friend.gender === gender);
}

function findFriendById(id) {
  return friends.find((friend) => friend.id === id);
}

function addFriend(newFriend) {
  if (!newFriend.name || !newFriend.gender) {
    throw new Error("Friend object must contain a name and gender");
  }

  newFriend.id = friends.length + 1;
  friends.push(newFriend);

  return newFriend;
}

function updateFriendById(id, updatedData) {
  const friendIndex = friends.findIndex((friend) => friend.id === id);

  if (friendIndex === -1) {
    return null; 
  }

  const updatedFriend = {
    ...friends[friendIndex],
    ...updatedData,
    id: id
  };

  friends[friendIndex] = updatedFriend;

  return updatedFriend;
}


module.exports = {
  getFriends,
  filterFriendsByGender,
  findFriendById,
  addFriend,
  updateFriendById
};
