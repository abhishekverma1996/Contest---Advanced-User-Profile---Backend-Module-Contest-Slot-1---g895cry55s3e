//Before writing a code consider reading the documentation and code carefullt

const UserProfile = require('../models/userProfileModel');

exports.createProfile = async (req, res) => {
  try {
    // TODO: Extract the user ID from the request parameters
    const userId = req.params.userId;

    // TODO: Check if a profile already exists for the user, send a 400 response if exists
    const existingProfile = await userProfileModel.findOne({userId});
    if(existingProfile) {
      return res.status(400).json({ message: 'Profile already exists for this user'});
    }
    // TODO: Create a new user profile and send a success response
    const userProfile = new userProfileModel({userId});
    await userProfile.save();

    res.status(201).json({ message: 'User profile created successfully', userProfile });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createList = async (req, res) => {
  try {
    // TODO: Extract the user ID from the request parameters and list name from the request body
    const userId = req.params.userId;
    const listName = req.body.listName;
    // TODO: Find the user profile, send a 404 response if not found
    const userProfile = await userProfileModel.findOne({userId});
    if(!userProfile){
      return res.status(404).json({ message: 'User profile not found'});
    }
    // TODO: Create a new list, add it to the user profile, and send a success response
    userProfile.lists.push({ listName, items: []});
    await userProfile.save();

    res.status(201).json({ message: 'List created successfully', list: newList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addItemToList = async (req, res) => {
  try {
    // TODO: Extract the user ID and list ID from the request parameters, item name from the request body
    const userId = req.params.userId;
    const listId = req.params.listId;
    const itemName = req.body.itemName;
    // TODO: Find the user profile, send a 404 response if not found
    const userProfile = await userProfileModel.findOne({userId});
    if(!userProfile){
      return res.status(404).json({ message: 'User profile not found'});
    }
    // TODO: Find the target list, send a 404 response if not found
    const targetList = userProfile.lists.id(listId);
    if(!targetList){
      return res.status(404).json({ message: 'User profile not found'});
    }
    // TODO: Add the item to the list, save the user profile, and send a success response
    targetList.items.push(listName);
    await userProfile.save();
    
    res.json({ message: 'Item added to the list successfully', list: targetList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
