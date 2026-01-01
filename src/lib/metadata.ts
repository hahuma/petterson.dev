import type { Metadata } from 'next';

const SITE_NAME = 'Petterson Firmino';
const DEFAULT_DESCRIPTION = 'Backend Software Engineer specializing in scalable systems, high-volume APIs, and payment integrations.';

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  noIndex?: boolean;
}

export function generateMetadata(options: GenerateMetadataOptions = {}): Metadata {
  const { title, description = DEFAULT_DESCRIPTION, noIndex = false } = options;

  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Backend Engineer`;

  return {
    title: fullTitle,
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
