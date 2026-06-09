import React from 'react'
import LegalDocumentPage from '../components/LegalDocumentPage'
import { useI18n } from '../i18n/I18nProvider'

export default function PrivacyPage() {
  const { copy } = useI18n()

  return <LegalDocumentPage legalDocument={copy.legal.privacy} />
}
