import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

const createToken = (user) => jwt.sign(
    { sub: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
);

const signup = async (req, res)=>{
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if(existingUser){
        return res.status(409).json({
            message: "An account with this email already exists"
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ name, email, password: hashedPassword });

        return res.status(201).json({
            message: "Signup successful",
            user: { id: user.id, name: user.name, email: user.email },
            token: createToken(user)
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "An account with this email already exists"
            });
        }
        throw error;
    }
};

const login = async (req, res)=>{
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select('+password');

    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.json({
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email },
        token: createToken(user)
    });
};

const getCurrentUser = async (req, res)=>{
    const user = await UserModel.findById(req.user.id);

    if(!user){
        return res.status(404).json({ message: "User not found" });
    }

    return res.json({
        user: { id: user.id, name: user.name, email: user.email }
    });
};

const logout = (req, res)=>{
    res.json({ message: "Logout successful. Remove the token from the client." });
};

export {
    signup,
    login,
    getCurrentUser,
    logout
}