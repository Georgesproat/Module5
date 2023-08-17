const express = require("express");
const router = express.Router();

const friends = [
    { id: 1, name: 'Phoebe', gender: 'female'},
    { id: 2, name: 'Joey', gender: 'male'},
    { id: 3, name: 'Chandler', gender: 'male'},
    { id: 4, name: 'Monica', gender: 'female'},
    { id: 5, name: 'Ross', gender: 'male'},
    { id: 6, name: 'Rachael', gender: 'female'}
]

// default endpoint, gets all friends
router.get('/', (req, res) => {
    res.json(friends)
})

// filter endpoint, gets friends matching the gender from 'gender' query parameter ie. /friends/filter?gender=male
router.get('/filter', (req, res) => {
    let filterGender = req.query.gender;
    
    // TODO - following the example in the following routes, return valid data when the gender matches and an error response when there are no gender matches
    res.status(200).json(friends.filter(friend => friend.gender == filterGender))
})

// startsWith endpoint - complete this to get friends whose name starts with a given 'letter' from a query parameter
// TODO


// gets information about this request from the headers
router.get('/info', (req, res) => {

    // TODO - filter this object to just return info on the user-agent, content-type and host
    res.json(req.headers)
})


// dynamic request param endpoint - get the friend matching the specific ID ie. /friends/3
router.get('/:id', (req, res) => {
    let friendId = req.params.id; // 'id' here will be a value matching anything after the / in the request path
    let matchedFriend = friends.find(friend => friend.id == friendId);

    // if we found a friend with the given ID, return their data
    if (matchedFriend) {
        res.status(200).json(matchedFriend)
    } else {
        // otherwise, return a 'not found' error
        res.status(404).json({error: 'Friend with id '+friendId+' does not exist'})
    }
})


// a POST request with data sent in the body of the request, representing a new friend to add to our list
router.post('/', (req, res) => {
    let newFriend = req.body;
    console.log(req.headers)

    // we can add some validation here to make sure the new friend object matches the right pattern
    if (!newFriend.name || !newFriend.gender) {
        res.status(500).json({error: 'Friend object must contain a name and gender'});
        return;
    }
    else if (!newFriend.id) {
        newFriend.id = friends.length + 1
    }

    // if the new friend is valid, add them to the list and return the successful object
    friends.push(newFriend)
    res.status(200).json(newFriend)
})

// TODO - move logic out into a controller with functions for filtering, finding, adding

// TODO - try completing this new route for a PUT request which will update data for an existing friend
router.put('/:id', (req, res) => {
    let friendId = req.params.id;
    let updatedFriend = req.body;

    // verify the contents of updatedFriend
    // replace the old friend data for friendId with the new data from updatedFriend

    res.status(200).json(updatedFriend)
})

module.exports = router;