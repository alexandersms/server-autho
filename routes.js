const AuthentificationController = require('./controllers/authentification');
require("./services/passport")
const passport = require("passport");

const requireToken = passport.authenticate("jwt", { session: false })
module.exports = function (expressServer) {
    expressServer.post("/signup", AuthentificationController.signup)
    expressServer.get("/ressources", requireToken, (req, res) => {
        res.send({codeRessource: 42})
    })
};

