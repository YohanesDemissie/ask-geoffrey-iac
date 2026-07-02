import { sanitizePrompt } from "../utils";

describe("sanitizePrompt()", () => {
    test("removes leading whitespace", () => {
        expect(
            sanitizePrompt("   Hello Geoffrey")
        ).toBe("Hello Geoffrey");
    });

    test("removes trailing whitespace", () => {
        expect(
            sanitizePrompt("Hello Geoffrey    ")
        ).toBe("Hello Geoffrey");
    });

    test("collapses multiple spaces", () => {
        expect(
            sanitizePrompt("Hello     Geoffrey")
        ).toBe("Hello Geoffrey");
    });

    test("handles tabs and newlines", () => {
        expect(
            sanitizePrompt("Hello\t\t\nGeoffrey")
        ).toBe("Hello Geoffrey");
    });

    test("returns empty string", () => {
        expect(
            sanitizePrompt("")
        ).toBe("");
    });

    test("does not modify already clean input", () => {
        expect(
            sanitizePrompt("Hello Geoffrey")
        ).toBe("Hello Geoffrey");
    });
});