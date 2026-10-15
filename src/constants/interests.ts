export const PREDEFINED_INTERESTS = [
  'Coding',
  'Software Architecture',
  'Full-Stack Development',
  'DevOps & Cloud',
  'Artificial Intelligence',
  'Machine Learning',
  'Cybersecurity',
  'Web Development',
  'Mobile App Development',
  'Open Source',
  'Chess',
  'Reading',
  'Music',
  'Gaming',
  'Travel',
  'Photography',
  'Finance & Crypto',
  'UI/UX Design',
  'Database Management',
  'System Design',
] as const;

export type PredefinedInterest = (typeof PREDEFINED_INTERESTS)[number];
