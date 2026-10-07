import { useI18n } from '../i18n/I18nProvider'

export default function SkipLink() {
  const { copy } = useI18n()

  return (
    <a className="skip-link" href="#main-content">
      {copy.common.skipToContent}
    </a>
  )
}
