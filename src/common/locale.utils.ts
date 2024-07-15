import { Decimal } from '@prisma/client/runtime/library';

export class LocaleUtils {
    static getGermanNameForCountryCode(country: string): string {
        const regionNames = new Intl.DisplayNames(['de'], { type: 'region' });
        const countryName = regionNames.of(country);
        if (countryName === undefined) {
            return country;
        }
        return countryName;
    }

    static formatEuro(amount: any): string {
        if (amount === undefined || amount === null) {
            return '---';
        }
        const formattedAmount = amount instanceof Decimal ? amount.toNumber() : amount;
        return `€ ${formattedAmount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
}
