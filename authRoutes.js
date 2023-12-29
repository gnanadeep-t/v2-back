const express = require('express');
const passport = require('./passportConfig');
const User = require('./models/userModels'); // Assuming you have a User model defined

const router = express.Router();

// ... Routes handling for Google Authentication
router.get('/auth/google',
passport.authenticate('google', { scope:
    [ 'profile','email' ] }
));

router.get('/auth/google/callback',
  passport.authenticate( 'google', {
      successRedirect: 'http://localhost:3000/',
      failureRedirect: '/auth/failure'
}));


// ... Routes handling for Facebook Authentication
router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    // Successful authentication, redirect or handle as needed
    res.redirect('http://localhost:3000/');
  }
);

// ... Routes handling for successful authentication
router.get('/auth/success', (req,res)=>{
  if(req.user){
    res.status(200).json({
      message: "success",
      user: req.user,
    })
  }
})

// ... Routes handling for authentication fail
router.get('/auth/failure',(req,res)=>{
  res.send("fb fail")
})

// ... Route handling for logout
router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('http://localhost:3000/');
  });
});

module.exports = router;
