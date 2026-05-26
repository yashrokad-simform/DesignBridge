import React, { useId } from 'react';
import {
  useFloating,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  flip,
  shift,
  FloatingPortal,
} from '@floating-ui/react';
import { cn } from '@/lib/utils';
import { CloseIcon } from '@/assets/icons/CloseIcon';

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right';

export interface TooltipProps {
  heading?: string;
  caption?: string;
  showClose?: boolean;
  placement?: TooltipPlacement;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}

/* ── Arrow ─────────────────────────────────────────────── */

function Arrow({ placement }: { placement: TooltipPlacement }) {
  const isVertical = placement.startsWith('top') || placement.startsWith('bottom');

  const containerCls = isVertical
    ? cn(
        'flex h-[5px] w-full overflow-hidden shrink-0',
        placement === 'top'         && 'items-end justify-center',
        placement === 'top-start'   && 'items-end justify-start px-6',
        placement === 'top-end'     && 'items-end justify-end px-6',
        placement === 'bottom'      && 'items-start justify-center',
        placement === 'bottom-start'&& 'items-start justify-start px-6',
        placement === 'bottom-end'  && 'items-start justify-end px-6',
      )
    : cn(
        'flex w-[5px] overflow-hidden shrink-0 self-stretch',
        placement === 'left'  && 'items-center justify-end',
        placement === 'right' && 'items-center justify-start',
      );

  const beakCls = cn(
    'size-[8px] bg-bg-black shrink-0',
    (placement.startsWith('top'))    && 'rounded-br-[2px]',
    (placement.startsWith('bottom')) && 'rounded-tl-[2px]',
    placement === 'left'  && 'rounded-tr-[2px]',
    placement === 'right' && 'rounded-bl-[2px]',
  );

  return (
    <div className={containerCls}>
      <div className="flex items-center justify-center size-[11.314px] shrink-0">
        <div className="rotate-45">
          <div className={beakCls} />
        </div>
      </div>
    </div>
  );
}

/* ── Tooltip ───────────────────────────────────────────── */

export function Tooltip({
  heading,
  caption,
  showClose = false,
  placement = 'top',
  onClose,
  children,
  className,
}: TooltipProps) {
  if (!heading && !caption) return <>{children}</>;

  const [open, setOpen] = React.useState(false);
  const tooltipId = useId();

  const { refs, floatingStyles, context } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [offset(8), flip(), shift()],
  });

  const hover = useHover(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const isVertical = placement.startsWith('top') || placement.startsWith('bottom');

  const rootCls = cn(
    'flex drop-shadow-[0px_0px_10px_rgba(153,153,153,0.15)] max-w-[200px] font-inter',
    isVertical ? 'flex-col' : 'flex-row items-center',
    className,
  );

  const arrowBefore = placement.startsWith('bottom') || placement === 'right';

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      <span
        ref={refs.setReference}
        aria-describedby={tooltipId}
        {...getReferenceProps()}
      >
        {children}
      </span>

      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            id={tooltipId}
            role="tooltip"
            style={floatingStyles}
            className={rootCls}
            {...getFloatingProps()}
          >
            {arrowBefore && <Arrow placement={placement} />}

            <div className="bg-bg-black rounded-xl p-3 flex flex-col gap-0 items-start w-full">
              <div className="flex flex-row gap-2 items-start w-full">
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  {heading && (
                    <span className="text-sm font-medium leading-4.5 text-text-white w-full">
                      {heading}
                    </span>
                  )}
                  {caption && (
                    <span className="text-xs font-normal leading-5 text-text-white w-full">
                      {caption}
                    </span>
                  )}
                </div>

                {showClose && (
                  <button
                    type="button"
                    aria-label="Close tooltip"
                    onClick={handleClose}
                    className="flex items-start bg-transparent border-0 p-0 flex-shrink-0"
                  >
                    <CloseIcon aria-hidden="true" className="size-4 text-icon-gray-light" />
                  </button>
                )}
              </div>
            </div>

            {!arrowBefore && <Arrow placement={placement} />}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
