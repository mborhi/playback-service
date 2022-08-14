import endpointConfig from "../../endpoint.config";
import { stringify } from 'querystring';
import fetch from "node-fetch";
import { dataIsError, responseIsError } from "./fetch-utils";
import { PlaybackStateData } from "../../interfaces";

const baseURL = endpointConfig.SpotifyAPIBaseURL;

/**
 * Plays the given track uri on the specified device using the given access token
 * Uses Set Playback Volume Spotify Web API call:
 * 
 * API Reference	https://developer.spotify.com/documentation/web-api/reference/#/operations/start-a-users-playback
 * 
 * Endpoint	        https://api.spotify.com/v1/me/player/play
 * 
 * HTTP Method	    PUT
 * 
 * OAuth	        Required
 * @param trackURI the uri of the track to play
 * @param device_id the id of the device to play the song on
 * @param access_token the access token to authorize with
 * @returns a JSON response whether the action was successful
 */
export const playSong = async (trackURI: string, device_id: string, access_token: string) => {
    const maybePlaybackData = await getPlaybackStateData(access_token);
    if (dataIsError(maybePlaybackData)) {
        return maybePlaybackData;
    }
    const playbackData = maybePlaybackData as PlaybackStateData;
    const reqParams = {
        device_id: device_id
    }
    const bodyParams = {
        "uris": [trackURI],
        "position_ms": playbackData.progress
    }
    let url = baseURL + "/me/player/play?" + stringify(reqParams);
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(bodyParams),
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

/**
 * Retrieves information about the current playback of the account identified by the given access token
 * Uses Get Playback State Spotify Web API call:
 * API Reference	https://developer.spotify.com/documentation/web-api/reference/#/operations/get-information-about-the-users-current-playback
 * 
 * Endpoint	https://api.spotify.com/v1/me/player
 * 
 * HTTP Method	GET
 * 
 * OAuth	Required
 * @param access_token the users access token
 * @param market the market where the content is available
 * @returns information about the current playback of the account
 */
export const getPlaybackStateData = async (access_token: string, market = 'US'): Promise<PlaybackStateData | SpotifyApi.ErrorObject> => {
    const url = baseURL + '/me/player?' + stringify({ "market": market });
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    });
    // handle responses which are errors
    if (responseIsError(response)) {
        return await response.json();
    } else if (response.status === 204) { // playback is not active or available 
        return {
            progress: 0,
            availableActions: {
                disallows: {}
            }
        }
    }
    // process the valid response data
    try {
        const data: SpotifyApi.CurrentPlaybackResponse = await response.json();
        const playbackData: PlaybackStateData = {
            progress: data.progress_ms,
            availableActions: data.actions
        }
        return playbackData;
    } catch (error) {
        throw error;
    }
}