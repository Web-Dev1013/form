const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    status: false
  })
    .then(user => {
      
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updatePassword = (req,res) => {
  User.findOne({
    where: {
      username: req.params.id
    }
  }).then(
    user => {
      if(!user) {
        return res.status(404).send({message: "User not found"});
      }
      var passwordIsValid = bcrypt.compareSync(req.body.currentPass, user.password);
      if(!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Current Password!"
        });
      }
      User.update({password: bcrypt.hashSync(req.body.newPass, 8)}, {
        where: { username: req.params.id }})
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

    })
   
}
exports.signin = (req, res) => {
  
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      console.log(user);
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      if(!user.dataValues.status) {
        return res.status(500).send({
          accessToken:null,
          message: "Please wait until admin allow."
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          status: user.status,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
