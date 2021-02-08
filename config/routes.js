const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
const vendormodel = require('../models/vendormodel');
const employeemodel = require('../models/employeemodel');
const benchsalesmodel = require('../models/benchsalesmodel');
const jobseekermodel = require('../models/jobseekermodel');
const trainingmodel = require('../models/trainingmodel');
const contactusmodel = require('../models/contactusmodel');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
/*const mongourl = require('../config/mongokey');*/
require('./passport')(passport);


// using Bodyparser for getting form data
routes.use(bodyparser.urlencoded({ extended: true }));
// using cookie-parser and session
routes.use(cookieParser('secret'));
routes.use(session({
    secret: 'secret',
    maxAge: 3600000,
    resave: true,
    saveUninitialized: true,
}));
// using passport for authentications
routes.use(passport.initialize());
routes.use(passport.session());
// using flash for flash messages
routes.use(flash());

// MIDDLEWARES
// Global variable
routes.use(function (req, res, next) {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
});

const checkAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        return next();
    } else {
        res.redirect('/login');
    }
}

// Connecting To Database
// using Mongo Atlas as database
mongoose.connect('mongodb://mouni1997:mounika75@fifocluster-shard-00-00.dx5lk.mongodb.net:27017,fifocluster-shard-00-01.dx5lk.mongodb.net:27017,fifocluster-shard-00-02.dx5lk.mongodb.net:27017/Fifo-database?ssl=true&replicaSet=atlas-h4enxu-shard-0&authSource=admin&retryWrites=true&w=majority' ,{
    useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => console.log("Database Connected")
);


// ALL THE ROUTES
/*routes.get('/', (req, res) => {
    res.render('index');
})

routes.post('/register', (req, res) => {
    var { email, username, password, confirmpassword } = req.body;
    var err;
    if (!email || !username || !password || !confirmpassword) {
        err = "Please Fill All The Fields...";
        res.render('index', { 'err': err });
    }
    if (password != confirmpassword) {
        err = "Passwords Don't Match";
        res.render('index', { 'err': err, 'email': email, 'username': username });
    }
    if (typeof err == 'undefined') {
        user.findOne({ email: email }, function (err, data) {
            if (err) throw err;
            if (data) {
                console.log("User Exists");
                err = "User Already Exists With This Email...";
                res.render('index', { 'err': err, 'email': email, 'username': username });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash;
                        user({
                            email,
                            username,
                            password,
                        }).save((err, data) => {
                            if (err) throw err;
                            req.flash('success_message', "Registered Successfully.. Login To Continue..");
                            res.redirect('/login');
                        });
                    });
                });
            }
        });
    }
});*/
routes.get('/employee', (req, res) => {
    res.render('employee');
})

routes.post('/register/employee', (req, res) => {
     var { username,email,phone, password, cpass} = req.body;
    var err;
    if (!username || !email || !phone || !password || !cpass) {
        err = "Please Fill All The Fields...";
        res.render('employee', { 'err': err });
    }
    if (password != cpass) {
        err = "Passwords Don't Match";
        res.render('employee', { 'err': err,  'username': username ,'email': email,'phone':phone});
    }
    if (typeof err == 'undefined') {
        employeemodel.findOne({ email: email }, function (err, data) {
            if (err) throw err;
            if (data) {
                console.log("User Exists");
                err = "User Already Exists With This Email...";
                res.render('employee', { 'err': err, 'username': username,'email': email, 'phone':phone });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash;
                        employeemodel({
                          username,
                            email,
                          password,
                          phone,

                        }).save((err, data) => {
                            if (err) throw err;
                             req.flash('success_message', "Registered Successfully.. Login To Continue..");
                            //res.redirect('/suc');
                            res.redirect('/suc');
                          //  res.render('/suc');
                        });
                    });
                });
            }
        });
    }
});


routes.get('/vendor', (req, res) => {
    res.render('vendor');
})

