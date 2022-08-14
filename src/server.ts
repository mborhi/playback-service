import express from 'express';
import endpoints from '../endpoint.config';
import playbackRouter from './routes/playback';

const app = express();
const PORT = endpoints.ServerPort || 3000;

app.use('/playback', playbackRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
