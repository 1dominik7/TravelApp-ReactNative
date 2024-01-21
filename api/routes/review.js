const router = require("express").Router();
const reviewController = require('../controllers/reviewController')
const {verifyToken} = require("../middleware/jwt_token")

router.post('/',verifyToken, reviewController.addReview)
router.get('/', reviewController.getAllReviews)
router.get('/:id', reviewController.getReviews)
router.get('/user/:id', reviewController.getUserReviews)

module.exports = router;