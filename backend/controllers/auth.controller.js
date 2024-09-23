import User from '../models/user.model.js'
import bcrypt from 'bcrypt.js'
const signup = async (req, res)=>{
    try{
        const {fullName, username, email, password} = req.body;
        const emailRegex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        if(!emailRegex.test(email)){
            return res.status(400).json({error: "invalid email format"})
        }

        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(400).json({error: "username taken"})
        }
        
        const existingEmail = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({error: "invalid email i.e. taken"})
        }

        //now hashing the 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


    }catch(error){

    }
};

const login = async (req, res)=>{
    res.json({
        data: "reached log-in page",
    });
}

const signout = async (req, res)=>{
    res.json({
        data: "reached sign-out page",
    });
}

export { signout, login, signup };
;
