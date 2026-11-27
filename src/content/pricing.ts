export interface PricingPlan {
  id: 'monthly' | 'lifetime';
  title: string;
  description: string;
  price: string;
  billingLabel: string;
  taxLabel: string;
  ctaLabel: string;
  ctaHref: string;
  isFeatured: boolean;
  highlights: string[];
  features: string[];
  referenceNotes?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'monthly',
    title: 'Monthly plan',
    description: 'Flexible and affordable. Boost your productivity month by month.',
    price: '$4.9',
    billingLabel: 'monthly',
    taxLabel: 'plus local taxes',
    ctaLabel: 'Get Started',
    ctaHref: 'https://stylokit.lemonsqueezy.com/buy/90428c62-5437-4f6f-9758-5db5fb3f9746',
    isFeatured: false,
    highlights: ['Unlimited lists & tasks', 'Priority support'],
    features: [
      'Full access to all features',
      'Regular updates and new features',
      'Premium support',
      'No recurring fees',
    ],
    referenceNotes:
      'Reference template lists "No recurring fees" on the Monthly plan card; retained as a reference fixture and documented in content-discrepancies.md.',
  },
  {
    id: 'lifetime',
    title: 'Pay once lifetime',
    description: 'One-time payment. Unlimited access forever. Ultimate productivity investment.',
    price: '$99',
    billingLabel: 'one-time payment',
    taxLabel: 'plus local taxes',
    ctaLabel: 'Get Started',
    ctaHref: 'https://stylokit.lemonsqueezy.com/buy/90428c62-5437-4f6f-9758-5db5fb3f9746',
    isFeatured: true,
    highlights: ['Unlimited lists & tasks', 'Priority support'],
    features: [
      'Full access to all features',
      'Regular updates and new features',
      'Premium support',
      'No recurring fees',
    ],
  },
];
