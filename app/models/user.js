// load the things we need
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import { choiceSchema } from './choice.js';
const { hashSync, compareSync, genSaltSync } = bcryptjs;

// define the schema for our user model
const userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String,
    },
    choices: [choiceSchema]

});

// generating a hash
userSchema.methods.generateHash = function (password) {
    return hashSync(password, genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
const User = mongoose.model('User', userSchema);

export { User }