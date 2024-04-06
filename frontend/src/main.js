import { createApp } from 'vue'

import { useUserStore } from '@/entities/user'

import App from './app/App'
import { registerPlugins } from './app/plugins'
import pinia from './app/plugins/pinia'

const app = createApp(App)

app.use(pinia)

useUserStore()
  .init()
  //   .catch(() => {
  //     router.push({ name: 'Auth' })
  //   })
  .finally(() => {
    registerPlugins(app)
    app.mount('#app')
  })
