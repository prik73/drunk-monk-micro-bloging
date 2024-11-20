import User from '../models/user.model.js'
import bcrypt from 'bcrypt';

import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';

const signup = async (req, res)=>{
    try{
        const {email, userName, fullName,  password} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({error: "invalid email format"})
        }

        const existingUser = await User.findOne({ userName });
        if(existingUser){
            return res.status(400).json({error: "userName is already taken"})
        }
        
        const existingEmail = await User.findOne({ email });
        if(existingEmail){
            return res.status(400).json({error: "invalid. email i.e. taken"})
        }
        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }

        //now hashing the passwordd
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName:fullName,
            userName:userName,
            email:email,
            password:hashedPassword,
        })

        //jwt
        if(newUser){
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,  
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            })
        }else{
            res.status(400).json({ erro: "invalid user data" });
        }

    }catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({ error: `${field} already exists` });
        }
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const login = async (req, res)=>{
    try{
        const {userName, password } = req.body;
        const user = await User.findOne({userName});
        const isPasswordCorrect = await bcrypt.compare(password, user.password); // ?== if user gives empty string i.e. nothing

        if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

        generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			userName: user.userName,
			email: user.email,
			followers: user.followers,
			following: user.following,
			profileImg: user.profileImg,
			coverImg: user.coverImg,
		});

    }catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({ error: `${field} already exists` });
        }
        console.log("Error in login controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const logout = async (req, res)=>{
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export { logout, login, signup };
;

export const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password");
		res.status(200).json(user);
	} catch (error) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};