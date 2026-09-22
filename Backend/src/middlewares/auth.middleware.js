const foodPartnerModel = require('../models/foodpartner.model');

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


module.exports = {
    authFoodPartnerMiddleware
}
