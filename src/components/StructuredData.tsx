export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Viralaty',
    url: 'https://viralaty.com',
    logo: 'https://viralaty.com/assets/images/viralaty-logo-removebg-preview-1788527123870.png',
    description: 'Done-for-you ChatGPT Ads agency. We build, launch, and scale AI ad campaigns for DTC, SaaS, and high-ticket brands.',
    email: 'hello@viralaty.com',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'hello@viralaty.com',
      availableLanguage: 'English'
    }
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'ChatGPT Ads Management',
    provider: {
      '@type': 'Organization',
      name: 'Viralaty',
      url: 'https://viralaty.com'
    },
    description: 'Done-for-you ChatGPT Ads campaign setup, management, and optimisation for DTC, SaaS, and high-ticket brands.',
    areaServed: 'Worldwide',
    serviceType: 'Digital Advertising'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      
    </>);

}