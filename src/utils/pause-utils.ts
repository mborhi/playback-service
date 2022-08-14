import fetch from 'node-fetch';
import endpointConfig from "../../endpoint.config";

const baseURL = endpointConfig.SpotifyAPIBaseURL;

export const pauseSong = async (access_token: string, device_id: string) => {
    let url = baseURL + "/me/player/pause?" + device_id.toString();
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    });
    try {
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        throw error;
    }
}