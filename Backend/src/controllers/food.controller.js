
const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const { v4: uuidv4 } = require('uuid');

async function createFood(req, res) {
    try {
        console.log(req.body);
        console.log(req.file);

        const fileUploadResult = await storageService.uploadFile(
            req.file.buffer,
            uuidv4() + '-' + req.file.originalname
        );

        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id
        });

        res.status(201).json({
            success: true,
            message: "Food item created successfully",
            foodItem
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function getFoodItems(req, res) {
    try {
        const foodItems = await foodModel.find({});

        res.status(200).json({
            success: true,
            foodItems
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createFood,
    getFoodItems
};
