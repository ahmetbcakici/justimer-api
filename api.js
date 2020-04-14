import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import randomstring from 'randomstring';

import Timer from './models/Timer';

mongoose.connect(
    'mongodb://localhost:27017/justimer', { useNewUrlParser: true },
    (err) => {
        if (err) throw err;
        console.log('Mongoose connected!');
    }
);

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res) => {
    console.log(randomstring.generate(6));
    res.send('test');
});

router.post('generatetimer', (req, res) => {
    console.log(req.body);
});

export default router;