import React from 'react';
import { cn } from '@/lib/utils';

import PageImgSrc  from '@/assets/icons/file-type/PageImg.svg';
import PageJpgSrc  from '@/assets/icons/file-type/PageJpg.svg';
import PagePngSrc  from '@/assets/icons/file-type/PagePng.svg';
import PagePdfSrc  from '@/assets/icons/file-type/PagePdf.svg';
import PageDocSrc  from '@/assets/icons/file-type/PageDoc.svg';
import PageCsvSrc  from '@/assets/icons/file-type/PageCsv.svg';

import LabelImgSrc  from '@/assets/icons/file-type/LabelImg.svg';
import LabelJpgSrc  from '@/assets/icons/file-type/LabelJpg.svg';
import LabelPngSrc  from '@/assets/icons/file-type/LabelPng.svg';
import LabelPdfSrc  from '@/assets/icons/file-type/LabelPdf.svg';
import LabelDocSrc  from '@/assets/icons/file-type/LabelDoc.svg';
import LabelCsvSrc  from '@/assets/icons/file-type/LabelCsv.svg';

export type FileTypeVariant = 'img' | 'jpg' | 'png' | 'pdf' | 'doc' | 'csv' | 'image-preview';

const PAGE_ASSETS: Record<Exclude<FileTypeVariant, 'image-preview'>, string> = {
  img: PageImgSrc,
  jpg: PageJpgSrc,
  png: PagePngSrc,
  pdf: PagePdfSrc,
  doc: PageDocSrc,
  csv: PageCsvSrc,
};

const LABEL_ASSETS: Record<Exclude<FileTypeVariant, 'image-preview'>, string> = {
  img: LabelImgSrc,
  jpg: LabelJpgSrc,
  png: LabelPngSrc,
  pdf: LabelPdfSrc,
  doc: LabelDocSrc,
  csv: LabelCsvSrc,
};

const LABEL_INSETS: Record<Exclude<FileTypeVariant, 'image-preview'>, string> = {
  img: 'inset-[63.41%_29.17%_19.78%_29.42%]',
  jpg: 'inset-[63.41%_28.92%_19.78%_28.27%]',
  png: 'inset-[63.41%_27.06%_19.78%_27.31%]',
  pdf: 'inset-[63.64%_28.86%_20%_29.37%]',
  doc: 'inset-[63.41%_25.61%_19.78%_25.98%]',
  csv: 'inset-[63.41%_26.3%_19.77%_26.89%]',
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

  const pageSrc  = PAGE_ASSETS[fileType];
  const labelSrc = LABEL_ASSETS[fileType];
  const labelInset = LABEL_INSETS[fileType];

  return (
    <div className={cn('relative size-10 flex-shrink-0', className)}>
      <div className="absolute inset-[0_10%]">
        <img src={pageSrc} aria-hidden="true" className="absolute block inset-0 max-w-none size-full" />
      </div>
      <div className={cn('absolute', labelInset)}>
        <img src={labelSrc} aria-hidden="true" className="absolute block inset-0 max-w-none size-full" />
      </div>
    </div>
  );
}
