import React, { useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import Document    from '@tiptap/extension-document';
import Paragraph   from '@tiptap/extension-paragraph';
import Text        from '@tiptap/extension-text';
import Bold        from '@tiptap/extension-bold';
import Italic      from '@tiptap/extension-italic';
import Heading     from '@tiptap/extension-heading';
import Blockquote  from '@tiptap/extension-blockquote';
import Link        from '@tiptap/extension-link';
import BulletList  from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem    from '@tiptap/extension-list-item';
import Placeholder from '@tiptap/extension-placeholder';
import { cva }     from 'class-variance-authority';
import { cn }      from '@/lib/utils';
import { useResizeDrag }    from '@/hooks/useResizeDrag';
import { BoldIcon }         from '@/assets/icons/BoldIcon';
import { ItalicIcon }       from '@/assets/icons/ItalicIcon';
import { H1Icon }           from '@/assets/icons/H1Icon';
import { H2Icon }           from '@/assets/icons/H2Icon';
import { QuoteIcon }        from '@/assets/icons/QuoteIcon';
import { LinkIcon }         from '@/assets/icons/LinkIcon';
import { ListBulletIcon }   from '@/assets/icons/ListBulletIcon';
import { ListNumberIcon }   from '@/assets/icons/ListNumberIcon';
import { ResizeHandleIcon } from '@/assets/icons/ResizeHandleIcon';

export type RichTextEditorCornerRadius = '4px' | '8px' | '12px' | '16px';
export type RichTextEditorPadding     = '12px' | '14px' | '16px' | '20px';
export type RichTextEditorTextSize    = '12px' | '14px' | '16px';

const RADIUS_MAP: Record<RichTextEditorCornerRadius, string> = {
  '4px':  'rounded',
  '8px':  'rounded-lg',
  '12px': 'rounded-xl',
  '16px': 'rounded-2xl',
};

const PADDING_MAP: Record<RichTextEditorPadding, string> = {
  '12px': 'px-3',
  '14px': 'px-3.5',
  '16px': 'px-4',
  '20px': 'px-5',
};

const TEXT_SIZE_MAP: Record<RichTextEditorTextSize, string> = {
  '12px': 'text-xs leading-4',
  '14px': 'text-sm leading-4.5',
  '16px': 'text-base leading-5.5',
};

export interface RichTextEditorProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  focused?: boolean;
  cornerRadius?: RichTextEditorCornerRadius;
  padding?: RichTextEditorPadding;
  textSize?: RichTextEditorTextSize;
  value?: string;
  onChange?: (html: string) => void;
}

/* ── Container CVA ───────────────────────────────────────── */
const containerVariants = cva(
  'flex flex-col w-full border overflow-hidden relative bg-input-bg-primary transition-colors',
  {
    variants: {
      state: {
        default:  'border-input-border-enabled',
        focused:  'border-input-border-selected',
        error:    'border-input-border-critical',
        disabled: 'border-input-border-disabled bg-input-bg-disabled pointer-events-none',
      },
    },
    defaultVariants: { state: 'default' },
  },
);

type ContainerState = 'default' | 'focused' | 'error' | 'disabled';

