var localStrategy = require('passport-local').Strategy;
const employeemodel = require('../models/employeemodel');
const vendormodel = require('../models/vendormodel');
//const benchsalesmodel = require('../models/benchsalesmodel');
//const trainingmodel = require('../models/trainingmodel');
//const jobseekermodel = require('../models/jodseekermodel');
const bcrypt = require('bcryptjs');

function SessionConstructor(userId, userGroup, details) {
  this.userId = userId;
  this.userGroup = userGroup;
  this.details = details;
}

module.exports = function (passport) {
    passport.use('employee', new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        employeemodel.findOne({ email: email }, (err, data) => {
            if (err) throw err;
            if (!data) {
                return done(null, false, { message: "User Doesn't Exists.." });
            }
            bcrypt.compare(password, data.password, (err, match) => {
               if (err) {
                    return done(null, false);
                }
                if (!match) {
                    return done(null, false, { message: "Password Doesn't Match" });
                }
                if (match) {
                    return done(null, data);
                }
            });

        });
    }));
    passport.use('vendor', new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        vendormodel.findOne({ email: email }, (err, data) => {
            if (err) throw err;
            if (!data) {
                return done(null, false, { message: "User Doesn't Exists.." });
            }
            bcrypt.compare(password, data.password, (err, match) => {
               if (err) {
                    return done(null, false);
                }
                if (!match) {
                    return done(null, false, { message: "Password Doesn't Match" });
                }
                if (match) {
                    return done(null, data);
                }
            });

        });
    }));
    passport.use('benchsales', new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        benchsalesmodel.findOne({ email: email }, (err, data) => {
            if (err) throw err;
            if (!data) {
                return done(null, false, { message: "User Doesn't Exists.." });
            }
            bcrypt.compare(password, data.password, (err, match) => {
               if (err) {
                    return done(null, false);
                }
                if (!match) {
                    return done(null, false, { message: "Password Doesn't Match" });
                }
                if (match) {
                    return done(null, data);
                }
            });

        });
    }));
    passport.use('training', new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        trainingmodel.findOne({ email: email }, (err, data) => {
            if (err) throw err;
            if (!data) {
                return done(null, false, { message: "User Doesn't Exists.." });
            }
            bcrypt.compare(password, data.password, (err, match) => {
               if (err) {
                    return done(null, false);
                }
                if (!match) {
                    return done(null, false, { message: "Password Doesn't Match" });
                }
                if (match) {
                    return done(null, data);
                }
            });

        });
    }));
    passport.use('jobseeker', new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        jobseekermodel.findOne({ email: email }, (err, data) => {
            if (err) throw err;
            if (!data) {
                return done(null, false, { message: "User Doesn't Exists.." });
            }
            bcrypt.compare(password, data.password, (err, match) => {
               if (err) {
                    return done(null, false);
                }
                if (!match) {
                    return done(null, false, { message: "Password Doesn't Match" });
                }
                if (match) {
                    return done(null, data);
                }
            });

        });
    }));


    passport.serializeUser(function (userObject, done) {
   // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
     let userGroup = "model1";
     let userPrototype =  Object.getPrototypeOf(userObject);
     if (userPrototype === employeemodel.prototype) {
       userGroup = "model1";
     } else if (userPrototype === vendormodel.prototype) {
     userGroup = "model2";
    }
    let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
    done(null,sessionConstructor);
   });


  passport.deserializeUser(function (sessionConstructor, done) {
   if (sessionConstructor.userGroup == 'model1') {
     employeemodel.findOne({
         _id: sessionConstructor.userId
     }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
         done(err, user);
     });
   } else if (sessionConstructor.userGroup == 'model2') {
     vendormodel.findOne({
         _id: sessionConstructor.userId
     }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
         done(err, user);
     });
   }
 });




    /*passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function (id, cb) {
        user.findById(id, function (err, user) {
            cb(err, user);
        });
    });*/
}
// ---------------
// end of autentication statregy
