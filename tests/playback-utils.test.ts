jest.mock('node-fetch');
import fetch from 'node-fetch';
import { pauseSong } from '../src/utils/pause-utils';
import { getPlaybackStateData, playSong } from '../src/utils/play-utils';
import { isValidVolume, changeTrackVolume } from '../src/utils/volume-utils';
const { Response } = jest.requireActual('node-fetch');
const mockedFetch = fetch as any;

const mock_token = "mock-access-token";
const mock_device_id = "mock-device-id";

describe("Play", () => {

    describe("Play Song", () => {

        const mock_trackURI = "spotify:mocktrack:uri"

        it("correctly returns the Spotify Web API JSON response", async () => {
            const mock_response = "Playback started";
            mockedFetch.mockReturnValue(Promise.resolve(new Response(
                JSON.stringify(mock_response), { status: 204 }
            )));
            const result = await playSong(mock_trackURI, mock_device_id, mock_token);
            expect(result).toEqual(mock_response);
        });

        it("correctly throws an error when Spotify Web API response can't be processed", () => {
            const mock_response = "Playback started";
            mockedFetch.mockReturnValue(Promise.resolve(new Response(
                mock_response, { status: 204 }
            )));
            expect(playSong(mock_trackURI, mock_device_id, mock_token)).rejects.toThrowError();
        });

        it("correctly returns Spotify Web API response error when playback state request is rejected", async () => {
            const mock_response_error = {
                "error": {
                    "status": 401,
                    "message": "Invalid token"
                }
            };
            mockedFetch.mockReturnValueOnce(Promise.resolve(new Response(
                JSON.stringify(mock_response_error), { status: 401 }
            )));
            const result = await playSong(mock_trackURI, mock_device_id, mock_token);
            expect(result).toEqual(mock_response_error);
        });

    });

    describe("Get Playback State", () => {
        it("correctly retrieves the current play progress of the track being played by the given device", async () => {
            const mock_progress = 5000;
            const mock_playback_state: SpotifyApi.CurrentPlaybackResponse = {
                "device": {
                    "id": "22028cfd008ae57134179fa1cd8d6b7f26462cf7",
                    "is_active": true,
                    "is_restricted": false,
                    "name": "Web Player (Chrome)",
                    "type": "Computer",
                    "volume_percent": 52
                },
                "shuffle_state": false,
                "repeat_state": "off",
                "timestamp": 1660436712697,
                "context": null,
                "progress_ms": mock_progress,
                "item": {
                    "album": {
                        "album_type": "single",
                        "artists": [
                            {
                                "external_urls": {
                                    "spotify": "https://open.spotify.com/artist/5tQMB0cuNXdCtzovGt55uD"
                                },
                                "href": "https://api.spotify.com/v1/artists/5tQMB0cuNXdCtzovGt55uD",
                                "id": "5tQMB0cuNXdCtzovGt55uD",
                                "name": "LUCKI",
                                "type": "artist",
                                "uri": "spotify:artist:5tQMB0cuNXdCtzovGt55uD"
                            }
                        ],
                        "external_urls": {
                            "spotify": "https://open.spotify.com/album/0pTj7z7TG1Uu8LT1upuwep"
                        },
                        "href": "https://api.spotify.com/v1/albums/0pTj7z7TG1Uu8LT1upuwep",
                        "id": "0pTj7z7TG1Uu8LT1upuwep",
                        "images": [
                            {
                                "height": 640,
                                "url": "https://i.scdn.co/image/ab67616d0000b27390e0cfc89e4a3138ba4ed9cf",
                                "width": 640
                            },
                            {
                                "height": 300,
                                "url": "https://i.scdn.co/image/ab67616d00001e0290e0cfc89e4a3138ba4ed9cf",
                                "width": 300
                            },
                            {
                                "height": 64,
                                "url": "https://i.scdn.co/image/ab67616d0000485190e0cfc89e4a3138ba4ed9cf",
                                "width": 64
                            }
                        ],
                        "name": "Greed (feat. Lil Yachty)",
                        "release_date": "2021-02-12",
                        "release_date_precision": "day",
                        "total_tracks": 1,
                        "type": "album",
                        "uri": "spotify:album:0pTj7z7TG1Uu8LT1upuwep"
                    },
                    "artists": [
                        {
                            "external_urls": {
                                "spotify": "https://open.spotify.com/artist/5tQMB0cuNXdCtzovGt55uD"
                            },
                            "href": "https://api.spotify.com/v1/artists/5tQMB0cuNXdCtzovGt55uD",
                            "id": "5tQMB0cuNXdCtzovGt55uD",
                            "name": "LUCKI",
                            "type": "artist",
                            "uri": "spotify:artist:5tQMB0cuNXdCtzovGt55uD"
                        },
                        {
                            "external_urls": {
                                "spotify": "https://open.spotify.com/artist/6icQOAFXDZKsumw3YXyusw"
                            },
                            "href": "https://api.spotify.com/v1/artists/6icQOAFXDZKsumw3YXyusw",
                            "id": "6icQOAFXDZKsumw3YXyusw",
                            "name": "Lil Yachty",
                            "type": "artist",
                            "uri": "spotify:artist:6icQOAFXDZKsumw3YXyusw"
                        }
                    ],
                    "disc_number": 1,
                    "duration_ms": 96133,
                    "explicit": true,
                    "external_ids": {
                        "isrc": "USUYG1355236"
                    },
                    "external_urls": {
                        "spotify": "https://open.spotify.com/track/2AhAhd9BiyydtKq2hMdb7Q"
                    },
                    "href": "https://api.spotify.com/v1/tracks/2AhAhd9BiyydtKq2hMdb7Q",
                    "id": "2AhAhd9BiyydtKq2hMdb7Q",
                    "is_local": false,
                    "is_playable": true,
                    "name": "Greed (feat. Lil Yachty)",
                    "popularity": 59,
                    "preview_url": "https://p.scdn.co/mp3-preview/a4e90f0a8717e027c2289453f6b30027fde84048?cid=774b29d4f13844c495f206cafdad9c86",
                    "track_number": 1,
                    "type": "track",
                    "uri": "spotify:track:2AhAhd9BiyydtKq2hMdb7Q"
                },
                "currently_playing_type": "track",
                "actions": {
                    "disallows": {
                        "resuming": true,
                        "toggling_repeat_context": true,
                        "toggling_repeat_track": true,
                        "toggling_shuffle": true
                    }
                },
                "is_playing": true
            }
            const expected = {
                "progress": mock_progress,
                "availableActions": {
                    "disallows": {
                        "resuming": true,
                        "toggling_repeat_context": true,
                        "toggling_repeat_track": true,
                        "toggling_shuffle": true
                    }
                },
            }
            mockedFetch.mockReturnValue(Promise.resolve(new Response(
                JSON.stringify(mock_playback_state), { status: 200 }
            )));
            const results = await getPlaybackStateData(mock_token);
            expect(results).toEqual(expected);

        });

        it("correctly handles error fetching playback state from Spotify API", async () => {
            const mock_response_error = {
                "error": {
                    "status": 401,
                    "message": "Invalid token"
                }
            };
            mockedFetch.mockReturnValue(Promise.resolve(new Response(
                JSON.stringify(mock_response_error), { status: 401 }
            )));
            const results = await getPlaybackStateData(mock_token);
            expect(results).toEqual(mock_response_error);
        });

        it("correctly handles when playback is not active or available", async () => {
            mockedFetch.mockReturnValue(Promise.resolve(new Response(
                JSON.stringify("Playback not available or active"), { status: 204 }
            )));
            const expected = {
                progress: 0,
                availableActions: { disallows: {} }
            }
            const results = await getPlaybackStateData(mock_token);
            expect(results).toEqual(expected);
        })

        it("correctly throws an error when response can't be processed", async () => {
            mockedFetch.mockReturnValue(Promise.resolve(new Response(
                { "dne": "dne" }, { status: 200 }
            )));
            expect(getPlaybackStateData(mock_token)).rejects.toThrowError();
        });
    })
});

