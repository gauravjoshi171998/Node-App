const express = require('express')
const app = express();
const db = require('./db')
require('dotenv').config();

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const PROT = process.env.PROT || 3000

const personRoutes = require('./routes/personRoutes')
const menuItemsRoutes = require('./routes/menuItemsRoutes')

app.use('/person', personRoutes)
app.use('/menuItems', menuItemsRoutes)


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PROT, () => { console.log('Server is running on port 3000') })