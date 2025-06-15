import { Router } from "express"
import passport from "passport"
const router=Router()
router.get('/login', (req, res) => {
    res.render('login',{user:req.user})
})
//auth with google
router.get('/google',passport.authenticate('google',{
    scope:['profile']
}))

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    // res.send(req.user);
    res.redirect('/profile/')
})
router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});
//export router
export default router