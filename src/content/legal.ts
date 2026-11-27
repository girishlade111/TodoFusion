export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  hasContactLink?: boolean;
}

export const privacyPolicyContent = {
  title: 'Privacy Policy',
  date: 'September 26, 2024',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      paragraphs: [
        'Welcome to TodoFusion ("we," "our," or "us"). At TodoFusion, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and protect your personal data when you use our website, products, or services. By accessing or using our services, you consent to the practices described in this Privacy Policy.',
      ],
    },
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      paragraphs: ['We may collect various types of information, including:'],
      bullets: [
        'Personal Information: Such as your name, email address, and other identifying information you provide when registering or contacting us.',
        'Usage Data: Information about how you interact with our website, products, and services, including IP addresses, device and browser information, and access times.',
        'Cookies: We use cookies to collect information about your preferences, settings, and browsing patterns. You can manage cookie preferences in your browser settings.',
        'Third-party Information: Information we may receive from third-party sources or services, which may include social media platforms.',
      ],
    },
    {
      id: 'how-we-use-your-information',
      title: 'How We Use Your Information',
      paragraphs: ['We use your information for various purposes, including:'],
      bullets: [
        'Providing and improving our products and services.',
        'Responding to your inquiries and support requests.',
        'Sending you promotional materials and updates (if you opt-in).',
        'Complying with legal obligations and protecting our rights.',
      ],
    },
    {
      id: 'data-security',
      title: 'Data Security',
      paragraphs: [
        'We take the security of your personal information seriously and employ appropriate technical and organizational measures to safeguard it. However, no method of online transmission or storage is 100% secure, and we cannot guarantee absolute security.',
      ],
    },
    {
      id: 'third-party-links',
      title: 'Third-party Links',
      paragraphs: [
        'Our website may contain links to third-party sites or services not operated by us. We are not responsible for the privacy practices of such third parties. We encourage you to review their privacy policies.',
      ],
    },
    {
      id: 'your-choices',
      title: 'Your Choices',
      paragraphs: [
        'You can update or delete your personal information by contacting us. You can also opt-out of receiving promotional communications from us.',
      ],
    },
    {
      id: 'changes-to-this-policy',
      title: 'Changes to This Policy',
      paragraphs: [
        'We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post the updated Privacy Policy on our website.',
      ],
    },
    {
      id: 'refund-policy',
      title: 'Refund Policy',
      paragraphs: [
        'Please note, we cannot issue a refund if you simply change your mind after purchasing or decide not to use the file.',
        "If you're not satisfied with the product you've purchased — contact us and provide a trustworthy explanation of why you changed your mind. Due to the essence of digital products, we can't verify you stopped using our assets and deleted them.",
      ],
      hasContactLink: true,
    },
  ] as LegalSection[],
};
