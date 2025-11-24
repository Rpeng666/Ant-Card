import type { Metadata } from 'next';

interface ConstructMetadataOptions {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

export function constructMetadata(options: ConstructMetadataOptions = {}): Metadata {
  const {
    title = 'Ant Card | Markdown Card Generator | Create Stunning Md2Card Instantly',
    description = 'Ant Card is an intelligent Markdown card generator that converts text into beautiful Md2Cards. With multiple templates, platform-ready sizes, long text splitting.',
    canonicalUrl,
    keywords = ['Ant Card', 'Markdown card generator', 'Md2Card', 'card2 card', 'mdcard', 'xiaohongshu card maker'],
    image = '/og-image.png',
    noIndex = false,
  } = options;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}