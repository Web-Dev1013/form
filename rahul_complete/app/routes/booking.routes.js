const { booking } = require("../models/index.js");

module.exports = app => {
    const bookings = require("../controllers/booking.controller.js");

    var router = require("express").Router();

   //Create a new Parent
    router.post("/", bookings.createBooking);

    
    router.get("/", bookings.getAllBookings);

    app.use('/api/booking', router);
}