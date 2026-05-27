import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { FileTypeIcon, type FileTypeVariant } from './FileTypeIcon';
import { DocumentDownloadIcon } from '@/assets/icons/DocumentDownloadIcon';
import { TrashIcon } from '@/assets/icons/TrashIcon';

export type DocumentTileState = 'view' | 'uploading' | 'uploaded';

const containerVariants = cva(
  'flex gap-3 p-3 rounded-xl w-full bg-bg-primary border border-border-primary font-inter',
  {
    variants: {
      state: {
        view:      'h-16 items-center',
        uploaded:  'h-16 items-center',
        uploading: 'items-start',
      },
    },
    defaultVariants: { state: 'view' },
  },
);

interface DocumentTileProps extends VariantProps<typeof containerVariants> {
  fileName: string;
  fileSize: string;
  fileType?: FileTypeVariant;
  uploadDate?: string;
  showDate?: boolean;
  progress?: number;
  onView?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function DocumentTile({
  state = 'view',
  fileName,
  fileSize,
  fileType = 'pdf',
  uploadDate,
  showDate = true,
  progress = 0,
  onView,
  onDownload,
  onDelete,
  className,
}: DocumentTileProps) {
  const textBlock = (
    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
      <span className="text-sm font-medium leading-[18px] text-text-primary truncate w-full">
        {fileName}
      </span>
      <div className="flex items-center gap-2 w-full flex-shrink-0">
        <span className="text-xs font-medium leading-4 text-text-secondary truncate">
          {fileSize}
        </span>
        {showDate && uploadDate && (
          <>
            <span
              aria-hidden="true"
              className="size-1 flex-shrink-0 rounded-full bg-text-secondary"
            />
            <span className="text-xs font-medium leading-4 text-text-secondary truncate">
              {uploadDate}
            </span>
          </>
        )}
      </div>
    </div>
  );

  if (state === 'uploading') {
    return (
      <div className={cn(containerVariants({ state }), className)}>
        <FileTypeIcon fileType={fileType} className="size-10 flex-shrink-0" />
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              <span className="text-sm font-medium leading-[18px] text-text-primary truncate w-full">
                {fileName}
              </span>
              <div className="flex items-center gap-2 w-full flex-shrink-0">
                <span className="text-xs font-medium leading-4 text-text-secondary truncate">
                  {fileSize}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onDelete}
              className="h-9 p-2.5 rounded-xl bg-btn-bg-bordered border border-border-primary flex-shrink-0 flex items-center justify-center"
              aria-label="Delete file"
            >
              <TrashIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 min-w-0 h-2 relative rounded-full">
              <div className="absolute inset-0 rounded-full bg-bg-brand-light" />
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-bg-brand"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-medium leading-4 text-text-primary whitespace-nowrap flex-shrink-0">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(containerVariants({ state }), className)}>
      <FileTypeIcon fileType={fileType} className="size-10 flex-shrink-0" />
      {textBlock}
      <div className="flex items-center gap-2 flex-shrink-0">
        {(state === 'view' || state === 'uploaded') && onView && (
          <button
            type="button"
            onClick={onView}
            className="h-9 px-4 py-2.5 rounded-xl bg-btn-bg-bordered border border-btn-border-primary text-xs font-medium leading-4 text-btn-text-bordered"
          >
            View
          </button>
        )}
        {state === 'view' && (
          <button
            type="button"
            onClick={onDownload}
            className="h-9 p-2.5 rounded-xl bg-btn-bg-bordered border border-border-primary flex items-center justify-center"
            aria-label="Download file"
          >
            <DocumentDownloadIcon className="size-4" aria-hidden="true" />
          </button>
        )}
        {state === 'uploaded' && (
          <button
            type="button"
            onClick={onDelete}
            className="h-9 p-2.5 rounded-xl bg-btn-bg-bordered border border-border-primary flex items-center justify-center"
            aria-label="Delete file"
          >
            <TrashIcon className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
