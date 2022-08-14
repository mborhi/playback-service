import fetch from 'node-fetch';
import endpointConfig from "../../endpoint.config";
import { responseIsError } from './fetch-utils';

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
    // response will not be a valid JSON response if request is sucessful
    if (!responseIsError(response)) return response;
    try {
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        throw error;
    }
}