module.exports = app => {
    const session = require("../controllers/session.controller.js");
    var router = require("express").Router();
    // Create a new Session
    router.post("/add", session.create);
    // Retrieve all Album
    /*router.get("/", album.findAll);
    // Retrieve a single Album with id
    router.get("/:id", album.findOne);
    // Update a Album with id
    router.put("/:id", album.update);
     // Retrieve Artist with Name
    router.get("/search/:albumName", album.findAllAlbum);
    // Delete a Album with id
    router.delete("/:id", album.delete);
    // Delete all Album
    router.delete("/", album.deleteAll);*/
    app.use('/api/session', router);
  };