describe("Pause", () => {

    it("correctly returns the recieved Spotify Web API JSON response", async () => {
        mockedFetch.mockReturnValue(Promise.resolve(new Response(
            JSON.stringify("Playback paused"), { status: 204 }
        )));
        const result = await pauseSong(mock_token, mock_device_id);
        expect(result).toEqual("Playback paused");
    });

    it("correctly handles Spotify Web API response error", async () => {
        const mock_response_error = {
            "error": {
                "status": 401,
                "message": "Invalid token"
            }
        };
        mockedFetch.mockReturnValue(Promise.resolve(new Response(
            JSON.stringify(mock_response_error), { status: 401 }
        )));
        const results = await pauseSong(mock_token, mock_device_id);
        expect(results).toEqual(mock_response_error);
    });

    it("correctly throws an error when response can't be processed", async () => {
        mockedFetch.mockReturnValue(Promise.resolve(new Response(
            { "dne": "dne" }, { status: 200 }
        )));
        expect(pauseSong(mock_token, mock_device_id)).rejects.toThrowError();
    });
})

describe("Volume", () => {

    it("correctly checks whether a volume is valid", () => {
        expect(isValidVolume(50)).toBe(true);
        expect(isValidVolume(-10)).toBe(false);
        expect(isValidVolume(110)).toBe(false);

    });

    it("correctly returns the Spotify Web API JSON response if its an error", async () => {
        mockedFetch.mockReturnValue(Promise.resolve(new Response(
            JSON.stringify({ "error": { "status": 401, "message": "Invalid token" } }), { status: 401 }
        )));
        const response = await changeTrackVolume(mock_token, mock_device_id, 80);
        expect(response).toEqual({ "error": { "status": 401, "message": "Invalid token" } });
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

    it("correctly Spotify Web API response when request is successful", async () => {
        const mockResponseObject = new Response(
            { status: 204, statusText: "No Content" }
        )
        mockedFetch.mockReturnValue(Promise.resolve(mockResponseObject));
        expect(changeTrackVolume(mock_token, mock_device_id, 80)).resolves.toEqual(mockResponseObject);
    })
});