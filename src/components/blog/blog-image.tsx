'use client';

import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useState } from 'react';

interface BlogImageProps {
  src: string;
  alt: string;
  title?: string;
}

export default function BlogImage({ src, alt, title }: BlogImageProps) {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="relative w-full h-full">
      {/* loading skeleton */}
      {imageLoading && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-b-none z-10" />
      )}

      {/* actual image */}
      <Image
        src={src}
        alt={alt}
        title={title || alt}
        className={`object-cover hover:scale-105 transition-transform duration-300 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        }`}
        fill
        onLoad={handleImageLoad}
      />
    </div>
  );
}
