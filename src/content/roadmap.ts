export interface RoadmapCardItem {
  id: string;
  title: string;
  description: string;
  icon: 'gamepad' | 'smartphone' | 'clock' | 'sparkles' | 'grid' | 'zap';
}

export const featuresRoadmap: RoadmapCardItem[] = [
  {
    id: 'gamified-productivity',
    title: 'Gamified productivity',
    description: 'Enjoy the power of simplicity and bird-eye view perspective',
    icon: 'gamepad',
  },
  {
    id: 'mobile-app',
    title: 'Mobile app',
    description: 'Enjoy the power of simplicity and bird-eye view perspective',
    icon: 'smartphone',
  },
  {
    id: 'break-time',
    title: 'Break time',
    description: 'Enjoy the power of simplicity and bird-eye view perspective',
    icon: 'clock',
  },
  {
    id: 'ai-task-creation',
    title: 'AI Task creation',
    description: 'Enjoy the power of simplicity and bird-eye view perspective',
    icon: 'sparkles',
  },
  {
    id: 'eisenhower-matrix',
    title: 'Eisenhower matrix',
    description: 'Enjoy the power of simplicity and bird-eye view perspective',
    icon: 'grid',
  },
  {
    id: 'live-collaboration',
    title: 'Live collaboration',
    description: 'Enjoy the power of simplicity and bird-eye view perspective',
    icon: 'zap',
  },
];
