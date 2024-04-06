import { axiosClient } from './axios'
import to from './to'

class Transport {
  async sendGet(url, config, handleStatus) {
    return to(axiosClient.get(url, config), handleStatus)
  }

  async sendPost(url, params = {}, handleStatus) {
    return to(axiosClient.post(url, params), handleStatus)
  }

  async sendPatch(url, params = {}, handleStatus) {
    return to(axiosClient.patch(url, params), handleStatus)
  }

  async sendDelete(url, params = {}, handleStatus) {
    return to(axiosClient.delete(url, { params }), handleStatus)
  }
}

const transport = new Transport()

export default transport
