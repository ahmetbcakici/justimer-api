import mongoose from 'mongoose';
import randomstring from 'randomstring';


import Timer from './models/Timer';

export const checkUniqueLink = async(req, res, next) => {
    const randomViewLink = randomstring.generate(6);
    const randomAdminLink = randomstring.generate(6);

    /* const docs = await Timer.find();
    console.log(docs) */


    //req.y = "aa";
    next();
}

// hchanci@hotmail.com