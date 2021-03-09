const db = require("../models");
const Booking = db.booking;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: bookings } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, bookings, totalPages, currentPage };
};

//create and save a new experience
exports.createBooking = (req, res) => {
    // validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //create a Experience
    const booking = {
        username: req.body.username,
        useremail: req.body.useremail,
        product: req.body.product,
        location: req.body.location,
        total_price: req.body.total_price,
        date: req.body.date,
        time: req.body.time
        // published: req.body.published ? req.body.published : false
    };

    //Save Exeprience in the database
    Booking.create(booking)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Experience."
            });
        });
};

//Retrieve all experiences from the database.
exports.getAllBookings = (req, res) => {
    const { location, page, size } = req.query;
    var condition = location ? { location: { [Op.like]: `%${location}%`}}: null;
    
    const { limit, offset } = getPagination(page, size);

    Booking.findAndCountAll({ where: condition, limit, offset })
        .then(data => {
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