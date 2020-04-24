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

router.get('/timers/:id', async(req, res) => {
    const { id } = req.params;
    const doc = await Timer.findOne({ $or: [{ viewLink: id }, { adminLink: id }] });
    res.send(doc);
});

router.post('/generatetimer', async(req, res) => {
    const { manualWorkTime, manualBreakTime } = req.body;

    const { randomViewLink } = await isUnique();
    const { randomAdminLink } = await isUnique();

    if (!manualWorkTime) {
        Timer.create({
            viewLink: randomViewLink,
            adminLink: randomAdminLink,
            workTime: 25,
            breakTime: 5,
            longBreakTime: 15,
        });

        return res.send(randomAdminLink);
    }

    Timer.create({
        workTime: manualWorkTime,
        breakTime: manualBreakTime,
        viewLink: randomViewLink,
        adminLink: randomAdminLink,
    });

    return res.send(randomAdminLink);
});

router.put('/setruntime', async(req, res) => {
    const { adminLink } = req.body;
    const doc = await Timer.findOne({ adminLink });
    doc.firstRunTimerTime = new Date();
    doc.save();
    res.send();
});


const isUnique = async() => {
    const randomViewLink = randomstring.generate(6);
    const randomAdminLink = randomstring.generate(6);

    const doc = await Timer.findOne({
        $or: [{ viewLink: randomViewLink }, { adminLink: randomAdminLink }],
    });

    if (doc) return isUnique();
    else return { randomViewLink, randomAdminLink };
}

export default router;