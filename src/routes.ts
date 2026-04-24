export const ROUTES = {
  home: '/',
  privacy: '/privacy-policy',
  cookies: '/cookie-policy',
  terms: '/terms-of-use',
  deleteAccount: '/delete-account',
} as const

export function toSectionPath(sectionId: string) {
  return `${ROUTES.home}?section=${sectionId}`
}
