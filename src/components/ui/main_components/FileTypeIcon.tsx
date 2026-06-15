import { cn } from '@/lib/utils';

import FileTypeImgSrc  from '@/assets/icons/file-type/File type_IMG.svg';
import FileTypeJpgSrc  from '@/assets/icons/file-type/File type_JPG.svg';
import FileTypePngSrc  from '@/assets/icons/file-type/File type_PNG.svg';
import FileTypePdfSrc  from '@/assets/icons/file-type/File type_PDF.svg';
import FileTypeDocSrc  from '@/assets/icons/file-type/File type_DOC.svg';
import FileTypeCsvSrc  from '@/assets/icons/file-type/File type_CSV.svg';

export type FileTypeVariant = 'img' | 'jpg' | 'png' | 'pdf' | 'doc' | 'csv' | 'image-preview';

const FILE_TYPE_ASSETS: Record<Exclude<FileTypeVariant, 'image-preview'>, string> = {
  img: FileTypeImgSrc,
  jpg: FileTypeJpgSrc,
  png: FileTypePngSrc,
  pdf: FileTypePdfSrc,
  doc: FileTypeDocSrc,
  csv: FileTypeCsvSrc,
};

interface FileTypeIconProps {
  fileType?: FileTypeVariant;
  src?: string;
  className?: string;
}

export function FileTypeIcon({ fileType = 'img', src, className }: FileTypeIconProps) {
  if (fileType === 'image-preview') {
    return (
      <div className={cn('relative size-10 flex-shrink-0 border border-border-primary rounded-lg overflow-hidden', className)}>
        <img
          src={src}
          alt=""
          className="absolute inset-0 max-w-none size-full object-cover rounded-lg pointer-events-none"
        />
      </div>
    );
  }

  const fileTypeSrc = FILE_TYPE_ASSETS[fileType];

  return (
    <div className={cn('relative size-10 flex-shrink-0', className)}>
      <img src={fileTypeSrc} aria-hidden="true" className="absolute block inset-0 max-w-none size-full" />
    </div>
  );
}
