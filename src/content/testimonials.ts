export interface TestimonialRecord {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarSrc: string;
  companyName?: string;
  companyLogoSrc?: string;
  featured?: boolean;
  column?: 'left' | 'middle' | 'right';
}

export const mosaicTestimonials: TestimonialRecord[] = [
  {
    id: 'david-johnson',
    quote:
      'Just submitted another brief to my writers! Picked up the lifetime deal ! Thanks for an awesome app',
    name: 'David Johnson',
    role: 'Founder',
    avatarSrc: '/assets/images/extracted/jHYD50CG2aJRz34ro4OYrlsLDQ.jpg',
    companyName: 'Agentify',
    companyLogoSrc: '/assets/images/extracted/EmVysfBcVh1Q9T1LSjkzenT9A4.svg',
    column: 'left',
  },
  {
    id: 'sarah-johnson',
    quote:
      "I've got ADHD and autism and this is the only thing that really works for me, it has gorgeous UI, and I can't wait to see what comes next!",
    name: 'Sarah Johnson',
    role: 'Project Manager',
    avatarSrc: '/assets/images/extracted/7FKQArWWBp1asH0FWSfT8lu47M.jpg',
    column: 'middle',
  },
  {
    id: 'john-deo',
    quote:
      "TodoFusion's features are top-notch at Achieve Success Inc. It's the best tool for keeping my team on target.",
    name: 'John Deo',
    role: "Founder, Carter's Boutque",
    avatarSrc: '/assets/images/extracted/pBxmTDzr0YlyJetJb7gvXhiE9rA.jpg',
    column: 'middle',
  },
  {
    id: 'emily-smith-codify',
    quote:
      'TodoFusion streamlined our workflows and doubled our productivity within just three months!',
    name: 'Emily Smith',
    role: 'CEO, Codify',
    avatarSrc: '/assets/images/extracted/U06B9sXPfIJH61lq23ex7v0fY0.png',
    companyName: 'Codify',
    companyLogoSrc: '/assets/images/extracted/Ii4R9CyARUK6FYVvgLsDKCq3k3c.svg',
    featured: true,
    column: 'right',
  },
  {
    id: 'jenny-parker',
    quote:
      "I love the simplicity and power of TodoFusion at Global Solutions. It's perfect for both work and personal tasks.",
    name: 'Jenny Parker',
    role: 'Designer',
    avatarSrc: '/assets/images/extracted/BdQGd0mXzb7bh1YWpcefm0AGsqM.jpg',
    column: 'left',
  },
  {
    id: 'mark-thompson',
    quote:
      "TodoFusion's user-friendly interface at Creative Designs makes task management a breeze. Highly recommended!",
    name: 'Mark Thompson',
    role: 'CEO, Global Solutionss',
    avatarSrc: '/assets/images/extracted/DyVvS8xF1mz2lX9jLXgyVsTKipk.jpg',
    column: 'middle',
  },
  {
    id: 'emily-smith-tech',
    quote:
      'TodoFusion has revolutionized my productivity at Tech Innovators. I get more done in less time!',
    name: 'Emily Smith',
    role: 'Ceo-Founder',
    avatarSrc: '/assets/images/extracted/9Dcy51HPeuR8C3L27FCTtRlirwE.jpg',
    column: 'right',
  },
];

export const pricingTabTestimonials: TestimonialRecord[] = [
  {
    id: 'pricing-tab-1',
    quote:
      '"TodoFusion streamlined our workflows and doubled our productivity within just three months!"',
    name: 'Emily Smith',
    role: 'CEO, Codify',
    avatarSrc: '/assets/images/extracted/U06B9sXPfIJH61lq23ex7v0fY0.png',
  },
  {
    id: 'pricing-tab-2',
    quote:
      '"Just submitted another brief to my writers! Picked up the lifetime deal ! Thanks for an awesome app"',
    name: 'David Johnson',
    role: 'Founder',
    avatarSrc: '/assets/images/extracted/jHYD50CG2aJRz34ro4OYrlsLDQ.jpg',
  },
  {
    id: 'pricing-tab-3',
    quote:
      '"TodoFusion has revolutionized my productivity at Tech Innovators. I get more done in less time!"',
    name: 'Emily Smith',
    role: 'Ceo-Founder',
    avatarSrc: '/assets/images/extracted/nFTyhTg9mtSiD0Oh51DGHixETM.jpg',
  },
];
