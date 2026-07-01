const FAQ_DATA = [
  {
    id: 1,
    keywords: ['name', 'college name', 'institute name'],
    answer: 'Our institute name is ABC Institute of Technology.',
  },
  {
    id: 2,
    keywords: ['timing', 'time', 'class time', 'hours'],
    answer: 'Class timings are from 9:00 AM to 4:30 PM.',
  },
  {
    id: 3,
    keywords: ['fees', 'fee', 'tuition', 'payment', 'cost'],
    answer: 'The fee structure depends on the course. Please contact the office.',
  },
  {
    id: 4,
    keywords: ['course', 'courses', 'program', 'degree'],
    answer: 'We offer BCA, MCA, B.Tech, and MBA programs.',
  },
  {
    id: 5,
    keywords: ['uniform', 'dress', 'dress code'],
    answer: 'Yes, wearing the institute uniform is compulsory.',
  },
  {
    id: 6,
    keywords: ['lunch', 'break', 'recess'],
    answer: 'Lunch break is from 1:00 PM to 1:45 PM.',
  },
  {
    id: 7,
    keywords: ['exam', 'exams', 'test', 'assessment'],
    answer: 'Examinations are conducted as per the university schedule.',
  },
  {
    id: 8,
    keywords: ['attendance', 'presence', 'minimum attendance'],
    answer: 'Minimum 75% attendance is mandatory.',
  },
  {
    id: 9,
    keywords: ['holiday', 'holidays', 'vacation'],
    answer: 'Holidays are as per the academic calendar.',
  },
  {
    id: 10,
    keywords: ['bus', 'transport', 'transportation'],
    answer: 'Yes, transport (bus) facility is available.',
  },
  {
    id: 11,
    keywords: ['hostel', 'accommodation', 'residence'],
    answer: 'Hostel facilities are available for boys and girls.',
  },
  {
    id: 12,
    keywords: ['placement', 'job', 'career'],
    answer: 'Placement assistance is provided to final-year students.',
  },
  {
    id: 13,
    keywords: ['contact', 'phone', 'call'],
    answer: 'You can contact us at 9876543210.',
  },
  {
    id: 14,
    keywords: ['email', 'mail'],
    answer: 'Our email ID is info@abcinstitute.edu',
  },
  {
    id: 15,
    keywords: ['address', 'location', 'where'],
    answer: 'We are located at Main Road, New Delhi.',
  },
];

const STOPWORDS = new Set([
  'i', 'me', 'my', 'you', 'your', 'is', 'am', 'are',
  'the', 'a', 'an', 'and', 'or', 'to', 'of', 'in',
  'on', 'for', 'with', 'how', 'can', 'do', 'da', 'does'
]);

const SPELLING_MAP = {
  'hii': 'hi',
  'hiii': 'hi',
  'helo': 'hello',
  'helloo': 'hello',
  'pls': 'please',
  'plz': 'please',
  'thanx': 'thanks',
  'thx': 'thanks',
  'imporve': 'improve',
  'improove': 'improve',
  'skillss': 'skills',
  'skillsss': 'skills',
  'dsaaa': 'dsa',
  'algos': 'algorithms',
  'bcoz': 'because',
  'cuz': 'because',
  'wht': 'what',
  'wat': 'what',
  'hw': 'homework',
  'examms': 'exam',
  'prob': 'problem',
  'prblm': 'problem',
  'prog': 'program',
  'func': 'function',
  'var': 'variable',
  'loopss': 'loop',
};

module.exports = {
  FAQ_DATA,
  STOPWORDS,
  SPELLING_MAP,
};
