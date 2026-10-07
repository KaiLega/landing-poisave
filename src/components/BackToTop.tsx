import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { copy } = useI18n()
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 640)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      className={`back-to-top${isVisible ? ' is-visible' : ''}`}
      aria-label={copy.common.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })}
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  )
}
