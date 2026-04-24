import React from 'react'
import type { ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ROUTES, toSectionPath } from '../routes'

type SectionLinkProps = {
  sectionId: string
  className?: string
  children: ReactNode
}

export default function SectionLink({ sectionId, className, children }: SectionLinkProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const to = toSectionPath(sectionId)

  return (
    <Link
      to={to}
      className={className}
      onClick={(event) => {
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
