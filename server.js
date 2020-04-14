import express from 'express';
import api from './api';
const app = express();
const PORT = process.env.PORT || 4445;

app.use('/api', api);

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on ${PORT}`);
});