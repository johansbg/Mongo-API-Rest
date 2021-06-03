import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User from '../models/user';
require('dotenv').config()

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_SECRET;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
//
// create jwt strategy
module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload._id, (err, User) => {
      if(err){
        return done(err, false);
      }

      if(User){
        return done(null, User);
      } else {
        return done(null, false);
      }
    });
  }));
};
