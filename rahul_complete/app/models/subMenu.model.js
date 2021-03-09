module.exports = (sequelize, Sequelize) => {
    const SubMenu = sequelize.define("subMenu", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true
        // },
        parent_id: {
            type: Sequelize.STRING
        },
        subMenu_id: {
            type: Sequelize.STRING
        },
        subMenu_name: {
            type: Sequelize.STRING
        }
    });

    return SubMenu;
}