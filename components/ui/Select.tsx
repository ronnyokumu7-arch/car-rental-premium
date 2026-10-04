'use client';

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useId,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/* ─────────────────────────────────────────────────────────────
   SELECT
   Accessible, brandable replacement for native <select>.

   Two rendering modes:
     • Desktop (≥640px): floating menu anchored to the trigger
     • Mobile  (<640px): bottom sheet, slide-up, drag handle

   Features:
     • Keyboard: Arrows, Enter, Space, Escape, Home, End, type-ahead
     • ARIA: role="listbox", aria-expanded, aria-selected
     • Grouped options (optional)
     • Fee hints render as copper pills; descriptive hints render
       as plain muted text
     • Portal-rendered — escapes parent stacking contexts
     • Controlled: parent owns `value`, we emit `onChange`
   ───────────────────────────────────────────────────────────── */

export interface SelectOption {
  value: string;
  label: string;
  /** Right-aligned secondary text (fee, description, etc.) */
  hint?: string;
  /** How to render the hint. Auto-detects fee patterns if omitted. */
  hintStyle?: 'fee' | 'text';
  disabled?: boolean;
}

export interface SelectGroup {
  /** Group label shown above its options */
  label: string;
  options: SelectOption[];
}

interface SelectProps {
  /** Form field name — hidden input carries this */
  name: string;
  value: string;
  onChange: (value: string) => void;
  /** Flat options. Ignored if `groups` is provided. */
  options?: SelectOption[];
  /** Grouped options. Takes precedence over `options` when provided. */
  groups?: SelectGroup[];
  /** Text shown when value is empty */
  placeholder?: string;
  /** Classes applied to the trigger button */
  className?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  /** Accessible label (only if no visible <label htmlFor> exists) */
  ariaLabel?: string;
  /** Title shown in the mobile sheet header */
  sheetTitle?: string;
}

/* ── Fee detection — KES 1,500, + KES 2,500, Free, etc. ── */
function isFeeHint(hint: string): boolean {
  const t = hint.trim().toLowerCase();
  if (t === 'free') return true;
  if (t === 'quote' || t.includes('quote')) return true;
  return /kes\s*[\d,]+/.test(t) || /^\+/.test(hint.trim());
}

