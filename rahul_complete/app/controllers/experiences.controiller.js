const db = require("../models");
const Experience = db.experience;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: experiences } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, experiences, totalPages, currentPage };
};

//create and save a new experience
exports.create = (req, res) => {
    // validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //create a Experience
    const experience = {
        username: req.body.userName,
        userrole: req.body.userRole,
        title: req.body.title,
        category: req.body.category,
        shortDes: req.body.shortDes,
        detailDes: req.body.detailDes,
        location: req.body.location,
        price: req.body.price,
        reviews: req.body.reviews,
        rating: req.body.rating,
        img1: req.body.img1,
        published: req.body.published ? req.body.published : false
    };

    //Save Exeprience in the database
    Experience.create(experience)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Experience."
            });
        });
};

//Retrieve all experiences from the database.
exports.findAll = (req, res) => {
    const { userRole, userName, title, page, size } = req.query;
    if (userRole == 'ROLE_MODERATOR') {
        var condition = title ? { title: { [Op.like]: `%${title}%` }, username: userName } : { username: userName };
    } else if (userRole == 'ROLE_ADMIN') {
        var condition = title ? { title: { [Op.like]: `%${title}%`}}: null;
    }
    const { limit, offset } = getPagination(page, size);

    Experience.findAndCountAll({ where: condition, limit, offset })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
// find a experience with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Experience.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

//Update a Experience idenitfied by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Experience.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Experience was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Experience with id=${id}. Maybe Experience was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Experience with id=" + id
            });
        });
};

//Delete a Experience with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    Experience.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Experience was deleted succesfully!"
                });
            } else {
                res.send({
                    message: "Cannot delete Experience with id=${id}. Maybe Experience was not found or request is null."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Experience with id = " + id
            });
        });
};

//Delete all Experience from the database
exports.deleteAll = (req, res) => {
    Experience.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Expreiences were deleted successfully` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all experiences."
            });
        });
};

//Find all Experiences with published = true
exports.findAllPublished = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    Experience.findAndCountAll({
        where: { published: true }, limit, offset
    })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving experiences."
            });
        });
};