import * as React from 'react'
import { cn } from '../../lib/utils'

type ButtonVariant = 'default' | 'secondary' | 'ghost' | 'outline' | 'primary'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClass: Record<ButtonVariant, string> = {
  default: 'bg-white/80 text-slate-900 border border-slate-200/70 hover:bg-white focus:ring-cyan-400',
  primary: 'bg-sky-500 text-white border border-sky-500/40 hover:bg-sky-600 focus:ring-sky-300',
  secondary:
    'bg-violet-50 text-violet-900 border border-violet-200/70 hover:bg-violet-100 focus:ring-violet-200',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-sky-200',
  outline: 'bg-transparent text-slate-900 border border-slate-200/80 hover:bg-slate-50 focus:ring-sky-200',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm rounded-2xl',
  md: 'h-10 px-4 text-sm rounded-2xl',
  lg: 'h-12 px-5 text-base rounded-3xl',
}

export function Button({
  className,
  variant = 'default',
  size = 'md',
  type,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white',
        'disabled:opacity-50 disabled:pointer-events-none',
        variantClass[variant],
        sizeClass[size],
        className
      )}
      {...props}
    />
  )
}

