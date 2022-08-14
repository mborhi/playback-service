jest.mock('node-fetch');

import fetch from 'node-fetch';
import { isValidVolume, changeTrackVolume } from '../src/utils/volume-utils';
const { Response } = jest.requireActual('node-fetch');
const mockedFetch = fetch as any;

describe("Volume", () => {

    const mock_token = "mock-access-token";
    const mock_device_id = "mock-device-id";

    it("correctly checks whether a volume is valid", () => {
        expect(isValidVolume(50)).toBe(true);
        expect(isValidVolume(-10)).toBe(false);
        expect(isValidVolume(110)).toBe(false);

    });

    it("correctly returns the Spotify Web API JSON response", async () => {
        mockedFetch.mockReturnValue(Promise.resolve(new Response(
            JSON.stringify({ "message": "command sent" }), { status: 204 }
        )));
        const response = await changeTrackVolume(mock_token, mock_device_id, 80);
        expect(response).toEqual({ "message": "command sent" });
    });

    it("correctly returns an error message when the volume is invalid", async () => {
        const expected = {
            "error": {
                "status": 501,
                "message": "Invalid volume"
            }
        };
        const response = await changeTrackVolume(mock_token, mock_device_id, 110);
        expect(response).toEqual(expected);
    });

    it("correctly throws an error when Spotify Web API response can't be processed", async () => {
        mockedFetch.mockReturnValue(Promise.resolve(new Response(
            "command sent", { status: 204 }
        )));
        // const response = await changeTrackVolume(mock_token, mock_device_id, 80);
        expect(changeTrackVolume(mock_token, mock_device_id, 80)).rejects.toThrowError();
    })
});