module.exports = app => {
    const products = require("../controllers/products.controller.js");

    var router = require("express").Router();

    // //Create a new Experience
    // router.post("/", products.create);

    //Retrieve all products
    router.get("/", products.findAll);

    //Retrieve all Published products
    // router.get("/published", products.findAllPublished);

    //Retrieve a single Experience with id
   // router.get("/:id", products.findOne);

    //Update a Experience with id
    // router.put("/:id", products.update);

    //Delete a experience with id
    // router.delete("/:id", products.delete);

    //Delete all products
    // router.delete("/", products.deleteAll);

    app.use('/api/products', router);
}