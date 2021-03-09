const { category } = require("../models");
const db = require("../models");

const Parent = db.parent;
const SubMenu = db.subMenu;
const Category = db.category;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: menus } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, menus, totalPages, currentPage };
};

//create and save a new parent
exports.createParent = (req, res) => {
    // validate request
    if (!req.body.parent_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //create a Parent
    const parent = {
        parent_id: req.body.parent_id,
        parent_name: req.body.parent_name,

    };

    //Save Exeprience in the database
    Parent.create(parent)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the parent."
            });
        });
};

//create and save a new submenu
exports.createSubMenu = (req, res) => {
    // validate request
    if (!req.body.subMenu_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //create a Parent
    const subMenu = {
        parent_id: req.body.parent_id,
        subMenu_id: req.body.subMenu_id,
        subMenu_name: req.body.subMenu_name,

    };

    //Save Exeprience in the database
    SubMenu.create(subMenu)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the submenu."
            });
        });
};

//create and save a new category
exports.createCategory = (req, res) => {
    // validate request
    if (!req.body.parent_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //create a Parent
    const category = {
        parent_id: req.body.parent_id,
        subMenu_id: req.body.subMenu_id,
        category_id: req.body.category_id,
        category_name: req.body.category_name

    };

    //Save Exeprience in the database
    Category.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the category."
            });
        });
};

//get all parents 
exports.getAllParents = (req, res) => {
    
    Parent.findAll( )
        .then(data => {
            
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

//get all subMenus 
exports.getAllSubMenus = (req, res) => {
    var condition;
    const {parent_id} = req.query;
    if (parent_id) {
        condition = {parent_id: parent_id};
    } else {
        condition = null;
    }
    SubMenu.findAll( {where: condition} )
        .then(data => {
            
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

//get all parents 
exports.getAllCategories = (req, res) => {
    const { parent_id, subMenu_id } = req.query;
    if( parent_id ) {
        if(subMenu_id) {
            condition =  {parent_id: parent_id, subMenu_id: subMenu_id};
        }else {
            condition = {parent_id: parent_id};
        }

    }else {
        if(subMenu_id) {
            condition = { subMenu_id: subMenu_id };
        }else {
            condition = null;
        }
    }
    Category.findAll({where: condition})
        .then(data => {
            
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

//Delete a Parent with the specified id
exports.deleteParent = (req, res) => {
    const id = req.params.id;

    Parent.destroy({
        where: { parent_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Parent was deleted succesfully!"
                });
            } else {
                res.send({
                    message: "Cannot delete Parent with id=${id}. Maybe Parent was not found or request is null."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Parent with id = " + id
            });
        });
};

exports.deleteSubMenu = (req, res) => {
    const id = req.params.id;

    SubMenu.destroy({
        where: { subMenu_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "subMenu was deleted succesfully!"
                });
            } else {
                res.send({
                    message: "Cannot delete SubMenu with subMenu_id=${id}. Maybe submenu was not found or request is null."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete submenu with id = " + id
            });
        });
};

exports.deleteCategory = (req, res) => {
    const id = req.params.id;

    Category.destroy({
        where: { category_name: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "category was deleted succesfully!"
                });
            } else {
                res.send({
                    message: "Cannot delete category with id=${id}. Maybe category was not found or request is null."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Parent with id = " + id
            });
        });
};

//Update a Parent idenitfied by the id in the request
exports.updateParent = (req, res) => {
    const id = req.params.id;

    Parent.update(req.body, {
        where: { parent_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Parent Menu was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Parent with id=${id}. Maybe Parent was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Parent with id=" + id
            });
        });
};

//Update a SubMenu idenitfied by the id in the request
exports.updateSubmenu = (req, res) => {
    const id = req.params.id;

    SubMenu.update(req.body, {
        where: {subMenu_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: " SubMenu was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update SubMenu with id=${id}. Maybe SubMenu was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Submenu with id=" + id
            });
        });
};

//Update a Category idenitfied by the id in the request
exports.updateCategory = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, {
        where: { category_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category Menu was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Category with id=" + id
            });
        });
};