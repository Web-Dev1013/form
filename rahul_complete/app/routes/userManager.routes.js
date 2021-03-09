module.exports = app => {
    const userManager = require("../controllers/userManager.controller.js");

    var router = require("express").Router();

    //Retrieve all Users
    router.get("/all", userManager.findAll);


    app.use('/api/users', router);

    //Update a User with id
    router.put("/:id", userManager.update);

}