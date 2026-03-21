export const formatNumber = (value, locale = 'en-US') => {
    if (value === null || value === undefined || value === '') return '0.00';

    const number = Number(value);
    if (isNaN(number)) return '0.00';

    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
    }).format(number);
};
