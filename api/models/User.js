const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {type: String, require: true},
    email: {type: String, require: true, unique: true },
    password: {type: String, require: true},
    profile: {type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJXWdvwDZC0RF_VSzzP8aXSX9Sc_VPAtuew&usqp=CAU"},
    cards: [
        {
            cardNumber: String,
            cardHolderName: String,
            cardExpDate: String,
            cvc: String,
            cardType: String,
        },
      ],
    reservation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reservation"
        }
    ],
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);
