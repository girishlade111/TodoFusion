export interface TeamMember {
  id: string;
  name: string;
  role: string;
  referenceRole: string;
  avatarSrc: string;
}

export interface AboutStat {
  id: string;
  topLabel: string;
  value: string;
  bottomLabel: string;
  referenceBottomLabel: string;
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
}

export const founderMessage = {
  quote:
    'I am committed to revolutionizing the way you manage tasks. Our platform is designed to seamlessly integrate with your daily workflow, enhancing productivity and collaboration. At TodoFusion, we are dedicated to providing you with innovative solutions that empower you to achieve more every day. Thank you for choosing us to be part of your productivity journey.',
  name: 'David Johnson',
  role: 'CEO, Founder',
  avatarSrc: '/assets/images/extracted/qeYrxqQc9vll222pCTtaYWDxo.jpg',
};

export const aboutStats: AboutStat[] = [
  {
    id: 'creators',
    topLabel: 'Used by',
    value: '9,000+',
    bottomLabel: 'Creators',
    referenceBottomLabel: 'Creators',
  },
  {
    id: 'revenue',
    topLabel: 'Value',
    value: '60M',
    bottomLabel: 'Revenue per year',
    referenceBottomLabel: 'Revenue per year',
  },
  {
    id: 'end-users',
    topLabel: 'To support',
    value: '9.5M',
    bottomLabel: 'End users',
    referenceBottomLabel: 'Endd users',
  },
];

export const companyValues: CompanyValue[] = [
  {
    id: 'commitment',
    title: 'Commitment',
    description:
      'Our commitment is shown through relentless support and dedication, fostering long-term success for our team.',
  },
  {
    id: 'flexibility',
    title: 'Flexibility',
    description:
      'Flexibility in schedules promotes balance, empowering team members to excel at work and home.',
  },
  {
    id: 'empathy',
    title: 'Empathy',
    description:
      'Empathy guides our interactions, creating a supportive space where personal challenges are respected.',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 'david-johnson',
    name: 'David Johnson',
    role: 'CEO, Founder',
    referenceRole: 'Ceo, Fouder',
    avatarSrc: '/assets/images/extracted/qeYrxqQc9vll222pCTtaYWDxo.jpg',
  },
  {
    id: 'sarah-smith',
    name: 'Sarah Smith',
    role: 'Project Manager',
    referenceRole: 'Project Manager',
    avatarSrc: '/assets/images/extracted/nFTyhTg9mtSiD0Oh51DGHixETM.jpg',
  },
  {
    id: 'amanda-daviss',
    name: 'Amanda Daviss',
    role: 'Product manager',
    referenceRole: 'Product manager',
    avatarSrc: '/assets/images/extracted/S9PyleA1z5ugBA2Z87N0r7h5VA.jpg',
  },
  {
    id: 'olena-kurcherenko',
    name: 'Olena Kurcherenko',
    role: 'Marketing Specialist',
    referenceRole: 'Marketing Specialist',
    avatarSrc: '/assets/images/extracted/rZmnnPdh2NfRFd8GwnJmVeCq5Ow.jpg',
  },
  {
    id: 'emily-brown',
    name: 'Emily Brown',
    role: 'Designer',
    referenceRole: 'Designer',
    avatarSrc: '/assets/images/extracted/6XZCtw7h60Jk2esAHAaoFrp9ns.png',
  },
  {
    id: 'chris-wilson',
    name: 'Chris Wilson',
    role: 'Customer Support',
    referenceRole: 'Customer Support',
    avatarSrc: '/assets/images/extracted/7n35wdG8jtT2LMgYCpqeBkSo6s.jpg',
  },
  {
    id: 'micheal-lee',
    name: 'Micheal Lee',
    role: 'Analyst',
    referenceRole: 'Analyst',
    avatarSrc: '/assets/images/extracted/jHYD50CG2aJRz34ro4OYrlsLDQ.jpg',
  },
  {
    id: 'andrew-wilson',
    name: 'Andrew Wilson',
    role: 'Sales representative',
    referenceRole: 'Sales representative',
    avatarSrc: '/assets/images/extracted/3lxG5etcVf37NL3i2nIGARTTaI.jpg',
  },
];