routes.post('/vendor', (req, res) => {
     var { username,email,phone, password, cpass,cname,address,country } = req.body;
    var err;
    if (!username || !email || !phone || !password || !cpass || !cname || !address || !country) {
        err = "Please Fill All The Fields...";
        res.render('vendor', { 'err': err });
    }
    if (password != cpass) {
        err = "Passwords Don't Match";
        res.render('vendor', { 'err': err,  'username': username ,'email': email,'phone':phone,'cname':cname, 'address':address,'country':country});
    }
    if (typeof err == 'undefined') {
        vendormodel.findOne({ email: email }, function (err, data) {
            if (err) throw err;
            if (data) {
                console.log("User Exists");
                err = "User Already Exists With This Email...";
                res.render('vendor', { 'err': err, 'username': username,'email': email, 'phone':phone, 'cname':cname, 'address':address,'country':country });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash;
                        vendormodel({
                          username,
                            email,
                          password,
                          phone,
                          cname,
                          address,
                          country,
                        }).save((err, data) => {
                            if (err) throw err;
                             req.flash('success_message', "Registered Successfully.. Login To Continue..");
                            res.redirect('/suc');

                        });
                    });
                });
            }
        });
    }
});


routes.get('/benchsales', (req, res) => {
    res.render('benchsales');
})

routes.post('/benchsales', (req, res) => {
     var { username,email,cname,phone, password, cpass} = req.body;
    var err;
    if (!username || !email || !cname || !phone || !password || !cpass) {
        err = "Please Fill All The Fields...";
        res.render('benchsales', { 'err': err });
    }
    if (password != cpass) {
        err = "Passwords Don't Match";
        res.render('benchsales', { 'err': err,  'username': username ,'email': email,'cname':cname, 'phone':phone});
    }
    if (typeof err == 'undefined') {
        benchsalesmodel.findOne({ email: email }, function (err, data) {
            if (err) throw err;
            if (data) {
                console.log("User Exists");
                err = "User Already Exists With This Email...";
                res.render('benchsales', { 'err': err, 'username': username,'email': email, 'cname':cname,'phone':phone});
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash;
                        benchsalesmodel({
                          username,
                            email,
                            cname,
                            phone,
                          password,
                        }).save((err, data) => {
                            if (err) throw err;
                             req.flash('success_message', "Registered Successfully.. Login To Continue..");
                            res.redirect('/suc');
                        });
                    });
                });
            }
        });
    }
});

routes.get('/jsreg', (req, res) => {
    res.render('jsreg');
})

routes.post('/jobseekerreg', (req, res) => {
     var { fname,lname,email,password, cpass,mobile,location,date,title, experience,resume,salary,employment,relocate,visa} = req.body;
    var err;
    if (!fname || !lname || !email || !password || !cpass || !mobile || !location || !title || !experience || !resume || !salary || !employment || !relocate  || !visa) {
        err = "Please Fill All The Fields...";
        res.render('jsreg', { 'err': err });
    }
    if (password != cpass) {
        err = "Passwords Don't Match";
        res.render('jsreg', { 'err': err,  'fname': fname ,'lname': lname ,'email': email, 'mobile':mobile,'location':location,'title':title,'experience': experience, 'resume':resume,'salary':salary,'employment':employment,'relocate':relocate,'visa':visa});
    }
    if (typeof err == 'undefined') {
        jobseekermodel.findOne({ email: email }, function (err, data) {
            if (err) throw err;
            if (data) {
                console.log("User Exists");
                err = "User Already Exists With This Email...";
                res.render('jsreg', { 'err': err, 'fname': fname ,'lname': lname ,'email': email, 'mobile':mobile,'location':location,'title':title,'experience': experience, 'resume':resume,'salary':salary,'employment':employment,'relocate':relocate,'visa':visa});
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash;
                        jobseekermodel({
                          fname,
                          lname,
                            email,
                            mobile,
                            location,
                            date,
                            title,
                            experience,
                            resume,
                            salary,
                            employment,
                            relocate,
                            visa,
                          password,
                        }).save((err, data) => {
                            if (err) throw err;
                             req.flash('success_message', "Registered Successfully.. Login To Continue..");
                            res.redirect('/suc');
                        });
                    });
                });
            }
        });
    }
});


routes.get('/trainingreg', (req, res) => {
    res.render('trainingreg');
})

