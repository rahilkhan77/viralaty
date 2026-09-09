import type { Metadata } from 'next';
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import OpportunitySection from '@/components/OpportunitySection';
import ServicesSection from '@/components/ServicesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import AudienceSection from '@/components/AudienceSection';
import ProcessSection from '@/components/ProcessSection';
import CaseStudySection from '@/components/CaseStudySection';
import TrackRecordSection from '@/components/TrackRecordSection';
import WhyUsSection from '@/components/WhyUsSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import PricingSection from '@/components/PricingSection';

export const metadata: Metadata = {
  title: 'Viralaty — ChatGPT Ads Agency | Done-For-You AI Ad Management',
  description: 'Viralaty is a done-for-you ChatGPT Ads agency. We build, launch, and scale AI ad campaigns for DTC, SaaS, and high-ticket brands. First campaign live in 7–14 days.',
  alternates: {
    canonical: 'https://viralaty.com',
  },
  openGraph: {
    title: 'Viralaty — ChatGPT Ads Agency | Done-For-You AI Ad Management',
    description: 'Done-for-you ChatGPT Ads agency. We engineer, deploy, and scale AI ad campaigns for DTC, SaaS, and high-ticket brands.',
    url: 'https://viralaty.com',
  },
};

export default function HomePage() {
  return (
    <div className="font-inter bg-white dark:bg-[#0a0a0a]">
      <div className="relative">
        <HeroSection />
        <div className="absolute top-0 left-0 right-0 z-40">
          <Navbar />
        </div>
      </div>

      <OpportunitySection />
      <ServicesSection />
      <HowItWorksSection />
      <AudienceSection />
      <ProcessSection />
      <CaseStudySection />
      <TrackRecordSection />
      <WhyUsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />

      <FloatingCTA />
    </div>
  );
}
