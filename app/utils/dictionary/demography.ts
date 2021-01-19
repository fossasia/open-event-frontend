import { tn } from '../text';

export interface Country {
  name: string;
  code: string;
}

/**
 * Using a lean list of countries instead of an external dependency.
 * All the libraries have a lot of extra data which is of no use to us at this point and unnecessarily takes up more space.
 */
export const countries: Country[] = [
  {
    name : tn.t('Andorra'),
    code : 'AD'
  },
  {
    name : tn.t('United Arab Emirates'),
    code : 'AE'
  },
  {
    name : tn.t('Afghanistan'),
    code : 'AF'
  },
  {
    name : tn.t('Antigua And Barbuda'),
    code : 'AG'
  },
  {
    name : tn.t('Anguilla'),
    code : 'AI'
  },
  {
    name : tn.t('Albania'),
    code : 'AL'
  },
  {
    name : tn.t('Armenia'),
    code : 'AM'
  },
  {
    name : tn.t('Angola'),
    code : 'AO'
  },
  {
    name : tn.t('Antarctica'),
    code : 'AQ'
  },
  {
    name : tn.t('Argentina'),
    code : 'AR'
  },
  {
    name : tn.t('American Samoa'),
    code : 'AS'
  },
  {
    name : tn.t('Austria'),
    code : 'AT'
  },
  {
    name : tn.t('Australia'),
    code : 'AU'
  },
  {
    name : tn.t('Aruba'),
    code : 'AW'
  },
  {
    name : tn.t('Åland'),
    code : 'AX'
  },
  {
    name : tn.t('Azerbaijan'),
    code : 'AZ'
  },
  {
    name : tn.t('Bosnia and Herzegovina'),
    code : 'BA'
  },
  {
    name : tn.t('Barbados'),
    code : 'BB'
  },
  {
    name : tn.t('Bangladesh'),
    code : 'BD'
  },
  {
    name : tn.t('Belgium'),
    code : 'BE'
  },
  {
    name : tn.t('Burkina Faso'),
    code : 'BF'
  },
  {
    name : tn.t('Bulgaria'),
    code : 'BG'
  },
  {
    name : tn.t('Bahrain'),
    code : 'BH'
  },
  {
    name : tn.t('Burundi'),
    code : 'BI'
  },
  {
    name : tn.t('Benin'),
    code : 'BJ'
  },
  {
    name : tn.t('Saint Barthélemy'),
    code : 'BL'
  },
  {
    name : tn.t('Bermuda'),
    code : 'BM'
  },
  {
    name : tn.t('Brunei'),
    code : 'BN'
  },
  {
    name : tn.t('Bolivia'),
    code : 'BO'
  },
  {
    name : tn.t('Bonaire'),
    code : 'BQ'
  },
  {
    name : tn.t('Brazil'),
    code : 'BR'
  },
  {
    name : tn.t('Bahamas'),
    code : 'BS'
  },
  {
    name : tn.t('Bhutan'),
    code : 'BT'
  },
  {
    name : tn.t('Bouvet Island'),
    code : 'BV'
  },
  {
    name : tn.t('Botswana'),
    code : 'BW'
  },
  {
    name : tn.t('Belarus'),
    code : 'BY'
  },
  {
    name : tn.t('Belize'),
    code : 'BZ'
  },
  {
    name : tn.t('Canada'),
    code : 'CA'
  },
  {
    name : tn.t('Cocos [Keeling] Islands'),
    code : 'CC'
  },
  {
    name : tn.t('Democratic Republic Of Congo'),
    code : 'CD'
  },
  {
    name : tn.t('Central African Republic'),
    code : 'CF'
  },
  {
    name : tn.t('Republic Of the Congo'),
    code : 'CG'
  },
  {
    name : tn.t('Switzerland'),
    code : 'CH'
  },
  {
    name : tn.t('Ivory Coast'),
    code : 'CI'
  },
  {
    name : tn.t('Cook Islands'),
    code : 'CK'
  },
  {
    name : tn.t('Chile'),
    code : 'CL'
  },
  {
    name : tn.t('Cameroon'),
    code : 'CM'
  },
  {
    name : tn.t('China'),
    code : 'CN'
  },
  {
    name : tn.t('Colombia'),
    code : 'CO'
  },
  {
    name : tn.t('Costa Rica'),
    code : 'CR'
  },
  {
    name : tn.t('Cuba'),
    code : 'CU'
  },
  {
    name : tn.t('Cape Verde'),
    code : 'CV'
  },
  {
    name : tn.t('Curacao'),
    code : 'CW'
  },
  {
    name : tn.t('Christmas Island'),
    code : 'CX'
  },
  {
    name : tn.t('Cyprus'),
    code : 'CY'
  },
  {
    name : tn.t('Czech Republic'),
    code : 'CZ'
  },
  {
    name : tn.t('Germany'),
    code : 'DE'
  },
  {
    name : tn.t('Djibouti'),
    code : 'DJ'
  },
  {
    name : tn.t('Denmark'),
    code : 'DK'
  },
  {
    name : tn.t('Dominica'),
    code : 'DM'
  },
  {
    name : tn.t('Dominican Republic'),
    code : 'DO'
  },
  {
    name : tn.t('Algeria'),
    code : 'DZ'
  },
  {
    name : tn.t('Ecuador'),
    code : 'EC'
  },
  {
    name : tn.t('Estonia'),
    code : 'EE'
  },
  {
    name : tn.t('Egypt'),
    code : 'EG'
  },
  {
    name : tn.t('Western Sahara'),
    code : 'EH'
  },
  {
    name : tn.t('Eritrea'),
    code : 'ER'
  },
  {
    name : tn.t('Spain'),
    code : 'ES'
  },
  {
    name : tn.t('Ethiopia'),
    code : 'ET'
  },
  {
    name : tn.t('Finland'),
    code : 'FI'
  },
  {
    name : tn.t('Fiji'),
    code : 'FJ'
  },
  {
    name : tn.t('Falkland Islands'),
    code : 'FK'
  },
  {
    name : tn.t('Micronesia'),
    code : 'FM'
  },
  {
    name : tn.t('Faroe Islands'),
    code : 'FO'
  },
  {
    name : tn.t('France'),
    code : 'FR'
  },
  {
    name : tn.t('Gabon'),
    code : 'GA'
  },
  {
    name : tn.t('United Kingdom'),
    code : 'GB'
  },
  {
    name : tn.t('Grenada'),
    code : 'GD'
  },
  {
    name : tn.t('Georgia'),
    code : 'GE'
  },
  {
    name : tn.t('French Guiana'),
    code : 'GF'
  },
  {
    name : tn.t('Guernsey'),
    code : 'GG'
  },
  {
    name : tn.t('Ghana'),
    code : 'GH'
  },
  {
    name : tn.t('Gibraltar'),
    code : 'GI'
  },
  {
    name : tn.t('Greenland'),
    code : 'GL'
  },
  {
    name : tn.t('Gambia'),
    code : 'GM'
  },
  {
    name : tn.t('Guinea'),
    code : 'GN'
  },
  {
    name : tn.t('Guadeloupe'),
    code : 'GP'
  },
  {
    name : tn.t('Equatorial Guinea'),
    code : 'GQ'
  },
  {
    name : tn.t('Greece'),
    code : 'GR'
  },
  {
    name : tn.t('South Georgia and The South Sandwich Islands'),
    code : 'GS'
  },
  {
    name : tn.t('Guatemala'),
    code : 'GT'
  },
  {
    name : tn.t('Guam'),
    code : 'GU'
  },
  {
    name : tn.t('Guinea-Bissau'),
    code : 'GW'
  },
  {
    name : tn.t('Guyana'),
    code : 'GY'
  },
  {
    name : tn.t('Hong Kong'),
    code : 'HK'
  },
  {
    name : tn.t('Heard Island And McDonald Islands'),
    code : 'HM'
  },
  {
    name : tn.t('Honduras'),
    code : 'HN'
  },
  {
    name : tn.t('Croatia'),
    code : 'HR'
  },
  {
    name : tn.t('Haiti'),
    code : 'HT'
  },
  {
    name : tn.t('Hungary'),
    code : 'HU'
  },
  {
    name : tn.t('Indonesia'),
    code : 'ID'
  },
  {
    name : tn.t('Ireland'),
    code : 'IE'
  },
  {
    name : tn.t('Israel'),
    code : 'IL'
  },
  {
    name : tn.t('Isle of Man'),
    code : 'IM'
  },
  {
    name : tn.t('India'),
    code : 'IN'
  },
  {
    name : tn.t('British Indian Ocean Territory'),
    code : 'IO'
  },
  {
    name : tn.t('Iraq'),
    code : 'IQ'
  },
  {
    name : tn.t('Iran'),
    code : 'IR'
  },
  {
    name : tn.t('Iceland'),
    code : 'IS'
  },
  {
    name : tn.t('Italy'),
    code : 'IT'
  },
  {
    name : tn.t('Jersey'),
    code : 'JE'
  },
  {
    name : tn.t('Jamaica'),
    code : 'JM'
  },
  {
    name : tn.t('Jordan'),
    code : 'JO'
  },
  {
    name : tn.t('Japan'),
    code : 'JP'
  },
  {
    name : tn.t('Kenya'),
    code : 'KE'
  },
  {
    name : tn.t('Kyrgyzstan'),
    code : 'KG'
  },
  {
    name : tn.t('Cambodia'),
    code : 'KH'
  },
  {
    name : tn.t('Kiribati'),
    code : 'KI'
  },
  {
    name : tn.t('Comoros'),
    code : 'KM'
  },
  {
    name : tn.t('Saint Kitts And Nevis'),
    code : 'KN'
  },
  {
    name : tn.t('North Korea'),
    code : 'KP'
  },
  {
    name : tn.t('South Korea'),
    code : 'KR'
  },
  {
    name : tn.t('Kuwait'),
    code : 'KW'
  },
  {
    name : tn.t('Cayman Islands'),
    code : 'KY'
  },
  {
    name : tn.t('Kazakhstan'),
    code : 'KZ'
  },
  {
    name : tn.t('Laos'),
    code : 'LA'
  },
  {
    name : tn.t('Lebanon'),
    code : 'LB'
  },
  {
    name : tn.t('Saint Lucia'),
    code : 'LC'
  },
  {
    name : tn.t('Liechtenstein'),
    code : 'LI'
  },
  {
    name : tn.t('Sri Lanka'),
    code : 'LK'
  },
  {
    name : tn.t('Liberia'),
    code : 'LR'
  },
  {
    name : tn.t('Lesotho'),
    code : 'LS'
  },
  {
    name : tn.t('Lithuania'),
    code : 'LT'
  },
  {
    name : tn.t('Luxembourg'),
    code : 'LU'
  },
  {
    name : tn.t('Latvia'),
    code : 'LV'
  },
  {
    name : tn.t('Libya'),
    code : 'LY'
  },
  {
    name : tn.t('Morocco'),
    code : 'MA'
  },
  {
    name : tn.t('Monaco'),
    code : 'MC'
  },
  {
    name : tn.t('Moldova'),
    code : 'MD'
  },
  {
    name : tn.t('Montenegro'),
    code : 'ME'
  },
  {
    name : tn.t('Saint Martin'),
    code : 'MF'
  },
  {
    name : tn.t('Madagascar'),
    code : 'MG'
  },
  {
    name : tn.t('Marshall Islands'),
    code : 'MH'
  },
  {
    name : tn.t('North Macedonia'),
    code : 'MK'
  },
  {
    name : tn.t('Mali'),
    code : 'ML'
  },
  {
    name : tn.t('Myanmar'),
    code : 'MM'
  },
  {
    name : tn.t('Mongolia'),
    code : 'MN'
  },
  {
    name : tn.t('Macao'),
    code : 'MO'
  },
  {
    name : tn.t('Northern Mariana Islands'),
    code : 'MP'
  },
  {
    name : tn.t('Martinique'),
    code : 'MQ'
  },
  {
    name : tn.t('Mauritania'),
    code : 'MR'
  },
  {
    name : tn.t('Montserrat'),
    code : 'MS'
  },
  {
    name : tn.t('Malta'),
    code : 'MT'
  },
  {
    name : tn.t('Mauritius'),
    code : 'MU'
  },
  {
    name : tn.t('Maldives'),
    code : 'MV'
  },
  {
    name : tn.t('Malawi'),
    code : 'MW'
  },
  {
    name : tn.t('Mexico'),
    code : 'MX'
  },
  {
    name : tn.t('Malaysia'),
    code : 'MY'
  },
  {
    name : tn.t('Mozambique'),
    code : 'MZ'
  },
  {
    name : tn.t('Namibia'),
    code : 'NA'
  },
  {
    name : tn.t('New Caledonia'),
    code : 'NC'
  },
  {
    name : tn.t('Niger'),
    code : 'NE'
  },
  {
    name : tn.t('Norfolk Island'),
    code : 'NF'
  },
  {
    name : tn.t('Nigeria'),
    code : 'NG'
  },
  {
    name : tn.t('Nicaragua'),
    code : 'NI'
  },
  {
    name : tn.t('Netherlands'),
    code : 'NL'
  },
  {
    name : tn.t('Norway'),
    code : 'NO'
  },
  {
    name : tn.t('Nepal'),
    code : 'NP'
  },
  {
    name : tn.t('Nauru'),
    code : 'NR'
  },
  {
    name : tn.t('Niue'),
    code : 'NU'
  },
  {
    name : tn.t('New Zealand'),
    code : 'NZ'
  },
  {
    name : tn.t('Oman'),
    code : 'OM'
  },
  {
    name : tn.t('Panama'),
    code : 'PA'
  },
  {
    name : tn.t('Peru'),
    code : 'PE'
  },
  {
    name : tn.t('French Polynesia'),
    code : 'PF'
  },
  {
    name : tn.t('Papua New Guinea'),
    code : 'PG'
  },
  {
    name : tn.t('Philippines'),
    code : 'PH'
  },
  {
    name : tn.t('Pakistan'),
    code : 'PK'
  },
  {
    name : tn.t('Poland'),
    code : 'PL'
  },
  {
    name : tn.t('Saint Pierre And Miquelon'),
    code : 'PM'
  },
  {
    name : tn.t('Pitcairn Islands'),
    code : 'PN'
  },
  {
    name : tn.t('Puerto Rico'),
    code : 'PR'
  },
  {
    name : tn.t('Palestinian'),
    code : 'PS'
  },
  {
    name : tn.t('Portugal'),
    code : 'PT'
  },
  {
    name : tn.t('Palau'),
    code : 'PW'
  },
  {
    name : tn.t('Paraguay'),
    code : 'PY'
  },
  {
    name : tn.t('Qatar'),
    code : 'QA'
  },
  {
    name : tn.t('Reunion'),
    code : 'RE'
  },
  {
    name : tn.t('Romania'),
    code : 'RO'
  },
  {
    name : tn.t('Serbia'),
    code : 'RS'
  },
  {
    name : tn.t('Russian'),
    code : 'RU'
  },
  {
    name : tn.t('Rwanda'),
    code : 'RW'
  },
  {
    name : tn.t('Saudi Arabia'),
    code : 'SA'
  },
  {
    name : tn.t('Solomon Islands'),
    code : 'SB'
  },
  {
    name : tn.t('Seychelles'),
    code : 'SC'
  },
  {
    name : tn.t('Sudan'),
    code : 'SD'
  },
  {
    name : tn.t('Sweden'),
    code : 'SE'
  },
  {
    name : tn.t('Singapore'),
    code : 'SG'
  },
  {
    name : tn.t('Saint Helena'),
    code : 'SH'
  },
  {
    name : tn.t('Slovenia'),
    code : 'SI'
  },
  {
    name : tn.t('Svalbard And Jan Mayen'),
    code : 'SJ'
  },
  {
    name : tn.t('Slovakia'),
    code : 'SK'
  },
  {
    name : tn.t('Sierra Leone'),
    code : 'SL'
  },
  {
    name : tn.t('San Marino'),
    code : 'SM'
  },
  {
    name : tn.t('Senegal'),
    code : 'SN'
  },
  {
    name : tn.t('Somalia'),
    code : 'SO'
  },
  {
    name : tn.t('Suriname'),
    code : 'SR'
  },
  {
    name : tn.t('South Sudan'),
    code : 'SS'
  },
  {
    name : tn.t('Sao Tome and Principe'),
    code : 'ST'
  },
  {
    name : tn.t('El Salvador'),
    code : 'SV'
  },
  {
    name : tn.t('Sint Maarten'),
    code : 'SX'
  },
  {
    name : tn.t('Syria'),
    code : 'SY'
  },
  {
    name : tn.t('Swaziland'),
    code : 'SZ'
  },
  {
    name : tn.t('Turks And Caicos Islands'),
    code : 'TC'
  },
  {
    name : tn.t('Chad'),
    code : 'TD'
  },
  {
    name : tn.t('French Southern Territories'),
    code : 'TF'
  },
  {
    name : tn.t('Togo'),
    code : 'TG'
  },
  {
    name : tn.t('Thailand'),
    code : 'TH'
  },
  {
    name : tn.t('Tajikistan'),
    code : 'TJ'
  },
  {
    name : tn.t('Tokelau'),
    code : 'TK'
  },
  {
    name : tn.t('East Timor'),
    code : 'TL'
  },
  {
    name : tn.t('Turkmenistan'),
    code : 'TM'
  },
  {
    name : tn.t('Tunisia'),
    code : 'TN'
  },
  {
    name : tn.t('Tonga'),
    code : 'TO'
  },
  {
    name : tn.t('Turkey'),
    code : 'TR'
  },
  {
    name : tn.t('Trinidad And Tobago'),
    code : 'TT'
  },
  {
    name : tn.t('Tuvalu'),
    code : 'TV'
  },
  {
    name : tn.t('Taiwan'),
    code : 'TW'
  },
  {
    name : tn.t('Tanzania'),
    code : 'TZ'
  },
  {
    name : tn.t('Ukraine'),
    code : 'UA'
  },
  {
    name : tn.t('Uganda'),
    code : 'UG'
  },
  {
    name : tn.t('United States Minor Outlying Islands'),
    code : 'UM'
  },
  {
    name : tn.t('United States'),
    code : 'US'
  },
  {
    name : tn.t('Uruguay'),
    code : 'UY'
  },
  {
    name : tn.t('Uzbekistan'),
    code : 'UZ'
  },
  {
    name : tn.t('Vatican City'),
    code : 'VA'
  },
  {
    name : tn.t('Saint Vincent And The Grenadines'),
    code : 'VC'
  },
  {
    name : tn.t('Venezuela'),
    code : 'VE'
  },
  {
    name : tn.t('British Virgin Islands'),
    code : 'VG'
  },
  {
    name : tn.t('U.S. Virgin Islands'),
    code : 'VI'
  },
  {
    name : tn.t('Vietnam'),
    code : 'VN'
  },
  {
    name : tn.t('Vanuatu'),
    code : 'VU'
  },
  {
    name : tn.t('Wallis And Futuna'),
    code : 'WF'
  },
  {
    name : tn.t('Samoa'),
    code : 'WS'
  },
  {
    name : tn.t('Kosovo'),
    code : 'XK'
  },
  {
    name : tn.t('Yemen'),
    code : 'YE'
  },
  {
    name : tn.t('Mayotte'),
    code : 'YT'
  },
  {
    name : tn.t('South Africa'),
    code : 'ZA'
  },
  {
    name : tn.t('Zambia'),
    code : 'ZM'
  },
  {
    name : tn.t('Zimbabwe'),
    code : 'ZW'
  }
];
