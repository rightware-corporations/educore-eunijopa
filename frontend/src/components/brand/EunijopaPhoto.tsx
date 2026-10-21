import type { ImgHTMLAttributes } from 'react';

type EunijopaPhotoProps = ImgHTMLAttributes<HTMLImageElement>;

export function EunijopaPhoto(props: EunijopaPhotoProps) {
  return <img {...props} />;
}
