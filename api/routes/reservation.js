const router = require("express").Router();
const reservationController = require("../controllers/reservationController");
const {verifyToken} = require("../middleware/jwt_token")

router.post('/',verifyToken, reservationController.addReservation)
router.get('/:id', reservationController.getReservation)
router.delete('/:id', reservationController.deleteReservation)


module.exports = router;