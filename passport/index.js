const LocalStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const User = require('../model/admin');

module.exports=function(passport){
passport.use(new LocalStrategy(function (username, password, done) {

    User.findOne({
            username: username
        })
        .then((user) => {
            if (!user) return done(null, false);
            else {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) return done(null, false);
                    else if (!isMatch) return done(null, false);
                    else return done(null, user);
                })
            }
        })
        .catch(err => {
            return done(err);
        })

}));
passport.serializeUser(function (user,done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done){
  User.findById(id, function (err,user) {
    done(err, user);
  });
});
};
