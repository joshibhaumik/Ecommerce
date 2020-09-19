const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("./models/Users");

module.exports = passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google"
      },
      async (accessToken, refreshToken, profile, next) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value
        };
        try {
          let user = await User.findOne({googleId: profile.id});
          if(user === null) {
            let user_ = await User.create(newUser);
            next(null, user_);
          } else {
            next(null, user_);
          }
        } catch (error) {
          console.log(error);
          next(error);
        }
      }
    )
  );

  passport.serializeUser((user, next) => next(null, user.id));

  passport.deserializeUser((id, next) =>
    User.findById(id, (err, user) => next(err, user))
  );
};
