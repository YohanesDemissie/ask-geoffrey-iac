/**
 * Cleans up a user's prompt before sending it to the AI.
 *
 * - Removes leading/trailing whitespace
 * - Collapses multiple spaces into one
 */
export function sanitizePrompt(prompt) {
    return prompt
        .trim()
        .replace(/\s+/g, " ");
}