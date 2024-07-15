export class Timer {
    public static async wait(millis: number): Promise<void> {
        await new Promise((r) => {
            setTimeout(r, millis);
        });
    }
}
