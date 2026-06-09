import React from 'react'
import type { ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ROUTES, toSectionPath } from '../routes'

type SectionLinkProps = {
  sectionId: string
  className?: string
  children: ReactNode
  onClick?: () => void
}

export default function SectionLink({ sectionId, className, children, onClick }: SectionLinkProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const to = toSectionPath(sectionId)

  return (
    <Link
      to={to}
      className={className}
      onClick={(event) => {
        onClick?.()

        if (location.pathname !== ROUTES.home) return

        event.preventDefault()
        navigate(to)
        requestAnimationFrame(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      }}
    >
      {children}
    </Link>
  )
}
