const express = require('express');
const router = express.Router();

const Person = require('./../models/Person')
const { jwtAuthMiddleware, generateToken } = require('./../jwt')


// Create Person API
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const savedPerson = await newPerson.save();
        console.log('Successfully saved')

        const payload = {
            id: savedPerson.id,
            username: savedPerson.username
        }
        console.log(JSON.stringify(payload))
        const token = generateToken(payload)
        console.log('Token is :', token)

        res.status(200).json({ savedPerson: savedPerson, token: token })
    } catch (error) {
        console.log(error, 'Error')
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Login API
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // find user by username
        const userData = await Person.findOne({ username: username })

        if (!userData || !(await userData.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' })
        }
        const payload = {
            id: userData.id,
            username: userData.username
        }
        const token = generateToken(payload)
        res.json({ token })
    } catch (error) {
        console.log(error, 'Error')
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Read Person API
router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Successfully fetch')
        res.status(200).json(data)
    } catch (error) {
        console.log(error, 'Error')
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        console.log('User Data', userData);

        const userID = userData.id;
        const user = await Person.findById(userID);
        res.status(200).json({ user })
    } catch (error) {
        console.log(error, 'Error')
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Read Person API By Work
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType
        if (workType == "chef" || workType == "waiter" || workType == "manager") {
            const data = await Person.find({ work: workType });
            console.log('Successfully fetch')
            res.status(200).json(data)
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (error) {
        console.log(error, 'Error')
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Updated Person API
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Get the ID from request parameters (URL)
        const updatedPersonData = req.body; // Get updated data from request body

        // Find the person by ID and update with new data
        const updatedData = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        })

        if (!updatedData) {
            res.status(404).json({ error: 'Person not found' })
        }

        console.log('Updated successfully')
        res.status(200).json(updatedData)
    } catch (error) {
        console.log(error, 'Error')
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Deleted Person API
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Get the ID from request parameters (URL)

        // Find the person by ID and delete data
        const deleteData = await Person.findByIdAndDelete(personId);

        if (!deleteData) {
            res.status(404).json({ error: 'Person not found' })
        }

        console.log('Delete successfully')
        res.status(200).json({ message: 'Person delete successfully ' })
    } catch (error) {
        console.log(error, 'Error')
        res.status(500).json({ error: 'Internal server error' })
    }
})
module.exports = router;