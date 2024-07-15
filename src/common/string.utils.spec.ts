import { StringUtils } from './string.utils';

describe('StringUtils', () => {
    describe('camelToSnake', () => {
        it('should convert camel case to snake case', () => {
            const input = 'HelloWorld';
            const expectedOutput = 'hello_world';
            const result = StringUtils.camelToSnake(input);
            expect(result).toEqual(expectedOutput);
        });

        it('should return an empty string if input is empty', () => {
            const input = '';
            const expectedOutput = '';
            const result = StringUtils.camelToSnake(input);
            expect(result).toEqual(expectedOutput);
        });
    });

    describe('snakeToCamel', () => {
        it('should convert snake case to camel case', () => {
            const input = 'hello_world';
            const expectedOutput = 'HelloWorld';
            const result = StringUtils.snakeToCamel(input);
            expect(result).toEqual(expectedOutput);
        });

        it('should convert snake case to camel case', () => {
            const input = 'foo-bar';
            const expectedOutput = 'FooBar';
            const result = StringUtils.snakeToCamel(input);
            expect(result).toEqual(expectedOutput);
        });

        it('should return an empty string if input is empty', () => {
            const input = '';
            const expectedOutput = '';
            const result = StringUtils.snakeToCamel(input);
            expect(result).toEqual(expectedOutput);
        });

    });

});
