const express = require('express')
const app = express();
require('dotenv').config();

const db = require('./db')
const personRoutes = require('./routes/personRoutes')
const menuItemsRoutes = require('./routes/menuItemsRoutes')
const passport = require('./auth');

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000;

// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Resquest Made to : ${req.originalUrl}`)
    next();
}
app.use(logRequest)


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false })

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/person', personRoutes)
app.use('/menuItems', menuItemsRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});