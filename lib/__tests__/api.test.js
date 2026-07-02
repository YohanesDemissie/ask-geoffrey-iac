import { sendPrompt } from "../api";

describe("sendPrompt()", () => {

    beforeEach(() => {
        global.fetch = jest.fn();

        process.env.NEXT_PUBLIC_API_URL =
            "http://localhost:3000";
    });


    afterEach(() => {
        jest.clearAllMocks();
    });


    test("sends a sanitized prompt to the API", async () => {

        fetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({
                generatedText: "Hello Geoffrey"
            }),
        });


        const result = await sendPrompt(
            "   Hello      Geoffrey   ",
            []
        );


        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3000/api/generate",
            expect.objectContaining({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: "Hello Geoffrey",
                    history: [],
                }),
            })
        );


        expect(result).toEqual({
            generatedText: "Hello Geoffrey",
            status: 200,
        });

    });


    test("returns rate limit response when API fails", async () => {

        fetch.mockResolvedValue({
            ok: false,
            status: 429,
            json: async () => ({
                error: "Too many requests"
            }),
        });


        const result = await sendPrompt(
            "Hello",
            []
        );


        expect(result.status).toBe(429);

        expect(result.generatedText)
            .toContain("daily request tokens");

    });


    test("includes conversation history", async () => {

        fetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({
                generatedText: "Response"
            }),
        });


        await sendPrompt(
            "Continue",
            [
                {
                    role: "user",
                    content: "Previous message"
                }
            ]
        );


        expect(fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                body: JSON.stringify({
                    prompt: "Continue",
                    history: [
                        {
                            role: "user",
                            content: "Previous message"
                        }
                    ],
                }),
            })
        );

    });


    test("throws when fetch fails", async () => {

        fetch.mockRejectedValue(
            new Error("Network failure")
        );


        await expect(
            sendPrompt("Hello")
        ).rejects.toThrow("Network failure");

    });

});