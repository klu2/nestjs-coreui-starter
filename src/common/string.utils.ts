export class StringUtils {
    public static camelToSnake(str: string): string {
        return str.replace(/[A-Z]/g, (match, index) => {
            return index === 0 ? match.toLowerCase() : `_${match.toLowerCase()}`;
        });
    }

    public static snakeToCamel(str: string): string {
        const camelCaseStr = str.replace(/([-_][a-z0-9])/gi, (match) => match.toUpperCase().replace(/[-_]/, ''));
        return camelCaseStr.charAt(0).toUpperCase() + camelCaseStr.slice(1);
    }

    static endOfDay(dateString: string): Date {
        const date = new Date(dateString);
        date.setHours(23, 59, 59, 999);
        return date;
    }
}
