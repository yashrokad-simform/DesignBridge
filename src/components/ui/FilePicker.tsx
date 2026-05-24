import React, { useRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { DocumentUploadIcon } from '@/assets/icons/DocumentUploadIcon';
import { DocumentUploadDisabledIcon } from '@/assets/icons/DocumentUploadDisabledIcon';

export type FilePickerState = 'enabled' | 'drag-file' | 'disabled';

const filePickerVariants = cva(
  'flex flex-col items-center p-3 rounded-xl bg-bg-white w-full',
  {
    variants: {
      state: {
        'enabled':   'border border-border-gray-light',
        'drag-file': 'border-2 border-border-brand',
        'disabled':  'border border-btn-border-disabled pointer-events-none',
      },
    },
    defaultVariants: { state: 'enabled' },
  },
);

interface FilePickerProps extends VariantProps<typeof filePickerVariants> {
  acceptedTypes?: string;
  maxSize?: string;
  onFileSelect?: (files: FileList) => void;
  className?: string;
}

export function FilePicker({
  state: stateProp = 'enabled',
  acceptedTypes = 'PDF, DOC, XLS or PPT',
  maxSize = '20MB',
  onFileSelect,
  className,
}: FilePickerProps) {
  const [internalState, setInternalState] = useState<FilePickerState>(stateProp ?? 'enabled');
  const inputRef = useRef<HTMLInputElement>(null);
  const isDisabled = stateProp === 'disabled';
  const activeState = isDisabled ? 'disabled' : internalState;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDisabled) setInternalState('drag-file');
  };
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDisabled) setInternalState('drag-file');
  };
  const handleDragLeave = () => {
    if (!isDisabled) setInternalState('enabled');
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDisabled) {
      setInternalState('enabled');
      if (e.dataTransfer.files.length > 0) onFileSelect?.(e.dataTransfer.files);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) onFileSelect?.(e.target.files);
  };

  const iconBgBorder = isDisabled
    ? 'bg-bg-gray-light border-border-gray-light'
    : 'bg-bg-primary border-border-brand';

  const linkColor =
    activeState === 'enabled'   ? 'text-btn-text-secondary' :
    activeState === 'drag-file' ? 'text-btn-text-secondary-focused' :
                                  'text-btn-text-secondary-disabled';

  const supportColor = isDisabled ? 'text-text-gray-light' : 'text-text-secondary';

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        className={cn(filePickerVariants({ state: activeState }), className)}
        aria-disabled={isDisabled}
      >
        <div className="flex flex-col items-center gap-3 w-full">
          <div className={cn('flex items-center justify-center size-6 rounded-full border flex-shrink-0', iconBgBorder)}>
            {isDisabled
              ? <DocumentUploadDisabledIcon className="size-3 text-icon-gray-light" aria-hidden="true" />
              : <DocumentUploadIcon className="size-3 text-icon-brand" aria-hidden="true" />
            }
          </div>

          <div className="flex flex-col items-center gap-1 w-full">
            <div className="flex items-center justify-center gap-1 w-full">
              <button
                type="button"
                className={cn('flex items-center justify-center h-4 text-xs font-medium leading-4 whitespace-nowrap', linkColor)}
                onClick={() => !isDisabled && inputRef.current?.click()}
                tabIndex={isDisabled ? -1 : 0}
              >
                Click to Upload
              </button>
              <span className={cn('text-xs font-normal leading-4 whitespace-nowrap', supportColor)}>
                or drag and drop
              </span>
            </div>

            <span className={cn('text-xs font-normal leading-4 text-center w-full', supportColor)}>
              {acceptedTypes} (max. {maxSize})
            </span>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          aria-label="Upload file"
          disabled={isDisabled}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
