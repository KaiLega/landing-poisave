import type { LanguageCode } from './i18n'

type StoreBadge = {
  appStore: string
  googlePlay: string
}

export const storeBadges: Record<LanguageCode, StoreBadge> = {
  en: {
    appStore: '/img/apple/black/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg',
    googlePlay: '/img/android/black/GetItOnGooglePlay_Badge_Web_color_English.svg',
  },
  fr: {
    appStore: '/img/apple/black/Download_on_the_App_Store_Badge_FR_RGB_blk_100517.svg',
    googlePlay: '/img/android/black/GetItOnGooglePlay_Badge_Web_color_French.svg',
  },
  it: {
    appStore: '/img/apple/black/Download_on_the_App_Store_Badge_IT_RGB_blk_100317.svg',
    googlePlay: '/img/android/black/GetItOnGooglePlay_Badge_Web_color_Italian.svg',
  },
  de: {
    appStore: '/img/apple/black/Download_on_the_App_Store_Badge_DE_RGB_blk_092917.svg',
    googlePlay: '/img/android/black/GetItOnGooglePlay_Badge_Web_color_German.svg',
  },
  es: {
    appStore: '/img/apple/black/Download_on_the_App_Store_Badge_ES_RGB_blk_100217.svg',
    googlePlay: '/img/android/black/GetItOnGooglePlay_Badge_Web_color_Spanish.svg',
  },
}
