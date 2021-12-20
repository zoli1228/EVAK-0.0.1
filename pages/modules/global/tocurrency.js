var toCurrency = (number) => {
    let c = new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF', maximumFractionDigits: 0 }).format(number)
    return c
}