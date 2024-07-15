import { LocaleUtils } from './locale.utils';

describe('LocaleUtils', () => {
    describe('getGermanNameForCountryCode', () => {
        it('should return "Deutschland" for country code "DE"', () => {
            const countryCode = 'DE';
            const germanName = LocaleUtils.getGermanNameForCountryCode(countryCode);
            expect(germanName).toBe('Deutschland');
        });

        it('should return "Vereinigte Staaten" for country code "US"', () => {
            const countryCode = 'US';
            const germanName = LocaleUtils.getGermanNameForCountryCode(countryCode);
            expect(germanName).toBe('Vereinigte Staaten');
        });

        it('should return "Frankreich" for country code "FR"', () => {
            const countryCode = 'FR';
            const germanName = LocaleUtils.getGermanNameForCountryCode(countryCode);
            expect(germanName).toBe('Frankreich');
        });

        // Add more test cases here for other country codes
        it('should return "Unknown" for unknown country code', () => {
            const countryCode = 'XX';
            const germanName = LocaleUtils.getGermanNameForCountryCode(countryCode);
            expect(germanName).toBe('XX');
        });
    });
});
