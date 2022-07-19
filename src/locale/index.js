import { createI18n } from 'vue-i18n'
import { localRead } from '@/libs/util'
import customZhCn from './lang/zh-CN'
import customZhTw from './lang/zh-TW'
import customEnUs from './lang/en-US'
import zhCnLocale from 'view-ui-plus/src/locale/lang/zh-CN'
import enUsLocale from 'view-ui-plus/src/locale/lang/en-US'
import zhTwLocale from 'view-ui-plus/src/locale/lang/zh-TW'

// 自动根据浏览器系统语言设置语言
const navLang = navigator.language
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
let lang = localLang || localRead('local') || 'zh-CN'

const messages = {
  'zh-CN': Object.assign(zhCnLocale, customZhCn),
  'zh-TW': Object.assign(zhTwLocale, customZhTw),
  'en-US': Object.assign(enUsLocale, customEnUs)
}
const i18n = createI18n({
  locale: lang,
  messages
})

export default i18n
