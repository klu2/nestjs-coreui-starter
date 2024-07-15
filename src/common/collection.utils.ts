export class CollectionUtils {
    static countDistinctValues(arr: number[]): number {
        // Create a Set to store unique values
        const uniqueValues = new Set<number>();

        // Iterate through the array and add each value to the set
        for (const num of arr) {
            uniqueValues.add(num);
        }

        // Return the size of the Set, which represents the number of distinct values
        return uniqueValues.size;
    }

    static toPropertiesObject(map: Map<string, string>): Record<string, string> {
        const obj: Record<string, string> = {};
        for (const [key, value] of map) {
            // eslint-disable-next-line security/detect-object-injection
            obj[key] = value;
        }
        return obj;
    }
}
