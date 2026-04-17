export const getCountryName = (code) => {
  if (!code) return '—'
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code
  } catch {
    return code
  }
}

export const getCountryCurrency = (code) => {
  if (!code) return 'USD'
  const currencyMap = {
    AE: 'AED', AF: 'AFN', AL: 'ALL', AM: 'AMD', AO: 'AOA',
    AR: 'ARS', AU: 'AUD', AZ: 'AZN', BA: 'BAM', BD: 'BDT',
    BG: 'BGN', BH: 'BHD', BN: 'BND', BO: 'BOB', BR: 'BRL',
    BY: 'BYN', BZ: 'BZD', CA: 'CAD', CD: 'CDF', CH: 'CHF',
    CL: 'CLP', CN: 'CNY', CO: 'COP', CR: 'CRC', CU: 'CUP',
    CZ: 'CZK', DE: 'EUR', DK: 'DKK', DO: 'DOP', DZ: 'DZD',
    EG: 'EGP', ES: 'EUR', ET: 'ETB', FI: 'EUR', FR: 'EUR',
    GB: 'GBP', GE: 'GEL', GH: 'GHS', GT: 'GTQ', HK: 'HKD',
    HN: 'HNL', HR: 'EUR', HU: 'HUF', ID: 'IDR', IE: 'EUR',
    IL: 'ILS', IN: 'INR', IQ: 'IQD', IR: 'IRR', IS: 'ISK',
    IT: 'EUR', JM: 'JMD', JO: 'JOD', JP: 'JPY', KE: 'KES',
    KG: 'KGS', KH: 'KHR', KR: 'KRW', KW: 'KWD', KZ: 'KZT',
    LA: 'LAK', LB: 'LBP', LK: 'LKR', LY: 'LYD', MA: 'MAD',
    MD: 'MDL', MK: 'MKD', MM: 'MMK', MN: 'MNT', MO: 'MOP',
    MX: 'MXN', MY: 'MYR', MZ: 'MZN', NA: 'NAD', NG: 'NGN',
    NI: 'NIO', NL: 'EUR', NO: 'NOK', NP: 'NPR', NZ: 'NZD',
    OM: 'OMR', PA: 'PAB', PE: 'PEN', PH: 'PHP', PK: 'PKR',
    PL: 'PLN', PT: 'EUR', PY: 'PYG', QA: 'QAR', RO: 'RON',
    RS: 'RSD', RU: 'RUB', SA: 'SAR', SD: 'SDG', SE: 'SEK',
    SG: 'SGD', SY: 'SYP', TH: 'THB', TJ: 'TJS', TM: 'TMT',
    TN: 'TND', TR: 'TRY', TW: 'TWD', TZ: 'TZS', UA: 'UAH',
    UG: 'UGX', US: 'USD', UY: 'UYU', UZ: 'UZS', VE: 'VES',
    VN: 'VND', YE: 'YER', ZA: 'ZAR', ZM: 'ZMW', ZW: 'ZWL',
  }
  return currencyMap[code] || 'USD'
}