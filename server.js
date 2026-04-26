const express = require('express')
const app = express();
const db = require('./db')

const bodyParser = require('body-parser')
app.use(bodyParser.json())


const personRoutes = require('./routes/personRoutes')
const menuItemsRoutes = require('./routes/menuItemsRoutes')

app.use('/person', personRoutes)
app.use('/menuItems', menuItemsRoutes)


app.get('/', (req, res) => {
    res.send('Hello World')
})



app.listen(3000, () => { console.log('Server is running on port 3000') })