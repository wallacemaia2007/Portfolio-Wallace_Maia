export const CLOUDINARY_CLOUD_NAME = 'gnazw8x5';

const VIDEO_PUBLIC_IDS: Record<string, string> = {
  'schulles-gastronomia-erp': 'videos/schulles-gastronomia-erp',
  'instituto-motiro': 'videos/instituto-motiro',
  'banda-aurah-portfolio': 'videos/banda-aurah-portfolio',
  'personal-portfolio': 'videos/personal-portfolio',
  'digital-bank-api': 'videos/digital-bank-api',
  'traveler-website': 'videos/traveler-website',
  'customer-register': 'videos/customer-register',
  'portfolio-marcio-carvalho': 'videos/portfolio-marcio-carvalho',
};

function buildVideoUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/q_auto/${publicId}.mp4`;
}

export const VIDEOS: Record<string, string> = Object.fromEntries(
  Object.entries(VIDEO_PUBLIC_IDS).map(([slug, publicId]) => [
    slug,
    buildVideoUrl(publicId),
  ]),
);

export function getVideoUrl(
  project: { slug: string; thumbVideo?: string } | null | undefined,
): string {
  if (!project) return '';
  if (
    project.thumbVideo &&
    !project.thumbVideo.includes('SEU_CLOUD_NAME') &&
    /^https?:/i.test(project.thumbVideo)
  ) {
    return project.thumbVideo;
  }
  return VIDEOS[project.slug] || '';
}
