const User = require('./models/user')
const questions = require('./questions')

module.exports = setupRoutes;

function setupRoutes(app, passport) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', isLoggedIn, (req, res) => {
    // add a random question to the data that we're sending to EJS
    const randomIndex = Math.floor(Math.random() * questions.length)
    const data = questions[randomIndex]

    // add the user's previously chosen answers to the data
    data.chosenAnswers = req.user.choices

    // render index.ejs with the info in data
    res.render('index.ejs', data);
  });

  app.post('/choice', isLoggedIn, (request, response) => {
    console.log(request.body) // { choice: "Plane" or "Boat", question: "blah blah" }
    const newChoice = { question: request.body.question, choice: request.body.choice }

    // save to the database
    request.user.choices.push(newChoice)
    request.user.save()

    response.json({ success: true })
  })

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}
