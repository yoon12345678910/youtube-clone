const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');
const User = require('../models/user');

const googleOauth = new GoogleStrategy(
  {
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: `${keys.baseURI}/auth/google/callback`,
    passRequestToCallback: true
  },
  async (_, __, ___, profile, done) => {
    const googleId = profile.id
    const user = await User.findOne({ googleId });
    
    if(!user) {
      const newUser = new User({
        googleId,
        username: profile.displayName,
        email: profile.emails[0].value,
        imageUrl: profile.photos[0].value
      });
      await newUser.save();
    }
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
  failureRedirect: `${keys.baseURI}`,
  session: false
});

const googleRedirect = (_, res) => {
  res.redirect(`${keys.baseURI}`);
};

module.exports = {
  googleOauth,
  googleScope,
  googleCallback,
  googleRedirect
};