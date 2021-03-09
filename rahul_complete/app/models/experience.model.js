module.exports = (sequelize, Sequelize) => {
    const Experience = sequelize.define("experience", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true
        // },
        title: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        shortDes: {
            type: Sequelize.STRING
        },
        detailDes: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.STRING
        },
        reviews: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.STRING
        },
        img1: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        },
        username: {
            type: Sequelize.STRING
        },
        userrole: {
            type: Sequelize.STRING
        }
    });

    return Experience;
};