/**
 * Returns a date that is the specified number of days in the future.
 * @param days Number of days to delay the message.
 * @returns A date that is the specified number of days in the future.
 */
export function delayCalculator(
    days: number,
) {
    if (days < 0) {
        throw new Error("Days cannot be negative");
    }

    if (days > 365) {
        throw new Error("Days cannot be greater than 365");
    }

    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}