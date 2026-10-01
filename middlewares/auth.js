const { getUser } = require("../service/auth");

async function restrictToUserLoginOnly(req, res, next) {
    const userUId = req.cookies?.uid;

    if (!userUId) return res.redirect("/login");

    const user = await getUser(userUId);

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req,res,next){
   const userUId = req.cookies?.uid;



    const user = await getUser(userUId);



    req.user = user;
    next();

}

module.exports = {
    restrictToUserLoginOnly,
    checkAuth
};