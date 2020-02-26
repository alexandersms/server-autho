module.exports = function (expressServer) {
    expressServer.get("/", (req, res, next) => {
        res.send({
            serverData : ["Alex", "Alexiane", "Méliane"]
        })
    })
}