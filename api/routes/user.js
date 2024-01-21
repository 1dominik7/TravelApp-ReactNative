const router = require("express").Router();
const userController = require('../controllers/userController')
const {verifyToken} = require("../middleware/jwt_token")

router.delete('/',verifyToken, userController.deleteUser)
router.get('/',verifyToken,userController.getUser)
router.post('/cards', userController.addCard)
router.delete('/cards/:id', userController.deleteCard)


module.exports = router;