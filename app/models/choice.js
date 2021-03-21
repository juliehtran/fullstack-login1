// load the things we need
import mongoose from 'mongoose';

// define the schema for our user model
const choiceSchema = mongoose.Schema({

    choice: String,
    question: String

});

const Choice = mongoose.model('Choice', choiceSchema);

export { Choice, choiceSchema }
