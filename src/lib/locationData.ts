import type { LocationPin } from '@/types/map';

// Hardcoded coordinates for known locations
export const KNOWN_LOCATIONS: Record<string, [number, number]> = {
  // Italy
  'Padova, Italy': [11.8875, 45.4064],
  'Bologna, Italy': [11.3426, 44.4949],
  'Perugia, Italy': [12.3925, 43.1107],
  'Bertinoro, Italy': [11.9500, 44.1333],

  // Greece
  'Piraeus, Greece': [23.6473, 37.9425],

  // USA
  'Phoenix, AZ, USA': [-112.0740, 33.4484],
  'Gainesville, FL, USA': [-82.3250, 29.6516],

  // Canada
  'Montréal, Canada': [-73.5673, 45.5017],
};

// Presentation pins
export const PRESENTATION_PINS: LocationPin[] = [
  {
    id: 'pres-enbis-2025',
    type: 'presentation',
    title: 'Optimal constrained design of control charts using stochastic approximations',
    date: '2025-09-01',
    location: 'Piraeus, Greece',
    coordinates: KNOWN_LOCATIONS['Piraeus, Greece'],
    contentId: 'enbis-2025',
    venue: 'ENBIS-25 Conference',
  },
  {
    id: 'pres-padova-seminar-2025',
    type: 'presentation',
    title: 'Efficient algorithms for the calibration of control limits',
    date: '2025-11-01',
    location: 'Padova, Italy',
    coordinates: KNOWN_LOCATIONS['Padova, Italy'],
    contentId: 'padova-seminar-2025',
    venue: 'Università degli Studi di Padova',
  },
  {
    id: 'pres-informs-2023',
    type: 'presentation',
    title: 'Optimal constrained design of control charts using stochastic approximations',
    date: '2023-10-01',
    location: 'Phoenix, AZ, USA',
    coordinates: KNOWN_LOCATIONS['Phoenix, AZ, USA'],
    contentId: 'informs-2023',
    venue: '2023 INFORMS Annual Meeting',
  },
  {
    id: 'pres-padova-poster-2022',
    type: 'presentation',
    title: 'Profile monitoring based on adaptive parameter learning',
    date: '2022-09-01',
    location: 'Padova, Italy',
    coordinates: KNOWN_LOCATIONS['Padova, Italy'],
    contentId: 'padova-poster-2022',
    venue: 'Statistical methods and models for complex data',
  },
  {
    id: 'pres-isba-2022',
    type: 'presentation',
    title: 'Bayesian nonparametric multiscale mixture models via Hilbert-curve partitioning',
    date: '2022-06-01',
    location: 'Montréal, Canada',
    coordinates: KNOWN_LOCATIONS['Montréal, Canada'],
    contentId: 'isba-2022',
    venue: '2022 ISBA World Meeting',
  },
];

// Education pins
export const EDUCATION_PINS: LocationPin[] = [
  {
    id: 'edu-phd-padova',
    type: 'education',
    title: 'Ph.D. in Statistical Sciences',
    date: '2021-01-01',
    location: 'Padova, Italy',
    coordinates: KNOWN_LOCATIONS['Padova, Italy'],
    contentId: 'edu-phd-padova',
    institution: 'University of Padova',
  },
  {
    id: 'edu-msc-padova',
    type: 'education',
    title: 'M.Sc. in Statistical Sciences',
    date: '2019-01-01',
    location: 'Padova, Italy',
    coordinates: KNOWN_LOCATIONS['Padova, Italy'],
    contentId: 'edu-msc-padova',
    institution: 'University of Padova',
  },
  {
    id: 'edu-bsc-padova',
    type: 'education',
    title: 'B.Sc. in Statistics for Technology and Sciences',
    date: '2016-01-01',
    location: 'Padova, Italy',
    coordinates: KNOWN_LOCATIONS['Padova, Italy'],
    contentId: 'edu-bsc-padova',
    institution: 'University of Padova',
  },
  {
    id: 'edu-summer-perugia',
    type: 'education',
    title: 'Summer School in Mathematics',
    date: '2020-07-01',
    location: 'Perugia, Italy',
    coordinates: KNOWN_LOCATIONS['Perugia, Italy'],
    contentId: 'edu-summer-perugia',
    institution: 'University of Perugia',
  },
  {
    id: 'edu-summer-bertinoro',
    type: 'education',
    title: 'INFN International School on Efficient Scientific Computing',
    date: '2022-10-01',
    location: 'Bertinoro, Italy',
    coordinates: KNOWN_LOCATIONS['Bertinoro, Italy'],
    contentId: 'edu-summer-bertinoro',
    institution: 'INFN',
  },
  {
    id: 'edu-visiting-uf',
    type: 'education',
    title: 'Visiting Ph.D. Student',
    date: '2023-01-01',
    location: 'Gainesville, FL, USA',
    coordinates: KNOWN_LOCATIONS['Gainesville, FL, USA'],
    contentId: 'edu-visiting-uf',
    institution: 'University of Florida - Dept. of Biostatistics',
  },
];

// Work pins
export const WORK_PINS: LocationPin[] = [
  {
    id: 'work-optit',
    type: 'work',
    title: 'Data Scientist',
    date: '2024-10-01',
    location: 'Bologna, Italy',
    coordinates: KNOWN_LOCATIONS['Bologna, Italy'],
    contentId: 'work-optit',
    company: 'OPTIT S.r.l',
  },
  {
    id: 'work-phd-student',
    type: 'work',
    title: 'Ph.D. Student in Statistical Sciences',
    date: '2021-01-01',
    location: 'Padova, Italy',
    coordinates: KNOWN_LOCATIONS['Padova, Italy'],
    contentId: 'work-phd-student',
    company: 'University of Padua',
  },
  {
    id: 'work-expin',
    type: 'work',
    title: 'Statistical Consultant',
    date: '2023-07-01',
    location: 'Padova, Italy',
    coordinates: KNOWN_LOCATIONS['Padova, Italy'],
    contentId: 'work-expin',
    company: 'Expin S.r.l.',
  },
  {
    id: 'work-teaching-assistant',
    type: 'work',
    title: 'Teaching Assistant',
    date: '2022-10-01',
    location: 'Padova, Italy',
    coordinates: KNOWN_LOCATIONS['Padova, Italy'],
    contentId: 'work-teaching-assistant',
    company: 'University of Padua - Dept. of Developmental Psychology',
  },
  {
    id: 'work-academic-tutor',
    type: 'work',
    title: 'Academic Tutor',
    date: '2017-09-01',
    location: 'Padova, Italy',
    coordinates: KNOWN_LOCATIONS['Padova, Italy'],
    contentId: 'work-academic-tutor',
    company: 'University of Padua - Dept. of Statistical Sciences',
  },
];

// All pins combined
export const ALL_PINS: LocationPin[] = [
  ...PRESENTATION_PINS,
  ...EDUCATION_PINS,
  ...WORK_PINS,
];
