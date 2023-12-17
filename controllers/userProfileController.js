const UserProfile = require('../models/userProfileModel');

exports.createProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    const existingProfile = await UserProfile.findOne({ userId });

    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists for this user' });
    }

    const userProfile = new UserProfile({ userId });
    await userProfile.save();

    res.status(201).json({ message: 'User profile created successfully', userProfile });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createList = async (req, res) => {
  try {
    const userId = req.params.userId;
    const listName = req.body.listName;

    const userProfile = await UserProfile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    const newList = { listName, items: [] };
    userProfile.lists.push(newList);
    await userProfile.save();

    res.status(201).json({ message: 'List created successfully', list: newList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addItemToList = async (req, res) => {
  try {
    const userId = req.params.userId;
    const listId = req.params.listId;
    const itemName = req.body.itemName;

    const userProfile = await UserProfile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    const targetList = userProfile.lists.id(listId);

    if (!targetList) {
      return res.status(404).json({ message: 'List not found' });
    }

    targetList.items.push(itemName);
    await userProfile.save();

    res.json({ message: 'Item added to the list successfully', list: targetList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
