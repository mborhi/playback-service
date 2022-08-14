import endpointConfig from "../../endpoint.config";
import { stringify } from 'querystring';
import fetch from "node-fetch";

const baseURL = endpointConfig.SpotifyAPIBaseURL;

/**
 * Sets the current Spotify Web Player device to the specified volume.
 * Uses Spotify Web API call Set Playback Volume
 * 
 * API Reference	https://developer.spotify.com/documentation/web-api/reference/#/operations/set-volume-for-users-playback
 * 
 * Endpoint	        https://api.spotify.com/v1/me/player/volume
 * 
 * HTTP Method	    PUT
 * 
 * OAuth	        Required
 * @param {string} access_token
 * @param {string} device_id
 * @param {number} volume the volume to set the web player to
 * @returns json response of success or error
 */
export const changeTrackVolume = async (access_token: string, device_id: string, volume: number) => {
    if (!isValidVolume(volume)) {
        return {
            "error": {
                "status": 501,
                "message": "Invalid volume"
            }
        };
    }
    const query = {
        volume_percent: volume,
        device_id: device_id
    };
    let url = baseURL + '/me/player/volume?' + stringify(query);
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    });
    try {
        return await response.json();
    } catch (error) {
        throw error;
    }
}

/**
 * Determines whether the given volume value is between 0 and 100
 * @param {number} volume the volume to check
 * @returns whether the volume is between 0 and 100
 */
export const isValidVolume = (volume: number) => {
    return volume >= 0 && volume <= 100;
}