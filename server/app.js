const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3001;

mongoose.connect(
  "mongodb+srv://admin:7dlivingadmin@cluster0.x96foef.mongodb.net/store",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Generate a secure random key for express-session
const generateRandomKey = () => {
  return crypto.randomBytes(64).toString("hex");
};

// Use the generated key in your express-session middleware
app.use(
  session({
    secret: generateRandomKey(),
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "248794368477-qpuqldnp0qfqtaqr29f5tcu3aa84c8do.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // Save user profile data to your database or use it for authentication
      // In this example, we simply pass the profile to the callback
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Google Sign-In route
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Assuming req.user is populated with user data after successful authentication
    const userEmail = req.user.emails[0].value;

    // Send the user data to the parent window
    res.send(
      `<script>
        window.opener.postMessage({ email: "${userEmail}" }, "*");
      </script>`
    );
  }
);

const qnaAdminRoutes = require("./src/Routes/qnaAdminRoutes");
const CategoryRoutes = require("./src/Routes/CategoryRoutes");
const SignUpRoutes = require("./src/Routes/SignUpRoutes");

app.use("/api/qna", qnaAdminRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/loginsignup", SignUpRoutes);

process.on("SIGINT", () => {
  mongoose.connection.close(); // Remove the callback
  console.log("MongoDB connection closed.");
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
