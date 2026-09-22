const express = require('express');
const router  = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const foodController = require('../controllers/food.controller');
const multer = require('multer');   

const upload = multer({
    storage: multer.memoryStorage()
})

/*
    
  @route POST /api/food/ [protected]
  @desc Create a new food item
  @access Private (Food Partner)
*/
router.post('/', 
    authMiddleware.authFoodPartnerMiddleware,
    upload.single('video'),
    foodController.createFood);


module .exports = router;

