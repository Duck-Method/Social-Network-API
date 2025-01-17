import mongoose from 'mongoose';
import dayjs from 'dayjs';

const reactionSchema = new mongoose.Schema({
    reactionID: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLenght: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dayjs(timestamp).format('MMMM D, YYYY h:mm A')
    }
},{
    toJSON: { getters: true }, 
    id: false,
});


const thoughSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLenght: 1,
        maxLenght: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dayjs(timestamp).format('MMMM D, YYYY h:mm A')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
},{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);
export default Thought;