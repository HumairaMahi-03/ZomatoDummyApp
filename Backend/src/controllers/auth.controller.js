const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {
    
        const { fullName, email, password } = req.body;

        const isUserAlreadyExist = await userModel.findOne({ email });

        if (isUserAlreadyExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({ 
            fullName, 
            email, 
            password: hashedPassword 
        });


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token);

        res.status(201).json({ message: 'User registered successfully', 
            user : {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
         });

}

async function loginUser(req,res){
   
    const{ email, password} = req.body;

    const user = await userModel.findOne({ email });

    if(!user){
        return res.status(400).json({ message: 'User does not exist' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);


    if(!isPasswordValid){
    return res.status(400).jon ({ message: 'Invalid password' });
    }

    res.cookie('token', jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }));

    res.status(200).json({ message: 'User logged in successfully', 
        user : {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
        },
     });



}

module.exports = {
    registerUser,
    loginUser
}