export function Select({
  name,
  value,
  onChange,
  options,
  groups,
  placeholder = 'Select…',
  className = '',
  disabled = false,
  required = false,
  id,
  ariaLabel,
  sheetTitle,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [justChanged, setJustChanged] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const typeaheadRef = useRef<{ buffer: string; timer: number | null }>({
    buffer: '',
    timer: null,
  });

  const listboxId = useId();

  /* ── Flatten groups (or use flat options) for internal navigation ── */
  const flatOptions: SelectOption[] = useMemo(() => {
    if (groups && groups.length > 0) {
      return groups.flatMap((g) => g.options);
    }
    return options ?? [];
  }, [groups, options]);

  const selected = useMemo(
    () => flatOptions.find((o) => o.value === value) ?? null,
    [flatOptions, value]
  );

  /* ── Detect mobile ── */
  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia('(max-width: 639px)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Open / close ── */
  const openMenu = useCallback(() => {
    if (disabled) return;
    setOpen(true);
    const idx = flatOptions.findIndex((o) => o.value === value);
    setActiveIndex(idx >= 0 ? idx : 0);
  }, [disabled, flatOptions, value]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
    triggerRef.current?.focus();
  }, []);

  /* ── Commit — with a brief copper pulse on the trigger ── */
  const commit = useCallback(
    (newValue: string) => {
      onChange(newValue);
      setOpen(false);
      setActiveIndex(-1);
      setJustChanged(true);
      window.setTimeout(() => setJustChanged(false), 500);
      triggerRef.current?.focus();
    },
    [onChange]
  );

  /* ── Click outside closes ── */
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () =>
      document.removeEventListener('pointerdown', onPointerDown);
  }, [open, closeMenu]);

  /* ── Lock body scroll while mobile sheet is open ── */
  useEffect(() => {
    if (!open || !isMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, isMobile]);

  /* ── Scroll active option into view ── */
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`
    );
    el?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  /* ── Type-ahead ── */
  const handleTypeahead = (char: string) => {
    const ta = typeaheadRef.current;
    ta.buffer += char.toLowerCase();

    if (ta.timer) window.clearTimeout(ta.timer);
    ta.timer = window.setTimeout(() => {
      ta.buffer = '';
      ta.timer = null;
    }, 500);

    const match = flatOptions.findIndex(
      (o) => !o.disabled && o.label.toLowerCase().startsWith(ta.buffer)
    );
    if (match >= 0) {
      if (open) {
        setActiveIndex(match);
      } else {
        commit(flatOptions[match].value);
      }
    }
  };

  /* ── Keyboard handling ── */
  const onTriggerKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();
        if (!open) {
          openMenu();
        } else {
          setActiveIndex((prev) => {
            const dir = e.key === 'ArrowDown' ? 1 : -1;
            return clampIndex(prev + dir, flatOptions);
          });
        }
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!open) {
          openMenu();
        } else if (
          activeIndex >= 0 &&
          !flatOptions[activeIndex]?.disabled
        ) {
          commit(flatOptions[activeIndex].value);
        }
        break;

      case 'Escape':
        if (open) {
          e.preventDefault();
          closeMenu();
        }
        break;

      case 'Home':
        if (open) {
          e.preventDefault();
          setActiveIndex(nextEnabledIndex(0, 1, flatOptions));
        }
        break;

      case 'End':
        if (open) {
          e.preventDefault();
          setActiveIndex(
            nextEnabledIndex(flatOptions.length - 1, -1, flatOptions)
          );
        }
        break;

      case 'Tab':
        if (open) closeMenu();
        break;

      default:
        if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
          handleTypeahead(e.key);
        }
    }
  };

  return (
    <>
      {/* ═══════════ HIDDEN FORM INPUT ═══════════ */}
      <input type="hidden" name={name} value={value} required={required} />

      {/* ═══════════ TRIGGER ═══════════ */}
      <button
        ref={triggerRef}
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={onTriggerKeyDown}
        className={`
          booking-input
          group
          flex items-center justify-between gap-2
          text-left
          cursor-pointer
          transition-all duration-300 ease-lux
          disabled:cursor-not-allowed disabled:opacity-60
          ${
            open
              ? 'border-copper-500 ring-4 ring-copper-500/15'
              : 'hover:border-border-strong'
          }
          ${justChanged ? 'border-copper-500' : ''}
          ${className}
        `}
      >
        {/* Leading copper dot when value is set */}
        {selected && (
          <span
            aria-hidden="true"
            className={`
              shrink-0 w-1.5 h-1.5 rounded-full bg-copper-500
              transition-all duration-300 ease-lux
              ${justChanged ? 'scale-150' : 'scale-100'}
            `}
          />
        )}

        <span
          className={`
            flex-1 min-w-0 truncate transition-colors duration-300
            ${selected ? 'text-ink' : 'text-ink-subtle'}
          `}
        >
          {selected ? selected.label : placeholder}
        </span>

        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`
            shrink-0 transition-all duration-300 ease-lux
            ${
              open
                ? 'rotate-180 text-copper-600'
                : 'text-ink-subtle group-hover:text-ink-muted'
            }
          `}
          aria-hidden="true"
        />
      </button>

      {/* ═══════════ MENU / SHEET ═══════════ */}
      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open &&
              (isMobile ? (
                <MobileSheet
                  listboxId={listboxId}
                  menuRef={menuRef}
                  listRef={listRef}
                  flatOptions={flatOptions}
                  groups={groups}
                  value={value}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  onCommit={commit}
                  onClose={closeMenu}
                  title={sheetTitle ?? placeholder}
                />
              ) : (
                <DesktopMenu
                  listboxId={listboxId}
                  triggerRef={triggerRef}
                  menuRef={menuRef}
                  listRef={listRef}
                  flatOptions={flatOptions}
                  groups={groups}
                  value={value}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  onCommit={commit}
                />
              ))}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   DESKTOP MENU
   ───────────────────────────────────────────────────────────── */
function DesktopMenu({
  listboxId,
  triggerRef,
  menuRef,
  listRef,
  flatOptions,
  groups,
  value,
  activeIndex,
  setActiveIndex,
  onCommit,
}: {
  listboxId: string;
  triggerRef: React.RefObject<HTMLButtonElement>;
  menuRef: React.RefObject<HTMLDivElement>;
  listRef: React.RefObject<HTMLDivElement>;
  flatOptions: SelectOption[];
  groups?: SelectGroup[];
  value: string;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  onCommit: (v: string) => void;
}) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    const update = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPosition({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [triggerRef]);

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: -8, scaleY: 0.94 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      exit={{ opacity: 0, y: -6, scaleY: 0.96 }}
      transition={{
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        width: position.width,
        transformOrigin: 'top',
      }}
      className="
        z-[200]
        bg-surface
        border border-border
        rounded-xl
        overflow-hidden
        shadow-[0_12px_32px_rgba(14,14,16,0.12),0_32px_64px_rgba(14,14,16,0.14)]
      "
    >
      {/* Copper top hairline — brand signature */}
      <div
        aria-hidden="true"
        className="h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent"
      />

      <OptionList
        listboxId={listboxId}
        listRef={listRef}
        flatOptions={flatOptions}
        groups={groups}
        value={value}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        onCommit={onCommit}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MOBILE SHEET
   ───────────────────────────────────────────────────────────── */
function MobileSheet({
  listboxId,
  menuRef,
  listRef,
  flatOptions,
  groups,
  value,
  activeIndex,
  setActiveIndex,
  onCommit,
  onClose,
  title,
}: {
  listboxId: string;
  menuRef: React.RefObject<HTMLDivElement>;
  listRef: React.RefObject<HTMLDivElement>;
  flatOptions: SelectOption[];
  groups?: SelectGroup[];
  value: string;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  onCommit: (v: string) => void;
  onClose: () => void;
  title?: string;
}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-[199] bg-obsidian-950/60 backdrop-blur-sm"
      />

      {/* Sheet */}
      <motion.div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
        className="
          fixed left-0 right-0 bottom-0 z-[200]
          bg-surface rounded-t-2xl
          max-h-[82vh]
          flex flex-col
          shadow-[0_-8px_40px_rgba(14,14,16,0.20)]
        "
      >
        {/* Copper top hairline */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent"
        />

        {/* Header — drag handle + title + close */}
        <div className="shrink-0 pt-3 pb-4 px-5 border-b border-border">
          <div className="flex justify-center mb-3">
            <span
              aria-hidden="true"
              className="w-10 h-1 rounded-full bg-border-strong"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-subtle truncate">
              {title}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 -mr-2 w-9 h-9 flex items-center justify-center text-ink-subtle hover:text-ink transition-colors duration-200"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Scrollable options */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <OptionList
            listboxId={listboxId}
            listRef={listRef}
            flatOptions={flatOptions}
            groups={groups}
            value={value}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onCommit={onCommit}
            mobile
          />
        </div>
      </motion.div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   OPTION LIST
   Renders either flat options or grouped options.
   Index maps to `flatOptions` position for keyboard nav.
   ───────────────────────────────────────────────────────────── */
function OptionList({
  listboxId,
  listRef,
  flatOptions,
  groups,
  value,
  activeIndex,
  setActiveIndex,
  onCommit,
  mobile = false,
}: {
  listboxId: string;
  listRef: React.RefObject<HTMLDivElement>;
  flatOptions: SelectOption[];
  groups?: SelectGroup[];
  value: string;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  onCommit: (v: string) => void;
  mobile?: boolean;
}) {
  /* Build the render list — either grouped or flat */
  const renderGroups: SelectGroup[] | null =
    groups && groups.length > 0
      ? groups
      : null;

  /* Track the running index across all rendered options */
  let runningIndex = 0;

  return (
    <div
      ref={listRef}
      id={listboxId}
      role="listbox"
      className={`
        py-2
        max-h-[320px] overflow-y-auto scrollbar-hide
        ${mobile ? 'pb-8' : ''}
      `}
    >
      {renderGroups ? (
        renderGroups.map((group, gIdx) => (
          <div key={group.label}>
            {/* Group label */}
            <div
              className={`
                px-4 pt-3 pb-2
                text-[10px] font-semibold uppercase tracking-[0.22em]
                text-copper-600
                ${gIdx > 0 ? 'mt-1' : ''}
              `}
            >
              {group.label}
            </div>

            {/* Group options */}
            {group.options.map((opt) => {
              const myIndex = runningIndex++;
              return (
                <OptionItem
                  key={opt.value}
                  opt={opt}
                  index={myIndex}
                  isSelected={opt.value === value}
                  isActive={myIndex === activeIndex}
                  onSelect={onCommit}
                  onHover={setActiveIndex}
                  mobile={mobile}
                />
              );
            })}
          </div>
        ))
      ) : (
        flatOptions.map((opt, i) => (
          <OptionItem
            key={opt.value}
            opt={opt}
            index={i}
            isSelected={opt.value === value}
            isActive={i === activeIndex}
            onSelect={onCommit}
            onHover={setActiveIndex}
            mobile={mobile}
          />
        ))
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   OPTION ITEM
   One row in the list.
   ───────────────────────────────────────────────────────────── */
function OptionItem({
  opt,
  index,
  isSelected,
  isActive,
  onSelect,
  onHover,
  mobile = false,
}: {
  opt: SelectOption;
  index: number;
  isSelected: boolean;
  isActive: boolean;
  onSelect: (v: string) => void;
  onHover: (i: number) => void;
  mobile?: boolean;
}) {
  /* Auto-detect hint style if not explicitly set */
  const hintStyle: 'fee' | 'text' =
    opt.hintStyle ?? (opt.hint && isFeeHint(opt.hint) ? 'fee' : 'text');

  const showCheck = isSelected;

  return (
    <div
      role="option"
      aria-selected={isSelected}
      aria-disabled={opt.disabled || undefined}
      data-index={index}
      onMouseEnter={() => !opt.disabled && onHover(index)}
      onClick={() => !opt.disabled && onSelect(opt.value)}
      className={`
        group/opt
        flex items-center gap-3
        px-4 mx-1
        ${mobile ? 'py-4' : 'py-2.5'}
        rounded-lg
        text-sm
        cursor-pointer
        transition-all duration-200 ease-lux
        ${
          opt.disabled
            ? 'opacity-40 cursor-not-allowed'
            : ''
        }
        ${
          isActive && !opt.disabled
            ? 'bg-copper-500/[0.08]'
            : isSelected
              ? 'bg-surface-sunken'
              : 'hover:bg-surface-sunken'
        }
      `}
    >
      {/* Label + hint */}
      <div className="flex-1 min-w-0">
        {mobile ? (
          /* Mobile: hint below the label — better readability */
          <>
            <div
              className={`
                truncate transition-colors duration-200
                ${isSelected ? 'text-ink font-medium' : 'text-ink-muted'}
              `}
            >
              {opt.label}
            </div>
            {opt.hint && (
              <div className="mt-1">
                <HintBadge hint={opt.hint} style={hintStyle} small />
              </div>
            )}
          </>
        ) : (
          /* Desktop: hint right-aligned on the same row */
          <div className="flex items-center justify-between gap-3">
            <span
              className={`
                truncate transition-colors duration-200
                ${isSelected ? 'text-ink font-medium' : 'text-ink-muted'}
              `}
            >
              {opt.label}
            </span>
            {opt.hint && <HintBadge hint={opt.hint} style={hintStyle} />}
          </div>
        )}
      </div>

      {/* Selected indicator */}
      <span
        className={`
          shrink-0 flex items-center justify-center
          transition-all duration-300 ease-lux
          ${showCheck ? 'w-5 opacity-100' : 'w-5 opacity-0'}
        `}
        aria-hidden="true"
      >
        <Check
          size={16}
          strokeWidth={2.5}
          className="text-copper-500"
        />
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HINT BADGE
   Fee → copper-tinted pill. Text → plain muted.
   ───────────────────────────────────────────────────────────── */
function HintBadge({
  hint,
  style,
  small = false,
}: {
  hint: string;
  style: 'fee' | 'text';
  small?: boolean;
}) {
  if (style === 'fee') {
    return (
      <span
        className={`
          inline-flex items-center
          ${small ? 'text-[10px] px-2 py-0.5' : 'text-[10px] px-2 py-0.5'}
          font-semibold tracking-wide
          rounded-full
          bg-copper-500/[0.10]
          border border-copper-500/25
          text-copper-700
          whitespace-nowrap
          tabular-nums
        `}
      >
        {hint}
      </span>
    );
  }

  return (
    <span
      className={`
        ${small ? 'text-[11px]' : 'text-[11px]'}
        text-ink-subtle
        whitespace-nowrap
        tabular-nums
      `}
    >
      {hint}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────── */

function clampIndex(i: number, options: SelectOption[]): number {
  if (i < 0) {
    return nextEnabledIndex(options.length - 1, -1, options);
  }
  if (i >= options.length) {
    return nextEnabledIndex(0, 1, options);
  }
  if (options[i]?.disabled) {
    return nextEnabledIndex(i, i < options.length - 1 ? 1 : -1, options);
  }
  return i;
}

function nextEnabledIndex(
  start: number,
  dir: 1 | -1,
  options: SelectOption[]
): number {
  let i = start;
  let steps = 0;
  while (steps < options.length) {
    if (i >= 0 && i < options.length && !options[i].disabled) return i;
    i += dir;
    if (i < 0) i = options.length - 1;
    if (i >= options.length) i = 0;
    steps++;
  }
  return -1;
}
