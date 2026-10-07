import type { LanguageCode } from './i18n'

type StoreBadge = {
  appStore: string
  appStoreUrl: string
  googlePlay: string
  googlePlayUrl: string
}

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.yugaweb.poisave'

export const storeBadges: Record<LanguageCode, StoreBadge> = {
  en: {
    appStore: '/img/apple/black/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg',
    appStoreUrl: 'https://apps.apple.com/us/app/poisave/id6758574842',
    googlePlay: '/img/android/black/GetItOnGooglePlay_Badge_Web_color_English.svg',
    googlePlayUrl: GOOGLE_PLAY_URL,
  },
  fr: {
    appStore: '/img/apple/black/Download_on_the_App_Store_Badge_FR_RGB_blk_100517.svg',
    appStoreUrl: 'https://apps.apple.com/fr/app/poisave/id6758574842',
    googlePlay: '/img/android/black/GetItOnGooglePlay_Badge_Web_color_French.svg',
    googlePlayUrl: GOOGLE_PLAY_URL,
  },
  it: {
    appStore: '/img/apple/black/Download_on_the_App_Store_Badge_IT_RGB_blk_100317.svg',
    appStoreUrl: 'https://apps.apple.com/it/app/poisave/id6758574842',
    googlePlay: '/img/android/black/GetItOnGooglePlay_Badge_Web_color_Italian.svg',
    googlePlayUrl: GOOGLE_PLAY_URL,
  },
  de: {
    appStore: '/img/apple/black/Download_on_the_App_Store_Badge_DE_RGB_blk_092917.svg',
    appStoreUrl: 'https://apps.apple.com/de/app/poisave/id6758574842',
    googlePlay: '/img/android/black/GetItOnGooglePlay_Badge_Web_color_German.svg',
    googlePlayUrl: GOOGLE_PLAY_URL,
  },
  es: {
    appStore: '/img/apple/black/Download_on_the_App_Store_Badge_ES_RGB_blk_100217.svg',
    appStoreUrl: 'https://apps.apple.com/es/app/poisave/id6758574842',
    googlePlay: '/img/android/black/GetItOnGooglePlay_Badge_Web_color_Spanish.svg',
    googlePlayUrl: GOOGLE_PLAY_URL,
  },
}
