import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    processType: String,
    processDate: Date,
});

const TimerSchema = new Schema({
    viewLink: String,
    adminLink: String,
    firstRunTimerTime: Date,
    workTime: Number, // as minute type
    breakTime: Number, // if isPomodoro true
    longBreakTime: Number, // if isPomodoro true
    logs: [LogSchema],
});

export default mongoose.model('timer', TimerSchema);