routes.post('/training', (req, res) => {
     var { username,email,phone,tech,visa,password, cpass} = req.body;
    var err;
    if (!username || !email || !phone || !tech || !visa  || !password || !cpass) {
        err = "Please Fill All The Fields...";
        res.render('trainingreg', { 'err': err });
    }
    if (password != cpass) {
        err = "Passwords Don't Match";
        res.render('trainingreg', { 'err': err,  'username': username ,'email': email, 'phone':phone,'tech':tech,'visa':visa});
    }
    if (typeof err == 'undefined') {
        trainingmodel.findOne({ email: email }, function (err, data) {
            if (err) throw err;
            if (data) {
                console.log("User Exists");
                err = "User Already Exists With This Email...";
                res.render('trainingreg', { 'err': err, 'username': username,'email': email, 'phone':phone,'tech':tech,'visa':visa});
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash;
                        trainingmodel({
                          username,
                            email,
                            phone,
                            tech,
                            visa,
                          password,
                        }).save((err, data) => {
                            if (err) throw err;
                             req.flash('success_message', "Registered Successfully.. Login To Continue..");
                            res.redirect('/suc');
                        });
                    });
                });
            }
        });
    }
});

routes.get('/contactus', (req, res) => {
    res.render('contactus');
})

routes.post('/contactus', (req, res) => {
     var { username,email,phone,country,subject,message} = req.body;
    var err;
    if (!username || !email || !phone || !country || !subject  || !message) {
        err = "Please Fill All The Fields...";
        res.render('contactus', { 'err': err });
    }
    if (typeof err == 'undefined') {
        contactusmodel.findOne({ email: email }, function (err, data) {
            if (err) throw err;
            if (data) {
                console.log("User Exists");
                err = "User Already Exists With This Email...";
                res.render('contactus', { 'err': err, 'username': username,'email': email, 'phone':phone,'country':country,'subject':subject,'message':message});
            } /*else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash;*/
                        contactusmodel({
                          username,
                            email,
                            phone,
                            country,
                            subject,
                          message,
                        }).save((err, data) => {
                            if (err) throw err;
                             req.flash('success_message', "Registered Successfully.. Login To Continue..");
                            res.redirect('/suc');
                        });
                  /*  });
                });
            }*/
        });
    }
});

// Authentication Strategy
// ---------------


routes.get('/login', (req, res) => {
    res.render('login');
});
routes.post('/login', (req, res, next) => {
  if(req.body.typeOfLogin == 'employee'){
    passport.authenticate('employee', {
        failureRedirect: '/login',
        successRedirect: '/employeeaccount',
        failureFlash: true,
    })(req, res, next);
    debugger
  } else if(req.body.typeOfLogin == 'vendor'){
      passport.authenticate('vendor', {
          failureRedirect: '/login',
          successRedirect: '/vendoraccount',
          failureFlash: true,
      })(req, res, next);
    }  else if(req.body.typeOfLogin == 'benchsales'){
        passport.authenticate('benchsales', {
            failureRedirect: '/login',
            successRedirect: '/benchsalesaccount',
            failureFlash: true,
        })(req, res, next);
      }   else if(req.body.typeOfLogin == 'jobseeker'){
            passport.authenticate('jobseeker', {
                failureRedirect: '/login',
                successRedirect: '/jobseekeraccount',
                failureFlash: true,
            })(req, res, next);
          } else if(req.body.typeOfLogin == 'training'){
              passport.authenticate('training', {
                  failureRedirect: '/login',
                  successRedirect: '/trainingaccount',
                  failureFlash: true,
              })(req, res, next);
            }

});
routes.get('/employeeaccount', checkAuthenticated, (req, res) => {
    res.render('employeeaccount', { 'user': req.user });
});
routes.get('/vendoraccount', checkAuthenticated, (req, res) => {
    res.render('vendoraccount', { 'user': req.user });
});
routes.get('/benchsalesaccount', checkAuthenticated, (req, res) => {
    res.render('benchsalesaccount', { 'user': req.user });
});
routes.get('/jobseekeraccount', checkAuthenticated, (req, res) => {
    res.render('jobseekeraccount', { 'user': req.user });
});
routes.get('/trainingaccount', checkAuthenticated, (req, res) => {
    res.render('trainingaccount', { 'user': req.user });
});

routes.get('/success', checkAuthenticated, (req, res) => {
    res.render('success', { 'user': req.user });
});


routes.get('/logout', (req, res) => {
    req.logout();
    res.redirect('index.html');
});



module.exports = routes;
