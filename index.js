const express = require("express");
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');
const customMware = require('./config/middleware');
//passport
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportGoogle = require('./config/passport-google-strategy');
//session
const session = require("express-session");
const MongoStore = require("connect-mongo");
const store = MongoStore.create({
  mongoUrl: "mongodb://localhost/authentication_system",
  ttl: 14 * 24 * 60 * 60,
  autoRemove: "disabled",
});

//cookie parser
app.use(cookieParser());

//parser function
app.use(express.urlencoded());

//express layouts
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//accessing static files
app.use(express.static("assets"));

//set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "Authentication system",
    secret: "secretkeytoencriptanddecript",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: store,
    function(err) {
      console.log(err || "connect-mongodb setup ok");
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//flash
app.use(flash());
app.use(customMware.setFlash);

//set up the route
app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in starting the server");
    return;
  }

  console.log("Server is running on port:", port);
});
