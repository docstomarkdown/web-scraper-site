export const formatCurrency = (val: number, currency: string = 'USD') => {
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            currencyDisplay: 'narrowSymbol',
            maximumFractionDigits: 2
        }).format(val)
    } catch {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val)
    }
}

export const formatPercentage = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(val / 100)
}

export const parseNumber = (val: string): number => {
    return parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0
}
