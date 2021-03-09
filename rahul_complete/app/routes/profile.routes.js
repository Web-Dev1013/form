module.exports = app => {
    const profile = require("../controllers/profile.controller.js");

    var router = require("express").Router();

    //Retrieve all Users
    router.get("/:id", profile.getUser);


    app.use('/api/profile', router);

    //Update a User with id
    router.put("/:id", profile.updateUser);

    //Update password with id
    router.put("/password/:id", profile.updatePassword);
}