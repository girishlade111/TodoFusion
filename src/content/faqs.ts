export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const marketingFaqs: FaqItem[] = [
  {
    id: 'what-is-todofusion',
    question: 'What is TodoFusion?',
    answer: 'A task management app designed to boost your productivity with smart integrations.',
  },
  {
    id: 'integration-details',
    question: 'Integration details?',
    answer: 'Syncs seamlessly with Notion and Google for streamlined task and calendar management.',
  },
  {
    id: 'main-features',
    question: 'Main features?',
    answer: 'Includes task prioritization, productivity tracking, collaboration, and rewards.',
  },
  {
    id: 'mobile-availability',
    question: 'Mobile availability?',
    answer: 'Available on iOS and Android, with full functionality.',
  },
  {
    id: 'task-sharing-possible',
    question: 'Task sharing possible?',
    answer: 'Yes, supports sharing and collaborative progress tracking.',
  },
  {
    id: 'customer-support-options',
    question: 'Customer support options?',
    answer: 'Offers 24/7 support via email, phone, and live chat.',
  },
];
