import express from 'express';
import { pauseSong } from '../utils/pause-utils';
import { playSong } from '../utils/play-utils';
import { changeTrackVolume } from '../utils/volume-utils';

const router = express.Router();

router.put('/play', async (req, res) => {
    const { device_id, track_uri } = req.query; // validated at api gateway 
    const access_token = req.headers.access_token as string; // validated at api gateway
    try {
        const result = await playSong(track_uri as string, device_id as string, access_token);
        res.send(result);
    } catch (error) {
        res.status(500).json({
            "error": {
                "status": 500,
                "message": "Internal server error"
            }
        });
    }
});

router.put('/pause', async (req, res) => {
    const { device_id } = req.query; // validated at api gateway 
    const access_token = req.headers.access_token as string; // validated at api gateway
    try {
        const result = await pauseSong(access_token, device_id as string);
        res.send(result);
    } catch (error) {
        res.status(500).json({
            "error": {
                "status": 500,
                "message": "Internal server error"
            }
        });
    }
});

router.put('/volume', async (req, res) => {
    const { device_id, volume } = req.query; // validated at api gateway 
    const access_token = req.headers.access_token as string; // validated at api gateway
    try {
        const result = await changeTrackVolume(access_token, device_id as string, volume as unknown as number);
        res.send(result);
    } catch (error) {
        res.status(500).json({
            "error": {
                "status": 500,
                "message": "Internal server error"
            }
        });
    }
});

export default router;