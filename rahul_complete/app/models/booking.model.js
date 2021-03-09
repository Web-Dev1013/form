module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("booking", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true
        // },
        username: {
            type: Sequelize.STRING
        },
        useremail: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING
        },
        time: {
            type: Sequelize.STRING
        },
        total_price: {
            type: Sequelize.INTEGER
        },
        product: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        }
    });

    return Booking;
}