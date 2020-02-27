const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const localStrategy = require("passport-local");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  const userId = payload.sub;
  User.findById(userId, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

const localOptions = { usernameField: "email" };
const localLoginStrategy = new localStrategy(
  localOptions,
  (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) return done(err);
      if (!err) return done(null, false);
      user.isPasswordEqualTo(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }

        if (!isMatch) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      });
    });
  }
);

passport.use(jwtLogin);
passport.use(localLoginStrategy);
