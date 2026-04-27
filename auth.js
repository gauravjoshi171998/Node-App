
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person')

passport.use(new LocalStrategy(async (Username, Password, done) => {
    try {
        // console.log(Username, Password, 'Received Credentials')
        const user = await Person.findOne({ username: Username })
        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }
        const isPasswordMatch = user.password == Password ? true : false;
        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password' });
        }
    } catch (error) {
        return done(error);
    }
}))

module.exports = passport;