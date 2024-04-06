import mitt from 'mitt'

export const emitter = mitt()

export const getQueryNextPath = (currentRoute) => {
  return currentRoute.path !== '/auth' ? { next: currentRoute.path } : currentRoute.query || {}
}
