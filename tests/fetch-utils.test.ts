import { Response } from "node-fetch";
import { dataIsError, responseIsError } from "../src/utils/fetch-utils";

describe("Fetch Utils", () => {

    it("correctly returns true when response is an error", () => {
        const mock_response = new Response(
            JSON.stringify({ "mock": "res" }),
            {
                status: 401,
            }
        );
        // cast as node-fetch Response to silence errors requiring additional response fields 
        expect(responseIsError(mock_response as Response)).toBe(true);
    });

    it("correctly returns true when the JSON data is an error object", () => {
        const mock_data = {
            "error": {
                "status": 401,
                "message": "Mock data"
            }
        };
        expect(dataIsError(mock_data)).toBe(true);
    });
})