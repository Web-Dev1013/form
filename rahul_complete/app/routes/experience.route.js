module.exports = app => {
  const experiences = require("../controllers/experiences.controiller.js");

  var router = require("express").Router();

  //Create a new Experience
  router.post("/", experiences.create);

  //Retrieve all Experiences
  router.get("/", experiences.findAll);

  //Retrieve all Published Experiences
  router.get("/published", experiences.findAllPublished);

  //Retrieve a single Experience with id
  router.get("/:id", experiences.findOne);

  //Update a Experience with id
  router.put("/:id", experiences.update);

  //Delete a experience with id
  router.delete("/:id", experiences.delete);

  //Delete all Experiences
  router.delete("/", experiences.deleteAll);

  app.use('/api/experiences', router);
}