import { ComponentType } from 'react'

export interface Feature {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
}

export interface NavLink {
  href: string
  label: string
}