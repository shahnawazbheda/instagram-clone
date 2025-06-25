// const mongoose = require('mongoose');

// const blockSchema = new mongoose.Schema({
//     userid: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     BlockUser: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     }
// }, { timestamps: true });

// module.exports = mongoose.model('Block', blockSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blockUserSchema = new Schema({
    BlockUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const BlockUser = mongoose.model('BlockUser', blockUserSchema);

module.exports = BlockUser;
