module.exports = (sequelize, Sequelize) => {
    const Parent = sequelize.define("parent", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true
        // },
        parent_id: {
            type: Sequelize.STRING
        },
        parent_name : {
            type: Sequelize.STRING
        }
    });

    

    

    return Parent;
};
