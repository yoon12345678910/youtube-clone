const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/user');

let userId;

const googleOauth = new GoogleStrategy(
  {
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: `http://localhost:${keys.port}/auth/google/callback`,
    passRequestToCallback: true
  },
  async (_, __, ___, profile, done) => {
    const googleId = profile.id;
    const user = await User.findOne({ googleId });
    
    if(!user) {
      const newUser = new User({
        googleId,
        username: profile.displayName,
        email: profile.emails[0].value,
        imageUrl: profile.photos[0].value
      });
      const savedUser = await newUser.save();
      userId = savedUser._id;
      const token = jwt.sign({
        id: userId
      }, keys.jwtSecret, { expiresIn: '7d' });

      savedUser.jwt = token;
      await savedUser.save();
      done(null, {});
    }
    
    userId = user._id;
    const newToken = jwt.sign({
      id: userId
    }, keys.jwtSecret, { expiresIn: '7d' });

    user.jwt = newToken;
    await user.save();
    done(null, {});
  }
);

const googleScope = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ]
});

const googleCallback = passport.authenticate('google', {
  failureRedirect: `http://localhost:3000`,
  session: false
});

const googleRedirect = (_, res) => {
  res.redirect(`http://localhost:3000/user/${userId}`);
};

module.exports = {
  googleOauth,
  googleScope,
  googleCallback,
  googleRedirect
};