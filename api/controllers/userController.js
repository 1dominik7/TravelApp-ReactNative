const User = require("../models/User");
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    deleteUser: async (req, res, next) => {
        try {
            await User.findByIdAndDelete(req.user.id)

            res.status(200).json({status: true, message: "User succesfully deleted"})
        } catch (error) {
            return next(error)
        }
    },

    getUser: async (req, res, next) => {
        const user_id = req.user.id;
        try {
            const user = await User.findById({_id: user_id}, {password: 0, __v: 0, createdAt: 0, updatedAt: 0})

            if(!user){
                return res.status(401).json({status: false, message: "User does not exist"})
            }

            res.status(200).json(user)
        } catch (error) {
            return next(error)
        }
    },

    addCard: async (req, res, next) => {
        
        try {
            const {userId, card}= req.body

            const user = await User.findById(userId)

            if(!user){
              return res.status(400).json({message:"User not found"})
            }
            
            user.cards.push(card)
            
            await user.save()
        
            res.status(200).json(user)
        
          } catch(err){
            return next(err)}
    },

    deleteCard: async (req, res, next) => {

        try {
            const userId = req.params.id
            const cardId = req.body.cardId
 
            let objectId = new mongoose.Types.ObjectId(cardId)

            const user = await User.findById(userId)

            if(!user){
              return res.status(400).json({message:"User not found"})
            }
            
            await User.findOneAndUpdate(
                {_id: userId},
                {$pull: {cards:{_id: objectId}}},
                { new: true }
              )
  
            await user.save()
        
            res.status(200).json(user)
        
          } catch(err){
            return next(err)}
    },
}
