import transport from '@/shared/api/transport'

class AuthApi {
    appName = 'user'

    getUserData = () => {
        return transport.sendGet(`${this.appName}/auth`)
    }

    registerUser = (params) => {
        return transport.sendPost(`${this.appName}/registration`, params, false)
    }

    loginUser = (params) => {
        return transport.sendPost(`${this.appName}/login`, params, false)
    }


}

export default new AuthApi()