const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth2');
require('dotenv').config(); 
const User = require('./models/userModels'); // Assuming you have a User model defined
const FacebookStrategy = require('passport-facebook').Strategy;

const authUser=(accessToken, refreshToken, profile, done) => {
  User.findOne({ _id: profile.emails[0].value})
    .then(existingUser => {
      if (existingUser) {
        return done(null, existingUser); // User already exists, return existing user
      } else {
        const newUser = new User({
          _id: profile.emails[0].value,
          username: profile.displayName,
          // Other user details...
        });
        return newUser.save();
      }
    })
    .catch(err => {
      console.log(err) // Handle any errors
    });
}
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  }, authUser));

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:5000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email'] // Specify fields to retrieve from Facebook
  },authUser));
passport.serializeUser((user, done) => {

  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
