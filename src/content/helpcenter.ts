export type HelpCategory = 'All' | 'Company' | 'Get Started' | 'Services';

export interface HelpcenterQuestion {
  id: string;
  question: string;
  answer: string;
  category: Exclude<HelpCategory, 'All'>;
  keywords: string[];
  order: number;
  verificationStatus: 'VERIFIED_QUESTION_ESTIMATED_ANSWER';
}

export const helpcenterCategories: HelpCategory[] = ['All', 'Company', 'Get Started', 'Services'];

export const helpcenterQuestions: HelpcenterQuestion[] = [
  {
    id: 'issues-with-service',
    question: 'What should I do if I am experiencing issues with your service?',
    answer:
      'Try refreshing the workspace and checking your integration sync status in Settings. If the issue persists, contact our support team via the Contact page or email info@stylokit.com.',
    category: 'Services',
    keywords: ['issues', 'troubleshooting', 'support', 'error', 'service'],
    order: 1,
    verificationStatus: 'VERIFIED_QUESTION_ESTIMATED_ANSWER',
  },
  {
    id: 'upgrade-package',
    question: 'How can I upgrade my current service package?',
    answer:
      'Visit the Pricing page to compare the Monthly plan ($4.9) and Pay once lifetime ($99) options, or speak with our sales team for team-wide licensing.',
    category: 'Services',
    keywords: ['upgrade', 'package', 'plan', 'pricing', 'lifetime'],
    order: 2,
    verificationStatus: 'VERIFIED_QUESTION_ESTIMATED_ANSWER',
  },
  {
    id: 'subscription-plans',
    question: 'Are there any subscription plans for your services?',
    answer:
      'Yes. TodoFusion showcases both a flexible Monthly plan and a one-time Lifetime option, both including unlimited lists, tasks, and priority support.',
    category: 'Services',
    keywords: ['subscription', 'plans', 'monthly', 'pricing'],
    order: 3,
    verificationStatus: 'VERIFIED_QUESTION_ESTIMATED_ANSWER',
  },
  {
    id: 'customer-support-types',
    question: 'What types of customer support do you offer?',
    answer:
      'We provide 24/7 support via email, phone, and live chat, along with self-service documentation and community channels.',
    category: 'Services',
    keywords: ['support', 'email', 'chat', 'help'],
    order: 4,
    verificationStatus: 'VERIFIED_QUESTION_ESTIMATED_ANSWER',
  },
  {
    id: 'data-privacy',
    question: 'How does your company ensure customer data privacy?',
    answer:
      'We apply technical and organizational safeguards to protect account and usage data. Full details are outlined on our Privacy Policy page.',
    category: 'Company',
    keywords: ['privacy', 'security', 'data', 'policy'],
    order: 5,
    verificationStatus: 'VERIFIED_QUESTION_ESTIMATED_ANSWER',
  },
  {
    id: 'core-values',
    question: 'What are your company’s core values?',
    answer:
      'Our team operates around three core values featured on the About page: Commitment, Flexibility, and Empathy.',
    category: 'Company',
    keywords: ['values', 'commitment', 'flexibility', 'empathy', 'company'],
    order: 6,
    verificationStatus: 'VERIFIED_QUESTION_ESTIMATED_ANSWER',
  },
  {
    id: 'company-location',
    question: 'Where is your company located?',
    answer:
      'TodoFusion operates as a remote-first product team collaborating across distributed time zones.',
    category: 'Company',
    keywords: ['location', 'office', 'remote', 'company'],
    order: 7,
    verificationStatus: 'VERIFIED_QUESTION_ESTIMATED_ANSWER',
  },
  {
    id: 'company-history',
    question: 'What is the history of your company?',
    answer:
      'Created by Dmytri Ivanov / Stylokit, TodoFusion was designed to bring focused task management, time tracking, and seamless integrations into one clean workflow.',
    category: 'Company',
    keywords: ['history', 'story', 'stylokit', 'about'],
    order: 8,
    verificationStatus: 'VERIFIED_QUESTION_ESTIMATED_ANSWER',
  },
  {
    id: 'customize-settings',
    question: 'Can I customize my settings as a new user?',
    answer:
      'Yes. You can configure account preferences, notification alerts, interval durations, and Dark or Light theme modes right from the navigation or Account Settings.',
    category: 'Get Started',
    keywords: ['customize', 'settings', 'theme', 'notifications'],
    order: 9,
    verificationStatus: 'VERIFIED_QUESTION_ESTIMATED_ANSWER',
  },
  {
    id: 'new-user-tutorial',
    question: 'Is there a tutorial available for new users?',
    answer:
      'Yes. Visit the TodoFusion Documentation portal (/docs) for step-by-step guides covering Account setup, Dashboard navigation, Managing Tasks, and Integrations.',
    category: 'Get Started',
    keywords: ['tutorial', 'guide', 'docs', 'onboarding'],
    order: 10,
    verificationStatus: 'VERIFIED_QUESTION_ESTIMATED_ANSWER',
  },
  {
    id: 'after-registration',
    question: 'What do I need to start using your services immediately after registration?',
    answer:
      'Once registered, open your Dashboard to create task lists, set time estimates, or connect your preferred tools via the Integrations directory.',
    category: 'Get Started',
    keywords: ['registration', 'start', 'dashboard', 'tasks'],
    order: 11,
    verificationStatus: 'VERIFIED_QUESTION_ESTIMATED_ANSWER',
  },
  {
    id: 'create-account',
    question: 'How do I create an account with your service?',
    answer:
      'Select Get Started from the homepage or Pricing page, and follow the onboarding guide in our Getting Started documentation.',
    category: 'Get Started',
    keywords: ['account', 'signup', 'register', 'create'],
    order: 12,
    verificationStatus: 'VERIFIED_QUESTION_ESTIMATED_ANSWER',
  },
];
