module.exports = {

    authChecker: (req, res, next) => {
        // if (req.session.isLogged || req.path === '/login') {
        //     next();
        // } else {            
        //     res.redirect("/admin/user/login");
        // }
        next();
    }

}
