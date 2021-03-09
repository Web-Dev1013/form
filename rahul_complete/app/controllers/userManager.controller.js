const db = require("../models");
const authRoutes = require("../routes/auth.routes");
const User = db.user;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: users } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, users, totalPages, currentPage };
};

//Retrieve all users from the database.
exports.findAll = (req, res) => {
    const { searchTitle, page, size } = req.query;

    var condition = searchTitle ? { username: { [Op.like]: `%${searchTitle}%` } } : null;

    const { limit, offset } = getPagination(page, size);

    var authorities = [];
    var obj = {};
    User.findAndCountAll({ where: condition, limit, offset })
        .then(data => {
            if (data.rows) {
                data.rows.forEach((user, index) => {
                    if (user.status) {
                        data.rows[index].status = "allow";
                    } else {
                        data.rows[index].status = "pending";
                    }
                    data.rows[index].getRoles().then(roles => {
                        for (let i = 0; i < roles.length; i++) {
                            authorities.push("ROLE_" + roles[i].name.toUpperCase());
                        }
                        // res.status(200).send({
                        //     id: user.id,
                        //     username: user.username,
                        //     email: user.email,
                        //     roles: authorities,
                        //     status: user.status,

                        // });
                        obj = { ...data.rows[index], ...{ roles: authorities } };
                        data.rows[index] = obj;
                    })

                })
            }

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

exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating User with id=" + id
            });
        });
};
