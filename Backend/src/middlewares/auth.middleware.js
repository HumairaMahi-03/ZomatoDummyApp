const foodPartnerModel = require('../models/foodpartner.model');
const User = require('../models/user.model');

const jwt = require('jsonwebtoken');


async function authFoodPartnerMiddleware(req,res,next){
    
        const token = req.cookies.token;
    
        if(!token){
            return res.status(401).json({ message: 'Unauthorized access' });
        }
    
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
            const foodPartner = await foodPartnerModel.findById(decoded.id);
    
            if(!foodPartner){
                return res.status(401).json({ message: 'Unauthorized' });
            }
    
            req.foodPartner = foodPartner;
    
            next();
        }catch(err){
            return res.status(401).json({ message: 'Unauthorized access, please login first' });
        }  
     
}


async function authUserMiddleware(req, res, next) {
         
        const token = req.cookies.token;
    
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
    
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
            // Assuming you have a User model to fetch user details
            const user = await User.findById(decoded.id);
    
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
    
            req.user = user;
    
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Unauthorized access, please login first' });
        }
    
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}
