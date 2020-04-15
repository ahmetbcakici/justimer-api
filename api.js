import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import randomstring from 'randomstring';
import dotenv from 'dotenv';

import Timer from './models/Timer';

const router = express.Router();
router.use(bodyParser.json());
dotenv.config();

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log('Mongoose connected!');
});

router.get('/', (req, res) => {
    console.log(randomstring.generate(6));
    res.send('test');
});

router.get('/timers/:id', async(req, res) => {
    const { id } = req.params;
    const doc = await Timer.findOne({ $or: [{ viewLink: id }, { adminLink: id }] });
    console.log(doc);
    res.send(doc);
});

router.post('/generatetimer', (req, res) => {
    const { isPomodoro } = req.body;
    const randomViewLink = randomstring.generate(6);
    const randomAdminLink = randomstring.generate(6);

    if (isPomodoro) {
        Timer.create({
            viewLink: randomViewLink,
            adminLink: randomAdminLink,
            isPomodoro: true,
            workTime: 25,
            breakTime: 5,
            longBreakTime: 15,
        });

        return res.send(randomAdminLink);
    }

    Timer.create({
        viewLink: randomViewLink,
        adminLink: randomAdminLink,
    });

    return res.send(randomAdminLink);
});

export default router;