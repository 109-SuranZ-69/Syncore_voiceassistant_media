import * as React from 'react'
import { cn } from '../../lib/utils'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label?: string
}

export function Checkbox({ checked, onCheckedChange, label, className, ...props }: CheckboxProps) {
  const id = React.useId()
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <button
        type="button"
        aria-label={label ?? '复选框'}
        role="checkbox"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-6 items-center justify-center rounded-xl border transition',
          checked
            ? 'border-sky-500/60 bg-sky-500/15'
            : 'border-slate-200/90 bg-white/60 hover:bg-white',
          'focus:outline-none focus:ring-2 focus:ring-sky-300'
        )}
      >
        <span
          className={cn(
            'h-3 w-3 rounded-full transition',
            checked ? 'bg-sky-500' : 'bg-transparent'
          )}
        />
      </button>
      {label ? (
        <label htmlFor={id} className="select-none text-sm font-semibold text-slate-700">
          {label}
        </label>
      ) : null}
      <input
        {...props}
        id={id}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
    </div>
  )
}

