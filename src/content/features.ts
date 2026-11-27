export interface PlannedFeatureItem {
  id: string;
  title: string;
  description: string;
  accent: 'purple' | 'orange' | 'lime' | 'pink' | 'cyan' | 'coral';
  icon: 'keyboard' | 'clock' | 'sparkles' | 'layers' | 'users' | 'contrast';
}

export const plannedFeatures: PlannedFeatureItem[] = [
  {
    id: 'keyboard-shortcuts',
    title: 'Keyboard shortcuts',
    description:
      'Streamline your workflow with customizable keyboard shortcuts. Navigate and manage tasks faster, boosting your productivity.',
    accent: 'purple',
    icon: 'keyboard',
  },
  {
    id: 'break-time',
    title: 'Break time',
    description:
      'Enhance your focus with scheduled breaks. Stay productive by incorporating regular breaks to refresh your mind.',
    accent: 'orange',
    icon: 'clock',
  },
  {
    id: 'ai-task-creation',
    title: 'AI task creation',
    description:
      'Leverage AI to automatically generate and organize tasks. Save time and improve efficiency with intelligent task management.',
    accent: 'lime',
    icon: 'sparkles',
  },
  {
    id: 'integration',
    title: 'Integration',
    description:
      'Seamlessly connect with Notion, Google, and other tools. Integrate your favorite apps for a unified productivity experience.',
    accent: 'pink',
    icon: 'layers',
  },
  {
    id: 'live-collaboration',
    title: 'Live collaboration',
    description:
      'Collaborate in real-time with your team. Share tasks, track progress, and achieve goals together effortlessly.',
    accent: 'cyan',
    icon: 'users',
  },
  {
    id: 'dark-light-mode',
    title: 'Dark & Light mode',
    description:
      'Switch between dark and light modes to suit your preference. Enjoy a comfortable viewing experience day or night.',
    accent: 'coral',
    icon: 'contrast',
  },
];

export const trustedLogos = [
  { name: 'Platify', icon: '/assets/images/extracted/rQVdJnw14aSru7SmDQie2lJ15jo.svg' },
  { name: 'Nexus AI', icon: '/assets/images/extracted/N9iEj4VlvCb0mGkDf6GESH1Qcg.svg' },
  { name: 'Landify', icon: '/assets/images/extracted/UseGhaYGXIKPcdRXojpYUbMhvo4.svg' },
  { name: 'Identify', icon: '/assets/images/extracted/FDQbBJQ07D9coacUsuFafFDmA.svg' },
  { name: 'Flowboard', icon: '/assets/images/extracted/bGp6A2IPNdTqQWhmmEaqIdlVI.svg' },
  { name: 'Flexify', icon: '/assets/images/extracted/2En73BkOImlA8OqS3YLYKRuOBI.svg' },
  { name: 'Codify', icon: '/assets/images/extracted/eNJph42RGV6So8noovFImKAvE.svg' },
  { name: 'Startify', icon: '/assets/images/extracted/f5ActK1sUkjTWn0PH1gZaDqU.svg' },
];
