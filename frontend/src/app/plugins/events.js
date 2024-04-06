import { emitter, getQueryNextPath } from '@/shared/utils/helpers'

import router from './router'

emitter.on('routeChange', (prop) => {
  if (prop.next) prop.query = getQueryNextPath(router.currentRoute.value)
  router.push(prop).then().catch()
})
