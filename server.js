import express from 'express';
import cors from 'cors';
import api from './api';
const app = express();

const PORT = process.env.PORT || 9995;

app.use(cors());
app.use('/api', api);

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on ${PORT}`);
});