import React from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { getLocalizedPath } from '../i18n/urls'
import { ROUTES } from '../routes'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

type SectionLinkProps = {
  sectionId: string
  className?: string
  children: ReactNode
  onClick?: () => void
}

export default function SectionLink({ sectionId, className, children, onClick }: SectionLinkProps) {
  const location = useLocation()
  const { language } = useI18n()
  const homePath = getLocalizedPath(language)
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <a
      href={homePath}
      className={className}
      onClick={(event) => {
        onClick?.()

        if (location.pathname !== ROUTES.home) {
          event.preventDefault()
          window.location.assign(`${homePath}#/?section=${encodeURIComponent(sectionId)}`)
          return
        }

        event.preventDefault()
        requestAnimationFrame(() => {
          document.getElementById(sectionId)?.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start',
          })
        })
      }}
    >
      {children}
    </a>
  )
}
