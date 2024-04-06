import { emitter } from '../utils/helpers'

export default function to(promise, handleStatus = true) {
  return promise
    .then((data) => {
      return data
    })
    .catch((error) => {
      if (handleStatus) {
        switch (error.response.status) {
          case 500:
            console.log('Internal Server Error')
            break
          case 403:
            console.log('Forbidden')
            break
          case 401:
            emitter.emit('routeChange', { name: 'Auth', next: true })
            break
        }
      }

      return Promise.reject(error)
    })
}
