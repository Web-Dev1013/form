const { menu } = require("../models/index.js");

module.exports = app => {
    const menus = require("../controllers/menu.controller.js");

    var router = require("express").Router();

   //Create a new Parent
    router.post("/parents", menus.createParent);

    //create a new submenu
    router.post("/submenus", menus.createSubMenu);

    //create a new category
    router.post("/categories", menus.createCategory);

    //get all Parents 
    router.get("/parents", menus.getAllParents);

    //getg all Submenus
    router.get("/submenus", menus.getAllSubMenus);

    //get all Categories
    router.get("/categories", menus.getAllCategories);

    router.delete("/parent/:id", menus.deleteParent);

    router.delete("/submenu/:id", menus.deleteSubMenu);

    router.delete("/category/:id", menus.deleteCategory);

    router.put("/parent/:id", menus.updateParent);

    router.put("/submenu/:id", menus.updateSubmenu);

    router.put("/category/:id", menus.updateCategory);
    
    app.use('/api/menu', router);
}