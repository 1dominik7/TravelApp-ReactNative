const mongoose = require('mongoose');
const Reservation = require("../models/Reservation");
const User = require("../models/User");

module.exports = {
  addReservation: async (req, res, next) => {
    const user = req.user.id;
    const { guest, hotel, price, room_id, title, startDate, endDate } =
      req.body;

    try {
      const newReservation = new Reservation({
        user,
        guest,
        hotel,
        price,
        room_id,
        title,
        startDate,
        endDate,
      });

      await newReservation.save();

      const ReservationUser = await User.findById(user);
      ReservationUser.reservation.push(newReservation._id);

      await ReservationUser.save();

      res.status(200).json({ status: true });
    } catch (error) {
      return next(error);
    }
  },
  getReservation: async (req, res, next) => {
    const userId = req.params.id
    
    try {
        const users = await Reservation.find({user: userId}, {createdAt: 0, __v:0})

        res.status(200).json(users)
    } catch (error) {
        return next(error)
    }
},
  deleteReservation: async (req, res, next) => {
      const reservationId = req.params.id    

      let objectId = new mongoose.Types.ObjectId(reservationId)

    try {
      const reservation = await Reservation.findById(reservationId)
      const findUser = await User.findById(reservation.user)

      await User.findOneAndUpdate(
        {_id: findUser._id},
        {$pull: {reservation: objectId}},
        { new: true }
      )
      await Reservation.findByIdAndDelete(
        reservationId
    )
      
     res.status(200).json("Reservation has been deleted.")
    } catch (error) {
        return next(error)
    }
},
}
