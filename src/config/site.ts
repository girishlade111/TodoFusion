export interface NavLinkItem {
  label: string;
  href: string;
}

export const siteConfig = {
  name: 'TodoFusion',
  tagline: 'Unify Your Tasks, Amplify Your Productivity',
  description:
    'Transform task management with TodoFusion. Combine powerful to-do lists, productivity tracking, and seamless integrations to stay focused and achieve more.',
  footerTagline: 'Simplify tasks, boost productivity, and manage projects seamlessly.',
  defaultTheme: 'dark' as 'dark' | 'light',
  brandMarkSvg: '/assets/images/extracted/p0am5fZMo1u3E4kxZuOEvmL7G48.svg',
  templatePurchaseUrl:
    process.env.NEXT_PUBLIC_TEMPLATE_URL ||
    'https://stylokit.lemonsqueezy.com/buy/90428c62-5437-4f6f-9758-5db5fb3f9746',
  creator: {
    name: 'Stylokit',
    author: 'Dmytri Ivanov',
    url: 'https://stylokit.com/',
    email: 'info@stylokit.com',
  },
  headerNav: [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '/docs' },
    { label: 'UI Kit', href: '/uikit' },
  ] as NavLinkItem[],
  resourcesDropdown: [
    { label: 'Features', href: '/features', icon: 'trophy' as const },
    { label: 'Integrations', href: '/integrations', icon: 'plug' as const },
    { label: 'About', href: '/about', icon: 'users' as const },
  ],
  footerColumns: {
    pages: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
    ],
    products: [
      { label: 'Features', href: '/features' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Docs', href: '/docs' },
    ],
    resources: [
      { label: 'Blog', href: '/blog' },
      { label: 'UI Kit', href: '/uikit' },
      { label: 'Helpcenter', href: '/helpcenter' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
    ],
  },
  socialLinks: [
    { label: 'X (Twitter)', href: 'https://x.com/Dmytri_Design', platform: 'x' as const },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dmytri-design/', platform: 'linkedin' as const },
    { label: 'Dribbble', href: 'https://dribbble.com/dmytriDesign', platform: 'dribbble' as const },
  ],
  communitySlackUrl: 'https://slack.com/',
  useReferenceFixtures: true,
};
