
const db = require('../models');
const User = db.user;

exports.getUser = (req, res) => {
    const id = req.body.id;

    User.findOne(id).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with username= " + username
            });
        });
}

exports.updateUser = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
        where: { username: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "User was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update User with username=${id}. Maybe User was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error updating User with id=" + id
        });
    });

}

exports.updatePassword = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
        where: { password: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Password was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update User with currentPassword=${id}. Maybe User was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error updating Password with currentPassword=" + id
        });
    });

}
