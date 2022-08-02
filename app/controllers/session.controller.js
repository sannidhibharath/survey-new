const db = require("../models");
const Session = db.session;
const Op = db.Sequelize.Op;
// Create and Save a new Session
exports.create = (req, res) => {
  // Validate request
  if (!req.body.sessionToken) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Session
  const session = {
    session_token: req.body.sessionToken,
    session_start_datetime: req.body.sessionStartdatetime,
    session_expiration_datetime: req.body.sessionExpirationdatetime,
    userId: req.body.userId
  };
  // Save Album in the database
 /* Album.findOne({where: {album_name:req.body.albumName}})
  .then(data => {
    if(data != undefined){
      res.status(409).send({
        message: "Album already exists. Please enter valid album details"
      });
    }else{
      Album.create(album)
    .then(data => {
      res.send(data);
    })
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Album."
    });
  });
};

// Retrieve all Albums from the database.
exports.findAll = (req, res) => {
    Album.findAll({
      include: ["artist","track"]
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving albums"
        });
      });
  };
  // Find a single Album with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
    Album.findByPk(id, { include: ["artist","track"] })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Album with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Album with id=" + id
        });
      });
  };
  // Update a Album by the id in the request
  exports.update = (req, res) => {
    const id = req.params.id;
    Album.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Album was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Album with id=${id}. Maybe Album was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating album with id=" + id
        });
      });
  };
  // Delete a Album with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
    Album.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "album was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete album with id=${id}. Maybe album was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete album with id=" + id
        });
      });
  };
  // Delete all album from the database.
  exports.deleteAll = (req, res) => {
    Album.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Album were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all albums."
        });
      });
  };
  // Find Artist with artist name
exports.findAllAlbum = (req, res) => {
  const album_name = req.params.albumName;
  var condition = album_name ? {
    album_name: {
      [Op.like]: `%${album_name}%`
    }
  } : null;

  Album.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving artist."
      });
    });*/
};