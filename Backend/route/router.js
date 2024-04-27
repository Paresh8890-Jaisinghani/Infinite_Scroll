const express = require('express');
const router = express.Router();
const Item = require('../models.js'); 

const initialLoadItems = 20; // Number of items to fetch initially

router.get('/items', async (req, res) => {
  try {
    let { page } = req.query;
    page = parseInt(page);

    // Fetch the initial set of items for the first page
 
      const items = await Item.find().limit(initialLoadItems);
      return res.json(items);
   
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
