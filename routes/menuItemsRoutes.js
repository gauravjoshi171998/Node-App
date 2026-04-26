const express = require('express');
const router = express.Router();

const MenuItems = require('./../models/MenuItems')

// Create MenuItems API
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenuItems = new MenuItems(data);
        const savedMenuItems = await newMenuItems.save();
        console.log('Items saved successfully')
        res.status(200).json(savedMenuItems)

    } catch (error) {
        console.log(error, 'Error')
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Read MenuItems API
router.get('/', async (req, res) => {
    try {
        const data = await MenuItems.find()
        console.log('Item fetched successfully')
        res.status(200).json(data)
    } catch (error) {
        console.log(error, 'Error')
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Read MenuItem API By Test
router.get('/:testType', async (req, res) => {
    try {
        const tastType = req.params.testType;
        if (tastType == 'sweet' || tastType == 'spicy' || tastType == 'sour') {
            const data = await MenuItems.find({ taste: tastType })
            console.log('Successfully fetch')
            res.status(200).json(data)
        } else {
            res.status(404).json({ error: 'Invalid tast type' })
        }
    } catch (error) {
        console.log(error, 'Error')
        res.status(500).json({ error: 'Internal server error' })
    }
})

module.exports = router;