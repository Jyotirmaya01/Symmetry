import { describe, it, expect } from 'vitest';
import { servicesData } from '@/data/services';
import { faqs } from '@/components/FaqSection';

describe('Symmetry Services & Keyword Integrity', () => {
  it('loads core services with required metadata', () => {
    expect(servicesData.length).toBeGreaterThanOrEqual(8);
    servicesData.forEach((service) => {
      expect(service.id).toBeDefined();
      expect(service.title).toBeTruthy();
      expect(service.shortDesc).toBeTruthy();
      expect(service.tags.length).toBeGreaterThan(0);
    });
  });

  it('contains search-optimized FAQ queries and keywords', () => {
    expect(faqs.length).toBeGreaterThanOrEqual(6);
    faqs.forEach((faq) => {
      expect(faq.question).toBeTruthy();
      expect(faq.answer).toBeTruthy();
      expect(faq.keywords.length).toBeGreaterThan(0);
    });
  });
});
