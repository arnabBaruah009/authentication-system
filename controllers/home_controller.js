//rendering home page
module.exports.home = function(req, res){
    if (req.isAuthenticated()) {
        return res.redirect("/user/home");
      }

    return res.render('user_sign_in', {
        title: 'Welcome'
    });
}