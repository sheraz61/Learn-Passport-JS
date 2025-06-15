import express from 'express'
import authRoutes from './routes/auth-routes.js'
import profileRoute from './routes/profile-routes.js'
import dotenv from 'dotenv'
import './config/passport-setup.js'
import passport from 'passport'
import mongoose from 'mongoose'
import session from 'express-session'

dotenv.config()

const DB_NM = 'Oauth'
const app = express()

// Connect to MongoDB
const connection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NM}`)
    console.log(`Connected to database`)
  } catch (error) {
    console.log(error.message)
  }
}
connection()

// ✅ Only use express-session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

// Set view engine
app.set('view engine', 'ejs')

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/auth', authRoutes)
app.use('/profile',profileRoute)
// Home route
app.get('/', (req, res) => {
  res.render('home',{user:req.user})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
