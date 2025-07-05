import {findUserByDni, registerNewUser} from '../models/usersModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req,res) => {
    const { dni, password} = req.body;
    if (!dni || !password) {
        return res.status(400).json({ error: 'Complete all parameters' });
    }
    try{
        const user = await findUserByDni(dni);
        if(!user) return res.status(401).json({error: 'User not found'});

        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword) return res.status(401).json({error: 'Incorrect password'});

        const token =jwt.sign(
            {id: user._id, dni: user.dni, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        res.json({token});
    }catch (error){
        console.error('Login error:', error);    
        res.status(500).json({error: 'Internal server error'});
    }
}

export const registerUser = async (req, res) => {
    const {dni, email, password} = req.body;
    if (!dni || !email || !password) {
        return res.status(400).json({ error: 'Complete all parameters' });
    }

    try{
        const newUser = await registerNewUser({dni, email, password});
        res.status(201).json({message: 'User registered successfully', user: newUser});
    }catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}