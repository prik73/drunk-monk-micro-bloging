//modal is just like table, since mongo is noSQL, it will be collection

import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true,
    },
    fullName:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    followers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    following:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],

    profileImg:{
        type: String,
        default: "",
    },
    coverImg:{
        type: String,
        default: "",
    },
    bio:{
        type: String,
        default: "",
    },

    link:{
        type: String,
        default: "",
    }

}, {timestamp: true})
//timeStamp se user craeted at waala kaam ho jaayega///

const User = mongoose.model("User", userSchema);
export default User;