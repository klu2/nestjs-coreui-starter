import { CollectionUtils } from './collection.utils';

describe('CollectionUtils', () => {
    describe('countDistinctValues', () => {
        it('should return the correct count of distinct values in an array', () => {
            const arr = [1, 2, 3, 2, 1, 4, 5, 4];
            const distinctCount = CollectionUtils.countDistinctValues(arr);
            expect(distinctCount).toBe(5);
        });

        it('should return 0 when the array is empty', () => {
            const arr: number[] = [];
            const distinctCount = CollectionUtils.countDistinctValues(arr);
            expect(distinctCount).toBe(0);
        });

        it('should return 1 when the array has only one element', () => {
            const arr = [42];
            const distinctCount = CollectionUtils.countDistinctValues(arr);
            expect(distinctCount).toBe(1);
        });

        // Add more test cases as needed
    });

    describe('CollectionUtils', () => {
        describe('toPropertiesObject', () => {
            it('should convert an empty map to an empty object', () => {
                const map = new Map<string, string>();
                const result = CollectionUtils.toPropertiesObject(map);
                expect(result).toEqual({});
            });

            it('should convert a map with one entry to an object with one property', () => {
                const map = new Map<string, string>();
                map.set('key1', 'value1');
                const result = CollectionUtils.toPropertiesObject(map);
                expect(result).toEqual({ key1: 'value1' });
            });

            it('should convert a map with multiple entries to an object with multiple properties', () => {
                const map = new Map<string, string>();
                map.set('key1', 'value1');
                map.set('key2', 'value2');
                map.set('key3', 'value3');
                const result = CollectionUtils.toPropertiesObject(map);
                expect(result).toEqual({ key1: 'value1', key2: 'value2', key3: 'value3' });
            });

            it('should convert a map with multiple entries to an object with multiple properties, also with enums', () => {
                const map = new Map<string, string>();
                map.set(DealProperties.AMOUNT, 'value1');
                map.set(DealProperties.CLOSEDATE, 'value2');
                const result = CollectionUtils.toPropertiesObject(map);
                expect(result).toEqual({ amount: 'value1', closedate: 'value2' });
            });

            it('should convert a map with multiple entries to an object with multiple properties, also with object literals', () => {
                const map = new Map<string, string>();
                map.set(ContactProperties.AMOUNT, 'value1');
                map.set(ContactProperties.CLOSEDATE, 'value2');
                const result = CollectionUtils.toPropertiesObject(map);
                expect(result).toEqual({ amount: 'value1', closedate: 'value2' });
            });

            // Add more test cases as needed
        });
    });
});

enum DealProperties {
    AMOUNT = 'amount',
    CLOSEDATE = 'closedate',
}

const ContactProperties = {
    AMOUNT: 'amount',
    CLOSEDATE: 'closedate',
} as const;
