const mongoose = require("mongoose")

const ReservationSchema = new mongoose.Schema({
    user: {type: String, require: true},
    guest: {type: Number, require: true},
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel"
    },
    price: {type: Number, require: true},
    room_id: {type: String, require: true},
    title: {type: String, require: true},
    startDate: {type: String, require: true},
    endDate: {type: String, require: true},
}, {timestamps: true})

module.exports = mongoose.model("Reservation", ReservationSchema)