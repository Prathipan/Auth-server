const { ObjectId } = require("mongodb");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const GithubStrategy = require("passport-github2")
const { connectDB } = require("./config");

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

passport.use(
    new GoogleStrategy({
        clientID : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL : "/auth/google/callback"
    },async(accessToken, refreshToken, profile, done) => {
        console.log("callback fired");
        console.log(profile);

        const db = await connectDB();

        db.collection("register").findOne({googleId : profile.id}).then((currentUser) => {
            if(currentUser){
                console.log("Current User :" , currentUser);
                done(null,currentUser);
            }
            else{
                db.collection("register").insertOne({name : profile.displayName , googleId : profile.id , thumbnail : profile.photos[0].value}).then( (newUser) =>{
                    console.log("New user created : " , newUser);
                    done(null,newUser);
                })
            }
        })
    })
)

passport.use(
    new GithubStrategy({
        clientID : process.env.GITHUB_CLIENT_ID,
        clientSecret : process.env.GITHUB_CLIENT_SECRET,
        callbackURL : "/auth/github/callback"
    },async(accessToken, refreshToken, profile, done) => {
        console.log("callback fired");
        console.log(profile);

        const db = await connectDB();

        db.collection("register").findOne({githubId : profile.id}).then((currentUser) => {
            if(currentUser){
                console.log("Current User :" , currentUser);
                done(null,currentUser);
            }
            else{
                db.collection("register").insertOne({name : profile.displayName , githubId : profile.id , thumbnail : profile.photos[0].value}).then( (newUser) =>{
                    console.log("New user created : " , newUser);
                    done(null,newUser);
                })
            }
        })
    })
)