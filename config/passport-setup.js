import passport from "passport";
import GoogleStrategy from "passport-google-oauth20"
import dotenv from "dotenv";
import User from '../models/user-model.js'
dotenv.config();

passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})
passport.use(new GoogleStrategy({
    //options for strategy
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/redirect",
}, (accessToken, refreshToken, profile, done) => {
    //passport call back function
    User.findOne({googleId:profile.id}).then((currentUser)=>{
if(currentUser){
    //already have user
    done(null,currentUser)
}else{
    //create user   
    new User({
        username: profile.displayName,
        googleId: profile.id,
        thumbnail:profile.photos[0].value
    }).save().then((newUser) => {
        done(null,newUser)
    })
}
    })
})
)
export default {};