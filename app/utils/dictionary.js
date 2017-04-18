import moment from 'moment';

export const licenses = [
  {
    name : 'Attribution-NonCommercial-NoDerivs',
    link : 'https://creativecommons.org/licenses/by-nc-nd/4.0'
  },
  {
    name : 'Attribution-NonCommercial',
    link : 'https://creativecommons.org/licenses/by-nc/4.0'
  },
  {
    name : 'Public Domain Dedication (CC0)',
    link : 'https://creativecommons.org/publicdomain/zero/1.0/'
  },
  {
    name : 'Attribution',
    link : 'https://creativecommons.org/licenses/by/4.0'
  },
  {
    name : 'All rights reserved',
    link : 'https://en.wikipedia.org/wiki/All_rights_reserved'
  },
  {
    name : 'Attribution-NoDerivs',
    link : 'https://creativecommons.org/licenses/by-nd/4.0'
  },
  {
    name : 'Public Domain Work',
    link : 'https://creativecommons.org/publicdomain/mark/1.0/'
  },
  {
    name : 'Attribution-NonCommercial-ShareAlike',
    link : 'https://creativecommons.org/licenses/by-nc-sa/4.0'
  },
  {
    name : 'Attribution-ShareAlike',
    link : 'https://creativecommons.org/licenses/by-sa/4.0'
  }
];

export const eventTypes = [
  'Appearance or Signing',
  'Attraction',
  'Camp, Trip, or Retreat',
  'Class, Training, or Workshop',
  'Concert or Performance',
  'Conference',
  'Convention',
  'Dinner or Gala',
  'Festival or Fair',
  'Game or Competition',
  'Meeting or Networking Event',
  'Other',
  'Party or Social Gathering',
  'Race or Endurance Event',
  'Rally',
  'Screening',
  'Seminar or Talk',
  'Tour',
  'Tournament',
  'Tradeshow, Consumer Show, or Expo'
];

export const eventTopics = {
  'Auto, Boat & Air': [
    'Air', 'Auto', 'Boat', 'Motorcycle/ATV', 'Other'
  ],
  'Business & Professional': [
    'Career', 'Design', 'Educators', 'Environment & Sustainability',
    'Finance', 'Media', 'Non Profit & NGOs', 'Other', 'Real Estate',
    'Sales & Marketing', 'Startups & Small Business'
  ],
  'Charity & Causes': [
    'Animal Welfare', 'Disaster Relief', 'Education',
    'Environment', 'Healthcare', 'Human Rights',
    'International Aid', 'Other', 'Poverty'
  ],
  'Community & Culture': [
    'City/Town', 'County', 'Heritage', 'LGBT', 'Language',
    'Medieval', 'Nationality', 'Other', 'Renaissance', 'State'
  ],
  'Family & Education': [
    'Alumni', 'Baby', 'Children & Youth', 'Education', 'Other',
    'Parenting', 'Parents Association', 'Reunion'
  ],
  'Fashion & Beauty': [
    'Accessories', 'Beauty', 'Bridal', 'Fashion', 'Other'
  ],
  'Film, Media & Entertainment': [
    'Adult', 'Anime', 'Comedy', 'Comics', 'Film', 'Gaming', 'Other', 'TV'
  ],
  'Food & Drink'          : ['Beer', 'Food', 'Other', 'Spirits', 'Wine'],
  'Government & Politics' : [
    'County/Municipal Government', 'Democratic Party', 'Federal Government',
    'Non-partisan', 'Other', 'Other Party', 'Republican Party',
    'State Government'
  ],
  'Health & Wellness': [
    'Medical', 'Mental health', 'Other', 'Personal health', 'Spa', 'Yoga'
  ],
  'Hobbies & Special Interest': [
    'Adult', 'Anime/Comics', 'Books', 'DIY', 'Drawing & Painting', 'Gaming',
    'Knitting', 'Other', 'Photography'
  ],
  'Home & Lifestyle' : ['Dating', 'Home & Garden', 'Other', 'Pets & Animals'],
  'Music'            : [
    'Alternative', 'Blues & Jazz', 'Classical', 'Country', 'Cultural',
    'EDM / Electronic', 'Folk', 'Hip Hop / Rap', 'Indie', 'Latin', 'Metal',
    'Opera', 'Other', 'Pop', 'R&B', 'Reggae', 'Religious/Spiritual', 'Rock',
    'Top 40'
  ],
  'Other'                    : ['Avatar', 'Logo'],
  'Performing & Visual Arts' : [
    'Ballet', 'Comedy', 'Craft', 'Dance', 'Fine Art', 'Literary Arts',
    'Musical', 'Opera', 'Orchestra', 'Other', 'Theatre'
  ],
  'Religion & Spirituality': [
    'Buddhism', 'Christianity', 'Eastern Religion', 'Islam', 'Judaism',
    'Mormonism', 'Mysticism and Occult', 'New Age', 'Other', 'Sikhism'
  ],
  'Science & Technology': [
    'Biotech', 'High Tech', 'Medicine', 'Mobile', 'Other', 'Robotics',
    'Science', 'Social Media'
  ],
  'Seasonal & Holiday': [
    'Channukah', 'Christmas', 'Easter', 'Fall events', 'Halloween/Haunt',
    'Independence Day', 'New Years Eve', 'Other', 'St Patricks Day',
    'Thanksgiving'
  ],
  'Sports & Fitness': [
    'Baseball', 'Basketball', 'Cycling', 'Exercise', 'Fighting & Martial Arts',
    'Football', 'Golf', 'Hockey', 'Motorsports', 'Mountain Biking',
    'Obstacles', 'Other', 'Rugby', 'Running', 'Snow Sports', 'Soccer',
    'Swimming & Water Sports', 'Tennis', 'Volleyball', 'Walking', 'Yoga'
  ],
  'Travel & Outdoor': [
    'Canoeing', 'Climbing', 'Hiking', 'Kayaking', 'Other', 'Rafting', 'Travel'
  ]
};

export const paymentCountries  = [
  'United States',
  'Albania',
  'Argentina',
  'Australia',
  'Austria',
  'Belgium',
  'Brazil',
  'Canada',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hong Kong',
  'Hungary',
  'Ireland',
  'Israel',
  'Italy',
  'Japan',
  'Latvia',
  'Lithuania',
  'Luxemborg',
  'Malaysia',
  'Malta',
  'Mexico',
  'Netherlands',
  'New Zealand',
  'Norway',
  'Philippines',
  'Poland',
  'Portugal',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
  'Switzerland',
  'Taiwan',
  'United Kingdom'
];

export const timezones = moment.tz.names();

export const FORM_DATE_FORMAT = 'MM/DD/YYYY';
export const FORM_TIME_FORMAT = 'HH:mm';
