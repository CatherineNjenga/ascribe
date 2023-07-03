'use strict';
require('dotenv').config();

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./db/connect');
const { isActiveRoute } = require('./helpers/routeHelpers');

const app = express();
const port = process.env.PORT || 3000;

// extra packages
app.set('trust proxy', 1);
app.use(rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));
app.use(helmet());
app.use(cors());
app.use(xss());

const mainRouter = require('./routes/main');
const adminRouter = require('./routes/admin');
const postRouter = require('./routes/post');
const authUser = require('./middleware/authentication');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// cookies
const cookieParser = require('cookie-parser');

// sessions
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo');
const MongoDBStore = require('connect-mongodb-session')(expressSession);

var store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions',
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});

passport.use(
  new LocalStrategy(async(username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      });  
    } catch(err) {
      return done(err);
    };
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

app.use(expressSession({ 
  secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true,
  store: store,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  cookie: { signed: true, maxAge: 3600000 },
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  })
}));

app.use(express.static('public'));

// decode request params url, request body's json
app.use(express.urlencoded( { extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.locals.isActiveRoute = isActiveRoute;

// routes
app.use('/', mainRouter);
app.use('/', adminRouter);
app.use('/', authUser, postRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening on port: ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();