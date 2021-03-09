module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true
        // },
        parent_id: {
            type: Sequelize.STRING
        },
        subMenu_id : {
            type: Sequelize.STRING
        },
        category_id: {
            type: Sequelize.STRING
        },
        category_name: {
            type: Sequelize.STRING
        }
    });

    return Category;
}