/* ── RichTextEditor ──────────────────────────────────────── */
export function RichTextEditor({
  label,
  required = false,
  placeholder,
  helperText,
  errorText,
  disabled = false,
  focused: forceFocused = false,
  cornerRadius = '12px',
  padding = '12px',
  textSize = '14px',
  value,
  onChange,
}: RichTextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDragging, handleMouseDown, handleTouchStart } = useResizeDrag({
    containerRef,
    minHeight: 100,
    disabled,
  });

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Heading.configure({ levels: [1, 2] }),
      Blockquote,
      Link.configure({ openOnClick: false }),
      BulletList,
      OrderedList,
      ListItem,
      Placeholder.configure({ placeholder: placeholder ?? '' }),
    ],
    content: value ?? '',
    editable: !disabled,
    onUpdate: ({ editor: e }) => {
      onChange?.(e.getHTML());
    },
  });

  const isFocused = forceFocused || (editor?.isFocused ?? false);

  let containerState: ContainerState = 'default';
  if (disabled)       containerState = 'disabled';
  else if (errorText) containerState = 'error';
  else if (isFocused) containerState = 'focused';

  function handleLink() {
    if (!editor) return;
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
    } else {
      const url = window.prompt('URL');
      if (url) editor.chain().focus().setLink({ href: url }).run();
    }
  }

  const toolbarButtons = [
    { label: 'Bold',         icon: <BoldIcon />,       active: editor?.isActive('bold'),                     action: () => editor?.chain().focus().toggleBold().run() },
    { label: 'Italic',       icon: <ItalicIcon />,     active: editor?.isActive('italic'),                   action: () => editor?.chain().focus().toggleItalic().run() },
    { label: 'H1',           icon: <H1Icon />,         active: editor?.isActive('heading', { level: 1 }),    action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run() },
    { label: 'H2',           icon: <H2Icon />,         active: editor?.isActive('heading', { level: 2 }),    action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: 'Quote',        icon: <QuoteIcon />,      active: editor?.isActive('blockquote'),               action: () => editor?.chain().focus().toggleBlockquote().run() },
    { label: 'Link',         icon: <LinkIcon />,       active: editor?.isActive('link'),                     action: handleLink },
    { label: 'List Bullet',  icon: <ListBulletIcon />, active: editor?.isActive('bulletList'),               action: () => editor?.chain().focus().toggleBulletList().run() },
    { label: 'List Numbers', icon: <ListNumberIcon />, active: editor?.isActive('orderedList'),              action: () => editor?.chain().focus().toggleOrderedList().run() },
  ];

  return (
    <div className="flex flex-col gap-1 w-full font-inter">
      {/* Label */}
      {label && (
        <div className="flex items-center gap-0.5">
          <span className="text-xs font-medium leading-4 text-input-text-label">{label}</span>
          {required && <span className="text-xs font-medium leading-4 text-input-text-critical">*</span>}
        </div>
      )}

      {/* Editor Container */}
      <div
        ref={containerRef}
        className={cn(
          containerVariants({ state: containerState }),
          RADIUS_MAP[cornerRadius],
          isDragging && 'ring-1 ring-input-border-selected',
        )}
      >
        {/* Toolbar */}
        <div className={cn(
          'flex items-center px-2 py-1 gap-1 w-full shrink-0 border-b border-input-border-enabled',
          disabled && 'opacity-50 pointer-events-none',
        )}>
          {toolbarButtons.map(btn => (
            <button
              key={btn.label}
              type="button"
              aria-label={btn.label}
              aria-pressed={btn.active ?? false}
              onClick={btn.action}
              className={cn(
                'size-6 rounded-[4.5px] flex items-center justify-center shrink-0 transition-colors',
                btn.active ? 'bg-bg-secondary' : '',
              )}
            >
              {React.cloneElement(btn.icon as React.ReactElement<{ className?: string }>, {
                className: cn('size-4', btn.active ? 'text-icon-primary' : 'text-icon-secondary'),
              })}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className={cn('flex-1 min-h-0 py-2 relative', PADDING_MAP[padding])}>
          <EditorContent
            editor={editor}
            className={cn(
              textSize === '12px' ? '[&_.ProseMirror]:text-xs'  : textSize === '16px' ? '[&_.ProseMirror]:text-base'  : '[&_.ProseMirror]:text-sm',
              '[&_.ProseMirror]:font-medium',
              textSize === '12px' ? '[&_.ProseMirror]:leading-4' : textSize === '16px' ? '[&_.ProseMirror]:leading-5.5' : '[&_.ProseMirror]:leading-4.5',
              '[&_.ProseMirror]:text-input-text-enabled',
              '[&_.ProseMirror]:outline-none',
              '[&_.ProseMirror]:min-h-25',
              '[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-input-text-placeholder',
              '[&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]',
              '[&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none',
              '[&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left',
              '[&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0',
            )}
          />
        </div>

        {/* Resize Handle */}
        <div
          className={cn(
            'absolute bottom-[3px] right-[3px] size-4 cursor-se-resize',
            disabled && 'cursor-default',
          )}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <ResizeHandleIcon
            aria-hidden="true"
            className={cn('size-4 text-input-text-label', disabled && 'opacity-40')}
          />
        </div>
      </div>

      {/* Helper / Error Text */}
      {(errorText || helperText) && (
        <span className={cn(
          'text-xs font-medium leading-4',
          errorText ? 'text-input-text-critical' : 'text-input-text-helper',
        )}>
          {errorText ?? helperText}
        </span>
      )}
    </div>
  );
}
