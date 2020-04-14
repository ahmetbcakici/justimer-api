import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    processType: String,
    processDate: Date,
});

const TimerSchema = new Schema({
    viewLink: String,
    adminLink: String,
    workTime: Number, // as minute type
    isPomodoro: Boolean,
    repeatFOrever: Boolean,
    logs: [LogSchema],
});

export default mongoose.model('timer', TimerSchema);