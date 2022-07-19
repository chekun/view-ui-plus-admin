import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import installPlugin from '@/plugin'
import i18n from '@/locale'

const app = createApp(App)

installPlugin(app)
app.use(i18n)

app.use(router)
  .use(store)
  .use(ViewUIPlus)
  .mount('#app')
