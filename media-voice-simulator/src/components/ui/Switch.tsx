import * as React from 'react'
import { cn } from '../../lib/utils'

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label?: string
}

export function Switch({ checked, onCheckedChange, label, className, ...props }: SwitchProps) {
  const id = React.useId()
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {label ? (
        <label htmlFor={id} className="select-none text-sm font-semibold text-slate-700">
          {label}
        </label>
      ) : null}
      <button
        type="button"
        aria-label={label ?? '开关'}
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          'relative inline-flex h-7 w-12 items-center rounded-full border transition',
          checked ? 'bg-sky-500/90 border-sky-500/60' : 'bg-slate-100 border-slate-200',
          'focus:outline-none focus:ring-2 focus:ring-sky-300'
        )}
      >
        <span
          className={cn(
            'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-5' : 'translate-x-1'
          )}
        />
      </button>
      {/* 保留一个真实 input，方便表单/可访问性 */}
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

