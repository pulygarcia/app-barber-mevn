import mongoose from 'mongoose';
import { userToken } from '../helpers';

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token:{
        type: String,
        default: () => userToken()
    },
    verified:{
        type: Boolean,
        default: false
    },
    admin:{
        type: Boolean,
        default: false
    }
})


const User = mongoose.model('User' ,userSchema);

export default User;